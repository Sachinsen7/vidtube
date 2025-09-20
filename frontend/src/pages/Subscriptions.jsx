import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import SubscriptionFeed from "../components/subscription/SusbscriptionFeed";
import { useAuth } from "../hooks/useAuth";

const Subscriptions = () => {
    const { user } = useAuth();
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <Box
            sx={{
                p: { xs: 2, sm: 3, md: 4 },
                width: "100%",
                maxWidth: "100%",
            }}
        >
            <Typography
                variant={isMobile ? "h5" : "h4"}
                gutterBottom
                sx={{
                    color: "var(--primary-color)",
                    textAlign: { xs: "center", sm: "left" },
                }}
            >
                {user
                    ? "Your Subscriptions"
                    : "Please log in to view subscriptions"}
            </Typography>
            {user && <SubscriptionFeed channelId={user._id} />}
        </Box>
    );
};

export default Subscriptions;
