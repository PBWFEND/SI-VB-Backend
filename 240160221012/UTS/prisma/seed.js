require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Bersihkan tabel agar idempoten
  await prisma.buku.deleteMany();

  await prisma.buku.createMany({
    data: [
      { judul: 'Belajar Node.js', penulis: 'Andi', tahun: 2024, stok: 5 },
      { judul: 'Pemrograman Web', penulis: 'Budi', tahun: 2023, stok: 3 },
      { judul: 'Prisma ORM Dasar', penulis: 'Citra', tahun: 2025, stok: 4 }
    ]
  });

  console.log('Seed selesai: 3 buku ditambahkan.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });