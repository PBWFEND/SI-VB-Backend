import type { Request, Response } from "express";
import { bukuService } from "../service/buku.service.ts";

const sendSuccess = (
  res: Response,
  status: number,
  message: string,
  data: unknown,
) => res.status(status).json({ success: true, message, data });

const sendError = (
  res: Response,
  status: number,
  message: string,
  details?: unknown,
) =>
  res.status(status).json({
    success: false,
    message,
    ...(details !== undefined && { details }),
  });

const parseId = (raw: string): number | null => {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
};

// GET /buku
export const getAllBuku = async (_req: Request, res: Response) => {
  try {
    const data = await bukuService.findAll();
    return sendSuccess(res, 200, "Daftar buku berhasil diambil", {
      total: data.length,
      data,
    });
  } catch (err) {
  console.error("Error di getAllBuku:", err);
  return sendError(res, 500, "Terjadi kesalahan pada server");
}
};

// GET /buku/:id
export const getBukuById = async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return sendError(res, 400, "ID tidak valid", ["ID harus bilangan bulat positif"]);
  }

  try {
    const buku = await bukuService.findById(id);
    if (!buku) return sendError(res, 404, "Buku tidak ditemukan");
    return sendSuccess(res, 200, "Detail buku berhasil diambil", buku);
  } catch (err) {
  console.error("Error di getAllBuku:", err);
  return sendError(res, 500, "Terjadi kesalahan pada server");
}
};

// POST /buku
export const createBuku = async (req: Request, res: Response) => {
  const body = req.body as {
    judul?: unknown;
    penulis?: unknown;
    tahun?: unknown;
    stok?: unknown;
  };

  const errors: string[] = [];

  if (typeof body.judul !== "string" || body.judul.trim() === "") {
    errors.push("Field judul wajib diisi dan berupa string");
  }
  if (typeof body.penulis !== "string" || body.penulis.trim() === "") {
    errors.push("Field penulis wajib diisi dan berupa string");
  }
  if (
    typeof body.tahun !== "number" ||
    !Number.isInteger(body.tahun) ||
    body.tahun < 1000 ||
    body.tahun > 2100
  ) {
    errors.push("Field tahun wajib berupa bilangan bulat 1000–2100");
  }
  if (
    body.stok !== undefined &&
    (typeof body.stok !== "number" ||
      !Number.isInteger(body.stok) ||
      body.stok < 0)
  ) {
    errors.push("Field stok harus bilangan bulat minimal 0");
  }

  if (errors.length > 0) {
    return sendError(res, 400, "Data buku tidak valid", errors);
  }

  try {
    const buku = await bukuService.create({
      judul: (body.judul as string).trim(),
      penulis: (body.penulis as string).trim(),
      tahun: body.tahun as number,
      stok: body.stok as number | undefined,
    });
    return sendSuccess(res, 201, "Buku berhasil dibuat", buku);
  } catch (err) {
  console.error("Error di getAllBuku:", err);
  return sendError(res, 500, "Terjadi kesalahan pada server");
}
};

// PATCH /buku/:id
export const updateBuku = async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return sendError(res, 400, "ID tidak valid", ["ID harus bilangan bulat positif"]);
  }

  const body = req.body as {
    judul?: unknown;
    penulis?: unknown;
    tahun?: unknown;
    stok?: unknown;
  };

  const errors: string[] = [];
  const patch: {
    judul?: string;
    penulis?: string;
    tahun?: number;
    stok?: number;
  } = {};

  if (body.judul !== undefined) {
    if (typeof body.judul !== "string" || body.judul.trim() === "") {
      errors.push("Field judul harus string tidak kosong");
    } else {
      patch.judul = body.judul.trim();
    }
  }
  if (body.penulis !== undefined) {
    if (typeof body.penulis !== "string" || body.penulis.trim() === "") {
      errors.push("Field penulis harus string tidak kosong");
    } else {
      patch.penulis = body.penulis.trim();
    }
  }
  if (body.tahun !== undefined) {
    if (
      typeof body.tahun !== "number" ||
      !Number.isInteger(body.tahun) ||
      body.tahun < 1000 ||
      body.tahun > 2100
    ) {
      errors.push("Field tahun harus bilangan bulat 1000–2100");
    } else {
      patch.tahun = body.tahun;
    }
  }
  if (body.stok !== undefined) {
    if (
      typeof body.stok !== "number" ||
      !Number.isInteger(body.stok) ||
      body.stok < 0
    ) {
      errors.push("Field stok harus bilangan bulat minimal 0");
    } else {
      patch.stok = body.stok;
    }
  }

  if (errors.length > 0) {
    return sendError(res, 400, "Data perubahan tidak valid", errors);
  }

  try {
    const existing = await bukuService.findById(id);
    if (!existing) return sendError(res, 404, "Buku tidak ditemukan");

    const buku = await bukuService.update(id, patch);
    return sendSuccess(res, 200, "Buku berhasil diperbarui", buku);
  } catch (err) {
  console.error("Error di getAllBuku:", err);
  return sendError(res, 500, "Terjadi kesalahan pada server");
}
};

// DELETE /buku/:id
export const deleteBuku = async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return sendError(res, 400, "ID tidak valid", ["ID harus bilangan bulat positif"]);
  }

  try {
    const existing = await bukuService.findById(id);
    if (!existing) return sendError(res, 404, "Buku tidak ditemukan");

    await bukuService.delete(id);
    return res.status(204).send();
  } catch (err) {
  console.error("Error di getAllBuku:", err);
  return sendError(res, 500, "Terjadi kesalahan pada server");
}
};