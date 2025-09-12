import api from "./api";

export const toggleVideoLike = async (videoId) => {
    const response = await api.post(`/api/v1/likes/toggle/v/${videoId}`);
    return response.data.data;
};

export const toggleCommentLike = async (commentId) => {
    const response = await api.post(`/api/v1/likes/toggle/c/${commentId}`);
    return response.data.data;
};

export const toggleTweetLike = async (tweetId) => {
    const response = await api.post(`/api/v1/likes/toggle/t/${tweetId}`);
    return response.data.data;
};

export const getLikedVideos = async () => {
    const response = await api.get("/api/v1/likes/videos");
    return response.data.data;
};
