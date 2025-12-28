import React from "react";
import { Divider, Grid,  Typography, } from "@mui/material";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';


import { NavLink } from "react-router";

// import { GiBookmark } from "react-icons/gi";

import biblioImg from '../img/biblioteca.png'
import foroImg from '../img/foro.png'
import gremioImg from '../img/gremio.png'
import normasImg from '../img/normas.png'

// import { Carousel } from 'nuka-carousel';

// import AuroraZombie from "../img/AuroraZombie.jpg"
// import Aurora29 from "../img/Aurora No 29 Septiembre 2025.jpg"
// import Aurora33 from "../img/Aurora No 33 Octubre 2025.jpg"
// import Aurora30 from "../img/Aurora No 30 Octubre 2025.jpg"
// import Aurora32 from "../img/Aurora No 32 Octubre 2025.jpg"



export default function Inicio() {
    return (
        <div>
            <Grid container spacing={2}>

                <Grid size={{ xs: 12, md: 12 }}>
                    <Typography textAlign={"center"} variant="h4">Aprender también puede ser una experiencia</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                    <Typography variant="body1">
                        Un entorno diseñado para apoyar a los alumnos con herramientas reales: una biblioteca práctica, beneficios por participación y un foro seguro donde todas las voces pueden expresarse.
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                    <Divider />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <NavLink to="/tablon_de_misiones" >
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={gremioImg}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Gremio
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        El núcleo interactivo del sitio. <br />
                                        Completa misiones, gana puntos, sube de nivel y personaliza tu perfil mientras participas activamente en la comunidad.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <NavLink to="/biblioteca" >
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={biblioImg}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Biblioteca
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Un espacio de consulta con recursos seleccionados sobre programación, diseño y temas creativos.
                                        Aquí encuentras material directo, práctico y útil para aprender a tu ritmo.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <NavLink to="/chismes" >
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={foroImg}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Foro Anonimo
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Un lugar para opinar, preguntar y compartir experiencias sin filtros ni etiquetas.
                                        Participa libremente en conversaciones reales, sin juicios y sin nombres.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <NavLink to="/informacion" >
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={normasImg}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Informacion
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Un espacio con acuerdos claros sobre evaluación, convivencia y funcionamiento del curso, 
                                        pensados para que todos sepamos cómo se trabaja aquí.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Grid>


            </Grid>
            {/* <Carousel autoplay showDots showArrows wrapMode="wrap">

                <div className="slide bg-green-500"><img src={Aurora33} /></div>
                <div className="slide bg-green-500"><img src={Aurora32} /></div>

            </Carousel> */}

            {/* <Grid container spacing={2}> */}
            {/* <Paper sx={{ padding: 2, margin: "10px 0" }}>
                    <Typography variant="h5" gutterBottom>
                        Avisos!!!
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Se ha habilitado la nueva sección de Chismes, un espacio anónimo para que los usuarios puedan compartir historias, comentarios y publicaciones de manera libre y segura.
                        Te invitamos a explorarla, participar y contribuir con nuevos chismes dentro de la plataforma.
                    </Typography>
                </Paper> */}

            {/* <Grid item size={{ xs: 12, md: 12 }}> */}
            {/* <Paper sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Pagina chida para mis alumnos y asi :3
                    </Typography>
                </Paper> */}

            {/* </Grid> */}
            {/* Columna izquierda */}
            {/* <Grid size={{ xs: 12, md: 12 }}
                    sx={{
                        position: { xs: "static", md: "sticky" },
                        top: { md: "100px" },
                        alignSelf: "flex-start", // Para que el sticky funcione bien
                    }}
                >
                    <Paper sx={{ padding: 2, margin: "10px 0" }}>
                        <Typography variant="h5" gutterBottom>
                            Bienvenida
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Este sitio web ha sido diseñado como una herramienta integral para apoyar el aprendizaje y la gestión académica. Aquí encontrarás recursos, proyectos y materiales que complementan las materias vistas en clase, además de espacios de consulta y referencia para reforzar los temas.
                        </Typography>
                        <br />
                        <Typography variant="body1" color="text.secondary">
                            El objetivo es ofrecer un espacio digital accesible, organizado y en constante actualización, donde estudiantes puedan interactuar con contenidos, consultar guías y dar seguimiento a los proyectos realizados durante el curso.
                        </Typography>
                        <br />
                        <Typography variant="body1" color="text.secondary">
                            En este portal tendrás la oportunidad de explorar documentos, presentaciones y herramientas de software utilizadas en las materias, así como conocer los objetivos y propósitos de cada una. Todo esto con la intención de facilitar tu proceso de aprendizaje y brindarte una visión clara de lo que se espera en cada etapa académica.
                        </Typography>
                    </Paper> */}
            {/* <Paper sx={{ padding: 2, margin: "10px 0" }}>
                        <Typography variant="h5" gutterBottom>
                            Avisos
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Aqui iria un Aviso si tuviera uno, pero como no tengo, lloro.
                        </Typography>
                        <hr />                    
                    </Paper> */}
            {/* <Paper sx={{ padding: 2, margin: "10px 0" }}>
                        <Typography variant="h5" gutterBottom>
                            Proximas Actualizaciones
                        </Typography>
                        <ul>
                            <li>Integración de más recursos digitales para las materias.</li>
                            <li>Mejor organización de la biblioteca con filtros y categorías.</li>
                            <li>Sección de noticias y avisos actualizada en tiempo real.</li>
                            <li>Material complementario en formato de video y presentaciones interactivas.</li>
                            <li>Espacio para proyectos destacados de los estudiantes.</li>
                        </ul>
                        <hr />
                        <Typography variant="h6" gutterBottom>
                            ¿Tienes una idea para mejorar este sitio?
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Tu opinión es muy valiosa para seguir construyendo un espacio útil para todos.
                            Puedes enviar tus comentarios y sugerencias al correo: adolforamirezupg@gmail.com
                            .
                        </Typography>
                    </Paper>
                    <Paper sx={{ padding: 2, margin: "10px 0" }}>
                        <Typography variant="h5" gutterBottom>
                            Aviso del Contenido
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Todo el contenido disponible en este sitio tiene un propósito exclusivamente académico. Su función es servir como apoyo en el proceso de enseñanza-aprendizaje, sin fines de lucro ni intención comercial. El material mostrado corresponde a ejercicios, prácticas y ejemplos desarrollados en el ámbito educativo.
                        </Typography>
                    </Paper>

                </Grid> */}

            {/* Columna derecha */}
            {/* <Grid size={{ xs: 12, md: 6 }}
                    sx={{
                        position: { xs: "static", md: "sticky" },
                        top: { md: "100px" },
                        alignSelf: "flex-start", // Para que el sticky funcione bien
                    }}
                > */}

            {/* <Paper sx={{ p: 2, my: 1 }} className="border-3aad">
                    <Typography variant="h6" gutterBottom>
                        3ro AAD - Programación Web
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button component={Link} to="/materias/programacion-web" variant="outlined" size="small">
                            Ver más
                        </Button>
                    </Box>
                </Paper>

                <Paper sx={{ p: 2, my: 1 }} className="border-3aad">
                    <Typography variant="h6" gutterBottom>
                        3ro AAD - Técnicas de Animación
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button component={Link} to="/materias/tecnicas-animacion" variant="outlined" size="small">
                            Ver más
                        </Button>
                    </Box>
                </Paper>

                <Paper sx={{ p: 2, my: 1 }} className="border-4aad">
                    <Typography variant="h6" gutterBottom>
                        4to AAD - Diseño de Apps
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button component={Link} to="/materias/diseno-apps" variant="outlined" size="small">
                            Ver más
                        </Button>
                    </Box>
                </Paper>

                <Paper sx={{ p: 2, my: 1 }} className="border-6aad">
                    <Typography variant="h6" gutterBottom>
                        6to AAD - Mercadotecnia
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button component={Link} to="/materias/mercadotecnia" variant="outlined" size="small">
                            Ver más
                        </Button>
                    </Box>
                </Paper>

                <Paper sx={{ p: 2, my: 1 }} className="border-7aad">
                    <Typography variant="h6" gutterBottom>
                        7to AAD - Diseño Editorial
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button component={Link} to="/materias/diseno-editorial" variant="outlined" size="small">
                            Ver más
                        </Button>
                    </Box>
                </Paper>

                <Paper sx={{ p: 2, my: 1 }} className="border-7dgp">
                    <Typography variant="h6" gutterBottom>
                        7to DGP - Animación y Flash
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button component={Link} to="/materias/animacion-flash" variant="outlined" size="small">
                            Ver más
                        </Button>
                    </Box>
                </Paper>

                <Paper sx={{ p: 2, my: 1 }} className="border-8aad">
                    <Typography variant="h6" gutterBottom>
                        8vo AAD - Diseño Multimedia
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button component={Link} to="/materias/diseno-multimedia" variant="outlined" size="small">
                            Ver más
                        </Button>
                    </Box>
                </Paper>

                <Paper sx={{ p: 2, my: 1 }} className="border-9aad">
                    <Typography variant="h6" gutterBottom>
                        9no AAD - Portafolio Profesional
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button component={Link} to="/materias/portafolio-profesional" variant="outlined" size="small">
                            Ver más
                        </Button>
                    </Box>
                </Paper> */}

            {/* </Grid>
            </Grid> */}
        </div>
    );
}
