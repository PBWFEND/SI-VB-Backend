import type { Request, Response } from "express";
import * as bukuService from "../service/buku.service.ts";

const sendSuccess = (
  res: Response,
  status: number,
  message: string,
  data: unknown
) => res.status(status).json({ success: true, message, data });

const sendError = (
  res: Response,
  status: number,
  message: string,
  details?: unknown
) =>
  res
    .status(status)
    .json({ success: false, message, ...(details && { details }) });

const validasiCreate = (body: Record<string, unknown>): string[] => {
  const errors: string[] = [];
  const { judul, penulis, tahun, stok } = body;

  if (typeof judul !== "string" || judul.trim() === "")
    errors.push("Field judul wajib diisi");
  if (typeof penulis !== "string" || penulis.trim() === "")
    errors.push("Field penulis wajib diisi");
  if (typeof tahun !== "number" || tahun < 1000 || tahun > 2100)
    errors.push("Field tahun wajib angka 1000–2100");
  if (stok !== undefined && (typeof stok !== "number" || stok < 0))
    errors.push("Field stok harus angka >= 0");

  return errors;
};

export const handlerDaftarBuku = async (req: Request, res: Response) => {
  const penulisRaw = req.query.penulis;
  const penulis = typeof penulisRaw === "string" ? penulisRaw : undefined;
  const data = await bukuService.ambilDaftarBuku(penulis ? { penulis } : undefined);
  return sendSuccess(res, 200, "Daftar buku berhasil diambil", {
    total: data.length,
    data,
  });
};

export const handlerDetailBuku = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return sendError(res, 400, "Parameter id tidak valid");

  const item = await bukuService.ambilBukuById(id);
  if (!item) return sendError(res, 404, "Buku tidak ditemukan");

  return sendSuccess(res, 200, "Detail buku berhasil diambil", item);
};

export const handlerCreateBuku = async (req: Request, res: Response) => {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const errors = validasiCreate(body);
  if (errors.length > 0)
    return sendError(res, 400, "Data buku tidak valid", errors);

  const { judul, penulis, tahun, stok } = body as {
    judul: string;
    penulis: string;
    tahun: number;
    stok?: number;
  };

  const baru = await bukuService.buatBuku({
    judul: judul.trim(),
    penulis: penulis.trim(),
    tahun,
    stok,
  });
  return sendSuccess(res, 201, "Buku berhasil dibuat", baru);
};

export const handlerPatchBuku = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return sendError(res, 400, "Parameter id tidak valid");

  const ada = await bukuService.ambilBukuById(id);
  if (!ada) return sendError(res, 404, "Buku tidak ditemukan");

  const body = (req.body ?? {}) as Record<string, unknown>;
  const errors: string[] = [];
  if (body.judul !== undefined && (typeof body.judul !== "string" || body.judul.trim() === ""))
    errors.push("Field judul tidak boleh kosong");
  if (body.penulis !== undefined && (typeof body.penulis !== "string" || body.penulis.trim() === ""))
    errors.push("Field penulis tidak boleh kosong");
  if (body.tahun !== undefined && (typeof body.tahun !== "number" || body.tahun < 1000 || body.tahun > 2100))
    errors.push("Field tahun wajib angka 1000–2100");
  if (body.stok !== undefined && (typeof body.stok !== "number" || body.stok < 0))
    errors.push("Field stok harus angka >= 0");

  if (errors.length > 0)
    return sendError(res, 400, "Data perubahan tidak valid", errors);

  const diperbarui = await bukuService.perbaruiBuku(id, {
    ...(typeof body.judul === "string" && { judul: body.judul.trim() }),
    ...(typeof body.penulis === "string" && { penulis: body.penulis.trim() }),
    ...(typeof body.tahun === "number" && { tahun: body.tahun }),
    ...(typeof body.stok === "number" && { stok: body.stok }),
  });
  return sendSuccess(res, 200, "Buku berhasil diperbarui", diperbarui);
};

export const handlerDeleteBuku = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return sendError(res, 400, "Parameter id tidak valid");

  const ada = await bukuService.ambilBukuById(id);
  if (!ada) return sendError(res, 404, "Buku tidak ditemukan");

  await bukuService.hapusBuku(id);
  return res.status(204).send();
};