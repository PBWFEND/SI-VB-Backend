
import {
  findAll,
  findById,
  create,
  update,
  deleteBuku,
} from "./service.js";

async function main() {
  try {
    console.log("=== 1. MENAMPILKAN SEMUA BUKU ===");
    console.log(await findAll());

    console.log("\n=== 2. MENCARI BUKU ID 1 ===");
    console.log(await findById(1));

    console.log("\n=== 3. MENAMBAHKAN BUKU ===");
    const bukuBaru = await create({
      judul: "Bumi Manusia",
      penulis: "Pramoedya Ananta Toer",
      tahun: 1980,
    });
    console.log(bukuBaru);

    console.log("\n=== 4. MEMPERBARUI BUKU ===");
    console.log(
      await update(bukuBaru.id, {
        judul: "Bumi Manusia Edisi Baru",
      })
    );

    console.log("\n=== 5. PROMISE.ALL ===");
    const [bukuPertama, semuaBuku] = await Promise.all([
      findById(1),
      findAll(),
    ]);

    console.log("Buku pertama:", bukuPertama);
    console.log("Jumlah buku:", semuaBuku.length);

    console.log("\n=== 6. MENGUJI ID TIDAK DITEMUKAN ===");
    const bukuTidakAda = await findById(999);

    if (bukuTidakAda === null) {
      throw new Error("Buku dengan ID 999 tidak ditemukan.");
    }

    console.log(bukuTidakAda);
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
  }

  try {
    console.log("\n=== 7. MENGHAPUS BUKU ===");
    console.log(await deleteBuku(2));

    console.log("\n=== 8. DATA TERAKHIR ===");
    console.log(await findAll());
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
  }
}

main();
