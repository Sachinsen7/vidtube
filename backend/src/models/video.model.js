import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
    {
        videoFile: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
        },
        duration: {
            type: Number,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

videoSchema.index({ owner: 1, createdAt: -1 });
videoSchema.index({ isPublished: 1, createdAt: -1 });
videoSchema.index({ views: -1 });

const VideoModel = mongoose.model("Video", videoSchema);

export default VideoModel;
