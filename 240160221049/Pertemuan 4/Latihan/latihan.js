/**
 * ============================================================
 * Pertemuan 4 — Latihan Individu: Routing & Middleware Express.js
 * ============================================================
 * Menerapkan:
 *   1. Middleware logger (waktu, method, URL)
 *   2. GET /buku/:id + 404 jika tidak ditemukan
 *   3. Query ?tersedia=true|false untuk filter
 *   4. POST /buku dengan validasi judul & penulis
 *   5. Handler 404 untuk endpoint tak tersedia
 *   6. Error middleware (500)
 *
 * Jalankan:
 *   node latihan.js
 *   PORT=3005 node latihan.js
 *
 * Uji:
 *   curl -i http://localhost:3005/buku
 *   curl -i "http://localhost:3005/buku?tersedia=true"
 *   curl -i http://localhost:3005/buku/1
 *   curl -i http://localhost:3005/buku/99
 *   curl -i -X POST http://localhost:3005/buku \
 *     -H "Content-Type: application/json" \
 *     -d '{"judul":"Clean Code","penulis":"Robert C. Martin"}'
 *   curl -i -X POST http://localhost:3005/buku \
 *     -H "Content-Type: application/json" -d '{"judul":""}'
 *   curl -i http://localhost:3005/tidak-ada
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
const port = Number(process.env.PORT ?? 3005);

// ---------- Data in-memory ----------
let nextId = 3;
const buku = [
  { id: 1, judul: "Belajar Node.js", penulis: "Andi", tersedia: true },
  { id: 2, judul: "Dasar Express.js", penulis: "Budi", tersedia: false },
];

// ---------- Middleware global ----------
// 1. Parser JSON — HARUS sebelum route POST
app.use(express.json());

// 2. Logger: waktu, method, URL
app.use((request, response, next) => {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${request.method} ${request.originalUrl}`);
  next();
});

// ---------- Routes ----------

// GET /buku — daftar + filter ?tersedia=true|false
app.get("/buku", (request, response) => {
  const { tersedia } = request.query;

  // Jika tidak ada query → tampilkan semua
  if (tersedia === undefined) {
    return response.status(200).json({
      success: true,
      total: buku.length,
      data: buku,
    });
  }

  // Validasi nilai query
  if (tersedia !== "true" && tersedia !== "false") {
    return response.status(400).json({
      success: false,
      message: "Query 'tersedia' harus 'true' atau 'false'",
    });
  }

  const filter = tersedia === "true";
  const data = buku.filter((item) => item.tersedia === filter);

  return response.status(200).json({
    success: true,
    filter: { tersedia: filter },
    total: data.length,
    data,
  });
});

// GET /buku/:id — detail + 404 jika tidak ditemukan
app.get("/buku/:id", (request, response) => {
  const id = Number(request.params.id);

  // Validasi: id harus angka
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

// POST /buku — tambah buku dengan validasi
app.post("/buku", (request, response) => {
  // Destructuring + default
  const { judul, penulis, tersedia = true } = request.body ?? {};

  // Validasi field wajib
  if (!judul || typeof judul !== "string" || judul.trim() === "") {
    return response.status(400).json({
      success: false,
      message: "Field 'judul' wajib diisi dan berupa string non-kosong",
    });
  }

  if (!penulis || typeof penulis !== "string" || penulis.trim() === "") {
    return response.status(400).json({
      success: false,
      message: "Field 'penulis' wajib diisi dan berupa string non-kosong",
    });
  }

  // Validasi tipe tersedia
  if (typeof tersedia !== "boolean") {
    return response.status(400).json({
      success: false,
      message: "Field 'tersedia' harus boolean (true/false)",
    });
  }

  const baru = {
    id: nextId++,
    judul: judul.trim(),
    penulis: penulis.trim(),
    tersedia,
  };
  buku.push(baru);

  return response.status(201).json({
    success: true,
    message: "Buku berhasil ditambahkan",
    data: baru,
  });
});

// ---------- Handler 404 — setelah semua route valid ----------
app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`,
  });
});

// ---------- Error middleware — 4 parameter, paling akhir ----------
app.use((error, request, response, next) => {
  console.error("Kesalahan aplikasi:", error.message);
  response.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

// ---------- Start server ----------
app.listen(port, () => {
  console.log(`Latihan berjalan di http://localhost:${port}`);
  console.log("Uji: curl -i http://localhost:3005/buku?tersedia=true");
});