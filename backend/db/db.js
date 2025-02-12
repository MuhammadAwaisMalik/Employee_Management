import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://mawaismalik:nqopk1W6Y9coa0bC@cluster0.ob12z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`Connected to MongoDB with ${db.connection.host}`);
    return db;
  } catch (err) {
    console.error(`Error in DB Connection ${err.message}`);
    process.exit(1);
  }
};
