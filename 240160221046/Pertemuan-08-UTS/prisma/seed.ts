/**
 * Seed Script — Pertemuan 8 UTS (Domain E-Warung)
 *
 * Mengisi database dengan data awal menu makanan, minuman, dan camilan.
 *
 * Jalankan:
 *   npm run seed
 */

import { prisma } from "../client.ts";

const menuAwal = [
  {
    nama: "Nasi Goreng Spesial",
    harga: 18000,
    kategori: "Makanan",
    tersedia: true,
  },
  {
    nama: "Ayam Geprek Sambal Bawang",
    harga: 15000,
    kategori: "Makanan",
    tersedia: true,
  },
  {
    nama: "Mie Goreng Telur",
    harga: 12000,
    kategori: "Makanan",
    tersedia: true,
  },
  {
    nama: "Es Teh Manis",
    harga: 5000,
    kategori: "Minuman",
    tersedia: true,
  },
  {
    nama: "Kopi Susu Gula Aren",
    harga: 12000,
    kategori: "Minuman",
    tersedia: true,
  },
  {
    nama: "Pisang Goreng Keju",
    harga: 10000,
    kategori: "Camilan",
    tersedia: false, // sengaja false untuk pengujian filter ketersediaan
  },
];

async function main() {
  console.log("🌱 Menjalankan seeding data menu e-warung...");

  // Bersihkan data lama jika ada
  await prisma.menu.deleteMany({});

  for (const item of menuAwal) {
    const created = await prisma.menu.create({
      data: item,
    });
    console.log(` ✅ [${created.id}] ${created.nama} (${created.kategori}) - Rp${created.harga}`);
  }

  console.log("✨ Seeding selesai: 6 menu berhasil ditambahkan ke database!");
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
