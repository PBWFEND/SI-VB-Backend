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
  return response.status(statusCode).json({ success: false, message, ...(details !== undefined && { details }) });
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.get("/pengguna", async (_request: Request, response: Response) => {
  const data = await prisma.pengguna.findMany({ orderBy: { nim: "asc" } });
  return sendSuccess(response, 200, "Data pengguna berhasil diambil", { total: data.length, data });
});

/* ------------------------------------------------------------------ */
/* TODO 1 — GET /pengguna/:nim  → 200 / 404                            */
/* ------------------------------------------------------------------ */
app.get("/pengguna/:nim", async (request: Request, response: Response) => {
  // PERBAIKAN: Konversi ke String() agar TypeScript tidak error
  const nim = String(request.params.nim);
  
  const data = await prisma.pengguna.findUnique({ where: { nim } });
  if (!data) return sendError(response, 404, "Pengguna tidak ditemukan");
  return sendSuccess(response, 200, "Detail pengguna berhasil diambil", data);
});

/* ------------------------------------------------------------------ */
/* TODO 2 — POST /pengguna  → 201 / 400                                */
/* ------------------------------------------------------------------ */
app.post("/pengguna", async (request: Request, response: Response) => {
  const body = request.body ?? {};
  const { nim, nama, email, role } = body;
  const errors: string[] = [];

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

  if (errors.length > 0) return sendError(response, 400, "Validasi gagal", errors);

  try {
    const created = await prisma.pengguna.create({
      data: {
        nim: nim.trim(),
        nama: nama.trim(),
        email: email.trim(),
        // bila `role` berupa enum Prisma, cast ke tipe enum-nya:
        role: role.trim() as never,
      },
    });
    response.location(`/pengguna/${created.nim}`);
    return sendSuccess(response, 201, "Pengguna berhasil ditambahkan", created);
  } catch (error) {
    const code = (error as { code?: string }).code;
    // P2002 = unique constraint (nim atau email sudah ada)
    if (code === "P2002") {
      return sendError(response, 400, "Validasi gagal", [
        "'nim' atau 'email' sudah terdaftar",
      ]);
    }
    // nilai enum tidak dikenal (Prisma versi baru)
    if (code === "P2009" || String((error as Error).message).includes("enum")) {
      return sendError(response, 400, "Validasi gagal", ["'role' tidak valid"]);
    }
    throw error;
  }
});

/* ------------------------------------------------------------------ */
/* TODO 3 — PATCH /pengguna/:nim  → 200 / 400 / 404                    */
/* ------------------------------------------------------------------ */
app.patch("/pengguna/:nim", async (request: Request, response: Response) => {
  // PERBAIKAN: Konversi ke String() agar TypeScript tidak error
  const nim = String(request.params.nim);
  
  const body = request.body ?? {};
  const fields = Object.keys(body);

  if (fields.length === 0) {
    return sendError(response, 400, "Tidak ada field yang dikirim untuk diubah");
  }

  const allowed = ["nama", "email", "role"] as const;
  const disallowed = fields.filter((field) => !allowed.includes(field as typeof allowed[number]));
  if (disallowed.length > 0) {
    return sendError(response, 400, "Field tidak boleh diubah", disallowed);
  }

  const existing = await prisma.pengguna.findUnique({ where: { nim } });
  if (!existing) return sendError(response, 404, "Pengguna tidak ditemukan");

  const errors: string[] = [];
  const data: Record<string, unknown> = {};

  if ("nama" in body) {
    if (typeof body.nama !== "string" || body.nama.trim() === "") {
      errors.push("'nama' harus string tidak kosong");
    } else {
      data.nama = body.nama.trim();
    }
  }

  if ("email" in body) {
    if (typeof body.email !== "string" || body.email.trim() === "") {
      errors.push("'email' harus string tidak kosong");
    } else if (!EMAIL_REGEX.test(body.email.trim())) {
      errors.push("'email' tidak valid");
    } else {
      data.email = body.email.trim();
    }
  }

  if ("role" in body) {
    if (typeof body.role !== "string" || body.role.trim() === "") {
      errors.push("'role' harus string tidak kosong");
    } else {
      data.role = body.role.trim();
    }
  }

  if (errors.length > 0) return sendError(response, 400, "Validasi gagal", errors);

  try {
    const updated = await prisma.pengguna.update({
      where: { nim },
      // cast supaya TS tidak protes jika role berupa enum
      data: data as never,
    });
    return sendSuccess(response, 200, "Data pengguna berhasil diperbarui", updated);
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === "P2002") {
      return sendError(response, 400, "Validasi gagal", ["'email' sudah dipakai"]);
    }
    if (code === "P2009" || String((error as Error).message).includes("enum")) {
      return sendError(response, 400, "Validasi gagal", ["'role' tidak valid"]);
    }
    throw error;
  }
});

/* ------------------------------------------------------------------ */
/* TODO 4 — DELETE /pengguna/:nim  → 204 / 404                         */
/* ------------------------------------------------------------------ */
app.delete("/pengguna/:nim", async (request: Request, response: Response) => {
  // PERBAIKAN: Konversi ke String() agar TypeScript tidak error
  const nim = String(request.params.nim);
  
  const existing = await prisma.pengguna.findUnique({ where: { nim } });
  if (!existing) return sendError(response, 404, "Pengguna tidak ditemukan");

  await prisma.pengguna.delete({ where: { nim } });
  return response.status(204).send();
});

/* ------------------------------------------------------------------ */
/* Fallback 404 JSON                                                   */
/* ------------------------------------------------------------------ */
app.use((request: Request, response: Response) => {
  return sendError(response, 404, `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`);
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