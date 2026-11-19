/**
 * Pertemuan 10 — Controller endpoint terlindungi.
 */
import type { RequestHandler } from "express";
import type { RequestTerautentikasi } from "../middleware/auth.middleware.ts";
import { prisma } from "../../client.ts";

export const handlerProfilSaya: RequestHandler = async (request, response) => {
  const klaim = (request as RequestTerautentikasi).klaim;
  if (!klaim) {
    response.status(401).json({ success: false, message: "Token tidak ditemukan" });
    return;
  }

  const pengguna = await prisma.pengguna.findUnique({
    where: { id: klaim.sub },
    select: { id: true, nama: true, email: true, role: true, createdAt: true },
  });
  if (!pengguna) {
    response.status(404).json({ success: false, message: "Pengguna tidak ditemukan" });
    return;
  }

  response.status(200).json({ success: true, message: "Profil berhasil diambil", data: pengguna });
};

export const handlerDaftarPengguna: RequestHandler = async (_request, response) => {
  const pengguna = await prisma.pengguna.findMany({
    select: { id: true, nama: true, email: true, role: true },
    orderBy: { id: "asc" },
  });
  response.status(200).json({ success: true, message: "Daftar pengguna berhasil diambil", data: pengguna });
};

// ============================================================
// LATIHAN INDIVIDU: Handler untuk role staf
// ============================================================
/** Mengambil data khusus staf. Hanya role 'staf' yang dapat mengakses. */
export const handlerDataStaf: RequestHandler = async (_request, response) => {
  response.status(200).json({
    success: true,
    message: "Data internal staf berhasil diambil",
    data: {
      laporanHarian: "Sistem berjalan normal",
      jumlahPenggunaAktif: 42,
      aksesFitur: ["laporan", "manajemen-user"],
    },
  });
};