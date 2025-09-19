import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Alert,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useComments } from "../../hooks/useComments";
import { formatDate } from "../../utils/formatDate";

const CommentList = ({ videoId }) => {
    const { comments, isLoading, error, page, setPage, hasMore } =
        useComments(videoId);

    const loadMore = () => {
        if (hasMore) setPage(page + 1);
    };

    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box
            sx={{
                maxWidth: 600,
                mx: "auto",
                p: 2,
                backgroundColor: "var(--background-color)",
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "var(--primary-color)" }}
            >
                Comments ({comments.length})
            </Typography>
            <InfiniteScroll
                dataLength={comments.length}
                next={loadMore}
                hasMore={hasMore}
                loader={
                    <CircularProgress
                        sx={{ display: "block", mx: "auto", my: 2 }}
                    />
                }
            >
                <List>
                    {comments.map((comment) => (
                        <ListItem
                            key={comment._id}
                            sx={{
                                borderBottom: "1px solid var(--primary-color)",
                            }}
                        >
                            <ListItemText
                                primary={comment.content}
                                secondary={`${comment.owner.username} • ${formatDate(comment.createdAt)}`}
                                primaryTypographyProps={{
                                    color: "var(--primary-color)",
                                }}
                                secondaryTypographyProps={{
                                    color: "var(--secondary-color)",
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </InfiniteScroll>
        </Box>
    );
};

export default CommentList;
