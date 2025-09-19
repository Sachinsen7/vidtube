import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Button,
} from "@mui/material";
import { usePlaylists } from "../hooks/usePlaylists";
import { useAuth } from "../hooks/useAuth";
import PlaylistCard from "../components/playlist/PlaylistCard";
import PlaylistForm from "../components/playlist/PlaylistForm";
import Modal from "../components/common/Model";
import VideoCard from "../components/video/VideoCard";
import { Grid } from "@mui/material";

const Playlist = () => {
    const { playlistId } = useParams();
    const { user } = useAuth();
    const { selectedPlaylist, isLoading, error, fetchPlaylistById } =
        usePlaylists(user?._id);
    const [isEditing, setIsEditing] = React.useState(false);

    useEffect(() => {
        fetchPlaylistById(playlistId);
    }, [fetchPlaylistById, playlistId]);

    if (isLoading)
        return (
            <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
        );
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box
            sx={{
                backgroundColor: "var(--background-color)",
                minHeight: "100vh",
                p: 2,
                maxWidth: 1200,
                mx: "auto",
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "var(--primary-color)" }}
            >
                Playlist
            </Typography>
            {selectedPlaylist && (
                <>
                    <PlaylistCard playlist={selectedPlaylist} />
                    {user?._id === selectedPlaylist.owner && (
                        <Button
                            variant="contained"
                            onClick={() => setIsEditing(true)}
                            sx={{
                                my: 2,
                                backgroundColor: "var(--secondary-color)",
                            }}
                        >
                            Edit Playlist
                        </Button>
                    )}
                    <Typography
                        variant="h6"
                        sx={{ color: "var(--primary-color)", mt: 2 }}
                    >
                        Videos
                    </Typography>
                    <Grid container spacing={2}>
                        {selectedPlaylist.videos.map((video) => (
                            <Grid item xs={12} sm={6} md={4} key={video._id}>
                                <VideoCard video={video} />
                            </Grid>
                        ))}
                    </Grid>
                    <Modal
                        open={isEditing}
                        onClose={() => setIsEditing(false)}
                        title="Edit Playlist"
                        actions={
                            <Button
                                onClick={() => setIsEditing(false)}
                                variant="outlined"
                            >
                                Cancel
                            </Button>
                        }
                    >
                        <PlaylistForm
                            userId={user?._id}
                            initialPlaylist={selectedPlaylist}
                        />
                    </Modal>
                </>
            )}
        </Box>
    );
};

export default Playlist;
