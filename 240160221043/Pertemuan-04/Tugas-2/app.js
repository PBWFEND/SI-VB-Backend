
import express from "express";

const app = express();

app.use(express.json());

// Middleware logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Data mahasiswa sementara
let mahasiswa = [
  {
    id: 1,
    nim: "240160221001",
    nama: "Andi Saputra",
    prodi: "Sistem Informasi",
    semester: 5
  },
  {
    id: 2,
    nim: "240160221002",
    nama: "Budi Santoso",
    prodi: "Sistem Informasi",
    semester: 5
  }
];

// GET daftar mahasiswa + pencarian nama
app.get("/mahasiswa", (req, res) => {
  let hasil = mahasiswa;

  if (req.query.nama) {
    hasil = mahasiswa.filter((item) =>
      item.nama.toLowerCase().includes(req.query.nama.toLowerCase())
    );
  }

  res.status(200).json({
    pesan: "Daftar mahasiswa berhasil diambil",
    data: hasil
  });
});

// GET detail mahasiswa berdasarkan ID
app.get("/mahasiswa/:id", (req, res) => {
  const id = Number(req.params.id);
  const hasil = mahasiswa.find((item) => item.id === id);

  if (!hasil) {
    return res.status(404).json({
      pesan: "Mahasiswa tidak ditemukan"
    });
  }

  res.status(200).json({
    pesan: "Detail mahasiswa berhasil diambil",
    data: hasil
  });
});

// POST tambah mahasiswa
app.post("/mahasiswa", (req, res) => {
  const { nim, nama, prodi, semester } = req.body;

  if (
    !nim ||
    !nama ||
    !prodi ||
    semester === undefined ||
    semester === null ||
    semester === ""
  ) {
    return res.status(400).json({
      pesan: "NIM, nama, prodi, dan semester wajib diisi"
    });
  }

  const mahasiswaBaru = {
    id: mahasiswa.length
      ? Math.max(...mahasiswa.map((item) => item.id)) + 1
      : 1,
    nim,
    nama,
    prodi,
    semester: Number(semester)
  };

  mahasiswa.push(mahasiswaBaru);

  res.status(201).json({
    pesan: "Mahasiswa berhasil ditambahkan",
    data: mahasiswaBaru
  });
});

// PUT ubah data mahasiswa
app.put("/mahasiswa/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = mahasiswa.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      pesan: "Mahasiswa tidak ditemukan"
    });
  }

  const { nim, nama, prodi, semester } = req.body;

  if (
    !nim ||
    !nama ||
    !prodi ||
    semester === undefined ||
    semester === null ||
    semester === ""
  ) {
    return res.status(400).json({
      pesan: "NIM, nama, prodi, dan semester wajib diisi"
    });
  }

  mahasiswa[index] = {
    id,
    nim,
    nama,
    prodi,
    semester: Number(semester)
  };

  res.status(200).json({
    pesan: "Data mahasiswa berhasil diubah",
    data: mahasiswa[index]
  });
});

// DELETE mahasiswa
app.delete("/mahasiswa/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = mahasiswa.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      pesan: "Mahasiswa tidak ditemukan"
    });
  }

  mahasiswa.splice(index, 1);

  res.status(200).json({
    pesan: "Mahasiswa berhasil dihapus"
  });
});

// Handler 404 untuk endpoint yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    pesan: "Endpoint tidak ditemukan"
  });
});

// Error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    pesan: "Terjadi kesalahan pada server"
  });
});

export default app;
