
import express from "express";
import { prisma } from "./client.ts";

const app = express();
const PORT = Number(process.env.PORT) || 3008;

app.use(express.json());

// Tipe data pengguna
interface DataPengguna {
  nim: string;
  nama: string;
  email: string;
  role: string;
}

// TODO 1: Mengambil daftar pengguna dengan filter NIM opsional
async function ambilDaftarPengguna(nim?: string) {
  return await prisma.pengguna.findMany({
    where: nim ? { nim } : undefined,
    orderBy: { id: "asc" },
  });
}

// TODO 2A: Validasi data pengguna
function validasiPengguna(data: unknown): {
  valid: boolean;
  errors: string[];
  data?: DataPengguna;
} {
  const errors: string[] = [];

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return {
      valid: false,
      errors: ["Body harus berupa object"],
    };
  }

  const body = data as Record<string, unknown>;

  if (typeof body.nim !== "string" || !body.nim.trim()) {
    errors.push("NIM wajib diisi");
  }

  if (typeof body.nama !== "string" || !body.nama.trim()) {
    errors.push("Nama wajib diisi");
  }

  if (
    typeof body.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())
  ) {
    errors.push("Email tidak valid");
  }

  if (typeof body.role !== "string" || !body.role.trim()) {
    errors.push("Role wajib diisi");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: {
      nim: (body.nim as string).trim(),
      nama: (body.nama as string).trim(),
      email: (body.email as string).trim(),
      role: (body.role as string).trim(),
    },
  };
}

// TODO 2B: Menyimpan pengguna ke database
async function buatPengguna(data: DataPengguna) {
  return await prisma.pengguna.create({
    data,
  });
}

// GET /pengguna?nim=...
app.get("/pengguna", async (req, res) => {
  try {
    const nim =
      typeof req.query.nim === "string" ? req.query.nim : undefined;

    const pengguna = await ambilDaftarPengguna(nim);

    res.status(200).json({
      message: "Data pengguna berhasil diambil",
      data: pengguna,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data pengguna",
    });
  }
});

// TODO 3: Endpoint POST /pengguna
app.post("/pengguna", async (req, res) => {
  const hasilValidasi = validasiPengguna(req.body);

  if (!hasilValidasi.valid || !hasilValidasi.data) {
    return res.status(400).json({
      message: "Validasi gagal",
      errors: hasilValidasi.errors,
    });
  }

  try {
    const pengguna = await buatPengguna(hasilValidasi.data);

    return res.status(201).json({
      message: "Pengguna berhasil ditambahkan",
      data: pengguna,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        message: "NIM atau email sudah digunakan",
      });
    }

    return res.status(500).json({
      message: "Gagal menambahkan pengguna",
    });
  }
});

// TODO 4: Endpoint DELETE /pengguna/:nim
app.delete("/pengguna/:nim", async (req, res) => {
  try {
    const nim = req.params.nim;

    const pengguna = await prisma.pengguna.findUnique({
      where: { nim },
    });

    if (!pengguna) {
      return res.status(404).json({
        message: "Pengguna tidak ditemukan",
      });
    }

    await prisma.pengguna.delete({
      where: { nim },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: "Gagal menghapus pengguna",
    });
  }
});

// Menangani endpoint yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint tidak ditemukan",
  });
});

// Menangani error JSON atau error lainnya
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (res.headersSent) return next(error);

  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({
      message: "Format JSON tidak valid",
    });
  }

  return res.status(500).json({
    message: "Terjadi kesalahan pada server",
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
