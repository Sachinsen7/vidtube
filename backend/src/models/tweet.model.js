import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 280,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    retweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const TweetModel = mongoose.model("Tweet", tweetSchema);

tweetSchema.index({ owner: 1, createdAt: -1 });
tweetSchema.index({ createdAt: -1 });
export default TweetModel;
