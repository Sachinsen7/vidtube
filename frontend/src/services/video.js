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
