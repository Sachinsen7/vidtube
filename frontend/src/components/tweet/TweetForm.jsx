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
} from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";
import { useTweets } from "../../hooks/useTweets";

const TweetForm = ({ userId }) => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const { createTweet, isLoading, error } = useTweets(userId);
    const isMobile = useMediaQuery("(max-width:600px)");

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
        } catch (err) {
            // Error handled by useTweets
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: { xs: "100%", sm: 600 },
                mx: "auto",
                p: { xs: 2, sm: 3 },
                mb: 2,
                background: "linear-gradient(135deg, #fcffff 0%, #e6f0fa 100%)",
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(4, 54, 100, 0.15)",
                transition: "all 0.3s ease",
                "&:hover": { boxShadow: "0 8px 24px rgba(4, 54, 100, 0.2)" },
            }}
        >
            <TextField
                label="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, 280))}
                multiline
                rows={3}
                fullWidth
                required={!image}
                sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": { borderColor: "var(--primary-color)" },
                        "&:hover fieldset": {
                            borderColor: "var(--secondary-color)",
                        },
                    },
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Box>
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
                            sx={{ color: "var(--secondary-color)" }}
                        >
                            <ImageIcon />
                        </IconButton>
                    </label>
                    {image && (
                        <Typography
                            variant="caption"
                            sx={{ color: "var(--primary-color)" }}
                        >
                            {image.name}
                        </Typography>
                    )}
                </Box>
                <Typography
                    variant="caption"
                    sx={{
                        color:
                            content.length > 260
                                ? "var(--secondary-color)"
                                : "var(--primary-color)",
                    }}
                >
                    {content.length}/280
                </Typography>
            </Box>
            {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    {error}
                </Alert>
            )}
            <Button
                type="submit"
                disabled={isLoading || (!content.trim() && !image)}
                sx={{
                    background:
                        "linear-gradient(45deg, var(--primary-color) 30%, var(--secondary-color) 90%)",
                    color: "#fcffff",
                    borderRadius: 2,
                    padding: "8px 16px",
                    fontWeight: "bold",
                    "&:hover": {
                        background:
                            "linear-gradient(45deg, #032e4b 30%, #e04416 90%)",
                    },
                    "&:disabled": { background: "grey", cursor: "not-allowed" },
                }}
            >
                {isLoading ? (
                    <CircularProgress size={24} sx={{ color: "#fcffff" }} />
                ) : (
                    "Tweet"
                )}
            </Button>
        </Box>
    );
};

export default TweetForm;
