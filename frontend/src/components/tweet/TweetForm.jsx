import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    IconButton,
    Alert,
    useMediaQuery,
    CircularProgress,
    Typography,
    Paper,
    Chip,
    Avatar,
    useTheme,
    Fade,
} from "@mui/material";
import {
    Image as ImageIcon,
    EmojiEmotions as EmojiIcon,
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
        <Box>
            {/* User Info */}
            {user && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar
                        src={user.avatar}
                        sx={{
                            width: 48,
                            height: 48,
                            mr: 2,
                            border: "2px solid rgba(255, 255, 255, 0.8)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        }}
                    >
                        {user.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: "var(--primary-color)",
                                fontWeight: 600,
                            }}
                        >
                            {user.fullName || user.username}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ color: "var(--secondary-color)" }}
                        >
                            What's on your mind?
                        </Typography>
                    </Box>
                </Box>
            )}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: "100%",
                }}
            >
                {/* Text Input */}
                <TextField
                    placeholder="Share your thoughts..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    multiline
                    minRows={3}
                    maxRows={6}
                    fullWidth
                    variant="outlined"
                    sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            background: "rgba(255, 255, 255, 0.8)",
                            backdropFilter: "blur(10px)",
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                            "& fieldset": {
                                borderColor: "rgba(0, 0, 0, 0.1)",
                                borderWidth: 2,
                            },
                            "&:hover fieldset": {
                                borderColor: "var(--primary-color)",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "var(--primary-color)",
                                borderWidth: 2,
                            },
                        },
                        "& .MuiOutlinedInput-input": {
                            color: "var(--primary-color)",
                            "&::placeholder": {
                                color: "var(--secondary-color)",
                                opacity: 0.8,
                            },
                        },
                    }}
                />

                {/* Image Preview */}
                {imagePreview && (
                    <Fade in={true} timeout={300}>
                        <Paper
                            sx={{
                                mb: 2,
                                borderRadius: 3,
                                overflow: "hidden",
                                position: "relative",
                                background: "rgba(255, 255, 255, 0.9)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{
                                    width: "100%",
                                    maxHeight: 200,
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                            <IconButton
                                onClick={removeImage}
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    background: "rgba(0, 0, 0, 0.6)",
                                    color: "white",
                                    "&:hover": {
                                        background: "rgba(0, 0, 0, 0.8)",
                                    },
                                }}
                                size="small"
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Paper>
                    </Fade>
                )}

                {/* Error Alert */}
                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            mb: 2,
                            borderRadius: 2,
                            background: "rgba(255, 255, 255, 0.9)",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        {error}
                    </Alert>
                )}

                {/* Actions Bar */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    {/* Media Controls */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="image-upload"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="image-upload">
                            <IconButton
                                component="span"
                                sx={{
                                    color: "var(--primary-color)",
                                    background: "rgba(255, 255, 255, 0.8)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(0, 0, 0, 0.1)",
                                    "&:hover": {
                                        background: "rgba(255, 255, 255, 1)",
                                        transform: "scale(1.05)",
                                    },
                                    transition: "all 0.2s ease",
                                }}
                                size="medium"
                            >
                                <ImageIcon />
                            </IconButton>
                        </label>

                        {image && (
                            <Chip
                                label={image.name}
                                size="small"
                                onDelete={removeImage}
                                sx={{
                                    background: "rgba(76, 175, 80, 0.1)",
                                    color: "#4caf50",
                                    border: "1px solid rgba(76, 175, 80, 0.3)",
                                    maxWidth: 150,
                                }}
                            />
                        )}
                    </Box>

                    {/* Character Count & Submit */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: isOverLimit
                                    ? "#f44336"
                                    : characterCount > 260
                                      ? "#ff9800"
                                      : "var(--secondary-color)",
                                fontWeight: 600,
                                fontSize: "0.85rem",
                            }}
                        >
                            {characterCount}/280
                        </Typography>

                        <Button
                            type="submit"
                            disabled={!canSubmit}
                            variant="contained"
                            endIcon={isLoading ? null : <SendIcon />}
                            sx={{
                                background: canSubmit
                                    ? "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)"
                                    : "#e0e0e0",
                                color: canSubmit ? "white" : "#9e9e9e",
                                borderRadius: 3,
                                px: 3,
                                py: 1,
                                fontWeight: 600,
                                minWidth: 100,
                                "&:hover": {
                                    background: canSubmit
                                        ? "linear-gradient(135deg, #032e4b 0%, #e04416 100%)"
                                        : "#e0e0e0",
                                    transform: canSubmit
                                        ? "translateY(-1px)"
                                        : "none",
                                    boxShadow: canSubmit
                                        ? "0 6px 20px rgba(0, 0, 0, 0.15)"
                                        : "none",
                                },
                                "&:disabled": {
                                    background: "#e0e0e0",
                                    color: "#9e9e9e",
                                },
                                transition: "all 0.2s ease",
                            }}
                        >
                            {isLoading ? (
                                <CircularProgress
                                    size={20}
                                    sx={{ color: "#9e9e9e" }}
                                />
                            ) : (
                                "Post"
                            )}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TweetForm;
