import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDatabase = async () => {
    try {
        const connectionDatabase = await mongoose.connect(
            `${process.env.MONGODB_URL}`
        );

        console.log(
            `Mongoose Connection successful ! host ${connectionDatabase.connection.host}`
        );
    } catch (err) {
        console.log("Connection failed", err);
        throw err;
    }
};

export default connectDatabase;
