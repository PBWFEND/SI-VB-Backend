// ---------- Versi Sebelum ----------

function buatPesanLama(l) {
  var t = "Total: " + l.reduce(function(a, i) {
    return a + i.harga * i.jumlah;
  }, 0);

  return t;
}


// ---------- Versi Sesudah ----------

const buatPesan = (daftarBarang = []) => {
  const total = daftarBarang.reduce(
    (total, { harga, jumlah }) => total + harga * jumlah,
    0
  );

  return `Total: ${total}`;
};


// ---------- Data Pengujian ----------

const daftarBarang = [
  {
    harga: 10000,
    jumlah: 2
  },
  {
    harga: 5000,
    jumlah: 3
  }
];


// ---------- Pengujian ----------

console.log("=== SEBELUM REFACTOR ===");
console.log(buatPesanLama(daftarBarang));

console.log("\n=== SESUDAH REFACTOR ===");
console.log(buatPesan(daftarBarang));

console.log("\n=== DEFAULT VALUE ===");
console.log(buatPesan());