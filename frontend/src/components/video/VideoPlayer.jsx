import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    Typography,
    Alert,
    Card,
    CardContent,
    Avatar,
    IconButton,
    Chip,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {
    PlayArrow as PlayIcon,
    Pause as PauseIcon,
    ThumbUp as LikeIcon,
    ThumbDown as DislikeIcon,
    Share as ShareIcon,
    BookmarkBorder as SaveIcon,
} from "@mui/icons-material";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import useLikeStore from "../../stores/likeStore";

const VideoPlayer = ({ video }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [err, setErr] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { toggleVideoLike } = useLikeStore();
    const [liked, setLiked] = useState(Boolean(video?.isLiked));
    const [likesCount, setLikesCount] = useState(video?.likesCount || 0);

    useEffect(() => {
        if (video) {
            setTimeout(() => setVideoLoaded(true), 100);
            setLiked(Boolean(video.isLiked));
            setLikesCount(video.likesCount || 0);
        }
    }, [video]);

    useEffect(() => {
        if (!video?.videoFile || !videoRef.current) return;

        // Initialize Video.js player
        if (!playerRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                responsive: true,
                fluid: true,
                playbackRates: [0.5, 1, 1.25, 1.5, 2],
                poster: video.thumbnail || video.previewImage || "/Frame.png",
                sources: [{
                    src: video.videoFile,
                    type: 'video/mp4'
                }]
            });

            playerRef.current.on('error', () => {
                setErr('Failed to load video');
            });

            playerRef.current.on('play', () => setIsPlaying(true));
            playerRef.current.on('pause', () => setIsPlaying(false));
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [video]);

    if (!video) {
        return (
            <Card
                sx={{
                    bgcolor: "white",
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ color: "#1976d2" }}
                    data-testid="no-video"
                >
                    No video selected
                </Typography>
            </Card>
        );
    }

    const videoUrl = video?.videoFile;

    if (!videoUrl) {
        return (
            <Alert
                severity="error"
                sx={{ borderRadius: 2 }}
                data-testid="no-video-url"
            >
                No video URL available
            </Alert>
        );
    }

    const handlePlayPause = () => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.pause();
            } else {
                playerRef.current.play();
            }
        }
    };

    const handleVideoClick = () => {
        handlePlayPause();
    };

    const handleLike = async () => {
        try {
            const result = await toggleVideoLike(video._id, liked);
            if (result) {
                setLiked(result.liked);
                setLikesCount(result.likesCount);
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    return (
        <Box sx={{ mb: 2 }} data-testid="video-player">
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    borderRadius: 2,
                    overflow: "hidden",
                    bgcolor: "#000",
                    border: "1px solid #e0e0e0",
                }}
                onClick={handleVideoClick}
            >
                <video
                    ref={videoRef}
                    className="video-js vjs-default-skin"
                    data-setup="{}"
                    style={{
                        width: "100%",
                        height: isMobile ? 200 : 400,
                    }}
                    data-testid="video-element"
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: isPlaying ? 0 : 0.8,
                        transition: "opacity 0.3s ease",
                        bgcolor: "rgba(0, 0, 0, 0.5)",
                        pointerEvents: isPlaying ? "none" : "auto",
                    }}
                >
                    <IconButton
                        sx={{
                            bgcolor: "white",
                            "&:hover": { bgcolor: "#e3f2fd" },
                            pointerEvents: "auto",
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPause();
                        }}
                        data-testid="play-pause-button"
                    >
                        {isPlaying ? (
                            <PauseIcon sx={{ color: "#1976d2" }} />
                        ) : (
                            <PlayIcon sx={{ color: "#1976d2" }} />
                        )}
                    </IconButton>
                </Box>
            </Box>
            {err && (
                <Alert
                    severity="error"
                    sx={{ mt: 2, borderRadius: 2 }}
                    data-testid="error-alert"
                >
                    {err}
                </Alert>
            )}
            <Card
                sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    mt: 2,
                    border: "1px solid #e0e0e0",
                }}
            >
                <CardContent sx={{ p: 2 }}>
                    <Typography
                        variant={isMobile ? "h6" : "h5"}
                        sx={{ color: "#1976d2", fontWeight: 600, mb: 1 }}
                        data-testid="video-title"
                    >
                        {video.title}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <Avatar
                            src={video.owner?.avatar}
                            sx={{ width: 40, height: 40 }}
                            data-testid="owner-avatar"
                        >
                            {video.owner?.username?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "#1976d2", fontWeight: 600 }}
                                data-testid="owner-name"
                            >
                                {video.owner?.fullName ||
                                    video.owner?.username ||
                                    "Unknown Creator"}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#757575" }}
                                data-testid="video-meta"
                            >
                                {video.views || 0} views •{" "}
                                {new Date(video.createdAt).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                            mb: 2,
                        }}
                    >
                        <Chip
                            icon={<LikeIcon />}
                            label={`${likesCount} likes`}
                            variant="outlined"
                            clickable
                            onClick={handleLike}
                            sx={{
                                borderColor: liked ? "#e91e63" : "#1976d2",
                                color: liked ? "#e91e63" : "#1976d2",
                                bgcolor: liked ? "rgba(233, 30, 99, 0.1)" : "transparent",
                                "&:hover": { bgcolor: liked ? "rgba(233, 30, 99, 0.2)" : "#e3f2fd" },
                            }}
                            data-testid="like-button"
                        />
                        <Chip
                            icon={<DislikeIcon />}
                            label="Dislike"
                            variant="outlined"
                            clickable
                            sx={{
                                borderColor: "#757575",
                                color: "#757575",
                                "&:hover": { bgcolor: "#f5f5f5" },
                            }}
                            data-testid="dislike-button"
                        />
                        <Chip
                            icon={<ShareIcon />}
                            label="Share"
                            variant="outlined"
                            clickable
                            sx={{
                                borderColor: "#757575",
                                color: "#757575",
                                "&:hover": { bgcolor: "#f5f5f5" },
                            }}
                            data-testid="share-button"
                        />
                        <Chip
                            icon={<SaveIcon />}
                            label="Save"
                            variant="outlined"
                            clickable
                            sx={{
                                borderColor: "#757575",
                                color: "#757575",
                                "&:hover": { bgcolor: "#f5f5f5" },
                            }}
                            data-testid="save-button"
                        />
                    </Box>
                    {video.description && (
                        <Box sx={{ bgcolor: "#f5f5f5", borderRadius: 2, p: 2 }}>
                            <Typography
                                variant="body1"
                                sx={{ color: "#1976d2", fontSize: "0.95rem" }}
                                data-testid="video-description"
                            >
                                {video.description}
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default VideoPlayer;
