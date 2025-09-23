import mongoose, { isValidObjectId } from "mongoose";
import likeModel from "../models/like.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import VideoModel from "../models/video.model.js";
import TweetModel from "../models/tweet.model.js";
import commentModel from "../models/comment.model.js";

const likeVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const userId = req.user?._id;

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }
    const video = await VideoModel.findById(videoId).lean();
    if (!video) throw new ApiError(404, "Video not found");

    await likeModel.updateOne(
        { video: videoId, likedby: userId },
        { $setOnInsert: { video: videoId, likedby: userId } },
        { upsert: true }
    );
    const likesCount = await likeModel.countDocuments({ video: videoId });
    return res
        .status(200)
        .json(new ApiResponse(200, { liked: true, likesCount }, "Video liked"));
});

const unlikeVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const userId = req.user?._id;
    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }
    await likeModel.deleteOne({ video: videoId, likedby: userId });
    const likesCount = await likeModel.countDocuments({ video: videoId });
    return res
        .status(200)
        .json(
            new ApiResponse(200, { liked: false, likesCount }, "Video unliked")
        );
});

const likeComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user?._id;
    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }
    const comment = await commentModel.findById(commentId).lean();
    if (!comment) throw new ApiError(404, "Comment not found");
    await likeModel.updateOne(
        { comment: commentId, likedby: userId },
        { $setOnInsert: { comment: commentId, likedby: userId } },
        { upsert: true }
    );
    const likesCount = await likeModel.countDocuments({ comment: commentId });
    return res
        .status(200)
        .json(
            new ApiResponse(200, { liked: true, likesCount }, "Comment liked")
        );
});

const unlikeComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user?._id;
    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }
    await likeModel.deleteOne({ comment: commentId, likedby: userId });
    const likesCount = await likeModel.countDocuments({ comment: commentId });
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { liked: false, likesCount },
                "Comment unliked"
            )
        );
});

const likeTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const userId = req.user?._id;
    if (!mongoose.isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }
    const tweet = await TweetModel.findById(tweetId).lean();
    if (!tweet) throw new ApiError(404, "Tweet not found");
    await likeModel.updateOne(
        { tweet: tweetId, likedby: userId },
        { $setOnInsert: { tweet: tweetId, likedby: userId } },
        { upsert: true }
    );
    const likesCount = await likeModel.countDocuments({ tweet: tweetId });
    return res
        .status(200)
        .json(new ApiResponse(200, { liked: true, likesCount }, "Tweet liked"));
});

const unlikeTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const userId = req.user?._id;
    if (!mongoose.isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }
    await likeModel.deleteOne({ tweet: tweetId, likedby: userId });
    const likesCount = await likeModel.countDocuments({ tweet: tweetId });
    return res
        .status(200)
        .json(
            new ApiResponse(200, { liked: false, likesCount }, "Tweet unliked")
        );
});

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

export {
    likeVideo,
    unlikeVideo,
    likeComment,
    unlikeComment,
    likeTweet,
    unlikeTweet,
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos,
};
