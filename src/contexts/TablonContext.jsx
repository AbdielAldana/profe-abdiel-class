import React, { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useCookies } from "react-cookie";

const TablonContext = React.createContext(null);


export function TablonProvider({ children, initial }) {
    const [cookies, setCookie] = useCookies(["matricula_actual"]);

    const notifyError = (txt) =>
        toast.error(txt, { position: "top-center" });

    const [misiones, setMisiones] = React.useState(initial.misiones);
    const [usuarios, setUsuarios] = React.useState(initial.usuarios);
    const [misionesUsuario, setMisionesUsuario] = React.useState(initial.misionesUsuario);
    const [usuario, setUsuario] = React.useState(initial.usuario)
    const [matricula, setMatricula] = React.useState(initial.matricula)
    const [recompensas, setRecompensas] = React.useState(initial.recompensas)
    const [inventario, setInventario] = React.useState(initial.inventario)
    const [tipo_entrega] = React.useState(initial.tipo_entrega);


    const [adminInfo, setAdminInfo] = React.useState(initial.adminInfo)

    useEffect(() => {
        if (cookies.matricula_actual) {
            getUsuario(cookies.matricula_actual, true, false)
        }
        // eslint-disable-next-line
    }, [])

    // ==============================================================================
    // Usuario

    // GET Usuario
    const getUsuario = async (ma, okMa, update) => {
        // ma       = Matricula
        // okMa     = false, Modifica Matricula | true, deja matricula actual [cookies]
        // update   = true, Usuario Actualizado | false, Inicio de Sesion
        const text = update ? "Usuario Actualizado" : "Usuario Cargado"
        try {
            const res = await toast.promise(
                axios.get(
                    `${process.env.REACT_APP_GREMIO_API_URL}/get_usuario.php`,
                    { params: { matricula: ma } }
                ),
                {
                    pending: "Cargando usuario...",
                    success: text,
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            setUsuario(res.data.usuario);
            setMatricula(res.data.usuario.matricula);

            if (!okMa) {
                setCookie("matricula_actual", res.data.usuario.matricula, {
                    path: "/",
                    maxAge: 60 * 60 * 24,
                });
            }

            setMisionesUsuario(res.data.usuario.misiones);
            setInventario(res.data.usuario.inventario);

            return res.data;
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Algo salio mal");
            return { ok: false };
        }
    };

    // POST Usuario Nuevo
    const postUsuarioNuevo = async (data) => {
        try {
            const fd = new FormData();
            fd.append("matricula", data.matricula);
            fd.append("nombre", data.nombre);
            fd.append("nickname", data.nickname);
            fd.append("color", data.color);

            // data.imagen debe ser File (de input type="file")
            fd.append("imagen", data.imagen);

            const res = await toast.promise(
                axios.post(
                    `${process.env.REACT_APP_GREMIO_API_URL}/post_usuario.php`,
                    fd
                ),
                {
                    pending: "Creando Usuario...",
                    success: "Usuario Creado",
                    error: "No se pudo crear usuario",
                },
                { position: "top-center" }
            );

            // notifySuccess(res.data.msg);
            setUsuario(res.data.usuario);
            setMatricula(res.data.usuario.matricula);
            setCookie("matricula_actual", res.data.usuario.matricula, {
                path: "/",
                maxAge: 60 * 60 * 24,
            });

            return res.data; // opcional
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Error al crear usuario");
            return { ok: false, msg: err?.response?.data?.msg };
        }
    };

    // ==============================================================================
    // Inventario

    // POST Donacion
    const postDonacion = async (data) => {
        try {
            const res = await toast.promise(
                axios.post(
                    `${process.env.REACT_APP_GREMIO_API_URL}/post_donar.php`,
                    data
                ),
                {
                    pending: "Procesando...",
                    success: "Donacion Exitosa",
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            // notifySuccess(res.data.msg);
            getUsuario(matricula, false, true)

            return res.data.ok; // opcional
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Error al crear usuario");
            return err?.response?.data.ok;
        }
    };

    // POST Venta
    const postVenta = async (data) => {
        try {
            const res = await toast.promise(
                axios.post(
                    `${process.env.REACT_APP_GREMIO_API_URL}/post_venta.php`,
                    data
                ),
                {
                    pending: "Procesando...",
                    success: "Donacion Exitosa",
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            getUsuario(matricula, false, true)

            return res.data.ok; // opcional
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Error al crear usuario");
            return err?.response?.data.ok;
        }
    };

    // POST Retirar Venta
    const retirarVenta = async (data) => {
        try {
            const res = await toast.promise(
                axios.post(
                    `${process.env.REACT_APP_GREMIO_API_URL}/post_retirar_venta.php`,
                    data
                ),
                {
                    pending: "Procesando...",
                    success: "Articulo recuperado",
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            getUsuario(matricula, false, true)

            return res.data.ok; // opcional
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Error al crear usuario");
            return err?.response?.data.ok;
        }
    };

    // POST Usar Producto
    const usarProducto = async (data) => {
        try {
            const res = await toast.promise(
                axios.post(
                    `${process.env.REACT_APP_GREMIO_API_URL}/post_usar.php`,
                    data
                ),
                {
                    pending: "Procesando...",
                    success: "Articulo Usado",
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            getUsuario(matricula, false, true)

            return res.data.ok; // opcional
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Error al crear usuario");
            return err?.response?.data.ok;
        }
    };

    // POST Quitar Fijo
    const quitarFijo = async (data) => {
        try {
            const res = await toast.promise(
                axios.post(
                    `${process.env.REACT_APP_GREMIO_API_URL}/post_quitar_fijo.php`,
                    data
                ),
                {
                    pending: "Procesando...",
                    success: "Articulo retirado",
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            getUsuario(matricula, false, true)

            return res.data.ok; // opcional
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Error al crear usuario");
            return err?.response?.data.ok;
        }
    };

    // ==============================================================================
    // Tienda

    // GET Lista de Tienda
    const getRecompensas = async () => {
        try {
            const res = await toast.promise(
                axios.get(
                    `${process.env.REACT_APP_GREMIO_API_URL}/get_recompensas.php`
                ),
                {
                    pending: "Cargando Tienda",
                    success: "Tienda Cargada",
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            // notifySuccess("Sesion Iniciada");
            setRecompensas(res.data.recompensas);

            return res.data;
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Algo salio mal");
            return { ok: false };
        }
    };

    // POST Comprar Tienda
    const comprarTienda = async (data) => {
        try {
            const res = await toast.promise(
                axios.post(
                    `${process.env.REACT_APP_GREMIO_API_URL}/post_comprar_tienda.php`,
                    data
                ),
                {
                    pending: "Cargando Tienda",
                    success: "Tienda Cargada",
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            // notifySuccess("Sesion Iniciada");
            getUsuario(matricula, true, true);
            getRecompensas()

            return res.data;
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Algo salio mal");
            return { ok: false };
        }
    };

    // ==============================================================================
    // Misiones

    // GET Misiones
    const getMisiones = async () => {
        if (usuario !== null) {
            try {
                const res = await toast.promise(
                    axios.get(
                        `${process.env.REACT_APP_GREMIO_API_URL}/get_misiones_disponibles.php`,
                        { params: { matricula: usuario.matricula } }
                    ),
                    {
                        pending: "Cargando Tienda",
                        success: "Tienda Cargada",
                        error: "No se pudo :(",
                    },
                    { position: "top-center" }
                );

                // notifySuccess("Sesion Iniciada");
                setMisiones(res.data.misiones);

                return res.data;
            } catch (err) {
                console.log("Error:", err?.response?.data || err.message);
                notifyError(err?.response?.data?.msg || "Algo salio mal");
                return { ok: false };
            }
        } else {
            try {
                const res = await toast.promise(
                    axios.get(
                        `${process.env.REACT_APP_GREMIO_API_URL}/get_misiones_disponibles.php`
                    ),
                    {
                        pending: "Cargando Tienda",
                        success: "Tienda Cargada",
                        error: "No se pudo :(",
                    },
                    { position: "top-center" }
                );

                // notifySuccess("Sesion Iniciada");
                setMisiones(res.data.misiones);

                return res.data;
            } catch (err) {
                console.log("Error:", err?.response?.data || err.message);
                notifyError(err?.response?.data?.msg || "Algo salio mal");
                return { ok: false };
            }
        }
    };

    // POST Completar Mision
    const canjearMision = async (data) => {
        try {
            const res = await toast.promise(
                axios.post(
                    `${process.env.REACT_APP_GREMIO_API_URL}/post_canjear_mision.php`,
                    data
                ),
                {
                    pending: "Validando Mision",
                    success: "Mision Completada!",
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            // notifySuccess("Sesion Iniciada");
            getUsuario(matricula, true, true);
            getMisiones()
            getUsuariosR()

            return res.data;
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Algo salio mal");
            return { ok: false };
        }
    };

    // ==============================================================================
    // Ranking

    // GET Ranking
    const getUsuariosR = async () => {
        try {
            const res = await toast.promise(
                axios.get(
                    `${process.env.REACT_APP_GREMIO_API_URL}/get_usuarios_ranking.php`
                ),
                {
                    pending: "Cargando Tienda",
                    success: "Tienda Cargada",
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            // notifySuccess("Sesion Iniciada");
            setUsuarios(res.data.usuarios);

            return res.data;
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Algo salio mal");
            return { ok: false };
        }
    };

    // ==============================================================================
    // Admin

    // GET Admin Data
    const getAdminData = async () => {
        try {
            const res = await toast.promise(
                axios.get(
                    `${process.env.REACT_APP_GREMIO_API_URL}/get_admin_info.php`,
                    { params: { matricula: usuario.matricula } }
                ),
                {
                    pending: "Cargando Data",
                    success: "Data Cargada",
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            // notifySuccess("Sesion Iniciada");

            setAdminInfo(res.data);

            return res.data;
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Algo salio mal");
            return { ok: false };
        }
    };

    // POST Add Mision
    const postAddMisionAdmin = async (data) => {
        try {
            const res = await toast.promise(
                axios.post(
                    `${process.env.REACT_APP_GREMIO_API_URL}/post_mision_admin.php`,
                    data
                ),
                {
                    pending: "Procesando...",
                    success: "Mision Creada",
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            getAdminData()

            return res.data.ok; // opcional
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Error al crear usuario");
            return err?.response?.data.ok;
        }
    };

    // POST Reset Mision Periodica
    const postResetMisionPeriodicaAdmin = async (data) => {
        try {
            const res = await toast.promise(
                axios.post(
                    `${process.env.REACT_APP_GREMIO_API_URL}/post_reset_mision_admin.php`,
                    data
                ),
                {
                    pending: "Procesando...",
                    success: "Mision Reset",
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            getAdminData()

            return res.data.ok; // opcional
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Error al crear usuario");
            return err?.response?.data.ok;
        }
    };

    // POST Edit Mision
    const postEditMisionAdmin = async (data) => {
        try {
            const res = await toast.promise(
                axios.post(
                    `${process.env.REACT_APP_GREMIO_API_URL}/post_edit_mision_admin.php`,
                    data
                ),
                {
                    pending: "Procesando...",
                    success: "Mision Actualizada",
                    error: "No se pudo :(",
                },
                { position: "top-center" }
            );

            getAdminData()

            return res.data.ok; // opcional
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Error al crear usuario");
            return err?.response?.data.ok;
        }
    };


    // Actualiza Los datos
    const value = React.useMemo(() => ({
        // Estados Universales
        usuario, setUsuario,                    // ok
        matricula, setMatricula,                // ok
        misionesUsuario, setMisionesUsuario,    // ok
        inventario, setInventario,              // ok
        recompensas, setRecompensas,            // ok
        usuarios, setUsuarios,                  // ok
        misiones, setMisiones,

        // Api Calls Functions
        // Usuario
        getUsuario,         //ok
        postUsuarioNuevo,   //ok

        // Tienda
        getRecompensas,     //ok
        comprarTienda,      //ok

        // Inventario
        postDonacion,       //ok
        postVenta,          //ok
        retirarVenta,       //ok
        usarProducto,       //ok
        quitarFijo,         //ok

        // Ranking
        getUsuariosR,       //ok

        // Misiones
        getMisiones,
        canjearMision,

        // Admin
        adminInfo, setAdminInfo,        //ok
        getAdminData,                   //ok
        postAddMisionAdmin,             //ok
        postResetMisionPeriodicaAdmin,  //ok
        postEditMisionAdmin,            //ok

        // Estaticos
        tipo_entrega,
        // eslint-disable-next-line
    }), [misiones, usuarios, usuario, recompensas, misionesUsuario, matricula, inventario, adminInfo]);

    return <TablonContext.Provider value={value}>{children}</TablonContext.Provider>;
}

export function useTablon() {
    const ctx = React.useContext(TablonContext);
    if (!ctx) throw new Error("useTablon debe usarse dentro de <TablonProvider />");
    return ctx;
}
