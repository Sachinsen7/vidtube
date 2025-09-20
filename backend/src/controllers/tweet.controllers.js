import mongoose, { isValidObjectId } from "mongoose";
import TweetModel from "../models/tweet.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/cloudinary.js";

const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const userId = req.user?._id;
    const imagePath = req.file?.path;

    if (!content) throw new ApiError(400, "Tweet content is required");

    let image = "";
    if (imagePath) {
        const uploadedImage = await uploadOnCloudinary(imagePath);
        if (!uploadedImage?.url)
            throw new ApiError(500, "Failed to upload image");
        image = uploadedImage.url;
    }

    const tweet = await TweetModel.create({
        content,
        owner: userId,
        image,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, tweet, "Tweet created successfully"));
});

const retweetTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const userId = req.user?._id;

    if (!isValidObjectId(tweetId)) throw new ApiError(400, "Invalid tweet ID");

    const tweet = await TweetModel.findById(tweetId);
    if (!tweet) throw new ApiError(404, "Tweet not found");

    const isRetweeted = tweet.retweets.includes(userId);
    if (isRetweeted) {
        tweet.retweets = tweet.retweets.filter(
            (id) => id.toString() !== userId.toString()
        );
    } else {
        tweet.retweets.push(userId);
    }
    await tweet.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                tweet,
                isRetweeted ? "Tweet unretweeted" : "Tweet retweeted"
            )
        );
});

const bookmarkTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const userId = req.user?._id;

    if (!isValidObjectId(tweetId)) throw new ApiError(400, "Invalid tweet ID");

    const tweet = await TweetModel.findById(tweetId);
    if (!tweet) throw new ApiError(404, "Tweet not found");

    const isBookmarked = tweet.bookmarks.includes(userId);
    if (isBookmarked) {
        tweet.bookmarks = tweet.bookmarks.filter(
            (id) => id.toString() !== userId.toString()
        );
    } else {
        tweet.bookmarks.push(userId);
    }
    await tweet.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                tweet,
                isBookmarked ? "Tweet unbookmarked" : "Tweet bookmarked"
            )
        );
});

const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) throw new ApiError(400, "Invalid user ID");

    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const tweets = await TweetModel.find({ owner: userId })
        .populate("owner", "username fullName avatar")
        .sort({ createdAt: -1 });

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

    if (tweet.image) {
        await deleteFromCloudinary(tweet.image);
    }
    await tweet.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Tweet deleted successfully"));
});

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
    retweetTweet,
    bookmarkTweet,
};
