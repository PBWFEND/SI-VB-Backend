/**
 * Pertemuan 8 — UTS Mini Project: Controller
 * Tujuan: menangani lapisan HTTP — validasi input, kode status, dan
 *         pembentukan response — tanpa menyentuh database secara langsung.
 *
 * Konvensi:
 * - Setiap handler menerima (request, response) dan memanggil service.
 * - Validasi input dilakukan di sini, bukan di service. Lapisan
 *   pertahan pertama terhadap data tidak valid adalah endpoint; bila
 *   lolos endpoint, service boleh mengandalkan input yang sudah teruji.
 * - Response memakai struktur seragam { success, message, data? }
 *   yang sudah ditetapkan sejak Pertemuan 5 (lihat code/pertemuan-05).
 *
 * Jalankan:
 *   Lihat server.ts — file ini diekspor dan disusun oleh app.ts.
 */

import type { Request, Response } from "express";
import * as bukuService from "../service/buku.service.ts";

// Mengirim response ketika proses berhasil
const kirimSukses = (
  response: Response,
  kode: number,
  pesan: string,
  data?: unknown
) => {
  return response.status(kode).json({
    success: true,
    message: pesan,
    ...(data !== undefined && { data }),
  });
};

// Mengirim response ketika terjadi kesalahan
const kirimGagal = (
  response: Response,
  kode: number,
  pesan: string,
  detail?: unknown
) => {
  return response.status(kode).json({
    success: false,
    message: pesan,
    ...(detail !== undefined && { details: detail }),
  });
};

// Mengubah ID dari URL menjadi angka yang valid
const ambilId = (nilai: string | string[] | undefined): number | null => {
  if (typeof nilai !== "string" || nilai.trim() === "") {
    return null;
  }

  const id = Number(nilai);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
};
type DataInputBuku = Record<string, unknown>;

// Memeriksa kelengkapan data saat menambahkan buku
const periksaBukuBaru = (data: DataInputBuku): string[] => {
  const kesalahan: string[] = [];

  if (typeof data.judul !== "string" || data.judul.trim() === "") {
    kesalahan.push("Judul buku harus diisi");
  }

  if (typeof data.penulis !== "string" || data.penulis.trim() === "") {
    kesalahan.push("Nama penulis harus diisi");
  }

  if (
    typeof data.tahun !== "number" ||
    !Number.isInteger(data.tahun) ||
    data.tahun < 1000 ||
    data.tahun > 2100
  ) {
    kesalahan.push("Tahun harus berupa bilangan bulat antara 1000 sampai 2100");
  }

  if (
    data.stok !== undefined &&
    (typeof data.stok !== "number" ||
      !Number.isInteger(data.stok) ||
      data.stok < 0)
  ) {
    kesalahan.push("Stok harus berupa bilangan bulat minimal 0");
  }

  return kesalahan;
};

// Memeriksa data yang dikirim saat mengubah buku
const periksaPerubahanBuku = (data: DataInputBuku): string[] => {
  const kesalahan: string[] = [];

  if (
    data.judul !== undefined &&
    (typeof data.judul !== "string" || data.judul.trim() === "")
  ) {
    kesalahan.push("Judul harus berupa teks dan tidak boleh kosong");
  }

  if (
    data.penulis !== undefined &&
    (typeof data.penulis !== "string" || data.penulis.trim() === "")
  ) {
    kesalahan.push("Penulis harus berupa teks dan tidak boleh kosong");
  }

  if (
    data.tahun !== undefined &&
    (typeof data.tahun !== "number" ||
      !Number.isInteger(data.tahun) ||
      data.tahun < 1000 ||
      data.tahun > 2100)
  ) {
    kesalahan.push("Tahun harus berupa bilangan bulat antara 1000 sampai 2100");
  }

  if (
    data.stok !== undefined &&
    (typeof data.stok !== "number" ||
      !Number.isInteger(data.stok) ||
      data.stok < 0)
  ) {
    kesalahan.push("Stok harus berupa bilangan bulat minimal 0");
  }

  return kesalahan;
};

 // Menyiapkan data yang akan diperbarui berdasarkan field yang dikirim
