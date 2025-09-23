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
import useLikeStore from "../../stores/likeStore";
import { formatDate } from "../../utils/formatDate";

const VideoCard = ({ video }) => {
    const navigate = useNavigate();
    const { toggleVideoLike } = useLikeStore();
    const isLiked = Boolean(video.isLiked);

    const handleClick = () => {
        navigate(`/videos/${video._id}`);
    };

    return (
        <Card
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            sx={{
                width: "100%",
                maxWidth: "100%",
                boxShadow: 3,
                backgroundColor: "var(--background-color)",
            }}
            onClick={handleClick}
        >
            <CardMedia
                component="img"
                image={video.thumbnail || video.previewImage || "/Frame.png"}
                alt={video.title}
                sx={{ height: 200, objectFit: "cover" }}
            />
            <CardContent>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: "var(--primary-color)" }}
                >
                    {video.title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: "var(--secondary-color)" }}
                >
                    {video.owner.username} • {formatDate(video.createdAt)}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <IconButton
                        sx={{
                            color: isLiked ? "#e91e63" : "var(--success-color)",
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleVideoLike(video._id, isLiked);
                        }}
                    >
                        <Favorite />
                    </IconButton>
                    <Typography
                        variant="body2"
                        sx={{ color: "var(--primary-color)" }}
                    >
                        {video.likesCount || 0}
                    </Typography>
                    <IconButton sx={{ color: "var(--success-color)", ml: 2 }}>
                        <Comment />
                    </IconButton>
                    <Typography
                        variant="body2"
                        sx={{ color: "var(--primary-color)" }}
                    >
                        {video.comments?.length || 0}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default VideoCard;
