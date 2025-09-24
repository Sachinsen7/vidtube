import React from "react";
import {
    Box,
    Typography,
    useMediaQuery,
    Container,
    Fade,
    Paper,
    Grid,
    useTheme,
} from "@mui/material";
import {
    Dashboard as DashboardIcon,
    VideoCall as VideoCallIcon,
    Article as ArticleIcon,
} from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";
import TweetForm from "../components/tweet/TweetForm";
import TweetList from "../components/tweet/TweetList";
import VideoUploadForm from "../components/video/VideoUploadForm";
import VideoList from "../components/dashboard/VideoList";
import StatsWidget from "../components/dashboard/StatsWidget";

const Dashboard = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    if (!user) {
        return (
            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Paper
                    sx={{
                        p: { xs: 4, sm: 6 },
                        textAlign: "center",
                        background: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(20px)",
                        borderRadius: 4,
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <DashboardIcon
                        sx={{
                            fontSize: 64,
                            color: "var(--primary-color)",
                            mb: 2,
                            opacity: 0.7,
                        }}
                    />
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        sx={{
                            color: "var(--primary-color)",
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        Access Required
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "var(--secondary-color)",
                            lineHeight: 1.6,
                        }}
                    >
                        Please log in to view your dashboard and manage your
                        content
                    </Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        "radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 119, 198, 0.2) 0%, transparent 50%)",
                    pointerEvents: "none",
                },
            }}
        >
            <Container
                maxWidth="xl"
                sx={{ py: { xs: 2, sm: 4 }, position: "relative", zIndex: 1 }}
            >
                <Fade in={true} timeout={800}>
                    <Box>
                        {/* Dashboard Header */}
                        <Paper
                            sx={{
                                background: "rgba(255, 255, 255, 0.9)",
                                backdropFilter: "blur(20px)",
                                borderRadius: 4,
                                p: { xs: 3, sm: 4, md: 6 },
                                mb: 4,
                                textAlign: { xs: "center", sm: "left" },
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
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                <DashboardIcon
                                    sx={{
                                        fontSize: { xs: 32, sm: 40 },
                                        color: "var(--primary-color)",
                                        mr: 2,
                                    }}
                                />
                                <Typography
                                    variant={isMobile ? "h4" : "h3"}
                                    sx={{
                                        background:
                                            "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        fontWeight: 800,
                                        letterSpacing: "-0.02em",
                                    }}
                                >
                                    Creator Dashboard
                                </Typography>
                            </Box>
                            <Typography
                                variant={isMobile ? "body1" : "h6"}
                                sx={{
                                    color: "var(--secondary-color)",
                                    maxWidth: 600,
                                    lineHeight: 1.6,
                                }}
                            >
                                Welcome back, {user.fullName || user.username}!
                                Manage your content, track your performance, and
                                engage with your audience.
                            </Typography>
                        </Paper>

                        {/* Statistics Section */}
                        {/* <StatsWidget /> */}

                        {/* Content Creation Section */}
                        <Grid container spacing={4} sx={{ mb: 4 }}>
                            {/* Video Upload */}
                            <Grid item xs={12} lg={6}>
                                <Paper
                                    sx={{
                                        background: "rgba(255, 255, 255, 0.9)",
                                        backdropFilter: "blur(15px)",
                                        borderRadius: 4,
                                        p: { xs: 3, sm: 4 },
                                        border: "1px solid rgba(255, 255, 255, 0.3)",
                                        height: "fit-content",
                                        position: "relative",
                                        overflow: "hidden",
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: "3px",
                                            background:
                                                "linear-gradient(90deg, #ff6b6b 0%, #ee5a24 100%)",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 3,
                                        }}
                                    >
                                        <VideoCallIcon
                                            sx={{
                                                fontSize: 28,
                                                color: "#ff6b6b",
                                                mr: 2,
                                            }}
                                        />
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                color: "var(--primary-color)",
                                                fontWeight: 700,
                                            }}
                                        >
                                            Upload Video
                                        </Typography>
                                    </Box>
                                    <VideoUploadForm />
                                </Paper>
                            </Grid>

                            {/* Tweet Form */}
                            <Grid item xs={12} lg={6}>
                                <Paper
                                    sx={{
                                        background: "rgba(255, 255, 255, 0.9)",
                                        backdropFilter: "blur(15px)",
                                        borderRadius: 4,
                                        p: { xs: 3, sm: 4 },
                                        border: "1px solid rgba(255, 255, 255, 0.3)",
                                        height: "fit-content",
                                        position: "relative",
                                        overflow: "hidden",
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: "3px",
                                            background:
                                                "linear-gradient(90deg, #1da1f2 0%, #0d8bd9 100%)",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 3,
                                        }}
                                    >
                                        <ArticleIcon
                                            sx={{
                                                fontSize: 28,
                                                color: "#1da1f2",
                                                mr: 2,
                                            }}
                                        />
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                color: "var(--primary-color)",
                                                fontWeight: 700,
                                            }}
                                        >
                                            Share Update
                                        </Typography>
                                    </Box>
                                    <TweetForm userId={user._id} />
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Content Lists Section */}
                        <Grid container spacing={4}>
                            <Grid item xs={12} lg={8}>
                                <VideoList />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <TweetList userId={user._id} />
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default Dashboard;
