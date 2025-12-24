import React from "react";
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Chip,
    Stack,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import BrushIcon from "@mui/icons-material/Brush";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

// ====== DATA MODEL (edítalo libremente) ======
const cvData = {
    header: {
        nombre: "Adolfo Abdiel Ramírez Aldana",
        titulo: "Diseñador Gráfico · Desarrollador Web · Profesor Universitario",
        ubicacion: "Guadalupe, Nuevo León, México",
        telefono: "+52 8129072892",
        email: "abdielaldanadg@gmail.com",
        web: "https://abdielaldana.com",
    },
    perfil: [
        "Soy un profesional multidisciplinario que integra el diseño, la programación y la docencia. Me apasiona desarrollar proyectos que combinan la creatividad visual con la lógica del código, siempre con un enfoque práctico, analítico y autodidacta.",
        "Disfruto crear plataformas que faciliten la enseñanza, sistemas que optimicen procesos y universos narrativos que mezclen arte, técnica y filosofía. Mi trabajo se basa en la exploración constante, la mejora continua y el deseo de dejar huella a través del conocimiento.",
    ],
    experiencia: [
        {
            empresa: "Universidad Pedro de Gante (UPG)",
            rol: "Profesor Universitario",
            periodo: "2022 - Actualidad",
            puntos: [
                "Imparto Programación en Ambiente Web, Animación Digital, Diseño Multimedia y Portafolio Profesional.",
                "Desarrollo plataformas educativas: biblioteca digital, sistema de evaluación y generador de exámenes.",
                "Autor del Contrato Estudiantil con reglas y ponderaciones claras.",
            ],
        },
        {
            empresa: "Cotizador A House Interior",
            rol: "Desarrollador Full-Stack / Project Manager",
            periodo: "Actualidad",
            puntos: [
                "Plataforma: cotizador.ahouseinterior.com (React + Material-UI + PHP + MySQL).",
                "Cálculos de materiales, PDFs automáticos y arquitectura segura con Crypto-JS.",
                "Diseño de la lógica de negocio, backend y UI.",
            ],
        },
        {
            empresa: "Envía.com",
            rol: "Programador Frontend",
            periodo: "2020 - 2022",
            puntos: [
                "Desarrollo de plataforma de gestión de almacenes (warehouse) para e-commerce.",
                "Trabajo en equipo con ReactJS y Git bajo metodologías ágiles.",
            ],
        },
        {
            empresa: "EDEC",
            rol: "Profesor de Adobe Illustrator",
            periodo: "2019",
            puntos: [
                "Cursos prácticos de diseño vectorial, ilustración publicitaria e identidad visual.",
            ],
        },
        {
            empresa: "Movit",
            rol: "Diseñador de Plataformas / Diseñador General / Técnico General",
            periodo: "2017 - 2020",
            puntos: [
                "Diseño de plataformas internas e identidad visual corporativa.",
                "Soporte técnico y visual para proyectos digitales.",
            ],
        },
        {
            empresa: "IMOL",
            rol: "Diseñador General",
            periodo: "2017",
            puntos: [
                "Diseño publicitario e institucional.",
                "Relación con proveedores: El Norte y Multimedios TV para difusión de campañas.",
            ],
        },
        {
            empresa: "Facultad de Ingeniería Civil – UANL",
            rol: "Diseñador General y Capacitador",
            periodo: "2015 - 2017",
            puntos: [
                "Diseño para eventos institucionales y publicaciones de la facultad.",
                "Cursos prácticos de Adobe Photoshop: edición, composición y retoque.",
            ],
        },
        {
            empresa: "MAVA Imprenta",
            rol: "Diseñador General",
            periodo: "2014",
            puntos: [
                "Diseño editorial/publicitario para impresión, preparación de archivos y control de color.",
            ],
        },
    ],
    formacion: [
        "Licenciatura en Diseño Gráfico – Facultad de Artes Visuales, UANL (Terminada)",
        "Seminario en Marketing Digital – Facultad de Ingeniería Civil, UANL",
        "Formación autodidacta continua en ReactJS, PHP, MySQL, Blender 3D, Krita y Diseño Editorial",
    ],
    habilidades: {
        desarrollo: [
            "ReactJS",
            "Angular",
            "HTML",
            "CSS/SCSS",
            "JavaScript",
            "jQuery",
            "Bootstrap",
            "Foundation",
            "Material-UI",
            "PHP",
            "SQL",
            "FTP",
            "Git/GitHub/GitLab",
            "Scrum",
            "PDF/Excel/Word automation",
            "REST APIs",
            "Crypto-JS",
        ],
        diseno: [
            "Photoshop",
            "Illustrator",
            "CorelDRAW",
            "Krita",
            "After Effects",
            "Premiere Pro",
            "Blender (conceptual/ambientación)",
            "UI/UX",
            "Fotografía Digital",
        ],
        marketing: [
            "Community Management",
            "Social Media",
            "Facebook Ads",
            "Google Ads",
            "Google Analytics",
        ],
        blandas: [
            "Docencia y mentoría",
            "Comunicación clara",
            "Atención al cliente",
            "Gestión de proyectos",
        ],
    },
    filosofia: [
        "“Todo es posible si uno tiene voluntad. Los límites los pone uno mismo.”",
        "No me mortifico por lo que está fuera de mis habilidades y busco aprender algo nuevo cada día, guiado por la curiosidad y la experimentación.",
    ],
};

