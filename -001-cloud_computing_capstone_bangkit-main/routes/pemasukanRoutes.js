import express from "express";
import {
  getAllPemasukan,
  getPemasukanById,
} from "../controllers/pemasukanController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllPemasukan);
router.get("/:id", verifyToken, getPemasukanById);

export default router;
