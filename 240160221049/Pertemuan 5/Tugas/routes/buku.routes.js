/**
 * Router resource buku.
 * Endpoint:
 *   GET    /buku             → daftar + filter (penulis, kategori, minStok, tersedia)
 *   GET    /buku/:id         → detail
 *   POST   /buku             → create (201)
 *   PUT    /buku/:id         → replace seluruh field
 *   PATCH  /buku/:id         → partial update
 *   DELETE /buku/:id         → delete (204)
 */

import { Router } from "express";
import { buku, generateId } from "../data/buku.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { validateBuku } from "../utils/validate.js";

const router = Router();

// Helper: cari buku berdasarkan id
const findBuku = (id) => buku.find((b) => b.id === Number(id));

// Helper: cari index buku
const findIndexBuku = (id) => buku.findIndex((b) => b.id === Number(id));

// ============================================================
// GET /buku — daftar + filter
// Query: ?penulis=&kategori=&minStok=&tersedia=true|false
// ============================================================
router.get("/", (request, response) => {
  const { penulis, kategori, minStok, tersedia } = request.query;
  let data = [...buku];

  // Filter penulis (case-insensitive, partial match)
  if (penulis !== undefined) {
    if (typeof penulis !== "string" || penulis.trim() === "") {
      return sendError(response, 400, "Query 'penulis' harus teks non-kosong");
    }
    const cari = penulis.toLowerCase();
    data = data.filter((b) => b.penulis.toLowerCase().includes(cari));
  }

  // Filter kategori (case-insensitive, exact match)
  if (kategori !== undefined) {
    if (typeof kategori !== "string" || kategori.trim() === "") {
      return sendError(response, 400, "Query 'kategori' harus teks non-kosong");
    }
    const cari = kategori.toLowerCase();
    data = data.filter((b) => (b.kategori ?? "").toLowerCase() === cari);
  }

  // Filter minStok (integer >= 0)
  if (minStok !== undefined) {
    const angka = Number(minStok);
    if (!Number.isInteger(angka) || angka < 0) {
      return sendError(response, 400, "Query 'minStok' harus bilangan bulat minimal 0");
    }
    data = data.filter((b) => b.stok >= angka);
  }

  // Filter tersedia=true|false
  if (tersedia !== undefined) {
    if (tersedia !== "true" && tersedia !== "false") {
      return sendError(response, 400, "Query 'tersedia' harus 'true' atau 'false'");
    }
    const nilai = tersedia === "true";
    data = data.filter((b) => (b.stok > 0) === nilai);
  }

  return sendSuccess(response, 200, "Daftar buku berhasil diambil", {
    total: data.length,
    filter: { penulis, kategori, minStok, tersedia },
    data,
  });
});

// ============================================================
// GET /buku/:id — detail (404 jika tidak ada)
// ============================================================
router.get("/:id", (request, response) => {
  const id = Number(request.params.id);

  if (Number.isNaN(id)) {
    return sendError(response, 400, "Parameter id harus berupa angka");
  }

  const item = findBuku(id);
  if (!item) {
    return sendError(response, 404, `Buku dengan id ${id} tidak ditemukan`);
  }

  return sendSuccess(response, 200, "Detail buku berhasil diambil", item);
});

// ============================================================
// POST /buku — create (201)
// ============================================================
router.post("/", (request, response) => {
  const errors = validateBuku(request.body ?? {});
  if (errors.length > 0) {
    return sendError(response, 400, "Data buku tidak valid", errors);
  }

  const { judul, penulis, tahun, stok, kategori } = request.body;
  const baru = {
    id: generateId(),
    judul: judul.trim(),
    penulis: penulis.trim(),
    tahun,
    stok,
    ...(kategori !== undefined && { kategori: kategori.trim() }),
  };
  buku.push(baru);

  return sendSuccess(response, 201, "Buku berhasil dibuat", baru);
});

// ============================================================
// PUT /buku/:id — replace seluruh representasi
// ============================================================
router.put("/:id", (request, response) => {
  const id = Number(request.params.id);

  if (Number.isNaN(id)) {
    return sendError(response, 400, "Parameter id harus berupa angka");
  }

  const index = findIndexBuku(id);
  if (index === -1) {
    return sendError(response, 404, `Buku dengan id ${id} tidak ditemukan`);
  }

  // PUT: seluruh field wajib (partial = false)
  const errors = validateBuku(request.body ?? {}, false);
  if (errors.length > 0) {
    return sendError(response, 400, "Data buku tidak valid", errors);
  }

  const { judul, penulis, tahun, stok, kategori } = request.body;
  buku[index] = {
    id: buku[index].id, // id tetap
    judul: judul.trim(),
    penulis: penulis.trim(),
    tahun,
    stok,
    ...(kategori !== undefined && { kategori: kategori.trim() }),
  };

  return sendSuccess(response, 200, "Buku berhasil diganti", buku[index]);
});

// ============================================================
// PATCH /buku/:id — partial update
// ============================================================
router.patch("/:id", (request, response) => {
  const id = Number(request.params.id);

  if (Number.isNaN(id)) {
    return sendError(response, 400, "Parameter id harus berupa angka");
  }

  const item = findBuku(id);
  if (!item) {
    return sendError(response, 404, `Buku dengan id ${id} tidak ditemukan`);
  }

  // PATCH: hanya field yang dikirim yang divalidasi (partial = true)
  const errors = validateBuku(request.body ?? {}, true);
  if (errors.length > 0) {
    return sendError(response, 400, "Data perubahan tidak valid", errors);
  }

  const { judul, penulis, tahun, stok, kategori } = request.body ?? {};

  if (judul !== undefined) item.judul = judul.trim();
  if (penulis !== undefined) item.penulis = penulis.trim();
  if (tahun !== undefined) item.tahun = tahun;
  if (stok !== undefined) item.stok = stok;
  if (kategori !== undefined) item.kategori = kategori.trim();

  return sendSuccess(response, 200, "Buku berhasil diperbarui", item);
});

// ============================================================
// DELETE /buku/:id — hapus (204 tanpa body)
// ============================================================
router.delete("/:id", (request, response) => {
  const id = Number(request.params.id);

  if (Number.isNaN(id)) {
    return sendError(response, 400, "Parameter id harus berupa angka");
  }

  const index = findIndexBuku(id);
  if (index === -1) {
    return sendError(response, 404, `Buku dengan id ${id} tidak ditemukan`);
  }

  buku.splice(index, 1);
  return response.status(204).send(); // 204 = tanpa body
});

export default router;