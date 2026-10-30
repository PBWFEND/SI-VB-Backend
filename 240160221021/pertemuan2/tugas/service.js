// service.js - Service layer Buku Perpustakaan (Node.js murni, tanpa Express)

// "Database" di memori
let buku = [
  { id: 1, judul: "Belajar Node.js", penulis: "Andi", tahun: 2024, stok: 3 },
  { id: 2, judul: "Dasar JavaScript", penulis: "Budi", tahun: 2023, stok: 0 },
  { id: 3, judul: "REST API untuk Pemula", penulis: "Citra", tahun: 2025, stok: 5 },
];
let nextId = 4;

// Simulasi akses database: selalu butuh waktu (100-300 ms)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Ambil semua buku
async function findAll() {
  await delay(100);
  return [...buku];
}

// Ambil satu buku, null jika tidak ditemukan
async function findById(id) {
  await delay(150);
  return buku.find((b) => b.id === Number(id)) ?? null;
}

// Tambah buku baru
async function create({ judul, penulis, tahun, stok = 0 }) {
  await delay(200);
  const baru = { id: nextId++, judul, penulis, tahun, stok };
  buku.push(baru);
  return baru;
}

// Ubah sebagian data buku, null jika tidak ditemukan
async function update(id, data) {
  await delay(250);
  const index = buku.findIndex((b) => b.id === Number(id));
  if (index === -1) return null;
  buku[index] = { ...buku[index], ...data, id: buku[index].id };
  return buku[index];
}

// Hapus buku, null jika tidak ditemukan
async function remove(id) {
  await delay(300);
  const index = buku.findIndex((b) => b.id === Number(id));
  if (index === -1) return null;
  const [dihapus] = buku.splice(index, 1);
  return dihapus;
}

// "delete" tidak bisa dipakai sebagai nama fungsi, jadi dipakai remove
// lalu diekspor dengan nama delete
module.exports = { findAll, findById, create, update, delete: remove };