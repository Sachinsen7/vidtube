import { useState, useEffect, useCallback } from "react";
import useCommentStore from "../stores/commentStore";
import { getComments } from "../services/comment";

export const useComments = (videoId) => {
    const {
        comments,
        isLoading,
        error,
        fetchComments,
        addComment,
        updateComment,
        deleteComment,
    } = useCommentStore();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Manual load function
    const loadComments = useCallback(async () => {
        if (videoId) {
            try {
                const response = await getComments(videoId, {
                    page,
                    limit: 10,
                });
                if (response && response.length < 10) setHasMore(false);
            } catch (err) {
                setHasMore(false);
            }
        }
    }, [videoId, page]);

    useEffect(() => {
        loadComments();
    }, [videoId]); // Only depend on videoId, not page or loadComments

    const handleAddComment = useCallback(
        async (content) => {
            await addComment(videoId, content);
        },
        [addComment, videoId]
    );

    const handleUpdateComment = useCallback(
        async (commentId, content) => {
            await updateComment(commentId, content);
        },
        [updateComment]
    );

    const handleDeleteComment = useCallback(
        async (commentId) => {
            await deleteComment(commentId);
        },
        [deleteComment]
    );

    return {
        comments,
        isLoading,
        error,
        page,
        setPage,
        hasMore,
        loadComments, // Return the manual load function
        addComment: handleAddComment,
        updateComment: handleUpdateComment,
        deleteComment: handleDeleteComment,
    };
};
