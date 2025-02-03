import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import { connectDB } from "./db/db.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port http://localhost:" + PORT);
});
