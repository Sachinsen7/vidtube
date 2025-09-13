import { create } from "zustand";
import {
    toggleSubscription,
    getSubscribedChannels,
    getUserChannelSubscribers,
} from "../services/subscription";

const useSubscriptionStore = create((set) => ({
    subscribedChannels: [],
    channelSubscribers: [],
    isLoading: false,
    error: null,

    toggleSubscription: async (channelId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await toggleSubscription(channelId);
            set((state) => ({
                subscribedChannels: response.isSubscribed
                    ? [...state.subscribedChannels, response.channel]
                    : state.subscribedChannels.filter(
                          (c) => c._id !== channelId
                      ),
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to toggle subscription",
                isLoading: false,
            });
        }
    },

    fetchSubscribedChannels: async (channelId) => {
        set({ isLoading: true, error: null });
        try {
            const channels = await getSubscribedChannels(channelId);
            set({ subscribedChannels: channels, isLoading: false });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch subscribed channels",
                isLoading: false,
            });
        }
    },

    fetchChannelSubscribers: async (subscriberId) => {
        set({ isLoading: true, error: null });
        try {
            const subscribers = await getUserChannelSubscribers(subscriberId);
            set({ channelSubscribers: subscribers, isLoading: false });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch channel subscribers",
                isLoading: false,
            });
        }
    },
}));

export default useSubscriptionStore;
