import { Router } from "express";
import * as pinjamanController from "../controller/pinjaman.controller";
import { authenticate, authorizeRole } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", authenticate, pinjamanController.getList);
router.get("/:id", authenticate, pinjamanController.getDetail);
router.post("/", authenticate, pinjamanController.create);
router.patch("/:id/kembalikan", authenticate, pinjamanController.kembalikan);
router.delete("/:id", authenticate, authorizeRole(["admin"]), pinjamanController.remove);
export default router;