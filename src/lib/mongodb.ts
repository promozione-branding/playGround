import mongoose from "mongoose";

const connectDB = async () => {
    const MONGODB_URI =
        process.env.MONGODB_URI ||
        process.env.MONGO_URI ||
        process.env.MONGODB_URL;
    
    if (!MONGODB_URI) {
        console.error("MONGODB_URI is not defined in the environment variables.");
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        await mongoose.connect(MONGODB_URI);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectDB;