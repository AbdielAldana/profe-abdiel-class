// ReactJS
import React from "react";

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

const ViewType = (c) => {
    let temp = { color: "#fff", icon: <FrontHandIcon /> };

    if (c === 0) {
        temp.color = "#4CAF50";
        temp.icon = <FrontHandIcon />;
    } else if (c === 1) {
        temp.color = "#2196F3";
        temp.icon = <RocketLaunchIcon />;
    } else if (c === 2) {
        temp.color = "#9C27B0";
        temp.icon = <ThumbUpAltIcon />;
    } else if (c === 3) {
        temp.color = "#FF9800";
        temp.icon = <VerifiedIcon />;
    }

    return temp;
};

const getEstadoRecompensa = (re, puntos_disponibles, level) => {
    const faltaPuntos = re.costo > puntos_disponibles;
    const nivelBajo = re.nivel_min > level;

    if (!faltaPuntos && !nivelBajo) return "OK";
    if (faltaPuntos && !nivelBajo) return "FALTAN_PUNTOS";
    if (!faltaPuntos && nivelBajo) return "NIVEL_BAJO";
    if (faltaPuntos && nivelBajo) return "AMBOS";
    return "AMBOS";
};

const getMensajeEstado = (estado) => {
    if (estado === "FALTAN_PUNTOS") return "FALTAN PUNTOS";
    if (estado === "NIVEL_BAJO") return "NIVEL BAJO";
    if (estado === "AMBOS") return "NIVEL BAJO Y FALTAN PUNTOS";
    return null;
};

const getColorCosto = (estado) => {
    return estado === "FALTAN_PUNTOS" || estado === "AMBOS" ? "error" : "inherit";
};

function Tienda() {
    const { usuario, recompensas } = useTablon();
    const [cookies] = useCookies(["matricula_actual"]);

    // Alertas
    const notifyError = (txt) =>
        toast.error(txt, { position: "top-center" });

    const notifySuccess = (txt) =>
        toast.success(txt, { position: "top-center" });

    // ===========================================
    // Niveles
    const xpTotal = usuario?.puntos?.totales ?? 0;
    const { level } = getLevelData(xpTotal);

    const puntos_disponibles =
        usuario === null ? 0 : usuario.puntos.totales - usuario.puntos.gastados;

    // Modal (solo abrir si es activa y no completada)
    const [openData, setOpenData] = React.useState(false);
    const [articulo, setArticulo] = React.useState(null);
    const [icon, setIcon] = React.useState(null);
    const handleOpenData = (re, icon) => {
        setOpenData((v) => !v)
        setArticulo(re)
        setIcon(icon)
    };
    console.log(icon);

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

            <Grid size={{ xs: 12 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
                    Mercado
                </Typography>
            </Grid>

            {recompensas !== null &&
                recompensas
                    .filter((r) => r.visible !== false)
                    .sort((a, b) => a.clase - b.clase)
                    .sort((a, b) => a.costo - b.costo)
                    .sort((a, b) => a.nivel_min - b.nivel_min)
                    .map((re, i) => {
                        const estado = usuario
                            ? getEstadoRecompensa(re, puntos_disponibles, level)
                            : "SIN_USUARIO";

                        const IconComp = ICON_MAP[re.icono];
                        const msg = getMensajeEstado(estado);

                        console.log(IconComp);


                        return (
                            <Grid
                                key={i}
                                size={{ xs: 12, md: 6 }}
                                className={ "misionSelectF"}
                            >
                                <Paper
                                    onClick={!cookies.matricula_actual || msg ? () => sendAlert() : () => handleOpenData(re, IconComp)}
                                    sx={style}
                                    style={{
                                        border: "solid 2px " + ViewType(re.clase).color,
                                        boxShadow: !cookies.matricula_actual || msg ? "0 0 5px  gray" : "0 0 5px " + ViewType(re.clase).color,
                                    }}
                                >

                                    <Grid container spacing={1}>
                                        <Grid size={{ xs: 7 }}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    width: "100%",
                                                }}
                                            >
                                                <div
                                                    style={{ width: "50px" }}>
                                                    <IconComp size={50} style={{ color: !cookies.matricula_actual || msg ? "gray" : ViewType(re.clase).color }} />
                                                </div>

                                                <div style={{ paddingLeft: "10px", width: "100%" }}>
                                                    <Typography
                                                        variant="h6"
                                                        fontWeight="bold"
                                                        className="ellipsis"
                                                        sx={{ m: 0, p: 0 }}
                                                    >
                                                        {re.nombre}
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        color={
                                                            estado === "NIVEL_BAJO" || estado === "AMBOS"
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
                                                // gutterBottom
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
