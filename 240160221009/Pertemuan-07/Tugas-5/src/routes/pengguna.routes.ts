import { Router } from "express";

import {
  getAllPenggunaController,
  getPenggunaByNimController,
  createPenggunaController,
  updatePenggunaController,
  deletePenggunaController,
} from "../controller/pengguna.controller.ts";

const router = Router();

router.get("/", getAllPenggunaController);
router.get("/:nim", getPenggunaByNimController);
router.post("/", createPenggunaController);
router.patch("/:nim", updatePenggunaController);
router.delete("/:nim", deletePenggunaController);

export default router;