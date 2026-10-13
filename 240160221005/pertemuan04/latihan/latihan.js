/**
 * Pertemuan 4 — Latihan Routing & Middleware Express.js
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
const port = 3005;

let buku = [
  { id: 1, judul: "Belajar Node.js", penulis: "Andi", tersedia: true },
  { id: 2, judul: "Dasar Express.js", penulis: "Budi", tersedia: false },
  { id: 3, judul: "REST API Modern", penulis: "Citra", tersedia: true },
];

let nextId = 4;

// Middleware logger
app.use((req, res, next) => {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());

// GET /buku
app.get("/buku", (req, res) => {
  const { tersedia } = req.query;
  const data =
    tersedia === undefined
      ? buku
      : buku.filter((item) => String(item.tersedia) === tersedia);
  res.json({ success: true, total: data.length, data });
});

// GET /buku/:id
app.get("/buku/:id", (req, res) => {
  const item = buku.find(({ id }) => id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ success: false, message: "Buku tidak ditemukan" });
  }
  return res.json({ success: true, data: item });
});

// POST /buku
app.post("/buku", (req, res) => {
  const { judul, penulis, tersedia } = req.body ?? {};
  if (!judul || !penulis) {
    return res.status(400).json({
      success: false,
      message: "Field 'judul' dan 'penulis' wajib diisi",
    });
  }
  const bukuBaru = {
    id: nextId++,
    judul,
    penulis,
    tersedia: typeof tersedia === "boolean" ? tersedia : true,
  };
  buku.push(bukuBaru);
  return res.status(201).json({
    success: true,
    message: "Buku berhasil ditambahkan",
    data: bukuBaru,
  });
});

// Handler 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
});

app.listen(port, () => {
  console.log(`Latihan berjalan di http://localhost:${port}`);
});