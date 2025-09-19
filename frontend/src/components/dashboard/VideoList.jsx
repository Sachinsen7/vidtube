import React, { useEffect } from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { getChannelVideos } from "../../services/dashboard";
import VideoCard from "../video/VideoCard";

const VideoList = () => {
    const { user } = useAuth();
    const [videos, setVideos] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            setIsLoading(true);
            try {
                const response = await getChannelVideos();
                setVideos(response);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to fetch videos"
                );
            }
            setIsLoading(false);
        };
        if (user) fetchVideos();
    }, [user]);

    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Your Videos
            </Typography>
            <Grid container spacing={2}>
                {videos.map((video) => (
                    <Grid item xs={12} sm={6} md={4} key={video._id}>
                        <VideoCard video={video} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default VideoList;
