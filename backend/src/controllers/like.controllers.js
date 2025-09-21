import mongoose, { isValidObjectId } from "mongoose";
import likeModel from "../models/like.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import VideoModel from "../models/video.model.js";
import TweetModel from "../models/tweet.model.js";
import commentModel from "../models/comment.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const userId = req.user?._id;

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await VideoModel.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const existingLike = await likeModel.findOne({
        video: videoId,
        likedby: userId,
    });

    if (existingLike) {
        await existingLike.deleteOne();
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Like removed successfully"));
    }

    await likeModel.create({
        video: videoId,
        likedby: userId,
    });
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Like added successfully"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user?._id;

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const comment = await commentModel.findById(commentId);
    if (!comment) throw new ApiError(404, "Comment not found");

    const existingLike = await likeModel.findOne({
        comment: commentId,
        likedby: userId,
    });

    if (existingLike) {
        await existingLike.deleteOne();
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Like removed from comment"));
    }

    await likeModel.create({ comment: commentId, likedby: userId });
    return res
        .status(201)
        .json(new ApiResponse(201, {}, "Like added to comment"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const userId = req.user?._id;

    if (!mongoose.isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const tweet = await TweetModel.findById(tweetId);
    if (!tweet) throw new ApiError(404, "Tweet not found");

    const existingLike = await likeModel.findOne({
        tweet: tweetId,
        likedby: userId,
    });

    if (existingLike) {
        await existingLike.deleteOne();
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Like removed from tweet"));
    }

    await likeModel.create({ tweet: tweetId, likedby: userId });
    return res
        .status(201)
        .json(new ApiResponse(201, {}, "Like added to tweet"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const likes = await likeModel
        .find({ likedby: userId, video: { $ne: null } })
        .populate("video")
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, likes, "Liked videos fetched successfully"));
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
