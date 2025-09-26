import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useComments } from "../../hooks/useComments";

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
            sx={{ maxWidth: 600, mx: "auto" }}
        >
            <Typography
                variant="h6"
                sx={{ color: "#1976d2", mb: 2 }}
                data-testid="comment-form-title"
            >
                Add a Comment
            </Typography>
            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 2, borderRadius: 2 }}
                    data-testid="error-alert"
                >
                    {error}
                </Alert>
            )}
            <TextField
                label="Comment"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={4}
                fullWidth
                required
                sx={{
                    mb: 2,
                    "& .Mui-focused fieldset": { borderColor: "#1976d2" },
                }}
                data-testid="comment-input"
            />
            <Button
                type="submit"
                disabled={isLoading}
                variant="contained"
                sx={{ bgcolor: "#1976d2", borderRadius: 1 }}
                data-testid="post-comment"
            >
                {isLoading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                    "Post Comment"
                )}
            </Button>
        </Box>
    );
};

export default CommentForm;
