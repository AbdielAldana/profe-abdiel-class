// React
import { useState, useEffect } from "react";

// Material UI
import { Button, Divider, Grid, Modal, Paper, TextField, Typography } from "@mui/material"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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

// Componentes
import { toast } from "react-toastify";

// Context
import { useTablon } from "./TablonContext";

// Utils
import { ViewType, IconArt, claseName, getTiempoRestante } from "../../utils/articuloTypeUtils"
import FondoDecorativo from "../../components/Tablon/FondoDecorativo";

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
        xs: "400px",
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
    const { updateUsuario, inventario, usuario, updateInventario } = useTablon();
    let icono = IconArt(articulo.data.icono, articulo.data.clase)
 
    // Alertas
    const notifyError = (txt) =>
        toast.error(txt, { position: "top-center" });

    const notifySuccess = (txt) =>
        toast.success(txt, { position: "top-center" });

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

        const min = Math.floor(costo * 0.5);
        const max = Math.floor(costo * 1.5);

        const val = Number.parseInt(value, 10);

        if (Number.isNaN(val)) return;

        setPrecioVenta(val);
    };

    const handleBlurPrecio = () => {
        if (precioVenta === "") return;

        const costo = Number(articulo?.data?.costo ?? 0);
        const min = Math.floor(costo * 0.5);
        const max = Math.floor(costo * 1.5);

        const clamped = Math.min(Math.max(precioVenta, min), max);
        setPrecioVenta(clamped);
    };

    const handleVender = () => {

    }


    // DONACION 
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const matricula = formJson.Matricula;
        let tempJson = {
            accion: 4, //Dono Articulo 
            matriculaReceptor: matricula,
            matriculaDonador: usuario.matricula,
            articulo: articulo
        }
        let respuesta = updateInventario(tempJson)
        
        if(!respuesta.state){
            notifyError(respuesta.msg)
        }
        if(respuesta.state){
            handleCloseAction();
            handleOpenData();
            notifySuccess(respuesta.msg)
        }
    };


    // =======================================================
    // Render tipo de Cosmetico
    const [tipoCosmetico, idCosmetico] = articulo.data.tipo === "Cosmetico" ? articulo.data.descripcion.split(" ") : "";

    // Tiempo

    let tiempoRestante = articulo.articulo.fecha_fin === null ? "" : getTiempoRestante(articulo.articulo.fecha_fin ? articulo.articulo.fecha_fin : "2030/12/10 00:00:00")

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
                <Grid container spacing={3}>
                    <Grid size={{ xs: 2 }} alignSelf={"center"}>
                        {icono}
                    </Grid>
                    <Grid size={{ xs: 7 }}>
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
                            // fontWeight="bold"
                            // className="ellipsis"
                            sx={{ m: 0, p: 0 }}
                        >
                            {articulo.data.descripcion}
                        </Typography>
                    </Grid>
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
                            // className="ellipsis"
                            sx={{ m: 0, p: 0 }}
                        >
                            x{articulo.articulo.cantidad}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        {articulo.articulo.estado === 1 && articulo.data.uso === "Temporal" &&
                            <Typography
                                variant="subtitle1"
                                fontWeight={"bold"}
                                textAlign={"center"}
                                // gutterBottom
                                // className="ellipsis"
                                sx={{ m: 0, p: 0 }}
                            >
                                Termina en: {tiempoRestante}
                            </Typography>
                        }
                        {articulo.articulo.estado === 4 && articulo.data.uso === "Temporal" &&
                            <Typography
                                variant="subtitle1"
                                // fontWeight={"bold"}
                                textAlign={"center"}
                                // gutterBottom
                                // className="ellipsis"
                                sx={{ m: 0, p: 0 }}
                            >
                                Entregado el: {articulo.articulo.fecha_inicio}
                            </Typography>
                        }
                    </Grid>
                </Grid>
            </Paper>

            {/* Modal de Producto */}
            <Modal
                open={openData}
                onClose={handleOpenData}
                aria-labelledby="articulo-modal"
                aria-describedby="articulo-modal"
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
                            <Grid size={{ xs: 8 }}>
                                <Typography variant="h6" fontWeight={"bold"} className="ellipsis">
                                    {articulo.data.nombre}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 4 }} alignSelf={"center"}>
                                <Typography variant="body1" textAlign={"right"} fontWeight={"bold"}>
                                    Cantidad: x{articulo.articulo.cantidad}
                                </Typography>
                            </Grid>
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

                    {articulo.articulo.estado === 0 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button size="small" variant="outlined" color={"primary"} onClick={() => handleOpenAction("donar")}>Donar</Button>
                            <Button size="small" variant="contained" color={"primary"} onClick={() => handleOpenAction("vender")}>Vender</Button>
                            <Button size="small" variant="contained" color={"secondary"} onClick={() => handleOpenAction("usar")}>Usar</Button>
                        </CardActions>
                    }
                    {articulo.articulo.estado === 1 && articulo.data.uso === "Fijo" &&
                        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button size="small" variant="contained" color={"secondary"} onClick={() => handleOpenAction("quitar")}>Quitar</Button>
                        </CardActions>
                    }
                    {articulo.articulo.estado === 1 && articulo.data.uso === "Temporal" &&
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            Termina en: {tiempoRestante}
                        </CardActions>
                    }
                    {articulo.articulo.estado === 2 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button size="small" variant="contained" color={"secondary"} onClick={() => handleOpenAction("retirar")}>Retirar</Button>
                        </CardActions>
                    }
                    {articulo.articulo.estado === 3 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            Usado el: {articulo.articulo.fecha_inicio}
                        </CardActions>
                    }
                    {articulo.articulo.estado === 4 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            Entregado el: {articulo.articulo.fecha_inicio}
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
                <DialogTitle id="alert-dialog-title">
                    {typeAction === "donar" && "Seguro que quieres Donar?"}
                    {typeAction === "vender" && "Estas a punto de Vender tu articulo"}
                    {typeAction === "usar" && "Usaras este articulo, seguro?"}
                    {typeAction === "quitar" && "Te desequiparas un objeto."}

                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ marginBottom: '10px' }}>
                        {typeAction === "donar" && "Asegurate de escribir correctamente la Matricula de a quien donaras. El articulo pasara inmediatamente a esa persona."}
                        {typeAction === "vender" && "Puedes venderlo directamente al 'Comerciante' o ponerlo a la venta en el Mercado."}
                        {typeAction === "usar" && articulo.data.uso === "Fijo" && "Se Activara este articulo y se pondra en la parte de 'Equipado / Activo', si existe un Marco o Fondo Activo, este sera reemplazado. No perderas ningun articulo."}
                        {typeAction === "usar" && articulo.data.uso === "Temporal" && "Se iniciara el uso de este articulo, este pasara a la parte 'Equipado / Activo del inventario. La duracion del efecto aparecera debajo del articulo."}
                        {typeAction === "usar" && articulo.data.uso === "Consumible" && "Gastaras este Articulo, este aparecera en la seccion de 'Consumidos'. El efecto solo sera valido en la fecha que marca debajo del articulo."}
                        {typeAction === "quitar" && articulo.data.uso === "Fijo" && "Al quitar un Cosmetico este pasara a la seccion Disponibles."}
                    </DialogContentText>
                    {typeAction === "vender" &&
                        <DialogContentText id="alert-dialog-description" style={{ marginBottom: '15px' }}>
                            <hr />
                            El comerciante te cobrar el 15% de comision sobre el precio original. <br />
                            Precio Original: {articulo.data.costo} <br />
                            Precio de Compra: {articulo.data.costo - (articulo.data.costo * 0.15)} <br /> <hr />
                            En el mercado solo puedes venderlo con un margen de 50% mas caro o mas barato del precio original. <br />
                            Costo Minimo: {articulo.data.costo - (articulo.data.costo * 0.50)} <br />
                            Costo Maximo: {articulo.data.costo + (articulo.data.costo * 0.50)} <br />
                        </DialogContentText>
                    }
                    {typeAction === "donar" &&
                        <form onSubmit={handleSubmit} id="donacion-form">
                            <TextField
                                // autoFocus
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
                    }
                    {typeAction === "vender" &&
                        <>
                            <Grid container spacing={1}>
                                <Grid size={{ xs: 6 }} alignSelf={"end"}>


                                    <FormControl fullWidth>
                                        <InputLabel id="destino">Destino</InputLabel>
                                        <Select
                                            variant="standard"
                                            required
                                            // margin="dense"
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
                                <Grid size={{ xs: 6 }} alignSelf={"end"}>
                                    <TextField
                                        required
                                        disabled={destinoVenta === 0 ? true : false}
                                        // margin="dense"
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
                        </>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAction}>
                        Cancelar
                    </Button>
                    {typeAction === "donar" &&
                        <Button type="submit" form="donacion-form">Donar</Button>
                    }                    
                    {typeAction === "vender" && 
                        <Button onClick={handleVender} >Donar</Button>
                    }
                    {typeAction === "usar" && articulo.data.uso === "Fijo" && "Se Activara este articulo y se pondra en la parte de 'Equipado / Activo', si existe un Marco o Fondo Activo, este sera reemplazado. No perderas ningun articulo."}
                    {typeAction === "usar" && articulo.data.uso === "Temporal" && "Se iniciara el uso de este articulo, este pasara a la parte 'Equipado / Activo del inventario. La duracion del efecto aparecera debajo del articulo."}
                    {typeAction === "usar" && articulo.data.uso === "Consumible" && "Gastaras este Articulo, este aparecera en la seccion de 'Consumidos'. El efecto solo sera valido en la fecha que marca debajo del articulo."}
                    {typeAction === "quitar" && articulo.data.uso === "Fijo" && "Al quitar un Cosmetico este pasara a la seccion Disponibles."}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Articulo