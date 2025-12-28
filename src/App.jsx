
// Utilidades
import * as React from 'react';
import "./App.css";
import "./App.scss";
import Container from '@mui/material/Container';


import { Outlet, useNavigate, useNavigation, useLocation  } from "react-router";
// import useAuth from "./hooks/useAuth";
// import { logout } from "./utils/auth";

// Estilos
import { ThemeProvider, createTheme, getContrastRatio  } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


import { useCookies } from 'react-cookie';
import Navbar from './components/Navbar';
// import NavbarBottom from './components/NavbarBottom';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#677d89ff',
      contrastText: getContrastRatio("#344955", '#fff') > 4.5 ? '#fff' : '#111',
    },
    secondary: {
      main: '#f9aa33',
      contrastText: getContrastRatio("#f9aa33", '#fff') > 4.5 ? '#fff' : '#111',
    },
    white2: {
      main: '#fff',
      contrastText: getContrastRatio("#fff", '#fff') > 4.5 ? '#fff' : '#111',
    },
    comun: {
      main: '#9E9E9E',
      contrastText: getContrastRatio("#9E9E9E", '#fff') > 4.5 ? '#fff' : '#111',
    },
    pcomun: {
      main: '#4CAF50',
      contrastText: getContrastRatio("#4CAF50", '#fff') > 4.5 ? '#fff' : '#111',
    },
    raro: {
      main: '#2196F3',
      contrastText: getContrastRatio("#2196F3", '#fff') > 4.5 ? '#fff' : '#111',
    },
    epico: {
      main: '#9C27B0',
      contrastText: getContrastRatio("#9C27B0", '#fff') > 4.5 ? '#fff' : '#111',
    },
    legendario: {
      main: '#FF9800',
      contrastText: getContrastRatio("#FF9800", '#fff') > 4.5 ? '#fff' : '#111',
    },
    mitico: {
      main: '#F44336',
      contrastText: getContrastRatio("#F44336", '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});
const theme2 = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#344955',
      contrastText: getContrastRatio("#344955", '#fff') > 4.5 ? '#fff' : '#111',
    },
    secondary: {
      main: '#f9aa33',
      contrastText: getContrastRatio("#f9aa33", '#fff') > 4.5 ? '#fff' : '#111',
    },
    white2: {
      main: '#fff',
      contrastText: getContrastRatio("#fff", '#fff') > 4.5 ? '#fff' : '#111',
    },
    comun: {
      main: '#9E9E9E',
      contrastText: '#fff',
    },
    pcomun: {
      main: '#4CAF50',
      contrastText: getContrastRatio("#4CAF50", '#fff') > 4.5 ? '#fff' : '#111',
    },
    raro: {
      main: '#2196F3',
      contrastText: getContrastRatio("#2196F3", '#fff') > 4.5 ? '#fff' : '#111',
    },
    epico: {
      main: '#9C27B0',
      contrastText: getContrastRatio("#9C27B0", '#fff') > 4.5 ? '#fff' : '#111',
    },
    legendario: {
      main: '#FF9800',
      contrastText: getContrastRatio("#FF9800", '#fff') > 4.5 ? '#fff' : '#111',
    },
    mitico: {
      main: '#F44336',
      contrastText: "#fff",
    },
  },
});

export default function ButtonAppBar() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // o "smooth" si quieres animación
    });
  }, [pathname]);

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [themeSelect, setThemeSelect] = React.useState(theme2);
  const [cookies, setCookie] = useCookies(["theme"]);

  // React.useEffect(() => {
  //   if (cookies.theme) {
  //     if (cookies.theme === 'light') {
  //       setThemeSelect(theme2)
  //     } else {
  //       setThemeSelect(theme)
  //     }
  //   } else {
  //     setCookie('theme', 'light', { path: '/' });
  //     setThemeSelect(theme2)
  //   }
  // }, [])

  const handleTheme = () => {
    if (cookies.theme === 'light') {
      setCookie('theme', 'dark', { path: '/' });
      setThemeSelect(theme)
    } else {
      setCookie('theme', 'light', { path: '/' });
      setThemeSelect(theme2)
    }
  }

  // const isAuth = useAuth();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={themeSelect}>
      <CssBaseline />
      <Navbar navigate={navigate} handleTheme={handleTheme} />
      <main>
        <div className="espaciobar"></div>
        <Container maxWidth="lg">
          {isLoading && (
            <div className="loading">
              Cargando
            </div>
          )}
          <Outlet />
        </Container>
      </main>
      <div className="espaciobar"></div>
      {/* <NavbarBottom navigate={navigate} /> */}
    </ThemeProvider>
  );
}

