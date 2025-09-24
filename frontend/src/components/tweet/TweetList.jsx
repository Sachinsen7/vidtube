import React from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    useMediaQuery,
    useTheme,
    Paper,
    Chip,
} from "@mui/material";
import {
    Article as ArticleIcon,
    Timeline as TimelineIcon,
} from "@mui/icons-material";
import { useTweets } from "../../hooks/useTweets";
import TweetCard from "./TweetCard";
import InfiniteScroll from "react-infinite-scroll-component";

const TweetList = ({ userId }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { tweets, isLoading, error, page, setPage, hasMore } =
        useTweets(userId);

    if (isLoading && page === 1) {
        return (
            <Paper
                sx={{
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 4,
                    p: 4,
                    textAlign: "center",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
            >
                <CircularProgress
                    size={50}
                    sx={{ color: "var(--primary-color)" }}
                />
                <Typography sx={{ mt: 2, color: "var(--secondary-color)" }}>
                    Loading your posts...
                </Typography>
            </Paper>
        );
    }

    if (error) {
        return (
            <Alert
                severity="error"
                sx={{
                    borderRadius: 3,
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                }}
            >
                {error}
            </Alert>
        );
    }

    return (
        <Paper
            sx={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(15px)",
                borderRadius: 4,
                p: { xs: 3, sm: 4 },
                border: "1px solid rgba(255, 255, 255, 0.3)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background:
                        "linear-gradient(90deg, #1da1f2 0%, #0d8bd9 100%)",
                },
            }}
        >
            {/* Header */}
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <TimelineIcon
                        sx={{
                            fontSize: 28,
                            color: "#1da1f2",
                            mr: 2,
                        }}
                    />
                    <Typography
                        variant={isMobile ? "h6" : "h5"}
                        sx={{
                            color: "var(--primary-color)",
                            fontWeight: 700,
                            flex: 1,
                        }}
                    >
                        Your Posts
                    </Typography>
                    {tweets.length > 0 && (
                        <Chip
                            label={`${tweets.length} posts`}
                            size="small"
                            sx={{
                                background: "#1da1f2",
                                color: "white",
                                fontWeight: 600,
                            }}
                        />
                    )}
                </Box>
            </Box>

            {/* Posts List */}
            <InfiniteScroll
                dataLength={tweets.length}
                next={() => setPage(page + 1)}
                hasMore={hasMore}
                loader={
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            py: 3,
                        }}
                    >
                        <CircularProgress
                            size={40}
                            sx={{ color: "var(--primary-color)" }}
                        />
                    </Box>
                }
                style={{ overflow: "visible" }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {tweets.map((tweet, index) => (
                        <TweetCard
                            key={tweet._id}
                            tweet={tweet}
                            userId={userId}
                            delay={index * 100}
                        />
                    ))}
                </Box>
            </InfiniteScroll>

            {/* Empty State */}
            {!isLoading && tweets.length === 0 && (
                <Box sx={{ textAlign: "center", py: 6 }}>
                    <ArticleIcon
                        sx={{
                            fontSize: 64,
                            color: "var(--secondary-color)",
                            opacity: 0.5,
                            mb: 2,
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            color: "var(--secondary-color)",
                            mb: 1,
                            fontWeight: 500,
                        }}
                    >
                        No posts yet
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "var(--secondary-color)" }}
                    >
                        Share your first thought with the world!
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};

export default TweetList;
