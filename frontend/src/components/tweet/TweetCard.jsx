import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    useMediaQuery,
} from "@mui/material";
import {
    MoreVert as MoreVertIcon,
    Share as ShareIcon,
    Repeat as RetweetIcon,
    Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import { useTweets } from "../../hooks/useTweets";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/formatDate";

const TweetCard = ({ tweet, userId }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { retweetTweet, bookmarkTweet, updateTweet, deleteTweet } =
        useTweets(userId);
    const { user } = useAuth();
    const isMobile = useMediaQuery("(max-width:600px)");

    if (!tweet || !tweet.owner) {
        return null;
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleShare = () => {
        const tweetUrl = `${window.location.origin}/tweet/${tweet._id}`;
        navigator.clipboard.writeText(tweetUrl);
        alert("Tweet URL copied to clipboard!");
        handleMenuClose();
    };

    const handleRetweet = async () => {
        await retweetTweet(tweet._id);
        handleMenuClose();
    };

    const handleBookmark = async () => {
        await bookmarkTweet(tweet._id);
        handleMenuClose();
    };

    const handleEdit = async () => {
        const newContent = prompt("Edit your tweet:", tweet.content);
        if (newContent && newContent.trim()) {
            await updateTweet(tweet._id, newContent);
        }
        handleMenuClose();
    };

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this tweet?")) {
            await deleteTweet(tweet._id);
        }
        handleMenuClose();
    };

    const isOwner = user?._id.toString() === tweet.owner._id.toString();

    return (
        <Card
            sx={{
                maxWidth: { xs: "100%", sm: 600 },
                mx: "auto",
                mb: 2,
                background: "linear-gradient(135deg, #fcffff 0%, #f0f4f8 100%)",
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(4, 54, 100, 0.15)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 8px 24px rgba(4, 54, 100, 0.2)",
                },
            }}
        >
            <CardContent sx={{ position: "relative" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}
                >
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "var(--primary-color)",
                                fontWeight: "medium",
                            }}
                        >
                            {tweet.content}
                        </Typography>
                        {tweet.image && (
                            <Box
                                component="img"
                                src={tweet.image}
                                alt="Tweet image"
                                sx={{
                                    maxWidth: "100%",
                                    borderRadius: 2,
                                    mt: 2,
                                }}
                            />
                        )}
                        <Typography
                            variant="body2"
                            sx={{ color: "var(--secondary-color)", mt: 1 }}
                        >
                            {tweet.owner.username} •{" "}
                            {formatDate(tweet.createdAt)}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: "var(--primary-color)",
                                display: "block",
                                mt: 1,
                            }}
                        >
                            {tweet.retweets.length} Retweets •{" "}
                            {tweet.bookmarks.length} Bookmarks
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={handleMenuOpen}
                        sx={{
                            color: "var(--primary-color)",
                            "&:hover": { color: "var(--secondary-color)" },
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    sx={{
                        "& .MuiPaper-root": {
                            background:
                                "linear-gradient(135deg, #fcffff 0%, #e6f0fa 100%)",
                            borderRadius: 2,
                            boxShadow: "0 6px 20px rgba(4, 54, 100, 0.15)",
                        },
                    }}
                >
                    <MenuItem
                        onClick={handleShare}
                        sx={{ color: "var(--primary-color)" }}
                    >
                        <ShareIcon sx={{ mr: 1 }} /> Share
                    </MenuItem>
                    <MenuItem
                        onClick={handleRetweet}
                        sx={{ color: "var(--primary-color)" }}
                    >
                        <RetweetIcon sx={{ mr: 1 }} />{" "}
                        {tweet.retweets.includes(userId)
                            ? "Undo Retweet"
                            : "Retweet"}
                    </MenuItem>
                    <MenuItem
                        onClick={handleBookmark}
                        sx={{ color: "var(--primary-color)" }}
                    >
                        <BookmarkIcon sx={{ mr: 1 }} />{" "}
                        {tweet.bookmarks.includes(userId)
                            ? "Remove Bookmark"
                            : "Bookmark"}
                    </MenuItem>
                    {isOwner && [
                        <MenuItem
                            key="edit"
                            onClick={handleEdit}
                            sx={{ color: "var(--primary-color)" }}
                        >
                            Edit
                        </MenuItem>,
                        <MenuItem
                            key="delete"
                            onClick={handleDelete}
                            sx={{ color: "var(--secondary-color)" }}
                        >
                            Delete
                        </MenuItem>,
                    ]}
                </Menu>
            </CardContent>
        </Card>
    );
};

export default TweetCard;
