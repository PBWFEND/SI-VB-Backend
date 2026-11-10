import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.pinjaman.deleteMany();
  await prisma.buku.deleteMany();
  await prisma.pengguna.deleteMany();

  await prisma.buku.createMany({
    data: [
      { judul: "Laskar Pelangi", penulis: "Andrea Hirata", tahun: 2005, stok: 5 },
      { judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", tahun: 1980, stok: 3 },
      { judul: "Filosofi Teras", penulis: "Henry Manampiring", tahun: 2018, stok: 0 },
    ],
  });

  const hash = await bcrypt.hash("rahasia123", 10);

  await prisma.pengguna.createMany({
    data: [
      { nama: "Budi Santoso", email: "budi@example.com", password: hash },
      { nama: "Siti Aminah", email: "siti@example.com", password: hash },
    ],
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