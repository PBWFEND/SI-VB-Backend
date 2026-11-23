/**
 * Pertemuan 10 — Route endpoint terlindungi.
 */
import { Router } from "express";
import { autentikasiWajib, periksaRole } from "../middleware/auth.middleware.ts";
import { handlerDaftarPengguna, handlerProfilSaya, handlerDataStaf } from "../controller/protected.controller.ts";

const protectedRoutes = Router();

protectedRoutes.use(autentikasiWajib);

protectedRoutes.get("/me", handlerProfilSaya);

// Daftar pengguna hanya untuk dosen
protectedRoutes.get("/pengguna", periksaRole("dosen"), handlerDaftarPengguna);

// ============================================================
// LATIHAN INDIVIDU: Endpoint khusus staf
// ============================================================
protectedRoutes.get("/staf", periksaRole("staf"), handlerDataStaf);

export { protectedRoutes };