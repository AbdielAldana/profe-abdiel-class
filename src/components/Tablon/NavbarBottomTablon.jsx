import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import AssignmentIcon from '@mui/icons-material/Assignment';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StoreIcon from '@mui/icons-material/Store';

import { NavLink } from "react-router";

function NavbarBottomTablon() {
    return (
        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, pb: "env(safe-area-inset-bottom)", zIndex: 888 }} >
            <Box maxWidth="xxl">
                <BottomNavigation showLabels>
                    <BottomNavigationAction
                        label="Perfil"
                        icon={<FaceRetouchingNaturalIcon color="primary" />}
                        component={NavLink}
                        to="perfil"
                        className={({ isActive }) => isActive ? "active" : ""}
                    />
                    <BottomNavigationAction
                        label="Tienda"
                        icon={<StoreIcon color="primary" />}
                        component={NavLink}
                        to="tienda"
                        className={({ isActive }) => isActive ? "active" : ""}
                    />
                    <BottomNavigationAction
                        label="Misiones"
                        icon={<AssignmentIcon color="primary" />}
                        component={NavLink}
                        to="misiones"  
                        className={({ isActive }) => isActive ? "active" : ""}
                    />
                    <BottomNavigationAction
                        label="Ranking"
                        icon={<EmojiEventsIcon color="primary" />}
                        component={NavLink}
                        to="ranking"
                        className={({ isActive }) => isActive ? "active" : ""}
                    />
                </BottomNavigation>
            </Box>
        </Paper>
    );
}

export default NavbarBottomTablon;