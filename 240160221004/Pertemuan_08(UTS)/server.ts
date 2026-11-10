import app from "./app";
import { prisma } from "./client";

const PORT = Number(process.env.PORT) || 3008;

const server = app.listen(PORT, () => {
  console.log(`🚀 API berjalan di http://localhost:${PORT}`);
});

async function shutdown(signal: string) {
  console.log(`\n[${signal}] Menutup server...`);
  server.close(async () => {
    await prisma.$disconnect();
    console.log("Server dan database terputus dengan bersih.");
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));