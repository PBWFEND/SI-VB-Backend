// ============================================================
// REFACTOR KODE WARISAN
// ============================================================

// ---------- Versi sebelum refactoring ----------
function buatPesanLama(l) {
  var t = "Total: " + l.reduce(function (a, i) {
    return a + i.harga * i.jumlah;
  }, 0);

  return t;
}

// ---------- Versi sesudah refactoring ----------
const buatPesan = (items = []) => {
  const total = items.reduce(
    (acc, { harga, jumlah }) => acc + harga * jumlah,
    0
  );

  return `Total: ${total}`;
};

// ---------- Data ----------
const items = [
  { nama: "Kopi Hitam", harga: 15000, jumlah: 2 },
  { nama: "Roti Bakar", harga: 12000, jumlah: 3 },
];

// Uji hasil
console.log("Sebelum:", buatPesanLama(items));
console.log("Sesudah:", buatPesan(items));