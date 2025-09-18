import { useState, useEffect, useCallback } from "react";
import { useTweetStore } from "../stores/tweetStore";

export const useTweets = (userId) => {
    const {
        tweets,
        isLoading,
        error,
        fetchTweets,
        createTweet,
        updateTweet,
        deleteTweet,
    } = useTweetStore();
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (userId) {
            fetchTweets(userId, { page, limit: 10 });
        }
    }, [fetchTweets, userId, page]);

    const handleCreateTweet = useCallback(
        async (content) => {
            await createTweet(content);
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

    return {
        tweets,
        isLoading,
        error,
        page,
        setPage,
        createTweet: handleCreateTweet,
        updateTweet: handleUpdateTweet,
        deleteTweet: handleDeleteTweet,
    };
};
