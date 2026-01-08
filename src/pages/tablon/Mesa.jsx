import { Button, Divider, Grid, Typography, Link, Breadcrumbs, } from "@mui/material";
import { useTablon } from "../../contexts/TablonContext";
import { getLevelData } from "../../utils/levelUtils";
import { useState, useEffect, useRef } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';


import { useCookies } from "react-cookie";


import { GiRupee } from "react-icons/gi";

import Ui_blackjack from "../../components/Tablon/Mesa/Blackjack";
import Dice from "../../components/Tablon/Mesa/Dice";

import blackjackImg from "../../img/blackjack.png"
import cofreImg from "../../img/cofre.png"
import dadoImg from "../../img/dado.png"
import CofreMaldito from "../../components/Tablon/Mesa/CofreMaldito";




function Mesa(p) {
    const { usuario } = useTablon();
    const [cookies, setCookie] = useCookies(["puntosGanados"]);
    const [permiso, setPermiso] = useState(true)
    useEffect(() => {
        if (!cookies.puntosGanados) {
            setCookie("puntosGanados", 0, {
                path: "/",
                maxAge: 60 * 60 * 24,
            });
        } else if (cookies.puntosGanados >= 1500) {
            setPermiso(false)
        } else if (cookies.puntosGanados < 1500) {
            setPermiso(true)
        }
    }, [cookies.puntosGanados])

    // Niveles
    const xpTotal = usuario?.p_totales ?? 0;
    const { level } = getLevelData(xpTotal);

    const puntos_disponibles = usuario === null ? 0 : usuario.p_totales - usuario.p_gastados;

    // Pantalla de Inicio = flase
    const [play, setPlay] = useState(false);

    // Selector de juego
    const [juego, setJuego] = useState(null); // "blackjack" | "dice" | "cofre" | "oraculo"


    const handlePlay = () => setPlay(true);


    // =========================
    // UI: placeholders de juegos (por ahora)
    // =========================
    const ui_placeholder = (titulo) => {
        return (
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h6" textAlign="center" fontWeight="bold">
                        {titulo}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography textAlign="center" variant="body1">
                        En construcción. Aquí luego metemos la lógica completa.
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12 }} display="flex" justifyContent="center" gap={2}>
                    {/* <Button variant="contained" color="secondary" onClick={}>
                        Volver al menú
                    </Button> */}
                </Grid>
            </Grid>
        );
    };

    // =========================
    // UI: selector de juegos
    // =========================
    const menuJuegos = () => {
        return (
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
                <Grid size={{ xs: 12 }} display="flex" justifyContent="center" alignItems="center">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link onClick={() => { setPlay(false) }}>
                            <Typography variant="h6" textAlign="center" fontWeight="bold">
                                Inicio
                            </Typography>
                        </Link>

                        <Typography variant="h6" textAlign="center" fontWeight="bold" color="secondary">
                            Juegos
                        </Typography>


                    </Breadcrumbs>
                </Grid>
                {!permiso &&
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1" color="error" textAlign="center" >
                            Ya alcanzaste tu limite. <br />
                            Ganaste mas de 1500 puntos hoy. <br />
                            Regresa en 24 horas
                        </Typography>
                    </Grid>
                }
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h6" textAlign="center" fontWeight="bold">
                        Elige tu juego
                    </Typography>
                </Grid>


                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardActionArea onClick={() => setJuego("blackjack")} disabled={!permiso}>
                            <CardMedia
                                component="img"
                                height="180"
                                image={blackjackImg}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    BlackJack
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Arriesga tus monedas en la mesa del gremio. Suma cartas, desafía al crupier y prueba tu suerte sin pasarte del límite.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardActionArea onClick={() => setJuego("dice")} disabled={!permiso}>
                            <CardMedia
                                component="img"
                                height="180"
                                image={dadoImg}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Dados del Destino
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Lanza los dados encantados y deja que el azar decida. Cada tirada puede premiarte… o cobrar su precio.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardActionArea onClick={() => setJuego("cofre")} disabled={!permiso}>
                            <CardMedia
                                component="img"
                                height="180"
                                image={cofreImg}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Cofre Maldito
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Parece un tesoro, pero no todo lo que brilla es oro. Abre el cofre y descubre si te recompensa o te muerde.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                {/* <Grid size={{ xs: 12 }} display="flex" gap={2} justifyContent="center" flexWrap="wrap">

                    <Button variant="contained" color="secondary" onClick={() => setJuego("blackjack")}>
                        Blackjack 21
                    </Button>

                    <Button variant="contained" color="secondary" onClick={() => setJuego("dice")}>
                        Dados del Destino
                    </Button>

                    <Button variant="contained" color="secondary" onClick={() => setJuego("cofre")}>
                        Cofre Maldito
                    </Button>

                    <Button variant="contained" color="secondary" onClick={() => setJuego("oraculo")}>
                        Cartas del Oráculo
                    </Button>
                </Grid> */}

                {/* <Grid size={{ xs: 12 }} display="flex" justifyContent="center" marginTop={2}>
                    <Button variant="outlined" color="inherit" onClick={() => setPlay(false)}>
                        Volver
                    </Button>
                </Grid> */}
            </Grid>
        );
    };


    // =========================
    // Render
    // =========================
    return (
        <div>
            {/* Barra Abajo */}
            {usuario && (
                <div className="dataBotomUser">
                    <div className="dataPuntos">
                        <Typography variant="h6" fontWeight="bold" className="ellipsis" sx={{ m: 0, p: 0 }}>
                            Nivel {level}
                        </Typography>
                    </div>

                    <div className="dataLevel">
                        <GiRupee size={30} color={usuario?.color} />
                        <Typography variant="h6" fontWeight="bold" className="ellipsis" sx={{ m: 0, p: 0 }}>
                            {puntos_disponibles} Pts
                        </Typography>
                    </div>
                </div>
            )}

            {/* 1) Pantalla inicial (tu intro) */}
            {!play && (
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" textAlign="center" fontWeight="bold">
                            Mesa del Destino
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" textAlign="center">
                            La discrecion se agradece
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="body1">
                            Un espacio donde la suerte y la decisión se encuentran.
                            En esta mesa, cada apuesta es un acto de valentía y cada resultado puede cambiar tu camino dentro del Gremio.
                            No hay garantías, solo destino, riesgo y recompensa para quienes se atreven a jugar.
                        </Typography>
                        <br />
                        <Typography variant="body1">
                            <b>No olvides:</b> los puntos que aquí arriesgas no son gratuitos. Cada uno representa tiempo, esfuerzo y constancia dentro del Gremio. Úsalos con cuidado y no dejes que el azar se lleve lo que tanto te costó acumular.
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
                        <button class="btn-medieval" onClick={handlePlay} >
                            JUGAR
                        </button>
                        {/* <Button variant="contained" size="large" color="secondary" onClick={handlePlay}>
                            <Typography variant="h5" fontWeight="bold">
                                JUGAR
                            </Typography>
                        </Button> */}
                    </Grid>
                </Grid>
            )}

            {/* 2) Al entrar a jugar, primero el menú de 4 juegos */}
            {play && juego === null && menuJuegos()}

            {/* 3) Render del juego seleccionado */}
            {play && juego === "blackjack" && <Ui_blackjack setPlay={setPlay} setJuego={setJuego} permiso={permiso} />}
            {play && juego === "dice" && <Dice setPlay={setPlay} setJuego={setJuego} permiso={permiso} />}
            {play && juego === "cofre" && <CofreMaldito setPlay={setPlay} setJuego={setJuego} permiso={permiso} />}
            {play && juego === "oraculo" && ui_placeholder("Cartas del Oráculo")}

            <div style={{ height: "50px" }}></div>
        </div>
    );
}

export default Mesa;
