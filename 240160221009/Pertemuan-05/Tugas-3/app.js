
import express from "express";

const app = express();

// =====================================================
// DATA MAHASISWA
// Diambil dari data Pertemuan 3
// =====================================================

const daftarMahasiswa = [
  {
    id: 1,
    nim: "240160221009",
    nama: "Disti Setiawati",
    prodi: "Sistem Informasi",
    semester: 5,
  },
  {
    id: 2,
    nim: "240160221010",
    nama: "Andi Saputra",
    prodi: "Sistem Informasi",
    semester: 5,
  },
  {
    id: 3,
    nim: "240160221011",
    nama: "Sinta Maharani",
    prodi: "Sistem Informasi",
    semester: 5,
  },
];

// =====================================================
// DATA ABSENSI
// Diambil dari data absensi Pertemuan 3
// =====================================================

let daftarAbsensi = [
  {
    id: 1,
    mahasiswaId: 1,
    mataKuliah: "Pemrograman Web Backend",
    pertemuan: 1,
    tanggal: "2026-09-29",
    status: "hadir",
  },
  {
    id: 2,
    mahasiswaId: 2,
    mataKuliah: "Pemrograman Web Backend",
    pertemuan: 1,
    tanggal: "2026-09-29",
    status: "izin",
  },
  {
    id: 3,
    mahasiswaId: 3,
    mataKuliah: "Pemrograman Web Backend",
    pertemuan: 1,
    tanggal: "2026-09-29",
    status: "hadir",
  },
  {
    id: 4,
    mahasiswaId: 1,
    mataKuliah: "Manajemen Proyek SI",
    pertemuan: 2,
    tanggal: "2026-10-06",
    status: "sakit",
  },
];

const STATUS_ABSENSI = [
  "hadir",
  "izin",
  "sakit",
  "alfa",
  "terlambat",
];

// =====================================================
// MIDDLEWARE LOGGER
// =====================================================

app.use((request, response, next) => {
  const waktu = new Date().toLocaleString("id-ID");

  console.log(
    `[${waktu}] ${request.method} ${request.originalUrl}`
  );

  next();
});

// Middleware JSON parser
app.use(express.json());

// =====================================================
// FUNGSI BANTU VALIDASI
// =====================================================

function validasiAbsensi(data, partial = false) {
  const errors = [];

  const fieldWajib = [
    "mahasiswaId",
    "mataKuliah",
    "pertemuan",
    "tanggal",
    "status",
  ];

  for (const field of fieldWajib) {
    const nilai = data[field];

    if (partial && nilai === undefined) {
      continue;
    }

    if (!partial && nilai === undefined) {
      errors.push(`${field} wajib diisi`);
      continue;
    }

    if (field === "mahasiswaId") {
      if (!Number.isInteger(nilai) || nilai <= 0) {
        errors.push("mahasiswaId harus berupa angka positif");
      } else if (
        !daftarMahasiswa.some((item) => item.id === nilai)
      ) {
        errors.push("Mahasiswa dengan ID tersebut tidak ditemukan");
      }
    }

    if (field === "mataKuliah") {
      if (typeof nilai !== "string" || nilai.trim() === "") {
        errors.push("mataKuliah wajib diisi");
      }
    }

    if (field === "pertemuan") {
      if (!Number.isInteger(nilai) || nilai < 1) {
        errors.push("pertemuan harus berupa angka positif");
      }
    }

    if (field === "tanggal") {
      const formatTanggal = /^\d{4}-\d{2}-\d{2}$/;
      const tanggalValid = new Date(nilai);

      if (
        typeof nilai !== "string" ||
        !formatTanggal.test(nilai) ||
        Number.isNaN(tanggalValid.getTime()) ||
        tanggalValid.toISOString().slice(0, 10) !== nilai
      ) {
        errors.push("tanggal harus menggunakan format YYYY-MM-DD");
      }
    }

    if (field === "status") {
      if (
        typeof nilai !== "string" ||
        !STATUS_ABSENSI.includes(nilai.toLowerCase())
      ) {
        errors.push(
          "status harus hadir, izin, sakit, alfa, atau terlambat"
        );
      }
    }
  }

  return errors;
}

// =====================================================
// ENDPOINT ROOT
// =====================================================

