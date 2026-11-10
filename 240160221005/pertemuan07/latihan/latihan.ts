/**
 * Pertemuan 7 — Latihan: Rework Resource Pengguna dengan Pola Lapis
 * ...
 */

import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

// ------------------------------------------------------------------
// SERVICE — operasi data & validasi pengguna
// ------------------------------------------------------------------

type DataPenggunaBaru = {
  nim: string;
  nama: string;
  email: string;
  role?: string;
};

class ValidasiError extends Error {
  errors: string[];
  constructor(errors: string[]) {
    super("Validasi gagal");
    this.name = "ValidasiError";
    this.errors = errors;
  }
}

const ROLE_VALID = ["ADMIN", "MAHASISWA", "DOSEN"] as const;

/**
 * Validasi murni — tidak menyentuh Prisma.
 * Melempar ValidasiError berisi daftar pesan error.
 */
const validasiPenggunaBaru = (
  input: Partial<Record<keyof DataPenggunaBaru, unknown>> | undefined,
): DataPenggunaBaru => {
  const errors: string[] = [];

  const nim = typeof input?.nim === "string" ? input.nim.trim() : "";
  const nama = typeof input?.nama === "string" ? input.nama.trim() : "";
  const email = typeof input?.email === "string" ? input.email.trim() : "";
  const roleRaw =
    typeof input?.role === "string" ? input.role.trim().toUpperCase() : "";

  if (!nim) errors.push("nim wajib diisi");
  if (!nama) errors.push("nama wajib diisi");
  if (!email) {
    errors.push("email wajib diisi");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("format email tidak valid");
  }
  if (roleRaw && !(ROLE_VALID as readonly string[]).includes(roleRaw)) {
    errors.push(`role harus salah satu dari: ${ROLE_VALID.join(", ")}`);
  }

  if (errors.length > 0) throw new ValidasiError(errors);

  return {
    nim,
    nama,
    email,
    ...(roleRaw ? { role: roleRaw } : {}),
  };
};

/** TODO 1 — filter nim opsional. */
export const ambilDaftarPengguna = async (nim?: string) => {
  return prisma.pengguna.findMany({
    where: nim ? { nim } : undefined,
    orderBy: { nim: "asc" },
  });
};

/** TODO 2 — validasi dulu, baru create. */
export const buatPengguna = async (
  input: Partial<Record<keyof DataPenggunaBaru, unknown>>,
) => {
  const data = validasiPenggunaBaru(input); // tanggung jawab validasi
  return prisma.pengguna.create({ data });  // tanggung jawab data
};

/** Helper untuk TODO 4 — deleteMany aman kalau nim tidak ada. */
export const hapusPengguna = async (nim: string): Promise<boolean> => {
  const { count } = await prisma.pengguna.deleteMany({ where: { nim } });
  return count > 0;
};

// ------------------------------------------------------------------
// ROUTE — HTTP layer saja, tidak menyentuh Prisma
// ------------------------------------------------------------------

const penggunaRoutes = express.Router();

penggunaRoutes.get("/", async (request: Request, response: Response) => {
  const nimRaw = request.query.nim;
  const nimFilter = typeof nimRaw === "string" ? nimRaw : undefined;
  // TODO 1 ✓ controller hanya memanggil service
  const data = await ambilDaftarPengguna(nimFilter);
  return response
    .status(200)
    .json({ success: true, message: "Daftar pengguna", data });
});

// TODO 3 — POST /pengguna
penggunaRoutes.post("/", async (request: Request, response: Response) => {
  try {
    const data = await buatPengguna(request.body ?? {});
    return response
      .status(201)
      .json({ success: true, message: "Pengguna dibuat", data });
  } catch (error) {
    if (error instanceof ValidasiError) {
      return response
        .status(400)
        .json({ success: false, message: error.message, errors: error.errors });
    }
    if (
      typeof error === "object" &&
      error !== null &&
      (error as { code?: string }).code === "P2002"
    ) {
      return response
        .status(409)
        .json({ success: false, message: "nim sudah terdaftar" });
    }
    console.error("[POST /pengguna]", error);
    return response
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan pada server" });
  }
});

// TODO 4 — DELETE /pengguna/:nim
penggunaRoutes.delete(
  "/:nim",
  async (request: Request, response: Response) => {
    try {
      const terhapus = await hapusPengguna(request.params.nim);
      if (!terhapus) {
        return response
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }
      return response.status(204).send();
    } catch (error) {
      console.error("[DELETE /pengguna/:nim]", error);
      return response
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan pada server" });
    }
  },
);

// ------------------------------------------------------------------
// APP
// ------------------------------------------------------------------

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.get("/", (_request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: "API Latihan Pengguna — Pertemuan 7",
    data: { resource: "pengguna" },
  });
});

app.use("/pengguna", penggunaRoutes);

const port = Number(process.env.PORT_LATIHAN ?? 3009);

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(port, () => {
  console.log(`API Latihan Pengguna berjalan di http://localhost:${port}`);
});