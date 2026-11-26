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
    ],
  });

  const hash = await bcrypt.hash("rahasia123", 10);

  await prisma.pengguna.createMany({
    data: [
      { nama: "Admin Perpus", email: "admin@example.com", password: hash, role: "admin" },
      { nama: "Aprilliana", email: "april@example.com", password: hash, role: "user" },
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