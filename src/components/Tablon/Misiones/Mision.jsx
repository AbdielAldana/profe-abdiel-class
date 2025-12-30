import { useEffect, useState } from "react";

import { Button, Divider, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import confetti from "canvas-confetti";

import { difColor, difName } from "../../../utils/dificultadUtils";
import { getTiempoRestante } from "../../../utils/articuloTypeUtils";
import { useTablon } from "../../../contexts/TablonContext";

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

function Mision({ mision }) {
    const { usuario, canjearMision } = useTablon()

    let tiempoRestante = mision.fechaFinGlobal === null ? "" : getTiempoRestante(mision.fechaFinGlobal ? mision.fechaFinGlobal : "2030/12/10 00:00:00")
    // eslint-disable-next-line
    const [_, setTick] = useState(0);
    useEffect(() => {
        const i = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(i);
    }, []);


    // Modal
    const [openData, setOpenData] = useState(false)
    const handleOpenData = () => {
        setOpenData(!openData)
    }
    // Modal Feluz
    const [openFleiz, setOpenFeliz] = useState(false)
    const handleFeliz = () => {
        setOpenFeliz(!openFleiz)
    }

    const [puestosSubidos, setPuestosSubidos] = useState(0)

    const completarMision = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson.codigo_mision);

        let tempJson = {
            matricula: usuario.matricula,
            id_mision: mision.id,
            codigo: formJson.codigo_mision,
        }

        try {
            const call = await canjearMision(tempJson)
            if (call.ok) {
                handleOpenData()
                if (call.subio_puestos) {
                    setPuestosSubidos(call.puestos_subidos)
                    shoot()
                    handleFeliz()
                }
                lanzarConfeti()
            }
        } catch (err) {
            console.error(err.msg);
        }

        // handleOpenData()

    }


    const lanzarConfeti = () => {
        confetti({
            zIndex: 1500,
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    var defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        zIndex: 1500,
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
    };

    const shoot = () => {
        confetti({
            ...defaults,
            particleCount: 80,
            scalar: 1.2,
            shapes: ['star']
        });

        confetti({
            ...defaults,
            particleCount: 60,
            scalar: 0.75,
            shapes: ['circle']
        });
    }
    return (
        <>
            {/* <button onClick={handleFeliz}>Prueba</button> */}
            <Paper
                // className={"misionSelectF"}
                sx={style}
                style={{
                    border: "solid 4px " + difColor(mision.dificultad),
                    boxShadow: "0 0 3px " + difColor(mision.dificultad),
                }}
            >
                <Grid container spacing={1}>

                    <Grid size={{ xs: 6 }}>
                        <Typography
                            variant="subtitle1"
                            className="ellipsis"
                            sx={{ m: 0, p: 0 }}
                            fontWeight={"bold"}
                            style={{ color: difColor(mision.dificultad) }}
                        >
                            {difName(mision.dificultad)}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                        <GiRupee size={20} color={usuario?.color} />
                        <Typography
                            variant="subtitle1"
                            className="ellipsis"
                            sx={{ m: 0, p: 0 }}
                            textAlign={"right"}
                        >
                            <b>{mision.puntos}</b> pts
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" fontWeight={"bold"} className="ellipsis">
                            {mision.nombre}
                        </Typography>

                        <Typography variant="subtitle1" className="ellipsis">
                            {mision.subNombre}
                        </Typography>

                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" >
                            <b>Lore: </b>{mision.lore}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" >
                            <b>Objetivo: </b>{mision.objetivo}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" >
                            <b>Requisitos: </b>{mision.requisitos}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>

                    <Grid size={{ xs: 8 }} alignSelf={"center"}>
                        <Typography variant="body1" >
                            Termina: <b>{tiempoRestante}</b>
                        </Typography>
                    </Grid>

                    {mision.frecuencia > 0 &&
                        <Grid size={{ xs: 4 }} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                            <Typography variant="body1" >
                                <b>{mision.frecuencia == 1 ? "Diaria" : mision.frecuencia == 2 ? "Semanal" : mision.frecuencia == 3 ? "Mensual" : ""}</b>
                            </Typography>
                        </Grid>
                    }
                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>


                    {tiempoRestante !== "Vencida" && usuario !== null && mision.canjeada == 0 &&
                        <Grid size={{ xs: 12 }} display={"flex"} justifyContent={"flex-end"}>
                            <Button variant="contained" size="medium" color="primary" sx={{ mr: 1 }} onClick={handleOpenData} >Completar</Button>
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
                <Card sx={styleModal} style={{ border: "solid 3px" + difColor(mision.dificultad), boxShadow: "0 0 5px" + difColor(mision.dificultad) }}>
                    <CardHeader
                        action={
                            <IconButton aria-label="Close" onClick={handleOpenData}>
                                <CloseIcon />
                            </IconButton>
                        }
                        title={mision.nombre}
                        subheader={mision.subNombre}
                    />
                    <Divider />
                    <CardContent style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <Grid container spacing={1}>
                            <Grid size={{ xs: 12, md: 12 }}>
                                <Typography variant="body1">
                                    Si obtubiste el codigo, ingresalo aquí.
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 12 }}>
                                <form onSubmit={completarMision} id="complete-Mision" autoComplete="off">
                                    <TextField
                                        id="codigo_mision"
                                        name="codigo_mision"
                                        label="Codigo"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        required
                                    />
                                </form>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button type="submit" form="complete-Mision" variant="contained" color="primary">Confirmar</Button>
                    </CardActions>
                    {/* difName(mision.dificultad) */}
                </Card>
            </Modal>

            {/* Modal de Producto */}
            <Modal
                open={openFleiz}
                onClose={handleFeliz}
                aria-labelledby="articulo-modal"
                aria-describedby="articulo-modal"
                aria-hidden="false"
            >
                <Card sx={styleModal} style={{ border: "solid 3px" + difColor(mision.dificultad), boxShadow: "0 0 5px" + difColor(mision.dificultad) }}>
                    <CardHeader
                        action={
                            <IconButton aria-label="Close" onClick={handleFeliz}>
                                <CloseIcon />
                            </IconButton>
                        }
                        title={usuario?.nickname}
                    />
                    <Divider />
                    <CardContent style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <Grid container spacing={1}>
                            <Grid size={{ xs: 12, md: 12 }}>
                                <Typography variant="h6" fontWeight={"bold"} textAlign={"center"} className="rainbow">
                                    FELICIDADES!!!
                                </Typography>
                                <Typography variant="h5" fontWeight={"bold"} textAlign={"center"}>
                                    Subiste {puestosSubidos} puesto(s)
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Modal>

        </>
    );
}

export default Mision;
