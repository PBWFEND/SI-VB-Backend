
import { Router } from "express";
import {
  getSemuaMahasiswa,
  getMahasiswaByNim,
  postMahasiswa,
  patchMahasiswa,
  deleteMahasiswa,
} from "../controller/Mahasiswa.controller.ts";

const router = Router();

// GET semua mahasiswa
router.get("/", getSemuaMahasiswa);

// GET mahasiswa berdasarkan NIM
router.get("/:nim", getMahasiswaByNim);

// POST tambah mahasiswa
router.post("/", postMahasiswa);

// PATCH ubah mahasiswa
router.patch("/:nim", patchMahasiswa);

// DELETE mahasiswa
router.delete("/:nim", deleteMahasiswa);

export default router;
