import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());

app.listen(PORT, () => {
  console.log("server is running on port http://localhost:" + PORT);
});
