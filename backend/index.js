import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import depatmentRouter from "./routes/depatment.js";
import employeeRouter from "./routes/employees.js";
import leaveRouter from "./routes/leaves.js";
import { connectDB } from "./db/db.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: "https://employee-management-5gzm.vercel.app",
    credentials: true,
  })
);

connectDB();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/department", depatmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/leave", leaveRouter);

app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:" + PORT);
});
