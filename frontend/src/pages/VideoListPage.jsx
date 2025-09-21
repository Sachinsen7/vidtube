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
        useVideos({
            userId: user?._id,
        });

    useEffect(() => {
        if (user?._id) {
            loadVideos();
        }
    }, [user?._id]); // Only depend on user ID

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
                    sx={{ color: "var(--primary-color)" }}
                >
                    Please log in to view your videos
                </Typography>
            </Box>
        );
    }

    if (isLoading && pages === 1) {
        return (
            <CircularProgress
                sx={{
                    display: "block",
                    mx: "auto",
                    my: 2,
                    color: "var(--secondary-color)",
                }}
            />
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ maxWidth: 600, mx: "auto" }}>
                {error}
            </Alert>
        );
    }

    return (
        <Box
            sx={{
                p: { xs: 2, sm: 3, md: 4 },
                width: "100%",
                maxWidth: "100%",
                backgroundColor: "var(--background-color)",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
                            color: "var(--secondary-color)",
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
