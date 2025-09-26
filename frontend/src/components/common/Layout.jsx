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
        setProfileMenuEl(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSidebarMouseEnter = () => {
        if (!isMobile) setSidebarExpanded(true);
    };

    const handleSidebarMouseLeave = () => {
        if (!isMobile) setSidebarExpanded(false);
    };

    const sidebarWidth = sidebarExpanded ? 240 : 72;

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

    const drawerContent = (
        <Box
            sx={{
                width: isMobile ? 240 : sidebarWidth,
                bgcolor: "#f5f5f5",
                height: "100%",
                p: 2,
                transition: "width 0.3s ease",
            }}
            onMouseEnter={handleSidebarMouseEnter}
            onMouseLeave={handleSidebarMouseLeave}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    color: "#1976d2",
                    mb: 2,
                    pl: 2,
                    opacity: sidebarExpanded || isMobile ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }}
            >
                VidTube
            </Typography>
            <List>
                {menuItems.map((item, index) =>
                    item.requireAuth && !user ? null : (
                        <ListItem
                            key={index}
                            button
                            onClick={() => {
                                if (item.action === "logout") handleLogout();
                                else navigate(item.path);
                                setMobileOpen(false);
                            }}
                            sx={{
                                borderRadius: 1,
                                "&:hover": { bgcolor: "#e3f2fd" },
                            }}
                            data-testid={`sidebar-item-${item.text.toLowerCase()}`}
                        >
                            <ListItemIcon
                                sx={{
                                    color: "#1976d2",
                                    minWidth:
                                        sidebarExpanded || isMobile ? 56 : 40,
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {(sidebarExpanded || isMobile) && (
                                <ListItemText
                                    primary={item.text}
                                    sx={{ color: "#1976d2" }}
                                />
                            )}
                        </ListItem>
                    )
                )}
                {!user &&
                    authItems.map((item, index) => (
                        <ListItem
                            key={`auth-${index}`}
                            button
                            onClick={() => {
                                navigate(item.path);
                                setMobileOpen(false);
                            }}
                            sx={{
                                borderRadius: 1,
                                "&:hover": { bgcolor: "#e3f2fd" },
                            }}
                            data-testid={`sidebar-item-${item.text.toLowerCase()}`}
                        >
                            <ListItemIcon
                                sx={{
                                    color: "#1976d2",
                                    minWidth:
                                        sidebarExpanded || isMobile ? 56 : 40,
                                }}
                            >
                                <PersonIcon />
                            </ListItemIcon>
                            {(sidebarExpanded || isMobile) && (
                                <ListItemText
                                    primary={item.text}
                                    sx={{ color: "#1976d2" }}
                                />
                            )}
                        </ListItem>
                    ))}
            </List>
        </Box>
    );

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                bgcolor: "#f5f5f5",
            }}
        >
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: "#1976d2",
                    boxShadow: "none",
                    borderBottom: "1px solid #e0e0e0",
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                        data-testid="menu-toggle"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component={Link}
                        to="/"
                        variant="h6"
                        sx={{
                            color: "white",
                            textDecoration: "none",
                            flexGrow: 1,
                        }}
                    >
                        VidTube
                    </Typography>
                    {!isMobile && (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    bgcolor: "rgba(255, 255, 255, 0.2)",
                                    borderRadius: 1,
                                    px: 2,
                                    mr: 2,
                                }}
                            >
                                <SearchIcon sx={{ color: "white" }} />
                                <InputBase
                                    placeholder="Search"
                                    sx={{ color: "white", ml: 1, flex: 1 }}
                                    data-testid="search-input"
                                />
                            </Box>
                            {user ? (
                                <>
                                    <Button
                                        sx={{
                                            color: "white",
                                            textTransform: "none",
                                        }}
                                        startIcon={
                                            <Avatar
                                                src={user.avatar}
                                                sx={{ width: 24, height: 24 }}
                                            />
                                        }
                                        onClick={(e) =>
                                            setProfileMenuEl(e.currentTarget)
                                        }
                                        data-testid="profile-menu-button"
                                    >
                                        {user.fullName || user.username}
                                    </Button>
                                    <Menu
                                        anchorEl={profileMenuEl}
                                        open={Boolean(profileMenuEl)}
                                        onClose={() => setProfileMenuEl(null)}
                                        data-testid="profile-menu"
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                setProfileMenuEl(null);
                                                navigate("/profile");
                                            }}
                                            data-testid="menu-profile"
                                        >
                                            Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setProfileMenuEl(null);
                                                handleLogout();
                                            }}
                                            data-testid="menu-logout"
                                        >
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button
                                        sx={{ color: "white" }}
                                        onClick={() => navigate("/login")}
                                        data-testid="login-button"
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        sx={{ color: "white" }}
                                        onClick={() => navigate("/register")}
                                        data-testid="register-button"
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
                            width: 240,
                            bgcolor: "#f5f5f5",
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
                        "& .MuiDrawer-paper": {
                            width: sidebarWidth,
                            bgcolor: "#f5f5f5",
                            borderRight: "1px solid #e0e0e0",
                            transition: "width 0.3s ease",
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}

            <Container
                sx={{
                    flex: 1,
                    mt: 2,
                    ml: { md: `${sidebarWidth}px` },
                    maxWidth: "100%",
                    px: { xs: 2, sm: 3 },
                    transition: "margin-left 0.3s ease",
                }}
            >
                <Outlet />
            </Container>

            <Box
                component="footer"
                sx={{
                    bgcolor: "#1976d2",
                    color: "white",
                    py: 2,
                    textAlign: "center",
                    mt: "auto",
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
