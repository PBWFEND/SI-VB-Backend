
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. SEED DATA BUKU
  const bukuData = [
    {
      judul: "Laskar Pelangi",
      penulis: "Andrea Hirata",
      tahun: 2005,
      stok: 10,
    },
    {
      judul: "Bumi",
      penulis: "Tere Liye",
      tahun: 2014,
      stok: 8,
    },
    {
      judul: "Laut Bercerita",
      penulis: "Leila S. Chudori",
      tahun: 2017,
      stok: 5,
    },
  ];

  const bukuTersimpan: Awaited<
    ReturnType<typeof prisma.buku.create>
  >[] = [];

  for (const buku of bukuData) {
    let dataBuku = await prisma.buku.findFirst({
      where: { judul: buku.judul },
    });

    if (!dataBuku) {
      dataBuku = await prisma.buku.create({
        data: buku,
      });
    }

    bukuTersimpan.push(dataBuku);
  }

  // 2. SEED DATA PENGGUNA
  const penggunaData = [
    { nama: "Andi Saputra", email: "andi@email.com" },
    { nama: "Siti Rahma", email: "siti@email.com" },
    { nama: "Budi Santoso", email: "budi@email.com" },
  ];

  const penggunaTersimpan: Awaited<
    ReturnType<typeof prisma.pengguna.create>
  >[] = [];

  for (const pengguna of penggunaData) {
    const dataPengguna = await prisma.pengguna.upsert({
      where: { email: pengguna.email },
      update: {},
      create: pengguna,
    });

    penggunaTersimpan.push(dataPengguna);
  }

  // 3. SEED DATA PINJAMAN AKTIF
  const daftarPinjamanAktif = [
    {
      bukuId: bukuTersimpan[0]!.id,
      penggunaId: penggunaTersimpan[0]!.id,
    },
    {
      bukuId: bukuTersimpan[2]!.id,
      penggunaId: penggunaTersimpan[2]!.id,
    },
  ];

  for (const pinjaman of daftarPinjamanAktif) {
    await prisma.$transaction(async (tx) => {
      const pinjamanAda = await tx.pinjaman.findFirst({
        where: {
          bukuId: pinjaman.bukuId,
          penggunaId: pinjaman.penggunaId,
          tanggalKembali: null,
        },
      });

      if (!pinjamanAda) {
        const stokDiperbarui = await tx.buku.updateMany({
          where: {
            id: pinjaman.bukuId,
            stok: { gt: 0 },
          },
          data: {
            stok: { decrement: 1 },
          },
        });

        if (stokDiperbarui.count === 0) {
          throw new Error(
            `Stok buku ID ${pinjaman.bukuId} tidak tersedia.`
          );
        }

        await tx.pinjaman.create({
          data: {
            bukuId: pinjaman.bukuId,
            penggunaId: pinjaman.penggunaId,
          },
        });
      }
    });
  }

  // 4. SEED DATA PINJAMAN SELESAI
  const pinjamanSelesai = {
    bukuId: bukuTersimpan[1]!.id,
    penggunaId: penggunaTersimpan[1]!.id,
  };

  const pinjamanSelesaiAda = await prisma.pinjaman.findFirst({
    where: {
      bukuId: pinjamanSelesai.bukuId,
      penggunaId: pinjamanSelesai.penggunaId,
      tanggalKembali: { not: null },
    },
  });

  if (!pinjamanSelesaiAda) {
    await prisma.pinjaman.create({
      data: {
        bukuId: pinjamanSelesai.bukuId,
        penggunaId: pinjamanSelesai.penggunaId,
        tanggalPinjam: new Date("2025-01-10"),
        tanggalKembali: new Date("2025-01-15"),
      },
    });
  }

  console.log("=================================");
  console.log("SEED DATA BERHASIL!");
  console.log("3 data buku tersedia.");
  console.log("3 data pengguna tersedia.");
  console.log("2 data peminjaman aktif.");
  console.log("1 data peminjaman selesai.");
  console.log("=================================");
}

main()
  .catch((error) => {
    console.error("Seed gagal:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
