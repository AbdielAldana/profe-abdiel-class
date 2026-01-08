import { useState, useEffect, useRef } from "react";

import { Link, Breadcrumbs, Button, Divider, Grid, Typography } from "@mui/material";


import confetti from "canvas-confetti";
import { useTablon } from "../../../contexts/TablonContext";
import { getLevelData } from "../../../utils/levelUtils";
import { createDiceBox } from "./diceBox";

import { GiRupee } from "react-icons/gi";
import { GiBeastEye } from "react-icons/gi";
import { useCookies } from "react-cookie";

function CofreMaldito(p) {
    const { usuario, postPuntos } = useTablon();
    const [cookies, setCookie] = useCookies(["puntosGanados"]);

    // Niveles
    const xpTotal = usuario?.p_totales ?? 0;
    const { level } = getLevelData(xpTotal);

    const puntos_disponibles = usuario === null ? 0 : usuario.p_totales - usuario.p_gastados;

    const [inicio, setInicio] = useState(false)
    const [abriendo, setAbriendo] = useState(false)
    const [abierto, setAbierto] = useState(false)

    const [puntosJugados, setPuntosJugados] = useState(0)
    const [juegos, setJuegos] = useState(0)
    const [sumaPuntos, setSumaPuntos] = useState(0)
    const [viewPremio, setViewPremio] = useState(0)

    const iniciar = (g, p) => {
        setInicio(true)
        setPuntosJugados(p)
        setJuegos(g)
        sendPayload(p, 1)
    }


    const jugar = () => {
        let numRando = Math.floor(Math.random() * 100) + 1;


        setJuegos(juegos - 1)
        setAbriendo(true)
        setTimeout(() => {
            let result = premio(numRando)
            setAbriendo(false)
            setAbierto(true)
            setSumaPuntos(sumaPuntos + Math.round(result))
            setViewPremio(Math.round(result));
        }, 700)

    }

    const REGLAS_COFRE = [
        // 1%  → -200 pts
        { min: 100, max: 100, mult: -2 },

        // 4%  → -98 a -99 pts
        { min: 96, max: 99, mult: -1 },

        // 5%  → 0 pts
        { min: 91, max: 95, mult: 0 },

        // 5%  → +258 a +270 pts
        { min: 86, max: 90, mult: 3 },

        // 10% → +152 a +170 pts
        { min: 76, max: 85, mult: 2 },

        // 15% → +91.5 a +112.5 pts
        { min: 61, max: 75, mult: 1.5 },

        // 25% → +36 a +60 pts
        { min: 36, max: 60, mult: 1 },

        // 35% → +0.5 a +17.5 pts
        { min: 1, max: 35, mult: 0.5 },
    ];

    const sendPayload = (pts, tipo) => {
        let payload = { matricula: usuario.matricula, puntos: Math.abs(pts), tipo: tipo };
        postPuntos(payload);
    }

    const premio = (random) => {
        const regla = REGLAS_COFRE.find(
            r => random >= r.min && random <= r.max
        );
        // const puntosRecalculados = puntosJugados === 20 ? puntosJugados : puntosJugados === 50 ? Math.ceil(puntosJugados / 3) : Math.ceil(puntosJugados / 5)
        const puntosRecalculados = puntosJugados / 2
        const result = puntosRecalculados * regla.mult;
        const final = Math.round(result)
        if (final < 0) {
            sendPayload(final, 1)
        } else if (final > 0) {
            let cook = cookies.puntosGanados + final
            setCookie("puntosGanados", cook, {
                path: "/",
                maxAge: 60 * 60 * 24,
            })
            sendPayload(final, 0)
        }

        return final;
    };

    const reset = () => {
        setAbierto(false)
        if (juegos === 0) {
            setInicio(false)
            setSumaPuntos(0)
        }
    }

    const salir = (x) => {
        if (x == 0) {
            p.setJuego(null)
            p.setPlay(false)
        } else {
            p.setJuego(null)
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }} display="flex" justifyContent="center" alignItems="center">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link onClick={() => { salir(0) }}>
                        <Typography variant="h6" textAlign="center" fontWeight="bold">
                            Inicio
                        </Typography>
                    </Link>
                    <Link onClick={() => { salir(1) }}>
                        <Typography variant="h6" textAlign="center" fontWeight="bold">
                            Juegos
                        </Typography>
                    </Link>
                    <Typography variant="h6" textAlign="center" fontWeight="bold" color="secondary">
                        Cofre Maldito
                    </Typography>
                </Breadcrumbs>
            </Grid>
            <Grid size={12} display={"flex"} justifyContent={"center"}>
                <div className={abriendo ? "chest abriendo" : abierto ? "chest abierto" : "chest"}>
                    <div className="chest_top">
                        <div className="chest_ojo"></div>
                    </div>
                    <div className="chest_bottom"></div>
                    <div className="chest_interiro">
                        {/* <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
                            <GiBeastEye size={80} />
                            <GiBeastEye className="ojoder" size={80} />
                        </div> */}
                        {/* <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
                            <Typography variant="h3" fontWeight={"bold"} style={{ display: "flex", alignItems: "center" }}>
                                <GiRupee style={{ color: "#c9a24d" }} /> + 50
                            </Typography>
                        </div> */}
                        <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
                            <Typography variant="h3" fontWeight={"bold"} style={{ display: "flex", alignItems: "center" }}>
                                <GiRupee style={{ color: "#c9a24d" }} />{viewPremio}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Grid>
            {juegos === 0 && !inicio &&
                <Grid size={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Typography variant="h6" style={{ display: "flex", alignItems: "center" }}>
                        Compra tus cofres:
                    </Typography>
                </Grid>
            }
            {juegos === 0 && inicio &&
                <Grid size={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {!abriendo &&
                        <Typography variant="h6" style={{ display: "flex", alignItems: "center" }}>
                            Ya no tienes jugadas
                        </Typography>
                    }
                    {abriendo &&
                        <Typography variant="h6">Abriendo</Typography>
                    }
                </Grid>
            }
            {juegos > 0 && inicio &&
                <Grid size={12} display={"flex"} justifyContent={"space-evenly"}>
                    {juegos > 1 && !abriendo &&
                        <Typography variant="h6">Tienes {juegos} jugadas</Typography>
                    }
                    {juegos == 1 && !abriendo &&
                        <Typography variant="h6">Tienes {juegos} jugada</Typography>
                    }
                    {abriendo &&
                        <Typography variant="h6">Abriendo</Typography>
                    }
                </Grid>
            }

            {!p.permiso && !inicio &&
                <Grid size={{ xs: 12, md: 8 }} display="flex" justifyContent="space-evenly" alignItems="center">
                    <Typography textAlign="center" variant="h6">
                        Ya ganaste 1000 puntos hoy, regresa en 24 horas
                    </Typography>
                </Grid>
            }

            {p.permiso && !inicio && (
                <Grid size={12} display={"flex"} justifyContent={"space-evenly"}>
                    <div>
                        <button className="btn-medieval" onClick={() => { iniciar(1, 20) }}
                            disabled={puntos_disponibles < 20}
                        >
                            <GiRupee style={{ color: "#c9a24d" }} />20
                        </button>
                        <Typography variant="subtitle1" textAlign={"center"}>x1</Typography>
                    </div>
                    <div>
                        <button className="btn-medieval" onClick={() => { iniciar(3, 50) }}
                            disabled={puntos_disponibles < 50}
                        >
                            <GiRupee style={{ color: "#c9a24d" }} />50
                        </button>
                        <Typography variant="subtitle1" textAlign={"center"}>x3</Typography>
                    </div>
                    <div>
                        <button className="btn-medieval" onClick={() => { iniciar(5, 150) }}
                            disabled={puntos_disponibles < 150}
                        >
                            <GiRupee style={{ color: "#c9a24d" }} />150
                        </button>
                        <Typography variant="subtitle1" textAlign={"center"}>x5</Typography>
                    </div>
                </Grid>
            )}

            {inicio && !abierto && (
                <Grid size={12} display={"flex"} justifyContent={"space-evenly"}>
                    <button className="btn-medieval gold" onClick={jugar}
                        disabled={abriendo}
                    >
                        Abrir
                    </button>
                </Grid>
            )}
            {inicio && abierto && juegos > 0 &&
                <Grid size={12} display={"flex"} justifyContent={"center"}>
                    <button className="btn-medieval" onClick={reset}>
                        Siguiente
                    </button>
                </Grid>
            }
            {inicio && abierto && juegos === 0 &&
                <Grid size={12} display={"flex"} justifyContent={"center"}>
                    <button className="btn-medieval gray" onClick={reset}>
                        Reiniciar
                    </button>
                </Grid>
            }
            {inicio &&
                <Grid size={12} display={"flex"} justifyContent={"center"}>
                    <Typography variant="h6" fontWeight="bold" textAlign={"center"} style={{ display: "flex", alignItems: "center" }}>
                        <GiRupee style={{ color: usuario?.color }} /> {sumaPuntos}
                    </Typography>
                </Grid>
            }

            <Grid size={12} >
                <Divider />
            </Grid>

        </Grid >
    )

}

export default CofreMaldito