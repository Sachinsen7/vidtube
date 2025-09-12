import api from "./api";

export const getAllVideos = async () => {
    const response = await api.get("/api/v1/videos", { params });
    return response.data.data;
};

export const getVideoById = async (id) => {
    const response = await api.get(`/api/v1/videos/${videoId}`);
    return response.data.data;
};

export const publishVideo = async (formData) => {
    const response = await api.post("/api/v1/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
};

export const updateVideo = async (videoId, formData) => {
    const response = await api.patch(`/api/v1/videos/${videoId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
};

export const deleteVideo = async (videoId) => {
    const response = await api.delete(`/api/v1/videos/${videoId}`);
    return response.data.data;
};

export const togglePublishStatus = async (videoId) => {
    const response = await api.patch(
        `/api/v1/videos/toggle/publish/${videoId}`
    );
    return response.data.data;
};
