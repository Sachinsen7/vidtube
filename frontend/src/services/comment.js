import api from "./api";

export const getComments = async (videoId, params = {}) => {
    const response = await api.get(`/api/v1/comments/${videoId}`, {
        params,
    });
    return response.data.data;
};

export const addComments = async (videoId, content) => {
    const response = await api.post(`/api/v1/comments/${videoId}`, {
        content,
    });
    return response.data.data;
};

export const updateComment = async (commentId, content) => {
    const response = await api.patch(`/api/v1/comments/c/${commentId}`, {
        content,
    });
    return response.data.data;
};

export const deleteComment = async (commentId) => {
    const response = await api.delete(`/api/v1/comments/c/${commentId}`);
    return response.data.data;
};
