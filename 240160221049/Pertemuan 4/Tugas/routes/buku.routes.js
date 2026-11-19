/**
 * Router buku — dipisahkan dari app.js agar app.js tetap ringkas.
 * Endpoint:
 *   GET    /buku          → daftar + query filter (tersedia, penulis)
 *   GET    /buku/:id      → detail satu buku (404 jika tak ada)
 *   POST   /buku          → tambah buku (validasi judul & penulis)
 *   PATCH  /buku/:id      → ubah sebagian field
 *   DELETE /buku/:id      → hapus buku
 */

import { Router } from "express";
import { buku, generateId } from "../data/buku.js";

const router = Router();

// ---------- GET /buku — daftar + filter query ----------
router.get("/", (request, response) => {
  const { tersedia, penulis } = request.query;
  let hasil = [...buku];

  // Filter tersedia=true|false
  if (tersedia !== undefined) {
    if (tersedia !== "true" && tersedia !== "false") {
      return response.status(400).json({
        success: false,
        message: "Query 'tersedia' harus 'true' atau 'false'",
      });
    }
    const nilai = tersedia === "true";
    hasil = hasil.filter((b) => b.tersedia === nilai);
  }

  // Filter penulis (case-insensitive, partial match)
  if (penulis !== undefined) {
    if (typeof penulis !== "string" || penulis.trim() === "") {
      return response.status(400).json({
        success: false,
        message: "Query 'penulis' harus berupa teks non-kosong",
      });
    }
    const cari = penulis.toLowerCase();
    hasil = hasil.filter((b) => b.penulis.toLowerCase().includes(cari));
  }

  return response.status(200).json({
    success: true,
    total: hasil.length,
    filter: { tersedia, penulis },
    data: hasil,
  });
});

// ---------- GET /buku/:id — detail ----------
router.get("/:id", (request, response) => {
  const id = Number(request.params.id);

  if (Number.isNaN(id)) {
    return response.status(400).json({
      success: false,
      message: "Parameter id harus berupa angka",
    });
  }

  const item = buku.find((b) => b.id === id);

  if (!item) {
    return response.status(404).json({
      success: false,
      message: `Buku dengan id ${id} tidak ditemukan`,
    });
  }

  return response.status(200).json({ success: true, data: item });
});

// ---------- POST /buku — tambah ----------
router.post("/", (request, response) => {
  const { judul, penulis, tahun, tersedia = true } = request.body ?? {};

  // Validasi judul
  if (!judul || typeof judul !== "string" || judul.trim() === "") {
    return response.status(400).json({
      success: false,
      message: "Field 'judul' wajib diisi dan berupa string non-kosong",
    });
  }

  // Validasi penulis
  if (!penulis || typeof penulis !== "string" || penulis.trim() === "") {
    return response.status(400).json({
      success: false,
      message: "Field 'penulis' wajib diisi dan berupa string non-kosong",
    });
  }

  // Validasi tahun (opsional, jika ada harus angka)
  if (tahun !== undefined && (!Number.isInteger(tahun) || tahun < 1900 || tahun > 2100)) {
    return response.status(400).json({
      success: false,
      message: "Field 'tahun' harus bilangan bulat antara 1900 dan 2100",
    });
  }

  // Validasi tersedia (boolean)
  if (typeof tersedia !== "boolean") {
    return response.status(400).json({
      success: false,
      message: "Field 'tersedia' harus boolean (true/false)",
    });
  }

  const baru = {
    id: generateId(),
    judul: judul.trim(),
    penulis: penulis.trim(),
    tahun: tahun ?? new Date().getFullYear(),
    tersedia,
  };
  buku.push(baru);

  return response.status(201).json({
    success: true,
    message: "Buku berhasil ditambahkan",
    data: baru,
  });
});

// ---------- PATCH /buku/:id — partial update ----------
router.patch("/:id", (request, response) => {
  const id = Number(request.params.id);

  if (Number.isNaN(id)) {
    return response.status(400).json({
      success: false,
      message: "Parameter id harus berupa angka",
    });
  }

  const item = buku.find((b) => b.id === id);

  if (!item) {
    return response.status(404).json({
      success: false,
      message: `Buku dengan id ${id} tidak ditemukan`,
    });
  }

  // Hanya field yang diizinkan
  const { judul, penulis, tahun, tersedia } = request.body ?? {};

  if (judul !== undefined) {
    if (typeof judul !== "string" || judul.trim() === "") {
      return response.status(400).json({
        success: false,
        message: "Field 'judul' harus string non-kosong",
      });
    }
    item.judul = judul.trim();
  }

  if (penulis !== undefined) {
    if (typeof penulis !== "string" || penulis.trim() === "") {
      return response.status(400).json({
        success: false,
        message: "Field 'penulis' harus string non-kosong",
      });
    }
    item.penulis = penulis.trim();
  }

  if (tahun !== undefined) {
    if (!Number.isInteger(tahun) || tahun < 1900 || tahun > 2100) {
      return response.status(400).json({
        success: false,
        message: "Field 'tahun' harus bilangan bulat antara 1900 dan 2100",
      });
    }
    item.tahun = tahun;
  }

  if (tersedia !== undefined) {
    if (typeof tersedia !== "boolean") {
      return response.status(400).json({
        success: false,
        message: "Field 'tersedia' harus boolean",
      });
    }
    item.tersedia = tersedia;
  }

  return response.status(200).json({
    success: true,
    message: "Buku berhasil diperbarui",
    data: item,
  });
});

// ---------- DELETE /buku/:id — hapus ----------
router.delete("/:id", (request, response) => {
  const id = Number(request.params.id);

  if (Number.isNaN(id)) {
    return response.status(400).json({
      success: false,
      message: "Parameter id harus berupa angka",
    });
  }

  const index = buku.findIndex((b) => b.id === id);

  if (index === -1) {
    return response.status(404).json({
      success: false,
      message: `Buku dengan id ${id} tidak ditemukan`,
    });
  }

  const [dihapus] = buku.splice(index, 1);

  return response.status(200).json({
    success: true,
    message: "Buku berhasil dihapus",
    data: dihapus,
  });
});

export default router;