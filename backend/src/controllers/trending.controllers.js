import VideoModel from "../models/video.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const getTrendingVideos = asyncHandler(async (req, res) => {
    const { limit = 20, cursor } = req.query;

    const match = { isPublished: true };
    if (cursor) {
        const d = new Date(cursor);
        if (!isNaN(d.getTime())) match.createdAt = { $lt: d };
    }

    const items = await VideoModel.find(match)
        .sort({ views: -1, createdAt: -1 })
        .limit(parseInt(limit, 10))
        .select("title thumbnail duration views createdAt owner")
        .populate("owner", "username avatar")
        .lean();

    const nextCursor =
        items.length > 0 ? items[items.length - 1].createdAt : null;
    return res
        .status(200)
        .json(new ApiResponse(200, { items, nextCursor }, "OK"));
});
