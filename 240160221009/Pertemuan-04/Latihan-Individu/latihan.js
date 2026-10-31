
import express from "express";

const app = express();
const PORT = Number(process.env.PORT ?? 3005);

// Data buku sementara di memory
let daftarBuku = [
  {
    id: 1,
    judul: "Laskar Pelangi",
    penulis: "Andrea Hirata",
    tersedia: true,
  },
  {
    id: 2,
    judul: "Bumi",
    penulis: "Tere Liye",
    tersedia: false,
  },
  {
    id: 3,
    judul: "Atomic Habits",
    penulis: "James Clear",
    tersedia: true,
  },
];

// MIDDLEWARE 1: Logger
app.use((request, response, next) => {
  const waktu = new Date().toLocaleString("id-ID");

  console.log(
    `[${waktu}] ${request.method} ${request.originalUrl}`
  );

  next();
});

// MIDDLEWARE 2: Membaca JSON dari request body
app.use(express.json());

// GET /buku
// Menampilkan seluruh buku atau memfilter berdasarkan ketersediaan
app.get("/buku", (request, response) => {
  const { tersedia } = request.query;

  let hasil = daftarBuku;

  if (tersedia !== undefined) {
    if (tersedia !== "true" && tersedia !== "false") {
      return response.status(400).json({
        success: false,
        message: "Query tersedia harus bernilai true atau false",
      });
    }

    const statusTersedia = tersedia === "true";

    hasil = daftarBuku.filter(
      (buku) => buku.tersedia === statusTersedia
    );
  }

  return response.status(200).json({
    success: true,
    total: hasil.length,
    data: hasil,
  });
});

// GET /buku/:id
// Menampilkan detail buku berdasarkan ID
app.get("/buku/:id", (request, response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return response.status(400).json({
      success: false,
      message: "ID buku harus berupa bilangan bulat positif",
    });
  }

  const buku = daftarBuku.find((item) => item.id === id);

  if (!buku) {
    return response.status(404).json({
      success: false,
      message: "Buku tidak ditemukan",
    });
  }

  return response.status(200).json({
    success: true,
    data: buku,
  });
});

// POST /buku
// Menambahkan buku baru
app.post("/buku", (request, response) => {
  const { judul, penulis } = request.body ?? {};

  if (
    typeof judul !== "string" ||
    judul.trim() === "" ||
    typeof penulis !== "string" ||
    penulis.trim() === ""
  ) {
    return response.status(400).json({
      success: false,
      message: "Field judul dan penulis wajib diisi",
    });
  }

  const bukuBaru = {
    id:
      daftarBuku.length > 0
        ? Math.max(...daftarBuku.map((item) => item.id)) + 1
        : 1,
    judul: judul.trim(),
    penulis: penulis.trim(),
    tersedia: true,
  };

  daftarBuku.push(bukuBaru);

  return response.status(201).json({
    success: true,
    message: "Buku berhasil ditambahkan",
    data: bukuBaru,
  });
});

// HANDLER 404: Endpoint tidak ditemukan
app.use((request, response) => {
  return response.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// ERROR HANDLER: Penanganan kesalahan server
app.use((error, request, response, next) => {
  console.error("Terjadi kesalahan:", error.message);

  const statusCode =
    error.status >= 400 && error.status < 500
      ? error.status
      : 500;

  return response.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Terjadi kesalahan pada server"
        : "Request tidak dapat diproses",
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`API Perpustakaan berjalan di http://localhost:${PORT}`);
});
