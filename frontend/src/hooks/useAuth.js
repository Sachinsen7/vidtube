import { useCallback } from "react";
import useAuthStore from "../stores/authStore";
import {
    login,
    register,
    logout,
    refreshAccessToken,
    changePassword,
    getCurrentUser,
    getUserChannelProfile,
    updateAccountDetails,
    updateAvatar,
    updateCoverImage,
    getWatchHistory,
} from "../services/auth";

export const useAuth = () => {
    const {
        user,
        accessToken,
        refreshToken,
        isLoading,
        error,
        login: loginStore,
        register: registerStore,
        logout: logoutStore,
        refreshAccessToken: refreshAccessTokenStore,
        updateAccount,
        updateAvatar: updateAvatarStore,
        updateCoverImage: updateCoverImageStore,
    } = useAuthStore();

    const loginUser = useCallback(
        async (credentials) => {
            await loginStore(credentials);
        },
        [loginStore]
    );

    const registerUser = useCallback(
        async (formData) => {
            await registerStore(formData);
        },
        [registerStore]
    );

    const logoutUser = useCallback(async () => {
        await logoutStore();
    }, [logoutStore]);

    const refreshAccessToken = useCallback(async () => {
        await refreshAccessTokenStore();
    }, [refreshAccessTokenStore]);

    const updateUserAccount = useCallback(
        async (details) => {
            await updateAccount(details);
        },
        [updateAccount]
    );

    const updateUserAvatar = useCallback(
        async (file) => {
            await updateAvatarStore(file);
        },
        [updateAvatarStore]
    );

    const updateUserCoverImage = useCallback(
        async (file) => {
            await updateCoverImageStore(file);
        },
        [updateCoverImageStore]
    );

    return {
        user,
        accessToken,
        refreshToken,
        isLoading,
        error,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
        refreshAccessToken: refreshAccessToken,
        changePassword,
        getCurrentUser,
        getUserChannelProfile,
        updateAccount: updateUserAccount,
        updateAvatar: updateUserAvatar,
        updateCoverImage: updateUserCoverImage,
        getWatchHistory,
    };
};
