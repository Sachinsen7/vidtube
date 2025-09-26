import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    IconButton,
    Alert,
    Typography,
    Avatar,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    Image as ImageIcon,
    Close as CloseIcon,
    Send as SendIcon,
} from "@mui/icons-material";
import { useTweets } from "../../hooks/useTweets";
import { useAuth } from "../../hooks/useAuth";

const TweetForm = ({ userId }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { user } = useAuth();
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { createTweet, isLoading, error } = useTweets(userId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() && !image) return;

        const formData = new FormData();
        formData.append("content", content);
        if (image) formData.append("image", image);

        try {
            await createTweet(formData);
            setContent("");
            setImage(null);
            setImagePreview(null);
        } catch (err) {
            // Error handled by useTweets
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const characterCount = content.length;
    const isOverLimit = characterCount > 280;
    const canSubmit = (content.trim() || image) && !isOverLimit && !isLoading;

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {user && (
                <Box
                    sx={{ display: "flex", alignItems: "center", mb: 2, mt: 5 }}
                >
                    <Avatar
                        src={user.avatar}
                        sx={{ width: 40, height: 40, mr: 2 }}
                        data-testid="user-avatar"
                    >
                        {user.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                        variant="subtitle1"
                        sx={{ color: "#1976d2", fontWeight: 600 }}
                    >
                        {user.fullName || user.username}
                    </Typography>
                </Box>
            )}
            <TextField
                placeholder="Share your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor: "white",
                        "& fieldset": { borderColor: "#e0e0e0" },
                    },
                    "& .Mui-focused fieldset": { borderColor: "#1976d2" },
                }}
                data-testid="tweet-input"
            />
            {imagePreview && (
                <Box sx={{ mb: 2, position: "relative" }}>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                            width: "100%",
                            maxHeight: 150,
                            objectFit: "cover",
                            borderRadius: 2,
                        }}
                    />
                    <IconButton
                        onClick={removeImage}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                        }}
                        size="small"
                        data-testid="remove-image"
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}
            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 2, borderRadius: 2 }}
                    data-testid="error-alert"
                >
                    {error}
                </Alert>
            )}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="image-upload"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="image-upload">
                        <IconButton
                            sx={{ color: "#1976d2" }}
                            component="span"
                            data-testid="image-upload"
                        >
                            <ImageIcon />
                        </IconButton>
                    </label>
                    {image && (
                        <Typography variant="caption" sx={{ color: "#757575" }}>
                            {image.name}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                        variant="caption"
                        sx={{ color: isOverLimit ? "#f44336" : "#757575" }}
                        data-testid="char-count"
                    >
                        {characterCount}/280
                    </Typography>
                    <Button
                        type="submit"
                        disabled={!canSubmit}
                        variant="contained"
                        sx={{ bgcolor: "#1976d2", borderRadius: 2, px: 3 }}
                        endIcon={<SendIcon />}
                        data-testid="tweet-submit"
                    >
                        Post
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default TweetForm;
