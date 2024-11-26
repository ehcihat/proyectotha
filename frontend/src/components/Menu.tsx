
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Tooltip, Drawer, List, ListItem, ListItemText, ListItemIcon, ListItemButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import ReportIcon from '@mui/icons-material/Report';
import HelpIcon from '@mui/icons-material/Help';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AdbIcon from '@mui/icons-material/Adb';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Zoom from '@mui/material/Zoom';

const Menu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state: RootState) => state.authenticator);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const customColor = { '&:hover': { backgroundColor: 'info.main' } };
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const isLoggedin = userData.isAuthenticated

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        }
    }, [isLoggedin, navigate])

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };
    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate('/');
    };

    const handleDialogClose = () => {
        setOpenLogoutDialog(false);
    };

    const handleLogoutConfirmation = () => {
        handleLogout();
        setOpenLogoutDialog(false);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
            <List>

                <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem disablePadding>
                        <ListItemButton sx={customColor}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inicio" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                { userData.userRole === 'administrador' ? 
                <Link to="/reports" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem disablePadding>
                        <ListItemButton sx={customColor}>
                            <ListItemIcon>
                                <ReportIcon />
                            </ListItemIcon>
                            <ListItemText primary="Informes" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                : ""}

                <Link to="/errors" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem disablePadding>
                        <ListItemButton sx={customColor}>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ayuda" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                { userData.userRole === 'admin' ? 
                <Link to="/manager" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem disablePadding>
                        <ListItemButton sx={customColor}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gestión de Usuarios" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                    : ""}


                <ListItem disablePadding>
                    <ListItemButton sx={customColor} onClick={() => setOpenLogoutDialog(true)}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Salir" />
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    );
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ backgroundColor: "primary.main", pl: 5, pr: 5 }}>
                    <Toolbar >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, }}>
                            {userData.userName}
                        </Typography>
                        <Tooltip title={userData.userRole === 'admin' ? 'Admin' : 'Usuario'}
                            slots={{ transition: Zoom }}>

                                
                            {userData.userRole === 'admin' ? (
                                <AdminPanelSettingsIcon />
                            ) : (
                                <AdbIcon />
                          
                            )}
                            
                        </Tooltip>

                    </Toolbar>
                </AppBar>
            </Box>

            <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                {DrawerList}
            </Drawer>

            <Dialog
                open={openLogoutDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ pointerEvents: 'auto' }}
            >
                <DialogTitle>¿Desea cerrar la sesión?</DialogTitle>
                <DialogContent>
                    <Typography>Si cierras sesión, perderás tu sesión actual.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleLogoutConfirmation} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Menu;
