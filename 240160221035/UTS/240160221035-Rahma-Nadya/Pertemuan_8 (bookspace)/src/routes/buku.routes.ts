import { Router } from "express";
import * as bukuController from "../controller/buku.controller";

const router = Router();

router.get("/", bukuController.getAllBuku);
router.get("/:id", bukuController.getBukuById);
router.post("/", bukuController.createBuku);
router.put("/:id", bukuController.updateBuku);
router.delete("/:id", bukuController.deleteBuku);

export default router;