// ====== SUBCOMPONENTES ======
function SectionTitle({ icon, children }) {
    return (
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
            {icon}
            <Typography variant="h5" fontWeight={700}>
                {children}
            </Typography>
        </Stack>
    );
}

function BulletList({ items }) {
    return (
        <List dense disablePadding>
            {items.map((t, i) => (
                <ListItem key={i} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                        <LightbulbIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={t} />
                </ListItem>
            ))}
        </List>
    );
}

function SkillChips({ title, skills, icon }) {
    return (
        <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                {icon}
                <Typography variant="subtitle1" fontWeight={700}>
                    {title}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {skills.map((s) => (
                    <Chip key={s} label={s} size="small" color="primary"/>
                ))}
            </Stack>
        </Paper>
    );
}

// ====== COMPONENTE PRINCIPAL ======
export default function Acerca() {
    const { header, perfil, experiencia, formacion, habilidades, filosofia } =
        cvData;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, md: 3 },
                    mb: 3,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0) 100%)",
                }}
            >
                <Typography variant="h4" fontWeight={800} gutterBottom>
                    {header.nombre}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {header.titulo}
                </Typography>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    sx={{ mt: 2 }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                >
                    <Chip icon={<PublicIcon />} label={header.ubicacion} />
                    <Chip icon={<PhoneIphoneIcon />} label={header.telefono} />
                    <Chip
                        icon={<EmailIcon />}
                        component="a"
                        clickable
                        href={`mailto:${header.email}`}
                        label={header.email}
                    />
                    {/* <Chip
                        icon={<LanguageIcon />}
                        component="a"
                        clickable
                        href={header.web}
                        target="_blank"
                        rel="noopener noreferrer"
                        label={header.web.replace("https://", "")}
                    /> */}
                </Stack>
            </Paper>


            <Grid container spacing={3}>
                 {/* Perfil */}
                <Grid item size={{ xs: 12, md: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: 4 }}>
                        <SectionTitle icon={<BrushIcon color="primary" />}>
                            Sobre mí
                        </SectionTitle>
                        {perfil.map((p, i) => (
                            <Typography key={i} paragraph>
                                {p}
                            </Typography>
                        ))}
                    </Paper>
                </Grid>
                {/* Experiencia */}
                <Grid item size={{ xs: 12, md: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: 4 }}>
                        <SectionTitle icon={<WorkIcon color="primary" />}>
                            Experiencia Profesional
                        </SectionTitle>
                        <Divider sx={{ mb: 2 }} />
                        <Stack spacing={3}>
                            {experiencia.map((exp, idx) => (
                                <Box key={`${exp.empresa}-${idx}`}>
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        justifyContent="space-between"
                                        alignItems={{ xs: "flex-start", sm: "center" }}
                                        spacing={0.5}
                                    >
                                        <Typography variant="h6" fontWeight={700}>
                                            {exp.empresa}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            color="text.secondary"
                                            sx={{ whiteSpace: "nowrap" }}
                                        >
                                            {exp.periodo}
                                        </Typography>
                                    </Stack>
                                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                        {exp.rol}
                                    </Typography>
                                    <BulletList items={exp.puntos} />
                                </Box>
                            ))}
                        </Stack>
                    </Paper>
                </Grid>
               

                {/* Habilidades destacadas (chips) */}
                <Grid item size={{ xs: 12, md: 6 }} >
                    <Stack spacing={2} sx={{ height: "100%" }}>
                        <SkillChips
                            title="Desarrollo Web y Programación"
                            skills={habilidades.desarrollo}
                            icon={<CodeIcon color="primary" />}
                        />                        
                    </Stack>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }} >
                    <Stack spacing={2} sx={{ height: "100%" }}>                        
                        <SkillChips
                            title="Diseño, Animación y Producción"
                            skills={habilidades.diseno}
                            icon={<BrushIcon color="primary" />}
                        />                        
                    </Stack>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }} >
                    <Stack spacing={2} sx={{ height: "100%" }}>
                        <SkillChips
                            title="Marketing Digital y Redes"
                            skills={habilidades.marketing}
                            icon={<ManageAccountsIcon color="primary" />}
                        />
                    </Stack>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }} >
                    <Stack spacing={2} sx={{ height: "100%" }}>
                        <SkillChips
                            title="Habilidades Blandas"
                            skills={habilidades.blandas}
                            icon={<ManageAccountsIcon color="primary" />}
                        />
                    </Stack>
                </Grid>



                {/* Formación + Filosofía */}
                <Grid item size={{ xs: 12, md: 12 }} >
                    <Paper sx={{ p: 3, borderRadius: 4, height: "100%" }}>
                        <SectionTitle icon={<SchoolIcon color="primary" />}>
                            Formación Académica
                        </SectionTitle>
                        <BulletList items={formacion} />
                    </Paper>
                </Grid>

                <Grid item size={{ xs: 12, md: 12 }} >
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: "100%",
                            background:
                                "linear-gradient(180deg, rgba(25,118,210,0.08) 0%, rgba(25,118,210,0.02) 100%)",
                        }}
                    >
                        <SectionTitle icon={<LightbulbIcon color="primary" />}>
                            Filosofía Personal
                        </SectionTitle>
                        {filosofia.map((f, i) => (
                            <Typography key={i} paragraph sx={{ fontStyle: i === 0 ? "italic" : "normal" }}>
                                {f}
                            </Typography>
                        ))}
                    </Paper>
                </Grid>
            </Grid>

            {/* CTA opcional */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="flex-end"
                sx={{ mt: 3 }}
            >
                <Button
                    variant="outlined"
                    component="a"
                    href="mailto:abdielaldanadg@gmail.com"
                    startIcon={<EmailIcon />}
                >
                    Contáctame
                </Button>
                <Button
                    variant="contained"
                    component="a"
                    href="https://github.com/abdielaldana"
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<GitHubIcon />}
                >
                    Github
                </Button>
                <Button
                    variant="contained"
                    component="a"
                    href="https://www.instagram.com/abdielaldana/"
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<InstagramIcon />}
                >
                    Instagram
                </Button>
            </Stack>
        </Container>
    );
}
