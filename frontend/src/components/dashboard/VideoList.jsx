import React from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useVideos } from "../../hooks/useVideos";
import VideoCard from "../video/VideoCard";

const VideoList = () => {
    const { videos, isLoading, error, page, setPage, hasMore } = useVideos({
        userVideos: true,
    });

    const loadMore = () => {
        if (hasMore) setPage(page + 1);
    };

    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ p: 2, backgroundColor: "var(--background-color)" }}>
            <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "var(--primary-color)" }}
            >
                Your Videos
            </Typography>
            <InfiniteScroll
                dataLength={videos.length}
                next={loadMore}
                hasMore={hasMore}
                loader={
                    <CircularProgress
                        sx={{ display: "block", mx: "auto", my: 2 }}
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

export default VideoList;
