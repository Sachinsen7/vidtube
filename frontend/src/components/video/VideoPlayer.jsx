import React from "react";
import { Box, Typography } from "@mui/material";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video }) => {
    if (!video) return <Typography>No video selected</Typography>;

    return (
        <Box sx={{ width: "100%", maxWidth: "100%" }}>
            <ReactPlayer
                url={video.videoFile}
                width="100%"
                height="450px"
                controls
                playing
            />
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
