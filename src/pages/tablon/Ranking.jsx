import { useEffect } from "react";
import { useTablon } from "../../components/Tablon/TablonContext";
import { Grid, Typography } from "@mui/material";
import ViewTitulo from "../../components/Tablon/ViewTitulo";
import UsuarioView from "../../components/Tablon/UsuarioView";


function Ranking(params) {
    const { usuarios, getUsuariosR } = useTablon();


    useEffect(() => {
        if (usuarios === null) { getUsuariosR() }
    }, [])

    return (

        <Grid container spacing={1} justifyContent={"center"}>
            <ViewTitulo texto="Ranking" />
            <Grid size={{ xs: 12, md: 12 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 4, md: 3 }} display={"flex"} justifyContent={"flex-start"}>
                        <Typography variant="subtitle1">
                            Pocision
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 5, md: 6 }} >
                        <Typography variant="subtitle1">
                            Nickname / Puntos
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 3, md: 3 }} display={"flex"} justifyContent={"flex-end"}>
                        <Typography variant="subtitle1">
                            Nivel
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            {usuarios !== null &&
                usuarios
                    .filter((r) => r.activo == true)
                    // .sort((a, b) => a.costo - b.costo)
                    // .sort((a, b) => a.nivel_min - b.nivel_min)
                    // .sort((a, b) => a.clase - b.clase)
                    .map((re, i) => {
                        return (
                            <Grid key={i} size={{ xs: 12, md: 12 }}>
                                <UsuarioView user={re} id={i} />
                            </Grid>
                        );
                    })
            }

        </Grid>
    )
}

export default Ranking