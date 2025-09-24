import React, { useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    CircularProgress,
    Alert,
    Paper,
    Chip,
    useTheme,
    useMediaQuery,
    Skeleton,
    Fade,
    Grow,
} from "@mui/material";
import {
    VideoLibrary as VideoIcon,
    PlayCircle as PlayIcon,
} from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useVideos } from "../../hooks/useVideo";
import VideoCard from "../video/VideoCard";

const VideoSkeletonCard = ({ delay = 0 }) => (
    <Grow in={true} timeout={600 + delay}>
        <Paper
            sx={{
                borderRadius: 4,
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
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
            <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Skeleton variant="circular" width={32} height={32} />
                    <Box sx={{ ml: 2, flex: 1 }}>
                        <Skeleton width="60%" height={16} />
                        <Skeleton width="40%" height={12} sx={{ mt: 0.5 }} />
                    </Box>
                </Box>
                <Skeleton width="90%" height={24} sx={{ mb: 1 }} />
                <Skeleton width="70%" height={24} sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Skeleton width={60} height={20} />
                    <Skeleton width={60} height={20} />
                </Box>
            </Box>
        </Paper>
    </Grow>
);

const VideoList = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { videos, isLoading, error, pages, setPages, hasMore, loadVideos } =
        useVideos({
            userVideos: true,
        });

    useEffect(() => {
        loadVideos();
    }, []);

    const loadMore = () => {
        if (hasMore) setPages(pages + 1);
    };

    if (error) {
        return (
            <Alert
                severity="error"
                sx={{
                    borderRadius: 3,
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                }}
            >
                {error}
            </Alert>
        );
    }

    return (
        <Paper
            sx={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(15px)",
                borderRadius: 4,
                p: { xs: 3, sm: 4 },
                border: "1px solid rgba(255, 255, 255, 0.3)",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
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
            {/* Header */}
            <Fade in={true} timeout={600}>
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <PlayIcon
                            sx={{
                                fontSize: 32,
                                color: "#ff6b6b",
                                mr: 2,
                            }}
                        />
                        <Typography
                            variant={isMobile ? "h6" : "h5"}
                            sx={{
                                color: "var(--primary-color)",
                                fontWeight: 700,
                                flex: 1,
                            }}
                        >
                            Your Videos
                        </Typography>
                        {Array.isArray(videos) && videos.length > 0 && (
                            <Chip
                                label={`${videos.length} ${videos.length === 1 ? "video" : "videos"}`}
                                size="small"
                                sx={{
                                    background:
                                        "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                                    color: "white",
                                    fontWeight: 600,
                                    boxShadow:
                                        "0 4px 12px rgba(255, 107, 107, 0.3)",
                                }}
                            />
                        )}
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "var(--secondary-color)",
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                        }}
                    >
                        Manage and track the performance of your uploaded videos
                    </Typography>
                </Box>
            </Fade>

            {/* Videos Grid */}
            <InfiniteScroll
                dataLength={Array.isArray(videos) ? videos.length : 0}
                next={loadMore}
                hasMore={hasMore}
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
                            sx={{ color: "#ff6b6b" }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                ml: 2,
                                color: "var(--secondary-color)",
                                alignSelf: "center",
                            }}
                        >
                            Loading more videos...
                        </Typography>
                    </Box>
                }
                endMessage={
                    Array.isArray(videos) &&
                    videos.length > 0 && (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "var(--secondary-color)",
                                    fontStyle: "italic",
                                }}
                            >
                                You've seen all your videos!
                            </Typography>
                        </Box>
                    )
                }
                style={{ overflow: "visible" }}
            >
                <Grid container spacing={3}>
                    {/* Loading Skeleton Cards */}
                    {isLoading &&
                        (!Array.isArray(videos) || videos.length === 0) && (
                            <>
                                {[...Array(6)].map((_, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        key={`skeleton-${index}`}
                                    >
                                        <VideoSkeletonCard
                                            delay={index * 100}
                                        />
                                    </Grid>
                                ))}
                            </>
                        )}

                    {/* Video Cards */}
                    {Array.isArray(videos) &&
                        videos.map((video, index) => (
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
                                    timeout={400 + (index % 12) * 100}
                                >
                                    <div>
                                        <VideoCard video={video} />
                                    </div>
                                </Fade>
                            </Grid>
                        ))}
                </Grid>
            </InfiniteScroll>

            {/* Empty State */}
            {!isLoading && (!Array.isArray(videos) || videos.length === 0) && (
                <Fade in={true} timeout={800}>
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 8,
                            px: 4,
                        }}
                    >
                        <Box
                            sx={{
                                width: 120,
                                height: 120,
                                borderRadius: "50%",
                                background:
                                    "linear-gradient(135deg, #ff6b6b20 0%, #ee5a2420 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mx: "auto",
                                mb: 3,
                                border: "3px dashed rgba(255, 107, 107, 0.3)",
                            }}
                        >
                            <VideoIcon
                                sx={{
                                    fontSize: 48,
                                    color: "#ff6b6b",
                                    opacity: 0.7,
                                }}
                            />
                        </Box>
                        <Typography
                            variant={isMobile ? "h6" : "h5"}
                            sx={{
                                color: "var(--primary-color)",
                                mb: 2,
                                fontWeight: 600,
                            }}
                        >
                            No videos uploaded yet
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "var(--secondary-color)",
                                mb: 3,
                                maxWidth: 400,
                                mx: "auto",
                                lineHeight: 1.6,
                            }}
                        >
                            Start sharing your creativity with the world! Upload
                            your first video and begin building your audience.
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                gap: 2,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Chip
                                label="💡 Tip: Use high-quality thumbnails"
                                sx={{
                                    background: "rgba(255, 193, 7, 0.1)",
                                    color: "#ff9800",
                                    border: "1px solid rgba(255, 193, 7, 0.3)",
                                    fontSize: "0.85rem",
                                }}
                            />
                            <Chip
                                label="🎬 Videos perform better with good titles"
                                sx={{
                                    background: "rgba(76, 175, 80, 0.1)",
                                    color: "#4caf50",
                                    border: "1px solid rgba(76, 175, 80, 0.3)",
                                    fontSize: "0.85rem",
                                }}
                            />
                        </Box>
                    </Box>
                </Fade>
            )}

            {/* Statistics Summary */}
            {Array.isArray(videos) && videos.length > 0 && (
                <Fade in={true} timeout={1000}>
                    <Box
                        sx={{
                            mt: 4,
                            pt: 3,
                            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 3,
                            justifyContent: "center",
                        }}
                    >
                        <Box sx={{ textAlign: "center", minWidth: 80 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: "#ff6b6b",
                                    fontWeight: 700,
                                    fontSize: { xs: "1.5rem", sm: "2rem" },
                                }}
                            >
                                {videos.length}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "var(--secondary-color)",
                                    textTransform: "uppercase",
                                    letterSpacing: 1,
                                    fontWeight: 600,
                                }}
                            >
                                Total Videos
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: "center", minWidth: 80 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: "#4caf50",
                                    fontWeight: 700,
                                    fontSize: { xs: "1.5rem", sm: "2rem" },
                                }}
                            >
                                {videos
                                    .reduce(
                                        (sum, video) =>
                                            sum + (video.views || 0),
                                        0
                                    )
                                    .toLocaleString()}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "var(--secondary-color)",
                                    textTransform: "uppercase",
                                    letterSpacing: 1,
                                    fontWeight: 600,
                                }}
                            >
                                Total Views
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: "center", minWidth: 80 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: "#2196f3",
                                    fontWeight: 700,
                                    fontSize: { xs: "1.5rem", sm: "2rem" },
                                }}
                            >
                                {videos
                                    .reduce(
                                        (sum, video) =>
                                            sum + (video.likesCount || 0),
                                        0
                                    )
                                    .toLocaleString()}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "var(--secondary-color)",
                                    textTransform: "uppercase",
                                    letterSpacing: 1,
                                    fontWeight: 600,
                                }}
                            >
                                Total Likes
                            </Typography>
                        </Box>
                    </Box>
                </Fade>
            )}
        </Paper>
    );
};

export default VideoList;
