const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  await prisma.buku.createMany({
    data: [
      { judul: 'Belajar Node.js', penulis: 'Andi', tahun: 2024, stok: 5 },
      { judul: 'Pemrograman Web', penulis: 'Budi', tahun: 2023, stok: 3 }
    ]
  });
  console.log('Seed selesai');
  await prisma.$disconnect();
})();