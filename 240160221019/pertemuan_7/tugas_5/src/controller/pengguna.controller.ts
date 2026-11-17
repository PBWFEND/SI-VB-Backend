/**
 * Pertemuan 7 — TUGAS: Controller Pengguna
 * Menangani validasi input, status code, dan response.
 */

import type { Request, Response } from "express";
import * as penggunaService from "../service/pengguna.service.ts";

const sendSuccess = (
  response: Response,
  statusCode: number,
  message: string,
  data: unknown
) => response.status(statusCode).json({ success: true, message, data });

const sendError = (
  response: Response,
  statusCode: number,
  message: string,
  details?: unknown
) =>
  response
    .status(statusCode)
    .json({ success: false, message, ...(details && { details }) });

const validasiCreate = (body: Record<string, unknown>): string[] => {
  const errors: string[] = [];
  const { nim, nama, email, role } = body;

  if (typeof nim !== "string" || nim.trim() === "") errors.push("Field nim wajib diisi");
  if (typeof nama !== "string" || nama.trim() === "") errors.push("Field nama wajib diisi");
  if (typeof email !== "string" || email.trim() === "") errors.push("Field email wajib diisi");
  else if (!email.includes("@")) errors.push("Field email harus berformat email valid");
  if (role !== undefined && typeof role !== "string") errors.push("Field role harus string");
  return errors;
};

const validasiPatch = (body: Record<string, unknown>): string[] => {
  const errors: string[] = [];
  const { nama, email, role } = body;

  if (nama !== undefined && (typeof nama !== "string" || nama.trim() === ""))
    errors.push("Field nama, bila dikirim, wajib string tidak kosong");
  if (email !== undefined && (typeof email !== "string" || !email.includes("@")))
    errors.push("Field email, bila dikirim, harus email valid");
  if (role !== undefined && typeof role !== "string")
    errors.push("Field role, bila dikirim, wajib string");
  return errors;
};

const susunDataPatch = (body: Record<string, unknown>) => {
  const { nama, email, role } = body;
  const data: { nama?: string; email?: string; role?: string } = {};
  if (typeof nama === "string") data.nama = nama.trim();
  if (typeof email === "string") data.email = email.trim();
  if (typeof role === "string") data.role = role.trim();
  return data;
};

export const handlerDaftarPengguna = async (
  request: Request,
  response: Response
) => {
  const nimRaw = request.query.nim;
  const nimFilter = typeof nimRaw === "string" ? nimRaw : undefined;
  const data = await penggunaService.ambilDaftarPengguna(
    nimFilter ? { nim: nimFilter } : undefined
  );
  return sendSuccess(response, 200, "Daftar pengguna berhasil diambil", {
    total: data.length,
    data,
  });
};

export const handlerDetailPengguna = async (
  request: Request,
  response: Response
) => {
  const { nim } = request.params;
  if (!nim || typeof nim !== "string")
    return sendError(response, 400, "Parameter nim tidak valid");

  const item = await penggunaService.ambilPenggunaByNim(nim);
  if (!item) return sendError(response, 404, "Pengguna tidak ditemukan");

  return sendSuccess(response, 200, "Detail pengguna berhasil diambil", item);
};

export const handlerCreatePengguna = async (
  request: Request,
  response: Response
) => {
  const body = (request.body ?? {}) as Record<string, unknown>;
  const errors = validasiCreate(body);
  if (errors.length > 0)
    return sendError(response, 400, "Data pengguna tidak valid", errors);

  const { nim, nama, email, role } = body as {
    nim: string;
    nama: string;
    email: string;
    role?: string;
  };

  try {
    const baru = await penggunaService.buatPengguna({
      nim: nim.trim(),
      nama: nama.trim(),
      email: email.trim(),
      role: typeof role === "string" ? role.trim() : undefined,
    });
    return sendSuccess(response, 201, "Pengguna berhasil dibuat", baru);
  } catch (error: any) {
    if (error.code === "P2002")
      return sendError(response, 400, "NIM atau Email sudah terdaftar");
    console.error(error);
    return sendError(response, 500, "Terjadi kesalahan pada server");
  }
};

export const handlerPatchPengguna = async (
  request: Request,
  response: Response
) => {
  const { nim } = request.params;
  if (!nim || typeof nim !== "string")
    return sendError(response, 400, "Parameter nim tidak valid");

  const ada = await penggunaService.ambilPenggunaByNim(nim);
  if (!ada) return sendError(response, 404, "Pengguna tidak ditemukan");

  const body = (request.body ?? {}) as Record<string, unknown>;
  const errors = validasiPatch(body);
  if (errors.length > 0)
    return sendError(response, 400, "Data perubahan tidak valid", errors);

  try {
    const diperbarui = await penggunaService.perbaruiPengguna(
      nim,
      susunDataPatch(body)
    );
    return sendSuccess(response, 200, "Pengguna berhasil diperbarui", diperbarui);
  } catch (error: any) {
    if (error.code === "P2002")
      return sendError(response, 400, "Email sudah digunakan pengguna lain");
    console.error(error);
    return sendError(response, 500, "Terjadi kesalahan pada server");
  }
};

export const handlerDeletePengguna = async (
  request: Request,
  response: Response
) => {
  const { nim } = request.params;
  if (!nim || typeof nim !== "string")
    return sendError(response, 400, "Parameter nim tidak valid");

  const ada = await penggunaService.ambilPenggunaByNim(nim);
  if (!ada) return sendError(response, 404, "Pengguna tidak ditemukan");

  await penggunaService.hapusPengguna(nim);
  return response.status(204).send();
};