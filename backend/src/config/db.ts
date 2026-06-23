import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI as string)
        console.log(` 🚀 DATABASE IS CONNECTING SUCCESSFULLE ${connect.connection.host}`)
    } catch (error) {
        console.error("❌ DATABASE IS FAILED CONNECTING", error)
    }
}