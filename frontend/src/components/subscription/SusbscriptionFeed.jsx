import React from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSubscriptions } from "../../hooks/useSubscriptions";
import { useVideos } from "../../hooks/useVideo";
import VideoCard from "../video/VideoCard";

const SubscriptionFeed = ({ channelId }) => {
    const {
        subscribedChannels,
        isLoading: subLoading,
        error: subError,
    } = useSubscriptions(channelId);
    const {
        videos,
        isLoading: videoLoading,
        error: videoError,
        page,
        setPage,
        hasMore,
    } = useVideos({
        subscribed: true,
    });

    const loadMore = () => {
        if (hasMore) setPage(page + 1);
    };

    if (subLoading || videoLoading)
        return (
            <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
        );
    if (subError) return <Alert severity="error">{subError}</Alert>;
    if (videoError) return <Alert severity="error">{videoError}</Alert>;

    return (
        <Box sx={{ p: 2, backgroundColor: "var(--background-color)" }}>
            <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "var(--primary-color)" }}
            >
                Subscription Feed ({subscribedChannels.length} channels)
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

export default SubscriptionFeed;
