// Utilidades
import * as React from 'react';
// import "./App.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';

import { NavLink, useLocation } from "react-router";

// List
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Iconos
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ElderlyIcon from '@mui/icons-material/Elderly';
import ContrastIcon from '@mui/icons-material/Contrast';
import SettingsIcon from '@mui/icons-material/Settings';
import ForumIcon from '@mui/icons-material/Forum';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { GiBookmark } from "react-icons/gi";

function Navbar(params) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        window.dispatchEvent(new Event("auth-change"));
        handleCloseUserMenu()
        params.navigate("/login");
    };


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    return (
        <AppBar position="fixed">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    {/* <LogoDevIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >


                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} >
                            Abdiel Aldana
                        </NavLink>
                    </Typography>
                    {/* Celular */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={toggleDrawer(true)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {/* {DrawerList} */}
                            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                                <List>
                                    <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} >
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <MeetingRoomIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"Abdiel Aldana"} />
                                            </ListItemButton>
                                        </ListItem>
                                    </NavLink>
                                    <Divider />
                                    <NavLink to="/biblioteca" className={({ isActive }) => isActive ? "active" : ""} >
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <PictureAsPdfIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"Biblioteca"} />
                                            </ListItemButton>
                                        </ListItem>
                                    </NavLink>
                                    <NavLink to="/tablon_de_misiones" className={({ isActive }) => isActive ? "active" : ""} >
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <GiBookmark style={{fontSize: "25px"}} />
                                                </ListItemIcon>
                                                <ListItemText primary={"Gremio"} />
                                            </ListItemButton>
                                        </ListItem>
                                    </NavLink>
                                    <Divider />
                                    <NavLink to="/chismes" className={({ isActive }) => isActive ? "active" : ""} >
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <ForumIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"Foro"} />
                                            </ListItemButton>
                                        </ListItem>
                                    </NavLink>
                                    <Divider />
                                    <NavLink to="/acerca" className={({ isActive }) => isActive ? "active" : ""} >
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <ElderlyIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"Sobre mi"} />
                                            </ListItemButton>
                                        </ListItem>
                                    </NavLink>

                                </List>
                            </Box>
                        </Drawer>
                    </Box>
                    {/* <LogoDevIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} >
                            Abdiel Aldana
                        </NavLink>
                    </Typography>

                    {/* Escritorio */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>



                        <NavLink to="/biblioteca" className={({ isActive }) => isActive ? "active" : ""} >
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Biblioteca
                            </Button>
                        </NavLink>
                        <NavLink to="/tablon_de_misiones" className={({ isActive }) => isActive ? "active" : ""} >
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Gremio
                            </Button>
                        </NavLink>
                        <NavLink to="/chismes" className={({ isActive }) => isActive ? "active" : ""} >
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Foro
                            </Button>
                        </NavLink>

                        {/* <NavLink to="/materias" className={({ isActive }) => isActive ? "active" : ""} >
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Materias
                            </Button>
                        </NavLink> */}
                        <NavLink to="/acerca" className={({ isActive }) => isActive ? "active" : ""} >
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Sobre mi
                            </Button>
                        </NavLink>
                        {/* <NavLink to="/nueva" className={({ isActive }) => isActive ? "active" : ""} >
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Acerca de
                            </Button>
                        </NavLink> */}


                    </Box>


                    {/* Usuario */}
                    <Box sx={{ flexGrow: 0 }} >
                        <Tooltip title="Open settings">
                            <IconButton color='white' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <SettingsIcon color='white2' />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem onClick={params.handleTheme}>
                                <Typography sx={{ textAlign: 'center' }}>Cambiar Tema <ContrastIcon /></Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar;