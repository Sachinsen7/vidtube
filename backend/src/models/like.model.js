import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            required: true,
        },
        tweet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet",
        },
        likedby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

likeSchema.index({ likedby: 1, video: 1 }, { unique: true, sparse: true });
likeSchema.index({ likedby: 1, comment: 1 }, { unique: true, sparse: true });
likeSchema.index({ likedby: 1, tweet: 1 }, { unique: true, sparse: true });

export default mongoose.model("Like", likeSchema);
