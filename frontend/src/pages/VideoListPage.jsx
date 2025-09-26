import React, { useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    CircularProgress,
    Alert,
    useMediaQuery,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useVideos } from "../hooks/useVideo";
import VideoCard from "../components/video/VideoCard";
import InfiniteScroll from "react-infinite-scroll-component";

const VideoListPage = () => {
    const { user } = useAuth();
    const isMobile = useMediaQuery("(max-width:600px)");
    const { videos, isLoading, error, pages, setPages, hasMore, loadVideos } =
        useVideos({ userId: user?._id });

    useEffect(() => {
        if (user?._id) loadVideos();
    }, [user?._id]);

    if (!user) {
        return (
            <Box
                sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: "white",
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ color: "#1976d2" }}
                    data-testid="login-required"
                >
                    Please log in to view your videos
                </Typography>
            </Box>
        );
    }

    if (isLoading && pages === 1) {
        return (
            <CircularProgress
                sx={{ display: "block", mx: "auto", my: 2, color: "#1976d2" }}
                data-testid="loading"
            />
        );
    }

    if (error) {
        return (
            <Alert
                severity="error"
                sx={{ maxWidth: 600, mx: "auto", borderRadius: 2 }}
                data-testid="error-alert"
            >
                {error}
            </Alert>
        );
    }

    return (
        <Box sx={{ p: 2, bgcolor: "#f5f5f5" }}>
            <Typography
                variant="h5"
                sx={{ color: "#1976d2", mb: 2, fontWeight: 600 }}
                data-testid="videos-title"
            >
                Your Videos
            </Typography>
            <InfiniteScroll
                dataLength={videos.length}
                next={() => setPages(pages + 1)}
                hasMore={hasMore}
                loader={
                    <CircularProgress
                        sx={{
                            display: "block",
                            mx: "auto",
                            my: 2,
                            color: "#1976d2",
                        }}
                    />
                }
            >
                <Grid container spacing={2}>
                    {videos.map((video) => (
                        <Grid item xs={12} sm={6} md={4} key={video._id}>
                            <VideoCard video={video} />
                        </Grid>
                    ))}
                </Grid>
            </InfiniteScroll>
        </Box>
    );
};

export default VideoListPage;
