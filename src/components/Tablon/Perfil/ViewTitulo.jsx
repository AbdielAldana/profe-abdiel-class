import { useState } from "react";
import { Button, Typography } from "@mui/material"
import { useTablon } from "../../../contexts/TablonContext";
import FondoDecorativo from "./FondoDecorativo";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import IconButton from '@mui/material/IconButton';
import { purple } from '@mui/material/colors';

function ViewTitulo(params) {
    const { usuario } = useTablon();

    const [color, setColor] = useState(usuario ? usuario.color : "#344955")

    return (
        <div className="viewtitulo">
            <Typography variant="h4" fontWeight={"bold"} style={{ color: color }}>{params.texto}</Typography>
            <div className="adornoTitulo" style={{ backgroundColor: color }}>
                <FondoDecorativo fondo={parseInt(usuario?.fondo)} />
            </div>
            {params.update &&
                <IconButton
                    style={{ position: "absolute", zIndex: "20", top: "10px", right: "10px", backgroundColor: "#344955" }}
                    aria-label="reload" size="medium" onClick={params.update} color={purple[500]}>
                    <RestartAltIcon fontSize="inherit" style={{ color: "white" }} />
                </IconButton>
            }
        </div>
    )
}

export default ViewTitulo