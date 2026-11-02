import { Router } from "express";

import {
  getSemuaAnggota,
  getAnggotaById,
  postAnggota,
  patchAnggota,
  deleteAnggota,
} from "../controller/anggota.controller.ts";

const router = Router();

// GET /anggota
router.get("/", getSemuaAnggota);

// GET /anggota/:id
router.get("/:id", getAnggotaById);

// POST /anggota
router.post("/", postAnggota);

// PATCH /anggota/:id
router.patch("/:id", patchAnggota);

// DELETE /anggota/:id
router.delete("/:id", deleteAnggota);

export default router;