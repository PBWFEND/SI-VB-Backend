
 // demo.js
// Pengujian Sistem Informasi Absensi Perkuliahan Mahasiswa

const {
  mahasiswaService,
  absensiService,
  rekapPerMataKuliah,
} = require("./service");

async function jalankanDemo() {
  try {
    console.log("===== DEMO ABSENSI PERKULIAHAN =====");

    // 1. Menampilkan seluruh mahasiswa
    console.log("\n1. Data seluruh mahasiswa:");
    const mahasiswa = await mahasiswaService.findAll();
    console.log(mahasiswa);

    // 2. Mencari mahasiswa berdasarkan ID
    console.log("\n2. Mencari mahasiswa ID 1:");
    const hasilCari = await mahasiswaService.findById(1);
    console.log(hasilCari);

    // 3. Menambahkan data absensi
    console.log("\n3. Menambahkan data absensi:");
    const absensiBaru = await absensiService.create({
      mahasiswaId: 1,
      mataKuliah: "Pemrograman Web Backend",
      pertemuan: 2,
      tanggal: "2026-10-30",
      status: "Hadir",
    });
    console.log(absensiBaru);

    // 4. Memperbarui status absensi
    console.log("\n4. Memperbarui status absensi ID 2:");
    const absensiUpdate = await absensiService.update(2, {
      status: "Sakit",
    });
    console.log(absensiUpdate);

    // 5. Menghapus data absensi
    console.log("\n5. Menghapus absensi ID 4:");
    const absensiHapus = await absensiService.delete(4);
    console.log(absensiHapus);

    // 6. Menampilkan seluruh data absensi
    console.log("\n6. Seluruh data absensi:");
    const semuaAbsensi = await absensiService.findAll();
    console.log(semuaAbsensi);

    // 7. Menjalankan dua pencarian secara bersamaan
    console.log("\n7. Pengujian Promise.all:");
    const [dataMahasiswa, dataAbsensi] = await Promise.all([
      mahasiswaService.findAll(),
      absensiService.findAll(),
    ]);

    console.log("Data mahasiswa:", dataMahasiswa);
    console.log("Data absensi:", dataAbsensi);

    // 8. Menampilkan rekap berdasarkan mata kuliah
    console.log("\n8. Rekap Manajemen Proyek SI:");
    const rekap = await rekapPerMataKuliah("Manajemen Proyek SI");
    console.log(rekap);

    // 9. Menguji ID yang tidak ditemukan
    console.log("\n9. Pengujian ID yang tidak ditemukan:");
    try {
      const dataTidakAda = await absensiService.findById(999);

      if (!dataTidakAda) {
        throw new Error("Data absensi dengan ID 999 tidak ditemukan.");
      }

      console.log(dataTidakAda);
    } catch (error) {
      console.log("Terjadi kesalahan:", error.message);
    }

    console.log("\n===== DEMO SELESAI =====");
  } catch (error) {
    console.log("Terjadi kesalahan:", error.message);
  }
}

jalankanDemo();
