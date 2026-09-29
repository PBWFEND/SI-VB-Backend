const {
  findAll,
  findById,
  create,
  update,
  delete: deleteData
} = require("./service");

const main = async () => {
  try {
    console.log("=== DATA AWAL ANGGOTA ===");
    const dataAwal = await findAll();
    console.log(dataAwal);

    console.log("\n=== CARI ANGGOTA ===");
    const anggota = await findById(1);

    if (!anggota) {
      throw new Error("Anggota tidak ditemukan");
    }

    console.log(anggota);

    console.log("\n=== TAMBAH ANGGOTA ===");
    const anggotaBaru = await create({
      nama: "Salwa",
      npm: "240160221056",
      divisi: "Frontend"
    });

    console.log(anggotaBaru);

    console.log("\n=== UBAH ANGGOTA ===");
    const anggotaUpdate = await update(2, {
      divisi: "UI/UX"
    });

    if (!anggotaUpdate) {
      throw new Error("Anggota yang akan diubah tidak ditemukan");
    }

    console.log(anggotaUpdate);

    console.log("\n=== PROMISE.ALL ===");
    const [semuaAnggota, anggotaPertama] = await Promise.all([
      findAll(),
      findById(1)
    ]);

    console.log("Semua anggota:", semuaAnggota);
    console.log("Anggota pertama:", anggotaPertama);

    console.log("\n=== HAPUS ANGGOTA ===");
    const anggotaDihapus = await deleteData(2);

    if (!anggotaDihapus) {
      throw new Error("Anggota yang akan dihapus tidak ditemukan");
    }

    console.log("Anggota dihapus:", anggotaDihapus);

    console.log("\n=== DATA TIDAK DITEMUKAN ===");
    try {
      const anggotaTidakAda = await findById(999);

      if (!anggotaTidakAda) {
        throw new Error("Anggota dengan ID 999 tidak ditemukan");
      }

      console.log(anggotaTidakAda);
    } catch (error) {
      console.log("Error:", error.message);
    }

  } catch (error) {
    console.log("Terjadi kesalahan:", error.message);
  }
};

main();