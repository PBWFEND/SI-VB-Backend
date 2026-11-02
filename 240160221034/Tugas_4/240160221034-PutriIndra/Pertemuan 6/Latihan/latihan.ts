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

const sendError = (
  response: Response,
  statusCode: number,
  message: string,
  details?: unknown
) => {
  return response.status(statusCode).json({
    success: false,
    message,
    ...(details !== undefined ? { details } : {}),
  });
};

app.get("/pengguna", async (_request: Request, response: Response) => {
  const data = await prisma.pengguna.findMany({ orderBy: { nim: "asc" } });
  return sendSuccess(response, 200, "Data pengguna berhasil diambil", { total: data.length, data });
});

// TODO 1: tambahkan endpoint GET /pengguna/:nim dengan status 404 jika tidak ditemukan.
app.get("/pengguna/:nim", async (request: Request, response: Response) => {
  const { nim } = request.params;

  const data = await prisma.pengguna.findUnique({
  where: { nim: String(nim) },
});

  if (!data) {
    return sendError(response, 404, "Data pengguna tidak ditemukan");
  }

  return sendSuccess(response, 200, "Data pengguna berhasil ditemukan", data);
});

// TODO 2: tambahkan endpoint POST /pengguna dengan validasi nim, nama, email, dan role.
app.post("/pengguna", async (request: Request, response: Response) => {
  const { nim, nama, email, role } = request.body;

  if (
    typeof nim !== "string" || !nim.trim() ||
    typeof nama !== "string" || !nama.trim() ||
    typeof email !== "string" || !email.trim() ||
    typeof role !== "string" || !role.trim()
  ) {
    return sendError(
      response,
      400,
      "NIM, nama, email, dan role wajib diisi dengan benar"
    );
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValid) {
    return sendError(response, 400, "Format email tidak valid");
  }

  try {
    const data = await prisma.pengguna.create({
      data: {
        nim: nim.trim(),
        nama: nama.trim(),
        email: email.trim(),
        role: role.trim(),
      },
    });

    return sendSuccess(
      response,
      201,
      "Data pengguna berhasil ditambahkan",
      data
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return sendError(response, 409, "NIM atau email sudah terdaftar");
    }

    return sendError(response, 500, "Gagal menambahkan data pengguna");
  }
});

// TODO 3: tambahkan endpoint PATCH /pengguna/:nim untuk mengubah nama, email, atau role.
app.patch("/pengguna/:nim", async (request: Request, response: Response) => {
  const nim = String(request.params.nim);
  const body = request.body ?? {};
  const { nama, email, role } = body;

  if (nama === undefined && email === undefined && role === undefined) {
    return sendError(response, 400, "Tidak ada data yang ingin diubah");
  }

  for (const [field, value] of Object.entries({ nama, email, role })) {
    if (value !== undefined && (typeof value !== "string" || !value.trim())) {
      return sendError(response, 400, `${field} harus berupa teks dan tidak boleh kosong`);
    }
  }

  if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendError(response, 400, "Format email tidak valid");
  }

  const pengguna = await prisma.pengguna.findUnique({
    where: { nim: String(nim) },
  });

  if (!pengguna) {
    return sendError(response, 404, "Data pengguna tidak ditemukan");
  }

  try {
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
      data
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return sendError(response, 409, "Email sudah digunakan");
    }

    return sendError(response, 500, "Gagal memperbarui data pengguna");
  }
});

// TODO 4: tambahkan endpoint DELETE /pengguna/:nim dengan response 204.
app.delete("/pengguna/:nim", async (request: Request, response: Response) => {
  const { nim } = request.params;

  const pengguna = await prisma.pengguna.findUnique({
     where: { nim: String(nim) },
  });

  if (!pengguna) {
    return sendError(response, 404, "Data pengguna tidak ditemukan");
  }

  await prisma.pengguna.delete({
    where: { nim: String(nim) },
  });

  return response.status(204).send();
});

const port = Number(process.env.PORT_LATIHAN ?? 3009);

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(port, () => {
  console.log("Latihan Database API berjalan di http://localhost:3009");
});
