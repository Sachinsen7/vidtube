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

export default mongoose.model("Like", likeSchema);
