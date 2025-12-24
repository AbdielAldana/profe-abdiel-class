// ReactJS
import React, { useEffect, useRef, useState } from "react";

// Material UI
import {
    Grid,
    Paper,
    Typography,
    Button,
    MenuItem,
    Divider,
    Modal,
    TextField,
    Chip,
} from "@mui/material";
import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';



import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Componentes Generales
import { useCookies } from "react-cookie";
import axios, { all } from "axios";
import { ToastContainer, toast } from "react-toastify";

// Utils
import { difColor, difColorName, difName } from "../../../utils/dificultadUtils";

// Iconos
import CloseIcon from '@mui/icons-material/Close';

// Styles
const style = {
    all: "unset",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        xs: "340px",
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

const buttonClose = {
    position: "absolute",
    // marginLeft: "90%",
    display: "flex",
    justifySelf: "end",
    top: "-1px",
    right: "-1px",
}

const chipstyle = {
    mr: 4
    // position: "absolute",
    // top: "-5px",
    // right: "-10px",
    // transform: "rotate(15deg)"
}

function ModalMision(p) {
    const [cookies, setCookie] = useCookies(["matricula_actual"]);

    // Valores de los colores Misiones
    const misionnombre = difName(p?.mision?.dificultad);
    const misioncolor = difColor(p?.mision?.dificultad);
    const misioncolornombre = difColorName(p?.mision?.dificultad);

    // Contador
    const getTiempoRestante = (fechaFinGlobal) => {
        const fin = new Date(fechaFinGlobal.replace(" ", "T")).getTime();
        const ahora = new Date().getTime();

        const diferencia = fin - ahora;

        if (diferencia <= 0) {
            return "Vencida";
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
        const segundos = Math.floor((diferencia / 1000) % 60);

        return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    };

    const [_, setTick] = React.useState(0);


    useEffect(() => {
        const i = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(i);
    }, []);

    return (
        <Modal
            open={p.openData}
            onClose={p.handleOpenData}
            aria-labelledby="modal-misiones"
            aria-describedby="modal-misiones"
        >

            <Card sx={style} style={{ border: "solid 1px" + misioncolor, boxShadow: "0 0 5px" + misioncolor }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: misioncolor }} aria-label="recipe">
                            {misionnombre[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="Close" onClick={p.handleOpenData}>
                            <CloseIcon />
                        </IconButton>
                    }
                    title={p.mision.subNombre}
                    subheader={"Termina en:  " + getTiempoRestante(p.mision.fechaFinGlobal)}
                />
                <Divider sx={{ my: 2 }} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {p.mision.nombre}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {p.mision.lore}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                        variant="subtitle1"
                        fontWeight={"bold"}
                    // gutterBottom
                    >
                        Objetivo
                    </Typography>
                    <Typography
                        variant="body1"
                        gutterBottom
                    >
                        {p.mision.objetivo}
                    </Typography>
                    {p.mision.requisitos.length > 0 &&
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Typography
                                variant="subtitle1"
                                fontWeight={"bold"}
                                gutterBottom
                            >
                                Requisitos
                            </Typography>
                            {p.mision.requisitos.map((e, i) => {
                                return (
                                    <Typography
                                        key={i}
                                        variant="body1"
                                        gutterBottom
                                    >
                                        - {e}
                                    </Typography>
                                )
                            })}
                        </>
                    }
                </CardContent>
                <Divider sx={{ my: 2 }} />
                {cookies.matricula_actual &&
                    <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button size="small" variant="contained" color={misioncolornombre}>Participar</Button>
                        {/* <Button size="small" variant="outlined">Learn More</Button> */}
                    </CardActions>
                }
                {!cookies.matricula_actual &&
                    <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
                        Registrate para Participar.
                    </Typography>
                }
            </Card>

        </Modal>
    )
}

export default ModalMision