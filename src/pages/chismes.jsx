import React, { useEffect, useRef } from "react";
import {
    Grid,
    Paper,
    Typography,
    Button,
    MenuItem,
    Divider,
    Modal,
    TextField,
    Chip,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Chisme from "../components/Chisme";
import ChismeAvisoModal from "../components/ChismeAvisoModal";
import Fab from '@mui/material/Fab';
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import CloseIcon from '@mui/icons-material/Close';
import NavbarBottom from "../components/NavbarBottom";
import { data } from "react-router";
import ActionBar from "../components/ActionBar";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: {
		xs: "100vw",
		// sm: "80vw",
		// md: "70vw",
		// lg: "60vw",
	},
	height: {
		xs: "95vh",
		// sm: "auto",
		// md: "auto",
		// lg: "auto",
	},
	bgcolor: "background.paper",
	borderRadius: "0px",
	boxShadow: 24,
	overflow: "auto",
	p: 4,
};
const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const topicsList = [
    { value: "todos", view: "Todos" },
    { value: "random", view: "Random" },
    { value: "rumores_sin_filtro", view: "Rumores sin filtro" },
    { value: "fails_legendarios", view: "Fails legendarios" },
    { value: "crush_confidencial", view: "Crush confidencial 💘" },
    { value: "profe_mode_on", view: "Profe mode ON" },
    { value: "el_pasillo_oscuro", view: "El pasillo oscuro 👀" },
    { value: "drama_universitario", view: "Drama universitario" },
    { value: "cosas_del_multiverso", view: "Cosas del multiverso 🌌" },
    { value: "historias_de_terror", view: "Historias de terror 😱" },
    { value: "desahogate_aqui", view: "Desahógate aquí 😤" },
];

