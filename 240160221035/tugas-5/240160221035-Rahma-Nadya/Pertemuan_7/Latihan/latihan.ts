/**
 * Pertemuan 7 — Latihan: Rework Resource Pengguna
 * Tujuan: mengimplementasikan operasi CRUD pengguna.
 */

import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

// ------------------------------------------------------------------
// SERVICE — operasi data pengguna.
// ------------------------------------------------------------------

// TODO 1: mengambil daftar pengguna
export const ambilDaftarPengguna = async (nim?: string) => {
  return prisma.pengguna.findMany({
    where: nim ? { nim } : undefined,
  });
};

// TODO 2: membuat pengguna baru
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
      role: data.role,
    },
  });
};

// Menghapus pengguna berdasarkan NIM
export const hapusPengguna = async (nim: string) => {
  return prisma.pengguna.delete({
    where: { nim },
  });
};

// ------------------------------------------------------------------
// ROUTE — kelompokkan endpoint pengguna dalam satu router.
// ------------------------------------------------------------------

const penggunaRoutes = express.Router();

// GET /pengguna
penggunaRoutes.get("/", async (request: Request, response: Response) => {
  try {
    const nimRaw = request.query.nim;
    const nimFilter = typeof nimRaw === "string" ? nimRaw : undefined;

    const data = await ambilDaftarPengguna(nimFilter);

    return response.status(200).json({
      success: true,
      message: "Daftar pengguna",
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Gagal mengambil daftar pengguna",
    });
  }
});

// TODO 3: POST /pengguna
penggunaRoutes.post("/", async (request: Request, response: Response) => {
  const { nim, nama, email, role } = request.body;

  // Validasi data
  if (
    typeof nim !== "string" ||
    nim.trim() === "" ||
    typeof nama !== "string" ||
    nama.trim() === "" ||
    typeof email !== "string" ||
    email.trim() === "" ||
    (role !== undefined && typeof role !== "string")
  ) {
    return response.status(400).json({
      success: false,
      message: "Data pengguna tidak valid",
    });
  }

  try {
    const pengguna = await buatPengguna({
      nim,
      nama,
      email,
      role,
    });

    return response.status(201).json({
      success: true,
      message: "Pengguna berhasil ditambahkan",
      data: pengguna,
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: "Gagal menambahkan pengguna. NIM atau email mungkin sudah digunakan.",
    });
  }
});

// TODO 4: DELETE /pengguna/:nim
penggunaRoutes.delete("/:nim", async (request: Request, response: Response) => {
  const nim = request.params.nim;

  if (typeof nim !== "string") {
    return response.status(400).json({
      success: false,
      message: "NIM tidak valid",
    });
  }

  try {
    await hapusPengguna(nim);
    return response.status(204).send();
  } catch (error) {
    return response.status(404).json({
      success: false,
      message: "Pengguna tidak ditemukan",
    });
  }
});

// ------------------------------------------------------------------
// APP — susun semuanya.
// ------------------------------------------------------------------

const app = express();

app.disable("x-powered-by");
app.use(express.json());

// GET /
app.get("/", (_request: Request, response: Response) => {
  return response.status(200).json({
    success: true,
    message: "API Latihan Pengguna — Pertemuan 7",
    data: { resource: "pengguna" },
  });
});

// Daftarkan route pengguna
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