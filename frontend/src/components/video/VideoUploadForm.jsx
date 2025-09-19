import React, { useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useVideos } from "../../hooks/useVideo";
import Button from "../common/Button";
import Input from "../common/Input";

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
                Upload Video
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
            />
            <Input
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                sx={{ mb: 2 }}
            />
            <Input
                label="Video File"
                name="videoFile"
                type="file"
                accept="video/*"
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
            />
            <Input
                label="Thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <Button type="submit" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : "Upload Video"}
            </Button>
        </Box>
    );
};

export default VideoUploadForm;
