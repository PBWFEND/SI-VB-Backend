/**
 * Pertemuan 7 - Latihan: resource pengguna dengan pola lapis.
 * Jalankan: npm run latihan   (port 3009)
 * Satu file, dibagi tiga bagian: service, controller, dan route.
 */

import express, { type NextFunction, type Request, type Response } from "express";
import { prisma } from "./client.ts";

type DataPengguna = { nim: string; nama: string; email: string; role?: string };

// ===== SERVICE: hanya operasi Prisma =====

// TODO 1: findMany dengan filter nim opsional
export const ambilDaftarPengguna = async (nim?: string) => {
  return prisma.pengguna.findMany({
    where: { ...(nim !== undefined && { nim }) },
    orderBy: { nim: "asc" },
  });
};

export const ambilPengguna = async (nim: string) => {
  return prisma.pengguna.findFirst({ where: { nim } });
};

// TODO 2: service hanya membuat data; validasinya ada di controller
export const buatPengguna = async (data: DataPengguna) => {
  return prisma.pengguna.create({
    data: {
      nim: data.nim,
      nama: data.nama,
      email: data.email,
      ...(data.role !== undefined && { role: data.role }),
    },
  });
};

export const hapusPengguna = async (nim: string) => {
  return prisma.pengguna.delete({ where: { nim } });
};

// ===== CONTROLLER: validasi, kode status, response =====

const sendSuccess = (response: Response, statusCode: number, message: string, data: unknown) => {
  return response.status(statusCode).json({ success: true, message, data });
};

const sendError = (response: Response, statusCode: number, message: string, details?: unknown) => {
  return response.status(statusCode).json({ success: false, message, ...(details && { details }) });
};

const ROLE_VALID = ["mahasiswa", "petugas"];
const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isTeks = (nilai: unknown): boolean => typeof nilai === "string" && nilai.trim() !== "";

// Prisma memberi kode P2002 bila nilai unik (nim atau email) sudah ada
const isDuplikat = (error: unknown): boolean => {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
};

const validasiPengguna = (body: Record<string, unknown>): string[] => {
  const errors: string[] = [];
  const { nim, nama, email, role } = body;

  if (!isTeks(nim)) errors.push("Field nim wajib diisi");
  if (!isTeks(nama)) errors.push("Field nama wajib diisi");
  if (typeof email !== "string" || !POLA_EMAIL.test(email)) errors.push("Field email wajib berformat email yang valid");
  if (role !== undefined && (typeof role !== "string" || !ROLE_VALID.includes(role))) {
    errors.push("Field role harus mahasiswa atau petugas");
  }

  return errors;
};

const susunDataPengguna = (body: Record<string, unknown>): DataPengguna | null => {
  const { nim, nama, email, role } = body;
  if (typeof nim !== "string" || typeof nama !== "string" || typeof email !== "string") return null;

  return {
    nim: nim.trim(),
    nama: nama.trim(),
    email: email.trim(),
    ...(typeof role === "string" && { role }),
  };
};

const handlerDaftarPengguna = async (request: Request, response: Response) => {
  const { nim } = request.query;
  if (nim !== undefined && typeof nim !== "string") {
    return sendError(response, 400, "Query tidak valid", ["nim harus berupa teks"]);
  }

  const data = await ambilDaftarPengguna(typeof nim === "string" ? nim : undefined);
  return sendSuccess(response, 200, "Daftar pengguna berhasil diambil", { total: data.length, data });
};

// TODO 3: POST /pengguna dengan validasi dan status 201
const handlerBuatPengguna = async (request: Request, response: Response) => {
  const body = (request.body ?? {}) as Record<string, unknown>;
  const errors = validasiPengguna(body);
  if (errors.length > 0) return sendError(response, 400, "Data pengguna tidak valid", errors);

  const data = susunDataPengguna(body);
  if (data === null) return sendError(response, 400, "Data pengguna tidak lengkap");

  try {
    const baru = await buatPengguna(data);
    return sendSuccess(response, 201, "Pengguna berhasil dibuat", baru);
  } catch (error) {
    if (isDuplikat(error)) return sendError(response, 409, "nim atau email sudah terdaftar");
    throw error;
  }
};

// TODO 4: DELETE /pengguna/:nim dengan 204, atau 404 bila tidak ditemukan
const handlerHapusPengguna = async (request: Request, response: Response) => {
  // Gerbang typeof, karena params bertipe string | string[] menurut Express
  const nimRaw = request.params.nim;
  if (typeof nimRaw !== "string" || nimRaw.trim() === "") {
    return sendError(response, 400, "Parameter nim harus berupa teks");
  }
  const nim = nimRaw;

  const ada = await ambilPengguna(nim);
  if (!ada) return sendError(response, 404, "Pengguna tidak ditemukan");

  await hapusPengguna(nim);
  return response.status(204).send();
};

// ===== ROUTE dan APP =====

const penggunaRoutes = express.Router();
penggunaRoutes.get("/", handlerDaftarPengguna);
penggunaRoutes.post("/", handlerBuatPengguna);
penggunaRoutes.delete("/:nim", handlerHapusPengguna);

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use((request: Request, _response: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

app.get("/", (_request: Request, response: Response) => {
  sendSuccess(response, 200, "API Latihan Pengguna - Pertemuan 7", { resource: "pengguna" });
});

app.use("/pengguna", penggunaRoutes);

app.use((_request: Request, response: Response) => {
  sendError(response, 404, "Endpoint tidak ditemukan");
});

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  if (typeof error === "object" && error !== null && "type" in error && error.type === "entity.parse.failed") {
    sendError(response, 400, "Format JSON tidak valid");
    return;
  }
  console.error("Kesalahan aplikasi:", error instanceof Error ? error.message : error);
  sendError(response, 500, "Terjadi kesalahan pada server");
});

const port = Number(process.env.PORT_LATIHAN ?? 3009);

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Di Express 5, callback listen menerima error bila server gagal start (misalnya port sudah dipakai)
app.listen(port, (error?: Error) => {
  if (error) {
    console.error(`Gagal menjalankan server di port ${port}: ${error.message}`);
    process.exit(1);
  }
  console.log(`API Latihan Pengguna berjalan di http://localhost:${port}`);
});