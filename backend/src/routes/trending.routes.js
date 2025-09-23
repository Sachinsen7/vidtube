import { Router } from "express";
import { getTrendingVideos } from "../controllers/trending.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/videos").get(getTrendingVideos);

export default router;


