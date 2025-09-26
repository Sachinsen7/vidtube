import React from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";
import TweetForm from "../components/tweet/TweetForm";
import TweetList from "../components/tweet/TweetList";
import VideoUploadForm from "../components/video/VideoUploadForm";
import VideoList from "../components/dashboard/VideoList";

const Dashboard = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    if (!user) {
        return (
            <Container sx={{ py: 4 }}>
                <Box
                    sx={{
                        textAlign: "center",
                        bgcolor: "white",
                        p: 4,
                        borderRadius: 2,
                        border: "1px solid #e0e0e0",
                    }}
                >
                    <DashboardIcon
                        sx={{ fontSize: 48, color: "#1976d2", mb: 2 }}
                    />
                    <Typography
                        variant="h5"
                        sx={{ color: "#1976d2", mb: 1 }}
                        data-testid="access-required"
                    >
                        Access Required
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#757575" }}>
                        Please log in to view your dashboard and manage your
                        content.
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4, bgcolor: "#f5f5f5" }}>
            <Box
                sx={{
                    bgcolor: "white",
                    p: 3,
                    borderRadius: 2,
                    mb: 4,
                    border: "1px solid #e0e0e0",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <DashboardIcon
                        sx={{ fontSize: 32, color: "#1976d2", mr: 2 }}
                    />
                    <Typography
                        variant="h5"
                        sx={{ color: "#1976d2", fontWeight: 600 }}
                        data-testid="dashboard-title"
                    >
                        Creator Dashboard
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: "#757575" }}>
                    Welcome back, {user.fullName || user.username}! Manage your
                    content and engage with your audience.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            bgcolor: "white",
                            p: 3,
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ color: "#1976d2", mb: 2 }}
                            data-testid="video-upload-title"
                        >
                            Upload Video
                        </Typography>
                        <VideoUploadForm />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            bgcolor: "white",
                            p: 3,
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ color: "#1976d2", mb: 2 }}
                            data-testid="tweet-form-title"
                        >
                            Share Update
                        </Typography>
                        <TweetForm userId={user._id} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <VideoList />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TweetList userId={user._id} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
