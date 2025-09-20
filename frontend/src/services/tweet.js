import api from "./api";

export const getUserTweets = async (userId, { page, limit }) => {
    const response = await api.get(
        `/api/v1/tweets/user/${userId}?page=${page}&limit=${limit}`
    );
    return response.data.data;
};

export const createTweet = async (formData) => {
    const response = await api.post("/api/v1/tweets", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
};

export const updateTweet = async (tweetId, content) => {
    const response = await api.patch(`/api/v1/tweets/${tweetId}`, { content });
    return response.data.data;
};

export const deleteTweet = async (tweetId) => {
    await api.delete(`/api/v1/tweets/${tweetId}`);
};

export const retweetTweet = async (tweetId) => {
    const response = await api.post(`/api/v1/tweets/retweet/${tweetId}`);
    return response.data.data;
};

export const bookmarkTweet = async (tweetId) => {
    const response = await api.post(`/api/v1/tweets/bookmark/${tweetId}`);
    return response.data.data;
};
