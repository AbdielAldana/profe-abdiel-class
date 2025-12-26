// ReactJS
import React, { useEffect } from "react";

// Material UI
import {
    Grid,
    Paper,
    Typography,
    Button,
    Divider,
    CardActions,
    Avatar,
    colors,
} from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";

// Componentes Generales
import { useTablon } from "../../components/Tablon/TablonContext"; // ajusta
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import ArticuloCompra from "../../components/Tablon/ArticuloCompra";

// Utils
import { getLevelData } from "../../utils/levelUtils";
import { ViewType, IconArt, claseName, getTiempoRestante, getEstadoRecompensa, getMensajeEstado } from "../../utils/articuloTypeUtils"
import FondoDecorativo from "../../components/Tablon/FondoDecorativo";

// iconos
import { GiRupee } from "react-icons/gi";
import ViewTitulo from "../../components/Tablon/ViewTitulo";


function Tienda() {
    const { usuario, recompensas, matricula, getRecompensas } = useTablon();

    // Niveles
    const xpTotal = usuario?.p_totales ?? 0;
    const { level } = getLevelData(xpTotal);

    const puntos_disponibles =
        usuario === null ? 0 : usuario.p_totales - usuario.p_gastados;

    useEffect(() => {
        if (recompensas === null) { getRecompensas() }
    }, [])


    return (
        <Grid container spacing={2}>

            {/* Barra Abajo */}
            {usuario &&
                <div className="dataBotomUser">
                    <div className="dataPuntos">
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            className="ellipsis"
                            sx={{ m: 0, p: 0 }}
                        >

                            Nivel {level}
                        </Typography>
                    </div>
                    <div className="dataLevel">
                        <GiRupee size={30} color={usuario?.color} />
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            className="ellipsis"
                            sx={{ m: 0, p: 0 }}
                        >
                            {puntos_disponibles} Pts
                        </Typography>
                    </div>
                </div>
            }

            {/* Titulo */}

            <ViewTitulo
                texto="Tienda"
            />

            {recompensas !== null &&
                recompensas
                    .filter((r) => r.visible !== false)
                    .sort((a, b) => a.costo - b.costo)
                    .sort((a, b) => a.nivel_min - b.nivel_min)
                    .sort((a, b) => a.clase - b.clase)
                    .map((re, i) => {
                        return (
                            <Grid key={i} size={{ xs: 12, md: 6 }}>
                                <ArticuloCompra articulo={re} />
                            </Grid>
                        );
                    })}
        </Grid>
    );
}

export default Tienda;
