import api from "./api";

export const getChannelStats = async () => {
    const response = await api.get("/api/v1/dashboard/stats");
    return response.data.data;
};

export const getChannelVideos = async () => {
    const response = await api.get("/api/v1/dashboard/videos");
    return response.data.data;
};
