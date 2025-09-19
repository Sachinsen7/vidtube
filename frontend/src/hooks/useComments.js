import { useState, useEffect, useCallback } from "react";
import useCommentStore from "../stores/commentStore";

export const useComments = () => {
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

    useEffect(() => {
        if (videoId) {
            const loadComments = async () => {
                try {
                    const response = await fetchComments(videoId, {
                        page,
                        limit: 10,
                    });
                    if (response.length < 10) setHasMore(false);
                } catch (err) {
                    setHasMore(false);
                }
            };
            loadComments();
        }
    }, [fetchComments, videoId, page]);

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
        addComment: handleAddComment,
        updateComment: handleUpdateComment,
        deleteComment: handleDeleteComment,
    };
};