const susunDataPatch = (body: Record<string, unknown>) => {
  const { judul, penulis, tahun, stok } = body;
  const data: { judul?: string; penulis?: string; tahun?: number; stok?: number } = {};

  if (typeof judul === "string") data.judul = judul.trim();
  if (typeof penulis === "string") data.penulis = penulis.trim();
  if (typeof tahun === "number") data.tahun = tahun;
  if (typeof stok === "number") data.stok = stok;

  return data;
};

/** GET /buku — daftar buku dengan filter query opsional. */
export const handlerDaftarBuku = async (request: Request, response: Response) => {
  // Query parameter Express bertipe string | string[]; gerbang typeof
  // memastikan hanya string yang dikonversi ke Number.
  const penulisRaw = request.query.penulis;
  const penulisFilter = typeof penulisRaw === "string" ? penulisRaw : undefined;
  const minStokRaw = request.query.minStok;
  const minStokFilter = typeof minStokRaw === "string" ? Number(minStokRaw) : undefined;

  const data = await bukuService.ambilDaftarBuku({
    ...(penulisFilter !== undefined && { penulis: penulisFilter }),
    ...(minStokFilter !== undefined && !Number.isNaN(minStokFilter) && { minStok: minStokFilter }),
  });

return kirimSukses(response, 200, "Daftar buku berhasil diambil", {
  total: data.length,
  data,
});
};

/** GET /buku/:id — detail satu buku; 404 bila tidak ditemukan. */
export const handlerDetailBuku = async (request: Request, response: Response) => {
  const id = ambilId(request.params.id);

  if (id === null) {
    return kirimGagal(response, 400, "Parameter id harus berupa bilangan bulat");
  }

  const item = await bukuService.ambilBuku(id);

  if (!item) {
    return kirimGagal(response, 404, "Buku tidak ditemukan");
  }

  return kirimSukses(response, 200, "Detail buku berhasil diambil", item);
};

/** POST /buku — menambahkan buku baru. */
export const handlerCreateBuku = async (request: Request, response: Response) => {
  const body = (request.body ?? {}) as DataInputBuku;

  if (Object.keys(body).length === 0) {
    return kirimGagal(response, 400, "Data buku belum diisi");
  }

  const kesalahan = periksaBukuBaru(body);

  if (kesalahan.length > 0) {
    return kirimGagal(response, 400, "Data buku tidak valid", kesalahan);
  }

  const dataBuku = {
    judul: (body.judul as string).trim(),
    penulis: (body.penulis as string).trim(),
    tahun: body.tahun as number,
    ...(body.stok !== undefined && { stok: body.stok as number }),
  };

  const hasil = await bukuService.buatBuku(dataBuku);

  return kirimSukses(response, 201, "Buku berhasil ditambahkan", hasil);
};

/** PATCH /buku/:id — memperbarui sebagian data buku. */
export const handlerPatchBuku = async (request: Request, response: Response) => {
  const id = ambilId(request.params.id);

  if (id === null) {
    return kirimGagal(response, 400, "Parameter id harus berupa bilangan bulat");
  }

  const ada = await bukuService.ambilBuku(id);

  if (!ada) {
    return kirimGagal(response, 404, "Buku tidak ditemukan");
  }

  const body = (request.body ?? {}) as DataInputBuku;

  if (Object.keys(body).length === 0) {
    return kirimGagal(response, 400, "Data perubahan belum diisi");
  }

  const kesalahan = periksaPerubahanBuku(body);

  if (kesalahan.length > 0) {
    return kirimGagal(response, 400, "Data perubahan tidak valid", kesalahan);
  }

  const diperbarui = await bukuService.perbaruiBuku(
    id,
    susunDataPatch(body)
  );

  return kirimSukses(response, 200, "Buku berhasil diperbarui", diperbarui);
};

/** DELETE /buku/:id — menghapus data buku. */
export const handlerDeleteBuku = async (request: Request, response: Response) => {
  const id = ambilId(request.params.id);

  if (id === null) {
    return kirimGagal(response, 400, "Parameter id harus berupa bilangan bulat");
  }

  const ada = await bukuService.ambilBuku(id);

  if (!ada) {
    return kirimGagal(response, 404, "Buku tidak ditemukan");
  }

  await bukuService.hapusBuku(id);

  return response.status(204).send();
};