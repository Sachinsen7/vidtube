import api from "./api";

export const toggleSubscription = async (channelId) => {
    const response = await api.post(`/api/v1/subscriptions/c/${channelId}`);
    return response.data.data;
};

export const getSubscribedChannels = async (channelId) => {
    const response = await api.get(`/api/v1/subscriptions/c/${channelId}`);
    return response.data.data;
};

export const getUserChannelSubscribers = async (subscriberId) => {
    const response = await api.get(`/api/v1/subscriptions/u/${subscriberId}`);
    return response.data.data;
};
