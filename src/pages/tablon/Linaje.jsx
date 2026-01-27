// ReactJS
import React, { useEffect, useState } from "react";

// Material UI
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    Modal,
    Typography,
} from "@mui/material";

// Componentes Generales
import { useTablon } from "../../contexts/TablonContext"; // ajusta
import ArticuloCompra from "../../components/Tablon/Tienda/ArticuloCompra";
import confetti from "canvas-confetti";

// Utils
import { getLevelData } from "../../utils/levelUtils";

// iconos
import { GiRupee } from "react-icons/gi";
import ViewTitulo from "../../components/Tablon/Perfil/ViewTitulo";
import { GiMoebiusTrefoil } from "react-icons/gi";
import CloseIcon from '@mui/icons-material/Close';
import linaje1 from "../../img/linaje-01.svg"
import linaje2 from "../../img/linaje-02.svg"
import linaje3 from "../../img/linaje-03.svg"
import { useCookies } from "react-cookie";

// Styles
const styleModal = {
    all: "unset",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        xs: "350px",
        sm: "90vw",
        md: "85%",
        // lg: "60vw",
    },
    maxWidth: {
        xs: "440px",
        sm: "440px",
        // md: "85%",
        // lg: "60vw",
    },
    height: {
        xs: "auto",
        sm: "auto",
        md: "auto",
        // lg: "auto",
    },
    maxHeight: {
        xs: "90dvh",
        sm: "90dvh",
        md: "90dvh",
    },
    bgcolor: "background.paper",
    borderRadius: "5px",
    // boxShadow: 24,
    overflow: "auto",
    overflowX: "hidden",
    p: 1,
};

