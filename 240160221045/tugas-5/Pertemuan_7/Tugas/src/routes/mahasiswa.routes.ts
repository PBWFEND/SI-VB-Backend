
import { Router } from "express";
import {
  getMahasiswa,
  getMahasiswaByNim,
  postMahasiswa,
  patchMahasiswa,
  deleteMahasiswa,
} from "../controller/mahasiswa.controller.ts";

const router = Router();

router.get("/", getMahasiswa);
router.get("/:nim", getMahasiswaByNim);
router.post("/", postMahasiswa);
router.patch("/:nim", patchMahasiswa);
router.delete("/:nim", deleteMahasiswa);

export default router;
