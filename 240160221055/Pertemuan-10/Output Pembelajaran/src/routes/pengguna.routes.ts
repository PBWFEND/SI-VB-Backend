
import { Router } from "express";
import { getPengguna } from "../controllers/pengguna.controller.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/auth.middleware.js";

const router = Router();

// Melihat seluruh data pengguna: khusus staf
router.get(
  "/",
  authenticateToken,
  authorizeRole("staf"),
  getPengguna
);

export default router;