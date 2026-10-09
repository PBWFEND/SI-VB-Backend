/**
 * Pertemuan 4 — Latihan routing dan middleware Express.js
 * Tujuan: menerapkan route parameter, query parameter, dan middleware.
 * Jalankan: node latihan.js
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
const port = 3005;

// Data dummy
let buku = [
  { id: 1, judul: "Belajar Node.js", penulis: "Andi", tersedia: true },
  { id: 2, judul: "Dasar Express.js", penulis: "Budi", tersedia: false },
];

// 1. Middleware Logger (Waktu, Method, URL)
app.use((req, res, next) => {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());

// 3. Query parameter ?tersedia=true atau ?tersedia=false
app.get("/buku", (request, response) => {
  const { tersedia } = request.query;
  const data = tersedia === undefined
    ? buku
    : buku.filter((item) => String(item.tersedia) === tersedia);

  response.json({ success: true, total: data.length, data });
});

// 2. Endpoint GET /buku/:id dengan response 404 jika tidak ditemukan
app.get("/buku/:id", (request, response) => {
  const item = buku.find(({ id }) => id === Number(request.params.id));

  if (!item) {
    return response.status(404).json({ success: false, message: "Buku tidak ditemukan" });
  }

  return response.json({ success: true, data: item });
});

// 4. Endpoint POST /buku dengan field wajib judul dan penulis
app.post("/buku", (request, response) => {
  const { judul, penulis, tersedia } = request.body;

  // Validasi field wajib
  if (!judul || !penulis) {
    return response.status(400).json({ 
      success: false, 
      message: "Field 'judul' dan 'penulis' wajib diisi" 
    });
  }

  // Generate ID baru
  const newId = buku.length > 0 ? Math.max(...buku.map(b => b.id)) + 1 : 1;
  
  const bukuBaru = {
    id: newId,
    judul,
    penulis,
    tersedia: tersedia !== undefined ? tersedia : true, // default true jika tidak dikirim
  };

  buku.push(bukuBaru);

  return response.status(201).json({ 
    success: true, 
    message: "Buku berhasil ditambahkan", 
    data: bukuBaru 
  });
});

// 5. Handler 404 untuk endpoint yang tidak tersedia
app.use((request, response) => {
  response.status(404).json({ 
    success: false, 
    message: `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan` 
  });
});

app.listen(port, () => {
  console.log(`Latihan berjalan di http://localhost:${port}`);
  console.log("Uji: curl http://localhost:3005/buku?tersedia=true");
});