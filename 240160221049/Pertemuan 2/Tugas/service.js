/**
 * ============================================================
 * Tugas 1 — Service Layer API Perpustakaan
 * ============================================================
 * Node.js murni (tanpa Express). Database in-memory.
 * Semua fungsi async + simulasi delay 100-300ms.
 *
 * Jalankan bersama demo.js:
 *   node demo.js
 */

import { setTimeout as delay } from "node:timers/promises";

// ---------- "Database" in-memory ----------
let buku = [
  { id: 1, judul: "Belajar Node.js", penulis: "Andi", tahun: 2024, stok: 3 },
  { id: 2, judul: "Dasar JavaScript", penulis: "Budi", tahun: 2023, stok: 0 },
  { id: 3, judul: "REST API untuk Pemula", penulis: "Citra", tahun: 2025, stok: 5 },
];
let nextId = 4;

// ---------- Service Functions ----------
// findAll: daftar semua buku
export async function findAll() {
  await delay(100); // simulasi SELECT *
  return buku;
}

// findById: detail satu buku, null jika tidak ditemukan
export async function findById(id) {
  await delay(150); // simulasi SELECT WHERE id
  return buku.find((b) => b.id === Number(id)) ?? null;
}

// create: tambah buku baru (destructuring + default stok=0)
export async function create({ judul, penulis, tahun, stok = 0 }) {
  await delay(100);
  const baru = { id: nextId++, judul, penulis, tahun, stok };
  buku.push(baru);
  return baru;
}

// update: ubah sebagian field (partial update ala PATCH)
export async function update(id, data) {
  const found = await findById(id);
  if (!found) return null;
  Object.assign(found, data); // partial update
  await delay(100);
  return found;
}

// delete: hapus buku, return object yang dihapus atau null
export async function remove(id) {
  await delay(100);
  const index = buku.findIndex((b) => b.id === Number(id));
  if (index === -1) return null;
  const [dihapus] = buku.splice(index, 1);
  return dihapus;
}