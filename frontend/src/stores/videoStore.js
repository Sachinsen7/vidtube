import { create } from "zustand";
import {
    getAllVideos,
    getVideoById,
    publishVideo,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
} from "../services/video";

const useVideoStore = create((set) => ({
    videos: [],
    selectedVideo: null,
    isLoading: false,
    error: null,

    getAllVideos: async (params) => {
        set({ isLoading: true, error: null });
        try {
            const videos = await getAllVideos(params);
            set({ videos, isLoading: false });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to fetch videos",
                isLoading: false,
            });
        }
    },

    getVideoById: async (videoId) => {
        set({ isLoading: true, error: null });
        try {
            const video = await getVideoById(videoId);
            set({ selectedVideo: video, isLoading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Failed to fetch video",
                isLoading: false,
            });
        }
    },

    publishVideo: async (formData) => {
        set({ isLoading: true, error: null });
        try {
            const video = await publishVideo(formData);
            set((state) => ({
                videos: [video, ...state.videos],
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to publish video",
                isLoading: false,
            });
        }
    },

    updateVideo: async (videoId, formData) => {
        set({ isLoading: true, error: null });
        try {
            const updatedVideo = await updateVideo(videoId, formData);
            set((state) => ({
                videos: state.videos.map((v) =>
                    v._id === videoId ? updatedVideo : v
                ),
                selectedVideo: updatedVideo,
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to update video",
                isLoading: false,
            });
        }
    },

    deleteVideo: async (videoId) => {
        set({ isLoading: true, error: null });
        try {
            await deleteVideo(videoId);
            set((state) => ({
                videos: state.videos.filter((v) => v._id !== videoId),
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to delete video",
                isLoading: false,
            });
        }
    },

    togglePublishStatus: async (videoId) => {
        set({ isLoading: true, error: null });
        try {
            const updatedVideo = await togglePublishStatus(videoId);
            set((state) => ({
                videos: state.videos.map((v) =>
                    v._id === videoId ? updatedVideo : v
                ),
                selectedVideo: updatedVideo,
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to toggle publish status",
                isLoading: false,
            });
        }
    },
}));

export default useVideoStore;
