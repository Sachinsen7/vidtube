import {
    Box,
    Typography,
    List,
    ListItem,
    Avatar,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    Divider,
    IconButton,
    useMediaQuery,
    useTheme,
    Fade,
    Grow,
} from "@mui/material";
import {
    ThumbUp as LikeIcon,
    ThumbDown as DislikeIcon,
    Reply as ReplyIcon,
    MoreVert as MoreIcon,
} from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useComments } from "../../hooks/useComments";
import { formatDate } from "../../utils/formatDate";

const CommentList = ({ videoId }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { comments, isLoading, error, page, setPage, hasMore } =
        useComments(videoId);

    const loadMore = () => {
        if (hasMore) setPage(page + 1);
    };

    if (error)
        return (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
                {error}
            </Alert>
        );

    return (
        <Box sx={{ width: "100%" }}>
            {/* Comments Header */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h5"
                    sx={{
                        color: "var(--primary-color)",
                        fontWeight: 700,
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    Comments
                    <Box
                        sx={{
                            background:
                                "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
                            color: "white",
                            borderRadius: "20px",
                            px: 2,
                            py: 0.5,
                            fontSize: "0.8rem",
                            fontWeight: 600,
                        }}
                    >
                        {comments.length}
                    </Box>
                </Typography>
                <Divider
                    sx={{
                        background:
                            "linear-gradient(90deg, var(--primary-color) 0%, transparent 100%)",
                    }}
                />
            </Box>

            {/* Comments List */}
            <InfiniteScroll
                dataLength={comments.length}
                next={loadMore}
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
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {comments.map((comment, index) => (
                        <Grow
                            in={true}
                            timeout={300 + index * 100}
                            key={comment._id}
                        >
                            <Card
                                sx={{
                                    background: "rgba(255, 255, 255, 0.7)",
                                    backdropFilter: "blur(10px)",
                                    borderRadius: 3,
                                    border: "1px solid rgba(255, 255, 255, 0.3)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow:
                                            "0 15px 35px rgba(0, 0, 0, 0.1)",
                                        background: "rgba(255, 255, 255, 0.9)",
                                    },
                                }}
                            >
                                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                    {/* Comment Header */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            mb: 2,
                                        }}
                                    >
                                        <Avatar
                                            src={comment.owner?.avatar}
                                            sx={{
                                                width: { xs: 40, sm: 48 },
                                                height: { xs: 40, sm: 48 },
                                                mr: 2,
                                                boxShadow:
                                                    "0 4px 12px rgba(0, 0, 0, 0.15)",
                                                border: "2px solid rgba(255, 255, 255, 0.8)",
                                            }}
                                        >
                                            {comment.owner?.username
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </Avatar>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                    mb: 1,
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            color: "var(--primary-color)",
                                                            fontWeight: 600,
                                                            fontSize: {
                                                                xs: "0.95rem",
                                                                sm: "1rem",
                                                            },
                                                        }}
                                                    >
                                                        {comment.owner
                                                            ?.fullName ||
                                                            comment.owner
                                                                ?.username}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: "var(--secondary-color)",
                                                            fontSize: {
                                                                xs: "0.75rem",
                                                                sm: "0.8rem",
                                                            },
                                                        }}
                                                    >
                                                        {formatDate(
                                                            comment.createdAt
                                                        )}
                                                    </Typography>
                                                </Box>
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: "var(--secondary-color)",
                                                        "&:hover": {
                                                            background:
                                                                "rgba(0, 0, 0, 0.04)",
                                                        },
                                                    }}
                                                >
                                                    <MoreIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Box>

                                    {/* Comment Content */}
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: "var(--primary-color)",
                                            mb: 2,
                                            lineHeight: 1.6,
                                            fontSize: {
                                                xs: "0.95rem",
                                                sm: "1rem",
                                            },
                                            pl: { xs: 7, sm: 8 },
                                        }}
                                    >
                                        {comment.content}
                                    </Typography>

                                    {/* Comment Actions */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            pl: { xs: 7, sm: 8 },
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            sx={{
                                                color: "var(--secondary-color)",
                                                "&:hover": {
                                                    color: "var(--primary-color)",
                                                    background:
                                                        "rgba(0, 0, 0, 0.04)",
                                                },
                                                transition: "all 0.2s ease",
                                            }}
                                        >
                                            <LikeIcon fontSize="small" />
                                        </IconButton>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: "var(--secondary-color)",
                                                mr: 2,
                                            }}
                                        >
                                            {comment.likesCount || 0}
                                        </Typography>

                                        <IconButton
                                            size="small"
                                            sx={{
                                                color: "var(--secondary-color)",
                                                "&:hover": {
                                                    color: "var(--primary-color)",
                                                    background:
                                                        "rgba(0, 0, 0, 0.04)",
                                                },
                                            }}
                                        >
                                            <DislikeIcon fontSize="small" />
                                        </IconButton>

                                        <IconButton
                                            size="small"
                                            sx={{
                                                color: "var(--secondary-color)",
                                                "&:hover": {
                                                    color: "var(--primary-color)",
                                                    background:
                                                        "rgba(0, 0, 0, 0.04)",
                                                },
                                                ml: 2,
                                            }}
                                        >
                                            <ReplyIcon fontSize="small" />
                                        </IconButton>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: "var(--secondary-color)",
                                                ml: 0.5,
                                                fontSize: "0.75rem",
                                            }}
                                        >
                                            Reply
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grow>
                    ))}
                </Box>
            </InfiniteScroll>

            {/* Empty State */}
            {!isLoading && comments.length === 0 && (
                <Card
                    sx={{
                        textAlign: "center",
                        py: 6,
                        background: "rgba(255, 255, 255, 0.6)",
                        backdropFilter: "blur(10px)",
                        border: "2px dashed rgba(0, 0, 0, 0.1)",
                        borderRadius: 3,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: "var(--secondary-color)",
                            mb: 1,
                            fontWeight: 500,
                        }}
                    >
                        No comments yet
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "var(--secondary-color)" }}
                    >
                        Be the first to share your thoughts!
                    </Typography>
                </Card>
            )}
        </Box>
    );
};

export default CommentList;
