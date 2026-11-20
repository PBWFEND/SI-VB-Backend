/**
 * Pertemuan 6 — Latihan Individu
 * REST API Pengguna menggunakan Prisma dan Express.js
 */

import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

// Response berhasil
const sendSuccess = (
  response: Response,
  statusCode: number,
  message: string,
  data: unknown,
) => {
  return response.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Response error
const sendError = (response: Response, statusCode: number, message: string) => {
  return response.status(statusCode).json({
    success: false,
    message,
  });
};

// Middleware logger
app.use((request: Request, _response: Response, next) => {
  console.log(`${request.method} ${request.originalUrl}`);
  next();
});

// GET semua pengguna
app.get("/pengguna", async (_request: Request, response: Response) => {
  try {
    const data = await prisma.pengguna.findMany({
      orderBy: { nim: "asc" },
    });

    return sendSuccess(response, 200, "Data pengguna berhasil diambil", {
      total: data.length,
      data,
    });
  } catch (error) {
    console.error(error);
    return sendError(response, 500, "Gagal mengambil data pengguna");
  }
});

// GET pengguna berdasarkan NIM
app.get("/pengguna/:nim", async (request: Request, response: Response) => {
  try {
    const data = await prisma.pengguna.findUnique({
      where: { nim: String(request.params.nim) },
    });

    if (!data) {
      return sendError(response, 404, "Pengguna tidak ditemukan");
    }

    return sendSuccess(response, 200, "Data pengguna berhasil ditemukan", data);
  } catch (error) {
    console.error(error);
    return sendError(response, 500, "Gagal mengambil data pengguna");
  }
});

// POST menambahkan pengguna
app.post("/pengguna", async (request: Request, response: Response) => {
  try {
    const { nim, nama, email, role } = request.body ?? {};

    // Validasi field wajib
    if (
      typeof nim !== "string" ||
      !nim.trim() ||
      typeof nama !== "string" ||
      !nama.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof role !== "string" ||
      !role.trim()
    ) {
      return sendError(response, 400, "NIM, nama, email, dan role wajib diisi");
    }

    // Validasi format email
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!emailValid) {
      return sendError(response, 400, "Format email tidak valid");
    }

    const data = await prisma.pengguna.create({
      data: {
        nim: nim.trim(),
        nama: nama.trim(),
        email: email.trim(),
        role: role.trim(),
      },
    });

    return sendSuccess(response, 201, "Pengguna berhasil ditambahkan", data);
  } catch (error: any) {
    if (error.code === "P2002") {
      return sendError(response, 400, "NIM atau email sudah terdaftar");
    }

    console.error(error);
    return sendError(response, 500, "Gagal menambahkan pengguna");
  }
});

// PATCH mengubah sebagian data pengguna
app.patch("/pengguna/:nim", async (request: Request, response: Response) => {
  try {
    const nim = String(request.params.nim);
    const { nama, email, role } = request.body ?? {};

    const fieldDikirim = Object.keys(request.body ?? {});
    const fieldDiizinkan = ["nama", "email", "role"];

    if (
      fieldDikirim.length === 0 ||
      fieldDikirim.some((field) => !fieldDiizinkan.includes(field))
    ) {
      return sendError(
        response,
        400,
        "Kirim minimal satu field: nama, email, atau role",
      );
    }

    if (nama !== undefined && (typeof nama !== "string" || !nama.trim())) {
      return sendError(response, 400, "Nama tidak boleh kosong");
    }

    if (
      email !== undefined &&
      (typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    ) {
      return sendError(response, 400, "Format email tidak valid");
    }

    if (role !== undefined && (typeof role !== "string" || !role.trim())) {
      return sendError(response, 400, "Role tidak boleh kosong");
    }

    const data = await prisma.pengguna.update({
      where: { nim },
      data: {
        ...(nama !== undefined && { nama: nama.trim() }),
        ...(email !== undefined && { email: email.trim() }),
        ...(role !== undefined && { role: role.trim() }),
      },
    });

    return sendSuccess(
      response,
      200,
      "Data pengguna berhasil diperbarui",
      data,
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      return sendError(response, 404, "Pengguna tidak ditemukan");
    }

    if (error.code === "P2002") {
      return sendError(response, 400, "Email sudah digunakan");
    }

    console.error(error);
    return sendError(response, 500, "Gagal memperbarui data pengguna");
  }
});

// DELETE menghapus pengguna
app.delete("/pengguna/:nim", async (request: Request, response: Response) => {
  try {
    await prisma.pengguna.delete({
      where: { nim: String(request.params.nim) },
    });

    return response.status(204).end();
  } catch (error: any) {
    if (error.code === "P2025") {
      return sendError(response, 404, "Pengguna tidak ditemukan");
    }

    console.error(error);
    return sendError(response, 500, "Gagal menghapus pengguna");
  }
});

// Endpoint tidak ditemukan
app.use((_request: Request, response: Response) => {
  return sendError(response, 404, "Endpoint tidak ditemukan");
});

// Menjalankan server
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
