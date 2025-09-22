import React from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video }) => {
    if (!video) return <Typography>No video selected</Typography>;

    const [err, setErr] = useState(null);
    const videoUrl = video?.videoFile;

    if (!videoUrl) {
        return <Alert severity="error">No video URL</Alert>;
    }

    return (
        <Box sx={{ width: "100%", maxWidth: "100%" }}>
            <ReactPlayer
                url={videoUrl}
                width="100%"
                height="450px"
                controls
                playing
                onError={() => setErr("Failed to load video")}
            />
            {err && <Alert severity="error">{err}</Alert>}
            <Typography
                variant="h5"
                sx={{ mt: 2, color: "var(--primary-color)" }}
            >
                {video.title}
            </Typography>
            <Typography
                variant="body2"
                sx={{ color: "var(--secondary-color)" }}
            >
                {video.description}
            </Typography>
        </Box>
    );
};

export default VideoPlayer;
