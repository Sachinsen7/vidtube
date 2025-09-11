import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.headers["authorization"]?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Access token not found");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        req.user = user;

        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
