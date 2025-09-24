import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Box,
    Avatar,
    Chip,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    Favorite,
    Comment,
    PlayArrow,
    Visibility,
    AccessTime,
} from "@mui/icons-material";
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
            component={motion.div}
            whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.98 }}
            sx={{
                width: "100%",
                borderRadius: 4,
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                "&:hover": {
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                    background: "rgba(255, 255, 255, 0.95)",
                    "& .video-overlay": {
                        opacity: 1,
                    },
                    "& .video-thumbnail": {
                        transform: "scale(1.05)",
                    },
                },
            }}
            onClick={handleClick}
        >
            {/* Video Thumbnail with Overlay */}
            <Box sx={{ position: "relative", overflow: "hidden" }}>
                <CardMedia
                    className="video-thumbnail"
                    component="img"
                    image={
                        video.thumbnail || video.previewImage || "/Frame.png"
                    }
                    alt={video.title}
                    sx={{
                        height: { xs: 180, sm: 200 },
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                    }}
                />

                {/* Play Button Overlay */}
                <Box
                    className="video-overlay"
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0, 0, 0, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                    }}
                >
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <PlayArrow
                            sx={{
                                fontSize: 32,
                                color: "var(--primary-color)",
                                ml: 0.5,
                            }}
                        />
                    </Box>
                </Box>

                {/* Duration Badge */}
                {video.duration && (
                    <Chip
                        icon={<AccessTime />}
                        label={video.duration}
                        size="small"
                        sx={{
                            position: "absolute",
                            bottom: 8,
                            right: 8,
                            background: "rgba(0, 0, 0, 0.7)",
                            color: "white",
                            fontSize: "0.7rem",
                            "& .MuiChip-icon": {
                                color: "white",
                                fontSize: "0.9rem",
                            },
                        }}
                    />
                )}

                {/* Views Badge */}
                <Chip
                    icon={<Visibility />}
                    label={`${video.views || 0} views`}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "rgba(255, 255, 255, 0.9)",
                        color: "var(--primary-color)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        backdropFilter: "blur(10px)",
                    }}
                />
            </Box>

            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                {/* Creator Info */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                        src={video.owner?.avatar}
                        sx={{
                            width: 32,
                            height: 32,
                            mr: 1.5,
                            border: "2px solid rgba(255, 255, 255, 0.8)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {video.owner?.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: "var(--secondary-color)",
                                fontWeight: 600,
                                fontSize: "0.8rem",
                            }}
                        >
                            {video.owner?.username}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: "var(--secondary-color)",
                                display: "block",
                                fontSize: "0.75rem",
                            }}
                        >
                            {formatDate(video.createdAt)}
                        </Typography>
                    </Box>
                </Box>

                {/* Video Title */}
                <Typography
                    variant="h6"
                    sx={{
                        color: "var(--primary-color)",
                        fontWeight: 700,
                        mb: 2,
                        lineHeight: 1.3,
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: { xs: "2.6rem", sm: "2.86rem" },
                    }}
                >
                    {video.title}
                </Typography>

                {/* Action Bar */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        pt: 2,
                        borderTop: "1px solid rgba(0, 0, 0, 0.08)",
                    }}
                >
                    <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                        <IconButton
                            size="small"
                            sx={{
                                color: isLiked
                                    ? "#e91e63"
                                    : "var(--secondary-color)",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    color: "#e91e63",
                                    transform: "scale(1.1)",
                                },
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleVideoLike(video._id, isLiked);
                            }}
                        >
                            <Favorite fontSize="small" />
                        </IconButton>
                        <Typography
                            variant="caption"
                            sx={{
                                color: "var(--primary-color)",
                                fontWeight: 600,
                                mr: 2,
                            }}
                        >
                            {video.likesCount || 0}
                        </Typography>
                    </Box>

                    <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                        <IconButton
                            size="small"
                            sx={{
                                color: "var(--secondary-color)",
                                "&:hover": {
                                    color: "var(--primary-color)",
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            <Comment fontSize="small" />
                        </IconButton>
                        <Typography
                            variant="caption"
                            sx={{
                                color: "var(--primary-color)",
                                fontWeight: 600,
                            }}
                        >
                            {video.comments?.length || 0}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default VideoCard;
