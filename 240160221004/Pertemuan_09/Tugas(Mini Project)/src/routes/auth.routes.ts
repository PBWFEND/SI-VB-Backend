import { Router } from "express";
import * as authController from "../controller/auth.controller";

const router = Router();

// Endpoint untuk Registrasi & Login
router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;