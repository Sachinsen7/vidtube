import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    useMediaQuery,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useVideos } from "../hooks/useVideo";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const VideoUploadPage = () => {
    const { user } = useAuth();
    const { publishVideo, isLoading, error } = useVideos();
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:600px)");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        videoFile: null,
        thumbnail: null,
    });

    if (!user) {
        return (
            <Box
                sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    textAlign: "center",
                    backgroundColor: "var(--background-color)",
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    sx={{ color: "var(--primary-color)" }}
                >
                    Please log in to upload videos
                </Typography>
            </Box>
        );
    }

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
        try {
            await publishVideo(data);
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: { xs: "100%", sm: 600 },
                width: "100%",
                mx: "auto",
                p: { xs: 2, sm: 3 },
                backgroundColor: "var(--background-color)",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Typography
                variant={isMobile ? "h5" : "h4"}
                gutterBottom
                sx={{
                    color: "var(--primary-color)",
                    textAlign: { xs: "center", sm: "left" },
                    fontWeight: "bold",
                }}
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
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
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
            <Button
                type="submit"
                disabled={isLoading}
                sx={{
                    backgroundColor: "var(--secondary-color)",
                    "&:hover": { backgroundColor: "#e04416" },
                }}
            >
                {isLoading ? <CircularProgress size={24} /> : "Upload Video"}
            </Button>
        </Box>
    );
};

export default VideoUploadPage;
