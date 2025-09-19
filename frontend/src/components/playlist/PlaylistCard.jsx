import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { usePlaylists } from "../../hooks/usePlaylists";
import { formatDate } from "../../utils/formatDate";

const PlaylistCard = ({ playlist }) => {
    const navigate = useNavigate();
    const { fetchPlaylistById } = usePlaylists(playlist.owner);

    const handleClick = () => {
        fetchPlaylistById(playlist._id);
        navigate(`/playlists/${playlist._id}`);
    };

    return (
        <Card
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            sx={{
                maxWidth: 345,
                boxShadow: 3,
                backgroundColor: "var(--background-color)",
            }}
            onClick={handleClick}
        >
            <CardMedia
                component="img"
                height="140"
                image={
                    playlist.videos[0]?.thumbnail ||
                    "https://via.placeholder.com/345x140"
                }
                alt={playlist.name}
            />
            <CardContent>
                <Typography variant="h6" sx={{ color: "var(--primary-color)" }}>
                    {playlist.name}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: "var(--secondary-color)" }}
                >
                    {playlist.description}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: "var(--secondary-color)" }}
                >
                    {playlist.videos.length} videos •{" "}
                    {formatDate(playlist.createdAt)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PlaylistCard;
