import mongoose, { isValidObjectId } from "mongoose";
import User from "../models/user.model.js";
import Subscription from "../models/suscription.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    const subscriberId = req.user?._id;

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }

    if (subscriberId.toString() === channelId.toString()) {
        throw new ApiError(400, "You cannot subscribe to your own channel");
    }

    const channel = await User.findById(channelId);
    if (!channel) throw new ApiError(404, "Channel not found");

    const existingSubscription = await Subscription.findOne({
        subscriber: subscriberId,
        channel: channelId,
    });

    if (existingSubscription) {
        await existingSubscription.deleteOne();
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Unsubscribed successfully"));
    }

    await Subscription.create({
        subscriber: subscriberId,
        channel: channelId,
    });
    return res
        .status(201)
        .json(new ApiResponse(201, {}, "Subscribed successfully"));
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }

    const subscribers = await Subscription.find({
        channel: channelId,
    }).populate("subscriber", "username, email");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                subscribers,
                "Subscribers fetched successfully"
            )
        );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;

    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriber ID");
    }

    const channels = await Subscription.find({
        subscriber: subscriberId,
    }).populate("channel", "username email");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                channels,
                "Subscribed channels fetched successfully"
            )
        );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
