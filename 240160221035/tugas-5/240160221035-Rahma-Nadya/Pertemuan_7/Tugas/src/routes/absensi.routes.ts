import { Router } from "express";

import {
  getSemuaAbsensi,
  getAbsensiById,
  postAbsensi,
  putAbsensi,
  patchAbsensi,
  deleteAbsensi,
} from "../controller/absensi.controller.ts";

const router = Router();

// GET /absensi
router.get("/", getSemuaAbsensi);

// GET /absensi/:id
router.get("/:id", getAbsensiById);

// POST /absensi
router.post("/", postAbsensi);

// PUT /absensi/:id
router.put("/:id", putAbsensi);

// PATCH /absensi/:id
router.patch("/:id", patchAbsensi);

// DELETE /absensi/:id
router.delete("/:id", deleteAbsensi);

export default router;