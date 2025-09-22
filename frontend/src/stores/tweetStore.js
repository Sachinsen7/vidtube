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
                    const data = await getUserTweets(userId, { page, limit });
                    const items = Array.isArray(data) ? data : data.tweets;
                    const total = Array.isArray(data) ? undefined : data.total;
                    const effectivePage = Array.isArray(data)
                        ? page
                        : data.page;
                    const effectiveLimit = Array.isArray(data)
                        ? limit
                        : data.limit;
                    set((state) => ({
                        tweets:
                            effectivePage === 1
                                ? items
                                : [...state.tweets, ...items],
                        isLoading: false,
                        hasMore:
                            total != null
                                ? effectivePage * effectiveLimit < total
                                : items.length === effectiveLimit,
                        page: effectivePage,
                    }));
                } catch (error) {
                    set({
                        error: error.message,
                        isLoading: false,
                        hasMore: false,
                    });
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
