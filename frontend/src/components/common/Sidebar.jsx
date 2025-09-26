import React, { useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { Home, Subscriptions, History } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:600px)");
    const [expanded, setExpanded] = useState(false);

    const handleMouseEnter = () => {
        if (!isMobile) setExpanded(true);
    };

    const handleMouseLeave = () => {
        if (!isMobile) setExpanded(false);
    };

    const sidebarWidth = expanded ? 240 : 72;

    const menuItems = [
        { text: "Home", icon: <Home />, path: "/" },
        {
            text: "Subscriptions",
            icon: <Subscriptions />,
            path: "/subscriptions",
        },
        { text: "Watch History", icon: <History />, path: "/history" },
    ];

    return (
        <Box
            sx={{
                width: isMobile ? 240 : sidebarWidth,
                bgcolor: "#f5f5f5",
                height: "100%",
                p: 2,
                transition: "width 0.3s ease",
                borderRight: "1px solid #e0e0e0",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-testid="sidebar"
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    color: "#1976d2",
                    mb: 2,
                    pl: 2,
                    opacity: expanded || isMobile ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }}
            >
                VidTube
            </Typography>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{
                            borderRadius: 1,
                            "&:hover": { bgcolor: "#e3f2fd" },
                        }}
                        data-testid={`sidebar-item-${item.text.toLowerCase().replace(" ", "-")}`}
                    >
                        <ListItemButton onClick={() => navigate(item.path)}>
                            <ListItemIcon
                                sx={{
                                    color: "#1976d2",
                                    minWidth: expanded || isMobile ? 56 : 40,
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {(expanded || isMobile) && (
                                <ListItemText
                                    primary={item.text}
                                    sx={{ color: "#1976d2" }}
                                />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;
