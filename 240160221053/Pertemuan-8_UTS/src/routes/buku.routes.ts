import { Router } from "express";
import {
  handlerDaftarBuku,
  handlerDetailBuku,
  handlerCreateBuku,
  handlerPatchBuku,
  handlerDeleteBuku,
} from "../controller/buku.controller.ts";

const bukuRoutes = Router();

bukuRoutes.get("/", handlerDaftarBuku);
bukuRoutes.get("/:id", handlerDetailBuku);
bukuRoutes.post("/", handlerCreateBuku);
bukuRoutes.patch("/:id", handlerPatchBuku);
bukuRoutes.delete("/:id", handlerDeleteBuku);

export { bukuRoutes };