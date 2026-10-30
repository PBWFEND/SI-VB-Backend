// refactor.js - Refactor kode warisan buatPesan

// ===== SEBELUM (kode warisan dari modul dosen) =====
// function buatPesan(l) { var t = "Total: " + l.reduce(function(a, i) { return a + i.harga * i.jumlah; }, 0); return t; }

// ===== SESUDAH (ditulis ulang dengan ES6+) =====
const buatPesan = (daftar = []) => {
  const total = daftar.reduce((acc, { harga, jumlah }) => acc + harga * jumlah, 0);
  return `Total: ${total}`;
};

// ===== Pengujian =====
const contoh = [
  { nama: "Kopi Hitam", harga: 15000, jumlah: 2 },
  { nama: "Roti Bakar", harga: 12000, jumlah: 3 },
];
console.log(buatPesan(contoh)); // Total: 66000
console.log(buatPesan()); // Total: 0