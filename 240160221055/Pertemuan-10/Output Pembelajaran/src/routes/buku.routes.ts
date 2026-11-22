
import { Router } from "express";
import {
  getBuku,
  getBukuByIdController,
  createBukuController,
  updateBukuController,
  deleteBukuController,
} from "../controllers/buku.controller.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/auth.middleware.js";

const router = Router();

// Melihat buku: pengguna dan staf
router.get(
  "/",
  authenticateToken,
  authorizeRole("pengguna", "staf"),
  getBuku
);

router.get(
  "/:id",
  authenticateToken,
  authorizeRole("pengguna", "staf"),
  getBukuByIdController
);

// Mengelola buku: khusus staf
router.post(
  "/",
  authenticateToken,
  authorizeRole("staf"),
  createBukuController
);

router.patch(
  "/:id",
  authenticateToken,
  authorizeRole("staf"),
  updateBukuController
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("staf"),
  deleteBukuController
);

export default router;