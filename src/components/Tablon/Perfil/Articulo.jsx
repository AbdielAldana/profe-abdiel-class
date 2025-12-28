// React
import { useState, useEffect } from "react";

// Material UI
import { Button, Divider, Grid, Modal, Paper, TextField, Typography } from "@mui/material"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Context
import { useTablon } from "../../../contexts/TablonContext";

// Utils
import { ViewType, IconArt, claseName, getTiempoRestante } from "../../../utils/articuloTypeUtils"
import FondoDecorativo from "./FondoDecorativo";

// Iconos
import CloseIcon from '@mui/icons-material/Close';


// Styles
const styleModal = {
    all: "unset",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        xs: "350px",
        sm: "90vw",
        md: "85%",
        // lg: "60vw",
    },
    maxWidth: {
        xs: "440px",
        sm: "440px",
        // md: "85%",
        // lg: "60vw",
    },
    height: {
        xs: "auto",
        sm: "auto",
        md: "auto",
        // lg: "auto",
    },
    maxHeight: {
        xs: "90dvh",
        sm: "90dvh",
        md: "90dvh",
    },
    bgcolor: "background.paper",
    borderRadius: "5px",
    // boxShadow: 24,
    overflow: "auto",
    overflowX: "hidden",
    p: 1,
};

const style = {
    p: 2,
    position: "relative",
};

