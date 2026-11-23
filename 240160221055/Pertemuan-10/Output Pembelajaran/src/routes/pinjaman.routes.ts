
import { Router } from "express";
import {
  getPinjamanController,
  createPinjamanController,
  returnPinjamanController,
} from "../controllers/pinjaman.controller.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/auth.middleware.js";

const router = Router();

// Melihat seluruh peminjaman: khusus staf
router.get(
  "/",
  authenticateToken,
  authorizeRole("staf"),
  getPinjamanController
);

// Membuat peminjaman: pengguna dan staf
router.post(
  "/",
  authenticateToken,
  authorizeRole("pengguna", "staf"),
  createPinjamanController
);

// Memproses pengembalian: khusus staf
router.patch(
  "/:id/kembali",
  authenticateToken,
  authorizeRole("staf"),
  returnPinjamanController
);

export default router;