function Linaje(p) {

    const { usuario, postSetLinaje, postPuntos } = useTablon();
    const [cookies, setCookie] = useCookies(["salamandrasPuntos"])


    const [modalLinaje, setModalLinaje] = useState(false)
    const [linaje, setLinaje] = useState(null)

    const handleModalLinaje = (lin) => {
        setModalLinaje(!modalLinaje)
        setLinaje(lin)
    }

    const handleSetLinaje = async (lin) => {
        console.log(usuario);
        let temppayload = {
            "matricula": usuario.matricula,
            "linaje": lin
        }

        try {
            await postSetLinaje(temppayload)
            console.log(usuario);

            setModalLinaje(false)
            setTimeout(shoot, 0);
            setTimeout(shoot, 100);
            setTimeout(shoot, 200);
        } catch (err) {
            console.error(err.msg);
        }

    }

    var defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
    };

    const shoot = () => {
        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ['star']
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ['circle']
        });
    }

    useEffect(() => {
        if (!cookies.salamandrasPuntos) {
            setCookie("salamandrasPuntos", 0, { path: "/", maxAge: segundosRestantesDelDia() })
            return
        };
    }, [])

    const segundosRestantesDelDia = () => {
        const ahora = new Date();
        const finDelDia = new Date();

        finDelDia.setHours(23, 59, 59, 999);

        return Math.floor((finDelDia.getTime() - ahora.getTime()) / 1000);
    };

    const setCook = () => {

        setCookie("salamandrasPuntos", 1, {
            path: "/",
            maxAge: segundosRestantesDelDia(),
        })
    }

    const [ok, setOk] = useState(false)

    const reclamarPuntos = async () => {
        setOk(true)
        let payload = { matricula: usuario.matricula, puntos: 50, tipo: 0 };
        try {
            await postPuntos(payload);
            setCook()
            setTimeout(shoot, 0);
            setTimeout(shoot, 100);
            setTimeout(shoot, 200);
        }
        catch {
            setCookie("salamandrasPuntos", 0, { path: "/", maxAge: segundosRestantesDelDia() })
            setOk(false)
            console.log("Error");
        }
    }




    return (
        <>
            <Grid container spacing={2}>
                <ViewTitulo
                    texto="Linaje"
                />

                <Grid size={{ sx: 12 }}>
                    {usuario && usuario.linaje === null &&
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12 }} className={"viewCompletMisions"} style={{ textAlign: "center" }}>
                                <Typography variant="h6" fontWeight={"bold"}>
                                    Aventureros del Gremio
                                </Typography>
                                <Typography variant="body1">
                                    El Gremio reúne a individuos de orígenes distintos, marcados por voluntades, instintos y caminos propios.
                                    Al ingresar, todo miembro porta un Linaje, una herencia simbólica que no impone quién eres, sino cómo eliges avanzar.
                                </Typography>
                                <br />
                                <Typography variant="body1">
                                    Tu linaje no define tu valor, pero sí la senda que decides recorrer.
                                </Typography>
                                <br />
                                <Typography variant="body1" fontWeight={"bold"}>
                                    ¿A qué Linaje entregarás tu lealtad?
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }} className="linaje-card linaje-salamandra">
                                <Typography variant="h5" className="linaje-title" fontWeight={"bold"}>
                                    Salamandras
                                </Typography>

                                <img className="linaje-img" src={linaje1} alt="Linaje Salamandras" />

                                <Typography variant="body1" className="linaje-desc">
                                    Forjados en la constancia y la resistencia.
                                    Avanzan sin prisa, pero nunca se detienen.
                                    Cuando otros caen, las Salamandras permanecen.
                                </Typography>
                                <button onClick={() => handleModalLinaje(0)} className="btn-medieval">Ver</button>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }} className="linaje-card linaje-salamandra">
                                <Typography variant="h5" className="linaje-title" fontWeight={"bold"}>
                                    Dragones
                                </Typography>

                                <img className="linaje-img" src={linaje3} alt="Linaje Dragones" />

                                <Typography variant="body1" className="linaje-desc">
                                    Impulsados por ambición y grandeza.
                                    Buscan elevarse por encima del resto y dejar huella en el Gremio.
                                    Un Dragón no sigue caminos: los crea.
                                </Typography>
                                <button onClick={() => handleModalLinaje(1)} className="btn-medieval">Ver</button>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }} className="linaje-card linaje-salamandra">
                                <Typography variant="h5" className="linaje-title" fontWeight={"bold"}>
                                    Mellívoras
                                </Typography>

                                <img className="linaje-img" src={linaje2} alt="Linaje Dragones" />

                                <Typography variant="body1" className="linaje-desc">
                                    Observadores y estratégicos por naturaleza.
                                    Analizan cada situación antes de actuar.
                                    Las Mellívoras saben que el momento correcto lo es todo.
                                </Typography>
                                <button onClick={() => handleModalLinaje(2)} className="btn-medieval">Ver</button>
                            </Grid>

                        </Grid>
                    }

                    {/* Salamandras */}
                    {usuario && usuario.linaje == 1 &&
                        <>
                            <Grid size={{ xs: 12, md: 4 }} className="linaje-card linaje-salamandra">
                                <Typography variant="h5" className="linaje-title" fontWeight={"bold"}>
                                    Salamandras
                                </Typography>

                                <img className="linaje-img" src={linaje1} alt="Linaje Salamandras" />

                                <Typography variant="body1" className="linaje-desc">
                                    Forjados en la constancia y la resistencia.
                                    Avanzan sin prisa, pero nunca se detienen.
                                    Cuando otros caen, las Salamandras permanecen.
                                </Typography>

                                <Typography variant="body1">
                                    Las Salamandras avanzan con constancia. No buscan grandes esfuerzos, sino sumar puntos todos los días de forma segura.
                                </Typography>
                                <Divider sx={{ marginY: "10px" }} />
                                <Typography variant="h6" fontWeight={'bold'}>Beneficios del linaje:</Typography>

                                <Typography variant="body1">
                                    <b>Bono diario:</b> cada día puedes reclamar 50 puntos gratis desde la ventana de linaje.
                                </Typography>
                                <Typography variant="body1">
                                    <b>Mayor límite de suerte:</b> el máximo diario de puntos obtenidos por juegos de suerte aumenta de 1500 a 2500 puntos.
                                </Typography>
                                <Typography variant="body1">
                                    <b>Juegos exclusivos:</b> las Salamandras tienen acceso único a dos minijuegos adicionales, disponibles solo para este linaje.
                                </Typography>
                                <Typography variant="body2">
                                    Ideal si entras seguido, juegas y quieres sumar puntos poco a poco sin depender solo de misiones.
                                </Typography>
                                <Divider/>
                                <button disabled={cookies.salamandrasPuntos == 1 || ok} onClick={reclamarPuntos} className="btn-medieval">Reclamar 50 Puntos</button>
                                <Divider/>
                                
                                <a target="_blank" href="https://chat.whatsapp.com/EBlwd63p1xxDcdRbZ77eNQ">
                                    <Button variant="contained">Grupo Whatsapp</Button>
                                </a>
                            </Grid>
                        </>
                    }
                    {/* Dragones */}
                    {usuario && usuario.linaje == 2 &&
                        <>
                            <Grid size={{ xs: 12, md: 4 }} className="linaje-card linaje-salamandra">
                                <Typography variant="h5" className="linaje-title" fontWeight={"bold"}>
                                    Dragones
                                </Typography>

                                <img className="linaje-img" src={linaje3} alt="Linaje Salamandras" />

                                <Typography variant="body1" className="linaje-desc">
                                    Impulsados por ambición y grandeza.
                                    Buscan elevarse por encima del resto y dejar huella en el Gremio.
                                    Un Dragón no sigue caminos: los crea.
                                </Typography>

                                <Typography variant="body1">
                                    Los Dragones no ganan puntos más rápido, pero gastan mejor. Su poder está en acceder antes y pagar menos.
                                </Typography>
                                <Divider sx={{ marginY: "10px" }} />
                                <Typography variant="h6" fontWeight={'bold'}>Beneficios del linaje:</Typography>

                                <Typography variant="body1">
                                    <b>Acceso anticipado:</b> el nivel mínimo no aplica para recompensas.
                                </Typography>
                                <Typography variant="body1">
                                    <b>Descuento permanente:</b> todas las recompensas cuestan 10% menos.
                                </Typography>
                                <Typography variant="body1">
                                    <b>Recompensas únicas:</b> los Dragones tienen acceso a recompensas exclusivas del linaje
                                </Typography>
                                <Typography variant="body2">
                                    Ideal si prefieres ahorrar puntos y conseguir recompensas importantes antes que otros.
                                </Typography>
                                <Divider/>
                                <a target="_blank" href="https://chat.whatsapp.com/BB7DkTGD0G35I6zbAJjBVp">
                                    <Button variant="contained">Grupo Whatsapp</Button>
                                </a>
                            </Grid>
                        </>
                    }
                    {/* Mellívoras */}
                    {usuario && usuario.linaje == 3 &&
                        <>
                            <Grid size={{ xs: 12, md: 4 }} className="linaje-card linaje-salamandra">
                                <Typography variant="h5" className="linaje-title" fontWeight={"bold"}>
                                    Mellívoras
                                </Typography>

                                <img className="linaje-img" src={linaje2} alt="Linaje Salamandras" />

                                <Typography variant="body1" className="linaje-desc">
                                    Observadores y estratégicos por naturaleza.
                                    Analizan cada situación antes de actuar.
                                    Las Mellívoras saben que el momento correcto lo es todo.
                                </Typography>

                                <Typography variant="body1">
                                    Las Mellívoras sacan el máximo provecho de cada misión. Si haces tareas y cumples objetivos, este linaje te recompensa.
                                </Typography>
                                <Divider sx={{ marginY: "10px" }} />
                                <Typography variant="h6" fontWeight={'bold'}>Beneficios del linaje:</Typography>

                                <Typography variant="body1">
                                    <b>Misiones mejor pagadas:</b> todas las misiones otorgan 10% más puntos de su valor base.
                                </Typography>
                                <Typography variant="body1">
                                    <b>Misiones Secretas:</b> las Mellivoras tienen misiones secretas y unicas.
                                </Typography>
                                <Typography variant="body1">
                                    <b>Eleccion de misiones:</b> el linaje vota por las misiones de la semana. 
                                </Typography>
                                <Typography variant="body2">
                                    Ideal si prefieres ahorrar puntos y conseguir recompensas importantes antes que otros.
                                </Typography>
                                <Divider />


                                <a target="_blank" href="https://chat.whatsapp.com/BCOCbbBEdyI2WMjRxCo38K">
                                    <Button variant="contained">Grupo Whatsapp</Button>
                                </a>
                            </Grid>
                        </>
                    }
                </Grid>
            </Grid>


            <Modal
                open={modalLinaje}
                onClose={handleModalLinaje}
                aria-labelledby="articulo-modal"
                aria-describedby="articulo-modal"
                aria-hidden="false"
            >
                <Card sx={styleModal} className="linaje-card" >
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
                                <img src={linaje == 0 ? linaje1 : linaje === 1 ? linaje3 : linaje === 2 ? linaje2 : ""} alt="" />
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="Close" onClick={handleModalLinaje}>
                                <CloseIcon />
                            </IconButton>
                        }
                        title={linaje == 0 ? "Salamandras" : linaje === 1 ? "Dragones" : linaje === 2 ? "Mellívoras" : ""}
                        subheader={linaje == 0 ? "Enfoque: obtener puntos fáciles" : linaje === 1 ? "Enfoque: descuentos y acceso a recompensas" : linaje === 2 ? "Enfoque: más puntos al completar misiones" : ""}
                    />
                    {linaje == 0 &&
                        <>
                            <CardContent>
                                <Typography variant="body1">
                                    Las Salamandras avanzan con constancia. No buscan grandes esfuerzos, sino sumar puntos todos los días de forma segura.
                                </Typography>
                                <Divider sx={{ marginY: "10px" }} />
                                <Typography variant="h6" fontWeight={'bold'}>Beneficios del linaje:</Typography>
                                <br />
                                <Typography variant="body1">
                                    <b>Bono diario:</b> cada día puedes reclamar 50 puntos gratis desde la ventana de linaje.
                                </Typography>
                                <br />
                                <Typography variant="body1">
                                    <b>Mayor límite de suerte:</b> el máximo diario de puntos obtenidos por juegos de suerte aumenta de 1500 a 2500 puntos.
                                </Typography>
                                <br />
                                <Typography variant="body1">
                                    <b>Juegos exclusivos:</b> las Salamandras tienen acceso único a dos minijuegos adicionales, disponibles solo para este linaje.
                                </Typography>
                                <Divider sx={{ marginY: "10px" }} />
                                <Typography variant="body2">
                                    Ideal si entras seguido, juegas y quieres sumar puntos poco a poco sin depender solo de misiones.
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                                <button onClick={() => handleSetLinaje(1)} className="btn-medieval gold">Unirme</button>
                            </CardActions>
                        </>
                    }
                    {linaje == 1 &&
                        <>
                            <CardContent>
                                <Typography variant="body1">
                                    Los Dragones no ganan puntos más rápido, pero gastan mejor. Su poder está en acceder antes y pagar menos.
                                </Typography>
                                <Divider sx={{ marginY: "10px" }} />
                                <Typography variant="h6" fontWeight={'bold'}>Beneficios del linaje:</Typography>
                                <br />
                                <Typography variant="body1">
                                    <b>Acceso anticipado:</b> el nivel mínimo no aplica para recompensas.
                                </Typography>
                                <br />
                                <Typography variant="body1">
                                    <b>Descuento permanente:</b> todas las recompensas cuestan 10% menos.
                                </Typography>
                                <br />
                                <Typography variant="body1">
                                    <b>Recompensas únicas:</b> los Dragones tienen acceso a recompensas exclusivas del linaje
                                </Typography>
                                <Divider sx={{ marginY: "10px" }} />
                                <Typography variant="body2">
                                    Ideal si prefieres ahorrar puntos y conseguir recompensas importantes antes que otros.
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                                <button onClick={() => handleSetLinaje(2)} className="btn-medieval gold">Unirme</button>
                            </CardActions>
                        </>
                    }
                    {linaje == 2 &&
                        <>
                            <CardContent>
                                <Typography variant="body1">
                                    Las Mellívoras sacan el máximo provecho de cada misión. Si haces tareas y cumples objetivos, este linaje te recompensa.
                                </Typography>
                                <Divider sx={{ marginY: "10px" }} />
                                <Typography variant="h6" fontWeight={'bold'}>Beneficios del linaje:</Typography>
                                <br />
                                <Typography variant="body1">
                                    <b>Misiones mejor pagadas:</b> todas las misiones otorgan 10% más puntos de su valor base.
                                </Typography>
                                <br />
                                <Typography variant="body1">
                                    <b>Misiones Secretas:</b> las Mellivoras tienen misiones secretas y unicas.
                                </Typography>
                                <br />
                                <Typography variant="body1">
                                    <b>Eleccion de misiones:</b> el linaje vota por las misiones de la semana. 
                                </Typography>
                                <Divider sx={{ marginY: "10px" }} />
                                <Typography variant="body2">
                                    Ideal si completas muchas misiones y quieres que cada una valga más.
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                                <button onClick={() => handleSetLinaje(3)} className="btn-medieval gold">Unirme</button>
                            </CardActions>
                        </>
                    }
                </Card>
            </Modal>

        </>
    )
}

export default Linaje