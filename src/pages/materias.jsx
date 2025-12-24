import { Grid, Paper, Typography, Box, Button, Divider } from "@mui/material";
import { Link } from "react-router";

const materias = [
    {
        nombre: "3ro AAD - Programación Web",
        descripcion: "Materia de entrada al desarrollo web con HTML y CSS. A través de avances constantes construirás un portafolio sencillo, ordenado y responsive que servirá como base para mostrar tu trabajo.",
        ruta: "/materias/programacion-web",
        estilo: "border-3aad"
    },
    {
        nombre: "3ro AAD - Técnicas de Animación",
        descripcion: "Curso con dos rutas: corto 2D integrando fotografía (Krita) o animaciones para interfaces web (HTML/CSS/JS). Profundizarás en timing, composición o microinteracciones para un resultado",
        ruta: "/materias/tecnicas-animacion",
        estilo: "border-3aad"
    },
    {
        nombre: "4to AAD - Diseño de Apps",
        descripcion: "Centrada en UI/UX para crear interfaces claras y usables. Pasarás de wireframes a maquetas visuales y una demo en HTML/CSS, cuidando jerarquía, consistencia y responsive.",
        ruta: "/materias/diseno-apps",
        estilo: "border-4aad"
    },
    {
        nombre: "6to AAD - Mercadotecnia",
        descripcion: "Introducción práctica a los principios de la mercadotecnia para convertir ideas en propuestas de valor. Realizarás un ensayo por cada presentación y cerrarás con una propuesta de inversión.",
        ruta: "/materias/mercadotecnia",
        estilo: "border-6aad"
    },
    {
        nombre: "7to AAD - Diseño Editorial",
        descripcion: "Desarrollarás publicaciones digitales e interactivas aplicando retículas, tipografía y accesibilidad. Crearás piezas editoriales (revista, cómic, blog/foro) listas para PDF interactivo o demo web.",
        ruta: "/materias/diseno-editorial",
        estilo: "border-7aad"
    },
    {
        nombre: "7to DGP - Animación y Flash",
        descripcion: "Explorarás los 12 principios de la animación y los aplicarás en ejercicios cuadro por cuadro, planificando y exportando secuencias que culminan en un video compilatorio con fluidez y narrativa visual.",
        ruta: "/materias/animacion-flash",
        estilo: "border-7dgp"
    },
    {
        nombre: "8vo AAD - Diseño Multimedia",
        descripcion: "Crearás la identidad visual de un noticiero online. Diseñarás paquete gráfico para streaming y redes (overlays, lower thirds, banners y miniaturas) con una guía de estilo consistente para múltiples plataformas.",
        ruta: "/materias/diseno-multimedia",
        estilo: "border-8aad"
    },
    {
        nombre: "9no AAD - Portafolio Profesional",
        descripcion: "Materia de consolidación: curarás y presentarás tu trabajo con estándares de la industria. Construirás un portafolio coherente (PDF “mini libro” y versión web) que comunique proceso, resultados y propuesta profesional.",
        ruta: "/materias/portafolio-profesional",
        estilo: "border-9aad"
    }
];

export default function Materias() {
    return (
        <Grid container spacing={3}>
            {/* Header */}
            <Grid item size={{ xs: 12, md: 12 }}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Materias
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Explora los materiales de apoyo por tema, autor o título. Haz clic en un recurso para abrirlo en una nueva pestaña.
                    </Typography>
                </Paper>
            </Grid>
            {materias.map((m) => (
                <Grid key={m.ruta} size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }} className={m.estilo}>
                        <Typography variant="h6" gutterBottom>
                            {m.nombre}
                        </Typography>
                        <Typography variant="body2" sx={{ flexGrow: 1 }} textAlign="justify">
                            {m.descripcion}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            <Button
                                component={Link}
                                to={m.ruta}
                                variant="outlined"
                                size="small"
                            >
                                Ver más
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>        
    );
}
