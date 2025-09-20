import { Router } from "express";
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
    retweetTweet,
    bookmarkTweet,
} from "../controllers/tweet.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(verifyJWT, upload.single("image"), createTweet);
router.route("/user/:userId").get(getUserTweets);
router
    .route("/:tweetId")
    .patch(verifyJWT, updateTweet)
    .delete(verifyJWT, deleteTweet);
router.route("/retweet/:tweetId").post(verifyJWT, retweetTweet);
router.route("/bookmark/:tweetId").post(verifyJWT, bookmarkTweet);

export default router;
