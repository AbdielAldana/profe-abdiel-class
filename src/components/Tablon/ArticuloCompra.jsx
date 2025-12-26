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
import { getLevelData } from "../../utils/levelUtils";
import FondoDecorativo from "../../components/Tablon/FondoDecorativo";

// Iconos
import CloseIcon from '@mui/icons-material/Close';
import { GiRupee } from "react-icons/gi";


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

function ArticuloCompra({ articulo }) {
    const { usuario, recompensas, comprarTienda } = useTablon();
    let icono = IconArt(articulo.icono, articulo.clase)

    // Niveles
    const xpTotal = usuario?.p_totales ?? 0;
    const { level } = getLevelData(xpTotal);

    const puntos_disponibles =
        usuario === null ? 0 : usuario.p_totales - usuario.p_gastados;

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
    };

    // Cierra Confirmacion
    const handleCloseAction = () => {
        setTypeAction("")
        setOpenAction(false);
    };


    const handleConfirmarCompra = async () => {
        let tempJson = {
            matricula: usuario.matricula,
            id_recopensa: articulo.id_articulo,
        }
        try {
            const call = await comprarTienda(tempJson)

            if (call) {
                handleCloseAction()
                handleOpenData()
            }
        } catch (err) {
            console.error(err);
            // aquí puedes mostrar un notifyError si quieres
        }
    }


    // =======================================================
    // Render tipo de Cosmetico
    const [tipoCosmetico, idCosmetico] = articulo.tipo === "Cosmetico" ? articulo.descripcion.split(" ") : "";

    const [color, setColor] = useState(usuario ? usuario.color : "#000000")


    return (
        <>
            {/* Vista principal del Articulo */}
            <Paper
                className={"misionSelectF"}
                sx={style}
                style={{
                    border: "solid 2px " + ViewType(articulo.clase).color,
                    boxShadow: "0 0 5px " + ViewType(articulo.clase).color,
                }}
                onClick={handleOpenData}
            >
                <Grid container spacing={1}>
                    {usuario &&
                        <Grid size={{ xs: 6 }}>
                            <Typography
                                variant="subtitle1"
                                className="ellipsis"
                                sx={{ m: 0, p: 0 }}
                                color={level >= articulo.nivel_min ? "" : "error"}
                            // textAlign={"right"}
                            >
                                Nivel min: <b>{articulo.nivel_min}</b>
                            </Typography>
                        </Grid>
                    }
                    {usuario &&
                        <Grid size={{ xs: 6 }} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                            <GiRupee size={20} color={usuario?.color} />
                            <Typography
                                variant="subtitle1"
                                className="ellipsis"
                                sx={{ m: 0, p: 0 }}
                                textAlign={"right"}
                                color={puntos_disponibles >= articulo.costo ? "" : "error"}
                            >
                                <b>{articulo.costo}</b> pts
                            </Typography>
                        </Grid>
                    }
                    <Grid size={{ xs: 2 }} alignSelf={"center"}>
                        {icono}
                    </Grid>
                    <Grid size={{ xs: 10 }}>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            className="ellipsis"
                            sx={{ m: 0, p: 0 }}
                        >
                            {articulo.nombre}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ m: 0, p: 0 }}
                        >
                            {articulo.tipo} - {articulo.descripcion}
                        </Typography>
                    </Grid>

                    {!usuario &&
                        <Grid size={{ xs: 12 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={"bold"}
                                textAlign={"center"}
                                sx={{ m: 0, p: 0 }}
                                color="error"
                            >
                                Registrate para Participar
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
                <Card sx={styleModal} style={{ border: "solid 1px" + ViewType(articulo.clase).color, boxShadow: "0 0 5px" + ViewType(articulo.clase).color }}>
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
                        title={"Clase: " + claseName(articulo.clase + "")}
                        subheader={articulo.tipo + " " + articulo.uso}
                    />
                    <CardContent>
                        <Grid container spacing={1}>
                            {usuario &&
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="h6" fontWeight={"bold"} className="ellipsis" textAlign={"center"}>
                                        {articulo.nombre}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="body1"  >
                                        Costo: <b>{articulo.costo} Puntos</b>
                                    </Typography>
                                    <Typography variant="body1" >
                                        Nivel Minimo: <b>{articulo.nivel_min}</b>
                                    </Typography>
                                </Grid>
                            }


                            {/* <Grid size={{ xs: 4 }} alignSelf={"center"}>
                                <Typography variant="h6" textAlign={"right"} fontWeight={"bold"}>

                                </Typography>
                                
                            </Grid> */}
                            <Grid size={{ xs: 12 }}>
                                <Divider />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="body1" textAlign={"center"}>
                                    {articulo.lore}
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
                                    {articulo.descripcion}
                                </Typography>
                            </Grid>
                            {/* {articulo.articulo.estado == 2 &&
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="subtitle1" fontWeight={"bold"}>
                                        Precio de Venta:
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {articulo.articulo.precio} pts
                                    </Typography>
                                </Grid>
                            } */}

                            {/* Si es un Cosmetico */}
                            {articulo.tipo === "Cosmetico" &&
                                <Grid size={{ xs: 12 }} display={"flex"} justifyContent={"center"}>
                                    {articulo.condicion.fijo_tipo === "Fondo" &&
                                        <div className="fondoPreview" style={{ backgroundColor: color }}>
                                            <FondoDecorativo fondo={parseInt(articulo.condicion.fijo_num)} />
                                        </div>
                                    }
                                    {articulo.condicion.fijo_tipo === "Marco" &&
                                        <div className={"tipo" + articulo.condicion.fijo_num}>
                                            <div className="imagenPerfil " style={{ border: "solid 5px" + color, boxShadow: "0 0 5px" + color }}>
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

                    {usuario && level >= articulo.nivel_min && puntos_disponibles >= articulo.costo &&
                        <CardActions style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row-reverse" }}>
                            <Button size="small" variant="contained" color={"primary"} onClick={() => handleOpenAction("comprar")}>Comprar</Button>
                        </CardActions>
                    }

                    {/* {articulo.articulo.estado == 0 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row-reverse" }}>
                            <Button size="small" variant="contained" color={"secondary"} onClick={() => handleOpenAction("usar")}>Usar</Button>
                            {articulo.data.revendible == 1 &&
                                <Button size="small" variant="contained" color={"primary"} onClick={() => handleOpenAction("vender")}>Vender</Button>
                            }
                            {articulo.data.donable == 1 &&
                                <Button size="small" variant="outlined" color={"primary"} onClick={() => handleOpenAction("donar")}>Donar</Button>
                            }
                        </CardActions>
                    }
                    {articulo.articulo.estado == 1 && articulo.data.uso == "Fijo" &&
                        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button size="small" variant="contained" color={"secondary"} onClick={() => handleOpenAction("quitar")}>Quitar</Button>
                        </CardActions>
                    }
                    {articulo.articulo.estado == 1 && articulo.data.uso == "Temporal" &&
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            Termina en: {tiempoRestante}
                        </CardActions>
                    }
                    {articulo.articulo.estado == 2 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button size="small" variant="contained" color={"secondary"} onClick={() => handleOpenAction("retirar")}>Retirar</Button>
                        </CardActions>
                    }
                    {articulo.articulo.estado == 3 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            Usado el: {articulo.articulo.fecha_inicio}
                        </CardActions>
                    }
                    {articulo.articulo.estado == 4 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            Donado el: {articulo.articulo.fecha_fin}
                        </CardActions>
                    }
                    {articulo.articulo.estado == 5 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            Vendida el: {articulo.articulo.fecha_fin}
                        </CardActions>
                    }
                    {articulo.articulo.estado == 5 &&
                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            Vendida por: {articulo.articulo.precio} puntos
                        </CardActions>
                    } */}
                </Card>
            </Modal>


            {/* Ventana de Confirmacion */}
            <Dialog
                open={openAction}
                onClose={handleCloseAction}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {typeAction == "comprar" && <>
                    <DialogTitle id="alert-dialog-title">
                        Confirmacion de Compra
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Estas a punto de comprar un articulo.
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            Gastaras {articulo.costo} pts
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAction}> Cancelar </Button>
                        <Button onClick={handleConfirmarCompra}>Confirmar Compra</Button>
                    </DialogActions>
                </>}
            </Dialog>
        </>
    )
}

export default ArticuloCompra