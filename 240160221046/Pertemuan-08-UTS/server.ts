/**
 * Server Entrypoint — Pertemuan 8 UTS (Domain E-Warung)
 *
 * Menjalankan Express app dan menangani graceful shutdown koneksi database.
 */

import { app, prisma } from "./app.ts";

const port = Number(process.env.PORT ?? 3008);

// Graceful shutdown: tutup koneksi Prisma saat proses dihentikan
const shutdown = async (signal: string) => {
  console.log(`\nMenerima sinyal ${signal}, menutup koneksi database...`);
  try {
    await prisma.$disconnect();
    console.log("Koneksi Prisma berhasil ditutup secara bersih.");
  } catch (err: any) {
    console.error("Gagal menutup Prisma:", err.message);
  } finally {
    process.exit(0);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

app.listen(port, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 API E-Warung berjalan di http://localhost:${port}`);
  console.log(`   - NIM: 240160221046`);
  console.log(`   - Resource: Menu (CRUD lengkap)`);
  console.log(`   - Dokumentasi: http://localhost:${port}/`);
  console.log(`======================================================\n`);
});

