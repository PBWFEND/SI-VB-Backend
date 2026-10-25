const {
  findAll,
  findById,
  create,
  update,
  delete: deleteBuku,
} = require("./service");

async function main() {
  console.log("=== DEMO SERVICE BUKU ===");

  // 1. Find all
  const semuaBuku = await findAll();
  console.log("1. Jumlah buku:", semuaBuku.length);

  // 2. Find by id
  const buku = await findById(1);
  console.log("2. Detail buku:", buku);

  // 3. Create
  const bukuBaru = await create({
    judul: "Async JavaScript",
    penulis: "Putri",
    tahun: 2026,
    stok: 2,
  });
  console.log("3. Buku baru:", bukuBaru);

  // 4. Update
  const bukuDiubah = await update(1, { stok: 5 });
  console.log("4. Setelah update:", bukuDiubah);

  // 5. Delete
  const bukuDihapus = await deleteBuku(2);
  console.log("5. Buku dihapus:", bukuDihapus);

  // Promise.all: dua query berjalan paralel
  const mulai = Date.now();

  const [daftarBuku, bukuPertama] = await Promise.all([
    findAll(),
    findById(1),
  ]);

  const waktu = Date.now() - mulai;

  console.log("6. Promise.all:");
  console.log("   Jumlah buku:", daftarBuku.length);
  console.log("   Buku pertama:", bukuPertama);
  console.log("   Waktu paralel:", waktu, "ms");

  // try/catch untuk id yang tidak ditemukan
  try {
    const hasil = await findById(999);
    if (!hasil) {
      throw new Error("Buku dengan id 999 tidak ditemukan");
    }

    console.log("7. Buku:", hasil);
  } catch (err) {
    console.log("7. Error:", err.message);
  }
}

main();