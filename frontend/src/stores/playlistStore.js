import { create } from "zustand";
import {
    createPlaylist,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    getUserPlaylists,
} from "../services/playlist";

const usePlaylistStore = create((set) => ({
    playlists: [],
    selectedPlaylist: null,
    isLoading: false,
    error: null,

    fetchPlaylists: async (userId) => {
        set({ isLoading: true, error: null });
        try {
            const playlists = await getUserPlaylists(userId);
            set({ playlists, isLoading: false });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch playlists",
                isLoading: false,
            });
        }
    },

    fetchPlaylistById: async (playlistId) => {
        set({ isLoading: true, error: null });
        try {
            const playlist = await getPlaylistById(playlistId);
            set({ selectedPlaylist: playlist, isLoading: false });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to fetch playlist",
                isLoading: false,
            });
        }
    },

    createPlaylist: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const playlist = await createPlaylist(data);
            set((state) => ({
                playlists: [playlist, ...state.playlists],
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to create playlist",
                isLoading: false,
            });
        }
    },

    updatePlaylist: async (playlistId, data) => {
        set({ isLoading: true, error: null });
        try {
            const updatedPlaylist = await updatePlaylist(playlistId, data);
            set((state) => ({
                playlists: state.playlists.map((p) =>
                    p._id === playlistId ? updatedPlaylist : p
                ),
                selectedPlaylist: updatedPlaylist,
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to update playlist",
                isLoading: false,
            });
        }
    },

    deletePlaylist: async (playlistId) => {
        set({ isLoading: true, error: null });
        try {
            await deletePlaylist(playlistId);
            set((state) => ({
                playlists: state.playlists.filter((p) => p._id !== playlistId),
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to delete playlist",
                isLoading: false,
            });
        }
    },

    addVideoToPlaylist: async (videoId, playlistId) => {
        set({ isLoading: true, error: null });
        try {
            const updatedPlaylist = await addVideoToPlaylist(
                videoId,
                playlistId
            );
            set((state) => ({
                playlists: state.playlists.map((p) =>
                    p._id === playlistId ? updatedPlaylist : p
                ),
                selectedPlaylist: updatedPlaylist,
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to add video to playlist",
                isLoading: false,
            });
        }
    },

    removeVideoFromPlaylist: async (videoId, playlistId) => {
        set({ isLoading: true, error: null });
        try {
            const updatedPlaylist = await removeVideoFromPlaylist(
                videoId,
                playlistId
            );
            set((state) => ({
                playlists: state.playlists.map((p) =>
                    p._id === playlistId ? updatedPlaylist : p
                ),
                selectedPlaylist: updatedPlaylist,
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to remove video from playlist",
                isLoading: false,
            });
        }
    },
}));

export default usePlaylistStore;
