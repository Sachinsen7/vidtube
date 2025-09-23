import { useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import React from "react";

const VideoPlayer = ({ video }) => {
    if (!video) return <Typography>No video selected</Typography>;

    const [err, setErr] = useState(null);
    const videoUrl = video?.videoFile;

    if (!videoUrl) {
        return <Alert severity="error">No video URL</Alert>;
    }

    return (
        <Box sx={{ width: "100%", maxWidth: "100%", mb: 2 }}>
            <Box
                component="video"
                src={videoUrl}
                controls
                style={{
                    width: "100%",
                    maxHeight: 540,
                    borderRadius: 8,
                    backgroundColor: "#000",
                }}
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
