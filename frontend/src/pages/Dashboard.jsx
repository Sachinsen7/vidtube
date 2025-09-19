import { Box, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import StatsWidget from "../components/dashboard/StatsWidget";
import VideoList from "../components/dashboard/VideoList";
import VideoUploadForm from "../components/video/VideoUploadForm";

const Dashboard = () => {
    const { user } = useAuth();

    if (!user)
        return (
            <Typography sx={{ color: "var(--primary-color)", p: 2 }}>
                Please log in to view your dashboard.
            </Typography>
        );

    return (
        <Box
            sx={{
                backgroundColor: "var(--background-color)",
                minHeight: "100vh",
                p: 2,
                maxWidth: 1200,
                mx: "auto",
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "var(--primary-color)" }}
            >
                Dashboard
            </Typography>
            <StatsWidget />
            <VideoUploadForm />
            <VideoList />
        </Box>
    );
};

export default Dashboard;
