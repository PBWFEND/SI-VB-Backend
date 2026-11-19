/**
 * ============================================================
 * Tugas 1 — Demo Script
 * ============================================================
 * Menjalankan minimal 4 operasi service + 1 Promise.all()
 * dengan dua kueri paralel + try/catch untuk id tidak ditemukan.
 *
 * Jalankan:
 *   node demo.js
 */

import { findAll, findById, create, update, remove } from "./service.js";
import { demoRefactor } from "./refactor.js";

const garis = (label) => console.log(`\n=== ${label} ===`);

// ============================================================
// 1. findAll — daftar semua buku
// ============================================================
garis("1. findAll()");
const semua = await findAll();
console.log(`Total: ${semua.length} buku`);
semua.forEach(({ id, judul, stok }) =>
  console.log(`  [${id}] ${judul} — stok: ${stok}`)
);

// ============================================================
// 2. findById — detail satu buku
// ============================================================
garis("2. findById(1)");
const detail = await findById(1);
console.log("Detail:", detail);

// ============================================================
// 3. create — tambah buku baru
// ============================================================
garis("3. create()");
const bukuBaru = await create({
  judul: "Async JS Handbook",
  penulis: "Dewi",
  tahun: 2025,
  stok: 2,
});
console.log("Buku baru:", bukuBaru);

// ============================================================
// 4. update — partial update (PATCH)
// ============================================================
garis("4. update(2, { stok: 4 })");
const diubah = await update(2, { stok: 4 });
console.log("Setelah update:", diubah);

// ============================================================
// 5. remove — hapus buku
// ============================================================
garis("5. remove(3)");
const dihapus = await remove(3);
console.log("Dihapus:", dihapus);

// ============================================================
// 6. Promise.all — dua kueri paralel
// ============================================================
garis("6. Promise.all() — paralel");
const mulai = Date.now();

const [totalBuku, bukuHabis] = await Promise.all([
  findAll().then((all) => all.length),
  findAll().then((all) => all.filter((b) => b.stok === 0).length),
]);

const durasi = Date.now() - mulai;
console.log(`Total buku: ${totalBuku}, stok habis: ${bukuHabis}`);
console.log(`Waktu paralel: ±${durasi}ms (bukan 200ms sekuensial)`);

// ============================================================
// 7. try/catch — id tidak ditemukan
// ============================================================
garis("7. try/catch — id 999 tidak ada");
try {
  const tidakAda = await findById(999);
  if (tidakAda === null) {
    throw new Error("Buku dengan id 999 tidak ditemukan (HTTP 404)");
  }
  console.log("Detail:", tidakAda);
} catch (err) {
  console.log("Tertangkap:", err.message);
}

// ============================================================
// 8. Demo refactor kode warisan
// ============================================================
demoRefactor();

console.log("\n✅ Semua demo selesai tanpa error.");