import mongoose from "mongoose";

export const CONNECT_MONGO = async () => {
  const MONGODB_URL = process.env.MONGODB_URL;
  if (!MONGODB_URL) {
    console.log("MONGO_URL not found.");
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGODB_URL);
    console.info("MONGODB connected successfully.");
  } catch (err) {
    console.log("Failed to connect MONGODB : ", err);
    process.exit(1);
  }
};
