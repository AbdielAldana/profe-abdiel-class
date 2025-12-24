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

// Utils
import { getLevelData } from "../../utils/levelUtils";
import { ViewType, IconArt, claseName, getTiempoRestante, getEstadoRecompensa, getMensajeEstado } from "../../utils/articuloTypeUtils"
import FondoDecorativo from "../../components/Tablon/FondoDecorativo";

// MUI Icons
import FrontHandIcon from "@mui/icons-material/FrontHand";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VerifiedIcon from "@mui/icons-material/Verified";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

// React Icons (GI)
import {
    GiBookAura,
    GiBookPile,
    GiBookmarklet,
    GiBroadsword,
    GiChickenLeg,
    GiEdgedShield,
    GiElfHelmet,
    GiExtraTime,
    GiGemPendant,
    GiHealthPotion,
    GiHeavyTimer,
    GiLightningBow,
    GiMagicPotion,
    GiPotionBall,
    GiPotionOfMadness,
    GiSandsOfTime,
    GiScrollQuill,
    GiSmartphone,
    GiSpade,
    GiSpearHook,
    GiSpellBook,
    GiSwordsPower,
    GiTiedScroll,
    GiWinterGloves,
    GiWizardStaff,
    GiWoodAxe,
} from "react-icons/gi";
import ModalTienda from "../../components/Tablon/Modals/ModalTienda";

const ICON_MAP = {
    GiBookAura,
    GiBookPile,
    GiBookmarklet,
    GiBroadsword,
    GiChickenLeg,
    GiEdgedShield,
    GiElfHelmet,
    GiExtraTime,
    GiGemPendant,
    GiHealthPotion,
    GiHeavyTimer,
    GiLightningBow,
    GiMagicPotion,
    GiPotionBall,
    GiPotionOfMadness,
    GiSandsOfTime,
    GiScrollQuill,
    GiSmartphone,
    GiSpade,
    GiSpearHook,
    GiSpellBook,
    GiSwordsPower,
    GiTiedScroll,
    GiWinterGloves,
    GiWizardStaff,
    GiWoodAxe,
};

const style = {
    p: 2,
    position: "relative",
};

const getColorCosto = (estado) => {
    return estado === "FALTAN_PUNTOS" || estado === "AMBOS" ? "error" : "inherit";
};

