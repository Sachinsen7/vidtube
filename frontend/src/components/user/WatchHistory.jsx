import React, { useEffect } from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "../../hooks/useAuth";
import { getWatchHistory } from "../../services/auth";
import VideoCard from "../video/VideoCard";

const WatchHistory = () => {
    const { user } = useAuth();
    const [videos, setVideos] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [hasMore, setHasMore] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            try {
                const response = await getWatchHistory({ page, limit: 10 });
                setVideos((prev) => [...prev, ...response]);
                if (response.length < 10) setHasMore(false);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                        "Failed to fetch watch history"
                );
                setHasMore(false);
            }
            setIsLoading(false);
        };
        if (user) fetchHistory();
    }, [user, page]);

    const loadMore = () => {
        if (hasMore) setPage(page + 1);
    };

    if (isLoading && page === 1)
        return (
            <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
        );
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ p: 2, backgroundColor: "var(--background-color)" }}>
            <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "var(--primary-color)" }}
            >
                Watch History
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

export default WatchHistory;
