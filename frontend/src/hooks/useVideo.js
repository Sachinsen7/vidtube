import { useState, useEffect, useCallback } from "react";
import useVideoStore from "../stores/videoStore";

export const useVideos = (params = {}) => {
    const {
        videos,
        selectedVideo,
        isLoading,
        error,
        fetchVideos,
        fetchVideoById,
        publishVideo,
        updateVideo,
        deleteVideo,
        togglePublishStatus,
    } = useVideoStore();
    const [pages, setPages] = useState(1);

    useEffect(() => {
        fetchVideos({ pages, limit: 10, ...params });
    }, [fetchVideos, pages, params]);

    const handleFetchVideoById = useCallback(
        async (videoId) => {
            await fetchVideoById(videoId);
        },
        [fetchVideoById]
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
        fetchVideos: handleFetchVideoById,
        publishVideo: handlePublishVideo,
        updateVideo: handleUpdateVideo,
        deleteVideo: handleDeleteVideo,
        togglePublishStatus: handleTogglePublishStatus,
    };
};
