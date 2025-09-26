import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Container,
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
            setTimeout(() => setPageLoaded(true), 300);
        }
    }, [videoId]);

    if (videoError || commentsError) {
        return (
            <Alert
                severity="error"
                sx={{ m: 2, borderRadius: 2 }}
                data-testid="error-alert"
            >
                {videoError || commentsError}
            </Alert>
        );
    }

    return (
        <Box sx={{ bgcolor: "#f5f5f5", py: 2 }}>
            <Container sx={{ px: { xs: 1, sm: 2 } }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", lg: "1fr 300px" },
                        gap: 2,
                    }}
                >
                    <Box>
                        {videoLoading ? (
                            <Box>
                                <Skeleton
                                    variant="rectangular"
                                    height={isMobile ? 200 : 400}
                                    sx={{ borderRadius: 2, mb: 2 }}
                                />
                                <Skeleton width="80%" height={32} />
                                <Skeleton
                                    width="60%"
                                    height={16}
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                        ) : (
                            <VideoPlayer
                                video={selectedVideo}
                                data-testid="video-player"
                            />
                        )}
                    </Box>
                    {!isMobile && (
                        <Box
                            sx={{
                                bgcolor: "white",
                                p: 2,
                                borderRadius: 2,
                                border: "1px solid #e0e0e0",
                                height: "fit-content",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ color: "#1976d2", mb: 1 }}
                                data-testid="up-next"
                            >
                                Up Next
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#757575" }}
                            >
                                Related videos will appear here
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        bgcolor: "white",
                        borderRadius: 2,
                        mt: 2,
                        border: "1px solid #e0e0e0",
                    }}
                >
                    <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
                        <CommentForm videoId={videoId} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        {commentsLoading ? (
                            <Box>
                                {[...Array(3)].map((_, i) => (
                                    <Box key={i} sx={{ mb: 2 }}>
                                        <Skeleton
                                            variant="circular"
                                            width={32}
                                            height={32}
                                        />
                                        <Skeleton
                                            width="80%"
                                            height={16}
                                            sx={{ mt: 1 }}
                                        />
                                        <Skeleton
                                            width="60%"
                                            height={12}
                                            sx={{ mt: 1 }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <CommentList videoId={videoId} />
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Video;
