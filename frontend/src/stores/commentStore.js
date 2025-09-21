import { create } from "zustand";
import {
    addComments,
    updateComment,
    deleteComment,
    getComments,
} from "../services/comment";

const useCommentStore = create((set) => ({
    comments: [],
    isLoading: false,
    error: null,

    fetchComments: async (videoId, params) => {
        set({ isLoading: true, error: null });
        try {
            const comments = await getComments(videoId, params);
            set({ comments, isLoading: false });
            return comments;
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to fetch comments",
                isLoading: false,
            });
            throw error;
        }
    },

    addComment: async (videoId, content) => {
        set({ isLoading: true, error: null });
        try {
            const comment = await addComments(videoId, content);
            set((state) => ({
                comments: [comment, ...state.comments],
                isLoading: false,
            }));
            return comment;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Failed to add comment",
                isLoading: false,
            });
            throw error;
        }
    },

    updateComment: async (commentId, content) => {
        set({ isLoading: true, error: null });
        try {
            const updatedComment = await updateComment(commentId, content);
            set((state) => ({
                comments: state.comments.map((c) =>
                    c._id === commentId ? updatedComment : c
                ),
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to update comment",
                isLoading: false,
            });
        }
    },

    deleteComment: async (commentId) => {
        set({ isLoading: true, error: null });
        try {
            await deleteComment(commentId);
            set((state) => ({
                comments: state.comments.filter((c) => c._id !== commentId),
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to delete comment",
                isLoading: false,
            });
        }
    },
}));

export default useCommentStore;
