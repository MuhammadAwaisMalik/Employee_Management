import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addDepartment,
  deleteDepartment,
  getDepartment,
  getSingleDepartment,
  updateDepartment,
} from "../controllers/department.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getDepartment);
router.get("/:id", authMiddleware, getSingleDepartment);
router.post("/add", authMiddleware, addDepartment);
router.post("/:id", authMiddleware, updateDepartment);
router.delete("/:id", authMiddleware, deleteDepartment);

export default router;
