import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addEmployee,
  upload,
  getEmployee,
  updateEmployee,
  getSingleEmployee,
} from "../controllers/employess.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getEmployee);
router.get("/:id", authMiddleware, getSingleEmployee);
router.post("/add", authMiddleware, upload.single("image"), addEmployee);
router.post("/:id", authMiddleware, updateEmployee);

export default router;
