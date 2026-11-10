import { Router } from "express";
import * as BukuController from "../controller/buku.controller.js";

const router = Router();

router.get("/", BukuController.getAllBuku);
router.get("/:id", BukuController.getBukuById);
router.post("/", BukuController.createBuku);
router.patch("/:id", BukuController.updateBuku);
router.delete("/:id", BukuController.deleteBuku);

export default router;