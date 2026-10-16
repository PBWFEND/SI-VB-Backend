import { Router } from "express";
import {
  handlerDaftarPengguna,
  handlerDetailPengguna,
  handlerCreatePengguna,
  handlerPatchPengguna,
  handlerDeletePengguna,
} from "../controller/pengguna.controller.ts";

const penggunaRoutes = Router();

penggunaRoutes.get("/", handlerDaftarPengguna);
penggunaRoutes.get("/:nim", handlerDetailPengguna);
penggunaRoutes.post("/", handlerCreatePengguna);
penggunaRoutes.patch("/:nim", handlerPatchPengguna);
penggunaRoutes.delete("/:nim", handlerDeletePengguna);

export { penggunaRoutes };