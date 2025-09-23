import api from "./api";

// Idempotent like/unlike endpoints
export const likeVideo = async (videoId) => {
    const response = await api.post(`/api/v1/likes/video/${videoId}`);
    return response.data.data; // { liked: true, likesCount }
};

export const unlikeVideo = async (videoId) => {
    const response = await api.delete(`/api/v1/likes/video/${videoId}`);
    return response.data.data; // { liked: false, likesCount }
};

export const likeComment = async (commentId) => {
    const response = await api.post(`/api/v1/likes/comment/${commentId}`);
    return response.data.data;
};

export const unlikeComment = async (commentId) => {
    const response = await api.delete(`/api/v1/likes/comment/${commentId}`);
    return response.data.data;
};

export const likeTweet = async (tweetId) => {
    const response = await api.post(`/api/v1/likes/tweet/${tweetId}`);
    return response.data.data;
};

export const unlikeTweet = async (tweetId) => {
    const response = await api.delete(`/api/v1/likes/tweet/${tweetId}`);
    return response.data.data;
};

export const getLikedVideos = async () => {
    const response = await api.get("/api/v1/likes/videos");
    return response.data.data;
};
