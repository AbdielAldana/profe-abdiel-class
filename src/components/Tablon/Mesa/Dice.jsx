import { useState, useEffect, useRef } from "react";

import { Link, Breadcrumbs, Button, Divider, Grid, Typography, Alert } from "@mui/material";


import confetti from "canvas-confetti";
import { useTablon } from "../../../contexts/TablonContext";
import { getLevelData } from "../../../utils/levelUtils";
import { createDiceBox } from "./diceBox";

import { GiRupee } from "react-icons/gi";
import { GiBirdClaw } from "react-icons/gi";
import { GiBleedingEye } from "react-icons/gi";
import { GiCapybara } from "react-icons/gi";
import { GiDemolish } from "react-icons/gi";
import mesaImg from "../../../img/mesa.jpg"
import { useCookies } from "react-cookie";
function Dice(p) {
    const { usuario, postPuntos } = useTablon();
    const [cookies, setCookie] = useCookies(["puntosGanados"])

    const segundosRestantesDelDia = () => {
        const ahora = new Date();
        const finDelDia = new Date();

        finDelDia.setHours(23, 59, 59, 999);

        return Math.floor((finDelDia.getTime() - ahora.getTime()) / 1000);
    };

    const setCook = (pts) => {
        console.log(pts);
        
        let cook = cookies.puntosGanados + pts
        setCookie("puntosGanados", cook, {
            path: "/",
            maxAge: segundosRestantesDelDia(),
        })
    }

    // Niveles
    const xpTotal = usuario?.p_totales ?? 0;
    const { level } = getLevelData(xpTotal);

    const puntos_disponibles = usuario === null ? 0 : usuario.p_totales - usuario.p_gastados;
    const diceBox = useRef(null);
    const readyRef = useRef(false);

    const [initPlay, setInitPlay] = useState(false)
    const [puntosJugados, setPuntosJugados] = useState(0)
    const [resultado, setResultado] = useState(null)
    const [puntosGanados, setPuntosGanados] = useState(0)
    const [numFinales, setNumFinales] = useState([{ value: 0 }])

    const sendPayload = (tipo, puntos) => {
        let tempPuntos = puntos
        let payload
        if (tipo == 1) { // Cobrar
            payload = { matricula: usuario.matricula, puntos: tempPuntos, tipo: 1 };

        } else if (tipo == 0) { // Ganar
            payload = { matricula: usuario.matricula, puntos: tempPuntos, tipo: 0 };
        }
        postPuntos(payload);
    }

    const lanzarConfeti = () => {
        confetti({
            zIndex: 1500,
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    };


    const fireworks = () => {
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }

    // =========================================================
    // Pre Render
    // =========================================================
    useEffect(() => {
        diceBox.current = createDiceBox("#dice-box");

        (async () => {
            await diceBox.current.init();
            readyRef.current = true;
        })();

        return () => {
            try {
                diceBox.current?.hide().clear();
                diceBox.current?.remove();
            } catch (e) { }
            diceBox.current = null;
            readyRef.current = false;
        };
    }, []);

    // =========================================================
    // LOGICA
    // =========================================================

    function pagoPorDado(value, sides, pts) {
        if (value === 1) return -(pts * 2);      // penalización extra
        if (value === sides) return pts * 2;       // máximo
        if (value % 2 === 0) return pts * 1.5;       // par
        return 0;                                   // impar normal
    }

    function resolverTirada(result, pts) {
        // result = array de { value, sides }
        const total = result.reduce((acc, d) => acc + pagoPorDado(d.value, d.sides, pts), 0);
        return total; // puede ser negativo si salen 1s
    }

    const roll = async (pts, dices) => {
        setPuntosJugados(pts);
        setInitPlay(true);
        sendPayload(1, pts)
        const result = await diceBox.current.show().roll(dices, { themeColor: usuario.color });

        try {
            const pagoTotal = resolverTirada(result, pts);

            // Lo que deberías mostrar:
            // - pagoTotal: "ganancia/pérdida por dados" (puede ser negativo)
            // - netoReal: pagoTotal - pts, solo si quieres mostrar el impacto total incluyendo el costo (opcional)
            const netoReal = pagoTotal - pts;

            // console.log({ pagoTotal, netoReal });
            if (pagoTotal == 0) {
                setResultado("Tablas")
            } else if (pagoTotal > 0) {
                // console.log(result);

                result
                    .sort((a, b) => a.value - b.value)
                    .forEach(element => {
                        if (element.value === element.sides) {
                            setResultado(element.sides + " Natural")
                            fireworks()
                        } else {
                            setResultado("Ganaste")
                            lanzarConfeti()
                        }
                    });
                    console.log(pagoTotal);
                    
                setCook(pagoTotal)
                sendPayload(0, Math.abs(pagoTotal))

            } else if (pagoTotal < 0) {
                setResultado("Perdiste")
                sendPayload(1, Math.abs(pagoTotal))
            } else {
                setResultado(null)
            }

            setNumFinales(result)
            // setResultado(pagoTotal == 0 ? "Tablas" : pagoTotal > 0 ? "Ganste" : pagoTotal < 0 ? "Perdiste" : "");
            setPuntosGanados(Math.abs(pagoTotal)); // este es lo que “te dio el dado”, sumado
        } catch (e) {
            console.log(e);
        }
    };


    const replay = () => {
        setInitPlay(false)
        setResultado(null)
        // setNumFinales([])
    }


    const salir = (x) => {
        if (!initPlay || resultado !== null) {
            if (x == 0) {
                p.setJuego(null)
                p.setPlay(false)
            } else {
                p.setJuego(null)
            }
        }
    }


    return (
        <>
            <Grid container spacing={1} style={{ marginTop: "20px" }} justifyContent={"center"}>
                <Grid size={{ xs: 12 }} display="flex" justifyContent="center" alignItems="center">
                    {/* <Button variant="outlined" color="inherit" onClick={blackjack_salirAlMenu}>
                    SALIR
                </Button> */}
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
                            Dados del Destino
                        </Typography>
                    </Breadcrumbs>
                    {/* <div style={{ width: 64 }} /> */}
                </Grid>
                <Grid size={{ xs: 12, md: 8 }} display="flex" justifyContent="center" alignItems="center">
                    <div id="dice-box" style={{ height: "500px", width: "100%", backgroundImage: "url(" + mesaImg + ")", position: "relative" }}>
                        {resultado !== null &&
                            <div style={{ position: "absolute", zIndex: 500, width: "100%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Typography textAlign="center"
                                    fontWeight={"bold"}
                                    variant={resultado === "Perdiste" || resultado === "Tablas" ? "h4" : "h4"}
                                    className={resultado === "Perdiste" || resultado === "Tablas" ? "" : "rainbow"}
                                    style={resultado === "Tablas" ? { color: "white" } : {}}
                                    color={resultado === "Perdiste" ? "error" : ""}
                                >
                                    {resultado}
                                </Typography>
                            </div>
                        }
                        <Grid container spacing={2} style={{ marginTop: "20px" }} justifyContent={"center"}>
                            {numFinales &&
                                numFinales
                                    .sort((a, b) => a.value - b.value)
                                    .map((el, i) => {
                                        return (
                                            <Grid key={i} size={{ xs: 3 }} display="flex" justifyContent="center" alignItems="center">
                                                <Typography variant="h4" style={{ color: "white" }}>
                                                    {el.value}
                                                </Typography>
                                            </Grid>
                                        )
                                    })
                            }
                        </Grid>

                    </div>
                </Grid>

                {!p.permiso && !initPlay &&
                <Grid size={{ xs: 12, md: 8 }} display="flex" justifyContent="space-evenly" alignItems="center">
                    {/* <Typography textAlign="center" variant="h6">
                        Ya ganaste 1000 puntos hoy, regresa en 24 horas
                    </Typography> */}
                    <Alert severity="error">Ya ganaste {usuario.linaje == 1 ? "2500" : "1500"} puntos hoy, regresa mañana.</Alert>                    
                </Grid>
            }

                {/* <button onClick={roll}>Tirar</button> */}
                {p.permiso && !initPlay && (
                    <>
                        <Grid size={{ xs: 12 }} display="flex" justifyContent="space-evenly" alignItems="center">
                            <Typography textAlign="center" variant="h6">
                                Puntos a Jugar:
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 8 }}>
                            <Grid container spacing={2} style={{ marginTop: "20px" }}>
                                <Grid size={{ xs: 3 }} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                    {/* <Button variant="contained" size="medium" color="secondary" onClick={() => roll(10, "1d6")} disabled={puntos_disponibles < 10}>
                                        <Typography textAlign="center" variant="h6" fontWeight="bold">
                                            10
                                        </Typography>
                                    </Button> */}
                                    <button class="btn-medieval" onClick={() => roll(10, "1d6")} disabled={puntos_disponibles < 10}>
                                        <GiRupee style={{ color: "#c9a24d" }} />10
                                    </button>
                                    <Typography textAlign="center" variant="h6" fontWeight="bold">
                                        1 D 6
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 3 }} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                    {/* <Button variant="contained" size="medium" color="secondary" onClick={() => roll(50, "1d12")} disabled={puntos_disponibles < 50}>
                                        <Typography textAlign="center" variant="h6" fontWeight="bold">
                                            50
                                        </Typography>
                                    </Button> */}
                                    <button class="btn-medieval" onClick={() => roll(50, "1d12")} disabled={puntos_disponibles < 50}>
                                        <GiRupee style={{ color: "#c9a24d" }} />50
                                    </button>
                                    <Typography textAlign="center" variant="h6" fontWeight="bold">
                                        1 D 12
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 3 }} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                    {/* <Button variant="contained" size="medium" color="secondary" onClick={() => roll(100, "2d12")} disabled={puntos_disponibles < 100}>
                                        <Typography textAlign="center" variant="h6" fontWeight="bold">
                                            100
                                        </Typography>
                                    </Button> */}
                                    <button class="btn-medieval" onClick={() => roll(100, "2d12")} disabled={puntos_disponibles < 100}>
                                        <GiRupee style={{ color: "#c9a24d" }} />100
                                    </button>
                                    <Typography textAlign="center" variant="h6" fontWeight="bold">
                                        2 D 12
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 3 }} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                    {/* <Button variant="contained" size="medium" color="secondary" onClick={() => roll(puntos_disponibles > 500 ? 500 : puntos_disponibles, "4d6")} disabled={puntos_disponibles <= 0}>
                                        <Typography textAlign="center" variant="h6" fontWeight="bold">
                                            {puntos_disponibles > 500 ? 500 : puntos_disponibles}
                                        </Typography>
                                    </Button> */}
                                    <button class="btn-medieval" onClick={() => roll(puntos_disponibles > 500 ? 500 : puntos_disponibles, "1d100")} disabled={puntos_disponibles <= 0}>
                                        <GiRupee style={{ color: "#c9a24d" }} />{puntos_disponibles > 500 ? 500 : puntos_disponibles}
                                    </button>
                                    <Typography textAlign="center" variant="h6" fontWeight="bold">
                                        4 D 6
                                    </Typography>
                                </Grid>
                            </Grid>

                            {/* <Button variant="contained" size="medium" color="secondary" onClick={() => roll(15)} disabled={puntos_disponibles < 15}>
                            <Typography textAlign="center" variant="h6" fontWeight="bold">
                                15
                            </Typography>
                        </Button>

                        <Button variant="contained" size="medium" color="secondary" onClick={() => roll(50)} disabled={puntos_disponibles < 50}>
                            <Typography textAlign="center" variant="h6" fontWeight="bold">
                                50
                            </Typography>
                        </Button>

                        <Button variant="contained" size="medium" color="secondary" onClick={() => roll(200)} disabled={puntos_disponibles < 200}>
                            <Typography textAlign="center" variant="h6" fontWeight="bold">
                                200
                            </Typography>
                        </Button>

                        <Button variant="contained" size="medium" color="secondary" disabled={puntos_disponibles <= 0} onClick={() => roll(puntos_disponibles)}>
                            <Typography textAlign="center" variant="h6" fontWeight="bold">
                                {puntos_disponibles}
                            </Typography>
                        </Button> */}
                        </Grid>
                    </>
                )}

                {initPlay && resultado == null && (
                    <Grid size={{ xs: 12 }} display="flex" justifyContent="center" alignItems="center">
                        <GiRupee size={30} color={usuario?.color} />
                        <Typography textAlign="center" variant="h6" fontWeight={"bold"}>
                            {puntosJugados} en Juego
                        </Typography>
                    </Grid>
                )}

                {resultado !== null && (
                    <>
                        <Grid size={{ xs: 12 }} display="flex" justifyContent="center" alignItems="center">
                            <Typography textAlign="center"
                                fontWeight={"bold"}
                                // variant={resultado === "Perdiste" || resultado === "Tablas" ? "h5" : "h4"}
                                // className={resultado === "Perdiste" || resultado === "Tablas" ? "" : "rainbow"}
                                // color={resultado === "Perdiste" ? "error" : ""}
                                variant="h6"
                            >
                                {resultado}
                            </Typography>

                            <GiRupee size={30} color={usuario?.color} />
                            <Typography textAlign="center" variant="h6" fontWeight={"bold"}>
                                {puntosGanados}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12 }} display="flex" justifyContent="center" alignItems="center">
                            <button class="btn-medieval gold" onClick={replay}>
                                Jugar De Nuevo
                            </button>
                            {/* <Button variant="contained" color="secondary" onClick={replay}>Jugar De Nuevo</Button> */}
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    );
}

export default Dice