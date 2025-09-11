import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localPath) => {
    try {
        console.log("Cloudinary Config: ", {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        if (!localPath) return null;
        const normalizedPath = path.resolve(localPath).replace(/\\/g, "/");
        console.log("Normalized Path: ", normalizedPath);

        const response = await cloudinary.uploader.upload(normalizedPath, {
            resource_type: "auto",
        });

        console.log(
            "File Uploaded in cloaudinary seuccessfully, File Path:",
            response.url
        );

        // once the file is uploaded, we would like to delete it from the server

        fs.unlinkSync(localPath);
        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message || error);
        if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
        return null;
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(
            "file deleted from cloudinary successfully, File Path:",
            publicId
        );
        return result;
    } catch (error) {
        console.error("error deleting file from cloudinary: ", error);
        return null;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };
