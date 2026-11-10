
/**
 * Pertemuan 7 — CRUD REST API: Proses Menjalankan
 * Menjalankan server Express dan menangani shutdown Prisma.
 */

import { app, prisma } from "./app.ts";

const port = Number(process.env.PORT ?? 3008);

// Menutup koneksi Prisma saat server dihentikan
const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(port, () => {
  console.log(`CRUD REST API berjalan di http://localhost:${port}`);
});
