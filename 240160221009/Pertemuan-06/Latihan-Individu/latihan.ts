
import "dotenv/config";
import express from "express";
import { prisma } from "./client.ts";

const app = express();
const PORT = Number(process.env.PORT ?? 3008);

// Middleware untuk membaca JSON
app.use(express.json());

// Memeriksa apakah body merupakan objek JSON
function bodyObject(body) {
  return body !== null && typeof body === "object" && !Array.isArray(body);
}

// Validasi format email sederhana
function emailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validasi data saat membuat pengguna
function validasiPengguna(body) {
  const errors = [];

  if (!bodyObject(body)) {
    return ["Body harus berupa objek JSON"];
  }

  const fields = ["nim", "nama", "email", "role"];

  for (const field of fields) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      errors.push(`${field} wajib diisi dengan teks`);
    }
  }

  if (
    typeof body.email === "string" &&
    body.email.trim() &&
    !emailValid(body.email.trim())
  ) {
    errors.push("Format email tidak valid");
  }

  return errors;
}

// Validasi data saat memperbarui sebagian pengguna
function validasiPatch(body) {
  const errors = [];

  if (!bodyObject(body)) {
    return ["Body harus berupa objek JSON"];
  }

  const allowedFields = ["nama", "email", "role"];
  const fields = Object.keys(body);

  if (fields.length === 0) {
    errors.push("Minimal satu field harus dikirim");
  }

  for (const field of fields) {
    if (!allowedFields.includes(field)) {
      errors.push(`Field ${field} tidak boleh diperbarui`);
      continue;
    }

    if (typeof body[field] !== "string" || !body[field].trim()) {
      errors.push(`${field} harus berupa teks dan tidak boleh kosong`);
    }
  }

  if (
    typeof body.email === "string" &&
    body.email.trim() &&
    !emailValid(body.email.trim())
  ) {
    errors.push("Format email tidak valid");
  }

  return errors;
}

// Halaman utama API
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "API Pengguna Pertemuan 06",
    endpoints: [
      "GET /pengguna/:nim",
      "POST /pengguna",
      "PATCH /pengguna/:nim",
      "DELETE /pengguna/:nim",
    ],
  });
});

// GET detail pengguna berdasarkan NIM
app.get("/pengguna/:nim", async (req, res) => {
  const nimRaw = req.params.nim;
  const nim = typeof nimRaw === "string" ? nimRaw.trim() : "";

  if (!nim) {
    return res.status(400).json({
      success: false,
      message: "NIM harus diisi",
    });
  }

  const pengguna = await prisma.pengguna.findUnique({
    where: { nim },
  });

  if (!pengguna) {
    return res.status(404).json({
      success: false,
      message: "Pengguna tidak ditemukan",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Detail pengguna berhasil diambil",
    data: pengguna,
  });
});

// POST menambahkan pengguna baru
app.post("/pengguna", async (req, res) => {
  const errors = validasiPengguna(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Data pengguna tidak valid",
      errors,
    });
  }

  const { nim, nama, email, role } = req.body;

  const pengguna = await prisma.pengguna.create({
    data: {
      nim: nim.trim(),
      nama: nama.trim(),
      email: email.trim(),
      role: role.trim(),
    },
  });

  return res.status(201).json({
    success: true,
    message: "Pengguna berhasil ditambahkan",
    data: pengguna,
  });
});

// PATCH memperbarui sebagian data pengguna
app.patch("/pengguna/:nim", async (req, res) => {
  const nimRaw = req.params.nim;
  const nim = typeof nimRaw === "string" ? nimRaw.trim() : "";

  if (!nim) {
    return res.status(400).json({
      success: false,
      message: "NIM harus diisi",
    });
  }

  const errors = validasiPatch(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Data perubahan tidak valid",
      errors,
    });
  }

  const penggunaLama = await prisma.pengguna.findUnique({
    where: { nim },
  });

  if (!penggunaLama) {
    return res.status(404).json({
      success: false,
      message: "Pengguna tidak ditemukan",
    });
  }

  const data = {};

  if (typeof req.body.nama === "string") {
    data.nama = req.body.nama.trim();
  }

  if (typeof req.body.email === "string") {
    data.email = req.body.email.trim();
  }

  if (typeof req.body.role === "string") {
    data.role = req.body.role.trim();
  }

  const penggunaDiperbarui = await prisma.pengguna.update({
    where: { nim },
    data,
  });

  return res.status(200).json({
    success: true,
    message: "Data pengguna berhasil diperbarui",
    data: penggunaDiperbarui,
  });
});

// DELETE menghapus pengguna berdasarkan NIM
app.delete("/pengguna/:nim", async (req, res) => {
  const nimRaw = req.params.nim;
  const nim = typeof nimRaw === "string" ? nimRaw.trim() : "";

  if (!nim) {
    return res.status(400).json({
      success: false,
      message: "NIM harus diisi",
    });
  }

  const pengguna = await prisma.pengguna.findUnique({
    where: { nim },
  });

  if (!pengguna) {
    return res.status(404).json({
      success: false,
      message: "Pengguna tidak ditemukan",
    });
  }

  await prisma.pengguna.delete({
    where: { nim },
  });

  return res.status(204).end();
});

// Endpoint yang tidak ditemukan
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Penanganan error
app.use((error, req, res, next) => {
  console.error("Terjadi kesalahan:", error);

  if (error.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "NIM atau email sudah terdaftar",
    });
  }

  if (error.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "Pengguna tidak ditemukan",
    });
  }

  const status = Number(error.status ?? 500);
  const statusCode =
    status >= 400 && status < 600 ? status : 500;

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 400
        ? "Format JSON tidak valid"
        : "Terjadi kesalahan pada server",
  });
});

// Menjalankan server
const server = app.listen(PORT, () => {
  console.log(
    `API Pengguna berjalan di http://localhost:${PORT}`
  );
});

// Menutup koneksi Prisma ketika server dihentikan
async function shutdown() {
  server.close(async () => {
    await prisma.$disconnect();
    console.log("Koneksi database berhasil ditutup");
    process.exit(0);
  });
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
