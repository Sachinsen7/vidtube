import { useState, useEffect, useCallback } from "react";
import useTweetStore from "../stores/tweetStore";
import { getUserTweets } from "../services/tweet";

export const useTweets = (userId) => {
    const {
        tweets,
        isLoading,
        error,
        fetchTweets,
        createTweet,
        updateTweet,
        deleteTweet,
        retweetTweet,
        bookmarkTweet,
    } = useTweetStore();
    const [page, setPage] = useState(1);

    // Manual load function
    const loadTweets = useCallback(async () => {
        if (userId) {
            try {
                await getUserTweets(userId, { page, limit: 10 });
            } catch (err) {
                console.error("Failed to load tweets:", err);
            }
        }
    }, [userId, page]);

    useEffect(() => {
        loadTweets();
    }, [userId]); // Only depend on userId, not page or loadTweets

    const handleCreateTweet = useCallback(
        async (formData) => {
            await createTweet(formData);
        },
        [createTweet]
    );

    const handleUpdateTweet = useCallback(
        async (tweetId, content) => {
            await updateTweet(tweetId, content);
        },
        [updateTweet]
    );

    const handleDeleteTweet = useCallback(
        async (tweetId) => {
            await deleteTweet(tweetId);
        },
        [deleteTweet]
    );

    const handleRetweetTweet = useCallback(
        async (tweetId) => {
            await retweetTweet(tweetId);
        },
        [retweetTweet]
    );

    const handleBookmarkTweet = useCallback(
        async (tweetId) => {
            await bookmarkTweet(tweetId);
        },
        [bookmarkTweet]
    );

    return {
        tweets,
        isLoading,
        error,
        page,
        setPage,
        loadTweets,
        createTweet: handleCreateTweet,
        updateTweet: handleUpdateTweet,
        deleteTweet: handleDeleteTweet,
        retweetTweet: handleRetweetTweet,
        bookmarkTweet: handleBookmarkTweet,
        hasMore: tweets.length % 10 === 0,
    };
};
