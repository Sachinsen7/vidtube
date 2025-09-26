import React, { useState } from "react";
import {
    Box,
    Typography,
    IconButton,
    ListItem,
    ListItemText,
    TextField,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useComments } from "../../hooks/useComments";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/formatDate";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const CommentCard = ({ comment }) => {
    const { user } = useAuth();
    const { updateComment, deleteComment, isLoading, error } = useComments(
        comment.video
    );
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    const handleEdit = async () => {
        await updateComment(comment._id, editContent);
        if (!error) setIsEditing(false);
    };

    const handleDelete = async () => {
        await deleteComment(comment._id);
    };

    return (
        <>
            <ListItem
                sx={{ borderBottom: "1px solid #e0e0e0", py: 1 }}
                data-testid={`comment-card-${comment._id}`}
            >
                <ListItemText
                    primary={comment.content}
                    secondary={`${comment.owner.username} • ${formatDate(comment.createdAt)}`}
                    primaryTypographyProps={{
                        color: "#1976d2",
                        fontSize: "0.95rem",
                    }}
                    secondaryTypographyProps={{
                        color: "#757575",
                        fontSize: "0.8rem",
                    }}
                />
                {user?._id === comment.owner._id && (
                    <Box>
                        <IconButton
                            onClick={() => setIsEditing(true)}
                            sx={{ color: "#1976d2" }}
                            data-testid="edit-comment"
                        >
                            <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                            onClick={handleDelete}
                            sx={{ color: "#757575" }}
                            data-testid="delete-comment"
                        >
                            <Delete fontSize="small" />
                        </IconButton>
                    </Box>
                )}
            </ListItem>
            <Dialog
                open={isEditing}
                onClose={() => setIsEditing(false)}
                maxWidth="sm"
                fullWidth
                data-testid="edit-comment-dialog"
            >
                <DialogTitle>Edit Comment</DialogTitle>
                <DialogContent>
                    {error && (
                        <Alert
                            severity="error"
                            sx={{ mb: 2, borderRadius: 2 }}
                            data-testid="error-alert"
                        >
                            {error}
                        </Alert>
                    )}
                    <TextField
                        label="Comment"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                        required
                        sx={{
                            "& .Mui-focused fieldset": {
                                borderColor: "#1976d2",
                            },
                        }}
                        data-testid="edit-comment-input"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setIsEditing(false)}
                        variant="outlined"
                        sx={{
                            borderColor: "#757575",
                            color: "#757575",
                            borderRadius: 1,
                        }}
                        data-testid="cancel-edit"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleEdit}
                        disabled={isLoading}
                        variant="contained"
                        sx={{ bgcolor: "#1976d2", borderRadius: 1 }}
                        data-testid="save-comment"
                    >
                        {isLoading ? (
                            <CircularProgress
                                size={24}
                                sx={{ color: "white" }}
                            />
                        ) : (
                            "Save"
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CommentCard;
