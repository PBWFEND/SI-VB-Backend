import { Router } from "express";
import * as bukuController from "../controller/buku.controller";

const router = Router();

// Endpoint CRUD Buku
router.get("/", bukuController.getList);
router.get("/:id", bukuController.getDetail);
router.post("/", bukuController.create);
router.patch("/:id", bukuController.update);
router.delete("/:id", bukuController.remove);

export default router;