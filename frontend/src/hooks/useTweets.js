import { useState, useEffect, useCallback } from "react";
import useTweetStore from "../stores/tweetStore";

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

    useEffect(() => {
        if (userId) {
            fetchTweets(userId, { page, limit: 10 });
        }
    }, [fetchTweets, userId, page]);

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
        createTweet: handleCreateTweet,
        updateTweet: handleUpdateTweet,
        deleteTweet: handleDeleteTweet,
        retweetTweet: handleRetweetTweet,
        bookmarkTweet: handleBookmarkTweet,
        hasMore: tweets.length % 10 === 0,
    };
};
