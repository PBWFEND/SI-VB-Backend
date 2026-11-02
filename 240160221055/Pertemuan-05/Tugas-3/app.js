import express from "express";

import {
  getAllAnggota,
  getAnggotaById,
  createAnggota,
  updateAnggota,
  patchAnggota,
  deleteAnggota
} from "./service.js";

const app = express();

// Middleware untuk membaca JSON
app.use(express.json());

// Middleware untuk mencatat request
app.use((request, response, next) => {
  console.log(
    `[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`
  );

  next();
});

// Validasi ID pada route parameter
function validasiId(id) {
  return /^\d+$/.test(id) && Number(id) > 0;
}

// Validasi data anggota
function validasiAnggota(data, wajibSemua = true) {
  const fieldWajib = ["nama", "npm", "divisi"];

  for (const field of fieldWajib) {
    if (wajibSemua || data[field] !== undefined) {
      if (
        typeof data[field] !== "string" ||
        data[field].trim() === ""
      ) {
        return `Field ${field} wajib diisi dengan teks yang valid`;
      }
    }
  }

  if (data.nama !== undefined && data.nama.trim().length < 2) {
    return "Nama minimal terdiri dari 2 karakter";
  }

  if (
    data.npm !== undefined &&
    !/^\d{12}$/.test(data.npm.trim())
  ) {
    return "NPM harus terdiri dari 12 digit angka";
  }

  const fieldDiizinkan = ["nama", "npm", "divisi"];
  const fieldDikirim = Object.keys(data);

  if (fieldDikirim.some((field) => !fieldDiizinkan.includes(field))) {
    return "Request hanya boleh berisi field nama, npm, dan divisi";
  }

  return null;
}

// GET /anggota — menampilkan semua anggota dan filter
app.get("/anggota", (request, response) => {
  const { divisi, nama } = request.query;

  if (
    (divisi !== undefined && typeof divisi !== "string") ||
    (nama !== undefined && typeof nama !== "string")
  ) {
    return response.status(400).json({
      success: false,
      message: "Query divisi dan nama harus berupa teks"
    });
  }

  const data = getAllAnggota({ divisi, nama });

  return response.status(200).json({
    success: true,
    total: data.length,
    data
  });
});

// GET /anggota/:id — detail anggota
app.get("/anggota/:id", (request, response) => {
  const { id } = request.params;

  if (!validasiId(id)) {
    return response.status(400).json({
      success: false,
      message: "ID harus berupa bilangan bulat positif"
    });
  }

  const data = getAnggotaById(id);

  if (!data) {
    return response.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan"
    });
  }

  return response.status(200).json({
    success: true,
    data
  });
});

// POST /anggota — membuat anggota baru
app.post("/anggota", (request, response) => {
  const errorValidasi = validasiAnggota(request.body);

  if (errorValidasi) {
    return response.status(400).json({
      success: false,
      message: errorValidasi
    });
  }

  const npmSudahAda = getAllAnggota().some(
    (item) => item.npm === request.body.npm.trim()
  );

  if (npmSudahAda) {
    return response.status(400).json({
      success: false,
      message: "NPM sudah terdaftar"
    });
  }

  const data = createAnggota(request.body);

  return response.status(201).json({
    success: true,
    message: "Anggota berhasil ditambahkan",
    data
  });
});

// PUT /anggota/:id — mengganti seluruh data anggota
app.put("/anggota/:id", (request, response) => {
  const { id } = request.params;

  if (!validasiId(id)) {
    return response.status(400).json({
      success: false,
      message: "ID harus berupa bilangan bulat positif"
    });
  }

  const errorValidasi = validasiAnggota(request.body);

  if (errorValidasi) {
    return response.status(400).json({
      success: false,
      message: errorValidasi
    });
  }

  const anggotaLama = getAnggotaById(id);

  if (!anggotaLama) {
    return response.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan"
    });
  }

  const npmDipakai = getAllAnggota().some(
    (item) => item.id !== Number(id) &&
      item.npm === request.body.npm.trim()
  );

  if (npmDipakai) {
    return response.status(400).json({
      success: false,
      message: "NPM sudah digunakan anggota lain"
    });
  }

  const data = updateAnggota(id, request.body);

  return response.status(200).json({
    success: true,
    message: "Data anggota berhasil diganti",
    data
  });
});

// PATCH /anggota/:id — mengubah sebagian data anggota
app.patch("/anggota/:id", (request, response) => {
  const { id } = request.params;

  if (!validasiId(id)) {
    return response.status(400).json({
      success: false,
      message: "ID harus berupa bilangan bulat positif"
    });
  }

  const fieldDikirim = Object.keys(request.body);

  if (fieldDikirim.length === 0) {
    return response.status(400).json({
      success: false,
      message: "Minimal satu field harus dikirim"
    });
  }

  const errorValidasi = validasiAnggota(request.body, false);

  if (errorValidasi) {
    return response.status(400).json({
      success: false,
      message: errorValidasi
    });
  }

  const anggotaLama = getAnggotaById(id);

  if (!anggotaLama) {
    return response.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan"
    });
  }

  if (request.body.npm !== undefined) {
    const npmDipakai = getAllAnggota().some(
      (item) => item.id !== Number(id) &&
        item.npm === request.body.npm.trim()
    );

    if (npmDipakai) {
      return response.status(400).json({
        success: false,
        message: "NPM sudah digunakan anggota lain"
      });
    }
  }

  const data = patchAnggota(id, {
    ...request.body,
    ...(request.body.nama !== undefined
      ? { nama: request.body.nama.trim() }
      : {}),
    ...(request.body.npm !== undefined
      ? { npm: request.body.npm.trim() }
      : {}),
    ...(request.body.divisi !== undefined
      ? { divisi: request.body.divisi.trim() }
      : {})
  });

  return response.status(200).json({
    success: true,
    message: "Data anggota berhasil diperbarui",
    data
  });
});

// DELETE /anggota/:id — menghapus anggota
app.delete("/anggota/:id", (request, response) => {
  const { id } = request.params;

  if (!validasiId(id)) {
    return response.status(400).json({
      success: false,
      message: "ID harus berupa bilangan bulat positif"
    });
  }

  const berhasil = deleteAnggota(id);

  if (!berhasil) {
    return response.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan"
    });
  }

  return response.status(204).end();
});

// Handler untuk endpoint yang tidak terdaftar
app.use((request, response) => {
  return response.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan"
  });
});

// Error-handling middleware
app.use((error, request, response, next) => {
  console.error(error);

  if (response.headersSent) {
    return next(error);
  }

  return response.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server"
  });
});

export default app;