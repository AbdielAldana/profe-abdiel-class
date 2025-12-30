// ReactJS
import React, { useEffect } from "react";

// Material UI
import {
    Grid,
    Typography,
} from "@mui/material";

// Componentes Generales
import { useTablon } from "../../contexts/TablonContext"; // ajusta
import ArticuloCompra from "../../components/Tablon/Tienda/ArticuloCompra";

// Utils
import { getLevelData } from "../../utils/levelUtils";

// iconos
import { GiRupee } from "react-icons/gi";
import ViewTitulo from "../../components/Tablon/Perfil/ViewTitulo";


function Tienda() {
    const { usuario, recompensas, getRecompensas } = useTablon();

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
                update={getRecompensas}
            />
            <Grid size={{ xs: 12 }}>
                <Typography variant="h6" fontWeight={"bold"}>
                    Ventajas
                </Typography>
            </Grid>
            {/* Articulos */}
            {recompensas !== null &&
                recompensas
                    .filter((r) => r.visible !== false)
                    .filter((r) => r.tipo !== "Cosmetico")
                    .sort((a, b) => a.costo - b.costo)
                    .sort((a, b) => a.nivel_min - b.nivel_min)
                    .sort((a, b) => a.clase - b.clase)
                    .map((re, i) => {
                        return (
                            <Grid key={i} size={{ xs: 12, md: 6 }}>
                                <ArticuloCompra articulo={re} />
                            </Grid>
                        );
                    })
            }
            <Grid size={{xs:12}}>
                <Typography variant="h6" fontWeight={"bold"}>
                    Cosmeticos
                </Typography>
            </Grid>
            {recompensas !== null &&
                recompensas
                    .filter((r) => r.visible !== false)
                    .filter((r) => r.tipo === "Cosmetico")
                    .sort((a, b) => a.costo - b.costo)
                    .sort((a, b) => a.nivel_min - b.nivel_min)
                    .sort((a, b) => a.clase - b.clase)
                    .map((re, i) => {
                        return (
                            <Grid key={i} size={{ xs: 12, md: 6 }}>
                                <ArticuloCompra articulo={re} />
                            </Grid>
                        );
                    })
            }
        </Grid>
    );
}

export default Tienda;
