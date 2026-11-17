/**
 * UTS Mini Project (Laboratorium) - Lapisan controller.
 * Membaca request, memvalidasi input, memilih kode status, dan membentuk response.
 * Tidak menulis query database (itu tugas service).
 */

import type { Request, Response } from "express";
import * as peralatanService from "../service/peralatan.service.ts";

const KONDISI_VALID = ["baik", "rusak", "perbaikan"];
const POLA_KODE = /^[A-Za-z0-9-]{3,20}$/;
const BATAS_JUMLAH = 10000;

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

// Prisma memberi kode P2002 bila nilai unik (kode) sudah dipakai peralatan lain
const isDuplikat = (error: unknown): boolean => {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
};

// ----- Pemeriksa per field: mengembalikan pesan error, atau null bila valid -----

const cekNama = (nilai: unknown): string | null => {
  if (typeof nilai !== "string" || nilai.trim() === "") return "Field nama wajib diisi dengan teks";
  if (nilai.trim().length > 100) return "Field nama maksimal 100 karakter";
  return null;
};

const cekKode = (nilai: unknown): string | null => {
  if (typeof nilai !== "string" || !POLA_KODE.test(nilai.trim())) {
    return "Field kode wajib 3-20 karakter berupa huruf, angka, atau tanda hubung";
  }
  return null;
};

// Enum divalidasi dengan daftar nilai yang diizinkan, bukan hanya dicek bertipe string
const cekKondisi = (nilai: unknown): string | null => {
  if (typeof nilai !== "string" || !KONDISI_VALID.includes(nilai)) {
    return `Field kondisi harus salah satu dari: ${KONDISI_VALID.join(", ")}`;
  }
  return null;
};

const cekJumlah = (nilai: unknown): string | null => {
  if (typeof nilai !== "number" || !Number.isInteger(nilai) || nilai < 1 || nilai > BATAS_JUMLAH) {
    return `Field jumlah harus bilangan bulat antara 1 dan ${BATAS_JUMLAH}`;
  }
  return null;
};

const tambahBila = (errors: string[], pesan: string | null) => {
  if (pesan !== null) errors.push(pesan);
};

// Validasi body POST: nama, kode, kondisi wajib; jumlah opsional. Semua error dikumpulkan dulu.
const validasiCreate = (body: Record<string, unknown>): string[] => {
  const errors: string[] = [];
  const { nama, kode, kondisi, jumlah } = body;

  tambahBila(errors, cekNama(nama));
  tambahBila(errors, cekKode(kode));
  tambahBila(errors, cekKondisi(kondisi));
  if (jumlah !== undefined) tambahBila(errors, cekJumlah(jumlah));

  return errors;
};

// Validasi body PATCH: semua field opsional, tetapi bila dikirim harus valid
const validasiPatch = (body: Record<string, unknown>): string[] => {
  const errors: string[] = [];
  const { nama, kode, kondisi, jumlah } = body;

  if (nama !== undefined) tambahBila(errors, cekNama(nama));
  if (kode !== undefined) tambahBila(errors, cekKode(kode));
  if (kondisi !== undefined) tambahBila(errors, cekKondisi(kondisi));
  if (jumlah !== undefined) tambahBila(errors, cekJumlah(jumlah));

  return errors;
};

// Mengekstrak nilai tervalidasi menjadi object baru; dipakai oleh POST dan PATCH.
// kode disimpan huruf besar agar "lab-001" dan "LAB-001" dianggap kode yang sama.
const susunDataPatch = (body: Record<string, unknown>) => {
  const { nama, kode, kondisi, jumlah } = body;
  const data: { nama?: string; kode?: string; kondisi?: string; jumlah?: number } = {};

  if (typeof nama === "string") data.nama = nama.trim();
  if (typeof kode === "string") data.kode = kode.trim().toUpperCase();
  if (typeof kondisi === "string") data.kondisi = kondisi;
  if (typeof jumlah === "number") data.jumlah = jumlah;

  return data;
};

