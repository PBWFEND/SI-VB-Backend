import { Router } from "express";
import {
  getAllBuku,
  getBukuById,
  createBuku,
  updateBuku,
  deleteBuku,
} from "../controller/buku.controller.ts";

const router = Router();

router.get("/", getAllBuku);
router.get("/:id", getBukuById);
router.post("/", createBuku);
router.patch("/:id", updateBuku);
router.delete("/:id", deleteBuku);

export default router;