import express from "express";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "./client.ts";

const app = express();
app.use(express.json());

// Format response konsisten, mengikuti pertemuan 5
function sukses(res: Response, status: number, message: string, data?: unknown) {
  return res.status(status).json({ success: true, message, data });
}

function gagal(res: Response, status: number, message: string, details?: string[]) {
  return res.status(status).json({ success: false, message, ...(details && { details }) });
}

// id harus bilangan bulat positif dan muat di tipe Int database
function parseId(raw: unknown): number | null {
  const teks = String(raw);
  if (!/^[1-9]\d{0,9}$/.test(teks)) return null;
  const id = Number(teks);
  return id <= 2147483647 ? id : null;
}

function validasiBuku(body: any, parsial = false) {
  const errors: string[] = [];
  const { judul, penulis, tahun, stok } = body ?? {};

  if (!parsial || judul !== undefined) {
    if (typeof judul !== "string" || judul.trim() === "") errors.push("judul wajib berupa teks");
  }
  if (!parsial || penulis !== undefined) {
    if (typeof penulis !== "string" || penulis.trim() === "") errors.push("penulis wajib berupa teks");
  }
  if (!parsial || tahun !== undefined) {
    if (!Number.isInteger(tahun)) errors.push("tahun wajib berupa angka bulat");
  }
  if (stok !== undefined && (!Number.isInteger(stok) || stok < 0)) {
    errors.push("stok harus angka bulat >= 0");
  }
  return errors;
}

// GET semua buku (bisa filter ?stokMin=1)
app.get("/buku", async (req, res) => {
  const where: any = {};
  const { stokMin } = req.query;
  if (stokMin !== undefined) {
    if (typeof stokMin !== "string" || !/^\d{1,9}$/.test(stokMin)) {
      return gagal(res, 400, "Query tidak valid", ["stokMin harus bilangan bulat >= 0"]);
    }
    where.stok = { gte: Number(stokMin) };
  }
  const data = await prisma.buku.findMany({ where, orderBy: { judul: "asc" } });
  return sukses(res, 200, "Daftar buku berhasil diambil", { total: data.length, data });
});

// GET detail satu buku
app.get("/buku/:id", async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return gagal(res, 400, "id tidak valid", ["id harus bilangan bulat positif"]);

  const buku = await prisma.buku.findFirst({ where: { id } });
  if (!buku) return gagal(res, 404, "Buku tidak ditemukan");
  return sukses(res, 200, "Detail buku berhasil diambil", buku);
});

// POST tambah buku
app.post("/buku", async (req, res) => {
  const errors = validasiBuku(req.body);
  if (errors.length > 0) return gagal(res, 400, "Data buku tidak valid", errors);

  const { judul, penulis, tahun, stok } = req.body;
  const baru = await prisma.buku.create({
    data: { judul: judul.trim(), penulis: penulis.trim(), tahun, stok },
  });
  return sukses(res, 201, "Buku berhasil ditambahkan", baru);
});

// PATCH ubah sebagian data buku
app.patch("/buku/:id", async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return gagal(res, 400, "id tidak valid", ["id harus bilangan bulat positif"]);

  const body = req.body ?? {};
  const errors = validasiBuku(body, true);
  if (errors.length > 0) return gagal(res, 400, "Data buku tidak valid", errors);

  const { judul, penulis, tahun, stok } = body;
  const data: { judul?: string; penulis?: string; tahun?: number; stok?: number } = {};
  if (judul !== undefined) data.judul = judul.trim();
  if (penulis !== undefined) data.penulis = penulis.trim();
  if (tahun !== undefined) data.tahun = tahun;
  if (stok !== undefined) data.stok = stok;
  if (Object.keys(data).length === 0) {
    return gagal(res, 400, "Data buku tidak valid", ["kirim minimal satu field: judul, penulis, tahun, atau stok"]);
  }

  const ada = await prisma.buku.findFirst({ where: { id } });
  if (!ada) return gagal(res, 404, "Buku tidak ditemukan");

  const diperbarui = await prisma.buku.update({ where: { id }, data });
  return sukses(res, 200, "Buku berhasil diperbarui", diperbarui);
});

// DELETE hapus buku
app.delete("/buku/:id", async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return gagal(res, 400, "id tidak valid", ["id harus bilangan bulat positif"]);

  const ada = await prisma.buku.findFirst({ where: { id } });
  if (!ada) return gagal(res, 404, "Buku tidak ditemukan");

  await prisma.buku.delete({ where: { id } });
  return res.status(204).send();
});

// Route yang tidak ada
app.use((_req: Request, res: Response) => {
  return gagal(res, 404, "Route tidak ditemukan");
});

// Penanganan error: JSON rusak jadi 400, selebihnya 500 tanpa detail internal
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err?.type === "entity.parse.failed") return gagal(res, 400, "JSON tidak valid");
  console.error(err);
  return gagal(res, 500, "Terjadi kesalahan pada server");
});

export default app;