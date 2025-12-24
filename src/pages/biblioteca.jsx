import React, { useMemo, useState, useEffect } from "react";
import {
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Stack,
    TextField,
    MenuItem,
    InputAdornment,
    Divider,
    CardMedia,
    Tooltip,
    CardActionArea,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
    showProgress: true,
    steps: [
        { element: '#filtros', popover: { title: 'Filtros', description: 'Esta es la seccion de filtros' } },
        { element: '#titulo', popover: { title: 'Titulo', description: 'Puedes buscar directamente por Titulo' } },
        { element: '#tema', popover: { title: 'Tema', description: 'Escoger un tema en especifico' } },
        { element: '#autor', popover: { title: 'Autor', description: 'O simplemente por autor.' } },
        { element: '#etiquetas', popover: { title: 'Etiquetas', description: 'O aun mas facil, solo seleccionar la etiqueta del tema correspondiente.' } },
        { element: '.etiqueta', popover: { title: 'Etiqueta', description: 'Solo dale Click' } },
        { element: '.cardM', popover: { title: 'Ficha de Libro', description: 'Esta es uan ficha Bibliografica.' } },
    ]
});

/**
 * Biblioteca Digital
 * - Tarjetas en 3 columnas (responsivo)
 * - Filtros por Tema (carpeta lógica) y Autor
 * - Búsqueda por título
 * - Abre el recurso en nueva pestaña
 * - Datos desde JSON remoto (catalog.v1.json)
 * - **NUEVO**: Un documento puede pertenecer a múltiples temas (topics)
 *
 * Uso:
 * <Biblioteca baseUrl="https://docs.abdielaldana.com/biblioteca" />
 */

const BASE_TOPICS = {
    animacion_digital: "Animación Digital",
    portafolio_profecional: "Portafolio Profesional",
    desarrollo_web: "Desarrollo Web",
    diseno_grafico: "Diseño Gráfico",
    diseno_multimedia: "Diseño Multimedia",
    mercadotecnia: "Mercadotecnia",
    ilustracion: "Ilustracion",
    literatura: "Literatura",
    tesis: "Tesis",
    programacion: "Programacion",
    fotografia: "Fotografia",
    publicidad: "Publicidad",
};

// Portadas de respaldo por id (si el JSON no trae `cover`)
const covers = {
    "anim-fondos-mitch-leeuwe": "Como_dibujar_fondos.png",
    "anim-personajes-mitch-leeuwe": "Como_dibujar_personajes.png",
    "web-css3-missing-manual": "css3.png",
    "dm-ejemplo-proyecto-final": "ejemplo_proyecto.png",
    "dg-psicologia-color": "psicologia_del_color.png",
    "mkt-laura-fischer": "mercadotecnia.png",
    "port-el-portafolio-paso-a-paso": "portafolio_paso_a_paso.png",
    "port-abdiel-aldana": "portafolio_profecional.png",
    "web-duckett-html-css": "htmlycss.png",
    "dm-ejemplo-logotipo": "Ejemplo_presentacion_logotipo.jpg",
    "port-identidad-corporativa": "identidad_corporativa.png",
    "port-manual-de-marketing": "manual_de_marketing_y_cultural.png"
};

// Utilidad para armar URL del archivo (soporta acentos/espacios)
function buildUrl(baseUrl, folder, file) {
    return `${baseUrl}/${folder}/${encodeURIComponent(file)}`;
}

