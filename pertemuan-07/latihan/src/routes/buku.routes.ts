/**
 * Pertemuan 7 — CRUD REST API: Route Resource
 * Tujuan: mengumpulkan seluruh endpoint resource buku dalam satu router,
 *         memudahkan pemeliharaan dan perpindahan path resource.
 *
 * Cara memakai di app.ts:
 *   app.use("/buku", bukuRoutes);
 *
 * Jalankan (melalui server.ts):
 *   node --experimental-strip-types server.ts
 */


import express from "express";
import {
  getBuku,
  getBukuById,
  postBuku,
  patchBuku,
  deleteBuku,
} from "../controller/buku.controller.ts";

const bukuRoutes = express.Router();

bukuRoutes.get("/", getBuku);
bukuRoutes.get("/:id", getBukuById);
bukuRoutes.post("/", postBuku);
bukuRoutes.patch("/:id", patchBuku);
bukuRoutes.delete("/:id", deleteBuku);

export { bukuRoutes };
