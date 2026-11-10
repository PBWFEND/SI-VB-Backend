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

/**
 * Mengambil daftar pengguna dengan filter nim.
 * TODO 1: implementasi menggunakan prisma.pengguna.findMany.
 */
export const ambilDaftarPengguna = async (nim?: string) => {
  return prisma.pengguna.findMany({
    where: nim ? { nim } : undefined,
  });
};

/**
 * Membuat pengguna baru.
 * TODO 2: implementasi menggunakan prisma.pengguna.create.
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

export const hapusPengguna = async (nim: string) => {
  return prisma.pengguna.delete({
    where: { nim },
  });
};

// ------------------------------------------------------------------
// ROUTE — kelompokkan endpoint pengguna dalam satu router.
// ------------------------------------------------------------------

const penggunaRoutes = express.Router();

penggunaRoutes.get("/", async (request: Request, response: Response) => {
  const nimRaw = request.query.nim;
  const nimFilter = typeof nimRaw === "string" ? nimRaw : undefined;
  // TODO 1: ganti pemanggilan langsung prisma di service agar
  // controller tidak menyentuh Prisma Client.
  const data = await ambilDaftarPengguna(nimFilter);
  return response.status(200).json({ success: true, message: "Daftar pengguna", data });
});

// TODO 3: tambahkan endpoint POST /pengguna (validasi + create).


// TODO 4: tambahkan endpoint DELETE /pengguna/:nim (204 bila sukses).
penggunaRoutes.delete("/:nim", async (request: Request, response: Response) => {
  const nim = request.params.nim;

  if (typeof nim !== "string" || !nim.trim()) {
    return response.status(400).json({
      success: false,
      message: "NIM tidak valid",
    });
  }

  try {
    await hapusPengguna(nim);
    return response.status(204).send();
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return response.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    return response.status(500).json({
      success: false,
      message: "Gagal menghapus pengguna",
    });
  }
});

penggunaRoutes.post("/", async (request: Request, response: Response) => {
  const { nim, nama, email, role } = request.body ?? {};
  const details: string[] = [];

  if (typeof nim !== "string" || !nim.trim()) {
    details.push("NIM wajib diisi dengan teks.");
  }

  if (typeof nama !== "string" || !nama.trim()) {
    details.push("Nama wajib diisi dengan teks.");
  }

  if (typeof email !== "string" || !email.trim()) {
    details.push("Email wajib diisi dengan teks.");
  }

  if (role !== undefined && typeof role !== "string") {
    details.push("Role harus berupa teks.");
  }

  if (details.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Validasi gagal",
      details,
    });
  }

  const data = await buatPengguna({
    nim: nim.trim(),
    nama: nama.trim(),
    email: email.trim(),
    ...(role !== undefined ? { role: role.trim() } : {}),
  });

  return response.status(201).json({
    success: true,
    message: "Pengguna berhasil dibuat",
    data,
  });
});

// ------------------------------------------------------------------
// APP — susun semuanya.
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