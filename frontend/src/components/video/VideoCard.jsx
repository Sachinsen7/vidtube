import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Box,
    Avatar,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Favorite, Comment, Visibility } from "@mui/icons-material";
import useLikeStore from "../../stores/likeStore";
import { formatDate } from "../../utils/formatDate";

const VideoCard = ({ video }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { toggleVideoLike } = useLikeStore();
    const isLiked = Boolean(video.isLiked);

    const handleClick = () => {
        navigate(`/videos/${video._id}`);
    };

    return (
        <Card
            sx={{
                width: "100%",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                "&:hover": { boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" },
                cursor: "pointer",
            }}
            onClick={handleClick}
            data-testid="video-card"
        >
            <CardMedia
                component="img"
                image={video.thumbnail || video.previewImage || "/Frame.png"}
                alt={video.title}
                sx={{ height: { xs: 160, sm: 180 }, objectFit: "cover" }}
                data-testid="video-thumbnail"
            />
            <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar
                        src={video.owner?.avatar}
                        sx={{ width: 32, height: 32, mr: 1 }}
                        data-testid="video-owner-avatar"
                    >
                        {video.owner?.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{ color: "#757575", fontWeight: 500 }}
                        >
                            {video.owner?.username}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#757575" }}>
                            {formatDate(video.createdAt)}
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    variant="body1"
                    sx={{
                        color: "#1976d2",
                        fontWeight: 600,
                        mb: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                    data-testid="video-title"
                >
                    {video.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            size="small"
                            sx={{ color: isLiked ? "#e91e63" : "#757575" }}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleVideoLike(video._id, isLiked);
                            }}
                            data-testid="like-button"
                        >
                            <Favorite fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" sx={{ color: "#757575" }}>
                            {video.likesCount || 0}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            size="small"
                            sx={{ color: "#757575" }}
                            data-testid="comment-button"
                        >
                            <Comment fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" sx={{ color: "#757575" }}>
                            {video.comments?.length || 0}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Visibility
                            fontSize="small"
                            sx={{ color: "#757575", mr: 0.5 }}
                        />
                        <Typography variant="caption" sx={{ color: "#757575" }}>
                            {video.views || 0}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default VideoCard;
