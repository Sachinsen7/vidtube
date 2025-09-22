import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    getUserChannelProfile,
    updateAccountDetails,
    updateUserAvatar,
    updateCoverImage,
    getWatchHistory,
} from "../controllers/users.controllers.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

//unsecured route
router.post("/login", loginUser);
router.post(
    "/register",
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        },
    ]),
    registerUser
);
router.post("/refresh-token", refreshAccessToken);

// secured route
router.post("/logout", logoutUser);
router.post("/change-password", verifyJWT, changeCurrentPassword);
router.get("/current-user", verifyJWT, getCurrentUser);
router.get("/c/:username", verifyJWT, getUserChannelProfile);
router.patch("/update-account", verifyJWT, updateAccountDetails);
router.patch(
    "/update-avatar",
    verifyJWT,
    upload.single("avatar"),
    updateUserAvatar
);
router.patch(
    "/update-cover-image",
    verifyJWT,
    upload.single("coverImage"),
    updateCoverImage
);
router.get("/history", verifyJWT, getWatchHistory);

export default router;
