import mongoose, { isValidObjectId } from "mongoose";
import VideoModel from "../models/video.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

    const filter = {};
    if (query) {
        filter.title = { $regex: query, $options: "i" };
    }

    if (userId && isValidObjectId(userId)) {
        filter.owner = userId;
    }

    const sortOrder = sortType === "asc" ? 1 : -1;

    const videos = await VideoModel.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .populate("owner", "username, email");

    const total = await VideoModel.countDocuments(filter);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { videos, total, page, limit },
                "Videos fetched successfully"
            )
        );
});

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    const videoFilePath = req.files?.videoFile?.[0]?.path;
    if (!videoFilePath) {
        throw new ApiError(400, "Video file is required");
    }

    const uploadedVideo = await uploadOnCloudinary(videoFilePath);
    if (!uploadedVideo?.url) {
        throw new ApiError(500, "Failed to upload video");
    }

    const video = await VideoModel.create({
        title,
        description,
        videoFile: uploadedVideo.url,
        duration: uploadedVideo.duration || 0,
        owner: req.user._id,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, video, "Video created successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await VideoModel.findById(videoId).populate(
        "owner",
        "username email"
    );
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description } = req.body;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;

    if (req.files?.thumbnail?.[0]?.path) {
        const thumbnailUpload = await uploadOnCloudinary(
            req.files.thumbnail[0].path
        );
        if (thumbnailUpload?.url) {
            updateData.thumbnail = thumbnailUpload.url;
        }
    }

    const updatedVideo = await VideoModel.findByIdAndUpdate(
        videoId,
        updateData,
        {
            new: true,
        }
    );

    if (!updatedVideo) {
        throw new ApiError(404, "Video not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedVideo, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await VideoModel.findByIdAndDelete(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.videoFile) {
        const publicId = video.videoFile.split("/").pop().split(".")[0];
        await deleteFromCloudinary(publicId);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await VideoModel.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    video.isPublished = !video.isPublished;
    await video.save();

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Publish status toggled"));
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
};
