import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import ChismeAvisoModal from "./ChismeAvisoModal";

function NavbarBottom(params) {

    return (
        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, pb: "env(safe-area-inset-bottom)", zIndex: 888 }} >
            <Box maxWidth="xxl">
                <BottomNavigation showLabels>
                    <ChismeAvisoModal />
                    <BottomNavigationAction
                        label="Publicar"
                        icon={<AddCircleIcon color="secondary" />}
                        onClick={params.onOpenComent}
                    />
                    <BottomNavigationAction
                        label="Quejas"
                        icon={<DeleteForeverIcon />}
                        onClick={params.onOpenMail}
                    />
                </BottomNavigation>
            </Box>
        </Paper>
    );
}

export default NavbarBottom;