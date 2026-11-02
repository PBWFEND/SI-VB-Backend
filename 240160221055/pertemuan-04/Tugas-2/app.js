const express = require("express");

const {
  findAll,
  findById,
  create,
  update,
  delete: deleteData
} = require("./service");

const app = express();

app.disable("x-powered-by");

// Middleware JSON
app.use(express.json());

// Middleware logger
app.use((request, response, next) => {
  const waktu = new Date().toISOString();

  console.log(
    `[${waktu}] ${request.method} ${request.originalUrl}`
  );

  next();
});

// GET /anggota
// Menampilkan semua anggota
// Mendukung query parameter ?divisi=Backend
app.get("/anggota", async (request, response, next) => {
  try {
    const { divisi } = request.query;

    const semuaAnggota = await findAll();

    const data = divisi
      ? semuaAnggota.filter(
          (item) =>
            item.divisi.toLowerCase() === divisi.toLowerCase()
        )
      : semuaAnggota;

    return response.status(200).json({
      success: true,
      total: data.length,
      data
    });
  } catch (error) {
    next(error);
  }
});

// GET /anggota/:id
// Menampilkan anggota berdasarkan ID
app.get("/anggota/:id", async (request, response, next) => {
  try {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return response.status(400).json({
        success: false,
        message: "ID harus berupa angka"
      });
    }

    const anggota = await findById(id);

    if (!anggota) {
      return response.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan"
      });
    }

    return response.status(200).json({
      success: true,
      data: anggota
    });
  } catch (error) {
    next(error);
  }
});

// POST /anggota
// Menambahkan anggota baru
app.post("/anggota", async (request, response, next) => {
  try {
    const { nama, npm, divisi } = request.body;

    // Validasi field wajib
    if (!nama || !npm || !divisi) {
      return response.status(400).json({
        success: false,
        message: "Field nama, npm, dan divisi wajib diisi"
      });
    }

    const anggotaBaru = await create({
      nama,
      npm,
      divisi
    });

    return response.status(201).json({
      success: true,
      message: "Anggota berhasil ditambahkan",
      data: anggotaBaru
    });
  } catch (error) {
    next(error);
  }
});

// PUT /anggota/:id
// Mengubah data anggota
app.put("/anggota/:id", async (request, response, next) => {
  try {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return response.status(400).json({
        success: false,
        message: "ID harus berupa angka"
      });
    }

    const { nama, npm, divisi } = request.body;

    if (!nama && !npm && !divisi) {
      return response.status(400).json({
        success: false,
        message: "Minimal satu data harus dikirim untuk diperbarui"
      });
    }

    const dataUpdate = {};

    if (nama) {
      dataUpdate.nama = nama;
    }

    if (npm) {
      dataUpdate.npm = npm;
    }

    if (divisi) {
      dataUpdate.divisi = divisi;
    }

    const anggotaUpdate = await update(id, dataUpdate);

    if (!anggotaUpdate) {
      return response.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan"
      });
    }

    return response.status(200).json({
      success: true,
      message: "Anggota berhasil diperbarui",
      data: anggotaUpdate
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /anggota/:id
// Menghapus anggota
app.delete("/anggota/:id", async (request, response, next) => {
  try {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return response.status(400).json({
        success: false,
        message: "ID harus berupa angka"
      });
    }

    const anggotaDihapus = await deleteData(id);

    if (!anggotaDihapus) {
      return response.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan"
      });
    }

    return response.status(200).json({
      success: true,
      message: "Anggota berhasil dihapus",
      data: anggotaDihapus
    });
  } catch (error) {
    next(error);
  }
});

// Handler 404
app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan"
  });
});

// Error middleware
app.use((error, request, response, next) => {
  console.error("Error:", error);

  response.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server"
  });
});

module.exports = app;