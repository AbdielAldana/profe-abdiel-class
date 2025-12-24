import { Box, Typography, Divider, Paper } from "@mui/material";
import ContratoEvaluacion from "../../components/ContratoEvaluacion";
import MateriaInfo from "../../components/MateriaInfo";

export default function DisenoApps() {
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
        "Funcionalidad – 40%",        
    ];

    const projectNotes =
        "Un proyecto por parte. El segundo depende del primero. No hay prórrogas.";

    return (
        <Box sx={{ mx: "auto" }}>            
            {/* Header */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    4to AAD - Diseño de Aplicaciones Enfocado en Interfaz
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Centrada en UI/UX para crear interfaces claras y usables. Pasarás de wireframes a maquetas visuales y una demo en HTML/CSS, cuidando jerarquía, consistencia y responsive.
                </Typography>
            </Paper>

            <MateriaInfo
                objetivo="Lograr el entendimiento de los fundamentos de diseño UI/UX aplicados en la creación de interfaces digitales."
                proposito="Dotar al alumno de conocimientos y habilidades en la elaboración del diseño de aplicaciones, integrando criterios estéticos y de usabilidad para futuros proyectos profesionales."
                temas={[
                    "Principios de UI/UX: usabilidad, accesibilidad y experiencia del usuario",
                    "Wireframes y prototipos: del boceto a la maqueta digital",
                    "Diseño visual en Adobe Illustrator: iconografía, botones y layouts",
                    "Maquetación en HTML y CSS de interfaces",
                    "Diseño responsive: adaptando interfaces a distintos dispositivos",
                    "Microinteracciones y retroalimentación visual",
                    "Pruebas de usuario y ajustes de diseño",
                    "Presentación de prototipos y demos",
                ]}
                software={[
                    "Adobe Illustrator",
                    "Visual Studio Code",
                    "Microsoft Edge",
                ]}
                proyecto="Una aplicación en formato maqueta visual y demo funcional con HTML y CSS."
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
