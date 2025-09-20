import api from "./api";

export const getSubscribedChannels = async (subscriberId) => {
    try {
        const response = await api.get(
            `/api/v1/subscriptions/subscribed/${subscriberId}`
        );
        return response.data.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
                "Failed to fetch subscribed channels"
        );
    }
};

export const getChannelSubscribers = async (channelId) => {
    try {
        const response = await api.get(`/api/v1/subscriptions/u/${channelId}`);
        return response.data.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
                "Failed to fetch channel subscribers"
        );
    }
};

export const toggleSubscription = async (channelId) => {
    try {
        const response = await api.post(`/api/v1/subscriptions/c/${channelId}`);
        return response.data.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to toggle subscription"
        );
    }
};
