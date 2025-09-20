import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    getSubscribedChannels,
    getChannelSubscribers,
    toggleSubscription,
} from "../services/subscription";

const useSubscriptionStore = create(
    persist(
        (set) => ({
            subscribedChannels: [],
            channelSubscribers: [],
            isLoading: false,
            error: null,

            fetchSubscribedChannels: async (channelId) => {
                set({ isLoading: true, error: null });
                try {
                    const channels = await getSubscribedChannels(channelId);
                    set({ subscribedChannels: channels, isLoading: false });
                } catch (error) {
                    set({ error: error.message, isLoading: false });
                }
            },

            fetchChannelSubscribers: async (channelId) => {
                set({ isLoading: true, error: null });
                try {
                    const subscribers = await getChannelSubscribers(channelId);
                    set({ channelSubscribers: subscribers, isLoading: false });
                } catch (error) {
                    set({ error: error.message, isLoading: false });
                }
            },

            toggleSubscription: async (channelId) => {
                set({ isLoading: true, error: null });
                try {
                    const result = await toggleSubscription(channelId);
                    set((state) => ({
                        subscribedChannels: result.isSubscribed
                            ? [...state.subscribedChannels, { _id: channelId }]
                            : state.subscribedChannels.filter(
                                  (ch) => ch._id !== channelId
                              ),
                        isLoading: false,
                    }));
                } catch (error) {
                    set({ error: error.message, isLoading: false });
                }
            },
        }),
        { name: "subscription-storage" }
    )
);

export default useSubscriptionStore;
