import { Router } from "express";
import {
  getPengguna,
  createPenggunaController,
} from "../controllers/pengguna.controller.js";

const router = Router();

router.get("/", getPengguna);
router.post("/", createPenggunaController);

export default router;