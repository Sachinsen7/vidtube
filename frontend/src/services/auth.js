import api from "./api";

export const login = async (credentials) => {
    const response = await api.post("/api/v1/users/login", credentials);
    return response.data.data;
};

export const register = async (formData) => {
    const response = await api.post("/api/v1/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
};

export const logout = async () => {
    const response = await api.post("/api/v1/users/logout");
    return response.data.data;
};

export const refreshAccessToken = async () => {
    const response = await api.post("/api/v1/users/refresh-token");
    return response.data.data;
};

export const changePassword = async (passwordData) => {
    const response = await api.post(
        "/api/v1/users/change-password",
        passwordData
    );
    return response.data.data;
};

export const getCurrentUser = async () => {
    const response = await api.get("/api/v1/users/current-user");
    return response.data.data;
};

export const getUserChannelProfile = async (username) => {
    const response = await api.get(`/api/v1/users/c/${username}`);
    return response.data.data;
};

export const updateAccountDetails = async (details) => {
    const response = await api.patch("/api/v1/users/update-account", details);
    return response.data.data;
};

export const updateAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await api.patch("/api/v1/users/update-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
};

export const updateCoverImage = async (file) => {
    const formData = new FormData();
    formData.append("coverImage", file);
    const response = await api.patch(
        "/api/v1/users/update-cover-image",
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    return response.data.data;
};

export const getWatchHistory = async () => {
    const response = await api.get("/api/v1/users/history");
    return response.data.data;
};
