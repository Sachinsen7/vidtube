import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
        },
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

commentSchema.plugin(mongooseAggregatePaginate);

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
