
// refactor.js
// Refactor kode lama menggunakan fitur JavaScript modern

// ==========================================
// VERSI SEBELUM REFACTOR
// ==========================================

function buatPesanLama(daftarBuku) {
  var total = daftarBuku.reduce(function (hasil, buku) {
    return hasil + buku.harga * buku.jumlah;
  }, 0);

  return "Total harga: Rp" + total;
}

// ==========================================
// VERSI SESUDAH REFACTOR
// ==========================================

// Arrow function + default value
const buatPesan = (daftarBuku = []) => {
  // Destructuring + reduce
  const total = daftarBuku.reduce(
    (hasil, { harga = 0, jumlah = 0 }) =>
      hasil + harga * jumlah,
    0
  );

  // Template literal
  return `Total harga: Rp${total.toLocaleString("id-ID")}`;
};

// Contoh data untuk menguji hasil refactor
const daftarBuku = [
  { nama: "Buku Backend", harga: 50000, jumlah: 2 },
  { nama: "Buku JavaScript", harga: 40000, jumlah: 1 },
];

console.log("=== SEBELUM REFACTOR ===");
console.log(buatPesanLama(daftarBuku));

console.log("\n=== SESUDAH REFACTOR ===");
console.log(buatPesan(daftarBuku));

// Ekspor fungsi agar bisa digunakan oleh file lain
module.exports = { buatPesanLama, buatPesan };
