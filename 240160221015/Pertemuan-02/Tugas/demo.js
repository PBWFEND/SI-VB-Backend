/**
 * ============================================================
 * Tugas 1 Pertemuan 2 — Demo Script
 * ============================================================
 * Menjalankan minimal 4 operasi service dan 1 Promise.all().
 * Sertakan try/catch untuk kasus id tidak ditemukan.
 *
 * Jalankan: node demo.js
 */

const service = require("./service");

async function main() {
  console.log("=== DEMO SERVICE E-WARUNG KAMPUS ===\n");

  try {
    // ---------- 1. Ambil semua menu ----------
    const semuaMenu = await service.findAll();
    console.log(`1. Total menu: ${semuaMenu.length}`);
    semuaMenu.forEach((m) => {
      console.log(`   - [${m.id}] ${m.nama} — Rp${m.harga} (stok ${m.stok})`);
    });

    // ---------- 2. Tambah menu baru ----------
    const menuBaru = await service.create({
      nama: "Ayam Geprek",
      harga: 18000,
      kategori: "Makanan",
      stok: 12,
    });
    console.log(`\n2. Menu baru ditambahkan: [${menuBaru.id}] ${menuBaru.nama}`);

    // ---------- 3. Update stok menu ----------
    const diupdate = await service.update(2, { stok: 25 });
    console.log(`\n3. Update stok menu id 2 → stok sekarang: ${diupdate.stok}`);

    // ---------- 4. Hapus menu ----------
    const dihapus = await service.remove(3);
    console.log(`\n4. Menu dihapus: [${dihapus.id}] ${dihapus.nama}`);

    // ---------- 5. Promise.all: dua kueri paralel ----------
    console.log("\n5. === Promise.all (dua kueri paralel) ===");
    const mulai = Date.now();

    const [totalMenu, menuHabis] = await Promise.all([
      service.findAll().then((all) => all.length),
      service.findAll().then((all) => all.filter((m) => m.stok === 0).length),
    ]);

    const durasi = Date.now() - mulai;
    console.log(`   Total menu: ${totalMenu}`);
    console.log(`   Menu stok habis: ${menuHabis}`);
    console.log(`   Waktu eksekusi: ±${durasi}ms (paralel, bukan berurutan)`);

    // ---------- 6. try/catch: id tidak ditemukan ----------
    console.log("\n6. === Uji try/catch (id tidak ditemukan) ===");
    try {
      const tidakAda = await service.findById(999);
      if (tidakAda === null) {
        throw new Error("Menu dengan id 999 tidak ditemukan");
      }
      console.log("   Hasil:", tidakAda);
    } catch (err) {
      console.log(`   ✅ Error tertangkap: ${err.message}`);
    }

    console.log("\n=== DEMO SELESAI ===");
  } catch (err) {
    console.error("❌ Terjadi error tak terduga:", err.message);
  }
}

main();