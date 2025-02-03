import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB with ${db.connection.host}`);
    return db;
  } catch (err) {
    console.error(`Error in DB Connection ${err.message}`);
    process.exit(1);
  }
};
