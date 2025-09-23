import mongoose from "mongoose";
import Subscription from "../models/suscription.model.js";
import VideoModel from "../models/video.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const getSubscriptionFeed = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { cursor, limit = 20 } = req.query;

    const subs = await Subscription.find({ subscriber: userId })
        .select("channel")
        .lean();

    const channelIds = subs.map((s) => s.channel).filter(Boolean);
    if (channelIds.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(200, { items: [], nextCursor: null }, "OK"));
    }

    const match = { owner: { $in: channelIds }, isPublished: true };
    if (cursor) {
        const d = new Date(cursor);
        if (!isNaN(d.getTime())) match.createdAt = { $lt: d };
    }

    const videos = await VideoModel.find(match)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit, 10))
        .select("title thumbnail duration views createdAt owner")
        .populate("owner", "username avatar")
        .lean();

    const nextCursor =
        videos.length > 0 ? videos[videos.length - 1].createdAt : null;
    return res
        .status(200)
        .json(new ApiResponse(200, { items: videos, nextCursor }, "OK"));
});