function Tienda() {
    const { usuario, recompensas, getRecompensas, matricula } = useTablon();
    const [cookies] = useCookies(["matricula_actual"]);

    useEffect(()=> {
        if(recompensas === null) {getRecompensas()}
    },[])

    // Alertas
    const notifyError = (txt) =>
        toast.error(txt, { position: "top-center" });

    const notifySuccess = (txt) =>
        toast.success(txt, { position: "top-center" });

    // ===========================================
    // Niveles
    const xpTotal = usuario?.p_totales ?? 0;
    const { level } = getLevelData(xpTotal);

    const puntos_disponibles =
        usuario === null ? 0 : usuario.p_totales - usuario.p_gastados;

    // Modal (solo abrir si es activa y no completada)
    const [openData, setOpenData] = React.useState(false);
    const [articulo, setArticulo] = React.useState(null);
    const [icon, setIcon] = React.useState(null);
    const handleOpenData = (re, icon) => {
        setOpenData((v) => !v)
        setArticulo(re)
        setIcon(icon)
    };

    const sendAlert = () => {
        notifyError("No disponible")
    }


    return (
        <Grid container spacing={3}>

            {articulo &&
                <ModalTienda
                    openData={openData}
                    handleOpenData={handleOpenData}
                    articulo={articulo}
                    ICON_MAP={ICON_MAP}
                    ViewType={ViewType}
                />
            }

            {/* Barra Abajo */}
            <div className="dataBotomUser">
                <div className="dataPuntos">
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="ellipsis"
                        sx={{ m: 0, p: 0 }}
                    >
                        {puntos_disponibles} Pts
                    </Typography>
                </div>
                <div className="dataLevel">
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="ellipsis"
                        sx={{ m: 0, p: 0 }}
                    >
                        Nivel {level}
                    </Typography>
                </div>
            </div>

            {/* Titulo */}
            <Grid size={{ xs: 12 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
                    Mercado
                </Typography>
            </Grid>

            {recompensas !== null &&
                recompensas
                    .filter((r) => r.visible !== false)
                    .sort((a, b) => a.costo - b.costo)
                    .sort((a, b) => a.nivel_min - b.nivel_min)
                    .sort((a, b) => a.clase - b.clase)
                    .map((re, i) => {
                        const estado = usuario
                            ? getEstadoRecompensa(re, puntos_disponibles, level)
                            : 5;

                        const IconComp = ICON_MAP[re.icono];
                        const msg = getMensajeEstado(estado);
                        return (
                            <Grid
                                key={i}
                                size={{ xs: 12, md: 6 }}
                                className={ "misionSelectF"}
                            >
                                <Paper
                                    onClick={!matricula || msg ? () => sendAlert() : () => handleOpenData(re, IconComp)}
                                    sx={style}
                                    style={{
                                        border: "solid 2px " + ViewType(re.clase).color,
                                        boxShadow: !matricula || msg ? "0 0 5px  gray" : "0 0 5px " + ViewType(re.clase).color,
                                    }}
                                >
                                    <Grid container spacing={1}>
                                        <Grid size={{ xs: 7 }}>
                                            <div style={{ display: "flex", alignItems: "center", width: "100%",}} >
                                                <div style={{ width: "50px" }}>
                                                    <IconComp size={50} style={{ color: !matricula || msg ? "gray" : ViewType(re.clase).color }} />
                                                </div>

                                                <div style={{ paddingLeft: "10px", width: "100%" }}>
                                                    <Typography variant="h6" fontWeight="bold" className="ellipsis" sx={{ m: 0, p: 0 }} >
                                                        {re.nombre}
                                                    </Typography>

                                                    <Typography variant="body2"
                                                        color={
                                                            estado === 2 || estado === 3
                                                                ? "error"
                                                                : "inherit"
                                                        }
                                                    >
                                                        {"Nivel Minimo: " + re.nivel_min}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Grid>

                                        <Grid size={{ xs: 5 }}>
                                            <Typography
                                                variant="h5"
                                                fontWeight="bold"
                                                textAlign="right"
                                                color={getColorCosto(estado)}
                                            >
                                                {re.costo}pts
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                textAlign="right"
                                            >
                                                {re.tipo} {re.uso}
                                            </Typography>
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <Divider />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 7 }}>

                                            <Typography
                                                variant="body1"
                                                textAlign="left"
                                            >
                                                {re.descripcion}
                                            </Typography>
                                        </Grid>
                                        {/* <Grid size={{ xs: 6, sm: 5 }}>

                                            
                                            <Typography
                                                variant="body1"
                                                textAlign="right"
                                            >
                                                {re.uso}
                                            </Typography>
                                        </Grid> */}

                                        <Grid size={{ xs: 12, sm: 5 }} style={{ alignSelf: "center" }}>
                                            {/* Mensajes de estado */}
                                            {usuario && msg && (
                                                <div>
                                                    {/* <DoDisturbIcon
                                                        className="checkedMisionIcion"
                                                        sx={{ position: "absolute", color: "red", fontSize: 140 }}
                                                    /> */}
                                                    <Typography
                                                        gutterBottom
                                                        variant="body1"
                                                        component="div"
                                                        textAlign="center"
                                                        fontWeight="bold"
                                                        color="error"
                                                    >
                                                        {msg}
                                                    </Typography>
                                                </div>
                                            )}

                                            {/* Acción */}
                                            {!cookies.matricula_actual ? (
                                                // <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                                //     Registrate para Participar.
                                                // </Typography>
                                                <div>
                                                    {/* <DoDisturbIcon
                                                        className="checkedMisionIcion"
                                                        sx={{ position: "absolute", color: "red", fontSize: 140 }}
                                                    /> */}
                                                    <Typography gutterBottom variant="body1" component="div" color="error" fontWeight={"bold"} textAlign={"center"}>
                                                        Registrate para Participar.
                                                    </Typography>
                                                </div>
                                            ) : (
                                                <></>
                                                // <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
                                                //     <Button
                                                //         size="large"
                                                //         variant="contained"
                                                //         color="primary"
                                                //         disabled={usuario ? estado !== "OK" : false}
                                                //     >
                                                //         Comprar
                                                //     </Button>
                                                // </CardActions>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        );
                    })}
        </Grid>
    );
}

export default Tienda;
