import { create } from "zustand";
import {
    getLikedVideos,
    toggleTweetLike,
    toggleCommentLike,
    toggleVideoLike,
} from "../services/like";

const useLikeStore = create((set) => ({
    likedVideos: [],
    isLoading: false,
    error: null,

    toggleVideoLike: async (videoId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await toggleVideoLike(videoId);
            set((state) => ({
                likedVideos: response.isLiked
                    ? [...state.likedVideos, response.video]
                    : state.likedVideos.filter((v) => v._id !== videoId),
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to toggle video like",
                isLoading: false,
            });
        }
    },

    toggleCommentLike: async (commentId) => {
        set({ isLoading: true, error: null });
        try {
            await toggleCommentLike(commentId);
            set({ isLoading: false });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to toggle comment like",
                isLoading: false,
            });
        }
    },

    toggleTweetLike: async (tweetId) => {
        set({ isLoading: true, error: null });
        try {
            await toggleTweetLike(tweetId);
            set({ isLoading: false });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to toggle tweet like",
                isLoading: false,
            });
        }
    },

    getLikedVideos: async () => {
        set({ isLoading: true, error: null });
        try {
            const likedVideos = await getLikedVideos();
            set({ likedVideos, isLoading: false });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch liked videos",
                isLoading: false,
            });
        }
    },
}));

export default useLikeStore;
