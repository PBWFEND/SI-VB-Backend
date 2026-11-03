import "dotenv/config";
import app from "./app.ts";
import { prisma } from "./client.ts";

const PORT = Number(process.env.PORT ?? 3008);

const server = app.listen(PORT, () => {
  console.log(`CRUD REST API berjalan di http://localhost:${PORT}`);
});

// Penanganan graceful shutdown untuk memutus koneksi Prisma Client
async function shutdown() {
  server.close(async () => {
    await prisma.$disconnect();
    console.log("Koneksi database berhasil ditutup");
    process.exit(0);
  });
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
