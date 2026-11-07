import { app, prisma } from "./app.ts";

const port = Number(process.env.PORT ?? 3008);

// Tutup koneksi Prisma saat proses dihentikan agar file SQLite tidak menggantung
const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Di Express 5, callback listen menerima error bila server gagal start (misalnya port sudah dipakai)
app.listen(port, (error?: Error) => {
  if (error) {
    console.error(`Gagal menjalankan server di port ${port}: ${error.message}`);
    process.exit(1);
  }
  console.log(`CRUD REST API berjalan di http://localhost:${port}`);
});