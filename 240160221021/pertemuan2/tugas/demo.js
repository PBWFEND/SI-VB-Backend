// demo.js - Demo penggunaan service buku
const service = require("./service");
const { findAll, findById, create, update } = service;

async function main() {
  try {
    // 1. Ambil semua buku
    const semua = await findAll();
    console.log("1. Jumlah buku awal:", semua.length);

    // 2. Ambil satu buku
    const satu = await findById(1);
    console.log("2. Buku id 1:", satu.judul);

    // 3. Tambah buku baru
    const baru = await create({ judul: "Async JS Handbook", penulis: "Dewi", tahun: 2025, stok: 2 });
    console.log("3. Buku baru:", baru);

    // 4. Ubah sebagian data (hanya stok)
    const diubah = await update(2, { stok: 4 });
    console.log("4. Setelah update stok:", { id: diubah.id, stok: diubah.stok });

    // 5. Hapus buku
    const dihapus = await service.delete(3);
    console.log("5. Buku dihapus:", dihapus.judul);

    // 6. Promise.all: dua kueri berjalan paralel
    const mulai = Date.now();
    const [daftar, detail] = await Promise.all([findAll(), findById(1)]);
    console.log(`6. Promise.all: ${daftar.length} buku, detail "${detail.judul}" (${Date.now() - mulai}ms)`);

    // 7. Kasus gagal: id tidak ditemukan
    const hilang = await findById(999);
    if (hilang === null) {
      throw new Error("Buku dengan id 999 tidak ditemukan");
    }
  } catch (err) {
    console.log("7. Error tertangkap:", err.message);
  }
}

main();