import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isLoading: false,
            error: null,

            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(
                        "/api/v1/users/login",
                        credentials
                    );
                    const { user, accessToken, refreshToken, isLoading } =
                        response.data.data;
                    set({ user, accessToken, refreshToken, isLoading: false });
                    axios.defaults.headers.common["Authorization"] =
                        `Bearer ${accessToken}`;
                } catch (error) {
                    set({
                        error: error.response?.data?.message || "Login failed",
                        isLoading: false,
                    });
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    await axios.post("/api/v1/users/logout");
                    set({
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        isLoading: false,
                    });
                    delete axios.defaults.headers.common["Authorization"];
                } catch (error) {
                    set({
                        error: error.message?.data?.message || "Logout failed",
                        isLoading: false,
                    });
                }
            },

            refreshAccessToken: async () => {
                set({ isLoading: true });
                try {
                    const response = await axios.post(
                        "/api/v1/users/refresh-token"
                    );
                    const { accessToken, refreshToken } = response.data.data;
                    set({ accessToken, refreshToken, isLoading: false });
                    axios.defaults.headers.common["Authorization"] =
                        `Bearer ${accessToken}`;
                } catch (error) {
                    set({
                        error:
                            error.response?.data?.message ||
                            "Token refresh failed",
                        isLoading: false,
                    });
                }
            },
        }),
        { name: "auth-storage" }
    )
);

export default useAuthStore;
