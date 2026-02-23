// ReactJS
import React, { useState } from "react";

// Material UI
import {
    Grid,
    Paper,
    Typography,
    Button,
    Divider,
    TextField,
    Alert,
    Modal,
    Pagination,
} from "@mui/material";

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
import { toast } from "react-toastify";

import { GiRupee } from "react-icons/gi";
import CloseIcon from '@mui/icons-material/Close';

import confetti from "canvas-confetti";
import { useTablon } from "../../../contexts/TablonContext"; // ajusta
import { getLevelData } from "../../../utils/levelUtils";

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

function Transferencias(p) {

    const { usuario, postTransferir } = useTablon();

    // Calculo de Niveles
    const xpTotal = usuario?.p_totales ?? 0;
    const { level, progreso, xpFaltante, earnedInLevel, cost } = getLevelData(xpTotal);

    const bolsa = usuario?.p_totales - usuario?.p_gastados

    const [openData, setOpenData] = useState(false)
    const handleOpenData = () => {
        setOpenData(!openData)
    }

    const transf = async (event) => {
        event.preventDefault();
        handleOpenData()
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        let tempJson = {
            matricula: usuario.matricula,
            concepto: formJson.concepto,
            codigo_visible: formJson.codigo_visible,
            cantidad: formJson.cantidad

        }


        try {
            const call = await postTransferir(tempJson)
            if (call.data.ok) {
                lanzarConfeti()
            }
        } catch (err) {
            console.error(err.msg);
        }

    }

    const lanzarConfeti = () => {
        confetti({
            zIndex: 1500,
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    };


    // PAginacion

    const itemsPerPage = 5;

    const [page, setPage] = useState(1);

    const transferencias = usuario?.transferencias || [];
    const totalItems = transferencias.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * itemsPerPage;
    const currentItems = transferencias.slice(
        startIndex,
        startIndex + itemsPerPage
    );


    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 12 }} display={"flex"} justifyContent={"center"}>
                    <Typography variant="h6" >
                        Codigo Unico: <b>{usuario.id}</b>
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 12 }} display={"flex"} justifyContent={"center"}>
                    <Typography variant="h6" >
                        Saldo
                    </Typography>
                    <GiRupee size={30} color={usuario.color} />
                    <Typography variant="h6" >
                        <b>{bolsa}</b> puntos
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                    <Button variant="contained" color="success" size="large" style={{ width: "100%" }} onClick={handleOpenData}>
                        <GiRupee size={25} /> - Tranferencia - <GiRupee size={25} />
                    </Button>
                </Grid>

                <Grid size={{ xs: 12, md: 12 }} display={"flex"} justifyContent={"center"}>
                    <Typography variant="h6" >
                        Movimientos
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 12 }} >
                    <Divider />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }} display={"flex"} justifyContent={"center"}>
                    {totalPages > 1 && (
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChange}
                        />                        
                    )}
                </Grid>


                {currentItems
                    .map((el, i) => {
                        return (
                            <Grid size={{ xs: 12, md: 12 }} key={i}>
                                {el.tipo === "receptor" &&
                                    <>
                                        <Typography variant="subtitle1">Concepto <b>{el.concepto}</b></Typography>
                                        <Typography color="success" variant="h6"><GiRupee /> +{el.cantidad} por {el.otro_nickname}</Typography>
                                        <Typography variant="subtitle2">Recibido el {el.fecha}</Typography>
                                    </>
                                }
                                {el.tipo === "emisor" &&
                                    <>
                                        <Typography variant="subtitle1" textAlign={"right"}>Concepto <b>{el.concepto}</b></Typography>
                                        <Typography color="error" variant="h6" textAlign={"right"}><GiRupee /> -{el.cantidad} a {el.otro_nickname}</Typography>
                                        <Typography variant="subtitle2" textAlign={"right"}>Enviado  el {el.fecha}</Typography>
                                    </>
                                }
                                <Divider />
                            </Grid>
                        )
                    })
                }

                


            </Grid>

            <Modal
                open={openData}
                onClose={handleOpenData}
                aria-labelledby="articulo-modal"
                aria-describedby="articulo-modal"
                aria-hidden="false"
            >
                <Card sx={styleModal} style={{ border: "solid 1px" + usuario?.color, boxShadow: "0 0 5px" + usuario?.color }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: usuario?.color }} aria-label="recipe">
                                <GiRupee />
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="Close" onClick={handleOpenData}>
                                <CloseIcon />
                            </IconButton>
                        }
                        title={"Transferencia de Gemas"}
                        subheader={"Confirma tu destino."}
                    />
                    <CardContent>
                        <form onSubmit={transf} id="crear-Mision" autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        type="number"
                                        label="Codigo Unico Externo"
                                        variant="outlined"
                                        fullWidth
                                        id="codigo_visible"
                                        name="codigo_visible"
                                        required
                                        helperText="Pide el codigo al receptor."
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        type="number"
                                        label="Cantidad"
                                        variant="outlined"
                                        fullWidth
                                        id="cantidad"
                                        name="cantidad"
                                        required
                                        helperText="Verifica bien la cantidad"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        type="text"
                                        maxRows={50}
                                        label="Concepto"
                                        variant="outlined"
                                        fullWidth
                                        id="concepto"
                                        name="concepto"
                                        required
                                        helperText="No ofendas sin necesidad (solo por las jajas)"
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>

                    <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="success" type="submit" form="crear-Mision">Transferir</Button>
                    </CardActions>

                </Card>
            </Modal>
        </>
    )
}

export default Transferencias