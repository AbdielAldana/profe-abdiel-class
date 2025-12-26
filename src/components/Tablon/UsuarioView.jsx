import { Grid, Typography } from "@mui/material"
import { getLevelData } from "../../utils/levelUtils";
import { useTablon } from "./TablonContext";

function UsuarioView({ user, id }) {
    const base = process.env.REACT_APP_GREMIO_API_URL;
    const { usuario } = useTablon();
    const xpTotal = user?.p_totales ?? 0;
        const { level, progreso, xpFaltante, earnedInLevel, cost } = getLevelData(xpTotal);

    const validateUser = () => {
        return user.id == usuario.id
    }

    const youruser = () => {
        let color = "#00000000"
        console.log(user.id == usuario.id);
        
        if(validateUser()){
            return user.color+""
        } else {
            return color
        }
    }
    return (
        <Grid container spacing={2} 
            style={{
                borderBottom: "5px solid" + user.color, 
                boxShadow: "0 0 5px " + youruser() }} 
            className={validateUser() ? "checkUser rowUser" : " rowUser"}
        >
            <Grid size={{ xs: 1, md: 1 }} display={"flex"} alignItems={"center"}>
                <Typography variant="h5" fontWeight={"bold"} className="textX">
                    {id + 1}
                </Typography>
            </Grid>
            <Grid size={{ xs: 3, md: 2 }} display={"flex"} justifyContent={"center"}>
                <div className="imgMin">
                    <div className={"tipo" + user.marco   }>
                        <div className="imagenPerfil " style={{ border: "solid 5px" + user.color, boxShadow: "0 0 5px" + user.color }}>
                            <img src={base + "/" + user.imagen_perfil} alt="" width={"100%"} />
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid size={{ xs: 5, md: 6 }} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                <Typography variant="h6" fontWeight={"bold"} className="textX">
                    {user.nickname}
                </Typography>
                <Typography variant="subtitle1" className="textX">
                    <b>{user.p_totales}</b> puntos
                </Typography>
            </Grid>
            <Grid size={{ xs: 3, md: 3 }} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Typography variant="h6" fontWeight={"bold"} className="textX">
                    {level}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default UsuarioView