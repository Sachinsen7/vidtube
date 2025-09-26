import React from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Article as ArticleIcon } from "@mui/icons-material";
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
            <Box
                sx={{
                    bgcolor: "white",
                    p: 3,
                    borderRadius: 2,
                    textAlign: "center",
                    border: "1px solid #e0e0e0",
                }}
            >
                <CircularProgress sx={{ color: "#1976d2" }} />
                <Typography
                    sx={{ mt: 2, color: "#757575" }}
                    data-testid="loading-text"
                >
                    Loading your posts...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Alert
                severity="error"
                sx={{ borderRadius: 2 }}
                data-testid="error-alert"
            >
                {error}
            </Alert>
        );
    }

    return (
        <Box
            sx={{
                bgcolor: "white",
                p: 3,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
            }}
        >
            <Typography
                variant="h6"
                sx={{ color: "#1976d2", mb: 2 }}
                data-testid="tweets-title"
            >
                Your Posts
            </Typography>
            <InfiniteScroll
                dataLength={tweets.length}
                next={() => setPage(page + 1)}
                hasMore={hasMore}
                loader={
                    <CircularProgress
                        sx={{
                            color: "#1976d2",
                            my: 2,
                            display: "block",
                            mx: "auto",
                        }}
                    />
                }
                style={{ overflow: "visible" }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {tweets.map((tweet) => (
                        <TweetCard
                            key={tweet._id}
                            tweet={tweet}
                            userId={userId}
                            data-testid={`tweet-card-${tweet._id}`}
                        />
                    ))}
                </Box>
            </InfiniteScroll>
            {!isLoading && tweets.length === 0 && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                    <ArticleIcon
                        sx={{ fontSize: 48, color: "#757575", mb: 2 }}
                    />
                    <Typography
                        variant="h6"
                        sx={{ color: "#757575" }}
                        data-testid="empty-state"
                    >
                        No posts yet
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#757575" }}>
                        Share your first thought with the world!
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default TweetList;
