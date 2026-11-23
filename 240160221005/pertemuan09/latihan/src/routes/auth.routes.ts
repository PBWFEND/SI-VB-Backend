/**
 * Pertemuan 9 — Route authentication.
 * Tujuan: memasangkan endpoint auth dengan handler controller.
 */

import { Router } from "express";
import { handlerLogin, handlerRegister } from "../controller/auth.controller.ts";

const authRoutes = Router();

authRoutes.post("/register", handlerRegister);
authRoutes.post("/login", handlerLogin);

export { authRoutes };