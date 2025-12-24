// ContratoEvaluacion.jsx
import React from "react";
import { Paper, Typography } from "@mui/material";

/**
 * Componente de contrato reutilizable.
 *
 * Props:
 * - weights: array de { label: string, value: string }   // porcentajes (modifica "Gato %")
 * - partDates: array de string                           // fechas por parte (modifica "Gato fechas")
 * - projectCriteria: array de string                     // criterios de proyecto (modifica "Pueden ser más" / "Gato %")
 * - projectNotes: string                                 // notas del proyecto (modifica comentario "Gato puede ser uno o dos")
 */
export default function ContratoEvaluacion({
    weights,
    partDates,
    projectCriteria,
    projectNotes,
}) {
    // ======= Defaults (si no pasas props) =======
    const defaultWeights = [
        { label: "Tareas y Actividades", value: "30%" },
        { label: "Asistencias y Participaciones", value: "10%" },
        { label: "Examen", value: "20%" },
        { label: "Proyecto", value: "40%" },
    ];

    const defaultPartDates = [
        "Parte 1: Del 2 de septiembre al 11 de octubre. Exámenes del 14 al 22 de octubre.",
        "Parte 2: Del 23 de octubre al 29 de noviembre. Exámenes del 2 al 10 de diciembre.",
    ];

    const defaultProjectCriteria = [
        "Limpieza – 30%",
        "Calidad Visual – 40%",
        "Requisitos – 30%",
    ];

    const defaultProjectNotes =
        "Habrá dos proyectos, uno por cada parte del tetramestre. El segundo puede depender del primero. Se entregarán en las fechas de examen o en USB. No habrá prórrogas.";

    // Usar lo que venga en props o defaults
    const W = Array.isArray(weights) && weights.length ? weights : defaultWeights;
    const D = Array.isArray(partDates) && partDates.length ? partDates : defaultPartDates;
    const PC =
        Array.isArray(projectCriteria) && projectCriteria.length
            ? projectCriteria
            : defaultProjectCriteria;
    const PNotes = typeof projectNotes === "string" && projectNotes.length
        ? projectNotes
        : defaultProjectNotes;

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Normas, Beneficios y Ponderacion de la Materia
            </Typography>

            {/* 1. Estructura de la Calificación */}
            <details>
                <summary>
                    <Typography variant="p" sx={{ mt: 2 }}>
                        1. Estructura de la Calificación
                    </Typography>
                </summary>

                <hr />
                <Typography paragraph>
                    1.1 La calificación final se dividirá en dos partes, cada una con su propia ponderación.
                    Al final del tetramestre, ambas partes se sumarán y dividirán entre dos para obtener la calificación final.
                </Typography>
                <Typography paragraph>
                    1.2 Redondeo de la Calificación: Para redondear una calificación, se considerará redondear hacia arriba si el decimal es .6 o mayor.
                    Ejemplo: 8.6 → 9.0, 8.5 → 8.0
                </Typography>
                <Typography paragraph>1.3 Ponderación de cada parte:</Typography>
                <ul>
                    {W.map((w) => (
                        <li key={w.label}>
                            <Typography variant="h6" color="error">
                                {w.label}: <b>{w.value}</b>
                            </Typography>
                        </li>
                    ))}
                </ul>
                <Typography paragraph>1.4 Duración de las Partes:</Typography>
                {D.map((linea, i) => (
                    <Typography key={i} paragraph sx={{ mt: i === 0 ? 0 : 0 }}>
                        {linea}
                    </Typography>
                ))}
            </details>


            <details>
                <summary>
                    {/* 2. Asistencias y Faltas */}
                    <Typography variant="p" sx={{ mt: 3 }}>
                        2. Asistencias y Faltas
                    </Typography>
                </summary>

                <Typography paragraph>2.1 Límite de Faltas y Consecuencias:</Typography>
                <ul>
                    <li>Máximo 2 faltas por cada parte.</li>
                    <li>3 faltas: El Proyecto pasa a valer 35% como calificación máxima.</li>
                    <li>4 faltas: El Proyecto pasa a valer 30% como calificación máxima.</li>
                    <li>5 faltas: El Proyecto pasa a valer 25% como calificación máxima.</li>
                    <li>6 faltas: El Proyecto pasa a valer 30% como calificación máxima y se pierde el derecho a examen.</li>
                </ul>
                <Typography paragraph>
                    2.2 Política de Tardanza: en la primera hora, se considera falta si se llega con 20 minutos de retraso.
                    En la segunda o tercera hora, la tolerancia será de 5 minutos.
                </Typography>
                <Typography paragraph>
                    2.3 Falta de Material: la falta de material durante la clase se considera falta.
                    El alumno es responsable de traer su USB o laptop.
                </Typography>
                <Typography paragraph>
                    2.4 Justificación de Faltas: solo con receta médica. En caso de malestar por periodo, se perdonarán hasta 2 faltas al mes.
                </Typography>
                <Typography paragraph>
                    2.5 Horas Dobles: si la segunda hora es después del receso, no habrá tolerancia.
                    La falta contará como una sola en caso de no asistir.
                </Typography>
                <Typography paragraph>
                    2.6 Total de Faltas: las faltas son acumulativas para ambas partes, aunque se califiquen por separado.
                </Typography>
            </details>


            <details>
                <summary>
                    {/* 3. Beneficios y Recuperación */}
                    <Typography variant="p" sx={{ mt: 3 }}>
                        3. Beneficios y Recuperación
                    </Typography>
                </summary>


                <Typography paragraph>Beneficios:</Typography>
                <ul>
                    <li>Asistencia Perfecta: +5% en la calificación de la parte.</li>
                    <li>Participación Activa: hasta +5%.</li>
                    <li>Esfuerzo en Actividades/Tareas/Proyecto: hasta +10%.</li>
                </ul>
                <Typography paragraph>Recuperación o Puntos Extras:</Typography>
                <ul>
                    <li>Actividades de la Facultad: +5% a +15% según esfuerzo.</li>
                    <li>Trabajo Extra: se debe solicitar antes del período de exámenes.</li>
                </ul>
            </details>

            <details>
                <summary>
                    {/* 4. Normas de Conducta */}
                    <Typography variant="p" sx={{ mt: 3 }}>
                        4. Normas de Conducta y Uso del Aula
                    </Typography>
                </summary>


                <ul>
                    <li>No se puede comer en el aula. Solo bebidas con taparrosca.</li>
                    <li>Uso de música: mini bocina en aula de cómputo; audífonos en aula normal.</li>
                    <li>No se tolera lenguaje ofensivo. Si es constante, la calificación máxima será de 8.0.</li>
                    <li>Celular en silencio. Se pueden contestar llamadas. Uso constante afecta asistencia.</li>
                    <li>Se puede ir al baño una vez por hora avisando al profesor.</li>
                    <li>Se puede platicar durante actividades, no cuando el profesor explica.</li>
                </ul>
            </details>

            <details>
                <summary>
                    {/* 5. Tareas */}
                    <Typography variant="p" sx={{ mt: 3 }}>
                        5. Tareas y Actividades
                    </Typography>
                </summary>


                <ul>
                    <li>Las tareas solo serán aceptadas en la fecha establecida. No hay prórrogas.</li>
                    <li>Si el alumno falta, debe asegurarse de que la tarea llegue al profesor (compañero o WhatsApp).</li>
                    <li>Las tareas se califican solo como entregadas o no entregadas.</li>
                    <li>Dudas: se atienden de 2 p.m. a 5 p.m. Fuera de ese horario serán ignoradas.</li>
                    <li>El alumno debe confirmar que la tarea quedó marcada como entregada.</li>
                </ul>

            </details>

            <details>
                <summary>
                    {/* 6. El Examen */}
                    <Typography variant="p" sx={{ mt: 3 }}>
                        6. El Examen
                    </Typography>
                </summary>


                <ul>
                    <li>El horario lo establece la universidad.</li>
                    <li>Tolerancia: 10 min normal; 10:01 = máx. 90%; 20 min = máx. 60%; 30 min = no presentado.</li>
                    <li>La guía de examen vale el 10%.</li>
                    <li>No usar la camiseta de la universidad = examen máx. 70%.</li>
                    <li>Si hay trampa, se retira el examen y se califica lo contestado.</li>
                    <li>Tiempo máximo: 2 horas.</li>
                    <li>El primer alumno en detectar un error obtiene +10%.</li>
                    <li>No hay exención salvo actividad especial y se debe asistir el día del examen.</li>
                    <li>No se puede pedir material (lápiz, borrador) durante el examen.</li>
                    <li>Ausencia: debe resolverse con coordinación.</li>
                </ul>
            </details>

            <details>
                <summary>
                    {/* 7. El Proyecto */}
                    <Typography variant="p" sx={{ mt: 3 }}>
                        7. El Proyecto
                    </Typography>
                </summary>


                <Typography paragraph>7.1 Ponderación del Proyecto:</Typography>
                <ul>
                    {PC.map((c, i) => (
                        <li key={i}>
                            <Typography variant="p" color="error">{c}</Typography></li>
                    ))}
                </ul>
                <Typography color="error" paragraph>{PNotes}</Typography>
            </details>

            {/* 8. Datos extras */}
            {/* <Typography variant="p" sx={{ mt: 3 }}>
        8. Datos Extras
      </Typography>
      <ul>
        <li>Contacto directo: contacto.abdielaldana.com</li>
        <li>Correo: adolforamirezupg@gmail.com</li>
        <li>WhatsApp: 8129072892</li>
        <li>Discord: https://discord.gg/HuajYEAZXD</li>
        <li>Avisos: por grupo de WhatsApp creado por los alumnos.</li>
      </ul> */}
        </Paper>
    );
}
