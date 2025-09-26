import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Alert,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useVideos } from "../../hooks/useVideo";

const VideoUploadForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        videoFile: null,
        thumbnail: null,
    });
    const { publishVideo, isLoading, error } = useVideos();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) data.append(key, value);
        });
        await publishVideo(data);
        if (!error)
            setFormData({
                title: "",
                description: "",
                videoFile: null,
                thumbnail: null,
            });
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
                data-testid="upload-title"
            >
                Upload Video
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
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": { borderRadius: 2 },
                    "& .Mui-focused fieldset": { borderColor: "#1976d2" },
                }}
                data-testid="title-input"
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": { borderRadius: 2 },
                    "& .Mui-focused fieldset": { borderColor: "#1976d2" },
                }}
                data-testid="description-input"
            />
            <TextField
                label="Video File"
                name="videoFile"
                type="file"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: "video/*" }}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": { borderRadius: 2 },
                    "& .Mui-focused fieldset": { borderColor: "#1976d2" },
                }}
                data-testid="video-file-input"
            />
            <TextField
                label="Thumbnail"
                name="thumbnail"
                type="file"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: "image/*" }}
                onChange={handleChange}
                fullWidth
                sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": { borderRadius: 2 },
                    "& .Mui-focused fieldset": { borderColor: "#1976d2" },
                }}
                data-testid="thumbnail-input"
            />
            <Button
                type="submit"
                disabled={isLoading}
                variant="contained"
                sx={{ bgcolor: "#1976d2", borderRadius: 2 }}
                data-testid="upload-button"
            >
                {isLoading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                    "Upload Video"
                )}
            </Button>
        </Box>
    );
};

export default VideoUploadForm;
