import { useState, useEffect, useCallback } from "react";
import useSubscriptionStore from "../stores/subscriptionStore";

export const useSubscriptions = (channelId) => {
    const {
        subscribedChannels,
        channelSubscribers,
        isLoading,
        error,
        toggleSubscription,
        fetchSubscribedChannels,
        fetchChannelSubscribers,
    } = useSubscriptionStore();

    useEffect(() => {
        if (channelId) {
            fetchSubscribedChannels(channelId);
        }
    }, [channelId]); // Remove fetchSubscribedChannels from dependencies to prevent infinite loops

    const handleToggleSubscription = useCallback(
        async (channelId) => {
            await toggleSubscription(channelId);
        },
        [toggleSubscription]
    );

    const handleFetchChannelSubscribers = useCallback(
        async (subscriberId) => {
            await fetchChannelSubscribers(subscriberId);
        },
        [fetchChannelSubscribers]
    );

    return {
        subscribedChannels,
        channelSubscribers,
        isLoading,
        error,
        toggleSubscription: handleToggleSubscription,
        fetchChannelSubscribers: handleFetchChannelSubscribers,
    };
};
