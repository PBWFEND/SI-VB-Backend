import { Router } from "express";
import { handlerBuatBuku, handlerDaftarBuku } from "../controller/buku.controller.ts";
import { validasiQueryBuku } from "../middleware/validation.middleware.ts";

const bukuRoutes = Router();

bukuRoutes.get("/", validasiQueryBuku, handlerDaftarBuku);
bukuRoutes.post("/", handlerBuatBuku);

export { bukuRoutes };