app.get("/", (request, response) => {
  return response.status(200).json({
    success: true,
    appName: "API Absensi Perkuliahan Mahasiswa",
    message: "RESTful API Pertemuan 5",
    endpoints: [
      "GET /absensi",
      "GET /absensi/:id",
      "POST /absensi",
      "PUT /absensi/:id",
      "PATCH /absensi/:id",
      "DELETE /absensi/:id",
    ],
  });
});

// =====================================================
// GET /absensi
// Menampilkan daftar dan filter absensi
// =====================================================

app.get("/absensi", (request, response) => {
  const {
    nim,
    mataKuliah,
    status,
    pertemuan,
  } = request.query;

  let hasil = [...daftarAbsensi];

  // Filter berdasarkan NIM mahasiswa
  if (nim !== undefined) {
    if (typeof nim !== "string" || nim.trim() === "") {
      return response.status(400).json({
        success: false,
        message: "Parameter nim tidak valid",
      });
    }

    const mahasiswa = daftarMahasiswa.find(
      (item) => item.nim === nim.trim()
    );

    hasil = mahasiswa
      ? hasil.filter(
          (item) => item.mahasiswaId === mahasiswa.id
        )
      : [];
  }

  // Filter berdasarkan mata kuliah
  if (mataKuliah !== undefined) {
    if (
      typeof mataKuliah !== "string" ||
      mataKuliah.trim() === ""
    ) {
      return response.status(400).json({
        success: false,
        message: "Parameter mataKuliah tidak valid",
      });
    }

    hasil = hasil.filter((item) =>
      item.mataKuliah
        .toLowerCase()
        .includes(mataKuliah.trim().toLowerCase())
    );
  }

  // Filter berdasarkan status kehadiran
  if (status !== undefined) {
    if (
      typeof status !== "string" ||
      !STATUS_ABSENSI.includes(status.toLowerCase())
    ) {
      return response.status(400).json({
        success: false,
        message: "Parameter status tidak valid",
      });
    }

    hasil = hasil.filter(
      (item) => item.status === status.toLowerCase()
    );
  }

  // Filter berdasarkan nomor pertemuan
  if (pertemuan !== undefined) {
    const angkaPertemuan = Number(pertemuan);

    if (!Number.isInteger(angkaPertemuan) || angkaPertemuan < 1) {
      return response.status(400).json({
        success: false,
        message: "Parameter pertemuan tidak valid",
      });
    }

    hasil = hasil.filter(
      (item) => item.pertemuan === angkaPertemuan
    );
  }

  return response.status(200).json({
    success: true,
    message: "Daftar absensi berhasil diambil",
    total: hasil.length,
    data: hasil,
  });
});

// =====================================================
// GET /absensi/:id
// Detail satu data absensi
// =====================================================

app.get("/absensi/:id", (request, response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return response.status(400).json({
      success: false,
      message: "ID absensi tidak valid",
    });
  }

  const absensi = daftarAbsensi.find(
    (item) => item.id === id
  );

  if (!absensi) {
    return response.status(404).json({
      success: false,
      message: "Data absensi tidak ditemukan",
    });
  }

  return response.status(200).json({
    success: true,
    message: "Detail absensi berhasil diambil",
    data: absensi,
  });
});

// =====================================================
// POST /absensi
// Menambahkan data absensi
// =====================================================

app.post("/absensi", (request, response) => {
  const body = request.body;

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    return response.status(400).json({
      success: false,
      message: "Body request tidak valid",
    });
  }

  const fieldDiizinkan = [
    "mahasiswaId",
    "mataKuliah",
    "pertemuan",
    "tanggal",
    "status",
  ];

  const fieldTidakDiizinkan = Object.keys(body).filter(
    (field) => !fieldDiizinkan.includes(field)
  );

  if (fieldTidakDiizinkan.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Terdapat field yang tidak diizinkan",
      errors: fieldTidakDiizinkan,
    });
  }

  const errors = validasiAbsensi(body);

  if (errors.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Data absensi tidak valid",
      errors,
    });
  }

  const absensiBaru = {
    id:
      daftarAbsensi.length > 0
        ? Math.max(...daftarAbsensi.map((item) => item.id)) + 1
        : 1,
    mahasiswaId: body.mahasiswaId,
    mataKuliah: body.mataKuliah.trim(),
    pertemuan: body.pertemuan,
    tanggal: body.tanggal,
    status: body.status.toLowerCase(),
  };

  daftarAbsensi.push(absensiBaru);

  return response.status(201).json({
    success: true,
    message: "Data absensi berhasil ditambahkan",
    data: absensiBaru,
  });
});

