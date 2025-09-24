import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    useMediaQuery,
    Grid,
    CircularProgress,
    Button,
    Container,
    Fade,
    Chip,
    useTheme,
    Paper,
    Skeleton,
} from "@mui/material";
import {
    TrendingUp as TrendingIcon,
    VideoLibrary as VideoIcon,
    Whatshot as HotIcon,
} from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "../components/common/SearchBar";
import { useVideos } from "../hooks/useVideo";
import VideoCard from "../components/video/VideoCard";

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { trending, trendCursor, loadTrending } = useVideos();
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        loadTrending();
        setTimeout(() => setPageLoaded(true), 300);
    }, []);

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
                        "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
                    pointerEvents: "none",
                },
            }}
        >
            <Container
                maxWidth="xl"
                sx={{ position: "relative", zIndex: 1, py: { xs: 2, sm: 4 } }}
            >
                <Fade in={pageLoaded} timeout={800}>
                    <Box>
                        {/* Hero Section */}
                        <Paper
                            elevation={0}
                            sx={{
                                background: "rgba(255, 255, 255, 0.9)",
                                backdropFilter: "blur(20px)",
                                borderRadius: 4,
                                p: { xs: 3, sm: 4, md: 6 },
                                mb: 4,
                                textAlign: "center",
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
                                    mb: 3,
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 2,
                                    flexWrap: "wrap",
                                }}
                            >
                                <Chip
                                    icon={<HotIcon />}
                                    label="Trending Now"
                                    sx={{
                                        background:
                                            "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                                        color: "white",
                                        fontWeight: 600,
                                        "& .MuiChip-icon": { color: "white" },
                                    }}
                                />
                                <Chip
                                    icon={<VideoIcon />}
                                    label={`${trending.length}+ Videos`}
                                    variant="outlined"
                                    sx={{
                                        borderColor: "var(--primary-color)",
                                        color: "var(--primary-color)",
                                        fontWeight: 600,
                                    }}
                                />
                            </Box>

                            <Typography
                                variant={isMobile ? "h4" : "h2"}
                                sx={{
                                    background:
                                        "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontWeight: 800,
                                    mb: 2,
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                Discover Amazing Content
                            </Typography>

                            <Typography
                                variant={isMobile ? "body1" : "h6"}
                                sx={{
                                    color: "var(--secondary-color)",
                                    maxWidth: 600,
                                    mx: "auto",
                                    mb: 4,
                                    lineHeight: 1.6,
                                }}
                            >
                                Explore trending videos, connect with creators,
                                and find your next favorite content
                            </Typography>

                            <SearchBar />
                        </Paper>

                        {/* Content Section */}
                        <Paper
                            elevation={0}
                            sx={{
                                background: "rgba(255, 255, 255, 0.8)",
                                backdropFilter: "blur(15px)",
                                borderRadius: 4,
                                p: { xs: 2, sm: 3, md: 4 },
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                        >
                            {/* Section Header */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 4,
                                    pb: 2,
                                    borderBottom:
                                        "2px solid rgba(0, 0, 0, 0.05)",
                                }}
                            >
                                <TrendingIcon
                                    sx={{
                                        fontSize: 32,
                                        color: "var(--primary-color)",
                                        mr: 2,
                                    }}
                                />
                                <Typography
                                    variant={isMobile ? "h5" : "h4"}
                                    sx={{
                                        color: "var(--primary-color)",
                                        fontWeight: 700,
                                        flex: 1,
                                    }}
                                >
                                    Trending Videos
                                </Typography>
                                {trending.length > 0 && (
                                    <Chip
                                        label={`${trending.length} videos`}
                                        size="small"
                                        sx={{
                                            background: "var(--primary-color)",
                                            color: "white",
                                            fontWeight: 600,
                                        }}
                                    />
                                )}
                            </Box>

                            {/* Loading State */}
                            {!trending.length ? (
                                <Grid container spacing={3}>
                                    {[...Array(6)].map((_, index) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            key={index}
                                        >
                                            <Paper
                                                sx={{
                                                    borderRadius: 3,
                                                    overflow: "hidden",
                                                    background:
                                                        "rgba(255, 255, 255, 0.6)",
                                                }}
                                            >
                                                <Skeleton
                                                    variant="rectangular"
                                                    height={200}
                                                    sx={{
                                                        background:
                                                            "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                                                    }}
                                                />
                                                <Box sx={{ p: 2 }}>
                                                    <Skeleton
                                                        width="90%"
                                                        height={24}
                                                        sx={{ mb: 1 }}
                                                    />
                                                    <Skeleton
                                                        width="70%"
                                                        height={20}
                                                        sx={{ mb: 2 }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            gap: 1,
                                                        }}
                                                    >
                                                        <Skeleton
                                                            variant="circular"
                                                            width={24}
                                                            height={24}
                                                        />
                                                        <Skeleton
                                                            width={60}
                                                            height={20}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                /* Video Grid */
                                <InfiniteScroll
                                    dataLength={trending.length}
                                    next={() => loadTrending(trendCursor)}
                                    hasMore={Boolean(trendCursor)}
                                    loader={
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                py: 4,
                                            }}
                                        >
                                            <CircularProgress
                                                size={50}
                                                thickness={4}
                                                sx={{
                                                    color: "var(--primary-color)",
                                                }}
                                            />
                                        </Box>
                                    }
                                    style={{ overflow: "visible" }}
                                >
                                    <Grid container spacing={3}>
                                        {trending.map((video, index) => (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                lg={3}
                                                key={video._id}
                                            >
                                                <Fade
                                                    in={true}
                                                    timeout={
                                                        300 + (index % 12) * 100
                                                    }
                                                >
                                                    <div>
                                                        <VideoCard
                                                            video={video}
                                                        />
                                                    </div>
                                                </Fade>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </InfiniteScroll>
                            )}

                            {/* Load More Button */}
                            {Boolean(trendCursor) && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: 4,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() =>
                                            loadTrending(trendCursor)
                                        }
                                        sx={{
                                            background:
                                                "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
                                            color: "white",
                                            borderRadius: 3,
                                            px: 4,
                                            py: 1.5,
                                            fontWeight: 600,
                                            boxShadow:
                                                "0 8px 25px rgba(0, 0, 0, 0.15)",
                                            "&:hover": {
                                                transform: "translateY(-2px)",
                                                boxShadow:
                                                    "0 12px 35px rgba(0, 0, 0, 0.2)",
                                            },
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        Load More Videos
                                    </Button>
                                </Box>
                            )}
                        </Paper>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default Home;
