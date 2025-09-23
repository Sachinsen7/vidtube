import { Router } from "express";
import { getSubscriptionFeed } from "../controllers/feed.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/subscriptions").get(getSubscriptionFeed);

export default router;


