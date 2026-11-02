
/**
 * Pertemuan 4 — Latihan routing dan middleware Express.js
 * Jalankan: node latihan.js
 */

import express from "express";

const app = express();
app.disable("x-powered-by");

const port = 3005;

const buku = [
  {
    id: 1,
    judul: "Belajar Node.js",
    penulis: "Andi",
    tersedia: true,
  },
  {
    id: 2,
    judul: "Dasar Express.js",
    penulis: "Budi",
    tersedia: false,
  },
];

app.use(express.json());

// 1. Middleware logger
app.use((request, response, next) => {
  console.log(
    `[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`
  );
  next();
});

// 2 dan 3. GET semua buku + filter ketersediaan
app.get("/buku", (request, response) => {
  const { tersedia } = request.query;

  if (
    tersedia !== undefined &&
    tersedia !== "true" &&
    tersedia !== "false"
  ) {
    return response.status(400).json({
      success: false,
      message: "Query tersedia harus true atau false",
    });
  }

  const data =
    tersedia === undefined
      ? buku
      : buku.filter(
          (item) => String(item.tersedia) === tersedia
        );

  return response.status(200).json({
    success: true,
    total: data.length,
    data,
  });
});

// 4. GET buku berdasarkan ID
app.get("/buku/:id", (request, response) => {
  const id = Number(request.params.id);

  const item = buku.find((item) => item.id === id);

  if (!Number.isInteger(id) || !item) {
    return response.status(404).json({
      success: false,
      message: "Buku tidak ditemukan",
    });
  }

  return response.status(200).json({
    success: true,
    data: item,
  });
});

// 5. POST menambahkan buku
app.post("/buku", (request, response) => {
  const { judul, penulis, tersedia } = request.body ?? {};

  if (
    typeof judul !== "string" ||
    !judul.trim() ||
    typeof penulis !== "string" ||
    !penulis.trim()
  ) {
    return response.status(400).json({
      success: false,
      message: "Field judul dan penulis wajib diisi",
    });
  }

  if (
    tersedia !== undefined &&
    typeof tersedia !== "boolean"
  ) {
    return response.status(400).json({
      success: false,
      message: "Field tersedia harus berupa true atau false",
    });
  }

  const bukuBaru = {
    id: Math.max(0, ...buku.map((item) => item.id)) + 1,
    judul: judul.trim(),
    penulis: penulis.trim(),
    tersedia: tersedia ?? true,
  };

  buku.push(bukuBaru);

  return response.status(201).json({
    success: true,
    message: "Buku berhasil ditambahkan",
    data: bukuBaru,
  });
});

// 6. Handler 404 untuk endpoint yang tidak tersedia
app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`,
  });
});

app.listen(port, () => {
  console.log(`Latihan berjalan di http://localhost:${port}`);
});
