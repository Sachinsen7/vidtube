import mongoose from "mongoose";
import VideoModel from "../models/video.model.js";
import Subscription from "../models/suscription.model.js";
import likeModel from "../models/like.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
    const channelId = req.user?._id;

    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(400, "Inavlid channel ID");
    }

    const totalVideos = await VideoModel.countDocuments({ channel: channelId });
    const totalSubscribers = await Subscription.countDocuments({
        channel: channelId,
    });

    const viewsAgg = await VideoModel.aggregate([
        { $match: { owner: new mongoose.Types.ObjectId(channelId) } },
        { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);

    const totalViews = viewsAgg[0]?.totalViews || 0;

    // Total likes on videos of this channel
    const likesAgg = await likeModel.aggregate([
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "videoData",
            },
        },
        { $unwind: "$videoData" },
        {
            $match: {
                "videoData.owner": new mongoose.Types.ObjectId(channelId),
            },
        },
        { $count: "totalLikes" },
    ]);

    const totalLikes = likesAgg[0]?.totalLikes || 0;

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalVideos,
                totalSubscribers,
                totalViews,
                totalLikes,
            },
            "Channel stats fetched successfully"
        )
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
    const channelId = req.params.channelId;

    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel id");
    }

    const videos = await VideoModel.find({ owner: channelId }).sort({
        createdAt: -1,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(200, videos, "Channel videos fetched successfully")
        );
});

export { getChannelStats, getChannelVideos };
