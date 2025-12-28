import { Divider, Grid,  Typography, } from "@mui/material";


import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Normas() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange =
        (panel) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12 }}>
                <Typography variant="h4" textAlign={"center"}>
                    Informacion
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }} >
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                            Introduccion
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Este espacio funciona con reglas claras.
                        </Typography>
                        <Typography>
                            No son castigos: son acuerdos para trabajar mejor, avanzar parejo y evitar confusiones.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                            Evaluación
                        </Typography>
                        <Typography component="span" sx={{ color: 'text.secondary' }}>
                            ¿Cómo se me evalúa?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            El curso se evalúa mediante tres evaluaciones.
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">
                            Primera Evaluación – Primera mitad del curso
                        </Typography>
                        <Typography variant="subtittle1" fontWeight={"bold"}>
                            Se evalúa:
                        </Typography>
                        <ul>
                            <li><b>60%</b> Tareas y actividades</li>
                            <li><b>10%</b> Asistencias y responsabilidades</li>
                            <li><b>30% </b> Examen parcial</li>
                        </ul>
                        <Typography>
                            Evalúa la constancia y el proceso inicial.
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">
                            Segunda Evaluación – Segunda mitad del curso
                        </Typography>
                        <Typography variant="subtittle1" fontWeight={"bold"}>
                            Se evalúa:
                        </Typography>
                        <ul>
                            <li><b>60%</b> Tareas y actividades</li>
                            <li><b>10%</b> Asistencias y responsabilidades</li>
                            <li><b>30% </b> Examen parcial</li>
                        </ul>
                        <Typography>
                            Evalúa la continuidad y el cierre del curso.
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">
                            Tercera Evaluación – Proyecto Final (si aplica)
                        </Typography>
                        <ul>
                            <li>La aplicación práctica de lo aprendido.</li>
                            <li>Puede ser un proyecto web o digital, según la materia.</li>
                            <li>Es independiente de las dos evaluaciones anteriores.</li>
                        </ul>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">
                            Calificación Final
                        </Typography>
                        <ul>
                            <li>Con proyecto: promedio de tres evaluaciones</li>
                            <li>Sin proyecto: promedio de primera y segunda evaluación</li>
                        </ul>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">
                            Redondeo
                        </Typography>
                        <ul>
                            <li>.6 o mayor → sube</li>
                            <li>.5 o menor → baja</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                            F.A.R.T.
                        </Typography>
                        <Typography component="span" sx={{ color: 'text.secondary' }}>
                            Faltas, Asistencias, Responsabilidad y Tardanzas
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h6">
                            ¿Qué pasa si falto o llego tarde?
                        </Typography>
                        <Typography variant="body1">
                            Límite: 2 faltas durante el tetramestre
                        </Typography>
                        <Typography variant="body1">
                            Las faltas son acumulativas en todo el curso
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">
                            Consecuencias por faltas
                        </Typography>
                        <Typography variant="body1">
                            Las faltas reducen la calificación máxima del proyecto final:
                        </Typography>
                        <ul>
                            <li>3 Faltas - Valor Máximo 90%</li>
                            <li>5 Faltas - Valor Máximo 85%</li>
                            <li>7 Faltas - Valor Máximo 75%</li>
                            <li>8 Faltas - Valor Máximo 60%</li>
                            <li>>10 Faltas - Proyecto Invalido</li>

                        </ul>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">
                            Tardanzas
                        </Typography>
                        <Typography>
                            ¿Cuándo cuenta como falta?
                        </Typography>
                        <ul>
                            <li>Primera hora: <br /> 20 minutos = falta</li>
                            <li>Segunda o tercera hora: <br /> 5 minutos de tolerancia</li>
                            <li>Horas dobles:</li>
                            <ul><li>Falta = 1 falta</li></ul>
                            <li>Horas triples:</li>
                            <ul><li>Falta = 2 falta</li></ul>
                        </ul>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">
                            Material y Preparación
                        </Typography>
                        <Typography>
                            ¿Qué debo traer a clase?
                        </Typography>
                        <Typography>
                            Es deber del Estudiante contar con el material solicitado para la clase del día.
                        </Typography>
                        <ul>
                            <li>No traer laptop o USB <b>cuenta como falta</b></li>
                            <li>No se permite usar material de compañeros</li>
                        </ul>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">
                            Justificación de Faltas
                        </Typography>
                        <Typography>
                            ¿Puedo justificar una falta?
                        </Typography>
                        <ul>
                            <li>Con receta médica.</li>
                            <li>Carta Membretada de situacion laboral</li>
                            <li>Por malestares del periodo: <br />Máximo 2 faltas justificadas por mes</li>
                        </ul>
                        <Typography>
                            No habra indulgencias aparte de estos tres puntos.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                            Comportamiento
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h6">
                            ¿Cómo se trabaja en clase?
                        </Typography>
                        <ul>
                            <li>❌ No comer en clase</li>
                            <li>✅ Bebidas solo con tapa</li>
                            <li>🎧 Música solo con audífonos <br />
                                (bocina pequeña solo en laboratorio)</li>
                            <li>📵 Celular en silencio</li>
                            <ul><li>Uso constante puede afectar la asistencia</li></ul>
                            <li>🗣️ No se tolera lenguaje ofensivo ni bullying</li>
                            <ul><li>Si es recurrente, calificación máxima: 8.0</li></ul>
                            <li>🚻 Baño: una vez por hora avisando</li>
                        </ul>
                        <Typography>En caso de no cumplir uno de estos puntos se aplicara falta.</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography component="span" sx={{ flexShrink: 0 }}>
                            Tareas y Actividades
                        </Typography>
                        {/* <Typography component="span" sx={{ color: 'text.secondary' }}>
                            Si no hay tabla.
                        </Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h6">
                            ¿Cómo y cuándo se entregan?
                        </Typography>
                        <ul>
                            <li>Se entregan solo en la fecha indicada</li>
                            <li>No hay prórrogas ni excusas</li>
                            <li>Calificación:</li>
                            <ul>
                                <li>Entregada</li>
                                <li>No Entregada</li>
                            </ul>
                            <li>📵 Celular en silencio</li>
                            <ul><li>Uso constante puede afectar la asistencia</li></ul>
                            <li>🗣️ No se tolera lenguaje ofensivo ni bullying</li>
                            <ul><li>Si es recurrente, calificación máxima: 8.0</li></ul>
                            <li>🚻 Baño: una vez por hora avisando</li>
                        </ul>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">
                            Responsabilidad
                        </Typography>
                        <Typography>Si faltas el día de entrega, es tu responsabilidad hacer llegar la tarea</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">
                            Dudas fuera del Aula
                        </Typography>
                        <Typography>Atención de 2:00 p.m. a 5:00 p.m.</Typography>
                        <Typography>Fuera de ese horario, no se atienden mensajes</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                            Exámenes
                        </Typography>
                        {/* <Typography component="span" sx={{ color: 'text.secondary' }}>
                            Si no hay tabla.
                        </Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h6">
                            ¿Qué reglas aplican en los exámenes?
                        </Typography>
                        <ul>
                            <li>Puntualidad máxima: 10 minutos</li>
                            <li>Retrasos:</li>
                            <ul>
                                <li>+10 min → máx. 90%</li>
                                <li>+20 min → máx. 60%</li>
                                <li>+30 min → no presentado</li>
                            </ul>
                            <li>Sin camiseta institucional: máx. 70%</li>
                            <li>Copiar → examen retirado</li>
                            <li>Tiempo máximo: 2 horas</li>
                            <li>No pedir material a otros alumnos</li>
                            <ul><li>No presenta si no trae su material</li></ul>
                        </ul>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">
                            ¿Puedo cambiar mi fecha de examen?
                        </Typography>
                        <Typography>Solo si cordinacion lo permite y si se puede aplicar el examen dias antes de la fecha asignada</Typography>

                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography component="span" sx={{ flexShrink: 0 }}>
                            Proyecto Final
                        </Typography>
                        {/* <Typography component="span" sx={{ color: 'text.secondary' }}>
                            Si no hay tabla.
                        </Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h6">
                            ¿Cómo se evalúa el proyecto?
                        </Typography>
                        <Typography variant="subtitle1">
                            Criterios
                        </Typography>
                        <ul>
                            <li>40% Limpieza y organización</li>
                            <li>30% Calidad visual</li>
                            <li>30% Requisitos Solicitados</li>
                        </ul>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">
                            Condiciones
                        </Typography>
                        <ul>
                            <li>Peso máximo: 20 MB</li>
                            <li>Nombre y matrícula visibles</li>
                            <li>Sin plagio</li>
                            <li>Entrega en fecha oficial</li>
                            <li>No hay prórrogas</li>
                        </ul>

                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                            Gremio
                        </Typography>
                        <Typography component="span" sx={{ color: 'text.secondary' }}>
                            Recompensas y Beneficios
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h6">
                            ¿Qué es el Gremio?
                        </Typography>

                        <Typography>
                            El Gremio es un sistema que reconoce tu participación, constancia y compromiso
                            dentro del curso, más allá de la calificación tradicional.
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">
                            ¿Cómo se obtienen puntos?
                        </Typography>

                        <Typography sx={{ mt: 1 }}>
                            Completando misiones en la parte de Gremio.
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            Cada mision cuenta con un Codigo Unico, este se te dará por el profesor al cumplir la mision presencialmente.
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">
                            ¿Para qué sirven los puntos?
                        </Typography>

                        <ul>
                            <li>Obtener beneficios dentro del curso</li>
                            <li>Subir de nivel dentro del Gremio</li>
                            <li>Desbloquear recompensas</li>
                            <li>Personalizar y destacar tu perfil</li>
                        </ul>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">
                            ¿Qué son las recompensas?
                        </Typography>

                        <ul>
                            <li>Beneficios académicos específicos</li>
                            <ul>
                                <li>Perdonar Faltas</li>
                                <li>Puntos Extras en Examenes</li>
                                <li>entre otros.</li>
                            </ul>
                            <li>Ventajas temporales según el nivel alcanzado</li>
                            <li>Elementos estéticos o distintivos</li>
                        </ul>

                        <Typography sx={{ mt: 1 }}>
                            Las recompensas disponibles pueden cambiar durante el curso.
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">
                            ¿Afecta mis calificaciones?
                        </Typography>

                        <Typography>
                            No. El sistema de Gremio no sustituye las evaluaciones oficiales. <br /><br />
                            Funciona como un complemento que reconoce el esfuerzo y la participación. <br /><br />
                            Solo es un Beneficio por si ocupan ayuda o quieren aumentar su calificación final. <br />
                        </Typography>

                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography component="span" sx={{ flexShrink: 0 }}>
                            Foro Anonimo
                        </Typography>
                        {/* <Typography component="span" sx={{ color: 'text.secondary' }}>
                            Si no hay tabla.
                        </Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h6">
                            ¿Qué es el Foro Anónimo?
                        </Typography>

                        <Typography>
                            El Foro Anónimo es un espacio seguro donde puedes opinar, preguntar y compartir
                            experiencias sin mostrar tu identidad.
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">
                            ¿Para qué sirve?
                        </Typography>

                        <ul>
                            <li>Expresar opiniones de forma libre y responsable</li>
                            <li>Compartir experiencias relacionadas con el curso</li>
                            <li>Plantear dudas o inquietudes sin presión</li>
                            <li>Leer y aprender de la experiencia de otros</li>
                        </ul>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">
                            ¿Qué significa que sea anónimo?
                        </Typography>

                        <ul>
                            <li>No se muestra tu nombre ni matrícula</li>
                            <li>Tu identidad no es visible para otros usuarios</li>
                            <li>Las publicaciones no afectan tus calificaciones</li>
                        </ul>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">
                            Reglas del Foro
                        </Typography>

                        <ul>
                            <li>Respeto obligatorio entre usuarios</li>
                            <li>No lenguaje ofensivo, bullying o ataques personales</li>
                            <li>No revelar datos personales propios ni de terceros</li>
                            <li>No spam ni contenido fuera de contexto</li>
                        </ul>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">
                            ¿Hay consecuencias?
                        </Typography>

                        <Typography>
                            El anonimato no significa ausencia de reglas. Las publicaciones que incumplan
                            las normas pueden ser eliminadas y el acceso al foro puede ser limitado.
                        </Typography>

                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography component="span" sx={{ flexShrink: 0 }}>
                            Biblioteca
                        </Typography>
                        {/* <Typography component="span" sx={{ color: 'text.secondary' }}>
                            Si no hay tabla.
                        </Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h6">
                            ¿Qué es la Biblioteca?
                        </Typography>

                        <Typography>
                            La Biblioteca es un espacio de consulta con recursos diseñados para apoyar
                            el aprendizaje durante el curso y reforzar los temas vistos en clase.
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">
                            ¿Qué tipo de contenido encuentro?
                        </Typography>

                        <ul>
                            <li>Material de apoyo sobre programación, diseño y temas relacionados</li>
                            <li>Guías, apuntes y referencias prácticas</li>
                            <li>Recursos complementarios para profundizar o repasar</li>
                        </ul>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">
                            ¿Para qué sirve la Biblioteca?
                        </Typography>

                        <ul>
                            <li>Consultar información de forma rápida y clara</li>
                            <li>Reforzar conocimientos vistos en clase</li>
                            <li>Aprender a tu propio ritmo</li>
                            <li>Tener referencias confiables en un solo lugar</li>
                        </ul>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">
                            ¿Reemplaza la clase?
                        </Typography>

                        <Typography>
                            No. La Biblioteca es un complemento de la clase.
                            Su función es apoyar el aprendizaje, no sustituir la explicación del aula.
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">
                            Uso responsable
                        </Typography>

                        <ul>
                            <li>El material es de uso académico</li>
                            <li>No se permite el uso indebido o fuera de contexto</li>
                            <li>El contenido puede actualizarse durante el curso</li>
                        </ul>

                    </AccordionDetails>
                </Accordion>
            </Grid>
            
        </Grid>
    )
}

export default Normas