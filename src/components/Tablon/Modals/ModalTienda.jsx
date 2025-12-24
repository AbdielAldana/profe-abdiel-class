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

function ModalTienda({articulo, openData, handleOpenData, ICON_MAP, ViewType}) {
    const [cookies, setCookie] = useCookies(["matricula_actual"]);

    
    const IconComp = ICON_MAP[articulo.icono];
    

    return (
        <Modal
            open={openData}
            onClose={handleOpenData}
            aria-labelledby="modal-misiones"
            aria-describedby="modal-misiones"
        >

            <Card sx={style} style={{ border: "solid 1px", boxShadow: "0 0 5px"}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: ViewType(articulo.clase).color }} aria-label="recipe">
                            <IconComp size={30}/>
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="Close" onClick={handleOpenData}>
                            <CloseIcon />
                        </IconButton>
                    }
                    title={articulo.tipo + " " + articulo.uso}
                    subheader={"Nivel Min Requerido "+articulo.nivel_min}
                />
                <Divider sx={{ my: 1 }} />
                <CardContent>
                    <Typography gutterBottom variant="h6" fontWeight={"bold"}>
                        {articulo.nombre}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        Costo: {articulo.costo}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {/* {p.mision.lore} */}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                        variant="subtitle1"
                        fontWeight={"bold"}
                    // gutterBottom
                    >
                        Lore
                    </Typography>
                    <Typography
                        variant="body1"
                        gutterBottom
                    >
                        {articulo.lore}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                        variant="subtitle1"
                        fontWeight={"bold"}
                        gutterBottom
                    >
                        Descripcion
                    </Typography>
                    <Typography
                        variant="body1"
                        gutterBottom
                    >
                        {articulo.descripcion}
                    </Typography>
                    {/* {p.mision.requisitos.map((e, i) => {
                        return (
                            <Typography
                                key={i}
                                variant="body1"
                                gutterBottom
                            >
                                - {e}
                            </Typography>
                        )
                    })} */}
                </CardContent>
                <Divider sx={{ my: 2 }} />
                {cookies.matricula_actual &&
                    <CardActions style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button size="small" variant="contained" color={"secondary"}>Comprar</Button>
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

export default ModalTienda