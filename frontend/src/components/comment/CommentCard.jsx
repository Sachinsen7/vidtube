import React, { useState } from "react";
import {
    Box,
    Typography,
    IconButton,
    ListItem,
    ListItemText,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useComments } from "../../hooks/useComments";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/formatDate";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";

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
            <ListItem sx={{ borderBottom: "1px solid var(--primary-color)" }}>
                <ListItemText
                    primary={comment.content}
                    secondary={`${comment.owner.username} • ${formatDate(comment.createdAt)}`}
                    primaryTypographyProps={{ color: "var(--primary-color)" }}
                    secondaryTypographyProps={{
                        color: "var(--secondary-color)",
                    }}
                />
                {user?._id === comment.owner._id && (
                    <Box>
                        <IconButton
                            onClick={() => setIsEditing(true)}
                            sx={{ color: "var(--success-color)" }}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            onClick={handleDelete}
                            sx={{ color: "var(--secondary-color)" }}
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                )}
            </ListItem>
            <Modal
                open={isEditing}
                onClose={() => setIsEditing(false)}
                title="Edit Comment"
                actions={
                    <>
                        <Button
                            onClick={() => setIsEditing(false)}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleEdit} disabled={isLoading}>
                            {isLoading ? (
                                <CircularProgress size={24} />
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </>
                }
            >
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Input
                    label="Comment"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    multiline
                    rows={4}
                    required
                />
            </Modal>
        </>
    );
};

export default CommentCard;
