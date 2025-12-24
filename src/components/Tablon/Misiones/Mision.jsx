import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Divider, Chip } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

import ModalMision from "../Modals/ModalMision";
import { difColor, difColorName, difName } from "../../../utils/dificultadUtils";

const style = { p: 2, position: "relative" };

const chipstyle = {
    position: "absolute",
    top: "-5px",
    right: "-10px",
    transform: "rotate(15deg)",
};

const getTiempoRestante = (fechaFinGlobal) => {
    const fin = new Date(fechaFinGlobal.replace(" ", "T")).getTime();
    const ahora = Date.now();
    const diff = fin - ahora;

    if (diff <= 0) return "Vencida";

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
};

const frecuenciaLabel = (f) => {
    switch (Number(f)) {
        case 1:
            return "Misión Diaria";
        case 2:
            return "Misión Semanal";
        case 3:
            return "Misión Mensual";
        default:
            return null; // 0 o undefined
    }
};

function Mision(p) {
    const { mision, completada } = p;

    // Dificultad
    const misionnombre = difName(mision.dificultad);
    const misioncolor = difColor(mision.dificultad);
    const misioncolornombre = difColorName(mision.dificultad);

    // Tick para refrescar contador
    const [, setTick] = useState(0);
    useEffect(() => {
        const i = setInterval(() => setTick((t) => t + 1), 1000);
        return () => clearInterval(i);
    }, []);

    const tiempoRestante = getTiempoRestante(mision.fechaFinGlobal);
    const vencida = tiempoRestante === "Vencida";

    // Periódicas
    const esPeriodica = Number(mision.frecuencia) > 0;
    const labelPeriodicidad = frecuenciaLabel(mision.frecuencia);

    // Modal (solo abrir si es activa y no completada)
    const [openData, setOpenData] = useState(false);
    const handleOpenData = () => setOpenData((v) => !v);

    const clickable = !vencida && !completada;

    const paperSx = {
        ...style,
        border: completada
            ? "solid 2px green"
            : vencida
                ? "solid 1px gray"
                : `solid 1px ${misioncolor}`,
        boxShadow: clickable ? `0 0 5px ${misioncolor}` : undefined,
        cursor: clickable ? "pointer" : "default",
    };

    return (
        <>
            <ModalMision
                openData={openData}
                handleOpenData={handleOpenData}
                mision={mision}                
            />

            <Grid
                size={{ xs: 12, md: 6 }}
                className={clickable ? "misionSelect" : undefined}
                onClick={clickable ? handleOpenData : undefined}
            >
                <Paper sx={paperSx} className={clickable ? "misionSelectF" : undefined}>
                    {completada && (
                        <TaskAltIcon
                            className="checkedMisionIcion"
                            sx={{ position: "absolute", color: "green", fontSize: 140 }}
                        />
                    )}

                    {vencida && (
                        <QueryBuilderIcon
                            className="checkedMisionIcion"
                            sx={{ position: "absolute", color: "red", fontSize: 140 }}
                        />
                    )}

                    <Chip label={misionnombre} color={misioncolornombre} size="small" sx={chipstyle} />

                    <Grid container spacing={1}>
                        <Grid size={{ xs: 8 }}>
                            <Typography variant="h5" fontWeight="bold" className="ellipsis" sx={{ m: 0, p: 0 }}>
                                {mision.nombre}
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                                {mision.subNombre}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 4 }}>
                            <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="right">
                                {mision.puntos}pts
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Divider />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography variant="body1" gutterBottom>
                                {mision.lore}
                            </Typography>
                        </Grid>

                        {/* Activa y no completada */}
                        {!vencida && !completada && (
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom textAlign="right">
                                    {esPeriodica ? labelPeriodicidad : `Termina en: ${tiempoRestante}`}
                                </Typography>
                            </Grid>
                        )}

                        {/* Vencida y no completada */}
                        {vencida && !completada && (
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom textAlign="right">
                                    Vencida
                                </Typography>
                            </Grid>
                        )}      

                        {/* Vencida y no completada */}
                        {completada && (
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom textAlign="right">
                                    {esPeriodica ? labelPeriodicidad : `Termina en: ${tiempoRestante}`}
                                </Typography>
                            </Grid>
                        )}                        
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
}

export default Mision;
