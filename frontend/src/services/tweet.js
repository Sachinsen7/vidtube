import api from "./api";

export const createTweet = async (content) => {
    const response = await api.post("/api/v1/tweets/tweet", { content });
    return response.data.data;
};

export const getUserTweets = async (userId) => {
    const response = await api.get(`/api/v1/tweets/user/${userId}`);
    return response.data.data;
};

export const updateTweet = async (tweetId, content) => {
    const response = await api.patch(`/api/v1/tweets/${tweetId}`, { content });
    return response.data.data;
};

export const deleteTweet = async (tweetId) => {
    const response = await api.delete(`/api/v1/tweets/${tweetId}`);
    return response.data.data;
};
