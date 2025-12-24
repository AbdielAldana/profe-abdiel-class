import { Box, Typography, Divider, Paper } from "@mui/material";
import ContratoEvaluacion from "../../components/ContratoEvaluacion";
import MateriaInfo from "../../components/MateriaInfo";

export default function ProgramacionWeb() {
    const weights = [
        { label: "Avances", value: "20%" },
        { label: "Asistencias y Participaciones", value: "10%" },
        { label: "Examen", value: "20%" },
        { label: "Proyecto", value: "50%" },
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
        "Un unico proyecto, se evaluara en la primer mitad el avance del mismo. En la segunda mitad se evaluara el resultado final.";

    return (
        <Box sx={{ mx: "auto" }}>            
            {/* Header */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    3ro AAD - Programación en Ambiente Web
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Materia de entrada al desarrollo web con HTML y CSS. A través de avances constantes construirás un portafolio sencillo, ordenado y responsive que servirá como base para mostrar tu trabajo.
                </Typography>
            </Paper>

            <MateriaInfo
                objetivo="Que el estudiante domine los aspectos básicos de HTML y CSS, comprendiendo su estructura y uso para el desarrollo web."
                proposito="Permitir al alumno mostrar su avance como artista mediante un portafolio digital que podrá modificar y mejorar con el paso del tiempo, convirtiéndose en una herramienta clave para su desarrollo académico y profesional."
                temas={[
                    "Estructura base de un documento HTML",
                    "Etiquetas semánticas y buenas prácticas",
                    "Selectores CSS, herencia y especificidad",
                    "Modelo de caja (box model), márgenes, padding y bordes",
                    "Tipografía, color y variables CSS",
                    "Layouts con Flexbox y Grid",
                    "Imágenes, multimedia y enlaces",
                    "Responsive design y breakpoints básicos",
                    "Accesibilidad y SEO básico",
                    "Publicación del portafolio (opcional)"
                ]}
                software={[
                    "Visual Studio Code",
                    "Microsoft Edge"
                ]}
                proyecto="Un portafolio digital sencillo en formato web que muestre los trabajos del estudiante."
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
