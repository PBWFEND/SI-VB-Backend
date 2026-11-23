import "dotenv/config";
import app from "./app";
import { prisma } from "./client";

const PORT = Number(process.env.PORT) || 3008;

const server = app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

// Shutdown bersih
async function shutdown(signal: string) {
  console.log(`\n${signal} diterima, menutup server...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
