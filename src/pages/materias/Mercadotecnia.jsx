import { Box, Typography, Divider, Paper } from "@mui/material";
import ContratoEvaluacion from "../../components/ContratoEvaluacion";
import MateriaInfo from "../../components/MateriaInfo";

export default function Mercadotecnia() {
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
        "Claridad de ideas – 30%",
        "Aplicación de principios de mercadotecnia – 30%",
        "Requisitos – 20%",
    ];

    const projectNotes =
        "Un proyecto por parte. El segundo depende del primero. No hay prórrogas.";

    return (
        <Box sx={{ mx: 'auto' }}>
            {/* Header */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    6to AAD - Mercadotecnia
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Introducción práctica a los principios de la mercadotecnia para convertir ideas en propuestas de valor. Realizarás un ensayo por cada presentación y cerrarás con una propuesta de inversión.
                </Typography>
            </Paper>

            <MateriaInfo
                objetivo="Que el alumno entienda el concepto general de la mercadotecnia y sus principios básicos."
                proposito="Comprender el proceso necesario para elaborar desde cero un producto o servicio utilizando las bases de la mercadotecnia."
                temas={[
                    "Concepto y evolución de la mercadotecnia",
                    "Los 4P: producto, precio, plaza y promoción",
                    "Segmentación de mercado y análisis de consumidores",
                    "Diseño de propuestas de valor",
                    "Creación de estrategias de comunicación y publicidad",
                    "Planeación y ciclo de vida de productos y servicios",
                    "Uso de herramientas digitales para la mercadotecnia",
                    "Presentación de propuestas de inversión",
                ]}
                software={[
                    "Adobe Illustrator",
                    "Microsoft Word",
                ]}
                proyecto="Ensayo de propuesta de inversión para el producto o servicio seleccionado por el alumno."
                actividades="Un ensayo por cada presentación vista en clase, donde se refleje la creación o análisis de un producto o servicio."
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
