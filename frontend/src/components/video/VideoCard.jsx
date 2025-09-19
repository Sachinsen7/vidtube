import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Box,
} from "@mui/material";
import { Favorite, Comment } from "@mui/icons-material";
import ReactPlayer from "react-player";
import { useVideos } from "../../hooks/useVideo";
import { formatDate } from "../../utils/formatDate";

function VideoCard() {
    const navigate = useNavigate();
    const { fetchVideos } = useVideos();

    const handleClick = () => {
        fetchVideos(video._id);
        navigate(`/videos/${video._id}`);
    };

    return (
        <Card
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            sx={{ maxWidth: 345, boxShadow: 3 }}
            onClick={handleClick}
        >
            <CardMedia>
                <Box sx={{ position: "relative", height: 200 }}>
                    <ReactPlayer
                        url={video.videoFile}
                        width="100%"
                        height="100%"
                        playing={false}
                        muted
                        config={{ youtube: { playerVars: { controls: 0 } } }}
                    />
                </Box>
            </CardMedia>
            <CardContent>
                <Typography variant="h6" component="div">
                    {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {video.owner.username} • {formatDate(video.createdAt)}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <IconButton>
                        <Favorite />
                    </IconButton>
                    <Typography variant="body2">
                        {video.likes?.length || 0}
                    </Typography>
                    <IconButton sx={{ ml: 2 }}>
                        <Comment />
                    </IconButton>
                    <Typography variant="body2">
                        {video.comments?.length || 0}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default VideoCard;
