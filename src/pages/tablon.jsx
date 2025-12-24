// ReactJS
import React, { useEffect, useRef, useState } from "react";

// Material UI
import {
    Divider,
    Grid,
    Typography,
} from "@mui/material";

// Componentes Generales
import { TablonProvider } from "../components/Tablon/TablonContext"; // ajusta la ruta
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";

import { Outlet, useNavigate } from "react-router";

// Componentes Propios
import NavbarBottomTablon from "../components/Tablon/NavbarBottomTablon";

// Icons
import { GiBookmark } from "react-icons/gi";

const tipo_entrega = [
    { id: 0, nombre: "Imagen", accept: "image/*" },
    { id: 1, nombre: "PDF", accept: "application/pdf" },
    { id: 2, nombre: "ZIP", accept: ".zip" },
    { id: 3, nombre: "Enlace", accept: null },
    { id: 4, nombre: "Codigo", accept: "sring" }
]

const demo = [{
    id_mision: 0,
    dificultad: 0,
    nombre: "",
    subNombre: "",
    puntos: 0,
    lore: "",
    objetivo: "",
    requisitos: [],
    tipoEntrega: 0,
    fechaInicioGlobal: "2025-12-16 00:00:00",
    fechaFinGlobal: "2025-12-16 08:59:59",
    visible: true
}
]
function Tablon() {
    const [cookies, setCookie] = useCookies(["matricula_actual"]);
    let navigate = useNavigate();

    useEffect(() => {
        if (!cookies.matricula_actual) {
            setCookie("matricula_actual", null, { path: "/", maxAge: 60 * 60 * 24 })
            navigate("/tablon_de_misiones/Perfil");
            return
        };
        if (cookies.matricula_actual !== null) {
            setMatricula(cookies.matricula_actual)
            navigate("/tablon_de_misiones/Perfil");
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const [misiones, setMisiones] = React.useState(demo)
    const [recompensas, setRecompensas] = React.useState(null)
    const [usuarios, setUsuarios] = React.useState(null)
    const [matricula, setMatricula] = React.useState(null)
    const [usuario, setUsuario] = React.useState(null)
    const [misionesUsuario, setMisionesUsuario] = React.useState(demo)
    const [inventario, setInventario] = React.useState(null)

    return (
        <div>
            {/* <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 12 }}>
                    <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        textAlign="center"
                    >

                        <GiBookmark style={{ fontSize: "25px", marginRight: '5px' }} />
                        Gremio
                        <GiBookmark style={{ fontSize: "25px", marginLeft: '5px' }} />
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                    <Divider style={{margin: "0px 0 20px 0"}}/>
                </Grid>
            </Grid> */}

            <TablonProvider
                initial={{
                    misiones,
                    usuarios,
                    tipo_entrega,
                    usuario,
                    recompensas,
                    misionesUsuario,
                    matricula,
                    inventario
                }}
            >
                <Outlet />
            </TablonProvider>

            <NavbarBottomTablon />
            <ToastContainer autoClose={300} />
        </div>
    )
}

export default Tablon;