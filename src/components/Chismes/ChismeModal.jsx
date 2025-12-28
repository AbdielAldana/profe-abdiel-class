import * as React from "react";
import {
	Box,
	// Card,
	CardHeader,
	CardContent,
	CardActions,
	Avatar,
	IconButton,
	Typography,
	Modal,
	Tooltip,
	Badge,
	Button,
	TextField,
	Fab,
	Grid,
	Divider,
} from "@mui/material";
import { grey } from "@mui/material/colors";
// import WhatshotIcon from "@mui/icons-material/Whatshot";
import CloseIcon from "@mui/icons-material/Close";
import { useCookies } from "react-cookie";
import axios from "axios";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from "react-toastify";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: {
		xs: "100vw",
		// sm: "80vw",
		// md: "70vw",
		// lg: "60vw",
	},
	height: {
		xs: "95vh",
		// sm: "auto",
		// md: "auto",
		// lg: "auto",
	},
	bgcolor: "background.paper",
	borderRadius: "0px",
	boxShadow: 24,
	overflow: "auto",
	p: 4,
};

export default function ChismeModal({ open, onClose, data, refreshChismes, pass }) {
	const notifyError = (txt) =>
		toast.error(txt, { position: "top-center" });
	const notifySuccess = (txt) =>
		toast.success(txt, { position: "top-center" });

	const [cookies, setCookie] = useCookies(["reactions"]);

	// ⬇️ Estados locales (inicializados seguros)
	const [reactions, setReactions] = React.useState(
		() => (data?.reactions ? { ...data.reactions } : {})
	);
	const [comentarios, setComentarios] = React.useState(
		() => (Array.isArray(data?.comentarios) ? [...data.comentarios] : [])
	);
	const [coment, setComent] = React.useState("");

	// Clave por post para cookies
	const postKey = `post_${data.id_registro}`;

	// Inicializa cookie si no existe
	React.useEffect(() => {
		if (!cookies.reactions) setCookie("reactions", {}, { path: "/" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// ⛳️ Rehidratación: sincroniza cuando cambien props relevantes o al abrir
	React.useEffect(() => {
		setReactions(data?.reactions ? { ...data.reactions } : {});
		setComentarios(Array.isArray(data?.comentarios) ? [...data.comentarios] : []);
	}, [
		data?.id_registro,
		data?.comentarios_count,
		data?.reactions_count,
		data?.updated_at,
		open,
	]);

	// ---- Color del nivel ----
	const getAvatarColor = (lvl) => {
		if (lvl >= 1 && lvl <= 5) return grey[700];      // GRIS
		if (lvl >= 6 && lvl <= 20) return "#7ED957";     // Verde suave
		if (lvl >= 21 && lvl <= 50) return "#F4C542";    // Amarillo
		if (lvl >= 51 && lvl <= 75) return "#FB8C00";    // Naranja
		if (lvl >= 76 && lvl <= 99) return "#E53935";    // Rojo
		if (lvl >= 100 && lvl <= 999) return "#8E24AA";                // Morado épico
		if (lvl >= 1000) return "#000000";                // Morado épico

		return grey[500];
	};


	const formatLevel = (lvl) => {
		// Redondeo (.6 hacia arriba)
		const dec = lvl % 1;
		const base = Math.floor(lvl);
		const rounded = dec >= 0.6 ? base + 1 : base;

		// 0–99 → número entero
		if (rounded < 100) return String(rounded);

		// 100–999 → centenas ("h")
		if (rounded < 1000) {
			const hundreds = Math.floor(rounded / 100); // 140 → 1
			return `${hundreds}h`;
		}

		// 1000+ → miles ("k")
		const thousands = Math.floor(rounded / 1000); // 2400 → 2
		return `${thousands}k`;
	};

	// Cookies helpers
	const userHasReacted = (key, id) => {
		const current = cookies.reactions || {};
		return current[id]?.includes(key);
	};
	const saveReactionCookie = (key, id) => {
		const current = cookies.reactions || {};
		const updated = {
			...current,
			[id]: [...(current[id] || []), key],
		};
		setCookie("reactions", updated, { path: "/", maxAge: 60 * 60 * 24 }); // 24h
	};

	// 🔥 Server call
	async function sendFire(id_registro, type) {
		try {
			const res = await axios.post(`${process.env.REACT_APP_API_URL}/react_fire.php`, {
				id_registro,
				type,
				password: pass,
				o_id_regitro: data.id_registro,
			});
			notifySuccess("Reaccionado");
			// Revalida en el padre (merge in-place)
			refreshChismes(data.id_registro);
			return res.data;
		} catch (err) {
			notifyError(err?.response?.data?.error || "Error al reaccionar");
			throw err;
		}
	}

	// 🔥 Reacciones (optimista + cookie + refresh del padre)
	const handleReaction = async (id, type) => {
		try {
			if (type === "chisme") {
				if (userHasReacted("fire", postKey)) return;

				// Optimista local
				setReactions((prev) => ({
					...prev,
					fire: (prev?.fire || 0) + 1,
				}));
				saveReactionCookie("fire", postKey);

				await sendFire(id, "chisme");
			} else {
				const commentKey = `${postKey}_${id}`;
				if (userHasReacted("fire", commentKey)) return;

				// Optimista local en comentarios
				setComentarios((prev) =>
					prev.map((c) =>
						c.id_registro === id
							? {
								...c,
								reactions: {
									...c.reactions,
									fire: (c.reactions?.fire || 0) + 1,
								},
							}
							: c
					)
				);
				saveReactionCookie("fire", commentKey);

				await sendFire(id, "comentario");
			}
		} catch {
			// Si falla, el refresh del padre no ocurrirá; podrías revertir optimista si quieres.
		}
	};

	const [lenghtTexto, setLenghtText] = React.useState(0);

	const handleChangeComent = (e) => {
		if (e.target.value.length <= 100) {
			setComent(e.target.value)
			setLenghtText(e.target.value.length)
		}
	};

	const handleSendComent = async () => {
		if (!coment?.trim()) {
			notifyError("Te falta el comentario mi vida...");
			return;
		}
		// if (!pass) {
		//   notifyError("Te falta la palabra mágica corazón...");
		//   return;
		// }

		try {
			await axios.post(`${process.env.REACT_APP_API_URL}/post_comentario.php`, {
				chisme_registro: data.id_registro,
				texto: coment,
				password: pass,
			});
			notifySuccess("Comentario publicado");
			setComent("");
			// Revalida en el padre (trae lista y counters actualizados)
			refreshChismes(data.id_registro);
		} catch (err) {
			notifyError(err?.response?.data?.error || "Error al publicar comentario");
		}
	};




	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={style}>
				{/* Header */}
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Typography variant="h4" sx={{ mb: 0 }}>
						{data.titulo}
					</Typography>
					{/* <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton> */}
					<div className="buttonClose">
						<Fab aria-label="add" size="small" onClick={onClose}>
							<CloseIcon />
						</Fab>
					</div>
				</Box>

				{/* Chisme principal */}
				{/* <Paper sx={{ p: "10px 25px" }}> */}
				<CardHeader
					avatar={
						<Avatar
							sx={{ bgcolor: getAvatarColor(data.level), fontWeight: "bold", width: 50, height: 50 }}
						>
							{formatLevel(data.level)}
						</Avatar>
					}
					action={
						<CardActions sx={{ justifyContent: "space-between" }}>
							<Box>
								{[
									{ key: "fire", icon: <FavoriteIcon color="error" />, label: "Buen chisme" },
								].map(({ key, icon, label }) => {
									const reacted = userHasReacted(key, postKey);
									return (
										<Tooltip key={key} title={reacted ? "Ya reaccionaste" : label}>
											<span>
												<IconButton
													onClick={() => handleReaction(data.id_registro, "chisme")}
													disabled={reacted}
													sx={{ opacity: reacted ? 0.4 : 1 }}
												>
													<Badge badgeContent={reactions?.[key] || 0} color="secondary" overlap="circular">
														{icon}
													</Badge>
												</IconButton>
											</span>
										</Tooltip>
									);
								})}
							</Box>
						</CardActions>
					}
					title={`${data.topic}`}
					subheader={`${data.date} - ${data.id_registro}`}
					sx={{ pl: 0 }}
				/>

				<CardContent sx={{ pt: 0 }}>
					<Typography variant="body1" sx={{ mb: 0 }}>
						{data.texto}
					</Typography>
				</CardContent>
				{/* </Paper> */}

				{/* Caja para comentar */}
				<Divider sx={{my: 5}} />

				<Box >
					<Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
						<TextField
							value={coment}
							onChange={handleChangeComent}
							label="Escribe aquí"
							variant="outlined"
							size="small"
							fullWidth
							multiline
						/>

					</Box>
					<Typography sx={{ mx: 1, mt: 1 }} type="caption" color={lenghtTexto > 90 ? "error" : "primary"}>{lenghtTexto}/100</Typography>
				</Box>
				<Box sx={{ display: "flex", gap: 2, alignItems: "flex-end", justifyContent:"flex-end" }}>
					
				<Button variant="contained" onClick={handleSendComent}>
					Comentar
				</Button>
				</Box>

				<Divider sx={{my: 5}} />
				

				{/* Comentarios */}
				<Box sx={{ mt: 3 }}>
					<Typography variant="h5" gutterBottom>
						Comentarios
					</Typography>

					<Divider sx={{my:2}}/>

					{comentarios.length === 0 && (
						<Typography variant="body2" color="text.secondary">
							Aún no hay comentarios.
						</Typography>
					)}
					<Grid container spacing={2}>
						{[...comentarios]
							.sort((a, b) => b.level - a.level)
							.map((c) => (
								<Grid size={{ xs: 12, md: 6 }} key={c.id_registro}>
									{/* <Card
										sx={{ mb: 1.5, p: 2, borderRadius: 2, bgcolor: "background.default" }}
									> */}
										<Box sx={{ display: "flex", alignItems: "center", mb: 1, justifyContent: "space-between" }}>
											<Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
												<Avatar
													sx={{ bgcolor: getAvatarColor(c.level), fontWeight: "bold", width: 35, height: 35, mr: 1.5 }}
												>
													{formatLevel(c.level)}
												</Avatar>
												<Typography variant="body2" color="text.secondary">
													{c.date}
												</Typography>
											</Box>

											{/* Reacciones del comentario */}
											<Box>
												{[
													{ key: "fire", icon: <FavoriteIcon fontSize="small" color="error" />, label: "Buen aporte" },
												].map(({ key, icon, label }) => {
													const commentKey = `${postKey}_${c.id_registro}`;
													const reacted = userHasReacted(key, commentKey);
													return (
														<Tooltip key={key} title={reacted ? "Ya reaccionaste" : label}>
															<span>
																<IconButton
																	size="small"
																	onClick={() => handleReaction(c.id_registro, "comentario")}
																	disabled={reacted}
																	sx={{ opacity: reacted ? 0.4 : 1 }}
																>
																	<Badge badgeContent={c.reactions?.[key] || 0} color="primary" overlap="circular">
																		{icon}
																	</Badge>
																</IconButton>
															</span>
														</Tooltip>
													);
												})}
											</Box>
										</Box>

										<Typography variant="body2" color="text.primary" sx={{ mb: 1, p: 2 }}>
											{c.texto}
										</Typography>
									{/* </Card> */}
									<Divider sx={{my: 2}} />
								</Grid>
							))}
					</Grid>
				</Box>
			</Box>
		</Modal>
	);
}
