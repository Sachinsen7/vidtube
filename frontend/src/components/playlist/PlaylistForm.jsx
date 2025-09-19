import React, { useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { usePlaylists } from "../../hooks/usePlaylists";
import Button from "../common/Button";
import Input from "../common/Input";

const PlaylistForm = ({ userId, initialPlaylist = null }) => {
    const [formData, setFormData] = useState({
        name: initialPlaylist?.name || "",
        description: initialPlaylist?.description || "",
        videos: initialPlaylist?.videos || [],
    });
    const { createPlaylist, updatePlaylist, isLoading, error } =
        usePlaylists(userId);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedVideos = [...formData.videos];
        const [movedVideo] = reorderedVideos.splice(result.source.index, 1);
        reorderedVideos.splice(result.destination.index, 0, movedVideo);
        setFormData({ ...formData, videos: reorderedVideos });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (initialPlaylist) {
            await updatePlaylist(initialPlaylist._id, formData);
        } else {
            await createPlaylist(formData);
        }
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
                {initialPlaylist ? "Edit Playlist" : "Create Playlist"}
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Input
                label="Playlist Name"
                name="name"
                value={formData.name}
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
            <Typography
                variant="subtitle1"
                sx={{ color: "var(--primary-color)", mb: 1 }}
            >
                Videos
            </Typography>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="videos">
                    {(provided) => (
                        <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            sx={{
                                minHeight: 100,
                                border: "1px solid var(--primary-color)",
                                p: 1,
                            }}
                        >
                            {formData.videos.map((video, index) => (
                                <Draggable
                                    key={video._id}
                                    draggableId={video._id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{
                                                p: 1,
                                                borderBottom:
                                                    "1px solid var(--secondary-color)",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "var(--primary-color)",
                                                }}
                                            >
                                                {video.title}
                                            </Typography>
                                        </Box>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <CircularProgress size={24} />
                ) : initialPlaylist ? (
                    "Update Playlist"
                ) : (
                    "Create Playlist"
                )}
            </Button>
        </Box>
    );
};

export default PlaylistForm;
