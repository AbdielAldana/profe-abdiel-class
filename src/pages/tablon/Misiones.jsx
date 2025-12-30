// ReactJS
import { useEffect } from "react";

// Material UI
import { Grid, Typography, Divider, Chip } from "@mui/material";

// Context
import { useTablon } from "../../contexts/TablonContext";
import { useCookies } from "react-cookie";

// Componentes
import ViewTitulo from "../../components/Tablon/Perfil/ViewTitulo";
import Mision from "../../components/Tablon/Misiones/Mision";

function Misiones() {
	const { misiones, getMisiones } = useTablon()

	useEffect(() => {
		if (misiones === null) { getMisiones() }
	}, [])


	return (


		<Grid container spacing={3}>
			<ViewTitulo
				texto="Misiones"
				update={getMisiones}
			/>
			{/* PERIÓDICAS (ARRIBA) */}
			<Grid size={{ xs: 12 }}>
				<Typography variant="h5" fontWeight="bold" gutterBottom>
					Misiones Periódicas
				</Typography>
			</Grid>
			{misiones !== null &&
				misiones
					.filter(x => x.canjeada == 0)
					.filter(x => x.frecuencia > 0)
					.map((mision, i) => {
						return (
							<Grid key={i} size={{ xs: 12, md: 6 }}>
								<Mision mision={mision} />
							</Grid>
						)
					})
			}
			{/* UNICAS */}
			<Grid size={{ xs: 12 }}>
				<Typography variant="h5" fontWeight="bold" gutterBottom>
					Misiones Unicas
				</Typography>
			</Grid>
			{misiones !== null &&
				misiones
					.filter(x => x.canjeada == 0)
					.filter(x => x.frecuencia == 0)
					.map((mision, i) => {
						return (
							<Grid key={i} size={{ xs: 12, md: 6 }}>
								<Mision mision={mision} />
							</Grid>
						)
					})
			}
			{/* Completadas */}
			<Grid size={{ xs: 12 }}>
				<Typography variant="h5" fontWeight="bold" gutterBottom>
					Misiones Completadas
				</Typography>
			</Grid>
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


		</Grid>

	);
}

export default Misiones;
