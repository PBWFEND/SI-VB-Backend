import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";
import { getPinjamanController } from "../controllers/pinjaman.controller.js";

const router = Router();

// Endpoint khusus staf
router.get(
  "/pinjaman",
  authenticateToken,
  authorizeRole("staf"),
  getPinjamanController
);

export default router;
