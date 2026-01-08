import { useState, useEffect, useRef } from "react";

import { Link, Breadcrumbs, Button, Divider, Grid, Typography } from "@mui/material";


import confetti from "canvas-confetti";
import { useTablon } from "../../../contexts/TablonContext";
import { getLevelData } from "../../../utils/levelUtils";

import { GiRupee } from "react-icons/gi";
import { GiBirdClaw } from "react-icons/gi";
import { GiBleedingEye } from "react-icons/gi";
import { GiCapybara } from "react-icons/gi";
import { GiDemolish } from "react-icons/gi";

import mesaImg from "../../../img/mesa.jpg"
import { useCookies } from "react-cookie";


function Ui_blackjack(p) {

    const { usuario, postPuntos } = useTablon();
    const [cookies, setCookie] = useCookies(["puntosGanados"])

    const setCook = (pts) => {
        console.log(pts);

        let cook = cookies.puntosGanados + pts
        setCookie("puntosGanados", cook, {
            path: "/",
            maxAge: 60 * 60 * 24,
        })
    }

    // Niveles
    const xpTotal = usuario?.p_totales ?? 0;
    const { level } = getLevelData(xpTotal);

    const puntos_disponibles = usuario === null ? 0 : usuario.p_totales - usuario.p_gastados;
    // -------------------------
    // Estado común (por ahora lo comparte blackjack)
    // -------------------------
    const [initPlay, setInitPlay] = useState(false);
    const [puntosApostados, setPuntosApostados] = useState(0);

    const [cartasBanca, setCartasBanca] = useState([]);
    const [cartasJugador, setCartasJugador] = useState([]);

    const [contJugador, setContJugador] = useState(0);
    const [contBanca, setContBanca] = useState(0);

    const [fase, setFase] = useState("bet"); // bet | player | dealer | result
    const [mensaje, setMensaje] = useState("");
    const [resultado, setResultado] = useState(null); // win | lose | tie | blackjack

    const [puntosGanados, setPuntosGanados] = useState(0)
    const sendPayload = (tipo, puntos) => {
        let tempPuntos = puntos
        let payload
        if (tipo == 0) { // Cobrar
            setPuntosGanados(0)
            payload = { matricula: usuario.matricula, puntos: tempPuntos, tipo: 1 };

        } else if (tipo == 1) { // Empate
            setPuntosGanados(tempPuntos)
            payload = { matricula: usuario.matricula, puntos: tempPuntos, tipo: 0 };
            setCook(tempPuntos)

        } else if (tipo == 2) { // Ganar
            tempPuntos = tempPuntos * 2
            setPuntosGanados(tempPuntos)
            payload = { matricula: usuario.matricula, puntos: tempPuntos, tipo: 0 };
            setCook(tempPuntos)

        } else if (tipo == 3) { // BlackJack
            tempPuntos = tempPuntos * 3
            setPuntosGanados(tempPuntos)
            payload = { matricula: usuario.matricula, puntos: tempPuntos, tipo: 0 };
            setCook(tempPuntos)

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

    // -------------------------
    // Helpers random (común)
    // -------------------------
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const getRandomIcon = () => {
        const r = randomInt(1, 4);
        if (r === 1) return <GiBirdClaw size={50} />;
        if (r === 2) return <GiBleedingEye size={50} />;
        if (r === 3) return <GiCapybara size={50} />;
        return <GiDemolish size={50} />;
    };

    const fmtCarta = (n) => (n < 11 && n > 1 ? n : n === 1 ? "A" : n === 11 ? "J" : n === 12 ? "Q" : "K");

    // =========================
    // BLACKJACK (21) — NAMESPACED
    // =========================
    const blackjack_valorCarta = (n) => {
        if (n === 1) return 11; // As default 11
        if (n >= 11) return 10; // J Q K
        return n; // 2-10
    };

    const blackjack_totalMano = (mano, onlyView = true) => {
        let total = 0;
        let aces = 0;

        mano.forEach((c) => {
            if (onlyView && !c.view) return;

            const v = blackjack_valorCarta(c.number);
            total += v;
            if (c.number === 1) aces += 1;
        });

        // Ajuste As: 11 -> 1 (resta 10) mientras se pase de 21
        while (total > 21 && aces > 0) {
            total -= 10;
            aces -= 1;
        }

        return total;
    };

    const blackjack_actualizarContadores = (manoJugador, manoBanca) => {
        setContJugador(blackjack_totalMano(manoJugador, true));
        setContBanca(blackjack_totalMano(manoBanca, true)); // banca solo visibles si hay ocultas
    };

    const blackjack_reset = () => {
        setInitPlay(false);
        setPuntosApostados(0);

        setCartasBanca([]);
        setCartasJugador([]);

        setContJugador(0);
        setContBanca(0);

        setFase("bet");
        setMensaje("");
        setResultado(null);
    };

    // const blackjack_salirAlMenu = () => {
    //     blackjack_reset();
    //     // setJuego(null);
    // };

    const blackjack_textoResultado = () => {
        if (!resultado) return null;
        if (resultado === "blackjack") return "BLACKJACK";
        if (resultado === "win") return "VICTORIA";
        if (resultado === "lose") return "DERROTA";
        return "EMPATE";
    };

    const blackjack_repartir = (puntos) => {
        const tempJugador = [];
        const tempBanca = [];

        // Jugador: 2 visibles
        tempJugador.push({ number: randomInt(1, 13), icon: getRandomIcon(), view: true });
        tempJugador.push({ number: randomInt(1, 13), icon: getRandomIcon(), view: true });

        // Banca: 2 (1 visible, 1 oculta)
        tempBanca.push({ number: randomInt(1, 13), icon: getRandomIcon(), view: true });
        tempBanca.push({ number: randomInt(1, 13), icon: getRandomIcon(), view: false });

        setCartasJugador(tempJugador);
        setCartasBanca(tempBanca);

        blackjack_actualizarContadores(tempJugador, tempBanca);

        setMensaje("");
        setResultado(null);
        setFase("player");

        // Blackjack inmediato
        const tj = blackjack_totalMano(tempJugador, true);
        if (tj === 21) {
            // revela banca
            const bancaRevelada = tempBanca.map((c) => ({ ...c, view: true }));
            setCartasBanca(bancaRevelada);

            const tbFull = blackjack_totalMano(bancaRevelada, true);
            setContBanca(tbFull);

            if (tbFull === 21) {
                setResultado("tie");
                setMensaje("Empate: ambos tienen 21.");
            } else {
                setResultado("blackjack");

                // Payload
                sendPayload(3, puntos)

                setMensaje("Blackjack: 21 con 2 cartas.");
                fireworks();
            }
            setFase("result");
        } else {

            // Payload
            sendPayload(0, puntos)
        }
    };

    const blackjack_apuesta = (x) => {
        const ap = parseInt(x, 10) || 0;

        if (ap <= 0) {
            setMensaje("La apuesta debe ser mayor a 0.");
            return;
        }
        if (ap > puntos_disponibles) {
            setMensaje("No tienes puntos suficientes para esa apuesta.");
            return;
        }

        setPuntosApostados(ap);
        setInitPlay(true);
        blackjack_repartir(ap);
    };

    const blackjack_pedirOtra = () => {
        if (fase !== "player") return;

        const nueva = { number: randomInt(1, 13), icon: getRandomIcon(), view: true };
        const nextJugador = [...cartasJugador, nueva];

        setCartasJugador(nextJugador);

        const tj = blackjack_totalMano(nextJugador, true);
        setContJugador(tj);

        if (tj > 21) {
            setResultado("lose");
            setMensaje("Te pasaste de 21. Pierdes la apuesta.");
            setFase("result");
        } else if (tj === 21) {
            blackjack_plantarme(nextJugador, cartasBanca);
        }
    };

    const blackjack_plantarme = (jugadorOverride = null, bancaOverride = null) => {
        if (fase !== "player") return;

        setFase("dealer");

        const manoJugador = jugadorOverride ?? cartasJugador;

        // Revelar banca
        let manoBanca = (bancaOverride ?? cartasBanca).map((c) => ({ ...c, view: true }));

        // Banca roba hasta 17 o más
        let tb = blackjack_totalMano(manoBanca, true);
        while (tb < 17) {
            manoBanca = [...manoBanca, { number: randomInt(1, 13), icon: getRandomIcon(), view: true }];
            tb = blackjack_totalMano(manoBanca, true);
        }

        const tj = blackjack_totalMano(manoJugador, true);

        setCartasBanca(manoBanca);
        setContBanca(tb);

        // Resolver + pagos (tu misma lógica actual)
        if (tb > 21) {
            setResultado("win");

            // Payload
            sendPayload(2, puntosApostados)

            lanzarConfeti();
            setMensaje("La banca se pasó de 21. Ganaste.");
        } else if (tj > tb) {
            setResultado("win");

            // Payload
            sendPayload(2, puntosApostados)

            lanzarConfeti();
            setMensaje("Ganaste por mejor mano.");
        } else if (tj < tb) {
            setResultado("lose");
            setMensaje("La banca ganó por mejor mano.");
        } else {
            setResultado("tie");

            // Payload
            sendPayload(1, puntosApostados)

            setMensaje("Empate. Recuperas tu apuesta.");
        }

        setFase("result");
    };

    const salir = (x) => {
        if (x == 0) {
            p.setJuego(null)
            p.setPlay(false)
        } else {
            p.setJuego(null)
        }
    }

    return (
        <Grid container spacing={2} style={{ marginTop: "20px" }} justifyContent={"center"}>
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
                        Blackjack
                    </Typography>
                </Breadcrumbs>
                {/* <div style={{ width: 64 }} /> */}
            </Grid>

            <Grid size={{ xs: 12 }}>
                <Typography variant="h6" textAlign="center" fontWeight="bold">
                    Banca tiene: {contBanca}
                </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
                <div className={cartasBanca.length > 3 ? "cartas plus" : "cartas"} style={{ backgroundImage: "url(" + mesaImg + ")" }}>
                    {cartasBanca.map((car, i) => (
                        <div className="carta" key={i}>
                            <Typography textAlign="center" variant="h2" fontWeight="bold">
                                {car.view ? fmtCarta(car.number) : "?"}
                            </Typography>
                            {car.icon}
                        </div>
                    ))}
                </div>
            </Grid>


            <Grid size={{ xs: 12 }}>
                <Typography variant="h6" textAlign="center" fontWeight="bold">
                    Tus Cartas
                </Typography>
                <Typography variant="h6" textAlign="center" fontWeight="bold">
                    {contJugador} te falta {Math.max(0, 21 - contJugador)}
                </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
                <div className={cartasJugador.length > 3 ? "cartas plus" : "cartas"} style={{ backgroundImage: "url(" + mesaImg + ")" }}>
                    {cartasJugador.map((car, i) => (
                        <div className="carta" key={i}>
                            <Typography textAlign="center" variant="h2" fontWeight="bold">
                                {fmtCarta(car.number)}
                            </Typography>
                            {car.icon}
                        </div>
                    ))}
                </div>
            </Grid>


            {/* Mensaje / Resultado */}
            {(mensaje || resultado) && (
                <Grid size={{ xs: 12 }}>
                    <Typography
                        textAlign="center"
                        variant="h4"
                        fontWeight="bold"
                        className={resultado === "blackjack" || resultado === "win" ? "rainbow" : ""}
                        color={resultado === "lose" ? "error" : ""}
                    >
                        {blackjack_textoResultado()}
                    </Typography>

                    {mensaje && (
                        <Typography textAlign="center" variant="body1">
                            {mensaje}
                        </Typography>
                    )}
                </Grid>
            )}

            {!p.permiso && !initPlay &&
                <Grid size={{ xs: 12, md: 8 }} display="flex" justifyContent="space-evenly" alignItems="center">
                    <Typography textAlign="center" variant="h6">
                        Ya ganaste 1000 puntos hoy, regresa en 24 horas
                    </Typography>
                </Grid>
            }

            {/* Apuesta */}
            {p.permiso && !initPlay && (
                <>
                    <Grid size={{ xs: 12, md: 8 }} display="flex" justifyContent="space-evenly" alignItems="center">
                        <Typography textAlign="center" variant="h6">
                            Puntos a Jugar:
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 8 }} display="flex" justifyContent="space-evenly" alignItems="center" flexWrap="wrap" gap={1}>
                        <button class="btn-medieval" onClick={() => blackjack_apuesta(5)} disabled={puntos_disponibles < 5}>
                            <GiRupee style={{ color: "#c9a24d" }} />5
                        </button>
                        <button class="btn-medieval" onClick={() => blackjack_apuesta(15)} disabled={puntos_disponibles < 15}>
                            <GiRupee style={{ color: "#c9a24d" }} />15
                        </button>
                        <button class="btn-medieval" onClick={() => blackjack_apuesta(50)} disabled={puntos_disponibles < 50}>
                            <GiRupee style={{ color: "#c9a24d" }} />50
                        </button>
                        <button class="btn-medieval" onClick={() => blackjack_apuesta(200)} disabled={puntos_disponibles < 200}>
                            <GiRupee style={{ color: "#c9a24d" }} />200
                        </button>
                        <button class="btn-medieval" disabled={puntos_disponibles <= 0} onClick={() => blackjack_apuesta(puntos_disponibles > 500 ? 500 : puntos_disponibles)}>
                            <GiRupee style={{ color: "#c9a24d" }} />{puntos_disponibles > 500 ? 500 : puntos_disponibles}
                        </button>
                    </Grid>
                </>
            )}

            {/* Botones de juego */}
            {initPlay && puntosApostados > 0 && fase !== "result" && (
                <Grid size={{ xs: 12 }} display="flex" justifyContent="space-evenly">
                    {/* <Button variant="contained" size="medium" color="primary" onClick={() => blackjack_plantarme()} disabled={fase !== "player"}>
                        Plantarme
                    </Button> */}
                    <button class="btn-medieval gray" onClick={() => blackjack_plantarme()} disabled={fase !== "player"}>
                        Plantarme
                    </button>
                    <button class="btn-medieval gold" onClick={blackjack_pedirOtra} disabled={fase !== "player"}>
                        Pedir Otra
                    </button>

                    {/* <Button variant="contained" size="medium" color="secondary" onClick={blackjack_pedirOtra} disabled={fase !== "player"}>
                        Pedir Otra
                    </Button> */}
                </Grid>
            )}

            {/* Reiniciar */}
            {fase === "result" && (
                <Grid size={{ xs: 12 }} display="flex" justifyContent="center" gap={2}>
                    {/* <Button variant="contained" size="medium" color="secondary" onClick={blackjack_reset}>
                        Jugar otra vez
                    </Button> */}
                    <button class="btn-medieval gold" onClick={blackjack_reset}>
                        Jugar de Nuevo
                    </button>
                </Grid>
            )}

            {/* Puntos Apostados */}
            {puntosApostados > 0 && resultado == null && (
                <Grid size={{ xs: 12 }} display="flex" justifyContent="center" alignItems="center" gap={1}>
                    <GiRupee size={30} color={usuario?.color} />
                    <Typography textAlign="center" variant="h6" fontWeight="bold">
                        {puntosApostados} jugados
                    </Typography>
                </Grid>
            )}
            {puntosApostados > 0 && resultado !== null && (
                <Grid size={{ xs: 12 }} display="flex" justifyContent="center" alignItems="center" gap={1}>
                    <GiRupee size={30} color={usuario?.color} />
                    <Typography textAlign="center" variant="h6" fontWeight="bold">
                        {puntosGanados} ganados
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default Ui_blackjack;