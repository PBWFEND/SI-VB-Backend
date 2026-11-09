/**
 * Pertemuan 7 — Latihan: Rework Resource Pengguna dengan Pola Lapis
 * Tujuan: memindahkan resource pengguna ke pola service/controller/routes
 *         seperti resource buku pada pertemuan ini.
 */

import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

// ------------------------------------------------------------------
// SERVICE — operasi data pengguna. Kumpulkan seluruh query Prisma di sini.
// ------------------------------------------------------------------

/**
 * TODO 1: Mengambil daftar pengguna dengan filter nim opsional.
 */
export const ambilDaftarPengguna = async (nim?: string) => {
  return prisma.pengguna.findMany({
    where: nim ? { nim: { contains: nim } } : {},
    orderBy: { nim: "asc" },
  });
};

/**
 * Mengambil detail pengguna berdasarkan NIM.
 */
export const ambilPenggunaByNim = async (nim: string) => {
  return prisma.pengguna.findUnique({
    where: { nim },
  });
};

/**
 * TODO 2: Membuat pengguna baru.
 * Fungsi ini murni hanya untuk operasi data (Prisma).
 */
export const buatPengguna = async (data: {
  nim: string;
  nama: string;
  email: string;
  role: string;
}) => {
  return prisma.pengguna.create({
    data: {
      nim: data.nim,
      nama: data.nama,
      email: data.email,
      // Cast as never jika `role` di schema Prisma berupa enum
      role: data.role as never, 
    },
  });
};

/**
 * Menghapus pengguna berdasarkan NIM.
 */
export const hapusPengguna = async (nim: string) => {
  return prisma.pengguna.delete({
    where: { nim },
  });
};

// ------------------------------------------------------------------
// CONTROLLER & ROUTE — kelompokkan endpoint pengguna.
// ------------------------------------------------------------------

const penggunaRoutes = express.Router();

// Helper untuk validasi (memisahkan tanggung jawab validasi dari operasi data)
const validasiInputPengguna = (body: any) => {
  const { nim, nama, email, role } = body || {};
  const errors: string[] = [];
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof nim !== "string" || nim.trim() === "") {
    errors.push("'nim' wajib diisi dan berupa string");
  }
  if (typeof nama !== "string" || nama.trim() === "") {
    errors.push("'nama' wajib diisi dan berupa string");
  }
  if (typeof email !== "string" || email.trim() === "") {
    errors.push("'email' wajib diisi dan berupa string");
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push("'email' tidak valid");
  }
  if (typeof role !== "string" || role.trim() === "") {
    errors.push("'role' wajib diisi dan berupa string");
  }

  return { errors, data: { nim, nama, email, role } };
};

/**
 * GET /pengguna
 */
penggunaRoutes.get("/", async (request: Request, response: Response) => {
  const nimRaw = request.query.nim;
  const nimFilter = typeof nimRaw === "string" ? nimRaw : undefined;
  
  // Memanggil service
  const data = await ambilDaftarPengguna(nimFilter);
  
  return response.status(200).json({ 
    success: true, 
    message: "Daftar pengguna", 
    data: { total: data.length, data } 
  });
});

/**
 * TODO 3: POST /pengguna (validasi + create).
 */
penggunaRoutes.post("/", async (request: Request, response: Response) => {
  // 1. Validasi Input
  const { errors, data } = validasiInputPengguna(request.body);
  
  if (errors.length > 0) {
    return response.status(400).json({ 
      success: false, 
      message: "Validasi gagal", 
      details: errors 
    });
  }

  // 2. Operasi Data via Service
  try {
    const created = await buatPengguna({
      nim: data.nim.trim(),
      nama: data.nama.trim(),
      email: data.email.trim(),
      role: data.role.trim(),
    });

    response.location(`/pengguna/${created.nim}`);
    return response.status(201).json({ 
      success: true, 
      message: "Pengguna berhasil ditambahkan", 
      data: created 
    });
  } catch (error) {
    const code = (error as { code?: string }).code;
    // P2002 = Prisma Error untuk Unique Constraint (NIM atau Email sudah ada)
    if (code === "P2002") {
      return response.status(400).json({ 
        success: false, 
        message: "Validasi gagal", 
        details: ["'nim' atau 'email' sudah terdaftar"] 
      });
    }
    // Tangkap error enum dari Prisma
    if (code === "P2009" || String((error as Error).message).includes("enum")) {
      return response.status(400).json({ 
        success: false, 
        message: "Validasi gagal", 
        details: ["'role' tidak valid"] 
      });
    }
    
    // Error server tak terduga
    return response.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/**
 * TODO 4: DELETE /pengguna/:nim (204 bila sukses, 404 bila tidak ada).
 */
penggunaRoutes.delete("/:nim", async (request: Request, response: Response) => {
  // Konversi ke String() untuk menghindari error TS (Express 5 params)
  const nim = String(request.params.nim);

  // 1. Cek keberadaan data via Service
  const existing = await ambilPenggunaByNim(nim);
  if (!existing) {
    return response.status(404).json({ 
      success: false, 
      message: "Pengguna tidak ditemukan" 
    });
  }

  // 2. Hapus data via Service
  await hapusPengguna(nim);

  // 3. Response 204 No Content (tanpa body)
  return response.status(204).send();
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

// Fallback 404 JSON
app.use((request: Request, response: Response) => {
  return response.status(404).json({
    success: false,
    message: `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`,
  });
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