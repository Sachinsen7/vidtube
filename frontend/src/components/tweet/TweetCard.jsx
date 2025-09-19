import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTweets } from "../../hooks/useTweets";
import { formatDate } from "../../utils/formatDate";

const TweetCard = ({ tweet }) => {
    const { tweets } = useTweets(tweet.owner);

    return (
        <Card
            sx={{
                maxWidth: 600,
                mx: "auto",
                mb: 2,
                backgroundColor: "var(--background-color)",
            }}
        >
            <CardContent>
                <Typography
                    variant="body1"
                    sx={{ color: "var(--primary-color)" }}
                >
                    {tweet.content}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: "var(--secondary-color)", mt: 1 }}
                >
                    {tweet.owner.username} • {formatDate(tweet.createdAt)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TweetCard;