// Portada: usa b.cover del JSON; si no, usa covers[id]; si no, genérica
function buildCoverUrl(baseUrl, b) {
    if (b.cover) {
        // absoluta
        if (/^https?:\/\//i.test(b.cover)) return b.cover;
        // relativa a /Portadas
        return `${baseUrl}/Portadas/${encodeURIComponent(b.cover)}`;
    }
    const fallback = covers[b.id] || "generica.jpg";
    return `${baseUrl}/Portadas/${fallback}`;
}

export default function Biblioteca({
    baseUrl: baseUrlProp = "https://docs.abdielaldana.com/biblioteca",
    catalogUrl = "https://docs.abdielaldana.com/biblioteca/catalog.v1.json",
}) {
    const [authorFilter, setAuthorFilter] = useState("__all");
    const [topicFilter, setTopicFilter] = useState("__all");
    const [query, setQuery] = useState("");

    // Datos remotos
    const [remoteBaseUrl, setRemoteBaseUrl] = useState(baseUrlProp);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        let alive = true;
        axios.get(catalogUrl, {
            headers: { Accept: "application/json" },
            // Cache-bust en dev; si no lo quieres, quita esta línea:
            params: { t: Date.now() },
            withCredentials: false,
            timeout: 15000,
        })
            .then(res => {
                if (!alive) return;

                let json = res.data;
                console.log(res.data);


                // Si vino como string (por headers incorrectos), parsea a objeto
                if (typeof json === "string") {
                    try {
                        // elimina posible BOM al inicio
                        const cleaned = json.replace(/^\uFEFF/, "");
                        json = JSON.parse(cleaned);
                    } catch (e) {
                        console.error("No se pudo parsear el JSON del catálogo:", e, json.slice?.(0, 200));
                        json = {};
                    }
                }

                // Soporta ambos esquemas: items[] o libros[]
                // const items = Array.isArray(json.items)
                //     ? json.items
                //     : Array.isArray(json.libros)
                //         ? json.libros
                //         : [];

                const items = json[0].items
                console.log(items);

                setRemoteBaseUrl(json.baseUrl || baseUrlProp);
                setBooks(items);
                // driverObj.drive();
            })
            .catch(err => {
                console.error("Error cargando catálogo:", err?.message || err);
                // Si falla, dejamos books = [] (no mezclamos con locales porque pediste cambiar al JSON nuevo)
                setRemoteBaseUrl(baseUrlProp);
                setBooks([]);
            });
        return () => { alive = false; };
    }, [catalogUrl, baseUrlProp]);

    // Lista de autores (normalizada, soporta múltiples separados por coma)
    const allAuthors = useMemo(() => {
        const set = new Set();
        for (const b of books) {
            if (!b.author) continue;
            b.author.split(",").map((a) => a.trim()).filter(Boolean).forEach((a) => set.add(a));
        }
        return ["__all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
    }, [books]);

    // Lista de temas
    const allTopics = useMemo(() => {
        const set = new Set(books.flatMap((b) => b.topics || []));
        return ["__all", ...Array.from(set)];
    }, [books]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return books
            .filter((b) => {
                if (authorFilter === "__all") return true;
                const list = (b.author || "").split(",").map((a) => a.trim().toLowerCase()).filter(Boolean);
                return list.includes(authorFilter.toLowerCase());
            })
            .filter((b) => (topicFilter === "__all" ? true : (b.topics || []).includes(topicFilter)))
            .filter((b) => (q ? (b.title || "").toLowerCase().includes(q) : true))
            .sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }, [books, authorFilter, topicFilter, query]);

    const countByTopic = useMemo(() => {
        const map = new Map();
        Object.keys(BASE_TOPICS).forEach((t) => map.set(t, 0));
        for (const b of filtered) {
            for (const t of (b.topics || [])) map.set(t, (map.get(t) || 0) + 1);
        }
        return map;
    }, [filtered]);

    const baseUrl = remoteBaseUrl || baseUrlProp;

    

    return (
        <Grid container spacing={3}>
            {/* Header */}
            <Grid item size={{ xs: 12, md: 12 }}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Biblioteca Digital
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Catálogo cargado desde JSON remoto. Haz clic en una portada o en “Abrir”.
                    </Typography>
                </Paper>
            </Grid>

            {/* Filtros */}
            <Grid item size={{ xs: 12, md: 12 }}>
                <Paper sx={{ p: 2 }} id="filtros">
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "stretch", md: "center" }}>
                        <TextField
                            id="titulo"
                            fullWidth
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            label="Buscar por título"
                            placeholder="Ej. Psicología del color"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField id="tema" select label="Tema" value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)} sx={{ minWidth: 220 }}>
                            {allTopics.map((t) => (
                                <MenuItem key={t} value={t}>
                                    {t === "__all" ? "Todos los temas" : (BASE_TOPICS[t] || t)}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField id="autor" select label="Autor" value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)} sx={{ minWidth: 220 }}>
                            {allAuthors.map((a) => (
                                <MenuItem key={a} value={a}>
                                    {a === "__all" ? "Todos los autores" : a}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </Paper>
            </Grid>

            {/* Chips de conteo por tema */}
            <Grid item size={{ xs: 12, md: 12 }} id={"etiquetas"}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {Object.entries(BASE_TOPICS).map(([key, label]) => (
                        <Chip
                            className="etiqueta"
                            key={key}
                            label={`${label} • ${countByTopic.get(key) || 0}`}
                            variant={topicFilter === key ? "filled" : "outlined"}
                            onClick={() => setTopicFilter((prev) => (prev === key ? "__all" : key))}
                            sx={{ mr: 1, mb: 1 }}
                        />
                    ))}
                </Stack>
            </Grid>

            <Grid item size={{ xs: 12, md: 12 }}>
                <Divider />
            </Grid>

            {/* Tarjetas */}
            {filtered.map((b) => {
                const href = buildUrl(baseUrl, b.folder, b.file);
                return (
                    <Grid key={b.id} item size={{ xs: 12, md: 4 }} className={"cardM"}>
                        <Card sx={{ height: "100%", minWidth: "100%", display: "flex", flexDirection: "column" }}>
                            <CardActionArea component="a" href={href} target="_blank" rel="noopener noreferrer">
                                <CardMedia
                                    component="img"
                                    image={buildCoverUrl(baseUrl, b)}
                                    alt={b.title}
                                    sx={{ maxHeight: 200, objectFit: "cover", objectPosition: "top" }}
                                />
                            </CardActionArea>

                            <CardContent sx={{ flexGrow: 1 }}>
                                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" justifyContent="flex-start">
                                    {(b.topics || []).map((t) => (
                                        <Chip key={t} size="small" label={BASE_TOPICS[t] || t} variant="outlined" style={{ marginBottom: "10px", marginLeft: 0, marginRight: "10px" }} />
                                    ))}
                                </Stack>

                                <Typography variant="h6" gutterBottom>
                                    <Chip size="small" label={b.format} style={{ marginRight: "5px" }} />
                                    {b.year ? <Chip size="small" label={b.year} variant="outlined" style={{ marginRight: "5px" }} /> : null}
                                    {b.sizeBytes ? <Chip size="small" label={b.sizeBytes + " MB"} variant="outlined" /> : null}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {b.title}
                                </Typography>
                                {b.author ? (
                                    <Typography variant="body2" color="text.secondary">
                                        {b.author}
                                    </Typography>
                                ) : null}
                            </CardContent>

                            <CardActions style={{display: " ", justifyContent: "space-between"}}>
                                <Tooltip title="Abrir en nueva pestaña">
                                    <Button size="small" variant="contained" href={href} target="_blank" rel="noopener noreferrer">
                                        Abrir
                                    </Button>
                                </Tooltip>
                                <Button size="small" variant="text" onClick={() => navigator.clipboard.writeText(href)}>
                                    Copiar enlace
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })}

            {filtered.length === 0 && (
                <Grid item size={{ xs: 12, md: 12 }}>
                    <Paper sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="body1">No se encontraron resultados con los filtros actuales.</Typography>
                    </Paper>
                </Grid>
            )}

            {/* Nota de mantenimiento */}
            <Grid item size={{ xs: 12, md: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        ¿Cómo puedo aportar libros?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Envia un correo a <a href="mailto:adolforamirezupg@gmail.com">adolforamirezupg@gmail.com</a>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        En el Asunto: "Libro para Biblioteca - 'Nombre del Libro'"
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        En el Cuerpo del correo:
                    </Typography>
                    <ul>
                        <li>Nombre del Libro</li>
                        <li>Autor</li>
                        <li>Año de Publicacion</li>
                        <li>Formato del Libro (PDF, DOC, TXT, etc.)</li>
                        <li>Topico correspondiente (Animacion, Diseño Grafico, etc.)</li>
                    </ul>
                    <Typography variant="body2" color="text.secondary">
                        Adjunta en el correo El Libro y una Imagen de la portada.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}
