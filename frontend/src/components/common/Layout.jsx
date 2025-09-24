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
    Tooltip,
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

const Layout = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");
    const [profileMenuEl, setProfileMenuEl] = useState(null);
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSidebarMouseEnter = () => {
        if (!isMobile) {
            setSidebarExpanded(true);
        }
    };

    const handleSidebarMouseLeave = () => {
        if (!isMobile) {
            setSidebarExpanded(false);
        }
    };

    const sidebarWidth = sidebarExpanded ? 250 : 72;

    const menuItems = [
        { text: "Home", icon: <HomeIcon />, path: "/", requireAuth: false },
        {
            text: "Subscriptions",
            icon: <SubscriptionsIcon />,
            path: "/subscriptions",
            requireAuth: true,
        },
        {
            text: "Your Videos",
            icon: <VideoLibraryIcon />,
            path: "/videos",
            requireAuth: true,
        },
        {
            text: "Upload",
            icon: <CloudUploadIcon />,
            path: "/upload",
            requireAuth: true,
        },
        {
            text: "Posts",
            icon: <ArticleIcon />,
            path: "/dashboard",
            requireAuth: true,
        },
        {
            text: "Profile",
            icon: <PersonIcon />,
            path: "/profile",
            requireAuth: true,
        },
        {
            text: "Logout",
            icon: <LogoutIcon />,
            action: "logout",
            requireAuth: true,
        },
    ];

    const authItems = [
        { text: "Login", path: "/login" },
        { text: "Register", path: "/register" },
    ];

    const renderMenuItem = (item, index) => {
        if (item.requireAuth && !user) return null;

        const handleClick = () => {
            if (item.action === "logout") {
                handleLogout();
            } else {
                navigate(item.path);
            }
            setMobileOpen(false);
        };

        return (
            <ListItem
                key={index}
                button
                onClick={handleClick}
                sx={{
                    minHeight: 48,
                    justifyContent: sidebarExpanded ? "initial" : "center",
                    px: 2.5,
                    "&:hover": {
                        backgroundColor: "rgba(4, 54, 100, 0.08)",
                    },
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: sidebarExpanded ? 3 : "auto",
                        justifyContent: "center",
                        color: "var(--primary-color)",
                    }}
                >
                    {!isMobile && !sidebarExpanded ? (
                        <Tooltip title={item.text} placement="right">
                            {item.icon}
                        </Tooltip>
                    ) : (
                        item.icon
                    )}
                </ListItemIcon>
                {(sidebarExpanded || isMobile) && (
                    <ListItemText
                        primary={item.text}
                        sx={{
                            opacity: sidebarExpanded || isMobile ? 1 : 0,
                            color: "var(--primary-color)",
                        }}
                    />
                )}
            </ListItem>
        );
    };

    const drawerContent = (
        <Box
            sx={{
                width: isMobile ? 250 : sidebarWidth,
                height: "100%",
                background: "linear-gradient(135deg, #fcffff 0%, #e6f0fa 100%)",
                transition: "width 0.3s ease",
            }}
            onMouseEnter={handleSidebarMouseEnter}
            onMouseLeave={handleSidebarMouseLeave}
        >
            <Box
                sx={{
                    p: 2,
                    borderBottom: "1px solid rgba(4, 54, 100, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                        sidebarExpanded || isMobile ? "flex-start" : "center",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: "var(--primary-color)",
                        fontWeight: "bold",
                        opacity: sidebarExpanded || isMobile ? 1 : 0,
                        transition: "opacity 0.3s ease",
                        whiteSpace: "nowrap",
                    }}
                >
                    VidTube
                </Typography>
            </Box>
            <List>
                {menuItems.map(renderMenuItem)}
                {!user && (
                    <>
                        {authItems.map((item, index) => (
                            <ListItem
                                key={`auth-${index}`}
                                button
                                onClick={() => {
                                    navigate(item.path);
                                    setMobileOpen(false);
                                }}
                                sx={{
                                    minHeight: 48,
                                    justifyContent:
                                        sidebarExpanded || isMobile
                                            ? "initial"
                                            : "center",
                                    px: 2.5,
                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(4, 54, 100, 0.08)",
                                    },
                                }}
                            >
                                {(sidebarExpanded || isMobile) && (
                                    <ListItemText
                                        primary={item.text}
                                        sx={{
                                            color: "var(--primary-color)",
                                            opacity:
                                                sidebarExpanded || isMobile
                                                    ? 1
                                                    : 0,
                                        }}
                                    />
                                )}
                            </ListItem>
                        ))}
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
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar sx={{ flexWrap: "wrap" }}>
                    <IconButton
                        edge="start"
                        sx={{ color: "#fcffff", mr: 2 }}
                        onClick={handleDrawerToggle}
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
                    variant="permanent"
                    sx={{
                        width: sidebarWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: sidebarWidth,
                            boxSizing: "border-box",
                            background:
                                "linear-gradient(135deg, #fcffff 0%, #e6f0fa 100%)",
                            transition: "width 0.3s ease",
                            overflowX: "hidden",
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
                    ml: {
                        xs: 0,
                        sm: 0,
                        md: `${sidebarWidth}px`,
                    },
                    transition: "margin-left 0.3s ease",
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
                    ml: {
                        xs: 0,
                        sm: 0,
                        md: `${sidebarWidth}px`,
                    },
                    transition: "margin-left 0.3s ease",
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
