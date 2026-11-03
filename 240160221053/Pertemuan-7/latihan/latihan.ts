/**
 * Pertemuan 7 — Latihan: Rework Resource Pengguna dengan Pola Lapis
 * Solusi Lengkap TODO 1 - TODO 4
 *
 * Jalankan:
 *   npx prisma migrate dev --name pengguna
 *   node --experimental-strip-types latihan.ts
 */

import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

// ------------------------------------------------------------------
// SERVICE — operasi data pengguna
// ------------------------------------------------------------------

/**
 * TODO 1: ambil daftar pengguna dengan filter nim opsional.
 * ✅ SUDAH DIPERBAIKI — parameter nim dipakai untuk filter.
 */
export const ambilDaftarPengguna = async (nim?: string) => {
  return prisma.pengguna.findMany({
    where: nim ? { nim: nim } : undefined,
  });
};

/**
 * TODO 2: buat pengguna baru.
 * ✅ SUDAH DIPERBAIKI — pakai prisma.pengguna.create.
 */
export const buatPengguna = async (data: {
  nim: string;
  nama: string;
  email: string;
  role?: string;
}) => {
  return prisma.pengguna.create({
    data: {
      nim: data.nim,
      nama: data.nama,
      email: data.email,
      role: data.role ?? "mahasiswa",
    },
  });
};

// ------------------------------------------------------------------
// ROUTE — endpoint pengguna
// ------------------------------------------------------------------

const penggunaRoutes = express.Router();

// GET /pengguna (dengan filter ?nim=... opsional)
penggunaRoutes.get("/", async (request: Request, response: Response) => {
  const nimRaw = request.query.nim;
  const nimFilter = typeof nimRaw === "string" ? nimRaw : undefined;

  const data = await ambilDaftarPengguna(nimFilter);
  return response
    .status(200)
    .json({ success: true, message: "Daftar pengguna", data });
});

// TODO 3: POST /pengguna (validasi + create)
penggunaRoutes.post("/", async (request: Request, response: Response) => {
  const { nim, nama, email, role } = request.body;

  // Validasi input
  if (
    typeof nim !== "string" ||
    typeof nama !== "string" ||
    typeof email !== "string"
  ) {
    return response.status(400).json({
      success: false,
      message: "Validasi gagal: nim, nama, dan email harus berupa string.",
    });
  }

  try {
    const penggunaBaru = await buatPengguna({ nim, nama, email, role });
    return response.status(201).json({
      success: true,
      message: "Pengguna berhasil dibuat",
      data: penggunaBaru,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return response
        .status(400)
        .json({ success: false, message: "NIM atau Email sudah terdaftar." });
    }
    return response
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server." });
  }
});

// TODO 4: DELETE /pengguna/:nim
penggunaRoutes.delete("/:nim", async (request: Request, response: Response) => {
  const { nim } = request.params;

  try {
    const existing = await prisma.pengguna.findUnique({ where: { nim } });

    if (!existing) {
      return response.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    await prisma.pengguna.delete({ where: { nim } });

    // 204 No Content
    return response.status(204).send();
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: "Gagal menghapus pengguna." });
  }
});

// ------------------------------------------------------------------
// APP
// ------------------------------------------------------------------

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.get("/", (_request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: "API Latihan Pengguna — Pertemuan 7",
    data: { resource: "pengguna" },
  });
});

app.use("/pengguna", penggunaRoutes);

const port = Number(process.env.PORT_LATIHAN ?? 3009);

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(port, () => {
  console.log(`API Latihan Pengguna berjalan di http://localhost:${port}`);
});