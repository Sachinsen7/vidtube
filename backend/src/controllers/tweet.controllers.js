import mongoose, { isValidObjectId } from "mongoose";
import TweetModel from "../models/tweet.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const userId = req.user?._id;

    if (!content) throw new ApiError(400, "Tweet content is required");

    const tweet = await TweetModel.create({
        content,
        owner: userId,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, tweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) throw new ApiError(400, "Invalid user ID");

    const user = await User.findById(userId);

    if (!user) throw new ApiError(404, "User not found");

    const tweets = await TweetModel.find({ owner: userId }).sort({
        createdAt: -1,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, tweets, "User tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { content } = req.body;
    const userId = req.user?._id;

    if (!isValidObjectId(tweetId)) throw new ApiError(400, "Invalid tweet ID");
    if (!content) throw new ApiError(400, "Tweet content is required");

    const tweet = await TweetModel.findById(tweetId);
    if (!tweet) throw new ApiError(404, "Tweet not found");

    if (tweet.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to update this tweet");
    }

    tweet.content = content;
    await tweet.save();

    return res
        .status(200)
        .json(new ApiResponse(200, tweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const userId = req.user?._id;

    if (!isValidObjectId(tweetId)) throw new ApiError(400, "Invalid tweet ID");

    const tweet = await TweetModel.findById(tweetId);
    if (!tweet) throw new ApiError(404, "Tweet not found");

    if (tweet.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to delete this tweet");
    }

    await tweet.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
