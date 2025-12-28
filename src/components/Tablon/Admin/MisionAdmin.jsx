import { useEffect, useState } from "react";

import { Button, Divider, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import { difColor, difName } from "../../../utils/dificultadUtils";

import { GiRupee } from "react-icons/gi";

import { useTablon } from "../../../contexts/TablonContext";
import { getTiempoRestante } from "../../../utils/articuloTypeUtils";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';

const style = {
    p: 2,
    position: "relative",
};

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

function MisionAdmin({ mision }) {
    const { usuario, postResetMisionPeriodicaAdmin, postEditMisionAdmin } = useTablon()


    let tiempoRestante = mision.fechaFinGlobal === null ? "" : getTiempoRestante(mision.fechaFinGlobal ? mision.fechaFinGlobal : "2030/12/10 00:00:00")
    // eslint-disable-next-line
    const [_, setTick] = useState(0);
    useEffect(() => {
        const i = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(i);
    }, []);


    // Modal Reset Mision
    const [openAddMisionReset, setOpenAddMisionReset] = useState(false)
    const handleOpenAddMisionReset = () => {
        setOpenAddMisionReset(!openAddMisionReset)
    }
    const resetMision = async (event) => {
        // postResetMisionPeriodicaAdmin
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        let tempJson = {
            matricula: usuario.matricula,
            id_mision: mision.id,
            codigo: formJson.codigo_mision_reset,
            codigo_contador: parseInt(mision.codigo_contador) + 1,
            fechaFinGlobal: formJson.fecha_fin_mision_reset
        }

        try {
            const call = await postResetMisionPeriodicaAdmin(tempJson)
            if (call) {
                handleOpenAddMisionReset()
            }
        } catch (err) {
            console.error(err.msg);
        }
    }
    // Modal Reset Mision
    const [openAddMisionEdit, setOpenAddMisionEdit] = useState(false)
    const handleOpenAddMisionEdit = () => {
        setOpenAddMisionEdit(!openAddMisionEdit)
    }
    const editMision = async (event) => {
        // postResetMisionPeriodicaAdmin
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        // Base obligatoria
        let payload = {
            matricula: usuario.matricula, // 1527700
            id_mision: mision.id,
        };

        // Campos permitidos para editar
        const allowedFields = [
            "nombre",
            "subNombre",
            "lore",
            "objetivo",
            "requisitos",
            "dificultad",
            "puntos",
            "frecuencia",
            "codigo",
            "fechaInicioGlobal",
            "fechaFinGlobal",
            "visible",
        ];

        // Agregar SOLO lo que venga en el form
        allowedFields.forEach((field) => {
            if (
                formJson[field] !== undefined &&
                formJson[field] !== "" &&
                formJson[field] !== null
            ) {

                payload[field] = formJson[field];

            }
        });

        // console.log(payload);


        try {
            const call = await postEditMisionAdmin(payload)
            if (call) {
                handleOpenAddMisionEdit()
            }
        } catch (err) {
            console.error(err.msg);
        }
    }
    return (
        <>
            <Paper
                // className={"misionSelectF"}
                sx={style}
                style={{
                    border: "solid 4px " + difColor(mision.dificultad),
                    boxShadow: "0 0 3px " + difColor(mision.dificultad),
                }}
            >
                <Grid container spacing={1}>

                    <Grid size={{ xs: 6 }}>
                        <Typography
                            variant="subtitle1"
                            className="ellipsis"
                            sx={{ m: 0, p: 0 }}
                            fontWeight={"bold"}
                            style={{ color: difColor(mision.dificultad) }}
                        // color={level >= articulo.nivel_min ? "" : "error"}
                        // textAlign={"right"}
                        >
                            {difName(mision.dificultad)}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                        <GiRupee size={20} color={usuario?.color} />
                        <Typography
                            variant="subtitle1"
                            className="ellipsis"
                            sx={{ m: 0, p: 0 }}
                            textAlign={"right"}
                        // color={puntos_disponibles >= articulo.costo ? "" : "error"}
                        >
                            <b>{mision.puntos}</b> pts
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" fontWeight={"bold"}>
                            {mision.nombre} - {mision.subNombre}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" >
                            {mision.objetivo}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Typography variant="body1" >
                            Codigo: <b>{mision.codigo}</b>
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                        <Typography variant="body1" >
                            Version: <b>{mision.codigo_contador}</b>
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>
                    <Grid size={{ xs: 8 }} alignSelf={"center"}>
                        <Typography variant="body1" >
                            Termina: <b>{tiempoRestante}</b>
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 4 }} display={"flex"} justifyContent={"flex-end"}>
                        {/* eslint-disable-next-line */}
                        {tiempoRestante == "Vencida" && mision.tipo_mision == 1 &&
                            <Button variant="contained" size="small" color="primary" onClick={handleOpenAddMisionReset}>Reset</Button>
                        }
                        <Button variant="contained" size="small" color="primary" onClick={handleOpenAddMisionEdit}>Editar</Button>
                    </Grid>

                </Grid>
            </Paper>


            {/* Reset Mision Periodica */}
            <Modal
                open={openAddMisionReset}
                onClose={handleOpenAddMisionReset}
                aria-labelledby="articulo-modal"
                aria-describedby="articulo-modal"
                aria-hidden="false"
            >
                <Card sx={styleModal}>
                    {/* <CardHeader> */}
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <Typography variant="h5" fontWeight={"bold"} gutterBottom textAlign={"center"}>
                                Reset Mision Periodica
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* </CardHeader> */}
                    <CardContent style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <form onSubmit={resetMision} id="reset-Mision" autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <TextField
                                        id="codigo_mision_reset"
                                        name="codigo_mision_reset"
                                        label="Codigo Nuevo"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 12 }}>
                                    <TextField
                                        id="fecha_fin_mision_reset"
                                        name="fecha_fin_mision_reset"
                                        label="Fecha Fin Nueva"
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
                            </Grid>
                        </form>
                    </CardContent>
                    <CardActions>
                        <Button type="submit" form="reset-Mision" variant="contained" color="primary">Reset</Button>
                    </CardActions>
                </Card>
            </Modal>

            {/* Editar Mision */}
            <Modal
                open={openAddMisionEdit}
                onClose={handleOpenAddMisionEdit}
                aria-labelledby="articulo-modal"
                aria-describedby="articulo-modal"
                aria-hidden="false"
            >
                <Card sx={styleModal}>
                    {/* <CardHeader> */}
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <Typography variant="h5" fontWeight={"bold"} gutterBottom textAlign={"center"}>
                                Editar Mision
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* </CardHeader> */}
                    <CardContent style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <form onSubmit={editMision} id="editar-Mision" autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        id="nombre_mision"
                                        name="nombre"
                                        label="Nombre Mision"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        helperText={mision.nombre}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        id="subnombre_mision"
                                        name="subNombre"
                                        label="Subtitulo Mision"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        helperText={mision.subNombre}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <TextField
                                        id="lore_mision"
                                        name="lore"
                                        label="Lore"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        multiline
                                        helperText={mision.lore}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <TextField
                                        id="objetivo_mision"
                                        name="objetivo"
                                        label="Objetivo"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        multiline
                                        helperText={mision.objetivo}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <TextField
                                        id="requisitos_mision"
                                        name="requisitos"
                                        label="Requisitos"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        multiline
                                        helperText={mision.requisitos}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="label-dificultad-mision">Dificultad</InputLabel>
                                        <Select
                                            labelId="label-dificultad-mision"
                                            id="dificultad_mision"
                                            name="dificultad"
                                            size="small"
                                            label="Dificultad"
                                            defaultValue={mision.dificultad}
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
                                        name="puntos"
                                        label="Puntos"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="number"
                                        helperText={mision.puntos}
                                    />
                                </Grid>
                                {/* eslint-disable-next-line */}
                                {mision.tipo_mision == 1 &&
                                    <Grid size={{ xs: 12, md: 12 }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="label-tipo-frecuencia">Frecuencia</InputLabel>
                                            <Select
                                                labelId="label-tipo-frecuencia"
                                                id="frecuencia_mision"
                                                name="frecuencia"
                                                size="small"
                                                label="Frecuencia"
                                                defaultValue={mision.frecuencia}
                                            >
                                                <MenuItem value={0}>No aplica</MenuItem>
                                                <MenuItem value={1}>Diaria</MenuItem>
                                                <MenuItem value={2}>Semanal</MenuItem>
                                                <MenuItem value={3}>Mensual</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                }
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <TextField
                                        id="codigo_mision"
                                        name="codigo"
                                        label="Codigo"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        helperText={mision.codigo}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        id="fecha_inicio_mision"
                                        name="fechaInicioGlobal"
                                        label="Fecha Inicio"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="datetime-local"
                                        defaultValue={mision.fechaInicioGlobal}
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
                                        name="fechaFinGlobal"
                                        label="Fecha Fin"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        type="datetime-local"
                                        defaultValue={mision.fechaFinGlobal}
                                        slotProps={{
                                            input: {
                                                startAdornment: " ",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Mision Visible</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="visible"
                                            defaultValue={parseInt(mision.visible)}
                                        >
                                            <FormControlLabel value={0} control={<Radio />} label="No" />
                                            <FormControlLabel value={1} control={<Radio />} label="Si" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                    <CardActions>
                        <Button type="submit" form="editar-Mision" variant="contained" color="primary">Editar</Button>
                    </CardActions>
                </Card>

            </Modal>
        </>
    )
}

export default MisionAdmin