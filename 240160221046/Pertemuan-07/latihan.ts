/**
 * Pertemuan 7 — Latihan: Rework Resource Pengguna dengan Pola Lapis
 * Tujuan: memindahkan resource pengguna ke pola service/controller/routes
 *         seperti resource buku pada pertemuan ini.
 *
 * Struktur target (bandingkan dengan resource buku):
 *   src/routes/pengguna.routes.ts
 *     └── src/controller/pengguna.controller.ts
 *           └── src/service/pengguna.service.ts
 *
 * Jalankan:
 *   npx prisma migrate dev --name pengguna
 *   node --experimental-strip-types latihan.ts
 *
 * Catatan: file ini berisi kerangka service dan route resource pengguna
 * yang masih datar. Kerjakan TODO agar resource pengguna mengikuti pola
 * lapis yang sama dengan resource buku.
 */

import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

// ------------------------------------------------------------------
// SERVICE — operasi data pengguna. Kumpulkan seluruh query Prisma di sini.
// ------------------------------------------------------------------

export type DataPengguna = {
  nim: string;
  nama: string;
  email: string;
  role?: string;
};

/**
 * Mengambil daftar pengguna dengan filter nim opsional.
 * TODO 1: implementasi menggunakan prisma.pengguna.findMany.
 */
export const ambilDaftarPengguna = async (nim?: string) => {
  return prisma.pengguna.findMany({
    where: {
      ...(nim !== undefined && { nim }),
    },
    orderBy: { nim: "asc" },
  });
};

/**
 * Mengambil satu pengguna berdasarkan NIM.
 */
export const ambilPengguna = async (nim: string) => {
  return prisma.pengguna.findUnique({
    where: { nim },
  });
};

/**
 * Membuat pengguna baru.
 * TODO 2: implementasi menggunakan prisma.pengguna.create.
 * Validasi dipisahkan di layer controller/handler.
 */
export const buatPengguna = async (data: DataPengguna) => {
  return prisma.pengguna.create({
    data: {
      nim: data.nim,
      nama: data.nama,
      email: data.email,
      role: data.role ?? "mahasiswa",
    },
  });
};

/**
 * Menghapus pengguna berdasarkan NIM.
 * TODO 4: operasi data untuk menghapus pengguna.
 */
export const hapusPengguna = async (nim: string) => {
  return prisma.pengguna.delete({
    where: { nim },
  });
};

// ------------------------------------------------------------------
// VALIDATOR — memisahkan tanggung jawab validasi dari operasi data (TODO 2)
// ------------------------------------------------------------------

/**
 * Validasi data pengguna sebelum diproses oleh service.
 */
export const validasiPengguna = (body: Record<string, unknown>): string[] => {
  const errors: string[] = [];
  const { nim, nama, email, role } = body;

  if (typeof nim !== "string" || nim.trim() === "") {
    errors.push("Field nim wajib diisi");
  }
  if (typeof nama !== "string" || nama.trim() === "") {
    errors.push("Field nama wajib diisi");
  }
  if (typeof email !== "string" || email.trim() === "") {
    errors.push("Field email wajib diisi");
  }
  if (role !== undefined && (typeof role !== "string" || role.trim() === "")) {
    errors.push("Field role, bila dikirim, wajib berupa string tidak kosong");
  }

  return errors;
};

// ------------------------------------------------------------------
// ROUTE — kelompokkan endpoint pengguna dalam satu router.
// ------------------------------------------------------------------

const penggunaRoutes = express.Router();

// GET /pengguna — daftar pengguna (TODO 1)
penggunaRoutes.get("/", async (request: Request, response: Response) => {
  const nimRaw = request.query.nim;
  const nimFilter = typeof nimRaw === "string" ? nimRaw : undefined;
  const data = await ambilDaftarPengguna(nimFilter);
  return response.status(200).json({ success: true, message: "Daftar pengguna", data });
});

// GET /pengguna/:nim — detail satu pengguna
penggunaRoutes.get("/:nim", async (request: Request, response: Response) => {
  const nim = request.params.nim;
  const item = await ambilPengguna(nim);
  if (!item) {
    return response.status(404).json({ success: false, message: "Pengguna tidak ditemukan" });
  }
  return response.status(200).json({ success: true, message: "Detail pengguna", data: item });
});

// POST /pengguna — tambah pengguna baru (TODO 3)
penggunaRoutes.post("/", async (request: Request, response: Response) => {
  const body = (request.body ?? {}) as Record<string, unknown>;
  const errors = validasiPengguna(body);

  if (errors.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Data pengguna tidak valid",
      details: errors,
    });
  }

  const nim = (body.nim as string).trim();
  const nama = (body.nama as string).trim();
  const email = (body.email as string).trim();
  const role = typeof body.role === "string" && body.role.trim() !== "" ? body.role.trim() : "mahasiswa";

  // Cek duplikasi NIM
  const nimAda = await ambilPengguna(nim);
  if (nimAda) {
    return response.status(400).json({
      success: false,
      message: `NIM ${nim} sudah terdaftar`,
    });
  }

  // Cek duplikasi email
  const emailAda = await prisma.pengguna.findUnique({ where: { email } });
  if (emailAda) {
    return response.status(400).json({
      success: false,
      message: `Email ${email} sudah terdaftar`,
    });
  }

  const baru = await buatPengguna({ nim, nama, email, role });
  return response.status(201).json({
    success: true,
    message: "Pengguna berhasil dibuat",
    data: baru,
  });
});

// DELETE /pengguna/:nim — hapus pengguna (TODO 4)
penggunaRoutes.delete("/:nim", async (request: Request, response: Response) => {
  const nimRaw = request.params.nim;
  const nim = typeof nimRaw === "string" ? nimRaw : undefined;

  if (!nim) {
    return response.status(400).json({
      success: false,
      message: "Parameter nim tidak valid",
    });
  }

  const ada = await ambilPengguna(nim);
  if (!ada) {
    return response.status(404).json({
      success: false,
      message: "Pengguna tidak ditemukan",
    });
  }

  await hapusPengguna(nim);
  return response.status(204).send();
});

// ------------------------------------------------------------------
// APP — susun semuanya.
// ------------------------------------------------------------------

const app = express();
app.disable("x-powered-by");
app.use(express.json());

// Logger middleware
app.use((request: Request, _response: Response, next: () => void) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

app.get("/", (_request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: "API Latihan Pengguna — Pertemuan 7",
    data: { resource: "pengguna" },
  });
});

app.use("/pengguna", penggunaRoutes);

// 404 handler
app.use((_request: Request, response: Response) => {
  response.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

// Error handler
app.use((error: Error, _request: Request, response: Response, _next: () => void) => {
  console.error("Kesalahan aplikasi:", error.message);
  response.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
});

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
