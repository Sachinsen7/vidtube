import React, { useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useTweets } from "../../hooks/useTweets";
import Button from "../common/Button";
import Input from "../common/Input";

const TweetForm = ({ userId, initialTweet = null }) => {
    const [content, setContent] = useState(initialTweet?.content || "");
    const { createTweet, updateTweet, isLoading, error } = useTweets(userId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        if (initialTweet) {
            await updateTweet(initialTweet._id, content);
        } else {
            await createTweet(content);
        }
        if (!error) setContent("");
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 600,
                mx: "auto",
                p: 2,
                backgroundColor: "var(--background-color)",
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "var(--primary-color)" }}
            >
                {initialTweet ? "Edit Tweet" : "Create Tweet"}
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Input
                label="Tweet"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={4}
                required
                sx={{ mb: 2 }}
            />
            <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <CircularProgress size={24} />
                ) : initialTweet ? (
                    "Update Tweet"
                ) : (
                    "Post Tweet"
                )}
            </Button>
        </Box>
    );
};

export default TweetForm;
