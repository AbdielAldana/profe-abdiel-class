import * as React from "react";
import {
	Card,
	CardHeader,
	CardContent,
	Avatar,
	Typography,
	Grid,
	Box,
	CardActionArea,
	CardActions,
	IconButton,
} from "@mui/material";
import { red, green, yellow, grey } from "@mui/material/colors";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChismeModal from "./ChismeModal";

export default function Chisme({ data, pass, refreshChismes }) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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



	// ---- Texto de comentarios ----
	const commentCount = data.comentarios?.length || 0;
	const commentLabel =
		commentCount === 1
			? "1"
			: `${commentCount}`;

	const [selectedCard, setSelectedCard] = React.useState(0);


	return (
		<>
			<Grid item size={{ xs: 12, md: 6 }}>
				<Card


				>
					<CardHeader
						sx={{
							display: "flex",
							alignItems: "center",
						}}
						avatar={
							<Avatar
								sx={{
									bgcolor: getAvatarColor(data.level),
									fontWeight: "bold",
									width: 45,
									height: 45,
								}}
								aria-label="level"
							>
								{formatLevel(data.level)}
							</Avatar>
						}
						// action={

						// }
						title={<Typography variant="body2" color="text.secondary"> {data.topic}/ <b>{data.titulo}</b> </Typography>}
						subheader={data.date.split(" ")[0] + " - " + data.id_registro}
					/>
					<CardActionArea
						onClick={handleOpen}
						sx={{

							// boxShadow: 1,
							cursor: "pointer",
							"&:hover": { boxShadow: 3 },
						}}
					>


						<CardContent>
							<Typography variant="body2" color="text.secondary">
								{data.texto.length > 100
									? data.texto.slice(0, 100) + "..."
									: data.texto}
							</Typography>
						</CardContent>
					
					<CardActions style={{display: "flex", justifyContent: "flex-end"}}>
						<IconButton>
							<Box
								onClick={handleOpen}
								sx={{
									display: "flex",
									alignItems: "center",
									height: "100%",
									// gap: 0.5,
									color: "text.secondary",
									cursor: "pointer",
									// pr: 1,
									// mt: 2,
									"&:hover": { color: "black" },
								}}
							>								
								<FavoriteIcon />
								<Typography variant="body1">{data.reactions.fire}</Typography>
							</Box>
						</IconButton>
						<IconButton>
							<Box
								onClick={handleOpen}
								sx={{
									display: "flex",
									alignItems: "center",
									height: "100%",
									// gap: 0.5,
									color: "text.secondary",
									cursor: "pointer",
									// pr: 1,
									// mt: 2,
									"&:hover": { color: "black" },
								}}
							>
								<ChatBubbleOutlineIcon  />
								<Typography variant="body1">{commentLabel}</Typography>
							</Box>
						</IconButton>
					</CardActions>
					</CardActionArea>
				</Card>
			</Grid>

			{/* Modal del chisme */}
			<ChismeModal
				key={`${data.id_registro}-${data.comentarios_count ?? 0}-${data.reactions_count ?? 0}-${data.updated_at ?? 0}`}
				open={open}
				onClose={handleClose}
				data={data}
				pass={pass}
				refreshChismes={refreshChismes}
			/>
		</>
	);
}
