import mongoose, { isValidObjectId } from "mongoose";
import playlistModel from "../models/playlist.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import VideoModel from "../models/video.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const userId = req.user?._id;

    if (!name) {
        throw new ApiError(400, "Playlist name is required");
    }

    const playlist = await playlistModel.create({
        name,
        description,
        owner: userId,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, playlist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    if (!isValidObjectId(userId)) throw new ApiError(400, "Invalid user ID");

    const playlists = await playlistModel
        .find({
            owner: userId,
        })
        .populate("videos");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                playlists,
                "User playlists fetched successfully"
            )
        );
});

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId))
        throw new ApiError(400, "Invalid playlist ID");

    const playlist = await playlistModel
        .findById(playlistId)
        .populate("videos");

    if (!playlist) throw new ApiError(404, "Playlist not found");

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist fetched successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlist or video ID");
    }

    const playlist = await playlistModel.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");

    const video = await VideoModel.findById(videoId);
    if (!video) throw new ApiError(404, "Video not found");

    if (playlist.videos.includes(videoId)) {
        throw new ApiError(400, "Video already in playlist");
    }

    playlist.videos.push(videoId);
    await playlist.save();

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Video added to playlist"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlist or video ID");
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");

    playlist.videos = playlist.videos.filter(
        (vid) => vid.toString() !== videoId
    );

    await playlist.save();

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Video removed from playlist"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId))
        throw new ApiError(400, "Invalid playlist ID");

    const playlist = await playlistModel.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");

    await playlist.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;
    if (!isValidObjectId(playlistId))
        throw new ApiError(400, "Invalid playlist ID");

    const playlist = await playlistModel.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");

    if (name) playlist.name = name;
    if (description) playlist.description = description;

    await playlist.save();

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist updated successfully"));
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
};
