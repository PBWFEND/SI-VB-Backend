/**
 * Pertemuan 10 — Route authentication.
 */
import { Router } from "express";
import { handlerLogin, handlerRegister } from "../controller/auth.controller.ts";

const authRoutes = Router();

authRoutes.post("/register", handlerRegister);
authRoutes.post("/login", handlerLogin);

export { authRoutes };