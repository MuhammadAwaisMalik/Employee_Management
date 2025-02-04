import express from "express";
import { Login, verify } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", Login);
router.get("/verify", authMiddleware, verify);

export default router;
