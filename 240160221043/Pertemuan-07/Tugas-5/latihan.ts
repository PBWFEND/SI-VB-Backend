import "dotenv/config";
import express from "express";
import { prisma } from "./client.ts";

const app = express();

app.use(express.json());

const PORT = Number(process.env.PORT) || 3009;

// Mengambil daftar pengguna
async function ambilDaftarPengguna(nim?: string) {
  const pengguna = await prisma.pengguna.findMany({
    where: nim ? { nim } : undefined,
  });

  return pengguna;
}

// GET daftar pengguna
app.get("/pengguna", async (req, res) => {
  try {
    const nim = req.query.nim as string | undefined;
    const pengguna = await ambilDaftarPengguna(nim);

    res.status(200).json({
      success: true,
      data: pengguna,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data pengguna",
    });
  }
});

// Membuat pengguna baru
async function buatPengguna(data: {
  nim: string;
  nama: string;
  email: string;
  role?: string;
}) {
  const pengguna = await prisma.pengguna.create({
    data: {
      nim: data.nim,
      nama: data.nama,
      email: data.email,
      role: data.role ?? "mahasiswa",
    },
  });

  return pengguna;
}

// Validasi data pengguna
function validasiPengguna(data: any): string[] {
  const errors: string[] = [];

  if (typeof data.nim !== "string" || !data.nim.trim()) {
    errors.push("NIM wajib diisi");
  }

  if (typeof data.nama !== "string" || !data.nama.trim()) {
    errors.push("Nama wajib diisi");
  }

  if (
    typeof data.email !== "string" ||
    !data.email.trim() ||
    !data.email.includes("@")
  ) {
    errors.push("Email tidak valid");
  }

  if (
    data.role !== undefined &&
    (typeof data.role !== "string" || !data.role.trim())
  ) {
    errors.push("Role harus berupa teks");
  }

  return errors;
}

// POST tambah pengguna
app.post("/pengguna", async (req, res) => {
  try {
    const errors = validasiPengguna(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        details: errors,
      });
    }

    const pengguna = await buatPengguna(req.body);

    return res.status(201).json({
      success: true,
      message: "Pengguna berhasil ditambahkan",
      data: pengguna,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal menambahkan pengguna",
    });
  }
});

// DELETE hapus pengguna
app.delete("/pengguna/:nim", async (req, res) => {
  try {
    const nim = req.params.nim;

    await prisma.pengguna.delete({
      where: { nim },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Pengguna tidak ditemukan",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});