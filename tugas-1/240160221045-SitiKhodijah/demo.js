const service = require("./service");

async function demo() {
  console.log("=== DEMO SERVICE LABORATORIUM ===");

  // 1. Find All
  const semuaAlat = await service.findAll();

  console.log(
    "Daftar awal:",
    semuaAlat.length,
    "alat"
  );

  // 2. Create
  const { id, nama } = await service.create({
    nama: "Laptop Laboratorium",
    jumlah: 5,
  });

  console.log("Alat baru:", { id, nama });

  // 3. Find By ID
  const alat = await service.findById(2);

  console.log("Alat id 2:", alat);

  // 4. Update
  const diubah = await service.update(2, {
    jumlah: 15,
  });

  console.log("Setelah update:", {
    id: diubah.id,
    jumlah: diubah.jumlah,
  });

  // 5. Promise.all — dua query paralel
  const mulai = Date.now();

  const [alat1, alat3] = await Promise.all([
    service.findById(1),
    service.findById(3),
  ]);

  const waktu = Date.now() - mulai;

  console.log("Query paralel:");
  console.log("Alat id 1:", alat1);
  console.log("Alat id 3:", alat3);
  console.log(`Waktu eksekusi: ${waktu} ms`);

  // 6. Delete
  const dihapus = await service.delete(3);

  console.log("Alat yang dihapus:", dihapus);

  // 7. Try/catch — ID tidak ditemukan
  try {
    const tidakAda = await service.findById(99);

    if (!tidakAda) {
      throw new Error("Alat dengan ID 99 tidak ditemukan");
    }

    console.log(tidakAda);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

demo();