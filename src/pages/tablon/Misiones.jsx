// ReactJS
import React from "react";

// Material UI
import { Grid, Typography, Divider, Chip } from "@mui/material";

// Context
import { useTablon } from "../../contexts/TablonContext";
import { useCookies } from "react-cookie";

// Componentes
import ViewTitulo from "../../components/Tablon/Perfil/ViewTitulo";

function Misiones() {
	

	return (


		<Grid container spacing={3}>
			<ViewTitulo
				texto="Misiones"
			/>
			{/* PERIÓDICAS (ARRIBA) */}
			<Grid size={{ xs: 12 }}>
				<Typography variant="h5" fontWeight="bold" gutterBottom>
					Misiones Periódicas
				</Typography>
			</Grid>

			
		</Grid>

	);
}

export default Misiones;
