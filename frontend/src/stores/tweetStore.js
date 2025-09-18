import { create } from "zustand";
import {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
} from "../services/tweet";

export const useTweetStore = create((set) => ({
    tweets: [],
    isLoading: false,
    error: null,

    fetchTweets: async (userId) => {
        set({ isLoading: true, error: null });
        try {
            const tweets = await getUserTweets(userId);
            set({ tweets, isLoading: false });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to fetch tweets",
                isLoading: false,
            });
        }
    },

    createTweet: async (content) => {
        set({ isLoading: true, error: null });
        try {
            const tweet = await createTweet(content);
            set((state) => ({
                tweets: [tweet, ...state.tweets],
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to create tweet",
                isLoading: false,
            });
        }
    },

    updateTweet: async (tweetId, content) => {
        set({ isLoading: true, error: null });
        try {
            const updatedTweet = await updateTweet(tweetId, content);
            set((state) => ({
                tweets: state.tweets.map((t) =>
                    t._id === tweetId ? updatedTweet : t
                ),
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to update tweet",
                isLoading: false,
            });
        }
    },

    deleteTweet: async (tweetId) => {
        set({ isLoading: true, error: null });
        try {
            await deleteTweet(tweetId);
            set((state) => ({
                tweets: state.tweets.filter((t) => t._id !== tweetId),
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to delete tweet",
                isLoading: false,
            });
        }
    },
}));
