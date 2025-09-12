import axios from "axios";
import useAuthStore from "../stores/authStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
    withCredentials: true,
});

api.interceptors.response.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
});

export default api;
