/**
 * Pertemuan 6 — latihan resource Pengguna dengan Prisma
 * Tujuan: menerapkan operasi create, update, dan delete pada model pengguna.
 * Jalankan: npx prisma migrate dev --name pengguna lalu node --experimental-strip-types latihan.ts
 */

import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

const sendSuccess = (response: Response, statusCode: number, message: string, data: unknown) => {
  return response.status(statusCode).json({ success: true, message, data });
};

const sendError = (response: Response, statusCode: number, message: string, details?: unknown) => {
  return response.status(statusCode).json({ success: false, message, ...(details && { details }) });
};

// Middleware logger sederhana
app.use((request: Request, _response: Response, next: () => void) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

// GET /pengguna — membaca seluruh data pengguna
app.get("/pengguna", async (_request: Request, response: Response) => {
  const data = await prisma.pengguna.findMany({ orderBy: { nim: "asc" } });
  return sendSuccess(response, 200, "Data pengguna berhasil diambil", { total: data.length, data });
});

// TODO 1: tambahkan endpoint GET /pengguna/:nim dengan status 404 jika tidak ditemukan.
app.get("/pengguna/:nim", async (request: Request, response: Response) => {
  const nim = request.params.nim;
  const item = await prisma.pengguna.findUnique({
    where: { nim },
  });

  if (!item) {
    return sendError(response, 404, "Pengguna tidak ditemukan");
  }

  return sendSuccess(response, 200, "Detail pengguna berhasil diambil", item);
});

// TODO 2: tambahkan endpoint POST /pengguna dengan validasi nim, nama, email, dan role.
app.post("/pengguna", async (request: Request, response: Response) => {
  const { nim, nama, email, role } = request.body as {
    nim?: string;
    nama?: string;
    email?: string;
    role?: string;
  };

  const errors: string[] = [];
  if (!nim || typeof nim !== "string" || nim.trim() === "") errors.push("Field nim wajib diisi");
  if (!nama || typeof nama !== "string" || nama.trim() === "") errors.push("Field nama wajib diisi");
  if (!email || typeof email !== "string" || email.trim() === "") errors.push("Field email wajib diisi");
  if (!role || typeof role !== "string" || role.trim() === "") errors.push("Field role wajib diisi");

  if (errors.length > 0) {
    return sendError(response, 400, "Data pengguna tidak valid", errors);
  }

  // Cek duplikasi NIM dan email
  const existingNim = await prisma.pengguna.findUnique({ where: { nim: nim.trim() } });
  if (existingNim) {
    return sendError(response, 400, `NIM ${nim} sudah terdaftar`);
  }

  const existingEmail = await prisma.pengguna.findUnique({ where: { email: email.trim() } });
  if (existingEmail) {
    return sendError(response, 400, `Email ${email} sudah terdaftar`);
  }

  const baru = await prisma.pengguna.create({
    data: {
      nim: nim.trim(),
      nama: nama.trim(),
      email: email.trim(),
      role: role.trim(),
    },
  });

  return sendSuccess(response, 201, "Pengguna berhasil dibuat", baru);
});

// TODO 3: tambahkan endpoint PATCH /pengguna/:nim untuk mengubah nama, email, atau role.
app.patch("/pengguna/:nim", async (request: Request, response: Response) => {
  const nim = request.params.nim;
  const item = await prisma.pengguna.findUnique({ where: { nim } });

  if (!item) {
    return sendError(response, 404, "Pengguna tidak ditemukan");
  }

  const { nama, email, role } = request.body as {
    nama?: string;
    email?: string;
    role?: string;
  };

  const errors: string[] = [];
  if (nama !== undefined && (typeof nama !== "string" || nama.trim() === "")) {
    errors.push("Field nama harus berupa string tidak kosong");
  }
  if (email !== undefined && (typeof email !== "string" || email.trim() === "")) {
    errors.push("Field email harus berupa string tidak kosong");
  }
  if (role !== undefined && (typeof role !== "string" || role.trim() === "")) {
    errors.push("Field role harus berupa string tidak kosong");
  }

  if (errors.length > 0) {
    return sendError(response, 400, "Data perubahan tidak valid", errors);
  }

  if (nama === undefined && email === undefined && role === undefined) {
    return sendError(response, 400, "Minimal satu field (nama, email, role) harus disertakan untuk perubahan");
  }

  // Jika mengubah email, pastikan email baru belum terpakai oleh pengguna lain
  if (email !== undefined && email.trim() !== item.email) {
    const existingEmail = await prisma.pengguna.findUnique({ where: { email: email.trim() } });
    if (existingEmail) {
      return sendError(response, 400, `Email ${email} sudah digunakan pengguna lain`);
    }
  }

  const diperbarui = await prisma.pengguna.update({
    where: { nim },
    data: {
      ...(nama !== undefined && { nama: nama.trim() }),
      ...(email !== undefined && { email: email.trim() }),
      ...(role !== undefined && { role: role.trim() }),
    },
  });

  return sendSuccess(response, 200, "Pengguna berhasil diperbarui", diperbarui);
});

// TODO 4: tambahkan endpoint DELETE /pengguna/:nim dengan response 204.
app.delete("/pengguna/:nim", async (request: Request, response: Response) => {
  const nim = request.params.nim;
  const item = await prisma.pengguna.findUnique({ where: { nim } });

  if (!item) {
    return sendError(response, 404, "Pengguna tidak ditemukan");
  }

  await prisma.pengguna.delete({ where: { nim } });

  return response.status(204).send();
});

// Middleware 404
app.use((_request: Request, response: Response) => {
  return sendError(response, 404, "Endpoint tidak ditemukan");
});

// Middleware Error handler
app.use((error: Error, _request: Request, response: Response, _next: () => void) => {
  console.error("Kesalahan aplikasi:", error.message);
  return sendError(response, 500, "Terjadi kesalahan pada server");
});

const port = Number(process.env.PORT_LATIHAN ?? 3009);

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(port, () => {
  console.log(`Latihan Database API berjalan di http://localhost:${port}`);
});
