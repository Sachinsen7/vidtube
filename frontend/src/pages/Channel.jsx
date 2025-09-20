import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { getUserChannelProfile } from "../services/auth";
import ChannelCard from "../components/subscription/ChannelCard";
import VideoList from "../components/dashboard/VideoList";

const Channel = () => {
    const { username } = useParams();
    const [channel, setChannel] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChannel = async () => {
            setIsLoading(true);
            try {
                const response = await getUserChannelProfile(username);
                setChannel(response);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to fetch channel"
                );
            }
            setIsLoading(false);
        };
        fetchChannel();
    }, [username]);

    if (isLoading)
        return (
            <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
        );
    if (error) return <Alert severity="error">{error}</Alert>;

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
                Channel
            </Typography>
            {channel && (
                <>
                    <ChannelCard channel={channel} />
                    <VideoList params={{ username: channel.username }} />
                </>
            )}
        </Box>
    );
};

export default Channel;
