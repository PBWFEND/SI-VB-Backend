const {
  findAll,
  findById,
  create,
  update,
  remove
} = require("./service");

const jalankan = async () => {
  const semuaBarang = await findAll();

  console.log("Semua barang:");
  console.log(semuaBarang);

  const barang = await findById(2);

  console.log("Barang dengan ID 2:");
  console.log(barang);

  const barangBaru = await create({
  nama: "Teh Manis",
  harga: 5000,
  stok: 10
});

console.log("Barang baru:");
console.log(barangBaru);
const barangUpdate = await update(2, {
  harga: 6000,
  stok: 25
});

console.log("Barang setelah di-update:");
console.log(barangUpdate);

const barangDihapus = await remove(3);

console.log("Barang yang dihapus:");
console.log(barangDihapus);

const [barang1, barang2] = await Promise.all([
  findById(1),
  findById(2)
]);

console.log("Hasil Promise.all:");
console.log(barang1);
console.log(barang2);

try {
  const barangTidakAda = await findById(99);

  if (!barangTidakAda) {
    throw new Error("Barang dengan ID 99 tidak ditemukan");
  }

  console.log(barangTidakAda);
} catch (error) {
  console.log("Error:", error.message);
}
};

jalankan();