import { Router } from "express";
import {
  getBuku,
  getBukuByIdController,
  createBukuController,
  updateBukuController,
  deleteBukuController,
} from "../controllers/buku.controller.js";

const router = Router();

router.get("/", getBuku);
router.get("/:id", getBukuByIdController);
router.post("/", createBukuController);
router.patch("/:id", updateBukuController);
router.delete("/:id", deleteBukuController);

export default router;