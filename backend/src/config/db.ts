import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI as string);
        isConnected = true;
        console.log(` 🚀 DATABASE CONNECTED SUCCESSFULLY: ${connect.connection.host}`);
    } catch (error) {
        console.error("❌ DATABASE FAILED CONNECTING:", error);
    }
};