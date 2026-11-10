import { Router } from "express";
import {
  getPinjamanController,
  createPinjamanController,
  returnPinjamanController,
} from "../controllers/pinjaman.controller.js";

const router = Router();

router.get("/", getPinjamanController);
router.post("/", createPinjamanController);
router.patch("/:id/kembali", returnPinjamanController);

export default router;