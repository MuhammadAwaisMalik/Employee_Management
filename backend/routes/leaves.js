import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addLeave, getLeave } from "../controllers/leaves.controller.js";

const router = express.Router();

router.get("/:id", authMiddleware, getLeave);
router.post("/add", authMiddleware, addLeave);

export default router;
