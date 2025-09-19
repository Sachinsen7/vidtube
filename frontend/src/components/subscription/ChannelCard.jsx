import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
} from "@mui/material";
import { useSubscriptions } from "../../hooks/useSubscriptions";
import Avatar from "../common/Avatar";

const ChannelCard = ({ channel }) => {
    const navigate = useNavigate();
    const { toggleSubscription, subscribedChannels, isLoading } =
        useSubscriptions(channel._id);
    const isSubscribed = subscribedChannels.some(
        (sub) => sub._id === channel._id
    );

    const handleToggleSubscription = () => {
        toggleSubscription(channel._id);
    };

    const handleClick = () => {
        navigate(`/c/${channel.username}`);
    };

    return (
        <Card
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            sx={{
                maxWidth: 345,
                boxShadow: 3,
                backgroundColor: "var(--background-color)",
            }}
            onClick={handleClick}
        >
            <CardMedia
                component="img"
                height="140"
                image={
                    channel.coverImage || "https://via.placeholder.com/345x140"
                }
                alt={channel.username}
            />
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar
                        src={channel.avatar}
                        alt={channel.username}
                        size={40}
                    />
                    <Typography
                        variant="h6"
                        sx={{ ml: 1, color: "var(--primary-color)" }}
                    >
                        {channel.username}
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    sx={{ color: "var(--secondary-color)" }}
                >
                    {channel.subscribersCount || 0} subscribers
                </Typography>
                <Button
                    variant={isSubscribed ? "outlined" : "contained"}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggleSubscription();
                    }}
                    disabled={isLoading}
                    sx={{ mt: 1 }}
                >
                    {isSubscribed ? "Unsubscribe" : "Subscribe"}
                </Button>
            </CardContent>
        </Card>
    );
};

export default ChannelCard;
