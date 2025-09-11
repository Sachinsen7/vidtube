import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";  

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating access and refresh tokens"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body;

    if (
        [fullName, username, email, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const avatarPath = req.files?.avatar?.[0]?.path;
    const coverPath = req.files?.coverImage?.[0]?.path;

    if (!avatarPath) {
        throw new ApiError(400, "Avatar is required");
    }

    // const avatar = await uploadOnCloudinary(avatarPath);

    // let coverImage = "";

    // if (coverImage) {
    //   coverImage = await uploadOnCloudinary(coverPath);
    // }
    console.log("Avatar local path:", req.files?.avatar?.[0]?.path);
    console.log("Cover local path:", req.files?.coverImage?.[0]?.path);

    let avatar;
    try {
        avatar = await uploadOnCloudinary(avatarPath);
        console.log("Avatar uploaded:", avatar);
    } catch (error) {
        console.error("Error uploading avatar:", error);
        throw new ApiError(500, "Failed to upload avatar");
    }

    let coverImage = null;
    if (coverPath) {
        try {
            coverImage = await uploadOnCloudinary(coverPath);
            console.log("Cover image uploaded:", coverImage);
        } catch (error) {
            console.error("Error uploading cover image:", error);
            throw new ApiError(500, "Failed to upload cover image");
        }
    }

    console.log("Creating user with data:", {
        fullName,
        avatar: avatar?.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
        email,
        password,
    });

    try {
        const user = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            username: username.toLowerCase(),
            email,
            password,
        });

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong");
        }

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    createdUser,
                    "User registered successfully"
                )
            );
    } catch (error) {
        console.log("User registration error:", error);

        if (avatar) {
            await deleteFromCloudinary(avatar.public_id);
        }

        if (coverImage) {
            await deleteFromCloudinary(coverImage.public_id);
        }

        throw new ApiError(
            500,
            "Something went wrong while registering a user and images were deleted"
        );
    }
});

const loginUser = asyncHandler(async (req, res) => {
    //get data from body

    const { email, username, password } = req.body;

    if ([email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (!existedUser) {
        throw new ApiError(404, "User not found");
    }

    // validate password

    const isPasswordCorrect = await existedUser.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password is incorrect");
    }

    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(existedUser._id);

    const loggedInUser = await User.findById(existedUser._id).select(
        "-password -refreshToken "
    );

    if (!loggedInUser) {
        throw new ApiError(500, "Something went wrong");
    }

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { existedUser: loggedInUser, accessToken, refreshToken },
                "User logged in successfully",
                {
                    accessToken,
                }
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized access");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token in expired");
        }

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
        };

        const { accessToken, refreshToken: newRefreshToken } =
            await generateAccessTokenAndRefreshToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken },
                    "Access token refreshed successfully"
                )
            );
    } catch (error) {
        throw new ApiError(401, "Invalid refresh token");
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Old password is incorrect");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "Current user fetched successfully")
        );
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;

    if ([fullName, email].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                fullName,
                email: email,
            },
        },
        { new: true }
    ).select("-password -refreshToken");

    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Account details updated successfully")
        );
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(500, "Something went wrong while uploading avatar");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                avatar: avatar.url,
            },
        },
        { new: true }
    ).select("-password -refreshToken");

    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

const updateCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path;

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image is required");
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!coverImage.url) {
        throw new ApiError(
            500,
            "Something went wrong while uploading cover image"
        );
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                coverImage: coverImage.url,
            },
        },
        { new: true }
    ).select("-password -refreshToken");

    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Cover image updated successfully"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username?.trim()) {
        throw new ApiError(400, "Username is required");
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase(),
            },
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers",
            },
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo",
            },
        },
        {
            $addFields: {
                subscribersCount: { $size: "$subscribers" },
                subscribedToCount: { $size: "$subscribedTo" },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                subscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1,
            },
        },
    ]);

    if (!channel?.length) {
        throw new ApiError(404, "Channel not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, channel[0], "Channel found"));
});

const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id),
            },
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner",
                            },
                        },
                    },
                ],
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(200, user[0].watchHistory, "Watch history found")
        );
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    changeCurrentPassword,
    updateAccountDetails,
    updateUserAvatar,
    updateCoverImage,
    getUserChannelProfile,
    getWatchHistory,
};
