import { NavLink } from "react-router";
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#344955',
        },
        secondary: {
            main: '#f9aa33',
        },
    },
});

function ErrorPage() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="loading">
                Pagina no existente...
                <NavLink to="/">
                    <Button variant="contained" color="secondary">Regresar</Button>
                </NavLink>
            </div>
        </ThemeProvider>
    )
}

export default ErrorPage