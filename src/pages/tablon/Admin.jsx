import { useEffect, useState } from "react"
import { useTablon } from "../../contexts/TablonContext"
import { Button, Divider, Grid, Modal, Paper, TextField, Typography } from "@mui/material";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// Styles
const styleModal = {
    all: "unset",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        xs: "350px",
        sm: "90vw",
        md: "85%",
        // lg: "60vw",
    },
    maxWidth: {
        xs: "440px",
        sm: "440px",
        // md: "85%",
        // lg: "60vw",
    },
    height: {
        xs: "auto",
        sm: "auto",
        md: "auto",
        // lg: "auto",
    },
    maxHeight: {
        xs: "80dvh",
        sm: "80dvh",
        md: "90dvh",
    },
    bgcolor: "background.paper",
    borderRadius: "5px",
    // boxShadow: 24,
    overflow: "auto",
    overflowX: "hidden",
    p: 1,
};

function Admin() {
    const { adminInfo, getAdminData, usuario, postAddMisionAdmin } = useTablon();

    useEffect(() => {
        if (usuario?.admin) {
            getAdminData()
        }
    }, [])

    // Modal ]Add Mision
    const [openAddMision, setOpenAddMision] = useState(false)
    const handleOpenAddMision = () => {
        setOpenAddMision(!openAddMision)
    }

    const crearMision = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        let tempJson = {
            matricula: usuario.matricula,

            nombre: formJson.nombre_mision,
            subNombre: formJson.subnombre_mision,
            lore: formJson.lore_mision,
            objetivo: formJson.objetivo_mision,
            requisitos: formJson.requisitos_mision,

            dificultad: parseInt(formJson.dificultad_mision),
            puntos: parseInt(formJson.puntos_mision),

            tipo_mision: parseInt(formJson.tipo_mision),
            frecuencia: parseInt(formJson.frecuencia_mision),

            codigo: formJson.codigo_mision,

            fechaInicioGlobal: formJson.fecha_inicio_mision.replace("T", " ") + ":00",
            fechaFinGlobal: formJson.fecha_fin_mision.replace("T", " ") + ":00",

            visible: formJson.visible_mision === "on" ? 1 : 0,

        }

        try {
            const call = await postAddMisionAdmin(tempJson)
            if (call) {
                handleOpenAddMision()
            }
        } catch (err) {
            console.error(err.msg);
        }

    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 12 }}>
                    <Button onClick={handleOpenAddMision} variant="contained" color="primary">Agregar Mision</Button>
                </Grid>
            </Grid>

            {/* Add Mision */}
            <Modal
                open={openAddMision}
                onClose={handleOpenAddMision}
                aria-labelledby="articulo-modal"
                aria-describedby="articulo-modal"
                aria-hidden="false"
            >
                <Card sx={styleModal}>
                    {/* <CardHeader> */}
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <Typography variant="h5" fontWeight={"bold"} gutterBottom textAlign={"center"}>
                                Crear Mision
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* </CardHeader> */}
                    <CardContent style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <form onSubmit={crearMision} id="crear-Mision" autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        id="nombre_mision"
                                        name="nombre_mision"
                                        label="Nombre Mision"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        id="subnombre_mision"
                                        name="subnombre_mision"
                                        label="Subtitulo Mision"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <TextField
                                        id="lore_mision"
                                        name="lore_mision"
                                        label="Lore"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        multiline
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <TextField
                                        id="objetivo_mision"
                                        name="objetivo_mision"
                                        label="Objetivo"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        multiline
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <TextField
                                        id="requisitos_mision"
                                        name="requisitos_mision"
                                        label="Requisitos"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        multiline
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="label-dificultad-mision">Dificultad</InputLabel>
                                        <Select
                                            labelId="label-dificultad-mision"
                                            id="dificultad_mision"
                                            name="dificultad_mision"
                                            size="small"
                                            label="Dificultad"
                                            defaultValue={0}
                                            required
                                        >
                                            <MenuItem value={0}>Comun</MenuItem>
                                            <MenuItem value={1}>Rara</MenuItem>
                                            <MenuItem value={2}>Epica</MenuItem>
                                            <MenuItem value={3}>Legendaria</MenuItem>
                                            <MenuItem value={4}>Mytica</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <TextField
                                        id="puntos_mision"
                                        name="puntos_mision"
                                        label="Puntos"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="number"
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="label-tipo-mision">Tipo</InputLabel>
                                        <Select
                                            labelId="label-tipo-mision"
                                            id="tipo_mision"
                                            name="tipo_mision"
                                            size="small"
                                            label="Tipo"
                                            defaultValue={0}
                                            required
                                        >
                                            <MenuItem value={0}>Unica</MenuItem>
                                            <MenuItem value={1}>Periodica</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="label-tipo-frecuencia">Frecuencia</InputLabel>
                                        <Select
                                            labelId="label-tipo-frecuencia"
                                            id="frecuencia_mision"
                                            name="frecuencia_mision"
                                            size="small"
                                            label="Frecuencia"
                                            defaultValue={0}
                                            required
                                        >
                                            <MenuItem value={0}>No aplica</MenuItem>
                                            <MenuItem value={1}>Diaria</MenuItem>
                                            <MenuItem value={2}>Semanal</MenuItem>
                                            <MenuItem value={3}>Mensual</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <TextField
                                        id="codigo_mision"
                                        name="codigo_mision"
                                        label="Codigo"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        id="fecha_inicio_mision"
                                        name="fecha_inicio_mision"
                                        label="Fecha Inicio"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="datetime-local"
                                        required
                                        slotProps={{
                                            input: {
                                                startAdornment: " ",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        id="fecha_fin_mision"
                                        name="fecha_fin_mision"
                                        label="Fecha Fin"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="datetime-local"
                                        required
                                        slotProps={{
                                            input: {
                                                startAdornment: " ",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} disabled id="visible_mision" name="visible_mision" label="Mision Visible" />
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                    <CardActions>
                        <Button type="submit" form="crear-Mision" variant="contained" color="primary">Crear</Button>
                    </CardActions>
                </Card>

            </Modal>

        </>
    )
}

export default Admin