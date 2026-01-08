// ReactJS
import { useEffect, useState } from "react";

// Material UI
import { Grid, Typography, Divider, Chip } from "@mui/material";

// Context
import { useTablon } from "../../contexts/TablonContext";
import { useCookies } from "react-cookie";

// Componentes
import ViewTitulo from "../../components/Tablon/Perfil/ViewTitulo";
import Mision from "../../components/Tablon/Misiones/Mision";
import { getTiempoRestante } from "../../utils/articuloTypeUtils";

function Misiones() {
	const { usuario, misiones, getMisiones } = useTablon()

	useEffect(() => {
		if (misiones === null) { getMisiones(usuario?.matricula) }
	}, [])

	const [_, setTick] = useState(0);
	useEffect(() => {
		const i = setInterval(() => setTick(t => t + 1), 1000);
		return () => clearInterval(i);
	}, []);


	return (


		<Grid container spacing={3}>


			<ViewTitulo
				texto="Misiones"
				update={()=>{getMisiones(usuario?.matricula)}}
			/>



			{/* PERIÓDICAS (ARRIBA) */}
			{usuario !== null && misiones !== null &&
				misiones.filter(x => x.canjeada == 0).filter(x => x.frecuencia > 0).filter(x => getTiempoRestante(x.fechaFinGlobal) !== "Vencida").length > 0 &&
				<Grid size={{ xs: 12 }}>
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						{misiones.filter(x => x.canjeada == 0).filter(x => x.frecuencia > 0).filter(x => getTiempoRestante(x.fechaFinGlobal) !== "Vencida").length} Misiones Periódicas
					</Typography>
				</Grid>
			}
			{usuario !== null && misiones !== null &&
				misiones.filter(x => x.canjeada == 0).filter(x => x.frecuencia > 0).filter(x => getTiempoRestante(x.fechaFinGlobal) !== "Vencida").length == 0 &&
				<Grid size={{ xs: 12 }}>
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						0 Misiones Periódicas
					</Typography>
				</Grid>
			}
			{misiones !== null &&
				misiones
					.filter(x => x.canjeada == 0)
					.filter(x => x.frecuencia > 0)
					.filter(x => getTiempoRestante(x.fechaFinGlobal) !== "Vencida")
					.map((mision, i) => {
						return (
							<Grid key={i} size={{ xs: 12, md: 6 }}>
								<Mision mision={mision} />
							</Grid>
						)
					})
			}



			{/* UNICAS */}
			{usuario !== null && misiones !== null &&
				misiones.filter(x => x.canjeada == 0).filter(x => x.frecuencia == 0).filter(x => getTiempoRestante(x.fechaFinGlobal) !== "Vencida").length > 0 &&
				<Grid size={{ xs: 12 }}>
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						{misiones.filter(x => x.canjeada == 0).filter(x => x.frecuencia == 0).filter(x => getTiempoRestante(x.fechaFinGlobal) !== "Vencida").length} Misiones Unicas
					</Typography>
				</Grid>
			}
			{usuario !== null && misiones !== null &&
				misiones.filter(x => x.canjeada == 0).filter(x => x.frecuencia == 0).filter(x => getTiempoRestante(x.fechaFinGlobal) !== "Vencida").length == 0 &&
				<Grid size={{ xs: 12 }}>
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						0 Misiones Unicas
					</Typography>
				</Grid>
			}

			{misiones !== null &&
				misiones
					.filter(x => x.canjeada == 0)
					.filter(x => x.frecuencia == 0)
					.filter(x => getTiempoRestante(x.fechaFinGlobal) !== "Vencida")
					.map((mision, i) => {
						return (
							<Grid key={i} size={{ xs: 12, md: 6 }}>
								<Mision mision={mision} />
							</Grid>
						)
					})
			}



			{/* Completadas */}
			{usuario !== null && misiones !== null &&
				misiones.filter(x => x.canjeada == 1).length > 0 &&
				<Grid size={{ xs: 12 }}>
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						{misiones.filter(x => x.canjeada == 1).length} Misiones Completadas
					</Typography>
				</Grid>
			}
			{usuario !== null && misiones !== null &&
				misiones.filter(x => x.canjeada == 1).length == 0 &&
				<Grid size={{ xs: 12 }}>
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						0 Misiones Completadas
					</Typography>
				</Grid>
			}
			{misiones !== null &&
				misiones
					.filter(x => x.canjeada == 1)
					// .filter(x => x.frecuencia == 0)
					.map((mision, i) => {
						return (
							<Grid key={i} size={{ xs: 12, md: 6 }}>
								<Mision mision={mision} />
							</Grid>
						)
					})
			}


			{/* PERIÓDICAS (ARRIBA) */}
			{usuario !== null && misiones !== null &&
				misiones.filter(x => getTiempoRestante(x.fechaFinGlobal) === "Vencida").length > 0 &&
				<Grid size={{ xs: 12 }}>
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						{misiones.filter(x => getTiempoRestante(x.fechaFinGlobal) === "Vencida").length} Misiones Vencidas
					</Typography>
				</Grid>
			}
			{usuario !== null && misiones !== null &&
				misiones.filter(x => getTiempoRestante(x.fechaFinGlobal) === "Vencida").length == 0 &&
				<Grid size={{ xs: 12 }}>
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						0 Misiones Vencidas
					</Typography>
				</Grid>
			}
			{misiones !== null &&
				misiones
					.filter(x => x.canjeada == 0)
					// .filter(x => x.frecuencia > 0)
					.filter(x => getTiempoRestante(x.fechaFinGlobal) === "Vencida")
					.map((mision, i) => {
						return (
							<Grid key={i} size={{ xs: 12, md: 6 }}>
								<Mision mision={mision} />
							</Grid>
						)
					})
			}


		</Grid>

	);
}

export default Misiones;
