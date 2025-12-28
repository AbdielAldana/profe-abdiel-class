import React, { useEffect, useState } from "react";
import { Outlet, useNavigate  } from "react-router";
import { useCookies } from "react-cookie";
import { ToastContainer} from "react-toastify";

import { TablonProvider } from "../contexts/TablonContext";
import NavbarBottomTablon from "../components/Tablon/NavbarBottomTablon";

const tipo_entrega = [
	{ id: 0, nombre: "Imagen", accept: "image/*" },
	{ id: 1, nombre: "PDF", accept: "application/pdf" },
	{ id: 2, nombre: "ZIP", accept: ".zip" },
	{ id: 3, nombre: "Enlace", accept: null },
	{ id: 4, nombre: "Codigo", accept: "string" }, // ojo: tenías "sring"
];

const demo = [
	{
		id_mision: 0,
		dificultad: 0,
		nombre: "",
		subNombre: "",
		puntos: 0,
		lore: "",
		objetivo: "",
		requisitos: [],
		tipoEntrega: 0,
		fechaInicioGlobal: "2025-12-16 00:00:00",
		fechaFinGlobal: "2025-12-16 08:59:59",
		visible: true,
	},
];

export default function Tablon() {
	const [cookies, setCookie] = useCookies(["matricula_actual"]);
	const navigate = useNavigate();

	const [misiones] = useState(demo);
	const [recompensas] = useState(null);
	const [usuarios] = useState(null);

	const [matricula, setMatricula] = useState(null);
	const [usuario] = useState(null);
	const [misionesUsuario] = useState(demo);
	const [inventario] = useState(null);

	const [adminInfo] = useState(null);

	useEffect(() => {
        if (!cookies.matricula_actual) {
            setCookie("matricula_actual", null, { path: "/", maxAge: 60 * 60 * 24 })
            navigate("/tablon_de_misiones/Perfil");
            return
        };
        if (cookies.matricula_actual !== null) {
            setMatricula(cookies.matricula_actual)
            navigate("/tablon_de_misiones/Perfil");
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

	return (
		<div>
			<TablonProvider
				initial={{
					misiones,
					usuarios,
					tipo_entrega,
					usuario,
					recompensas,
					misionesUsuario,
					matricula,
					inventario,
					adminInfo,
				}}
			>
				<Outlet />
				<NavbarBottomTablon />
			</TablonProvider>

			<ToastContainer autoClose={1000} />
		</div>
	);
}
