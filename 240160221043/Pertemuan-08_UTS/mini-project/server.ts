import app from "./app.ts";
import { prisma } from "./client.ts";

const PORT = Number(process.env.PORT) || 3012;

const server = app.listen(PORT, () => {
  console.log(`WarungKu API berjalan di http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = (signal: string) => {
  console.log(`\n${signal} diterima. Menutup server...`);

  server.close(async () => {
    try {
      await prisma.$disconnect();
      console.log("Koneksi database berhasil ditutup.");
      process.exit(0);
    } catch (error) {
      console.error("Gagal menutup koneksi database:", error);
      process.exit(1);
    }
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));