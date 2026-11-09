/**
 * Pertemuan 7 - Lapisan controller.
 * Membaca request, memvalidasi input, memilih kode status, dan membentuk response.
 * Tidak menulis query database (itu tugas service).
 */

import type { Request, Response } from "express";
import * as bukuService from "../service/buku.service.ts";

const sendSuccess = (response: Response, statusCode: number, message: string, data: unknown) => {
  return response.status(statusCode).json({ success: true, message, data });
};

const sendError = (response: Response, statusCode: number, message: string, details?: unknown) => {
  return response.status(statusCode).json({ success: false, message, ...(details && { details }) });
};

// Gerbang typeof: id dari URL hanya diterima bila berupa string bilangan bulat positif
const bacaIdDariUrl = (idRaw: string | string[] | undefined): number | null => {
  if (typeof idRaw !== "string") return null;
  const id = Number(idRaw);
  if (!Number.isInteger(id) || id < 1) return null;
  return id;
};

// Validasi body POST: kumpulkan semua error agar client bisa memperbaikinya sekaligus
const validasiCreate = (body: Record<string, unknown>): string[] => {
  const errors: string[] = [];
  const { judul, penulis, tahun, stok } = body;

  if (typeof judul !== "string" || judul.trim() === "") {
    errors.push("Field judul wajib diisi");
  }
  if (typeof penulis !== "string" || penulis.trim() === "") {
    errors.push("Field penulis wajib diisi");
  }
  if (typeof tahun !== "number" || !Number.isInteger(tahun)) {
    errors.push("Field tahun wajib berupa bilangan bulat");
  } else if (tahun < 1000 || tahun > 2100) {
    errors.push("Field tahun berada di luar rentang wajar (1000-2100)");
  }
  if (stok !== undefined && (typeof stok !== "number" || !Number.isInteger(stok) || stok < 0)) {
    errors.push("Field stok harus bilangan bulat minimal 0");
  }

  return errors;
};

// Validasi body PATCH: semua field opsional, tetapi bila dikirim harus valid
const validasiPatch = (body: Record<string, unknown>): string[] => {
  const errors: string[] = [];
  const { judul, penulis, tahun, stok } = body;

  if (judul !== undefined && (typeof judul !== "string" || judul.trim() === "")) {
    errors.push("Field judul, bila dikirim, wajib berupa string tidak kosong");
  }
  if (penulis !== undefined && (typeof penulis !== "string" || penulis.trim() === "")) {
    errors.push("Field penulis, bila dikirim, wajib berupa string tidak kosong");
  }
  // PERBAIKAN 1: rentang tahun pada PATCH disamakan dengan POST
  if (tahun !== undefined) {
    if (typeof tahun !== "number" || !Number.isInteger(tahun)) {
      errors.push("Field tahun, bila dikirim, wajib berupa bilangan bulat");
    } else if (tahun < 1000 || tahun > 2100) {
      errors.push("Field tahun berada di luar rentang wajar (1000-2100)");
    }
  }
  if (stok !== undefined && (typeof stok !== "number" || !Number.isInteger(stok) || stok < 0)) {
    errors.push("Field stok, bila dikirim, wajib bilangan bulat minimal 0");
  }

  return errors;
};

// Mengekstrak nilai tervalidasi menjadi object baru; dipakai oleh POST dan PATCH
const susunDataPatch = (body: Record<string, unknown>) => {
  const { judul, penulis, tahun, stok } = body;
  const data: { judul?: string; penulis?: string; tahun?: number; stok?: number } = {};

  if (typeof judul === "string") data.judul = judul.trim();
  if (typeof penulis === "string") data.penulis = penulis.trim();
  if (typeof tahun === "number") data.tahun = tahun;
  if (typeof stok === "number") data.stok = stok;

  return data;
};

