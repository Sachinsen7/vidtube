import { Router } from "express";
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/c/:channelId").post(toggleSubscription);

router.route("/u/:subscriberId").get(getUserChannelSubscribers);

router.route("/subscribed/:subscriberId").get(getSubscribedChannels);

export default router;
