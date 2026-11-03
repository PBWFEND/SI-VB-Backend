
import { Router } from "express";
import {
  handlerDaftarBuku,
  handlerDetailBuku,
  handlerCreateBuku,
  handlerPatchBuku,
  handlerDeleteBuku,
} from "../controller/buku.controller.ts";

const bukuRoutes = Router();

// Menampilkan semua buku
bukuRoutes.get("/", handlerDaftarBuku);

// Menampilkan detail buku berdasarkan ID
bukuRoutes.get("/:id", handlerDetailBuku);

// Menambahkan buku baru
bukuRoutes.post("/", handlerCreateBuku);

// Mengubah sebagian data buku
bukuRoutes.patch("/:id", handlerPatchBuku);

// Menghapus buku
bukuRoutes.delete("/:id", handlerDeleteBuku);

export { bukuRoutes };
