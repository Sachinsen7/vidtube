import React, { useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    Grid,
    Paper,
    useTheme,
    useMediaQuery,
    Fade,
    Grow,
} from "@mui/material";
import {
    People as PeopleIcon,
    Visibility as ViewsIcon,
    VideoLibrary as VideosIcon,
    TrendingUp as TrendingIcon,
    Star as StarIcon,
    Timeline as TimelineIcon,
} from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { getChannelStats } from "../../services/dashboard";

const StatCard = ({ icon, title, value, subtitle, color, delay = 0 }) => {
    const theme = useTheme();

    return (
        <Grow in={true} timeout={600 + delay}>
            <Card
                sx={{
                    height: "100%",
                    background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${color}20`,
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 15px 35px ${color}25`,
                        border: `1px solid ${color}40`,
                    },
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
                    },
                }}
            >
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2,
                            boxShadow: `0 8px 25px ${color}30`,
                        }}
                    >
                        {React.cloneElement(icon, {
                            sx: { fontSize: 28, color: "white" },
                        })}
                    </Box>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 1,
                            fontSize: { xs: "2rem", sm: "2.5rem" },
                        }}
                    >
                        {typeof value === "number"
                            ? value.toLocaleString()
                            : value}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: "var(--primary-color)",
                            fontWeight: 600,
                            mb: 0.5,
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                        }}
                    >
                        {title}
                    </Typography>

                    {subtitle && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: "var(--secondary-color)",
                                fontSize: "0.85rem",
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Grow>
    );
};

const StatsWidget = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

    if (isLoading) {
        return (
            <Paper
                sx={{
                    p: 4,
                    mb: 4,
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 4,
                    textAlign: "center",
                }}
            >
                <CircularProgress
                    size={50}
                    sx={{ color: "var(--primary-color)" }}
                />
                <Typography sx={{ mt: 2, color: "var(--secondary-color)" }}>
                    Loading your channel statistics...
                </Typography>
            </Paper>
        );
    }

    if (error) {
        return (
            <Alert
                severity="error"
                sx={{
                    mb: 4,
                    borderRadius: 3,
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                }}
            >
                {error}
            </Alert>
        );
    }

    if (!stats) return null;

    const statsData = [
        {
            icon: <PeopleIcon />,
            title: "Subscribers",
            value: stats.subscribers || 0,
            subtitle: "Total followers",
            color: "#2196f3",
        },
        {
            icon: <ViewsIcon />,
            title: "Total Views",
            value: stats.totalViews || 0,
            subtitle: "All-time views",
            color: "#4caf50",
        },
        {
            icon: <VideosIcon />,
            title: "Videos",
            value: stats.totalVideos || 0,
            subtitle: "Published content",
            color: "#ff9800",
        },
        {
            icon: <TrendingIcon />,
            title: "Avg Views",
            value:
                stats.totalVideos > 0
                    ? Math.round((stats.totalViews || 0) / stats.totalVideos)
                    : 0,
            subtitle: "Per video",
            color: "#e91e63",
        },
    ];

    return (
        <Fade in={true} timeout={800}>
            <Paper
                sx={{
                    mb: 4,
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(20px)",
                    borderRadius: 4,
                    p: { xs: 3, sm: 4 },
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background:
                            "linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
                    },
                }}
            >
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        sx={{
                            color: "var(--primary-color)",
                            fontWeight: 700,
                            mb: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <TimelineIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
                        Channel Analytics
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ color: "var(--secondary-color)" }}
                    >
                        Track your content performance and audience growth
                    </Typography>
                </Box>

                <Grid container spacing={{ xs: 2, sm: 3 }}>
                    {statsData.map((stat, index) => (
                        <Grid item xs={6} sm={6} md={3} key={stat.title}>
                            <StatCard {...stat} delay={index * 100} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Fade>
    );
};

export default StatsWidget;
