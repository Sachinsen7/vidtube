import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import TweetForm from "../components/tweet/TweetForm";
import TweetList from "../components/tweet/TweetList";
import VideoUploadForm from "../components/video/VideoUploadForm";
import VideoList from "../components/dashboard/VideoList";
import StatsWidget from "../components/dashboard/StatsWidget";

const Dashboard = () => {
    const { user } = useAuth();
    const isMobile = useMediaQuery("(max-width:600px)");

    if (!user) {
        return (
            <Box
                sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    textAlign: "center",
                    backgroundColor: "var(--background-color)",
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    sx={{ color: "var(--primary-color)", fontWeight: "bold" }}
                >
                    Please log in to view your dashboard
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                p: { xs: 2, sm: 3, md: 4 },
                width: "100%",
                maxWidth: "100%",
                backgroundColor: "var(--background-color)",
            }}
        >
            <Typography
                variant={isMobile ? "h5" : "h4"}
                gutterBottom
                sx={{
                    color: "var(--primary-color)",
                    textAlign: { xs: "center", sm: "left" },
                    fontWeight: "bold",
                }}
            >
                Your Dashboard
            </Typography>
            <StatsWidget />
            <VideoUploadForm />
            <TweetForm userId={user._id} />
            <TweetList userId={user._id} />
            <VideoList />
        </Box>
    );
};

export default Dashboard;
