// ReactJS
import { useEffect, useMemo, useState } from "react";

// Material UI
import { Grid, Typography } from "@mui/material";

// Context
import { useTablon } from "../../contexts/TablonContext";

// Componentes
import ViewTitulo from "../../components/Tablon/Perfil/ViewTitulo";
import Mision from "../../components/Tablon/Misiones/Mision";
import { getTiempoRestante } from "../../utils/articuloTypeUtils";

/**
 * Sección reutilizable: título + lista de misiones
 */
function SeccionMisiones({ title, items }) {
	const count = items.length;

	return (
		<>
			<Grid size={{ xs: 12 }}>
				<Typography variant="h5" fontWeight="bold" className="ellipsis">
					{count} {title}
				</Typography>
			</Grid>

			{items.map((mision) => (
				<Grid key={mision.id ?? `${mision.codigo}-${mision.fechaFinGlobal}`} size={{ xs: 12, md: 6 }}>
					<Mision mision={mision} />
				</Grid>
			))}
		</>
	);
}

function Misiones() {
	const { usuario, misiones, getMisiones } = useTablon();

	// Cargar misiones al entrar
	useEffect(() => {
		if (misiones === null) getMisiones(usuario?.matricula);
		// Si quieres que se recargue cuando cambie la matrícula:
	}, [misiones, usuario, getMisiones]);

	const usuarioLinaje = usuario?.linaje; 

	// Tick para refrescar "tiempo restante" cada segundo
	const [tick, setTick] = useState(0);
	useEffect(() => {
		const i = setInterval(() => setTick((t) => t + 1), 1000);
		return () => clearInterval(i);
	}, []);


	// Helpers
	const isVencida = (m) => getTiempoRestante(m.fechaFinGlobal) === "Vencida";
	const noCanjeada = (m) => m.canjeada === "0";
	const canjeada = (m) => m.canjeada === "1";

	const esSecreta = (m) => m?.linaje === "3";
	const usuarioEsLinaje3 = usuario?.linaje === "3";

	// Clasificación en un solo lugar (se recalcula cuando cambian misiones o el tick)
	const { periodicasActivas, unicasActivas, completadas, vencidas, secretas, secretasCompletadas, secretasVencidas } = useMemo(() => {
		const base = Array.isArray(misiones) ? misiones : [];

		// Siempre excluimos las secretas de las listas normales
		const normales = base.sort((a, b) => Number(a.dificultad) - Number(b.dificultad)).filter((m) => !esSecreta(m));
		const secretBase = base.sort((a, b) => Number(a.dificultad) - Number(b.dificultad)).filter((m) => esSecreta(m));

		const periodicasActivas = normales.filter(
			(m) => noCanjeada(m) && m.frecuencia > "0" && !isVencida(m)
		);

		const unicasActivas = normales
			.slice() // para no mutar
			
			.filter((m) => m.linaje !== "3")
			.filter((m) => noCanjeada(m) && m.frecuencia === "0" && !isVencida(m));

		const completadas = normales.filter((m) => canjeada(m));

		const vencidas = normales.filter((m) => noCanjeada(m) && isVencida(m));

		// Secretas: solo se usarán si usuarioEsLinaje3 es true (más abajo)
		const secretas = secretBase.filter((m) => noCanjeada(m) && !isVencida(m));
		const secretasCompletadas = secretBase.filter((m) => canjeada(m));
		const secretasVencidas = secretBase.filter((m) => isVencida(m));

		return { periodicasActivas, unicasActivas, completadas, vencidas, secretas, secretasCompletadas, secretasVencidas };
	}, [misiones, tick, usuario]);


	return (
		<Grid container spacing={3}>

			<ViewTitulo texto="Misiones" update={() => getMisiones(usuario?.matricula)} />
			<SeccionMisiones title="Misiones Periódicas" items={periodicasActivas} />
			<SeccionMisiones title="Misiones Unicas" items={unicasActivas} />
			<SeccionMisiones title="Misiones Completadas" items={completadas} />
			<SeccionMisiones title="Misiones Vencidas" items={vencidas} />
			{usuarioEsLinaje3 && (
				<>
					<SeccionMisiones title="Misiones Secretas" items={secretas} />
					<SeccionMisiones title="Misiones Secretas Completadas" items={secretasCompletadas} />
					<SeccionMisiones title="Misiones Secretas Vencidas" items={secretasVencidas} />
				</>
			)}

		</Grid>
	);
}

export default Misiones;
