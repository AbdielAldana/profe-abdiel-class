import { useState, useRef } from "react";

import { Link, Breadcrumbs, Grid, Typography, Alert } from "@mui/material";
import { useTablon } from "../../../contexts/TablonContext";
import { getLevelData } from "../../../utils/levelUtils";

import { GiCrownCoin, GiPoisonGas, GiRupee } from "react-icons/gi";
import mesaImg from "../../../img/mesa2.jpg";
import { useCookies } from "react-cookie";

function HabilidadLadron(p) {
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
    const puntos_disponibles = usuario ? usuario.p_totales - usuario.p_gastados : 0;

    // Refs
    const acumuladoRondaRef = useRef(0);
    const cierreBloqueadoRef = useRef(false);

    // ---------------------------
    // Helpers
    function randomInRange(min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    function redondearDecenas(n) {
        return Math.round(n / 10) * 10;
    }

    // 1% prob para 50
    function pickValorMoneda() {
        const roll = Math.random() * 100; // 0..100
        if (roll < 1) return 50;

        // 99% restante: 1, 5, 10 (pesos ajustables)
        // 1=60%, 5=30%, 10=10%
        const r = Math.random() * 100;
        if (r < 60) return 3;
        if (r < 90) return 5;
        return 10;
    }

    function pickEstiloPos() {
        const posMode = randomInRange(1, 5);
        const top = redondearDecenas(randomInRange(1, 50)) + "%";
        const left = redondearDecenas(randomInRange(1, 50)) + "%";
        const right = redondearDecenas(randomInRange(1, 50)) + "%";
        const bottom = redondearDecenas(randomInRange(1, 50)) + "%";

        if (posMode === 2) return { top, left };
        if (posMode === 3) return { bottom, right };
        if (posMode === 4) return { top, right };
        return { bottom, left };
    }

    // ---------------------------
    // Config de costos -> rondas
    const COSTOS = [
        // { costo: 5, rondas: 2 },
        // { costo: 10, rondas: 5 },
        { costo: 25, rondas: 5 },
        { costo: 45, rondas: 10 },
        { costo: 65, rondas: 15 },
    ];

    // ---------------------------
    // Estado de juego (fases)
    // "select" = elegir costo
    // "ready"  = costo elegido, mostrar Probar
    // "playing"= ronda activa
    // "result" = fin (mostrar puntos ganados + reiniciar)
    const [fase, setFase] = useState("select");

    const [costoElegido, setCostoElegido] = useState(null);
    const [rondasRestantes, setRondasRestantes] = useState(0);

    const [elementos, setElementos] = useState([]);
    const [barra, setBarra] = useState(false);

    // Ronda actual (para HUD)
    const [acumuladoRonda, setAcumuladoRonda] = useState(0);

    // Total del juego (HUD)
    const [puntosGanadosTotal, setPuntosGanadosTotal] = useState(0);

    // ---------------------------
    // Payload builder (cobrar/pagar)
    // tipo 0 = sumar (premio)
    // tipo 1 = restar (cobro)
    const buildPayloadPuntos = ({ puntos, tipo }) => {
        return {
            matricula: usuario?.matricula,
            puntos: Math.abs(parseInt(puntos, 10) || 0),
            tipo,
        };
    };

    const aplicarResultadoRonda = async (neto) => {
        const puntosAbs = Math.abs(neto);
        if (!usuario?.matricula || puntosAbs === 0) return;

        const tipo = neto >= 0 ? 0 : 1;
        const payload = buildPayloadPuntos({ puntos: puntosAbs, tipo });
        await postPuntos(payload);
    };

    // ---------------------------
    // Seleccionar costo (cobra al inicio)
    const elegirCosto = async (costo) => {
        if (puntos_disponibles < costo) return;

        const config = COSTOS.find((x) => x.costo === costo);

        // Cobrar costo inicial
        await aplicarResultadoRonda(-costo);

        setCostoElegido(costo);
        setRondasRestantes(config?.rondas ?? 0);

        setPuntosGanadosTotal(0);

        acumuladoRondaRef.current = 0;
        setAcumuladoRonda(0);

        setElementos([]);
        setBarra(false);

        setFase("ready");
    };

    // ---------------------------
    // Iniciar una ronda (Probar)
    const iniciarRonda = () => {
        if (rondasRestantes <= 0) return;

        cierreBloqueadoRef.current = false;

        acumuladoRondaRef.current = 0;
        setAcumuladoRonda(0);

        setElementos([]);
        setBarra(true);
        setFase("playing");

        // Generar elementos con valor
        let tempElementos = [];
        let cantidad = randomInRange(0, 10);

        for (let i = 0; i < cantidad; i++) {
            const valor = pickValorMoneda();
            const tipo = randomInRange(1, 3); // 2 = buena, otro = mala
            const estilo = pickEstiloPos();

            tempElementos.push({
                numero: i,
                tipo,
                valor,
                estilo,
            });
        }

        setElementos(tempElementos);

        // Cerrar ronda a los 3s
        setTimeout(() => {
            cerrarRonda();
        }, 3000);
    };

    // ---------------------------
    // Click en moneda (suma/resta por valor)
    const accion = (type, ind, valor) => {
        setElementos((prev) => prev.filter((_, i) => i !== ind));

        const delta = type === 0 ? valor : -valor;

        acumuladoRondaRef.current += delta;
        setAcumuladoRonda(acumuladoRondaRef.current);
    };

    // ---------------------------
    // Cerrar ronda
    const cerrarRonda = async () => {
        if (cierreBloqueadoRef.current) return;
        cierreBloqueadoRef.current = true;

        setElementos([]);
        setBarra(false);

        const neto = acumuladoRondaRef.current;

        setPuntosGanadosTotal((prev) => prev + neto);
        // await aplicarResultadoRonda(neto);

        setRondasRestantes((prev) => {
            const next = prev - 1;
            setFase(next <= 0 ? "result" : "ready");

            return next;
        });
        if ((rondasRestantes - 1) <= 0) {
            await aplicarResultadoRonda(puntosGanadosTotal);
            setCook(puntosGanadosTotal)
        }
    };

    // ---------------------------
    // Reiniciar
    const reiniciar = () => {
        // await aplicarResultadoRonda(puntosGanadosTotal);
        setFase("select");
        setCostoElegido(null);
        setRondasRestantes(0);
        setElementos([]);
        setBarra(false);

        acumuladoRondaRef.current = 0;
        setAcumuladoRonda(0);

        setPuntosGanadosTotal(0);
        cierreBloqueadoRef.current = false;
    };

    // Salir
    const salir = (x) => {
        if (x === 0) {
            p.setJuego(null);
            p.setPlay(false);
        } else {
            p.setJuego(null);
        }
    };

    // ---------------------------
    // UI
    const renderBotonesCostos = () => (
        <Grid
            size={{ xs: 12 }}
            display={"flex"}
            justifyContent={"center"}
            gap={2}
            flexWrap={"wrap"}
        >
            {p.permiso &&

                COSTOS.map((c) => (
                    <div>
                        <button
                            key={c.costo}
                            className="btn-medieval"
                            onClick={() => elegirCosto(c.costo)}
                            disabled={puntos_disponibles < c.costo}
                        >
                            <GiRupee size={24} style={{ color: "gold" }} />{c.costo}
                        </button>
                        <Typography textAlign={"center"}>
                            {c.rondas} ronda{c.rondas > 1 ? "s" : ""}
                        </Typography>
                    </div>
                ))
            }
            {!p.permiso &&
                <Alert severity="error">Ya ganaste 1500 puntos hoy, regresa mañana.</Alert>
            }
        </Grid>
    );

    const renderBotonProbar = () => (
        <Grid size={{ xs: 12 }} display={"flex"} justifyContent={"center"}>
            <button
                className="btn-medieval gold"
                onClick={iniciarRonda}
                disabled={barra || rondasRestantes <= 0}
            >
                Robar
            </button>
        </Grid>
    );

    const renderBotonReiniciar = () => (
        <Grid size={{ xs: 12 }} display={"flex"} justifyContent={"center"}>
            <button className="btn-medieval" onClick={reiniciar}>
                Reiniciar
            </button>
        </Grid>
    );

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }} display="flex" justifyContent="center" alignItems="center">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link onClick={() => salir(0)}>
                        <Typography variant="h6" textAlign="center" fontWeight="bold">
                            Inicio
                        </Typography>
                    </Link>
                    <Link onClick={() => salir(1)}>
                        <Typography variant="h6" textAlign="center" fontWeight="bold">
                            Juegos
                        </Typography>
                    </Link>
                    <Typography variant="h6" textAlign="center" fontWeight="bold" color="secondary">
                        Habilidad de Ladron
                    </Typography>
                </Breadcrumbs>
            </Grid>

            <Grid size={{ xs: 12 }}>
                <Typography variant="h5" textAlign={"center"} fontWeight={"bold"}>
                    Roba el Oro
                </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
                <Grid container spacing={2} justifyContent={"center"}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <div
                            className="ladron"
                            id="ladronMesa"
                            style={{ backgroundImage: `url(${mesaImg})` }}
                        >
                            {barra && <div className="barratiempo"></div>}

                            {elementos?.map((el, i) => {
                                const esLegendaria = el.valor === 50;

                                if (el.tipo === 2) {
                                    return (
                                        <div
                                            className={`buena ${esLegendaria ? "legendaria" : ""}`}
                                            key={i}
                                            style={el.estilo}
                                            onClick={() => accion(0, i, el.valor)}
                                            title={`+${el.valor}`}
                                        >
                                            <GiCrownCoin size={50} />
                                            {/* Si quieres ver el número en UI, descomenta */}
                                            <span className="valor">+{el.valor}</span>
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        className={`mala ${esLegendaria ? "legendaria" : ""}`}
                                        key={i}
                                        style={el.estilo}
                                        onClick={() => accion(1, i, el.valor)}
                                        title={`-${el.valor}`}
                                    >
                                        <GiCrownCoin size={50} />
                                        <span className="valor">-{el.valor}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            {/* HUD */}
            <Grid size={{ xs: 12 }} display={"flex"} justifyContent={"center"} gap={3} flexWrap={"wrap"}>
                {/* <Typography>
                    Costo: <b>{costoElegido ?? "-"}</b>
                </Typography> */}
                <Typography>
                    Rondas: <b>{rondasRestantes}</b>
                </Typography>
                <Typography>
                    Ronda neto: <b>{acumuladoRonda}</b>
                </Typography>
                {/* <Typography>
                    Total: <b>{puntosGanadosTotal}</b>
                </Typography> */}
            </Grid>

            {/* Controles por fase */}
            {fase === "select" && renderBotonesCostos()}
            {fase === "ready" && renderBotonProbar()}
            {fase === "playing" && (
                <Grid size={{ xs: 12 }} display={"flex"} justifyContent={"center"}>
                    <Typography variant="body1">Atrapa monedas (3s)</Typography>
                </Grid>
            )}
            {fase === "result" && (
                <>
                    <Grid size={{ xs: 12 }} display={"flex"} justifyContent={"center"}>
                        <Typography variant="h6" fontWeight={"bold"}>
                            Robado: {puntosGanadosTotal - costoElegido} puntos
                        </Typography>
                    </Grid>
                    {renderBotonReiniciar()}
                </>
            )}
        </Grid>
    );
}

export default HabilidadLadron;
