
import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

const sendSuccess = (
  response: Response,
  statusCode: number,
  message: string,
  data: unknown,
) => {
  return response.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (
  response: Response,
  statusCode: number,
  message: string,
  details?: unknown,
) => {
  return response.status(statusCode).json({
    success: false,
    message,
    ...(details !== undefined ? { details } : {}),
  });
};

// GET semua pengguna
app.get("/pengguna", async (_request: Request, response: Response) => {
  const data = await prisma.pengguna.findMany({
    orderBy: { nim: "asc" },
  });

  return sendSuccess(response, 200, "Data pengguna berhasil diambil", {
    total: data.length,
    data,
  });
});

// TODO 1: GET pengguna berdasarkan NIM
app.get("/pengguna/:nim", async (request: Request, response: Response) => {
  const pengguna = await prisma.pengguna.findUnique({
    where: { nim: request.params.nim as string },
  });

  if (!pengguna) {
    return sendError(response, 404, "Pengguna tidak ditemukan");
  }

  return sendSuccess(response, 200, "Data pengguna berhasil diambil", pengguna);
});

// TODO 2: POST pengguna baru
app.post("/pengguna", async (request: Request, response: Response) => {
  const { nim, nama, email, role } = request.body ?? {};

  if (
    typeof nim !== "string" ||
    !nim.trim() ||
    typeof nama !== "string" ||
    !nama.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    (role !== undefined && typeof role !== "string")
  ) {
    return sendError(
      response,
      400,
      "nim, nama, email wajib berupa teks dan tidak boleh kosong; role harus berupa teks jika diisi",
    );
  }

  try {
    const pengguna = await prisma.pengguna.create({
      data: {
        nim: nim.trim(),
        nama: nama.trim(),
        email: email.trim(),
        ...(role !== undefined ? { role: role.trim() } : {}),
      },
    });

    return sendSuccess(response, 201, "Pengguna berhasil ditambahkan", pengguna);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return sendError(response, 409, "NIM atau email sudah digunakan");
    }
    return sendError(response, 500, "Gagal menambahkan pengguna");
  }
});

// TODO 3: PATCH pengguna
app.patch("/pengguna/:nim", async (request: Request, response: Response) => {
  const { nama, email, role } = request.body ?? {};
  const data: { nama?: string; email?: string; role?: string } = {};

  for (const [key, value] of Object.entries({ nama, email, role })) {
    if (value !== undefined) {
      if (typeof value !== "string" || !value.trim()) {
        return sendError(response, 400, `${key} harus berupa teks dan tidak boleh kosong`);
      }
      data[key as "nama" | "email" | "role"] = value.trim();
    }
  }

  if (Object.keys(data).length === 0) {
    return sendError(response, 400, "Isi minimal satu field: nama, email, atau role");
  }

  try {
    const hasil = await prisma.pengguna.updateMany({
      where: { nim: request.params.nim as string },
      data,
    });

    if (hasil.count === 0) {
      return sendError(response, 404, "Pengguna tidak ditemukan");
    }

    const pengguna = await prisma.pengguna.findUnique({
      where: { nim: request.params.nim as string },
    });

    return sendSuccess(response, 200, "Data pengguna berhasil diperbarui", pengguna);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return sendError(response, 409, "Email sudah digunakan");
    }
    return sendError(response, 500, "Gagal memperbarui pengguna");
  }
});

// TODO 4: DELETE pengguna
app.delete("/pengguna/:nim", async (request: Request, response: Response) => {
  const hasil = await prisma.pengguna.deleteMany({
    where: { nim: request.params.nim as string },
  });

  if (hasil.count === 0) {
    return sendError(response, 404, "Pengguna tidak ditemukan");
  }

  return response.status(204).end();
});

const port = Number(process.env.PORT_LATIHAN ?? 3009);

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(port, () => {
  console.log(`Latihan Database API berjalan di http://localhost:${port}`);
});
