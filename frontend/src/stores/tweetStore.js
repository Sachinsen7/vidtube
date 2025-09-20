import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    getUserTweets,
    createTweet,
    updateTweet,
    deleteTweet,
    retweetTweet,
    bookmarkTweet,
} from "../services/tweet";

const useTweetStore = create(
    persist(
        (set) => ({
            tweets: [],
            isLoading: false,
            error: null,
            page: 1,
            hasMore: true,
            fetchTweets: async (userId, { page, limit }) => {
                set({ isLoading: true, error: null });
                try {
                    const tweets = await getUserTweets(userId, { page, limit });
                    set((state) => ({
                        tweets:
                            page === 1 ? tweets : [...state.tweets, ...tweets],
                        isLoading: false,
                        hasMore: tweets.length === limit,
                    }));
                } catch (error) {
                    set({ error: error.message, isLoading: false });
                }
            },
            createTweet: async (formData) => {
                set({ isLoading: true, error: null });
                try {
                    const tweet = await createTweet(formData);
                    set((state) => ({
                        tweets: [tweet, ...state.tweets],
                        isLoading: false,
                    }));
                } catch (error) {
                    set({ error: error.message, isLoading: false });
                    throw error;
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
                    set({ error: error.message, isLoading: false });
                    throw error;
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
                    set({ error: error.message, isLoading: false });
                    throw error;
                }
            },
            retweetTweet: async (tweetId) => {
                set({ isLoading: true, error: null });
                try {
                    const updatedTweet = await retweetTweet(tweetId);
                    set((state) => ({
                        tweets: state.tweets.map((t) =>
                            t._id === tweetId ? updatedTweet : t
                        ),
                        isLoading: false,
                    }));
                } catch (error) {
                    set({ error: error.message, isLoading: false });
                    throw error;
                }
            },
            bookmarkTweet: async (tweetId) => {
                set({ isLoading: true, error: null });
                try {
                    const updatedTweet = await bookmarkTweet(tweetId);
                    set((state) => ({
                        tweets: state.tweets.map((t) =>
                            t._id === tweetId ? updatedTweet : t
                        ),
                        isLoading: false,
                    }));
                } catch (error) {
                    set({ error: error.message, isLoading: false });
                    throw error;
                }
            },
            setPage: (page) => set({ page }),
        }),
        { name: "tweet-storage" }
    )
);

export default useTweetStore;
