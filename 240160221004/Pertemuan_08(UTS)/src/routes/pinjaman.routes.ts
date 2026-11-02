import { Router } from "express";
import * as pinjamanController from "../controller/pinjaman.controller";

const router = Router();

router.get("/", pinjamanController.getList);
router.get("/:id", pinjamanController.getDetail);
router.post("/", pinjamanController.create);
router.patch("/:id/kembalikan", pinjamanController.kembalikan);
router.delete("/:id", pinjamanController.remove);

export default router;