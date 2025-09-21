import { useState, useEffect, useCallback } from "react";
import useVideoStore from "../stores/videoStore";

export const useVideos = (params = {}) => {
    const {
        videos,
        selectedVideo,
        isLoading,
        error,
        fetchVideos,
        getVideoById,
        publishVideo,
        updateVideo,
        deleteVideo,
        togglePublishStatus,
    } = useVideoStore();
    const [pages, setPages] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Manual load function that components can call
    const loadVideos = useCallback(async () => {
        try {
            const response = await fetchVideos({
                page: pages,
                limit: 10,
                ...params,
            });
            if (response && response.length < 10) setHasMore(false);
        } catch (err) {
            setHasMore(false);
        }
    }, [pages]); // Only depend on pages, not on fetchVideos or params

    const handleFetchVideoById = useCallback(
        async (videoId) => {
            await getVideoById(videoId);
        },
        [getVideoById]
    );

    const handlePublishVideo = useCallback(
        async (formData) => {
            await publishVideo(formData);
        },
        [publishVideo]
    );

    const handleUpdateVideo = useCallback(
        async (videoId, formData) => {
            await updateVideo(videoId, formData);
        },
        [updateVideo]
    );

    const handleDeleteVideo = useCallback(
        async (videoId) => {
            await deleteVideo(videoId);
        },
        [deleteVideo]
    );

    const handleTogglePublishStatus = useCallback(
        async (videoId) => {
            await togglePublishStatus(videoId);
        },
        [togglePublishStatus]
    );

    return {
        videos,
        selectedVideo,
        isLoading,
        error,
        pages,
        setPages,
        hasMore,
        loadVideos, // Return the manual load function
        getVideoById: handleFetchVideoById,
        publishVideo: handlePublishVideo,
        updateVideo: handleUpdateVideo,
        deleteVideo: handleDeleteVideo,
        togglePublishStatus: handleTogglePublishStatus,
    };
};
