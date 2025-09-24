import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Container,
    Fade,
    useMediaQuery,
    useTheme,
    Skeleton,
} from "@mui/material";
import { useVideos } from "../hooks/useVideo";
import { useComments } from "../hooks/useComments";
import VideoPlayer from "../components/video/VideoPlayer";
import CommentForm from "../components/comment/CommentForm";
import CommentList from "../components/comment/CommentList";

const Video = () => {
    const { videoId } = useParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [pageLoaded, setPageLoaded] = useState(false);

    const {
        selectedVideo,
        isLoading: videoLoading,
        error: videoError,
        getVideoById,
    } = useVideos();

    const { isLoading: commentsLoading, error: commentsError } =
        useComments(videoId);

    useEffect(() => {
        if (videoId) {
            getVideoById(videoId);
            // Add small delay for smooth page transition
            setTimeout(() => setPageLoaded(true), 300);
        }
    }, [videoId]);

    if (videoError)
        return (
            <Alert severity="error" sx={{ m: 2 }}>
                {videoError}
            </Alert>
        );
    if (commentsError)
        return (
            <Alert severity="error" sx={{ m: 2 }}>
                {commentsError}
            </Alert>
        );

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                pt: { xs: 1, sm: 2 },
                pb: 4,
            }}
        >
            <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
                <Fade in={pageLoaded} timeout={600}>
                    <Box>
                        {/* Video Player Section */}
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    lg: "1fr 400px",
                                },
                                gap: { xs: 2, lg: 4 },
                                mb: 4,
                            }}
                        >
                            {/* Main Video Content */}
                            <Box sx={{ minWidth: 0 }}>
                                {videoLoading ? (
                                    <Box>
                                        <Skeleton
                                            variant="rectangular"
                                            height={isMobile ? 200 : 480}
                                            sx={{
                                                borderRadius: 2,
                                                mb: 2,
                                                background:
                                                    "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
                                            }}
                                        />
                                        <Skeleton width="80%" height={40} />
                                        <Skeleton
                                            width="60%"
                                            height={20}
                                            sx={{ mt: 1 }}
                                        />
                                    </Box>
                                ) : (
                                    <VideoPlayer video={selectedVideo} />
                                )}
                            </Box>

                            {/* Sidebar - Related Videos or Info (Desktop Only) */}
                            {!isMobile && (
                                <Box
                                    sx={{
                                        display: { xs: "none", lg: "block" },
                                        background: "rgba(255, 255, 255, 0.8)",
                                        backdropFilter: "blur(10px)",
                                        borderRadius: 3,
                                        p: 3,
                                        boxShadow:
                                            "0 8px 32px rgba(0, 0, 0, 0.1)",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                        height: "fit-content",
                                        position: "sticky",
                                        top: 20,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "var(--primary-color)",
                                            fontWeight: 600,
                                            mb: 2,
                                        }}
                                    >
                                        Up Next
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "var(--secondary-color)" }}
                                    >
                                        Related videos will appear here
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        {/* Comments Section */}
                        <Box
                            sx={{
                                background: "rgba(255, 255, 255, 0.9)",
                                backdropFilter: "blur(20px)",
                                borderRadius: 4,
                                overflow: "hidden",
                                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                            }}
                        >
                            {/* Comment Form */}
                            <Box
                                sx={{
                                    p: { xs: 2, sm: 3, md: 4 },
                                    borderBottom:
                                        "1px solid rgba(0, 0, 0, 0.08)",
                                }}
                            >
                                <CommentForm videoId={videoId} />
                            </Box>

                            {/* Comments List */}
                            <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                                {commentsLoading ? (
                                    <Box>
                                        {[...Array(3)].map((_, i) => (
                                            <Box key={i} sx={{ mb: 3 }}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        mb: 1,
                                                    }}
                                                >
                                                    <Skeleton
                                                        variant="circular"
                                                        width={40}
                                                        height={40}
                                                    />
                                                    <Skeleton
                                                        width={120}
                                                        height={20}
                                                        sx={{ ml: 2 }}
                                                    />
                                                </Box>
                                                <Skeleton
                                                    width="90%"
                                                    height={60}
                                                />
                                            </Box>
                                        ))}
                                    </Box>
                                ) : (
                                    <CommentList videoId={videoId} />
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default Video;
