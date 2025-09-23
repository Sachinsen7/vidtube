import { Router } from "express";
import {
    getLikedVideos,
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,
    likeVideo,
    unlikeVideo,
    likeComment,
    unlikeComment,
    likeTweet,
    unlikeTweet,
} from "../controllers/like.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/video/:videoId").post(likeVideo).delete(unlikeVideo);
router.route("/comment/:commentId").post(likeComment).delete(unlikeComment);
router.route("/tweet/:tweetId").post(likeTweet).delete(unlikeTweet);
router.route("/toggle/v/:videoId").post(toggleVideoLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/videos").get(getLikedVideos);

export default router;
