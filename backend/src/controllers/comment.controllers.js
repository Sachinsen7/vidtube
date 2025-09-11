import mongoose, { mongo } from "mongoose";
import commentModel from "../models/comment.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import VideoModel from "../models/video.model.js";

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await VideoModel.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const comment = commentModel.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
            },
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "comment",
                as: "likes",
            },
        },
        {
            $addFields: {
                likesCount: {
                    $size: "$likes",
                },
                owner: {
                    $first: "$ownerDetails",
                },
                isLiked: {
                    $cond: {
                        if: { $in: [req.user?._id, "$likes.likedBy"] },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $project: {
                content: 1,
                createdAt: 1,
                likesCount: 1,
                isLiked: 1,
                owner: {
                    username: 1,
                    avatar: 1,
                },
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
    ]);

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
    };

    const comments = await commentModel.aggregatePaginate(comment, options);

    if (!comments || comments.docs.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(200, [], "No comments found for this video"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

const addComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Comment content cannot be empty");
    }

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await VideoModel.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const comment = await commentModel.create({
        content,
        video: videoId,
        owner: req.user?._id,
    });

    if (!comment) {
        throw new ApiError(500, "Comment not created");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, comment, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Content cannot be empty");
    }

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    if (comment.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to update this comment"
        );
    }

    const updateComment = await commentModel.findByIdAndUpdate(
        commentId,
        {
            $set: {
                content,
            },
        },
        {
            new: true,
        }
    );

    if (!updateComment) {
        throw new ApiError(500, "Failed to update comment");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedComment, "Comment updated successfully")
        );
});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    if (comment.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to delete this comment"
        );
    }

    await Comment.findByIdAndDelete(commentId);

    await Like.deleteMany({ comment: commentId });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