function Articulo({ articulo }) {
    const { usuario, postDonacion, postVenta, retirarVenta, usarProducto, quitarFijo } = useTablon();
    let icono = IconArt(articulo.data.icono, articulo.data.clase)

    // Modal Para ver el Articulo Completo
    const [openData, setOpenData] = useState(false)
    const handleOpenData = () => {
        setOpenData(!openData)
    }

    // =======================================================
    // Modal de Confirmacion
    const [openAction, setOpenAction] = useState(false);
    const [typeAction, setTypeAction] = useState("")

    // Abre Confirmacion
    const handleOpenAction = (type) => {
        setTypeAction(type)
        setOpenAction(true);
        if (destinoVenta === 0) {
            setPrecioVenta(articulo.data.costo - (articulo.data.costo * 0.15))
        }
    };

    // Cierra Confirmacion
    const handleCloseAction = () => {
        setTypeAction("")
        setOpenAction(false);
    };

    // VENDER
    const [destinoVenta, setDestinoVenta] = useState(0)
    const [precioVenta, setPrecioVenta] = useState("")


    const handleChangeDestinoVenta = (e) => {
        setDestinoVenta(e.target.value)
        if (e.target.value === 0) {
            setPrecioVenta(articulo.data.costo - (articulo.data.costo * 0.15))
        }
    }

    // Setea el precio a vender
    const hanndlePrecioVenta = (e) => {
        const value = e.target.value;

        // permitir borrar
        if (value === "") {
            setPrecioVenta("");
            return;
        }

        const costo = Number(articulo?.data?.costo ?? 0);

        if (destinoVenta === 0) {
            setPrecioVenta(Math.floor(costo * 0.85));
            return;
        }

        const val = Number.parseInt(value, 10);

        if (Number.isNaN(val)) return;

        setPrecioVenta(val);
    };

    // Corrige el precio si se pone de mas o menos al permitido
    const handleBlurPrecio = () => {
        if (precioVenta === "") return;

        const costo = Number(articulo?.data?.costo ?? 0);
        const min = Math.floor(costo * 0.5);
        const max = Math.floor(costo * 1.5);

        const clamped = Math.min(Math.max(precioVenta, min), max);
        setPrecioVenta(clamped);
    };

    const handleVender = async () => {
        // eslint-disable-next-line
        let tempEstado = destinoVenta == 0 ? 5 : 2;
        

        let tempJson = {
            estado: tempEstado,
            matricula: usuario.matricula,
            inv_id: articulo.articulo.id,
            precio: precioVenta,
            precio_original: articulo.data.costo
        }
        try {
            const call = await postVenta(tempJson)

            if (call) {
                handleCloseAction()
                handleOpenData()
            }
        } catch (err) {
            console.error(err);
            // aquí puedes mostrar un notifyError si quieres
        }

    }

    // Retirar Venta
    const handleRetirarVenta = async () => {
        let tempJson = {
            inv_id: articulo.articulo.id,
        }
        try {
            const call = await retirarVenta(tempJson)

            if (call) {
                handleCloseAction()
                handleOpenData()
            }
        } catch (err) {
            console.error(err);
            // aquí puedes mostrar un notifyError si quieres
        }
    }

    // Usar Objeto
    const handleUsarArticulo = async () => {
        let tempJson = {
            id_user: usuario.id,
            inv_id: articulo.articulo.id,
            uso: articulo.data.uso,
            duracion: articulo.data.duracion
        }
        try {
            const call = await usarProducto(tempJson)

            if (call) {
                handleCloseAction()
                handleOpenData()
            } else {
                handleCloseAction()
            }


        } catch (err) {
            console.error(err.msg);
            // aquí puedes mostrar un notifyError si quieres
        }
    }

    // Quitar Cosmetico
    const handleQuitarFijo = async () => {
        let tempJson = {
            matricula: usuario.matricula,
            id_inv: articulo.articulo.id,
        }
        try {
            const call = await quitarFijo(tempJson)

            if (call) {
                handleCloseAction()
                handleOpenData()
            }
        } catch (err) {
            console.error(err);
            // aquí puedes mostrar un notifyError si quieres
        }
    }

    // DONACION 
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const matricula = formJson.Matricula;
        let tempJson = {
            estado: 4, //Dono Articulo 
            matriculaReceptor: matricula,
            matricula: usuario.matricula,
            inv_id: articulo.articulo.id
        }
        try {
            const call = await postDonacion(tempJson)

            if (call) {
                handleCloseAction()
                handleOpenData()
            }
        } catch (err) {
            console.error(err);
            // aquí puedes mostrar un notifyError si quieres
        }
    };


    // =======================================================
    // Render tipo de Cosmetico
    const [tipoCosmetico, idCosmetico] = articulo.data.tipo === "Cosmetico" ? articulo.data.descripcion.split(" ") : "";

    // Tiempo
    let tiempoRestante = articulo.articulo.fecha_fin === null ? "" : getTiempoRestante(articulo.articulo.fecha_fin ? articulo.articulo.fecha_fin : "2030/12/10 00:00:00")
    // eslint-disable-next-line
    const [_, setTick] = useState(0);
    useEffect(() => {
        const i = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(i);
    }, []);


    return (
        <>
            {/* Vista principal del Articulo */}
            <Paper
                className={"misionSelectF"}
                sx={style}
                style={{
                    border: "solid 2px " + ViewType(articulo.data.clase).color,
                    boxShadow: "0 0 5px " + ViewType(articulo.data.clase).color,
                }}
                onClick={handleOpenData}
            >
                <Grid container spacing={1}>
                    <Grid size={{ xs: 2 }} alignSelf={"center"}>
                        {icono}
                    </Grid>
                    <Grid size={{ xs: articulo.articulo.cantidad > 0 ? 7 : 10 }}>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            className="ellipsis"
                            sx={{ m: 0, p: 0 }}
                        >
                            {articulo.data.nombre}

                        </Typography>
                        <Typography
                            variant="body1"
                            className="ellipsis"
                            sx={{ m: 0, p: 0 }}
                        >
                            {articulo.data.descripcion}
                        </Typography>
                    </Grid>
                    {articulo.articulo.cantidad > 0 &&
                        <Grid size={{ xs: 3 }}>
                            <Typography
                                variant="body1"
                                className="ellipsis"
                                sx={{ m: 0, p: 0 }}
                                textAlign={"right"}
                            >
                                {articulo.data.tipo}
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight={"bold"}
                                textAlign={"right"}
                                gutterBottom
                                sx={{ m: 0, p: 0 }}
                            >
                                x{articulo.articulo.cantidad}
                            </Typography>
                        </Grid>
                    }
                    {// eslint-disable-next-line
                    articulo.data.uso === "Temporal" && articulo.articulo.estado == 1 &&
                        <Grid size={{ xs: 12 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={"bold"}
                                textAlign={"center"}
                                sx={{ m: 0, p: 0 }}
                            >
                                Termina en: {tiempoRestante}
                            </Typography>
                        </Grid>
                    }
                    {// eslint-disable-next-line
                    articulo.articulo.estado == 4 &&
                        <Grid size={{ xs: 12 }}>
                            <Typography
                                variant="subtitle1"
                                textAlign={"center"}
                                sx={{ m: 0, p: 0 }}
                            >
                                Donado el: {articulo.articulo.fecha_fin}
                            </Typography>
                        </Grid>
                    }
                    {// eslint-disable-next-line
                    articulo.articulo.estado == 5 &&
                        <Grid size={{ xs: 12 }}>
                            <Typography
                                variant="subtitle1"
                                textAlign={"center"}
                                sx={{ m: 0, p: 0 }}
                            >
                                Vendido por: <b>{articulo.articulo.precio} puntos</b>, el {articulo.articulo.fecha_fin}
                            </Typography>
                        </Grid>
                    }
                </Grid>
            </Paper>

            {/* Modal de Producto */}
            <Modal
                open={openData}
                onClose={handleOpenData}
                aria-labelledby="articulo-modal"
                aria-describedby="articulo-modal"
                aria-hidden="false"
            >
                <Card sx={styleModal} style={{ border: "solid 1px" + ViewType(articulo.data.clase).color, boxShadow: "0 0 5px" + ViewType(articulo.data.clase).color }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
                                {icono}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="Close" onClick={handleOpenData}>
                                <CloseIcon />
                            </IconButton>
                        }
                        title={"Clase: " + claseName(articulo.data.clase)}
                        subheader={articulo.data.tipo + " " + articulo.data.uso}
                    />
                    <CardContent>
                        <Grid container spacing={1}>
                            {/* eslint-disable-next-line */}
                            <Grid size={{ xs: articulo.articulo.cantidad == 0 ? 12 : 8 }}>
                                <Typography variant="h6" fontWeight={"bold"} className="ellipsis">
                                    {articulo.data.nombre}
                                </Typography>
                            </Grid>
                            {articulo.articulo.cantidad > 0 &&

                                <Grid size={{ xs: 4 }} alignSelf={"center"}>
                                    <Typography variant="body1" textAlign={"right"} fontWeight={"bold"}>
                                        Cantidad: x{articulo.articulo.cantidad}
                                    </Typography>
                                </Grid>
                            }
                            <Grid size={{ xs: 12 }}>
                                <Divider />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="body1" textAlign={"center"}>
                                    {articulo.data.lore}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Divider />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="subtitle1" fontWeight={"bold"}>
                                    Descripcion:
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {articulo.data.descripcion}
                                </Typography>
                            </Grid>
                            {// eslint-disable-next-line
                            articulo.articulo.estado == 2 &&
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="subtitle1" fontWeight={"bold"}>
                                        Precio de Venta:
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {articulo.articulo.precio} pts
                                    </Typography>
                                </Grid>
                            }

                            {/* Si es un Cosmetico */}
                            {articulo.data.tipo === "Cosmetico" &&
                                <Grid size={{ xs: 12 }} display={"flex"} justifyContent={"center"}>
                                    {tipoCosmetico === "Fondo" &&
                                        <div className="fondoPreview" style={{ backgroundColor: usuario.color }}>
                                            {/* {idCosmetico} {tipoCosmetico} */}
                                            <FondoDecorativo fondo={parseInt(idCosmetico)} />
                                        </div>
                                    }
                                    {tipoCosmetico === "Marco" &&
                                        <div className={"tipo" + idCosmetico}>
                                            <div className="imagenPerfil " style={{ border: "solid 5px" + usuario.color, boxShadow: "0 0 5px" + usuario.color }}>
                                                <img src="" alt="" width={"100%"} />
                                            </div>
                                        </div>
                                    }
                                </Grid>
                            }
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Divider />
                        </Grid>
                    </CardContent>

                    {// eslint-disable-next-line
                    articulo.articulo.estado == 0 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row-reverse" }}>
                            <Button size="small" variant="contained" color={"secondary"} onClick={() => handleOpenAction("usar")}>Usar</Button>
                            {// eslint-disable-next-line
                            articulo.data.revendible == 1 &&
                                <Button size="small" variant="contained" color={"primary"} onClick={() => handleOpenAction("vender")}>Vender</Button>
                            }
                            {// eslint-disable-next-line
                            articulo.data.donable == 1 &&
                                <Button size="small" variant="outlined" color={"primary"} onClick={() => handleOpenAction("donar")}>Donar</Button>
                            }
                        </CardActions>
                    }
                    {// eslint-disable-next-line
                    articulo.articulo.estado == 1 && articulo.data.uso == "Fijo" &&
                        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button size="small" variant="contained" color={"secondary"} onClick={() => handleOpenAction("quitar")}>Quitar</Button>
                        </CardActions>
                    }
                    {// eslint-disable-next-line
                    articulo.articulo.estado == 1 && articulo.data.uso == "Temporal" &&
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            Termina en: {tiempoRestante}
                        </CardActions>
                    }
                    {// eslint-disable-next-line
                    articulo.articulo.estado == 2 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button size="small" variant="contained" color={"secondary"} onClick={() => handleOpenAction("retirar")}>Retirar</Button>
                        </CardActions>
                    }
                    {// eslint-disable-next-line
                    articulo.articulo.estado == 3 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            Usado el: {articulo.articulo.fecha_inicio}
                        </CardActions>
                    }
                    {// eslint-disable-next-line
                    articulo.articulo.estado == 4 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            Donado el: {articulo.articulo.fecha_fin}
                        </CardActions>
                    }
                    {// eslint-disable-next-line
                    articulo.articulo.estado == 5 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            Vendida el: {articulo.articulo.fecha_fin}
                        </CardActions>
                    }
                    {// eslint-disable-next-line
                    articulo.articulo.estado == 5 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            Vendida por: {articulo.articulo.precio} puntos
                        </CardActions>
                    }
                </Card>
            </Modal>


            {/* Ventana de Confirmacion */}

            <Dialog
                open={openAction}
                onClose={handleCloseAction}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {// eslint-disable-next-line
                typeAction == "donar" && <>
                    <DialogTitle id="alert-dialog-title">
                        Seguro que quieres Donar?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Asegurate de escribir correctamente la Matricula de a quien donaras.
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            El articulo pasara inmediatamente a esa persona.
                        </DialogContentText>
                        <form onSubmit={handleSubmit} id="donacion-form">
                            <TextField
                                required
                                margin="dense"
                                id="matriculaReceptor"
                                name="Matricula"
                                label="Matricula"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAction}> Cancelar </Button>
                        <Button type="submit" form="donacion-form">Donar</Button>
                    </DialogActions>
                </>}
                {// eslint-disable-next-line
                typeAction == "vender" && <>
                    <DialogTitle id="alert-dialog-title">
                        Estas a punto de Vender tu articulo
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Puedes venderlo directamente al 'Comerciante' o ponerlo a la venta en el Mercado.
                        </DialogContentText>
                        <Divider sx={{ my: 1 }} />
                        <DialogContentText id="alert-dialog-description1">
                            El <b>Comerciante</b> te cobrar el 15% de comision sobre el precio original.
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description2">
                            Precio Original: <b>{articulo.data.costo} puntos</b>
                            <br />
                            Precio de Compra: <b>{articulo.data.costo - (articulo.data.costo * 0.15)} puntos</b>
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description6">
                            La compra es inmediata
                        </DialogContentText>
                        <Divider sx={{ my: 1 }} />
                        <DialogContentText id="alert-dialog-description3">
                            En el <b>Mercado</b> solo puedes venderlo con un margen de 50% mas caro o mas barato del precio original.
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description4">
                            Costo Minimo: <b>{articulo.data.costo - (articulo.data.costo * 0.50)} puntos</b>
                            <br />
                            Costo Maximo: <b>{parseInt(articulo.data.costo) + (articulo.data.costo * 0.50)} puntos</b>
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description5">
                            Tendras que esperar a que alguien te lo compre.
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description7">
                            Se te cobrara una comicion del 10% inmediatamente. <br />
                            Comision: <b>{Math.ceil((precioVenta * 0.1))} Puntos</b>
                        </DialogContentText>
                        <Divider sx={{ my: 1 }} />
                        <Grid container spacing={1}>
                            <Grid size={{ xs: 12 }} alignSelf={"end"}>
                                <FormControl fullWidth>
                                    <InputLabel id="destino">Destino</InputLabel>
                                    <Select
                                        variant="standard"
                                        required
                                        labelId="destino"
                                        id="destinoSelect"
                                        value={destinoVenta}
                                        label="Destino"
                                        onChange={handleChangeDestinoVenta}
                                    >
                                        <MenuItem value={0}>Comerciante</MenuItem>
                                        <MenuItem value={1}>Mercado</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12 }} alignSelf={"end"}>
                                <TextField
                                    required
                                    // eslint-disable-next-line
                                    disabled={destinoVenta == 0 ? true : false}
                                    id="precioVenta"
                                    name="Precio"
                                    label="Precio"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={precioVenta}
                                    onChange={hanndlePrecioVenta}
                                    onBlur={handleBlurPrecio}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAction}> Cancelar </Button>
                        <Button onClick={handleVender} >Vender</Button>
                    </DialogActions>
                </>}
                {// eslint-disable-next-line
                typeAction == "usar" && articulo.data.uso == "Fijo" && <>
                    <DialogTitle id="alert-dialog-title">
                        Te estas Equipando este Articulo
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Este articulo se pondra en la parte de 'Equipado / Activo'.
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description2">
                            Si existe un Marco o Fondo Activo, este sera reemplazado.
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description3">
                            No perderas ningun articulo.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAction}> Cancelar </Button>
                        <Button onClick={handleUsarArticulo} >Equipar</Button>
                    </DialogActions>
                </>}
                {// eslint-disable-next-line
                typeAction == "usar" && articulo.data.uso == "Temporal" && <>
                    <DialogTitle id="alert-dialog-title">
                        Activaras este Articulo
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Se iniciara el uso de este articulo, este pasara a la parte 'Equipado / Activo del inventario.
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description2">
                            La duracion del efecto aparecera debajo del articulo.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAction}> Cancelar </Button>
                        <Button onClick={handleUsarArticulo} >Activar</Button>
                    </DialogActions>
                </>}
                {// eslint-disable-next-line
                typeAction == "usar" && articulo.data.uso == "Consumible" && <>
                    <DialogTitle id="alert-dialog-title">
                        Usaras este Articulo
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Gastaras este Articulo, este aparecera en la seccion de 'Consumidos'.
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description2">
                            El efecto solo será valido en la fecha que marca debajo del articulo.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAction}> Cancelar </Button>
                        <Button onClick={handleUsarArticulo} >Usar</Button>
                    </DialogActions>
                </>}
                {// eslint-disable-next-line
                typeAction == "quitar" && articulo.data.uso == "Fijo" && <>
                    <DialogTitle id="alert-dialog-title">
                        Usaras este Articulo
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Al quitar un Cosmetico este pasara a la seccion Disponibles.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAction}> Cancelar </Button>
                        <Button onClick={handleQuitarFijo} >Quiar</Button>
                    </DialogActions>
                </>}
                {// eslint-disable-next-line
                typeAction == "retirar" && <>
                    <DialogTitle id="alert-dialog-title">
                        Retiraras este Articulo del Mercado
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Este pasara Nuevamente a tu Articulos Disponibles.
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            La comicion del 10% NO se te regresara
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAction}> Cancelar </Button>
                        <Button onClick={handleRetirarVenta} >Retirar</Button>
                    </DialogActions>
                </>}
            </Dialog>
        </>
    )
}

export default Articulo