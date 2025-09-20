import React from "react";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
} from "@mui/material";
import { Home, Subscriptions, History } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "var(--background-color)",
                borderRight: "1px solid var(--primary-color)",
                pt: 2,
            }}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/")}>
                        <ListItemIcon>
                            <Home sx={{ color: "var(--primary-color)" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Home"
                            sx={{ color: "var(--primary-color)" }}
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/subscriptions")}>
                        <ListItemIcon>
                            <Subscriptions
                                sx={{ color: "var(--primary-color)" }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Subscriptions"
                            sx={{ color: "var(--primary-color)" }}
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/history")}>
                        <ListItemIcon>
                            <History sx={{ color: "var(--primary-color)" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Watch History"
                            sx={{ color: "var(--primary-color)" }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
};
export default Sidebar;
