import React, { useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { getChannelStats } from "../../services/dashboard";

const StatsWidget = () => {
    const { user } = useAuth();
    const [stats, setStats] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true);
            try {
                const response = await getChannelStats();
                setStats(response);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to fetch stats"
                );
            }
            setIsLoading(false);
        };
        if (user) fetchStats();
    }, [user]);

    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!stats) return null;

    return (
        <Card sx={{ mb: 2, backgroundColor: "var(--background-color)" }}>
            <CardContent>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "var(--primary-color)" }}
                >
                    Channel Statistics
                </Typography>
                <Typography sx={{ color: "var(--secondary-color)" }}>
                    Subscribers: {stats.subscribers || 0}
                </Typography>
                <Typography sx={{ color: "var(--secondary-color)" }}>
                    Total Views: {stats.totalViews || 0}
                </Typography>
                <Typography sx={{ color: "var(--secondary-color)" }}>
                    Total Videos: {stats.totalVideos || 0}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StatsWidget;
