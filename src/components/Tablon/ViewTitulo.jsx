import { useState } from "react";
import { Typography } from "@mui/material"
import { useTablon } from "../../components/Tablon/TablonContext";
import FondoDecorativo from "./FondoDecorativo";

function ViewTitulo(params) {
    const { usuario } = useTablon();

    const [color, setColor] = useState(usuario ? usuario.color : "#344955")

    return (
        <div className="viewtitulo">
            <Typography variant="h4" fontWeight={"bold"} style={{color: color}}>{params.texto}</Typography>
            <div className="adornoTitulo" style={{ backgroundColor: color }}>
                <FondoDecorativo fondo={parseInt(usuario?.fondo)} />
            </div>
        </div>
    )
}

export default ViewTitulo