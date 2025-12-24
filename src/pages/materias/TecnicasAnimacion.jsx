import { Box, Typography, Divider, Paper } from "@mui/material";
import ContratoEvaluacion from "../../components/ContratoEvaluacion";
import MateriaInfo from "../../components/MateriaInfo";

export default function TecnicasAnimacion() {
    const weights = [
        { label: "Avances", value: "40%" },
        { label: "Asistencias y Participaciones", value: "10%" },
        { label: "Examen", value: "10%" },
        { label: "Proyecto", value: "40%" },
    ];

    const partDates = [
        "Parte 1: Del 3 de septiembre al 10 de octubre. Exámenes del 13 al 21 de octubre.",
        "Parte 2: Del 22 de octubre al 28 de noviembre. Exámenes del 1 al 9 de diciembre.",
    ];

    const projectCriteria = [
        "Limpieza – 20%",
        "Calidad Visual – 40%",
        "Funcionalidad – 20%",
        "Requisitos – 20%",
    ];

    const projectNotes =
        "Un proyecto por parte. El segundo depende del primero. No hay prórrogas.";

    return (
        <Box sx={{ mx: "auto" }}>
            {/* Header */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    3ro AAD - Técnicas de Animación Digital II
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Curso con dos rutas: corto 2D integrando fotografía (Krita) o animaciones para interfaces web (HTML/CSS/JS). Profundizarás en timing, composición o microinteracciones para un resultado.
                </Typography>
            </Paper>


            <MateriaInfo
                objetivo="Lograr un corto animado integrando fotografías reales con animación 2D en Krita o desarrollar animaciones para interfaces web con HTML/CSS/JS."
                proposito="Que el alumno adquiera habilidades para animar con diferentes técnicas —cuadro por cuadro y animación para UI—, eligiendo una ruta y ejecutándola con planeación, calidad visual y entrega profesional."
                temas={[
                    "Definición de ruta: (A) Corto animado 2D en Krita o (B) Animación para interfaces web",
                    "Preproducción: guion técnico, storyboard y animatic",
                    "Gestión de assets: organización de archivos, nomenclatura y control de versiones",
                    "Exportación y formatos de entrega (video/Web)",
                    "— Ruta A: Krita —",
                    "Animación cuadro por cuadro: timing, spacing, arcos y seguimiento",
                    "Integración de fotografías reales: máscaras, composición y efectos",
                    "Capas, onion skin, keyframes y ciclos",
                    "Edición y montaje del corto final",
                    "— Ruta B: Web —",
                    "Animaciones con CSS (transitions, transforms, @keyframes)",
                    "SVG animado y microinteracciones para UI",
                    "Animaciones con JavaScript (clases, eventos, requestAnimationFrame)",
                    "Accesibilidad y performance en animaciones web",
                ]}
                software={[
                    "Krita (Ruta A: Corto animado 2D)",
                    "Visual Studio Code (Ruta B: Animación Web)",
                ]}
                proyecto="Elegir una opción: (A) Corto animado cuadro por cuadro integrando fotografía real; o (B) Portafolio de animaciones web (componentes UI, banners y microinteracciones) publicado en la web."
            />

            <Divider sx={{ my: 2 }} />

            <ContratoEvaluacion
                weights={weights}
                partDates={partDates}
                projectCriteria={projectCriteria}
                projectNotes={projectNotes}
            />
        </Box>
    );
}
