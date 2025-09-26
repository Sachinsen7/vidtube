import React, { useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    CircularProgress,
    Alert,
    useTheme,
    useMediaQuery,
    Skeleton,
} from "@mui/material";
import { VideoLibrary as VideoIcon } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useVideos } from "../../hooks/useVideo";
import VideoCard from "../video/VideoCard";

const VideoSkeletonCard = () => (
    <Box
        sx={{ bgcolor: "white", borderRadius: 2, border: "1px solid #e0e0e0" }}
    >
        <Skeleton variant="rectangular" height={180} />
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Skeleton variant="circular" width={32} height={32} />
                <Box sx={{ ml: 2, flex: 1 }}>
                    <Skeleton width="60%" height={12} />
                    <Skeleton width="40%" height={10} />
                </Box>
            </Box>
            <Skeleton width="90%" height={16} />
            <Skeleton width="70%" height={16} />
        </Box>
    </Box>
);

const VideoList = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { videos, isLoading, error, pages, setPages, hasMore, loadVideos } =
        useVideos({ userVideos: true });

    useEffect(() => {
        loadVideos();
    }, []);

    if (error) {
        return (
            <Alert
                severity="error"
                sx={{ borderRadius: 2 }}
                data-testid="error-alert"
            >
                {error}
            </Alert>
        );
    }

    return (
        <Box
            sx={{
                bgcolor: "white",
                p: 3,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
            }}
        >
            <Typography
                variant="h6"
                sx={{ color: "#1976d2", mb: 2 }}
                data-testid="videos-title"
            >
                Your Videos
            </Typography>
            <InfiniteScroll
                dataLength={Array.isArray(videos) ? videos.length : 0}
                next={() => setPages(pages + 1)}
                hasMore={hasMore}
                loader={
                    <CircularProgress
                        sx={{
                            color: "#1976d2",
                            my: 2,
                            display: "block",
                            mx: "auto",
                        }}
                    />
                }
                endMessage={
                    Array.isArray(videos) &&
                    videos.length > 0 && (
                        <Typography
                            sx={{
                                textAlign: "center",
                                py: 2,
                                color: "#757575",
                            }}
                            data-testid="end-message"
                        >
                            You've seen all your videos!
                        </Typography>
                    )
                }
            >
                <Grid container spacing={2}>
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
                                        <VideoSkeletonCard />
                                    </Grid>
                                ))}
                            </>
                        )}
                    {Array.isArray(videos) &&
                        videos.map((video) => (
                            <Grid item xs={12} sm={6} md={4} key={video._id}>
                                <VideoCard video={video} />
                            </Grid>
                        ))}
                </Grid>
            </InfiniteScroll>
            {!isLoading && (!Array.isArray(videos) || videos.length === 0) && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                    <VideoIcon sx={{ fontSize: 48, color: "#757575", mb: 2 }} />
                    <Typography
                        variant="h6"
                        sx={{ color: "#757575" }}
                        data-testid="empty-state"
                    >
                        No videos uploaded yet
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#757575" }}>
                        Start sharing your creativity with the world!
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default VideoList;
