import React, { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Box,
    Container,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, Home as HomeIcon } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
// import logo from "../../assets/logo.png";

const Layout = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <Box
            sx={{
                width: 250,
                p: 2,
                backgroundColor: "var(--background-color)",
            }}
        >
            <Typography
                variant="h6"
                sx={{ color: "var(--primary-color)", mb: 2 }}
            >
                VidTube
            </Typography>
            <List>
                <ListItem
                    button
                    onClick={() => {
                        navigate("/");
                        setMobileOpen(false);
                    }}
                >
                    <ListItemText
                        primary="Home"
                        sx={{ color: "var(--primary-color)" }}
                    />
                </ListItem>
                {user ? (
                    <>
                        <ListItem
                            button
                            onClick={() => {
                                navigate("/dashboard");
                                setMobileOpen(false);
                            }}
                        >
                            <ListItemText
                                primary="Dashboard"
                                sx={{ color: "var(--primary-color)" }}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                navigate(`/c/${user.username}`);
                                setMobileOpen(false);
                            }}
                        >
                            <ListItemText
                                primary="Profile"
                                sx={{ color: "var(--primary-color)" }}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                handleLogout();
                                setMobileOpen(false);
                            }}
                        >
                            <ListItemText
                                primary="Logout"
                                sx={{ color: "var(--primary-color)" }}
                            />
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem
                            button
                            onClick={() => {
                                navigate("/login");
                                setMobileOpen(false);
                            }}
                        >
                            <ListItemText
                                primary="Login"
                                sx={{ color: "var(--primary-color)" }}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                navigate("/register");
                                setMobileOpen(false);
                            }}
                        >
                            <ListItemText
                                primary="Register"
                                sx={{ color: "var(--primary-color)" }}
                            />
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <Box
            sx={{
                backgroundColor: "var(--background-color)",
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Navigation Bar */}
            <AppBar
                position="sticky"
                sx={{
                    width: "100%",
                    backgroundColor: "var(--primary-color)",
                }}
            >
                <Toolbar sx={{ flexWrap: "wrap" }}>
                    {isMobile && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                        }}
                    >
                        <img
                            src=""
                            alt="VidTube Logo"
                            style={{ height: 40, marginRight: 8 }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#fcffff",
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            VidTube
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    {!isMobile && (
                        <>
                            {user ? (
                                <>
                                    <Button
                                        color="inherit"
                                        onClick={() => navigate("/dashboard")}
                                        sx={{ color: "#fcffff", mx: 1 }}
                                    >
                                        Dashboard
                                    </Button>
                                    <Button
                                        color="inherit"
                                        onClick={() =>
                                            navigate(`/c/${user.username}`)
                                        }
                                        sx={{ color: "#fcffff", mx: 1 }}
                                    >
                                        Profile
                                    </Button>
                                    <Button
                                        color="inherit"
                                        onClick={handleLogout}
                                        sx={{ color: "#fcffff", mx: 1 }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        color="inherit"
                                        onClick={() => navigate("/login")}
                                        sx={{ color: "#fcffff", mx: 1 }}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        color="inherit"
                                        onClick={() => navigate("/register")}
                                        sx={{ color: "#fcffff", mx: 1 }}
                                    >
                                        Register
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    "& .MuiDrawer-paper": {
                        backgroundColor: "var(--background-color)",
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    mt: { xs: 2, sm: 3, md: 4 },
                    mb: 4,
                    flex: 1,
                    width: "100%",
                    maxWidth: "100%",
                    px: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Outlet />
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: { xs: 2, sm: 3 },
                    mt: "auto",
                    backgroundColor: "var(--primary-color)",
                    color: "#fcffff",
                    textAlign: "center",
                }}
            >
                <Typography variant="body2">
                    © {new Date().getFullYear()} VidTube - All rights reserved
                </Typography>
            </Box>
        </Box>
    );
};

export default Layout;
