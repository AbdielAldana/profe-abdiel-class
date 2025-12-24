// ReactJS
import React, { useEffect, useRef } from "react";

// Material UI
import {
    Grid,
    Paper,
    Typography,
    Button,
    MenuItem,
    Divider,
    Modal,
    TextField,
    Chip,
    Slider,
} from "@mui/material";
import Fab from '@mui/material/Fab';
import Autocomplete from '@mui/material/Autocomplete';

// Componentes Generales
import { useTablon } from "../../components/Tablon/TablonContext"; // ajusta
import { useCookies } from "react-cookie";
import axios, { all } from "axios";
import { ToastContainer, toast } from "react-toastify";
import { data, Outlet } from "react-router";
import { useNavigate } from "react-router";

// Componentes Propios
// import NavbarBottomTablon from "../components/Tablon/NavbarBottomTablon";

// Icons
import CloseIcon from '@mui/icons-material/Close';
import Mision from "../../components/Tablon/Misiones/Mision";
import ModalMision from "../../components/Tablon/Modals/ModalMision";

function Ranking(params) {
    const { misiones, usuarios, dificultad, tipo_entrega, setMisiones, setUsuarios } = useTablon();
    const [cookies, setCookie] = useCookies(["matricula_actual"]);
    return (
        <div>Ranking</div>
    )
}

export default Ranking