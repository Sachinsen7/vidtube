import { useCallback } from "react";
import useAuthStore from "../stores/authStore";

export const useAuth = () => {
    const {
        user,
        accessToken,
        refreshToken,
        isLoading,
        error,
        login,
        register,
        logout,
        refreshAccessToken,
        updateAccount,
        updateAvatar,
        updateCoverImage,
    } = useAuthStore();

    const handleLogin = useCallback(
        async (credientials) => {
            login(credientials);
        },
        [login]
    );

    const handleRegister = useCallback(
        async (formData) => {
            await register(formData);
        },
        [register]
    );

    const handleLogout = useCallback(async () => {
        await logout();
    }, [logout]);

    const handleRefreshToken = useCallback(async () => {
        await refreshAccessToken();
    }, [refreshAccessToken]);

    const handleUpdateAccount = useCallback(
        async (details) => {
            await updateAccount(details);
        },
        [updateAccount]
    );

    const handleUpdateAvatar = useCallback(
        async (file) => {
            await updateAvatar(file);
        },
        [updateAvatar]
    );

    const handleUpdateCoverImage = useCallback(
        async (file) => {
            await updateCoverImage(file);
        },
        [updateCoverImage]
    );

    return {
        user,
        accessToken,
        refreshToken,
        isLoading,
        error,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        refreshAccessToken: handleRefreshToken,
        updateAccount: handleUpdateAccount,
        updateAvatar: handleUpdateAvatar,
        updateCoverImage: handleUpdateCoverImage,
    };
};
