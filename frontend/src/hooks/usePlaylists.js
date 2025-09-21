import { useState, useEffect, useCallback } from "react";
import usePlaylistStore from "../stores/playlistStore";

export const usePlaylists = (userId) => {
    const {
        playlists,
        selectedPlaylist,
        isLoading,
        error,
        fetchPlaylists,
        fetchPlaylistById,
        createPlaylist,
        updatePlaylist,
        deletePlaylist,
        addVideoToPlaylist,
        removeVideoFromPlaylist,
    } = usePlaylistStore();

    useEffect(() => {
        if (userId) {
            fetchPlaylists(userId);
        }
    }, [userId]); // Remove fetchPlaylists from dependencies to prevent infinite loops

    const handleFetchPlaylistById = useCallback(
        async (playlistId) => {
            await fetchPlaylistById(playlistId);
        },
        [fetchPlaylistById]
    );
    const handleCreatePlaylist = useCallback(
        async (data) => {
            await createPlaylist(data);
        },
        [createPlaylist]
    );

    const handleUpdatePlaylist = useCallback(
        async (playlistId, data) => {
            await updatePlaylist(playlistId, data);
        },
        [updatePlaylist]
    );

    const handleDeletePlaylist = useCallback(
        async (playlistId) => {
            await deletePlaylist(playlistId);
        },
        [deletePlaylist]
    );

    const handleAddVideoToPlaylist = useCallback(
        async (videoId, playlistId) => {
            await addVideoToPlaylist(videoId, playlistId);
        },
        [addVideoToPlaylist]
    );

    const handleRemoveVideoFromPlaylist = useCallback(
        async (videoId, playlistId) => {
            await removeVideoFromPlaylist(videoId, playlistId);
        },
        [removeVideoFromPlaylist]
    );
    return {
        playlists,
        selectedPlaylist,
        isLoading,
        error,
        fetchPlaylistById: handleFetchPlaylistById,
        createPlaylist: handleCreatePlaylist,
        updatePlaylist: handleUpdatePlaylist,
        deletePlaylist: handleDeletePlaylist,
        addVideoToPlaylist: handleAddVideoToPlaylist,
        removeVideoFromPlaylist: handleRemoveVideoFromPlaylist,
    };
};
