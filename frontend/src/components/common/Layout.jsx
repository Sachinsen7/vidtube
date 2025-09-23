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
    ListItemIcon,
    useMediaQuery,
    InputBase,
    Avatar,
    Menu,
    MenuItem,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Home as HomeIcon,
    Subscriptions as SubscriptionsIcon,
    VideoLibrary as VideoLibraryIcon,
    CloudUpload as CloudUploadIcon,
    Article as ArticleIcon,
    Person as PersonIcon,
    Logout as LogoutIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
// import logo from "../../assets/logo.png";

const Layout = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");
    const [profileMenuEl, setProfileMenuEl] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleSidebarToggle = () => {
        setSidebarOpen((prev) => !prev);
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
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
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
                            <ListItemIcon>
                                <SubscriptionsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Subscriptions" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                navigate("/videos");
                                setMobileOpen(false);
                            }}
                        >
                            <ListItemIcon>
                                <VideoLibraryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Your Videos" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                navigate("/upload");
                                setMobileOpen(false);
                            }}
                        >
                            <ListItemIcon>
                                <CloudUploadIcon />
                            </ListItemIcon>
                            <ListItemText primary="Upload" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                navigate("/dashboard");
                                setMobileOpen(false);
                            }}
                        >
                            <ListItemIcon>
                                <ArticleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Posts" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                navigate("/profile");
                                setMobileOpen(false);
                            }}
                        >
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                handleLogout();
                                setMobileOpen(false);
                            }}
                        >
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
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
                    <IconButton
                        edge="start"
                        sx={{ color: "#fcffff", mr: 2 }}
                        onClick={
                            isMobile ? handleDrawerToggle : handleSidebarToggle
                        }
                    >
                        <MenuIcon />
                    </IconButton>
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
                            <Box
                                sx={{
                                    background: "rgba(255,255,255,0.15)",
                                    borderRadius: 2,
                                    px: 2,
                                    py: 0.5,
                                    display: "flex",
                                    alignItems: "center",
                                    mr: 2,
                                    minWidth: 280,
                                }}
                            >
                                <SearchIcon sx={{ color: "#fff", mr: 1 }} />
                                <InputBase
                                    placeholder="Search"
                                    sx={{ color: "#fff", width: "100%" }}
                                />
                            </Box>
                            <IconButton sx={{ color: "#fff", mr: 1 }}>
                                <NotificationsIcon />
                            </IconButton>
                            {user ? (
                                <>
                                    <Button
                                        onClick={(e) =>
                                            setProfileMenuEl(e.currentTarget)
                                        }
                                        sx={{
                                            color: "#fff",
                                            textTransform: "none",
                                        }}
                                        startIcon={
                                            <Avatar
                                                src={user.avatar}
                                                sx={{ width: 24, height: 24 }}
                                            />
                                        }
                                    >
                                        {user.fullName || user.username}
                                    </Button>
                                    <Menu
                                        anchorEl={profileMenuEl}
                                        open={Boolean(profileMenuEl)}
                                        onClose={() => setProfileMenuEl(null)}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                setProfileMenuEl(null);
                                                navigate("/profile");
                                            }}
                                        >
                                            <PersonIcon
                                                fontSize="small"
                                                style={{ marginRight: 8 }}
                                            />{" "}
                                            Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setProfileMenuEl(null);
                                                navigate("/settings");
                                            }}
                                        >
                                            <SettingsIcon
                                                fontSize="small"
                                                style={{ marginRight: 8 }}
                                            />{" "}
                                            Settings
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setProfileMenuEl(null);
                                                handleLogout();
                                            }}
                                        >
                                            <LogoutIcon
                                                fontSize="small"
                                                style={{ marginRight: 8 }}
                                            />{" "}
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button
                                        sx={{ color: "#fff" }}
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        sx={{ color: "#fff" }}
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

            {isMobile ? (
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
            ) : (
                <Drawer
                    variant="persistent"
                    open={sidebarOpen}
                    sx={{
                        width: 250,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: 250,
                            boxSizing: "border-box",
                            background:
                                "linear-gradient(135deg, #fcffff 0%, #e6f0fa 100%)",
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}

            <Container
                component="main"
                sx={{
                    mt: { xs: 2, sm: 3, md: 4 },
                    mb: 4,
                    flex: 1,
                    width: "100%",
                    maxWidth: "100%",
                    px: { xs: 2, sm: 3, md: 4 },
                    ml: { sm: 0, md: sidebarOpen ? 32 : 0 },
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