export const handlerDaftarPeralatan = async (request: Request, response: Response) => {
  const { kondisi } = request.query;

  // Filter ?kondisi= juga divalidasi terhadap daftar enum
  if (kondisi !== undefined && cekKondisi(kondisi) !== null) {
    return sendError(response, 400, "Query tidak valid", [
      `Query kondisi harus salah satu dari: ${KONDISI_VALID.join(", ")}`,
    ]);
  }

  const data = await peralatanService.ambilDaftarPeralatan({
    ...(typeof kondisi === "string" && { kondisi }),
  });

  return sendSuccess(response, 200, "Daftar peralatan berhasil diambil", { total: data.length, data });
};

export const handlerDetailPeralatan = async (request: Request, response: Response) => {
  const id = bacaIdDariUrl(request.params.id);
  if (id === null) return sendError(response, 400, "Parameter id harus berupa bilangan bulat positif");

  const item = await peralatanService.ambilPeralatan(id);
  // 404: resource tidak ada di database (berbeda dari 400 yang berarti input salah)
  if (!item) return sendError(response, 404, "Peralatan tidak ditemukan");

  return sendSuccess(response, 200, "Detail peralatan berhasil diambil", item);
};

export const handlerCreatePeralatan = async (request: Request, response: Response) => {
  const body = (request.body ?? {}) as Record<string, unknown>;
  const errors = validasiCreate(body);
  if (errors.length > 0) return sendError(response, 400, "Data peralatan tidak valid", errors);

  const data = susunDataPatch(body);
  // Penjaga kedua: memastikan service tidak menerima payload tanpa field wajib
  if (data.nama === undefined || data.kode === undefined || data.kondisi === undefined) {
    return sendError(response, 400, "Data peralatan tidak lengkap", [
      "Field nama, kode, dan kondisi wajib terisi",
    ]);
  }

  try {
    const baru = await peralatanService.buatPeralatan({
      nama: data.nama,
      kode: data.kode,
      kondisi: data.kondisi,
      ...(data.jumlah !== undefined && { jumlah: data.jumlah }),
    });
    // 201 Created: resource baru berhasil dibuat
    return sendSuccess(response, 201, "Peralatan berhasil dibuat", baru);
  } catch (error) {
    // 409 Conflict: input valid, tetapi bentrok dengan data yang sudah ada
    if (isDuplikat(error)) return sendError(response, 409, "Kode peralatan sudah terdaftar");
    throw error;
  }
};

export const handlerPatchPeralatan = async (request: Request, response: Response) => {
  const id = bacaIdDariUrl(request.params.id);
  if (id === null) return sendError(response, 400, "Parameter id harus berupa bilangan bulat positif");

  const ada = await peralatanService.ambilPeralatan(id);
  if (!ada) return sendError(response, 404, "Peralatan tidak ditemukan");

  const body = (request.body ?? {}) as Record<string, unknown>;
  const errors = validasiPatch(body);
  if (errors.length > 0) return sendError(response, 400, "Data perubahan tidak valid", errors);

  // PATCH tanpa satu pun field yang valid ditolak
  const data = susunDataPatch(body);
  if (Object.keys(data).length === 0) {
    return sendError(response, 400, "Tidak ada field yang diubah", [
      "Kirim minimal satu dari nama, kode, kondisi, atau jumlah",
    ]);
  }

  try {
    const diperbarui = await peralatanService.perbaruiPeralatan(id, data);
    return sendSuccess(response, 200, "Peralatan berhasil diperbarui", diperbarui);
  } catch (error) {
    if (isDuplikat(error)) return sendError(response, 409, "Kode peralatan sudah terdaftar");
    throw error;
  }
};

export const handlerDeletePeralatan = async (request: Request, response: Response) => {
  const id = bacaIdDariUrl(request.params.id);
  if (id === null) return sendError(response, 400, "Parameter id harus berupa bilangan bulat positif");

  const ada = await peralatanService.ambilPeralatan(id);
  if (!ada) return sendError(response, 404, "Peralatan tidak ditemukan");

  await peralatanService.hapusPeralatan(id);
  // 204 No Content: berhasil tanpa body
  return response.status(204).send();
};