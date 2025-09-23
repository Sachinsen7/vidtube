import { useState, useCallback } from "react";
import useVideoStore from "../stores/videoStore";
import { getTrendingVideos, getSubscriptionFeed } from "../services/video";

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
    }, [pages]);

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

    const [trending, setTrending] = useState([]);
    const [trendCursor, setTrendCursor] = useState(null);
    const [subs, setSubs] = useState([]);
    const [subsCursor, setSubsCursor] = useState(null);

    const loadTrending = useCallback(async (cursor) => {
        const res = await getTrendingVideos({ limit: 12, cursor });
        const items = res?.items || [];
        setTrending((prev) => (cursor ? [...prev, ...items] : items));
        setTrendCursor(res?.nextCursor || null);
        return items;
    }, []);

    const loadSubscriptionFeed = useCallback(async (cursor) => {
        const res = await getSubscriptionFeed({ limit: 12, cursor });
        const items = res?.items || [];
        setSubs((prev) => (cursor ? [...prev, ...items] : items));
        setSubsCursor(res?.nextCursor || null);
        return items;
    }, []);

    return {
        videos,
        selectedVideo,
        isLoading,
        error,
        pages,
        setPages,
        hasMore,
        loadVideos,
        getVideoById: handleFetchVideoById,
        publishVideo: handlePublishVideo,
        updateVideo: handleUpdateVideo,
        deleteVideo: handleDeleteVideo,
        togglePublishStatus: handleTogglePublishStatus,
        trending,
        trendCursor,
        loadTrending,
        subs,
        subsCursor,
        loadSubscriptionFeed,
    };
};
