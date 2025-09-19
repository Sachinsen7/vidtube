import React, { useState } from "react";
import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Menu as MenuIcon, Home as HomeIcon } from "@mui/icons-material";
import SearchBar from "../components/common/SearchBar";
import VideoList from "../components/dashboard/VideoList";
// import logo from "../assets/logo.png";

const Home = () => {
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
                <ListItem button onClick={() => navigate("/")}>
                    <ListItemText
                        primary="Home"
                        sx={{ color: "var(--primary-color)" }}
                    />
                </ListItem>
                {user ? (
                    <>
                        <ListItem button onClick={() => navigate("/dashboard")}>
                            <ListItemText
                                primary="Dashboard"
                                sx={{ color: "var(--primary-color)" }}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => navigate(`/c/${user.username}`)}
                        >
                            <ListItemText
                                primary="Profile"
                                sx={{ color: "var(--primary-color)" }}
                            />
                        </ListItem>
                        <ListItem button onClick={handleLogout}>
                            <ListItemText
                                primary="Logout"
                                sx={{ color: "var(--primary-color)" }}
                            />
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem button onClick={() => navigate("/login")}>
                            <ListItemText
                                primary="Login"
                                sx={{ color: "var(--primary-color)" }}
                            />
                        </ListItem>
                        <ListItem button onClick={() => navigate("/register")}>
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
                sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    width: "100%",
                    mx: "auto",
                    maxWidth: "100%",
                }}
            >
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    gutterBottom
                    sx={{
                        color: "var(--primary-color)",
                        textAlign: { xs: "center", sm: "left" },
                    }}
                >
                    Welcome to VidTube
                </Typography>
                <SearchBar />
                <VideoList />
            </Box>
        </Box>
    );
};

export default Home;
