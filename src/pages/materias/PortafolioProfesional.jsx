import { Box, Typography, Divider, Paper } from "@mui/material";
import ContratoEvaluacion from "../../components/ContratoEvaluacion";
import MateriaInfo from "../../components/MateriaInfo";

export default function PortafolioProfesional() {
    const weights = [
        { label: "Avances", value: "30%" },
        { label: "Asistencias", value: "10%" },
        { label: "Examen", value: "20%" },
        { label: "Proyecto", value: "40%" },
    ];

    const partDates = [
        "Parte 1: Del 3 de septiembre al 10 de octubre. Exámenes del 13 al 21 de octubre.",
        "Parte 2: Del 22 de octubre al 28 de noviembre. Exámenes del 1 al 9 de diciembre.",
    ];

    const projectCriteria = [
        "Limpieza – 20%",
        "Calidad visual y consistencia – 40%",
        "Narrativa y curaduría de casos – 20%",
        "Requisitos – 20%",
    ];

    const projectNotes =
        "Un proyecto por parte. El segundo depende del primero. No hay prórrogas.";

    return (
        <Box sx={{ mx: "auto" }}>
            {/* Header */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    9no AAD - Portafolio Profesional
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Materia de consolidación: curarás y presentarás tu trabajo con estándares de la industria. Construirás un portafolio coherente (PDF “mini libro” y versión web) que comunique proceso, resultados y propuesta profesional.
                </Typography>
            </Paper>

            <MateriaInfo
                objetivo="Desarrollar un portafolio profesional claro, consistente y orientado a objetivos, capaz de comunicar habilidades y proceso de trabajo con estándares de la industria."
                proposito="Que el alumno consolide su identidad profesional y aprenda a presentar su trabajo mediante curaduría, narrativa visual y documentación de procesos en formatos digitales."
                temas={[
                    "Objetivo del portafolio y público meta",
                    "Curaduría: selección y orden de proyectos",
                    "Narrativa de caso: problema → proceso → solución → resultado",
                    "Identidad personal: logotipo/wordmark, paleta y tipografías",
                    "Estructura base: portada, índice, about/statement, proyectos, contacto",
                    "Redacción profesional: títulos, captions, créditos y métricas",
                    "Mockups y presentación visual de piezas",
                    "Formato PDF interactivo vs. portafolio web",
                    "Buenas prácticas: accesibilidad, derechos de autor y referencias",
                    "Estrategia de actualización y publicación (Behance/ArtStation/Sitio web)",
                ]}
                software={[
                    "Adobe Illustrator",
                    "Adobe Photoshop (opcional)",
                    "Visual Studio Code (para versión web)",
                    "Microsoft Edge",
                ]}
                proyecto="Portafolio profesional en dos formatos: (A) PDF estilo ‘mini libro’ con índice, statement, 3–5 casos completos y contacto; y (B) demo web (HTML/CSS) con los mismos casos y guía visual consistente."
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
