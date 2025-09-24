import { useState, useRef, useEffect } from "react";
import {
    Box,
    Typography,
    Alert,
    Card,
    CardContent,
    Avatar,
    Chip,
    IconButton,
    useMediaQuery,
    useTheme,
    Fade,
    Zoom,
} from "@mui/material";
import {
    PlayArrow as PlayIcon,
    Pause as PauseIcon,
    ThumbUp as LikeIcon,
    ThumbDown as DislikeIcon,
    Share as ShareIcon,
    BookmarkBorder as SaveIcon,
    MoreVert as MoreIcon,
} from "@mui/icons-material";
import React from "react";

const VideoPlayer = ({ video }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [err, setErr] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        if (video) {
            setTimeout(() => setVideoLoaded(true), 100);
        }
    }, [video]);

    if (!video) {
        return (
            <Card
                sx={{
                    background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    textAlign: "center",
                    p: 4,
                }}
            >
                <Typography variant="h6">No video selected</Typography>
            </Card>
        );
    }

    const videoUrl = video?.videoFile;

    if (!videoUrl) {
        return (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
                No video URL available
            </Alert>
        );
    }

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVideoClick = () => {
        handlePlayPause();
    };

    return (
        <Fade in={videoLoaded} timeout={800}>
            <Box sx={{ width: "100%", mb: 3 }}>
                {/* Video Container */}
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        background: "#000",
                        cursor: "pointer",
                        "&:hover .video-overlay": {
                            opacity: 1,
                        },
                    }}
                    onClick={handleVideoClick}
                >
                    <Box
                        component="video"
                        ref={videoRef}
                        src={videoUrl}
                        controls
                        style={{
                            width: "100%",
                            height: isMobile ? "200px" : "500px",
                            objectFit: "cover",
                            display: "block",
                        }}
                        onError={() => setErr("Failed to load video")}
                        onLoadedData={() => setErr(null)}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />

                    {/* Video Overlay */}
                    <Box
                        className="video-overlay"
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            pointerEvents: "none",
                        }}
                    >
                        <Zoom in={!isPlaying}>
                            <IconButton
                                sx={{
                                    background: "rgba(255, 255, 255, 0.9)",
                                    backdropFilter: "blur(10px)",
                                    "&:hover": {
                                        background: "rgba(255, 255, 255, 1)",
                                        transform: "scale(1.1)",
                                    },
                                    transition: "all 0.3s ease",
                                    pointerEvents: "auto",
                                }}
                                size="large"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlayPause();
                                }}
                            >
                                {isPlaying ? (
                                    <PauseIcon sx={{ fontSize: 40 }} />
                                ) : (
                                    <PlayIcon sx={{ fontSize: 40 }} />
                                )}
                            </IconButton>
                        </Zoom>
                    </Box>
                </Box>

                {err && (
                    <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                        {err}
                    </Alert>
                )}

                {/* Video Info Card */}
                <Card
                    sx={{
                        mt: 3,
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(20px)",
                        borderRadius: 3,
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        overflow: "visible",
                    }}
                >
                    <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                        {/* Video Title */}
                        <Typography
                            variant={isMobile ? "h5" : "h4"}
                            sx={{
                                color: "var(--primary-color)",
                                fontWeight: 700,
                                mb: 2,
                                lineHeight: 1.2,
                                background:
                                    "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {video.title}
                        </Typography>

                        {/* Video Meta Info */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Avatar
                                src={video.owner?.avatar}
                                sx={{
                                    width: 48,
                                    height: 48,
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                                }}
                            >
                                {video.owner?.username?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "var(--primary-color)",
                                        fontWeight: 600,
                                        mb: 0.5,
                                    }}
                                >
                                    {video.owner?.fullName ||
                                        video.owner?.username ||
                                        "Unknown Creator"}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "var(--secondary-color)" }}
                                >
                                    {video.views || 0} views •{" "}
                                    {new Date(
                                        video.createdAt
                                    ).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Action Buttons */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                mb: 3,
                                flexWrap: "wrap",
                            }}
                        >
                            <Chip
                                icon={<LikeIcon />}
                                label={`${video.likesCount || 0} likes`}
                                variant="outlined"
                                clickable
                                sx={{
                                    borderColor: "var(--primary-color)",
                                    color: "var(--primary-color)",
                                    "&:hover": {
                                        background: "var(--primary-color)",
                                        color: "white",
                                    },
                                    transition: "all 0.3s ease",
                                }}
                            />
                            <Chip
                                icon={<DislikeIcon />}
                                label="Dislike"
                                variant="outlined"
                                clickable
                                sx={{
                                    borderColor: "var(--secondary-color)",
                                    color: "var(--secondary-color)",
                                    "&:hover": {
                                        background: "var(--secondary-color)",
                                        color: "white",
                                    },
                                }}
                            />
                            <Chip
                                icon={<ShareIcon />}
                                label="Share"
                                variant="outlined"
                                clickable
                                sx={{
                                    borderColor: "var(--secondary-color)",
                                    color: "var(--secondary-color)",
                                    "&:hover": {
                                        background: "var(--secondary-color)",
                                        color: "white",
                                    },
                                }}
                            />
                            <Chip
                                icon={<SaveIcon />}
                                label="Save"
                                variant="outlined"
                                clickable
                                sx={{
                                    borderColor: "var(--secondary-color)",
                                    color: "var(--secondary-color)",
                                    "&:hover": {
                                        background: "var(--secondary-color)",
                                        color: "white",
                                    },
                                }}
                            />
                        </Box>

                        {/* Video Description */}
                        {video.description && (
                            <Box
                                sx={{
                                    background: "rgba(248, 250, 252, 0.8)",
                                    borderRadius: 2,
                                    p: 3,
                                    border: "1px solid rgba(0, 0, 0, 0.08)",
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "var(--primary-color)",
                                        lineHeight: 1.7,
                                        fontSize: { xs: "0.95rem", sm: "1rem" },
                                    }}
                                >
                                    {video.description}
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Fade>
    );
};

export default VideoPlayer;
