// penerjaan tugas ini dibantu dengan AI chatgpt


import express from "express";

const app = express();
const PORT = 3000;

// Data buku sementara
let buku = [
  {
    id: 1,
    judul: "Belajar Node.js",
    penulis: "Budi",
    tersedia: true
  },
  {
    id: 2,
    judul: "Dasar Pemrograman",
    penulis: "Andi",
    tersedia: false
  }
];

app.use(express.json());

// 1. Middleware logger
app.use((req, res, next) => {
  console.log(
    `[${new Date().toLocaleString("id-ID")}] ${req.method} ${req.originalUrl}`
  );
  next();
});

// 2. GET semua buku + filter ketersediaan
app.get("/buku", (req, res) => {
  let hasil = buku;

  const tersedia = req.query.tersedia;

  if (tersedia === "true") {
    hasil = buku.filter((item) => item.tersedia === true);
  } else if (tersedia === "false") {
    hasil = buku.filter((item) => item.tersedia === false);
  }

  res.status(200).json({
    success: true,
    total: hasil.length,
    data: hasil
  });
});

// 3. GET buku berdasarkan ID
app.get("/buku/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = buku.find((item) => item.id === id);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Buku tidak ditemukan"
    });
  }

  res.status(200).json({
    success: true,
    data
  });
});

// 4. POST tambah buku
app.post("/buku", (req, res) => {
  const { judul, penulis } = req.body;

  if (
    typeof judul !== "string" ||
    !judul.trim() ||
    typeof penulis !== "string" ||
    !penulis.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Field judul dan penulis wajib diisi"
    });
  }

  const dataBaru = {
    id: buku.length
      ? Math.max(...buku.map((item) => item.id)) + 1
      : 1,
    judul: judul.trim(),
    penulis: penulis.trim(),
    tersedia: true
  };

  buku.push(dataBaru);

  res.status(201).json({
    success: true,
    message: "Buku berhasil ditambahkan",
    data: dataBaru
  });
});

// 5. Handler 404 untuk endpoint yang tidak tersedia
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan"
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
