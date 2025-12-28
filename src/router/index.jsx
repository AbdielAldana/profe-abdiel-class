// src/router/index.jsx (o donde lo tengas)
import { createBrowserRouter } from "react-router";
import App from "../App";
import Acerca from "../pages/acerca";
import ErrorPage from "../pages/ErrorPage";
import Inicio from "../pages/inicio";
import Materias from "../pages/materias";
import Biblioteca from "../pages/biblioteca";

// 👇 Importa cada página de materia
// import ProgramacionWeb from "../pages/materias/ProgramacionWeb";
// import TecnicasAnimacion from "../pages/materias/TecnicasAnimacion";
// import DisenoApps from "../pages/materias/DisenoApps";
// import Mercadotecnia from "../pages/materias/Mercadotecnia";
// import DisenoEditorial from "../pages/materias/DisenoEditorial";
// import AnimacionFlash from "../pages/materias/AnimacionFlash";
// import DisenoMultimedia from "../pages/materias/DisenoMultimedia";
// import PortafolioProfesional from "../pages/materias/PortafolioProfesional";
import Chismes from "../pages/chismes";
import Tablon from "../pages/tablon";
import Misiones from "../pages/tablon/Misiones";
import Tienda from "../pages/tablon/Tienda";
import Ranking from "../pages/tablon/Ranking";
import Perfil from "../pages/tablon/Perfil";
import Admin from "../pages/tablon/Admin";
import Normas from "../pages/normas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,              // Layout principal
    errorElement: <ErrorPage />,   // Página de error global
    children: [
      { index: true, element: <Inicio /> },

      { path: "/acerca", element: <Acerca /> },
      { path: "/materias", element: <Materias /> },
      { path: "/biblioteca", element: <Biblioteca /> },
      { path: "/chismes", element: <Chismes /> },
      { path: "/informacion", element: <Normas /> },
      // { path: "/tablon_de_misiones", element: <Tablon/> },
      {
        path: "/tablon_de_misiones",
        element: <Tablon />,
        children: [
          { path: "misiones", element: <Misiones /> },
          { path: "tienda", element: <Tienda /> },
          { path: "perfil", element: <Perfil /> },
          { path: "ranking", element: <Ranking /> },
          { path: "admin", element: <Admin /> },
        ]
      }

      // 👇 Rutas individuales de materias
      // { path: "/materias/programacion-web", element: <ProgramacionWeb /> },
      // { path: "/materias/tecnicas-animacion", element: <TecnicasAnimacion /> },
      // { path: "/materias/diseno-apps", element: <DisenoApps /> },
      // { path: "/materias/mercadotecnia", element: <Mercadotecnia /> },
      // { path: "/materias/diseno-editorial", element: <DisenoEditorial /> },
      // { path: "/materias/animacion-flash", element: <AnimacionFlash /> },
      // { path: "/materias/diseno-multimedia", element: <DisenoMultimedia /> },
      // { path: "/materias/portafolio-profesional", element: <PortafolioProfesional /> },
    ],
  },
]);

export default router;
