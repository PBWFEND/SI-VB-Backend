/**
 * Pertemuan 10 — Proses server.
 */
import { app } from "./app.ts";
import { prisma } from "./client.ts";

const port = Number(process.env.PORT ?? 3010);

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(port, () => {
  console.log(`JWT & Authorization API berjalan di http://localhost:${port}`);
});