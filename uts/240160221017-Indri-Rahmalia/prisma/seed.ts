import { prisma } from "../client";

async function main() {
  await prisma.buku.createMany({
    data: [
      { judul: "Laskar Pelangi", penulis: "Andrea Hirata", tahun: 2005, stok: 5 },
      { judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", tahun: 1980, stok: 3 },
      { judul: "Clean Code", penulis: "Robert C. Martin", tahun: 2008, stok: 2 },
    ],
  });
  console.log("Seed selesai");
}

main().finally(() => prisma.$disconnect());
