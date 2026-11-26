/**
 * Pertemuan 12 — Controller resource buku.
 * Tujuan: memvalidasi input dan memanggil service; error diteruskan ke
 *         error handler terpusat via next()/rejection async (Express 5).
 */

import type { RequestHandler } from "express";
import { validationError } from "../errors/app-error.ts";
import { ambilBuku, buatBuku, daftarBuku } from "../service/buku.service.ts";

export const handlerDaftarBuku: RequestHandler = async (request, response) => {
  const judul = typeof request.query.judul === "string" ? request.query.judul : undefined;
  const minStokRaw = request.query.minStok;
  const minStok =
    typeof minStokRaw === "string" && minStokRaw !== ""
      ? Number(minStokRaw)
      : undefined;

  if (minStok !== undefined && !Number.isFinite(minStok)) {
    throw validationError("minStok harus berupa angka.");
  }

  const data = await daftarBuku({ judul, minStok });
  response.status(200).json({ success: true, data });
};

export const handlerDetailBuku: RequestHandler = async (request, response) => {
  const id = Number(request.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    throw validationError("id harus berupa bilangan bulat positif.");
  }
  const data = await ambilBuku(id);
  response.status(200).json({ success: true, data });
};

export const handlerBuatBuku: RequestHandler = async (request, response) => {
  const { judul, penulis, stok } = request.body ?? {};
  if (typeof judul !== "string" || judul.trim() === "") {
    throw validationError("judul wajib diisi.");
  }
  if (typeof penulis !== "string" || penulis.trim() === "") {
    throw validationError("penulis wajib diisi.");
  }
  if (!Number.isInteger(stok) || stok < 0) {
    throw validationError("stok harus bilangan bulat >= 0.");
  }

  const data = await buatBuku({ judul: judul.trim(), penulis: penulis.trim(), stok });
  response.status(201).json({ success: true, data });
};