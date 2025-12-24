import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BottomNavigation, Divider } from '@mui/material';
import { useCookies } from "react-cookie";
import { Outlet, useNavigate, useNavigation } from "react-router";
// import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80vw",
    bgcolor: 'background.paper',
    maxHeight: "80vh",
    // border: '2px solid #000',
    boxShadow: 5,
    pt: 4,
    px: 4,
    overflow: "auto"
};

export default function ChismeAvisoModal() {
    const [cookies, setCookie] = useCookies(["gnomus_lex"]);
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    // 🔹 Inicializa cookie si no existe
    // Es para aceptar las cookies, si no te sacan de la pagina de chismes.
    React.useEffect(() => {
        if (!cookies.gnomus_lex) setCookie("gnomus_lex", false, { path: "/" });
        if (cookies.gnomus_lex) setOpen(false);
    }, []);

    const handleAcceptTerms = () => {
        setCookie("gnomus_lex", true, { path: "/", maxAge: 60 * 60 * 24 }); // 24h
        setOpen(false)
    }

    const handleDenegaTerms = () => {
        setCookie("gnomus_lex", false, { path: "/", maxAge: 1 }); // 24h
        navigate("/")
    }


    return (
        <>

            {/* <BottomNavigation showLabels> */}
            <BottomNavigationAction showLabel label="Aviso" icon={<PrivacyTipIcon />} onClick={handleOpen} />
            {/* </BottomNavigation> */}
            {/* <Button onClick={handleOpen} variant='outlined' color='warning'>Aviso y Reglas</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Typography variant="h5" fontWeight={"bold"} gutterBottom textAlign="center">
                        Bienvenido al Muro de los Chismes Anónimos
                    </Typography>
                    <Divider />
                    <br />
                    <Typography variant="p" gutterBottom textAlign="justify">
                        👉 Esta sección permite compartir mensajes 100 % anónimos con fines recreativos y humorísticos.
                        <br /><br />
                        👉 Queda prohibido compartir enlaces o redes sociales.
                        <br /><br />
                        👉 El contenido publicado proviene exclusivamente de los usuarios y no refleja las opiniones del sitio ni de su autor.
                        <br /><br />
                        👉 Se invita a los usuarios a no publicar información personal, nombres reales, acusaciones, insultos ni datos que puedan identificar a personas o instituciones.
                        <br /><br />
                        👉 Todos los mensajes pasan por un proceso de moderación.
                        <br /><br />
                        👉 No se permite contenido ilegal, difamatorio, amenazante, sensible o que pueda dañar a terceros.
                        <br /><br />
                        👉 Los mensajes no son verificados y deben considerarse como entretenimiento únicamente.
                        <br /><br />
                        👉 Solo se almacenan cookies básicas para mejorar la usabilidad y prevenir el spam; no se recopilan datos personales.
                        <br /><br />
                        👉 Al publicar un mensaje, aceptas estas condiciones y el derecho del administrador de modificar o eliminar contenido que las incumpla.
                        <br /><br />

                    </Typography>
                    <br />
                    <br />
                    <Divider />
                    <br />

                    <div style={{ display: "flex", justifyContent: "space-evenly", backgroundColor: "white", position: "sticky", bottom: 0, left: 0, width: "100%", padding: "10px" }}>
                        <Button onClick={handleDenegaTerms} size="small" variant="contained" color='error'>Rechazar</Button>
                        <Button onClick={handleAcceptTerms} size="small" variant="contained" color='success'>Aceptar</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
