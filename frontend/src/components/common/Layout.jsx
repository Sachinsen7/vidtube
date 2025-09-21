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
import { Menu as MenuIcon } from "@mui/icons-material";
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
                background: "linear-gradient(135deg, #fcffff 0%, #e6f0fa 100%)",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    color: "var(--primary-color)",
                    mb: 2,
                    fontWeight: "bold",
                }}
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
                {user && (
                    <>
                        <ListItem
                            button
                            onClick={() => {
                                navigate("/subscriptions");
                                setMobileOpen(false);
                            }}
                        >
                            <ListItemText
                                primary="Subscriptions"
                                sx={{ color: "var(--primary-color)" }}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                navigate("/videos");
                                setMobileOpen(false);
                            }}
                        >
                            <ListItemText
                                primary="Your Videos"
                                sx={{ color: "var(--primary-color)" }}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                navigate("/upload");
                                setMobileOpen(false);
                            }}
                        >
                            <ListItemText
                                primary="Upload Video"
                                sx={{ color: "var(--primary-color)" }}
                            />
                        </ListItem>
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
                                navigate("/profile");
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
                )}
                {!user && (
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
                background: "linear-gradient(135deg, #fcffff 0%, #e6f0fa 100%)",
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppBar
                position="sticky"
                sx={{
                    width: "100%",
                    background:
                        "linear-gradient(45deg, var(--primary-color) 30%, var(--secondary-color) 90%)",
                    boxShadow: "0 6px 20px rgba(4, 54, 100, 0.15)",
                }}
            >
                <Toolbar sx={{ flexWrap: "wrap" }}>
                    {isMobile && (
                        <IconButton
                            edge="start"
                            sx={{ color: "#fcffff", mr: 2 }}
                            onClick={handleDrawerToggle}
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
                            // +                            src={undefined}
                            alt="VidTube Logo"
                            style={{ height: 40, marginRight: 8 }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#fcffff",
                                display: { xs: "none", sm: "block" },
                                fontWeight: "bold",
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
                                        sx={{
                                            color: "#fcffff",
                                            mx: 1,
                                            "&:hover": {
                                                background:
                                                    "rgba(255, 255, 255, 0.1)",
                                            },
                                        }}
                                        onClick={() =>
                                            navigate("/subscriptions")
                                        }
                                    >
                                        Subscriptions
                                    </Button>
                                    <Button
                                        sx={{
                                            color: "#fcffff",
                                            mx: 1,
                                            "&:hover": {
                                                background:
                                                    "rgba(255, 255, 255, 0.1)",
                                            },
                                        }}
                                        onClick={() => navigate("/videos")}
                                    >
                                        Your Videos
                                    </Button>
                                    <Button
                                        sx={{
                                            color: "#fcffff",
                                            mx: 1,
                                            "&:hover": {
                                                background:
                                                    "rgba(255, 255, 255, 0.1)",
                                            },
                                        }}
                                        onClick={() => navigate("/upload")}
                                    >
                                        Upload Video
                                    </Button>
                                    <Button
                                        sx={{
                                            color: "#fcffff",
                                            mx: 1,
                                            "&:hover": {
                                                background:
                                                    "rgba(255, 255, 255, 0.1)",
                                            },
                                        }}
                                        onClick={() => navigate("/dashboard")}
                                    >
                                        Dashboard
                                    </Button>
                                    <Button
                                        sx={{
                                            color: "#fcffff",
                                            mx: 1,
                                            "&:hover": {
                                                background:
                                                    "rgba(255, 255, 255, 0.1)",
                                            },
                                        }}
                                        onClick={() => navigate("/profile")}
                                    >
                                        Profile
                                    </Button>
                                    <Button
                                        sx={{
                                            color: "#fcffff",
                                            mx: 1,
                                            "&:hover": {
                                                background:
                                                    "rgba(255, 255, 255, 0.1)",
                                            },
                                        }}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        sx={{
                                            color: "#fcffff",
                                            mx: 1,
                                            "&:hover": {
                                                background:
                                                    "rgba(255, 255, 255, 0.1)",
                                            },
                                        }}
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        sx={{
                                            color: "#fcffff",
                                            mx: 1,
                                            "&:hover": {
                                                background:
                                                    "rgba(255, 255, 255, 0.1)",
                                            },
                                        }}
                                        onClick={() => navigate("/register")}
                                    >
                                        Register
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    "& .MuiDrawer-paper": {
                        background:
                            "linear-gradient(135deg, #fcffff 0%, #e6f0fa 100%)",
                        boxShadow: "0 6px 20px rgba(4, 54, 100, 0.15)",
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            <Container
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
            </Container>

            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: { xs: 2, sm: 3 },
                    mt: "auto",
                    background:
                        "linear-gradient(45deg, var(--primary-color) 30%, var(--secondary-color) 90%)",
                    color: "#fcffff",
                    textAlign: "center",
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
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
