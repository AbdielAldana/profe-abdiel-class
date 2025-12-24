import { Box, Typography, Divider, Paper } from "@mui/material";
import ContratoEvaluacion from "../../components/ContratoEvaluacion";
import MateriaInfo from "../../components/MateriaInfo";

export default function DisenoMultimedia() {
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
        "Identidad y consistencia de marca – 40%",
        "Aplicación multiplataforma – 20%",
        "Requisitos – 20%",
    ];

    const projectNotes =
        "Un proyecto por parte. El segundo depende del primero. No hay prórrogas.";

    return (
        <Box sx={{ mx: "auto" }}>
            {/* Header */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    8vo AAD - Diseño Multimedia
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Crearás la identidad visual de un noticiero online. Diseñarás paquete gráfico para streaming y redes (overlays, lower thirds, banners y miniaturas) con una guía de estilo consistente para múltiples plataformas.
                </Typography>
            </Paper>

            <MateriaInfo
                objetivo="Crear la identidad visual de un noticiero online."
                proposito="Que el alumno conozca los principios básicos de un noticiero y pueda adaptar el diseño a diferentes plataformas online."
                temas={[
                    "Branding para noticiero: nombre, logo, paleta y tipografías",
                    "Paquete gráfico para streaming: overlays, lower thirds, transiciones y pantallas (starting, intermission, ending)",
                    "Elementos para redes: banners, headers y miniaturas (thumbnails)",
                    "Iconografía y señales visuales para secciones y breaking news",
                    "Plantillas reutilizables para miniaturas con jerarquía tipográfica",
                    "Guía de estilo: reglas de uso, márgenes seguros y grid",
                    "Exportación y formatos para web/stream (PNG, WEBP, SVG)",
                    "Organización de assets y preparación de entregables",
                ]}
                software={[
                    "Adobe Illustrator (Ilustrador)",
                    "Krita",
                ]}
                proyecto="Un PDF final que muestre todo el trabajo del noticiero (identidad, paquete gráfico de streaming, piezas para redes y guía de estilo)."
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
