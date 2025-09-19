import { Outlet, useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Box,
    Container,
} from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

const Layout = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { mode, toggleMode } = useTheme();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <Box
            sx={{
                backgroundColor: "var(--background-color)",
                minHeight: "100vh",
            }}
        >
            <AppBar
                position="static"
                sx={{ backgroundColor: "var(--primary-color)" }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => navigate("/")}
                        sx={{ mr: 2 }}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, color: "#fcffff" }}
                    >
                        VidTube
                    </Typography>
                    <Button color="inherit" onClick={() => toggleMode()}>
                        {mode === "light" ? "Dark" : "Light"} Mode
                    </Button>
                    {user ? (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => navigate("/dashboard")}
                            >
                                Dashboard
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => navigate(`/c/${user.username}`)}
                            >
                                Profile
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
                <Outlet />
            </Container>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: "auto",
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1" align="center">
                        © {new Date().getFullYear()} VidTube - All rights
                        reserved
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;
