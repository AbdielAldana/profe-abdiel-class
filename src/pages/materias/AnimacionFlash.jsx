import { Box, Typography, Divider, Paper, List, ListItem } from "@mui/material";
import ContratoEvaluacion from "../../components/ContratoEvaluacion";
import MateriaInfo from "../../components/MateriaInfo";


export default function AnimacionFlash() {
    const weights = [
        { label: "Tareas y Actividades", value: "40%" },
        { label: "Asistencias y Participaciones", value: "10%" },
        { label: "Examen", value: "10%" },
        { label: "Proyecto", value: "40%" },
    ];

    const partDates = [
        "Parte 1: Del 3 de septiembre al 10 de octubre. Exámenes del 13 al 21 de octubre.",
        "Parte 2: Del 22 de octubre al 28 de noviembre. Exámenes del 1 al 9 de diciembre.",
    ];

    const projectCriteria = [
        "Composicion – 20%",
        "Edicion – 20%",
        "Introduccion – 20%",
        "Actividades – 40%",
    ];

    const projectNotes =
        "Un proyecto por parte. El segundo depende del primero. No hay prórrogas.";


    return (
        <Box sx={{ mx: "auto" }}>
            {/* Header */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    7mo DGP - Animacion y Flash
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Explorarás los 12 principios de la animación y los aplicarás en ejercicios cuadro por cuadro, planificando y exportando secuencias que culminan en un video compilatorio con fluidez y narrativa visual.
                </Typography>
            </Paper>
            <MateriaInfo
                objetivo="Que el alumno aprenda los 12 principios fundamentales de la animación digital y los aplique en la creación de secuencias fluidas utilizando software especializado."
                proposito="Desarrollar en el alumno la capacidad de transformar ideas en movimiento mediante técnicas de animación digital, fomentando la creatividad, la planeación y la narrativa visual."
                temas={[
                    "Principios básicos de animación (squash & stretch, anticipación, timing, spacing)",
                    "Creación de animaciones cuadro por cuadro en Krita",
                    "Uso de capas y organización del trabajo en proyectos de animación",
                    "Exportación de animaciones en formatos de video",
                    "Integración de todas las prácticas en un solo producto audiovisual"
                ]}
                software={[
                    "Krita (animación cuadro por cuadro)",
                ]}
                proyecto="Un video compilatorio que integre todas las animaciones desarrolladas durante el curso, dividido en dos entregas: una por cada parte del tetramestre."
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
