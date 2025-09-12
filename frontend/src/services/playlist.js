import api from "./api";

export const createPlaylist = async (data) => {
    const response = await api.post("/api/v1/playlists", data);
    return response.data.data;
};

export const getPlaylistById = async (playlistId) => {
    const response = await api.get(`/api/v1/playlists/${playlistId}`);
    return response.data.data;
};

export const updatePlaylist = async (playlistId, data) => {
    const response = await api.patch(`/api/v1/playlists/${playlistId}`, data);
    return response.data.data;
};

export const deletePlaylist = async (playlistId) => {
    const response = await api.delete(`/api/v1/playlists/${playlistId}`);
    return response.data.data;
};

export const addVideoToPlaylist = async (videoId, playlistId) => {
    const response = await api.patch(
        `/api/v1/playlists/add/${videoId}/${playlistId}`
    );
    return response.data.data;
};

export const removeVideoFromPlaylist = async (videoId, playlistId) => {
    const response = await api.patch(
        `/api/v1/playlists/remove/${videoId}/${playlistId}`
    );
    return response.data.data;
};

export const getUserPlaylists = async (userId) => {
    const response = await api.get(`/api/v1/playlists/user/${userId}`);
    return response.data.data;
};
