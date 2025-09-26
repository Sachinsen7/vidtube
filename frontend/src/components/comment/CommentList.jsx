import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    CircularProgress,
    Alert,
    useMediaQuery,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useComments } from "../../hooks/useComments";
import { formatDate } from "../../utils/formatDate";
import CommentCard from "./CommentCard";

const CommentList = ({ videoId }) => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const { comments, isLoading, error, page, setPage, hasMore } =
        useComments(videoId);

    const loadMore = () => {
        if (hasMore) setPage(page + 1);
    };

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
        <Box>
            <Typography
                variant="h6"
                sx={{ color: "#1976d2", mb: 2 }}
                data-testid="comments-title"
            >
                Comments ({comments.length})
            </Typography>
            <InfiniteScroll
                dataLength={comments.length}
                next={loadMore}
                hasMore={hasMore}
                loader={
                    <CircularProgress
                        sx={{
                            display: "block",
                            mx: "auto",
                            my: 2,
                            color: "#1976d2",
                        }}
                        data-testid="loading"
                    />
                }
                style={{ overflow: "visible" }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {comments.map((comment) => (
                        <CommentCard key={comment._id} comment={comment} />
                    ))}
                </Box>
            </InfiniteScroll>
            {!isLoading && comments.length === 0 && (
                <Box
                    sx={{
                        textAlign: "center",
                        py: 4,
                        bgcolor: "white",
                        borderRadius: 2,
                        border: "1px solid #e0e0e0",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ color: "#757575" }}
                        data-testid="empty-state"
                    >
                        No comments yet
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#757575" }}>
                        Be the first to share your thoughts!
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default CommentList;
