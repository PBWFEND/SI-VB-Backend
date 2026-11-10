import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Bersihkan data lama (urutan penting karena relasi)
  await prisma.pinjaman.deleteMany();
  await prisma.buku.deleteMany();
  await prisma.pengguna.deleteMany();

  // Seed buku
  await prisma.buku.createMany({
    data: [
      { judul: "Laskar Pelangi", penulis: "Andrea Hirata", tahun: 2005, stok: 5 },
      { judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", tahun: 1980, stok: 3 },
      { judul: "Filosofi Teras", penulis: "Henry Manampiring", tahun: 2018, stok: 0 },
      { judul: "Atomic Habits", penulis: "James Clear", tahun: 2018, stok: 4 },
    ],
  });

  // Seed pengguna
  await prisma.pengguna.createMany({
    data: [
      { nama: "Aprilliana Fratiwi", email: "aprillianafratiwi@example.com" },
      { nama: "William Jakrapatr", email: "williamjkp@example.com" },
    ],
  });

  // Seed satu pinjaman contoh
  await prisma.pinjaman.create({
    data: { bukuId: 1, penggunaId: 1, status: "aktif" },
  });

  console.log("✅ Seed data berhasil dimasukkan.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });