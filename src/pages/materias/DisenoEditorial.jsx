import { Box, Typography, Divider, Paper } from "@mui/material";
import ContratoEvaluacion from "../../components/ContratoEvaluacion";
import MateriaInfo from "../../components/MateriaInfo";

export default function DisenoEditorial() {
    const weights = [
        { label: "Tareas y Actividades", value: "30%" },
        { label: "Asistencias y Participaciones", value: "10%" },
        { label: "Examen", value: "20%" },
        { label: "Proyecto", value: "40%" },
    ];

    const partDates = [
        "Parte 1: Del 3 de septiembre al 10 de octubre. Exámenes del 13 al 21 de octubre.",
        "Parte 2: Del 22 de octubre al 28 de noviembre. Exámenes del 1 al 9 de diciembre.",
    ];

    const projectCriteria = [
        "Limpieza – 20%",
        "Jerarquía y composición – 35%",
        "Legibilidad y accesibilidad – 25%",
        "Requisitos – 20%",
    ];

    const projectNotes =
        "Un proyecto por parte. El segundo depende del primero. No hay prórrogas.";

    return (
        <Box sx={{ mx: "auto" }}>            
            {/* Header */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    7mo AAD - Diseño Editorial de Formatos Digitales
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Desarrollarás publicaciones digitales e interactivas aplicando retículas, tipografía y accesibilidad. Crearás piezas editoriales (revista, cómic, blog/foro) listas para PDF interactivo o demo web.
                </Typography>
            </Paper>

            <MateriaInfo
                objetivo="Realizar medios editoriales de comunicación en formato digital e interactivo, aplicando criterios de interfaz de usuario para medios digitales y electrónicos conforme a prácticas de la industria."
                proposito="Entender la disposición y composición de los elementos editoriales para crear productos legibles, accesibles y visualmente coherentes en soportes digitales."
                temas={[
                    "Fundamentos editoriales: retícula, márgenes, columnas y ritmo visual",
                    "Tipografía para pantalla: legibilidad, jerarquía y estilos",
                    "Sistemas de componentes editoriales (portadas, índices, artículos, créditos)",
                    "Exportación y formatos: PDF interactivo, EPUB básico, publicaciones web",
                    "UI para editorial digital: navegación, enlaces, botones, microinteracciones",
                    "Accesibilidad editorial (alt text, orden de lectura, contraste)",
                    "Flujo de trabajo: organización de assets y control de versiones",
                    "Presentación y empaquetado de piezas editoriales",
                ]}
                software={[
                    "Adobe Illustrator",
                    "Microsoft Word",
                    "Krita (opcional)",
                ]}
                actividades="Creación de elementos editoriales: portadas de revistas, cómics, libros ilustrados, blogs web y foros web."
                proyecto="Dossier editorial digital: elige y desarrolla una de las opciones (revista digital, cómic corto o blog/foro prototipado) entregado como PDF interactivo o demo web (HTML/CSS)."
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