// =====================================================
// PUT /absensi/:id
// Mengganti seluruh data absensi
// =====================================================

app.put("/absensi/:id", (request, response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return response.status(400).json({
      success: false,
      message: "ID absensi tidak valid",
    });
  }

  const index = daftarAbsensi.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return response.status(404).json({
      success: false,
      message: "Data absensi tidak ditemukan",
    });
  }

  const body = request.body;

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    return response.status(400).json({
      success: false,
      message: "Body request tidak valid",
    });
  }

  const fieldDiizinkan = [
    "mahasiswaId",
    "mataKuliah",
    "pertemuan",
    "tanggal",
    "status",
  ];

  const fieldTidakDiizinkan = Object.keys(body).filter(
    (field) => !fieldDiizinkan.includes(field)
  );

  if (fieldTidakDiizinkan.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Terdapat field yang tidak diizinkan",
      errors: fieldTidakDiizinkan,
    });
  }

  const errors = validasiAbsensi(body);

  if (errors.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Data absensi tidak valid",
      errors,
    });
  }

  const absensiBaru = {
    id,
    mahasiswaId: body.mahasiswaId,
    mataKuliah: body.mataKuliah.trim(),
    pertemuan: body.pertemuan,
    tanggal: body.tanggal,
    status: body.status.toLowerCase(),
  };

  daftarAbsensi[index] = absensiBaru;

  return response.status(200).json({
    success: true,
    message: "Data absensi berhasil diganti",
    data: absensiBaru,
  });
});

// =====================================================
// PATCH /absensi/:id
// Mengubah sebagian data absensi
// =====================================================

app.patch("/absensi/:id", (request, response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return response.status(400).json({
      success: false,
      message: "ID absensi tidak valid",
    });
  }

  const index = daftarAbsensi.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return response.status(404).json({
      success: false,
      message: "Data absensi tidak ditemukan",
    });
  }

  const body = request.body;

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).length === 0
  ) {
    return response.status(400).json({
      success: false,
      message: "Body PATCH tidak boleh kosong",
    });
  }

  const fieldDiizinkan = [
    "mahasiswaId",
    "mataKuliah",
    "pertemuan",
    "tanggal",
    "status",
  ];

  const fieldTidakDiizinkan = Object.keys(body).filter(
    (field) => !fieldDiizinkan.includes(field)
  );

  if (fieldTidakDiizinkan.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Terdapat field yang tidak diizinkan",
      errors: fieldTidakDiizinkan,
    });
  }

  const errors = validasiAbsensi(body, true);

  if (errors.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Data absensi tidak valid",
      errors,
    });
  }

  const perubahan = { ...body };

  if (perubahan.mataKuliah !== undefined) {
    perubahan.mataKuliah = perubahan.mataKuliah.trim();
  }

  if (perubahan.status !== undefined) {
    perubahan.status = perubahan.status.toLowerCase();
  }

  daftarAbsensi[index] = {
    ...daftarAbsensi[index],
    ...perubahan,
  };

  return response.status(200).json({
    success: true,
    message: "Data absensi berhasil diperbarui",
    data: daftarAbsensi[index],
  });
});

// =====================================================
// DELETE /absensi/:id
// Menghapus data absensi
// =====================================================

app.delete("/absensi/:id", (request, response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return response.status(400).json({
      success: false,
      message: "ID absensi tidak valid",
    });
  }

  const index = daftarAbsensi.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return response.status(404).json({
      success: false,
      message: "Data absensi tidak ditemukan",
    });
  }

  daftarAbsensi.splice(index, 1);

  return response.status(204).send();
});

// =====================================================
// HANDLER 404
// Diletakkan setelah seluruh route
// =====================================================

app.use((request, response) => {
  return response.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// =====================================================
// ERROR HANDLER
// Diletakkan paling akhir
// =====================================================

app.use((error, request, response, next) => {
  console.error("Terjadi kesalahan:", error.message);

  if (response.headersSent) {
    return next(error);
  }

  const statusError = Number(
    error.status ?? error.statusCode
  );

  const statusCode =
    statusError >= 400 && statusError <= 599
      ? statusError
      : 500;

  return response.status(statusCode).json({
    success: false,
    message:
      statusCode < 500
        ? "Request tidak dapat diproses"
        : "Terjadi kesalahan pada server",
  });
});

export default app;
