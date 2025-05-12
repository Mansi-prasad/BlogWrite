import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  const dbURL = process.env.DB_URL;
  try {
    await mongoose.connect(dbURL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed: ", error);
  }
};

