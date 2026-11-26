/**
 * Pertemuan 12 — Route resource buku.
 */

import { Router } from "express";
import {
  handlerBuatBuku,
  handlerDaftarBuku,
  handlerDetailBuku,
} from "../controller/buku.controller.ts";

const bukuRoutes = Router();

bukuRoutes.get("/", handlerDaftarBuku);
bukuRoutes.get("/:id", handlerDetailBuku); // Latihan No.1 -> NOT_FOUND
bukuRoutes.post("/", handlerBuatBuku);

export { bukuRoutes };