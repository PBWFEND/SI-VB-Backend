import "dotenv/config";
import app from "./app.ts";
import { prisma } from "./client.ts";

const port = Number(process.env.PORT ?? 3008);

const server = app.listen(port, () => {
  console.log(`API UTS berjalan di http://localhost:${port}`);
});

server.on("error", (err) => {
  console.error("Gagal menjalankan server:", err.message);
  process.exit(1);
});

const shutdown = async (signal: string) => {
  console.log(`\nMenerima ${signal}, mematikan server...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));