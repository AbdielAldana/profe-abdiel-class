import { useEffect, useState } from "react"
import { useTablon } from "../../contexts/TablonContext"
import { Button, Grid, Modal, TextField, Typography } from "@mui/material";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MisionAdmin from "../../components/Tablon/Admin/MisionAdmin";
import { getTiempoRestante } from "../../utils/articuloTypeUtils";

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

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};



function Admin() {
    const { adminInfo, getAdminData, usuario, postAddMisionAdmin } = useTablon();

    useEffect(() => {
        if (adminInfo === null) {
            getAdminData()
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        console.log(adminInfo?.misiones);

    }, [adminInfo])


    // Modal Add Mision
    const [openAddMision, setOpenAddMision] = useState(false)
    const handleOpenAddMision = () => {
        setOpenAddMision(!openAddMision)
    }

    const crearMision = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());




        let tempJson = {
            profesor: usuario.profesor,
            profe_id: usuario.id,

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
            linaje: formJson.linaje_mision == "on" ? 3 : 0,

            fechaInicioGlobal: formJson.fecha_inicio_mision.replace("T", " ") + ":00",
            fechaFinGlobal: formJson.fecha_fin_mision.replace("T", " ") + ":00",

            visible: 1,

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


    // Pestanas View

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 12 }}>
                    <Button onClick={handleOpenAddMision} variant="contained" color="primary">Agregar Mision</Button>
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>

                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ maxWidth: { xs: "100%" }, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                variant="scrollable"
                                scrollButtons="auto"
                                allowScrollButtonsMobile
                            >
                                <Tab label="Temp. Vencidas" {...a11yProps(0)} />
                                <Tab label="Temp. Activas" {...a11yProps(1)} />
                                <Tab label="Gral. Activas" {...a11yProps(2)} />
                                <Tab label="Mellivoras Gral." {...a11yProps(3)} />
                                <Tab label="Gral. Vencidas" {...a11yProps(4)} />
                                <Tab label="Ocultas" {...a11yProps(5)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <Grid container spacing={2}>
                                {/* Periodicas Vencidas */}
                                {adminInfo !== null &&
                                    adminInfo?.misiones
                                        .sort((a, b) => a.dificultad - b.dificultad)
                                        .filter(x => x.visible == 1)
                                        .filter(x => x.frecuencia != 0)
                                        .filter(x => x.linaje != 3)
                                        .filter(x => getTiempoRestante(x.fechaFinGlobal) === "Vencida")
                                        .map((miso, i) => {
                                            return (
                                                <Grid key={i} size={{ xs: 12, md: 6 }}>
                                                    <MisionAdmin mision={miso} />

                                                </Grid>
                                            )
                                        })

                                }
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Grid container spacing={2}>
                                {/* Periodicas Activas */}
                                {adminInfo !== null &&
                                    adminInfo?.misiones
                                        .sort((a, b) => a.dificultad - b.dificultad)
                                        .filter(x => x.visible == 1)
                                        .filter(x => getTiempoRestante(x.fechaFinGlobal) !== "Vencida")
                                        .filter(x => x.frecuencia != 0)
                                        .filter(x => x.linaje != 3)
                                        .map((miso, i) => {
                                            return (
                                                <Grid key={i} size={{ xs: 12, md: 6 }}>
                                                    <MisionAdmin mision={miso} />

                                                </Grid>
                                            )
                                        })

                                }

                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Grid container spacing={2}>
                                {/* General Activas */}
                                {adminInfo !== null &&
                                    adminInfo?.misiones
                                        .sort((a, b) => a.dificultad - b.dificultad)
                                        .filter(x => x.visible == 1)
                                        .filter(x => getTiempoRestante(x.fechaFinGlobal) !== "Vencida")
                                        .filter(x => x.frecuencia == 0)
                                        .filter(x => x.linaje != 3)
                                        .map((miso, i) => {
                                            return (
                                                <Grid key={i} size={{ xs: 12, md: 6 }}>
                                                    <MisionAdmin mision={miso} />

                                                </Grid>
                                            )
                                        })

                                }
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <Grid container spacing={2}>
                                {/* Mallivoras */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6">Vencidas Frecuentes</Typography>
                                </Grid>
                                {adminInfo !== null &&
                                    adminInfo?.misiones
                                        .sort((a, b) => a.dificultad - b.dificultad)
                                        .filter(x => x.visible == 1)
                                        .filter(x => x.frecuencia > 0)
                                        .filter(x => x.linaje == 3)
                                        .filter(x => getTiempoRestante(x.fechaFinGlobal) === "Vencida")
                                        .map((miso, i) => {
                                            return (
                                                <Grid key={i} size={{ xs: 12, md: 6 }}>
                                                    <MisionAdmin mision={miso} />

                                                </Grid>
                                            )
                                        })

                                }
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6">Frecuentes</Typography>
                                </Grid>
                                {adminInfo !== null &&
                                    adminInfo?.misiones
                                        .sort((a, b) => a.dificultad - b.dificultad)
                                        .filter(x => x.visible == 1)
                                        .filter(x => x.frecuencia > 0)
                                        .filter(x => x.linaje == 3)
                                        .filter(x => getTiempoRestante(x.fechaFinGlobal) != "Vencida")
                                        .map((miso, i) => {
                                            return (
                                                <Grid key={i} size={{ xs: 12, md: 6 }}>
                                                    <MisionAdmin mision={miso} />

                                                </Grid>
                                            )
                                        })

                                }
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6">Generales Activas</Typography>
                                </Grid>
                                {adminInfo !== null &&
                                    adminInfo?.misiones
                                        .sort((a, b) => a.dificultad - b.dificultad)
                                        .filter(x => x.visible == 1)
                                        .filter(x => x.frecuencia == 0)
                                        .filter(x => x.linaje == 3)
                                        .filter(x => getTiempoRestante(x.fechaFinGlobal) != "Vencida")
                                        .map((miso, i) => {
                                            return (
                                                <Grid key={i} size={{ xs: 12, md: 6 }}>
                                                    <MisionAdmin mision={miso} />

                                                </Grid>
                                            )
                                        })

                                }

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6">Generales Vencidas</Typography>
                                </Grid>
                                {adminInfo !== null &&
                                    adminInfo?.misiones
                                        .sort((a, b) => a.dificultad - b.dificultad)
                                        .filter(x => x.visible == 1)
                                        .filter(x => x.frecuencia == 0)
                                        .filter(x => x.linaje == 3)
                                        .filter(x => getTiempoRestante(x.fechaFinGlobal) == "Vencida")
                                        .map((miso, i) => {
                                            return (
                                                <Grid key={i} size={{ xs: 12, md: 6 }}>
                                                    <MisionAdmin mision={miso} />

                                                </Grid>
                                            )
                                        })

                                }
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6">Ocultas</Typography>
                                </Grid>
                                {adminInfo !== null &&
                                    adminInfo?.misiones
                                        .sort((a, b) => a.dificultad - b.dificultad)
                                        .filter(x => x.visible == 0)
                                        // .filter(x => x.frecuencia == 0)
                                        .filter(x => x.linaje == 3)
                                        // .filter(x => getTiempoRestante(x.fechaFinGlobal) == "Vencida")
                                        .map((miso, i) => {
                                            return (
                                                <Grid key={i} size={{ xs: 12, md: 6 }}>
                                                    <MisionAdmin mision={miso} />

                                                </Grid>
                                            )
                                        })

                                }

                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={4}>
                            <Grid container spacing={2}>
                                {/* Visibles Vencidas */}
                                {adminInfo !== null &&
                                    adminInfo?.misiones
                                        .sort((a, b) => a.dificultad - b.dificultad)
                                        .filter(x => x.visible == 1)
                                        .filter(x => x.frecuencia == 0)
                                        .filter(x => x.linaje != 3)
                                        .filter(x => getTiempoRestante(x.fechaFinGlobal) === "Vencida")
                                        .map((miso, i) => {
                                            return (
                                                <Grid key={i} size={{ xs: 12, md: 6 }}>
                                                    <MisionAdmin mision={miso} />

                                                </Grid>
                                            )
                                        })

                                }
                            </Grid>
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={5}>
                            <Grid container spacing={2}>
                                {/* Ocultas */}
                                {adminInfo !== null &&
                                    adminInfo?.misiones
                                        .sort((a, b) => a.dificultad - b.dificultad)
                                        .filter(x => x.visible == 0)
                                        .map((miso, i) => {
                                            return (
                                                <Grid key={i} size={{ xs: 12, md: 6 }}>
                                                    <MisionAdmin mision={miso} />
                                                </Grid>
                                            )
                                        })

                                }
                            </Grid>
                        </CustomTabPanel>
                    </Box>


                    {/* <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <Typography fontWeight={"bold"}>Visibles Vencidas Periodicas</Typography>
                        </Grid>
                        {adminInfo !== null &&
                            adminInfo?.misiones
                                .sort((a, b) => a.dificultad - b.dificultad)
                                .filter(x => x.visible == 1)
                                .filter(x => x.frecuencia != 0)
                                .filter(x => getTiempoRestante(x.fechaFinGlobal) === "Vencida")
                                .map((miso, i) => {
                                    return (
                                        <Grid key={i} size={{ xs: 12, md: 6 }}>
                                            <MisionAdmin mision={miso} />

                                        </Grid>
                                    )
                                })

                        }
                        <Grid size={{ xs: 12, md: 12 }}>
                            <Typography fontWeight={"bold"}>Visibles</Typography>
                        </Grid>
                        {adminInfo !== null &&
                            adminInfo?.misiones
                                .sort((a, b) => a.dificultad - b.dificultad)
                                .filter(x => x.visible == 1)
                                .filter(x => getTiempoRestante(x.fechaFinGlobal) !== "Vencida")
                                .map((miso, i) => {
                                    return (
                                        <Grid key={i} size={{ xs: 12, md: 6 }}>
                                            <MisionAdmin mision={miso} />

                                        </Grid>
                                    )
                                })

                        }
                        <Grid size={{ xs: 12, md: 12 }}>
                            <Typography fontWeight={"bold"}>Visibles Vencidas Unicas</Typography>
                        </Grid>
                        {adminInfo !== null &&
                            adminInfo?.misiones
                                .sort((a, b) => a.dificultad - b.dificultad)
                                .filter(x => x.visible == 1)
                                .filter(x => x.frecuencia == 0)
                                .filter(x => getTiempoRestante(x.fechaFinGlobal) === "Vencida")
                                .map((miso, i) => {
                                    return (
                                        <Grid key={i} size={{ xs: 12, md: 6 }}>
                                            <MisionAdmin mision={miso} />

                                        </Grid>
                                    )
                                })

                        }
                        <Grid size={{ xs: 12, md: 12 }}>
                            <Typography fontWeight={"bold"}>No Visibles</Typography>
                        </Grid>
                        {adminInfo !== null &&
                            adminInfo?.misiones
                                .sort((a, b) => a.dificultad - b.dificultad)
                                .filter(x => x.visible == 0)
                                .map((miso, i) => {
                                    return (
                                        <Grid key={i} size={{ xs: 12, md: 6 }}>
                                            <MisionAdmin mision={miso} />
                                        </Grid>
                                    )
                                })

                        }
                    </Grid> */}
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
                                            <MenuItem value={1}>Básica</MenuItem>
                                            <MenuItem value={2}>Rara</MenuItem>
                                            <MenuItem value={3}>Epica</MenuItem>
                                            <MenuItem value={4}>Legendaria</MenuItem>
                                            <MenuItem value={5}>Mytica</MenuItem>
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
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} id="linaje_mision" name="linaje_mision" label="Tejones" />
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