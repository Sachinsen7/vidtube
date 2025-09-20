import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    login,
    register,
    logout,
    refreshAccessToken,
    updateAccountDetails,
    updateAvatar,
    updateCoverImage,
} from "../services/auth";

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
                    const { existedUser, accessToken, refreshToken } =
                        await login(credentials);
                    set({
                        user: existedUser,
                        accessToken,
                        refreshToken,
                        isLoading: false,
                    });
                    return existedUser;
                } catch (error) {
                    set({
                        error: error.response?.data?.message || "Login failed",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            register: async (formData) => {
                set({ isLoading: true, error: null });
                try {
                    const { existedUser, accessToken, refreshToken } =
                        await register(formData);
                    set({
                        user: existedUser,
                        accessToken,
                        refreshToken,
                        isLoading: false,
                    });
                    return existedUser;
                } catch (error) {
                    set({
                        error:
                            error.response?.data?.message ||
                            "Registration failed",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            logout: async () => {
                set({ isLoading: true, error: null });
                try {
                    await logout();
                    set({
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        isLoading: false,
                    });
                } catch (error) {
                    set({
                        error: error.response?.data?.message || "Logout failed",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            refreshAccessToken: async () => {
                set({ isLoading: true, error: null });
                try {
                    const { accessToken, refreshToken } =
                        await refreshAccessToken();
                    set({ accessToken, refreshToken, isLoading: false });
                    return { accessToken, refreshToken };
                } catch (error) {
                    set({
                        error:
                            error.response?.data?.message ||
                            "Token refresh failed",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            updateAccount: async (details) => {
                set({ isLoading: true, error: null });
                try {
                    const user = await updateAccountDetails(details);
                    set({ user, isLoading: false });
                    return user;
                } catch (error) {
                    set({
                        error: error.response?.data?.message || "Update failed",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            updateAvatar: async (file) => {
                set({ isLoading: true, error: null });
                try {
                    const user = await updateAvatar(file);
                    set({ user, isLoading: false });
                    return user;
                } catch (error) {
                    set({
                        error:
                            error.response?.data?.message ||
                            "Avatar update failed",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            updateCoverImage: async (file) => {
                set({ isLoading: true, error: null });
                try {
                    const user = await updateCoverImage(file);
                    set({ user, isLoading: false });
                    return user;
                } catch (error) {
                    set({
                        error:
                            error.response?.data?.message ||
                            "Cover image update failed",
                        isLoading: false,
                    });
                    throw error;
                }
            },
        }),
        { name: "auth-storage" }
    )
);

export default useAuthStore;
