import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useVideos } from "../hooks/useVideo";
import { useComments } from "../hooks/useComments";
import VideoPlayer from "../components/video/VideoPlayer";
import CommentForm from "../components/comment/CommentForm";
import CommentList from "../components/comment/CommentList";

const Video = () => {
    const { videoId } = useParams();
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
        }
    }, [videoId]);

    if (videoLoading || commentsLoading)
        return (
            <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
        );
    if (videoError) return <Alert severity="error">{videoError}</Alert>;
    if (commentsError) return <Alert severity="error">{commentsError}</Alert>;

    return (
        <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", p: { xs: 2, sm: 3 } }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "var(--primary-color)" }}
            >
                Watch Video
            </Typography>
            <VideoPlayer video={selectedVideo} />
            <Box sx={{ mt: 2 }}>
                <CommentForm videoId={videoId} />
            </Box>
            <Box sx={{ mt: 2 }}>
                <CommentList videoId={videoId} />
            </Box>
        </Box>
    );
};

export default Video;
