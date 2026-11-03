import { Router } from "express";

import {
  daftarAnggota,
  detailAnggota,
  tambahAnggota,
  ubahAnggota,
  hapusAnggota
} from "../controller/anggota.controller.js";

const anggotaRoutes = Router();

anggotaRoutes.get("/", daftarAnggota);

anggotaRoutes.get("/:id", detailAnggota);

anggotaRoutes.post("/", tambahAnggota);

anggotaRoutes.patch("/:id", ubahAnggota);

anggotaRoutes.delete("/:id", hapusAnggota);

export default anggotaRoutes;