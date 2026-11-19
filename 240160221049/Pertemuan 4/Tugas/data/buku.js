/**
 * Data buku in-memory untuk Tugas 2.
 * Sama seperti Tugas 1 (service.js), tetapi tanpa delay —
 * fokus pertemuan ini adalah routing & middleware.
 */

let nextId = 4;

export const buku = [
  { id: 1, judul: "Belajar Node.js", penulis: "Andi", tahun: 2024, tersedia: true },
  { id: 2, judul: "Dasar JavaScript", penulis: "Budi", tahun: 2023, tersedia: false },
  { id: 3, judul: "REST API untuk Pemula", penulis: "Citra", tahun: 2025, tersedia: true },
];

export const generateId = () => nextId++;