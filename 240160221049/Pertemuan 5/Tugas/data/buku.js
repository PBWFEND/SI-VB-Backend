/**
 * Data buku in-memory (belum pakai database — akan diganti pada Pertemuan 6).
 * Field:
 *   id       : number (auto-increment)
 *   judul    : string (wajib)
 *   penulis  : string (wajib)
 *   tahun    : integer 1900–2100 (wajib)
 *   stok     : integer >= 0 (wajib)
 *   kategori : string (opsional)
 */

let nextId = 4;

export const buku = [
  { id: 1, judul: "Belajar Node.js", penulis: "Andi", tahun: 2024, stok: 3, kategori: "Pemrograman" },
  { id: 2, judul: "Dasar Express.js", penulis: "Budi", tahun: 2025, stok: 0, kategori: "Pemrograman" },
  { id: 3, judul: "REST API untuk Pemula", penulis: "Citra", tahun: 2025, stok: 5, kategori: "Web" },
];

export const generateId = () => nextId++;