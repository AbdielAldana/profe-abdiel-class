// ReactJS
import React, { useState } from "react";

// Material UI
import {
    Grid,
    Paper,
    Typography,
    Button,
    Divider,
    TextField,

} from "@mui/material";
import Input from '@mui/material/Input';

// Componentes Generales
import { useTablon } from "../../contexts/TablonContext"; // ajusta
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { NavLink } from "react-router";

// Utils
import { getLevelData } from "../../utils/levelUtils";
import { resizeImageAuto } from "../../utils/resizeImgUtil";

// Icons
import { styled } from '@mui/material/styles';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FondoDecorativo from "../../components/Tablon/Perfil/FondoDecorativo";
import Articulo from "../../components/Tablon/Perfil/Articulo";
import { GiRupee } from "react-icons/gi";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function Perfil() {
    // Informacion Principal
    // misionesUsuario
    const { usuario, setUsuario, matricula, setMatricula, getUsuario, postUsuarioNuevo, } = useTablon();
    const [cookies, setCookie] = useCookies(["matricula_actual"]);
    const base = process.env.REACT_APP_GREMIO_API_URL;

    const notifySuccess = (txt) =>
        toast.success(txt, { position: "top-center" });

    // Manejo de inicio de Sesion
    const [user, setUser] = useState(matricula ? matricula : "")

    // Inicio de Sesion
    const handleUserSelect = () => {
        getUsuario(user, false, false)
        setUser("")
    }

    // Cerrar Sesion
    const cerrarSesion = () => {
        setCookie("matricula_actual", null, { path: "/", maxAge: 60 * 60 * 24 })
        setUsuario(null)
        setMatricula(null)
        notifySuccess("Sesion Cerrada con Exito")
    }


    // Registro de Usuario

    const [registoColor, setRegistoColor] = useState("#3da4c7")
    const [registroNombre, setRegistoNombre] = useState("")
    const [registroNick, setRegistoNick] = useState("")
    const [registroMatricula, setRegistoMatricula] = useState("")
    const [imageFile, setImageFile] = React.useState(null); // Estado para almacenar la imagen
    const [imageFileForm, setImageFileForm] = React.useState(null); // Estado para almacenar la imagen

    // Preview Imagen
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return

        // Optimiza la Imagen, baja resolucion
        const optimized = await resizeImageAuto(file);

        setImageFileForm(optimized)
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageFile(reader.result);
        };

        if (optimized) {
            reader.readAsDataURL(optimized);
        }
    };

    const [errorMatriculaMsg, setErrorMatriculaMsg] = useState("")

    const handleRegistrarUsuario = async () => {
        if (!imageFileForm)
            return setErrorMatriculaMsg("Falta una Imagen")
        // eslint-disable-next-line
        if (registroMatricula.length == 0 || registroMatricula == "")
            return setErrorMatriculaMsg("Falta Matricula")
        if (registroMatricula.length <= 6)
            return setErrorMatriculaMsg("Matricula no Valida")
        // eslint-disable-next-line
        if (registroNombre.length == 0 || registroNombre == "")
            return setErrorMatriculaMsg("Falta tu Nombre")
        if (registroNombre.length <= 5)
            return setErrorMatriculaMsg("Nombre muy corto")
        // eslint-disable-next-line
        if (registroNick.length == 0 || registroNick == "")
            return setErrorMatriculaMsg("Falta tu Nickname")
        if (registroNick.length <= 5)
            return setErrorMatriculaMsg("Nickname muy corto")

        let tempData = {
            nombre: registroNombre,
            matricula: registroMatricula,
            color: registoColor,
            nickname: registroNick,
            imagen: imageFileForm,
        }

        const resp = await postUsuarioNuevo(tempData)
        if (!resp.ok) { setErrorMatriculaMsg(resp.msg) }

    }

    // Misiones

    // const [openDataMision, setOpenDataMision] = React.useState(false)
    // const [selectMision, setSelectMision] = React.useState(misionesUsuario[0])
    // const handleOpenDataMision = (m) => {
    //     if (m.lore) setSelectMision(m);
    //     setOpenDataMision(!openDataMision)
    // }
    // Inventario


    // Calculo de Niveles
    const xpTotal = usuario?.p_totales ?? 0;
    const { level, progreso, xpFaltante, earnedInLevel, cost } = getLevelData(xpTotal);

    const bolsa = usuario?.p_totales - usuario?.p_gastados

    // console.log(usuario);





    return (
        <Grid container spacing={3}>

            {/* <ModalMision openData={openDataMision} handleOpenData={handleOpenDataMision} mision={selectMision} /> */}

            {/* Usuario Perfil */}
            {usuario !== null &&
                <Grid size={{ xs: 12, md: 12 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 12 }} display="flex" justifyContent="center" style={{ position: 'relative' }}>
                            <div className={"tipo" + usuario.marco}>
                                <div className="imagenPerfil " style={{ border: "solid 5px" + usuario.color, boxShadow: "0 0 5px" + usuario.color }}>
                                    <img src={base + "/" + usuario.imagen_perfil} alt="" width={"100%"} />
                                </div>
                            </div>
                            <div className="adorno" style={{ backgroundColor: usuario.color }}>
                                <FondoDecorativo fondo={parseInt(usuario.fondo)} />
                            </div>
                        </Grid>
                        <Grid size={{ xs: 8, md: 6 }} display="flex" alignItems="center">
                            <Typography variant="h4" fontWeight={"bold"}>
                                {usuario.nickname}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 4, md: 6 }}>
                            <Typography variant="h5" fontWeight={"bold"} textAlign="right">
                                Nivel: {level}
                            </Typography>
                            <Typography variant="body2" gutterBottom textAlign="right">
                                {usuario.p_totales} XP
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <div className="barLevel">
                                <div className="barLevelCount" style={{ backgroundColor: usuario.color, width: progreso + "%" }}>
                                    <FondoDecorativo fondo={parseInt(usuario.fondo)} />
                                </div>
                                <div className="leveltext">{earnedInLevel} / {cost} XP</div>
                            </div>
                            <Typography variant="body1" fontWeight={"bold"} textAlign="right">
                                Siguiente Nivel: {xpFaltante} XP
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 12 }} display={"flex"} justifyContent={"center"}>
                            <GiRupee size={30} color={usuario.color} />
                            <Typography variant="h6" >
                                <b>{bolsa}</b> puntos
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 12 }} display="flex" alignItems="center" justifyContent={"space-between"}>
                            <Button onClick={cerrarSesion} variant="contained" size="small" color="error" startIcon={<LogoutIcon />}>
                                Salir
                            </Button>
                            {usuario.admin &&
                                <NavLink to="/tablon_de_misiones/admin">
                                    <Button variant="contained" size="small" color="secondary" endIcon={<SettingsIcon />}>
                                        Admin
                                    </Button>
                                </NavLink>
                            }
                            <Button variant="contained" size="small" color="primary" endIcon={<SettingsIcon />}>
                                Edit
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <Divider />
                        </Grid>

                        {/* Inventario */}
                        <Grid size={{ xs: 12, md: 12 }} className={"viewCompletMisions"}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <Typography variant="h5" fontWeight={"bold"} textAlign="center" gutterBottom>
                                        Inventario
                                    </Typography>
                                </Grid>
                                {// eslint-disable-next-line
                                    usuario.inventario.filter(inv => inv.articulo.estado == 1).length > 0 &&
                                    <Grid size={{ xs: 12, md: 12 }}>
                                        <Typography variant="h6" fontWeight={"bold"} >
                                            Equipado / Activo
                                        </Typography>
                                    </Grid>
                                }
                                {usuario.inventario &&
                                    usuario.inventario
                                        // eslint-disable-next-line
                                        .filter(inv => inv.articulo.estado == 1)
                                        .sort((a, b) => a.data.clase - b.data.clase)
                                        .map((inv, e) => {
                                            return (
                                                <Grid key={e} size={{ xs: 12, md: 6 }}>
                                                    <Articulo articulo={inv} />
                                                </Grid>
                                            )
                                        })
                                }
                                {// eslint-disable-next-line
                                    usuario.inventario.filter(inv => inv.articulo.estado == 0).length > 0 &&
                                    <Grid size={{ xs: 12, md: 12 }}>
                                        <Typography variant="h6" fontWeight={"bold"} >
                                            Disponibles
                                        </Typography>
                                    </Grid>
                                }
                                {// eslint-disable-next-line
                                    usuario.inventario &&
                                    usuario.inventario
                                        // eslint-disable-next-line
                                        .filter(inv => inv.articulo.estado == 0)
                                        .sort((a, b) => a.data.clase - b.data.clase)
                                        .map((inv, e) => {
                                            return (
                                                <Grid key={e} size={{ xs: 12, md: 6 }}>
                                                    <Articulo articulo={inv} />
                                                </Grid>
                                            )
                                        })
                                }
                                {// eslint-disable-next-line
                                    usuario.inventario.filter(inv => inv.articulo.estado == 2).length > 0 &&
                                    <Grid size={{ xs: 12, md: 12 }}>
                                        <Typography variant="h6" fontWeight={"bold"} >
                                            En Venta
                                        </Typography>
                                    </Grid>
                                }
                                {usuario.inventario &&
                                    usuario.inventario
                                        // eslint-disable-next-line
                                        .filter(inv => inv.articulo.estado == 2)
                                        .sort((a, b) => a.data.clase - b.data.clase)
                                        .map((inv, e) => {
                                            return (
                                                <Grid key={e} size={{ xs: 12, md: 6 }}>
                                                    <Articulo articulo={inv} />
                                                </Grid>
                                            )
                                        })
                                }
                                {// eslint-disable-next-line
                                    usuario.inventario.filter(inv => inv.articulo.estado == 3).length > 0 &&
                                    <Grid size={{ xs: 12, md: 12 }}>
                                        <Typography variant="h6" fontWeight={"bold"} >
                                            Usados
                                        </Typography>
                                    </Grid>
                                }
                                {usuario.inventario &&
                                    usuario.inventario
                                        // eslint-disable-next-line
                                        .filter(inv => inv.articulo.estado == 3)
                                        .sort((a, b) => a.data.clase - b.data.clase)
                                        .map((inv, e) => {
                                            return (
                                                <Grid key={e} size={{ xs: 12, md: 6 }}>
                                                    <Articulo articulo={inv} />
                                                </Grid>
                                            )
                                        })
                                }
                                {// eslint-disable-next-line
                                    usuario.inventario.filter(inv => inv.articulo.estado == 4).length > 0 &&
                                    <Grid size={{ xs: 12, md: 12 }}>
                                        <Typography variant="h6" fontWeight={"bold"} >
                                            Donados
                                        </Typography>
                                    </Grid>
                                }
                                {usuario.inventario &&
                                    usuario.inventario
                                        // eslint-disable-next-line
                                        .filter(inv => inv.articulo.estado == 4)
                                        .sort((a, b) => a.data.clase - b.data.clase)
                                        .map((inv, e) => {
                                            return (
                                                <Grid key={e} size={{ xs: 12, md: 6 }}>
                                                    <Articulo articulo={inv} />
                                                </Grid>
                                            )
                                        })
                                }
                                {// eslint-disable-next-line
                                    usuario.inventario.filter(inv => inv.articulo.estado == 5).length > 0 &&
                                    <Grid size={{ xs: 12, md: 12 }}>
                                        <Typography variant="h6" fontWeight={"bold"} >
                                            Vendidos
                                        </Typography>
                                    </Grid>
                                }
                                {usuario.inventario &&
                                    usuario.inventario
                                        // eslint-disable-next-line
                                        .filter(inv => inv.articulo.estado == 5)
                                        .sort((a, b) => a.data.clase - b.data.clase)
                                        .map((inv, e) => {
                                            return (
                                                <Grid key={e} size={{ xs: 12, md: 6 }}>
                                                    <Articulo articulo={inv} />
                                                </Grid>
                                            )
                                        })
                                }
                            </Grid>
                        </Grid>

                    </Grid>
                    {/* </Paper> */}
                </Grid>
            }
            {usuario === null && cookies.matricula_actual &&
                <Grid size={{ xs: 12, md: 12 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 12 }} display="flex" justifyContent="center" style={{ position: 'relative' }}>
                            <div className={"tipo" + 0}>
                                <div className="imagenPerfil " >
                                    {/* <img src={base + "/" + usuario.imagen_perfil} alt="" width={"100%"} /> */}
                                </div>
                            </div>
                            <div className="adorno" style={{ backgroundColor: "#344955" }}>
                                {/* <FondoDecorativo fondo={parseInt(usuario.fondo)} /> */}
                            </div>
                        </Grid>
                        <Grid size={{ xs: 12, md: 12 }} display="flex" alignItems="center" justifyContent={"center"}>
                            <Typography variant="h4" fontWeight={"bold"} textAlign={"center"}>
                                Cargando Usuario
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            }

            {/* Inicio de Sesion */}
            {usuario === null && !cookies.matricula_actual &&
                <Grid size={{ xs: 12, md: 12 }}>
                    <Paper sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="h5" fontWeight={"bold"}>
                                    Inicio de Sesion
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 8, md: 10 }}>
                                <TextField
                                    id="abrir_perfil"
                                    label="Matricula"
                                    variant="outlined"
                                    size="small"
                                    sx={{ mr: 3 }}
                                    fullWidth
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </Grid>
                            <Grid size={{ xs: 4, md: 2 }}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    onClick={handleUserSelect}
                                // sx={{ px: 4 }}
                                > Ingresar </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            }

            {/* Registro */}
            {usuario === null && !cookies.matricula_actual &&
                <Grid size={{ xs: 12, md: 12 }}>
                    <Paper sx={{ p: 2 }} style={{ border: "solid 1px" + registoColor, boxShadow: "0 0 5px" + registoColor }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="h5" fontWeight={"bold"}>
                                    Registro
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 12 }}>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <Grid container spacing={1}>
                                            <Grid size={{ xs: 12, md: 12 }} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div className="imagenPerfil" style={{ border: "solid 1px" + registoColor, boxShadow: "0 0 5px" + registoColor }}>
                                                    <img src={imageFile} alt="" width={"100%"} />
                                                </div>
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 12 }} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Button
                                                    // fullWidth
                                                    component="label"
                                                    role={undefined}
                                                    tabIndex={-1}
                                                    size="small"
                                                    color={imageFile ? "secondary" : "primary"}
                                                    variant={imageFile ? "contained" : "contained"}
                                                    startIcon={<CameraAltIcon />}
                                                >
                                                    {imageFile &&
                                                        "Imagen Cargada"
                                                    }
                                                    {!imageFile &&
                                                        "Cargar Imagen"
                                                    }
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        onChange={handleImageChange}
                                                        name='imagen'
                                                    />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 8 }} style={{ alignSelf: 'center' }}>
                                        <Grid container spacing={3}>
                                            <Grid size={{ xs: 12, md: 12 }}>
                                                <Typography variant="h6" color="error" fontWeight={"bold"} textAlign={"center"}>{errorMatriculaMsg}</Typography>
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <TextField
                                                    id="re_matricula"
                                                    label="Tu Matricula"
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ mr: 3 }}
                                                    fullWidth
                                                    value={registroMatricula}
                                                    onChange={(e) => setRegistoMatricula(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <TextField
                                                    id="re_nombre"
                                                    label="Nombre"
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ mr: 3 }}
                                                    fullWidth
                                                    value={registroNombre}
                                                    onChange={(e) => setRegistoNombre(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <TextField
                                                    id="re_nickname"
                                                    label="NickName"
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ mr: 3 }}
                                                    fullWidth
                                                    value={registroNick}
                                                    onChange={(e) => setRegistoNick(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }} style={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography variant="body1" >
                                                    Color
                                                </Typography>
                                                <Input
                                                    id="re_color"
                                                    label="Color"
                                                    type="color"
                                                    fullWidth
                                                    style={{ margin: '0 20px' }}
                                                    value={registoColor}
                                                    onChange={(e) => setRegistoColor(e.target.value)}
                                                />
                                            </Grid>


                                            <Grid size={{ xs: 12, md: 12 }} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button
                                                    style={{ justifySelf: "flex-end" }}
                                                    color="primary"
                                                    variant="contained"

                                                    onClick={handleRegistrarUsuario}
                                                > Registrarme </Button>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            }
        </Grid>
    )
}

export default Perfil