export const handlerDaftarBuku = async (request: Request, response: Response) => {
  const { penulis, minStok } = request.query;
  const errors: string[] = [];

  if (penulis !== undefined && typeof penulis !== "string") {
    errors.push("Query penulis harus berupa teks");
  }

  // PERBAIKAN 2: minStok yang bukan angka ditolak dengan 400, tidak diabaikan diam-diam
  let minStokFilter: number | undefined;
  if (minStok !== undefined) {
    const nilai = typeof minStok === "string" && minStok.trim() !== "" ? Number(minStok) : Number.NaN;
    if (Number.isInteger(nilai) && nilai >= 0) minStokFilter = nilai;
    else errors.push("Query minStok harus bilangan bulat minimal 0");
  }
  if (errors.length > 0) return sendError(response, 400, "Query tidak valid", errors);

  const data = await bukuService.ambilDaftarBuku({
    ...(typeof penulis === "string" && { penulis }),
    ...(minStokFilter !== undefined && { minStok: minStokFilter }),
  });

  return sendSuccess(response, 200, "Daftar buku berhasil diambil", { total: data.length, data });
};

export const handlerDetailBuku = async (request: Request, response: Response) => {
  const id = bacaIdDariUrl(request.params.id);
  if (id === null) return sendError(response, 400, "Parameter id harus berupa bilangan bulat positif");

  const item = await bukuService.ambilBuku(id);
  // 404: resource tidak ada di database (berbeda dari 400 yang berarti input salah)
  if (!item) return sendError(response, 404, "Buku tidak ditemukan");

  return sendSuccess(response, 200, "Detail buku berhasil diambil", item);
};

export const handlerCreateBuku = async (request: Request, response: Response) => {
  const body = (request.body ?? {}) as Record<string, unknown>;
  const errors = validasiCreate(body);
  if (errors.length > 0) return sendError(response, 400, "Data buku tidak valid", errors);

  const dataBuku = susunDataPatch(body);
  // Penjaga kedua: memastikan service tidak menerima payload tanpa field wajib
  if (!dataBuku.judul || !dataBuku.penulis || dataBuku.tahun === undefined) {
    return sendError(response, 400, "Data buku tidak lengkap", [
      "Field judul, penulis, dan tahun wajib terisi",
    ]);
  }

  const baru = await bukuService.buatBuku({
    judul: dataBuku.judul,
    penulis: dataBuku.penulis,
    tahun: dataBuku.tahun,
    ...(dataBuku.stok !== undefined && { stok: dataBuku.stok }),
  });

  // 201 Created: resource baru berhasil dibuat
  return sendSuccess(response, 201, "Buku berhasil dibuat", baru);
};

export const handlerPatchBuku = async (request: Request, response: Response) => {
  const id = bacaIdDariUrl(request.params.id);
  if (id === null) return sendError(response, 400, "Parameter id harus berupa bilangan bulat positif");

  const ada = await bukuService.ambilBuku(id);
  if (!ada) return sendError(response, 404, "Buku tidak ditemukan");

  const body = (request.body ?? {}) as Record<string, unknown>;
  const errors = validasiPatch(body);
  if (errors.length > 0) return sendError(response, 400, "Data perubahan tidak valid", errors);

  // PERBAIKAN 3: PATCH tanpa satu pun field yang valid ditolak
  const data = susunDataPatch(body);
  if (Object.keys(data).length === 0) {
    return sendError(response, 400, "Tidak ada field yang diubah", [
      "Kirim minimal satu dari judul, penulis, tahun, atau stok",
    ]);
  }

  const diperbarui = await bukuService.perbaruiBuku(id, data);
  return sendSuccess(response, 200, "Buku berhasil diperbarui", diperbarui);
};

export const handlerDeleteBuku = async (request: Request, response: Response) => {
  const id = bacaIdDariUrl(request.params.id);
  if (id === null) return sendError(response, 400, "Parameter id harus berupa bilangan bulat positif");

  const ada = await bukuService.ambilBuku(id);
  if (!ada) return sendError(response, 404, "Buku tidak ditemukan");

  await bukuService.hapusBuku(id);
  // 204 No Content: berhasil tanpa body
  return response.status(204).send();
};