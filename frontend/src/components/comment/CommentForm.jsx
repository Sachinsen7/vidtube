import React, { useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useComments } from "../../hooks/useComments";
import Button from "../common/Button";
import Input from "../common/Input";

const CommentForm = ({ videoId }) => {
    const [content, setContent] = useState("");
    const { addComment, isLoading, error } = useComments(videoId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        await addComment(content);
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
                Add a Comment
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Input
                label="Comment"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={4}
                required
                sx={{ mb: 2 }}
            />
            <Button type="submit" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : "Post Comment"}
            </Button>
        </Box>
    );
};

export default CommentForm;
