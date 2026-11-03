
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
    ...(details && { details }),
  });
};

// GET /pengguna
app.get("/pengguna", async (_request: Request, response: Response) => {
  const data = await prisma.pengguna.findMany({
    orderBy: { nim: "asc" },
  });

  return sendSuccess(response, 200, "Data pengguna berhasil diambil", {
    total: data.length,
    data,
  });
});

// TODO 1: GET /pengguna/:nim
app.get("/pengguna/:nim", async (request: Request, response: Response) => {
  const nim = request.params.nim;

  const pengguna = await prisma.pengguna.findUnique({
    where: { nim },
  });

  if (!pengguna) {
    return sendError(response, 404, "Pengguna tidak ditemukan");
  }

  return sendSuccess(response, 200, "Detail pengguna berhasil diambil", pengguna);
});

// TODO 2: POST /pengguna
app.post("/pengguna", async (request: Request, response: Response) => {
  const { nim, nama, email, role } = request.body as {
    nim?: unknown;
    nama?: unknown;
    email?: unknown;
    role?: unknown;
  };

  const errors: string[] = [];

  if (typeof nim !== "string" || nim.trim() === "") {
    errors.push("Field nim wajib diisi");
  }

  if (typeof nama !== "string" || nama.trim() === "") {
    errors.push("Field nama wajib diisi");
  }

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.push("Field email harus valid");
  }

  if (
    role !== undefined &&
    (typeof role !== "string" || role.trim() === "")
  ) {
    errors.push("Field role harus berupa teks dan tidak boleh kosong");
  }

  if (errors.length > 0) {
    return sendError(response, 400, "Data pengguna tidak valid", errors);
  }

  try {
    const baru = await prisma.pengguna.create({
      data: {
        nim: (nim as string).trim(),
        nama: (nama as string).trim(),
        email: (email as string).trim(),
        ...(role !== undefined ? { role: (role as string).trim() } : {}),
      },
    });

    return sendSuccess(response, 201, "Pengguna berhasil dibuat", baru);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return sendError(response, 409, "NIM atau email sudah digunakan");
    }

    throw error;
  }
});

// TODO 3: PATCH /pengguna/:nim
app.patch("/pengguna/:nim", async (request: Request, response: Response) => {
  const nim = request.params.nim;

  const pengguna = await prisma.pengguna.findUnique({
    where: { nim },
  });

  if (!pengguna) {
    return sendError(response, 404, "Pengguna tidak ditemukan");
  }

  const { nama, email, role } = request.body as {
    nama?: unknown;
    email?: unknown;
    role?: unknown;
  };

  const errors: string[] = [];

  if (
    nama !== undefined &&
    (typeof nama !== "string" || nama.trim() === "")
  ) {
    errors.push("Field nama tidak valid");
  }

  if (
    email !== undefined &&
    (typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    errors.push("Field email tidak valid");
  }

  if (
    role !== undefined &&
    (typeof role !== "string" || role.trim() === "")
  ) {
    errors.push("Field role tidak valid");
  }

  if (nama === undefined && email === undefined && role === undefined) {
    errors.push("Kirim minimal satu field yang ingin diubah");
  }

  if (errors.length > 0) {
    return sendError(response, 400, "Data perubahan tidak valid", errors);
  }

  try {
    const diperbarui = await prisma.pengguna.update({
      where: { nim },
      data: {
        ...(nama !== undefined ? { nama: (nama as string).trim() } : {}),
        ...(email !== undefined ? { email: (email as string).trim() } : {}),
        ...(role !== undefined ? { role: (role as string).trim() } : {}),
      },
    });

    return sendSuccess(
      response,
      200,
      "Pengguna berhasil diperbarui",
      diperbarui,
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return sendError(response, 409, "Email sudah digunakan");
    }

    throw error;
  }
});

// TODO 4: DELETE /pengguna/:nim
app.delete("/pengguna/:nim", async (request: Request, response: Response) => {
  const nim = request.params.nim;

  const pengguna = await prisma.pengguna.findUnique({
    where: { nim },
  });

  if (!pengguna) {
    return sendError(response, 404, "Pengguna tidak ditemukan");
  }

  await prisma.pengguna.delete({
    where: { nim },
  });

  return response.status(204).send();
});

// Endpoint tidak ditemukan
app.use((_request: Request, response: Response) => {
  return sendError(response, 404, "Endpoint tidak ditemukan");
});

// Error handler
app.use((
  error: Error,
  _request: Request,
  response: Response,
  _next: (error?: Error) => void,
) => {
  console.error("Kesalahan aplikasi:", error.message);
  return sendError(response, 500, "Terjadi kesalahan pada server");
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
