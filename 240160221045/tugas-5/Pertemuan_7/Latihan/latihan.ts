
import express from "express";
import { prisma } from "./client.ts";

const app = express();

app.use(express.json());

// TODO 1 — Mengambil daftar pengguna, dengan filter NIM opsional
export const ambilDaftarPengguna = async (nim?: string) => {
  return prisma.pengguna.findMany({
    where: nim ? { nim } : undefined,
    orderBy: { nim: "asc" },
  });
};

// TODO 2 — Operasi membuat pengguna
// Validasi input dilakukan pada handler POST, sedangkan fungsi ini
// bertanggung jawab menjalankan operasi database.
export const buatPengguna = async (data: {
  nim: string;
  nama: string;
  email: string;
  role?: string;
}) => {
  return prisma.pengguna.create({
    data: {
      nim: data.nim,
      nama: data.nama,
      email: data.email,
      role: data.role ?? "mahasiswa",
    },
  });
};

const penggunaRoutes = express.Router();

penggunaRoutes.get("/", async (request, response) => {
  const nimFilter =
    typeof request.query.nim === "string"
      ? request.query.nim.trim()
      : undefined;

  const data = await ambilDaftarPengguna(nimFilter || undefined);

  return response.status(200).json({
    success: true,
    message: "Daftar pengguna",
    data,
  });
});

// TODO 3 — POST /pengguna
penggunaRoutes.post("/", async (request, response) => {
  const body: unknown = request.body;
  const details: string[] = [];

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return response.status(400).json({
      success: false,
      message: "Data pengguna harus berupa object",
      details: ["Body request tidak valid"],
    });
  }

  const data = body as Record<string, unknown>;

  if (typeof data.nim !== "string" || !data.nim.trim()) {
    details.push("NIM wajib diisi dengan teks");
  }

  if (typeof data.nama !== "string" || !data.nama.trim()) {
    details.push("Nama wajib diisi dengan teks");
  }

  if (
    typeof data.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    details.push("Email harus menggunakan format email yang valid");
  }

  if (
    data.role !== undefined &&
    (typeof data.role !== "string" || !data.role.trim())
  ) {
    details.push("Role harus berupa teks dan tidak boleh kosong");
  }

  if (details.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Validasi gagal",
      details,
    });
  }

  try {
    const penggunaBaru = await buatPengguna({
      nim: (data.nim as string).trim(),
      nama: (data.nama as string).trim(),
      email: (data.email as string).trim(),
      role:
        typeof data.role === "string"
          ? data.role.trim()
          : "mahasiswa",
    });

    return response.status(201).json({
      success: true,
      message: "Pengguna berhasil dibuat",
      data: penggunaBaru,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return response.status(409).json({
        success: false,
        message: "NIM atau email sudah terdaftar",
        details: ["Gunakan NIM dan email yang berbeda"],
      });
    }

    throw error;
  }
});

// TODO 4 — DELETE /pengguna/:nim
penggunaRoutes.delete("/:nim", async (request, response) => {
  const nim = request.params.nim;

  if (typeof nim !== "string" || !nim.trim()) {
    return response.status(400).json({
      success: false,
      message: "NIM tidak valid",
      details: ["Parameter NIM wajib diisi"],
    });
  }

  const pengguna = await prisma.pengguna.findUnique({
    where: { nim },
  });

  if (!pengguna) {
    return response.status(404).json({
      success: false,
      message: "Pengguna tidak ditemukan",
      details: [`Tidak ada pengguna dengan NIM ${nim}`],
    });
  }

  await prisma.pengguna.delete({
    where: { nim },
  });

  return response.status(204).send();
});

app.get("/", (_request, response) => {
  return response.json({
    message: "Latihan Pengguna Pertemuan 7",
  });
});

app.use("/pengguna", penggunaRoutes);

const port = Number(process.env.PORT_LATIHAN ?? 3009);

app.listen(port, () => {
  console.log(`Latihan berjalan di http://localhost:${port}`);
});
