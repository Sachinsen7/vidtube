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
        <Box
            sx={{
                width: "100%",
                maxWidth: "100%",
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "var(--primary-color)" }}
            >
                Watch Video
            </Typography>
            <VideoPlayer video={selectedVideo} />
            <CommentForm videoId={videoId} />
            <CommentList videoId={videoId} />
        </Box>
    );
};

export default Video;
