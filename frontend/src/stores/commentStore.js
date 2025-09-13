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

    getComments: async (videoId, params) => {
        set({ isLoading: true, error: null });
        try {
            const comments = await getVideoComments(videoId, params);
            set({ comments, isLoading: false });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to fetch comments",
                isLoading: false,
            });
        }
    },

    addComments: async (videoId, content) => {
        set({ isLoading: true, error: null });
        try {
            const comment = await addComment(videoId, content);
            set((state) => ({
                comments: [comment, ...state.comments],
                isLoading: false,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.message || "Failed to add comment",
                isLoading: false,
            });
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
