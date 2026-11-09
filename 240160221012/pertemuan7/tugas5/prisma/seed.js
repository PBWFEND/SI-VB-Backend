const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Hapus data lama agar tidak duplikat jika dijalankan berulang kali
  await prisma.buku.deleteMany();

  // Masukkan data dummy
  const buku1 = await prisma.buku.create({
    data: {
      judul: "Belajar Node.js",
      penulis: "Andi",
      tahun: 2024,
      stok: 5,
    },
  });

  const buku2 = await prisma.buku.create({
    data: {
      judul: "Pemrograman Web",
      penulis: "Budi",
      tahun: 2023,
      stok: 3,
    },
  });

  console.log("Seed berhasil dimasukkan!", { buku1, buku2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });