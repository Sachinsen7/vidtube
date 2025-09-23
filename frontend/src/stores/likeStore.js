import { create } from "zustand";
import {
    getLikedVideos,
    likeTweet,
    unlikeTweet,
    likeComment,
    unlikeComment,
    likeVideo,
    unlikeVideo,
} from "../services/like";

const useLikeStore = create((set) => ({
    likedVideos: [],
    isLoading: false,
    error: null,

    toggleVideoLike: async (videoId, liked) => {
        set({ isLoading: true, error: null });
        try {
            const response = liked
                ? await unlikeVideo(videoId)
                : await likeVideo(videoId);
            set({ isLoading: false });
            return response;
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to toggle video like",
                isLoading: false,
            });
        }
    },

    toggleCommentLike: async (commentId, liked) => {
        set({ isLoading: true, error: null });
        try {
            const res = liked
                ? await unlikeComment(commentId)
                : await likeComment(commentId);
            set({ isLoading: false });
            return res;
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to toggle comment like",
                isLoading: false,
            });
        }
    },

    toggleTweetLike: async (tweetId, liked) => {
        set({ isLoading: true, error: null });
        try {
            const res = liked
                ? await unlikeTweet(tweetId)
                : await likeTweet(tweetId);
            set({ isLoading: false });
            return res;
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