function Chismes() {
    const [cookies, setCookie] = useCookies(["palabrasecreta"]);

    const notifyError = (txt) =>
        toast.error(txt, { position: "top-center" });
    const notifySuccess = (txt) =>
        toast.success(txt, { position: "top-center" });

    // =============================
    // Estado principal de lista
    // =============================
    const [array, setArray] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);
    const [error, setError] = React.useState(null);

    // Parámetros que entiende tu back
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(5);
    const [order, setOrder] = React.useState("new"); // 'new' | 'old' | 'level' | ...
    const [visible, setVisible] = React.useState(1);
    const [includeComments, setIncludeComments] = React.useState(1);
    const [commentsVisible, setCommentsVisible] = React.useState(1);

    // Filtro de tema en UI
    const [topicFilter, setTopicFilter] = React.useState("todos");

    // AbortController para evitar carreras
    const abortRef = useRef(null);

    // Sentinel para infinite scroll
    const sentinelRef = useRef(null);

    // =============================
    // Publicación (modal)
    // =============================
    const [openComent, setOpenComent] = React.useState(false);
    // const handleOpenComent = () => {setOpenComent(true)};
    const handleOpenComent = React.useCallback(() => {
        setOpenComent(true);
    }, []);
    const handleCloseComent = () => setOpenComent(false);

    const [titulo, setTitulo] = React.useState("");
    const [topic, setTopic] = React.useState("random");
    const [texto, setTexto] = React.useState("");
    const [descripcion, setDescripcion] = React.useState(
        "Confiesa algo que te pasó hoy o algo random que quieras soltar..."
    );
    const [pass, setPass] = React.useState("");
    const [lenghtTexto, setLenghtText] = React.useState(0);
    const [lenghtTitle, setLenghtTitle] = React.useState(0);

    const handleChangeTitulo = (e) => {
        if (e.target.value.length <= 60) {
            setTitulo(e.target.value)
            setLenghtTitle(e.target.value.length)
        }
    };
    const handleChangePassword = (e) => setPass(e.target.value);
    const handleChangeTexto = (e) => {
        setTexto(e.target.value);
        setLenghtText(e.target.value.length);
    };

    const handleChangeSelect = (event) => {
        setTopic(event.target.value);
        switch (event.target.value) {
            case "random":
                setDescripcion("Confiesa algo que te pasó hoy o algo random que quieras soltar...");
                break;
            case "rumores_sin_filtro":
                setDescripcion("Chismes o teorías raras, pero sin nombres ni indirectas.");
                break;
            case "fails_legendarios":
                setDescripcion("Historias vergonzosas o cagadas épicas.");
                break;
            case "crush_confidencial":
                setDescripcion("“No diré nombres, pero me encanta alguien de...” 💘");
                break;
            case "profe_mode_on":
                setDescripcion("Frases icónicas, momentos chistosos o cosas raras de clase.");
                break;
            case "el_pasillo_oscuro":
                setDescripcion("Cosas que pasan en los pasillos, baños o rincones del campus 👀");
                break;
            case "drama_universitario":
                setDescripcion("Quejas o mini novelas sobre trabajos, proyectos o grupos.");
                break;
            case "cosas_del_multiverso":
                setDescripcion("Chismes tan absurdos que ni Thanos los entendería.");
                break;
            case "historias_de_terror":
                setDescripcion("Desde apariciones hasta el examen que te mató por dentro.");
                break;
            case "desahogate_aqui":
                setDescripcion("Espacio libre para gritar al vacío sin que nadie sepa quién eres 😤");
                break;
            default:
                break;
        }
    };

    const handleSendChisme = () => {
        if (titulo === "") {
            notifyError("Y el titulo mi reyna???");
            return;
        }
        if (texto === "") {
            notifyError("Y el chisme corazon???");
            return;
        }
        axios
            .post(`${process.env.REACT_APP_API_URL}/post_chisme.php`, {
                titulo: titulo,
                topic: topic,
                texto: texto,
                password: pass,
            })
            .then((res) => {
                notifySuccess("Chisme Publicado");
                // Refresca lista con reset:
                refreshChismes();
                setOpenComent(false);
                // Limpia campos
                setTitulo("");
                setTexto("");
                setPass("");
                setTopic("random");
            })
            .catch((err) => console.log("Error:", err));
    };

    // =============================
    // Filtros de la lista
    // =============================
    const handleChangeSelectFilter = (event) => {
        const val = event.target.value;
        setTopicFilter(val);
        // 🔥 refresca en caliente con el valor nuevo
        refreshChismes({ overrides: { topicFilter: val } });
    };

    // =============================
    // Build de params -> respeta back
    // =============================
    const buildParams = (pageArg, overrides = {}) => {
        const finalOrder = overrides.order ?? order;
        const finalTopicFilter = overrides.topicFilter ?? topicFilter;

        const p = {
            page: pageArg,
            limit,
            order: finalOrder,
            visible,
            include_comments: includeComments,
            comments_visible: commentsVisible,
        };

        // topic: si es "todos", NO lo envíes (que no filtre)
        if (finalTopicFilter !== "todos") {
            p.topic = finalTopicFilter; // ← ya no envío "" si es "random"
        }

        // Limpia undefined/"" para no filtrar accidentalmente
        Object.keys(p).forEach((k) => {
            if (p[k] === undefined || p[k] === null || p[k] === "") delete p[k];
        });
        return p;
    };

    // =============================
    // Cargar página (append o reset)
    // =============================
    const cargarChismes = async ({ reset = false, overrides = {} } = {}) => {
        if (loading) return;
        setLoading(true);

        // Cancela petición previa
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        const pageToAsk = reset ? 1 : page;

        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/get_chismes.php`,
                {
                    params: buildParams(pageToAsk, overrides),
                    signal: controller.signal,
                }
            );

            setArray(prev => (reset ? data.data : [...prev, ...data.data]));

            // Calcular hasMore con total/limit del back
            const totalPages = Math.max(1, Math.ceil(data.total / data.limit));
            setHasMore(data.page < totalPages);

            // Avanza página según lo que regresó el back
            setPage(data.page + 1);

            if (reset) notifySuccess("Chismes actualizados");
            setError(null);
        } catch (err) {
            if (axios.isCancel(err)) return;
            console.error("Error cargando chismes:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const refreshChismes = ({ overrides = {} } = {}) => {
        // reset de estado de paginación
        setPage(1);
        setHasMore(true);
        setArray([]);
        // usar overrides para que impacte de inmediato
        cargarChismes({ reset: true, overrides });
    };

    async function revalidateComentarios(id) {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_API_URL}/get_chismes.php`, {
                params: { id_registro: id },
            });

            const list =
                Array.isArray(resp?.data) ? resp.data :
                    Array.isArray(resp?.data?.data) ? resp.data.data :
                        Array.isArray(resp?.data?.chismes) ? resp.data.chismes :
                            [];

            const fresh = list[0];

            setArray(prev => prev.map(x =>
                x.id_registro === id
                    ? { ...x, ...fresh, updated_at: Date.now() }
                    : x
            ));
        } catch (e) {
            console.error("revalidateComentarios error:", e);
            notifyError("No pude revalidar los comentarios.");
        }
    }

    // =============================
    // Efectos
    // =============================

    // Filtro orden GET (con override para un solo clic)
    const handleSetGetOrder = (val) => {
        setOrder(val);
        refreshChismes({ overrides: { order: val } });
    };

    // Primer carga
    useEffect(() => {
        cargarChismes({ reset: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Infinite scroll con IntersectionObserver
    useEffect(() => {
        if (!sentinelRef.current) return;
        const el = sentinelRef.current;

        const obs = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasMore && !loading) {
                    cargarChismes();
                }
            },
            { root: null, rootMargin: "1px", threshold: 0 }
        );

        obs.observe(el);
        return () => obs.unobserve(el);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasMore, loading, array]);

    // Limpia abort al desmontar
    useEffect(() => {
        return () => abortRef.current?.abort();
    }, []);

    const [openPass, setOpenPass] = React.useState(false);
    const handleSetPass = () => { setOpenPass(!openPass); };

    // ===================================================================
    const [openModalMail, setOpenModalMail] = React.useState(false)
    // const handleModalMail = () => {setOpenModalMail(true)}
    const handleOpenMail = () => {
        setOpenModalMail(true);
    };
    const handleModalMailClose = () => { setOpenModalMail(false) }

    const [titutloQueja, setTituloQueja] = React.useState("")
    const [titutloQuejaLenght, setTituloQuejaLenght] = React.useState(0)
    const handleTituloQueja = (e) => {
        if (e.target.value.length <= 30) {
            setTituloQueja(e.target.value)
            setTituloQuejaLenght(e.target.value.length)
        }
    }

    const [cometarioQueja, setComentarioQueja] = React.useState("not_found")
    const handleComentarioQueja = (e) => {
        setComentarioQueja(e.target.value)
    }

    const [mensajeQueja, setMensajeQueja] = React.useState("")
    const [mensajeQuejaLenght, setMensajeQuejaLenght] = React.useState(0)
    const handleMensajeQueja = (e) => {
        if (e.target.value.length <= 200) {
            setMensajeQueja(e.target.value)
            setMensajeQuejaLenght(e.target.value.length)
        }
    }

    const enviarCorreo = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/send_mail.php`,
                {
                    asunto: titutloQueja,  // ya tienes tu useState
                    texto: cometarioQueja + " / " + mensajeQueja    // ya tienes tu useState
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            return data; // { ok: true/false }
        } catch (error) {
            console.error("Error al enviar correo:", error);
            return { ok: false };
        }
    };


    const handleSubmit = async () => {
        if (titutloQueja.length === 0) {
            notifyError("Te falta el asunto")
            return false
        }
        if (mensajeQueja.length === 0) {
            notifyError("Y el mensaje????")
            return false
        }
        const res = await enviarCorreo();
        console.log(res);

        if (res.ok) {
            // éxito
            notifySuccess("Queja enviada.")
            setComentarioQueja("not_found")
            setTituloQueja("")
            setTituloQuejaLenght(0)
            setMensajeQueja("")
            setMensajeQuejaLenght(0)
            setOpenModalMail(false)
        } else {
            // fallo
            notifyError("Algo fallo en el servidor, prueba mas de rato.")
        }
    };
    return (
        <div>
            <Grid container spacing={5}>
                {/* ================= Filtros ================= */}
                <Grid item size={{ xs: 12, md: 12 }}>
                    <Paper sx={{ p: 2 }} id="filtros">
                        <Grid container spacing={2}>
                            <Grid item size={{ xs: 12, md: 12 }}>
                                <Typography
                                    variant="h5"
                                    fontWeight={"bold"}
                                    gutterBottom
                                    textAlign="center"
                                >
                                    💬 Foro 💬
                                </Typography>
                            </Grid>

                            <Grid item size={{ xs: 12, sm: 6, md: 8 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="topic-filter-label">Buscar por Tema</InputLabel>
                                    <Select
                                        labelId="topic-filter-label"
                                        id="topic-filter"
                                        value={topicFilter}
                                        label="Buscar por Tema"
                                        onChange={handleChangeSelectFilter}
                                    >
                                        {topicsList.map((e, i) => (
                                            <MenuItem value={e.value} key={i}>{e.view}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item size={{ xs: 12, sm: 6, md: 4 }} display={"flex"} justifyContent={"space-evenly"} alignItems={"center"}>
                                <Chip label="Nuevos" clickable color={order === "new" ? "secondary" : "default"} onClick={() => handleSetGetOrder("new")} />
                                <Chip label="Viejos" clickable color={order === "old" ? "secondary" : "default"} onClick={() => handleSetGetOrder("old")} />
                                <Chip label="Destacados" clickable color={order === "level" ? "secondary" : "default"} onClick={() => handleSetGetOrder("level")} />
                                {/* Si quieres activar los otros modos del back:
                                <Chip label="Comentados TOP" clickable color={order === "comments_level" ? "secondary" : "default"} onClick={() => handleSetGetOrder("comments_level")} />
                                <Chip label="Efectivo" clickable color={order === "effective" ? "secondary" : "default"} onClick={() => handleSetGetOrder("effective")} />
                                */}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* ================= Lista ================= */}
                <Grid item size={{ xs: 12, md: 12 }}>
                    <Grid container spacing={3}>
                        {array.length !== 0 &&
                            array.map(e => (
                                <Chisme
                                    key={e.id_registro}
                                    data={e}
                                    pass={pass}
                                    refreshChismes={revalidateComentarios}
                                />
                            ))
                        }
                    </Grid>

                    {/* Fallback manual */}
                    <Grid item size={{ xs: 12, md: 12 }} style={{ marginTop: 16 }}>
                        {error && (
                            <Typography color="error" sx={{ mb: 1 }}>
                                {String(error.message || error)}
                            </Typography>
                        )}

                        {!loading && array.length === 0 &&
                            <Typography sx={{ mt: 1, textAlign: "center" }}>• No hay chismes aqui, agrega uno •</Typography>
                        }

                        {loading && <Typography sx={{ mt: 1, textAlign: "center" }}>Cargando…</Typography>}

                        {!hasMore && array.length > 0 && (
                            <Typography sx={{ mt: 1, textAlign: "center" }}>• Son todos, agrega mas! •</Typography>
                        )}
                    </Grid>

                    {/* Sentinel para infinite scroll */}
                    <div ref={sentinelRef} style={{ height: 1 }} />
                </Grid>
            </Grid>
            <NavbarBottom onOpenMail={handleOpenMail} onOpenComent={handleOpenComent}></NavbarBottom>

            {/* ================= Modal Publicar ================= */}
            <Modal
                open={openComent}
                onClose={handleCloseComent}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper sx={style}>
                    <Grid container spacing={2}>
                        <Grid item size={{ xs: 12, md: 12 }} className="buttonClose">
                            <Fab aria-label="add" size="small" onClick={handleCloseComent}>
                                <CloseIcon />
                            </Fab>
                        </Grid>
                        <Grid item size={{ xs: 12, md: 12 }}>
                            <Typography
                                variant="h4"
                                fontWeight={"bold"}
                                gutterBottom
                                textAlign="center"
                            >
                                ¡Cuéntanos algo!
                            </Typography>
                            <Divider />
                        </Grid>

                        <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Titulo"
                                variant="outlined"
                                fullWidth
                                value={titulo}
                                onChange={handleChangeTitulo}
                                helperText={lenghtTitle + "/ 60"}
                            />
                        </Grid>

                        <Grid item size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel id="topic-post-label">Tema</InputLabel>
                                <Select
                                    labelId="topic-post-label"
                                    id="topic-post"
                                    value={topic}
                                    label="Tema"
                                    onChange={handleChangeSelect}
                                >
                                    {topicsList.map((e, i) => {
                                        if (e.value !== "todos") {
                                            return (
                                                <MenuItem value={e.value} key={i}>{e.view}</MenuItem>
                                            );
                                        }
                                        return null;
                                    })}
                                </Select>
                            </FormControl>
                            <Typography gutterBottom textAlign="left" variant="caption">
                                {descripcion}
                            </Typography>
                        </Grid>

                        <Grid item size={{ xs: 12, md: 12 }}>
                            <textarea
                                rows={6}
                                placeholder={"Empieza a escribir aqui...."}
                                maxLength={400}
                                className="textarea"
                                value={texto}
                                onChange={handleChangeTexto}
                                style={{ width: "100%" }}
                            />
                            <Typography variant="caption" gutterBottom textAlign="center">
                                {lenghtTexto} / 400
                            </Typography>
                        </Grid>
                        <Grid item size={{ xs: 12, md: 12 }}>
                            <Typography gutterBottom textAlign="center">
                                NO COMPARTAS DATOS PERSONALES DE NINGÚN TIPO!!
                            </Typography>
                        </Grid>
                        <Grid item size={{ xs: 12, md: 12 }}>
                            <Divider />
                        </Grid>

                        <Grid item size={{ xs: 8, md: 6 }}></Grid>
                        <Grid item size={{ xs: 4, md: 6 }} display={"flex"} justifyContent={"flex-end"}>
                            <Button size="large" variant="contained" onClick={handleSendChisme}>
                                Publicar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>

            {/* ================= Modal Publicar ================= */}
            <Modal
                open={openModalMail}
                onClose={handleModalMailClose}
                aria-labelledby="modal-modal-quejas"
                aria-describedby="modal-modal-Quejas"
            >
                <Paper sx={style}>
                    <Grid container spacing={2}>
                        <Grid item size={{ xs: 12, md: 12 }} className="buttonClose">
                            <Fab aria-label="add" size="small" onClick={handleModalMailClose}>
                                <CloseIcon />
                            </Fab>
                        </Grid>
                        <Grid item size={{ xs: 12, md: 12 }}>
                            <Typography
                                variant="h4"
                                fontWeight={"bold"}
                                gutterBottom
                                textAlign="center"
                            >
                                Quejate
                            </Typography>
                            <Typography
                                variant="caption"
                                gutterBottom
                                textAlign="center"
                                color="error"
                            >
                                Aun no jala...
                            </Typography>
                            <br />
                            <Typography
                                variant="caption"
                                gutterBottom
                                textAlign="center"
                            >
                                Quizas te haga caso. Mensaje directo a mi Correo
                            </Typography>
                            <br />
                            <Typography
                                variant="caption"
                                gutterBottom
                                textAlign="center"
                            >
                                Si no mandame mensaje a mi Whatsapp, esta en "Sobre mi"
                            </Typography>
                            <Divider />
                        </Grid>

                        <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Asunto"
                                variant="outlined"
                                name="queja"
                                fullWidth
                                value={titutloQueja}
                                onChange={handleTituloQueja}
                                helperText={titutloQuejaLenght + "/ 30"}
                            />
                        </Grid>

                        <Grid item size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel id="comentario-queja-label">Razon</InputLabel>
                                <Select
                                    labelId="comentario-queja-label"
                                    id="comentario-queja"
                                    value={cometarioQueja}
                                    label="Razon"
                                    onChange={handleComentarioQueja}
                                >
                                    <MenuItem value={"not_found"}>Ninguna</MenuItem>
                                    <MenuItem value={"Sugerencia"}>Sugerencia</MenuItem>
                                    <MenuItem value={"aviso"}>Algo no sirve</MenuItem>
                                    <Divider />
                                    {array.map((e, i) => {
                                        return (
                                            <MenuItem value={e.id_registro} key={i}>{e.id_registro + " / " + (e.titulo.length > 15 ? e.titulo.substring(0, 15) + "..." : e.titulo)}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Mensaje"
                                variant="outlined"
                                name="msg"
                                fullWidth
                                value={mensajeQueja}
                                onChange={handleMensajeQueja}
                                helperText={mensajeQuejaLenght + "/ 200"}
                                multiline
                            />
                        </Grid>

                        <Grid item size={{ xs: 4, md: 6 }} display={"flex"} justifyContent={"flex-end"}>
                            <Button size="large" variant="contained" onClick={handleSubmit}>
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>





            <ToastContainer autoClose={300} />

        </div>
    );
}

export default Chismes;
