/**
 * ============================================================
 * Tugas 1 Pertemuan 2 — Refactor Kode Warisan (Legacy Code)
 * ============================================================
 * Berisi versi SEBELUM dan SESUDAH refactor.
 * Jalankan: node refactor.js
 */

// ============================================================
// VERSI SEBELUM (legacy — masih jalan, tapi sulit dipelihara)
// ============================================================
function hitungTotalLegacy(daftarItem) {
  var total = 0;
  for (var i = 0; i < daftarItem.length; i++) {
    total = total + (daftarItem[i].harga * daftarItem[i].jumlah);
  }
  return "Total: " + total;
}

function buatPesanLegacy(nama, items) {
  var pesan = "Halo " + nama + ", pesanan Anda: ";
  for (var i = 0; i < items.length; i++) {
    pesan = pesan + items[i].nama + " x" + items[i].jumlah;
    if (i < items.length - 1) pesan = pesan + ", ";
  }
  return pesan;
}

// ============================================================
// VERSI SESUDAH (refactor — ES6+)
// ============================================================

// Arrow function + default parameter + reduce
const hitungTotal = (daftarItem = []) =>
  daftarItem.reduce((acc, { harga, jumlah }) => acc + harga * jumlah, 0);

// Template literal + map + destructuring parameter
const buatPesan = (nama = "Pelanggan", items = []) => {
  const daftar = items
    .map(({ nama: namaItem, jumlah }) => `${namaItem} x${jumlah}`)
    .join(", ");
  return `Halo ${nama}, pesanan Anda: ${daftar}`;
};

// ============================================================
// BUKTI: perilaku sebelum vs sesudah harus SAMA
// ============================================================
const contohItems = [
  { nama: "Kopi Hitam", harga: 15000, jumlah: 2 },
  { nama: "Roti Bakar", harga: 12000, jumlah: 3 },
];

console.log("=== VERSI SEBELUM ===");
console.log("  Total  :", hitungTotalLegacy(contohItems));
console.log("  Pesan  :", buatPesanLegacy("Ilyas", contohItems));

console.log("\n=== VERSI SESUDAH ===");
console.log("  Total  :", `Total: ${hitungTotal(contohItems)}`);
console.log("  Pesan  :", buatPesan("Ilyas", contohItems));

// Verifikasi cepat: keduanya harus menghasilkan string yang identik
const sama =
  hitungTotalLegacy(contohItems) === `Total: ${hitungTotal(contohItems)}` &&
  buatPesanLegacy("Ilyas", contohItems) === buatPesan("Ilyas", contohItems);

console.log("\nHasil identik?", sama ? "✅ Ya" : "❌ Tidak");