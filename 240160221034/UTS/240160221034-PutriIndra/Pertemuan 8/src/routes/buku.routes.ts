
import { Router } from "express";
import {
  handlerDaftarBuku,
  handlerDetailBuku,
  handlerCreateBuku,
  handlerPatchBuku,
  handlerDeleteBuku,
} from "../controller/buku.controller.ts";

const bukuRoutes = Router();

// Route untuk daftar dan penambahan buku
bukuRoutes
  .route("/")
  .get(handlerDaftarBuku)
  .post(handlerCreateBuku);

// Route untuk detail, perubahan, dan penghapusan buku
bukuRoutes
  .route("/:id")
  .get(handlerDetailBuku)
  .patch(handlerPatchBuku)
  .delete(handlerDeleteBuku);

export { bukuRoutes };
