
/**
 * ============================================================
 * Latihan Individu Pertemuan 2 — ES6+ & Async
 * ============================================================
 * Jalankan:
 *   node latihan.js
 */

const { formatRupiah, hitungDiskon } = require("./modul-02");

// ---------- Data ----------
const transaksi = [
  { id: 1, nama: "Kopi Hitam", harga: 15000, jumlah: 2 },
  { id: 2, nama: "Roti Bakar", harga: 12000, jumlah: 3 },
  { id: 3, nama: "Air Mineral", harga: 5000, jumlah: 10 },
];

// =========================================================
// LATIHAN 1 — Destructuring + template literal
// =========================================================
console.log("\n========== LATIHAN 1 ==========");

const { nama, harga } = transaksi[0];

console.log(
  `Item pertama: ${nama} (${formatRupiah(harga)})`
);

// =========================================================
// LATIHAN 2 — map + reduce
// =========================================================
console.log("\n========== LATIHAN 2 ==========");

const transaksiSubtotal = transaksi.map((item) => ({
  ...item,
  subtotal: item.harga * item.jumlah,
}));

transaksiSubtotal.forEach((item) => {
  console.log(
    `${item.nama}: ${formatRupiah(item.subtotal)}`
  );
});

const total = transaksiSubtotal.reduce(
  (akumulasi, item) => akumulasi + item.subtotal,
  0
);

console.log(`TOTAL STRUK: ${formatRupiah(total)}`);

// =========================================================
// LATIHAN 3 — filter + spread
// =========================================================
console.log("\n========== LATIHAN 3 ==========");

const itemTermahal = [
  ...transaksi
    .filter((item) => item.harga > 10000)
    .map((item) => item.nama),
];

console.log("Nama item dengan harga > Rp10.000:");
console.log(itemTermahal);

// =========================================================
// LATIHAN 4 — Promise + async/await
// =========================================================
console.log("\n========== LATIHAN 4 ==========");

function prosesPembayaran(total, delayMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const diskon =
        total > 100000 ? hitungDiskon(total) : 0;

      resolve({
        status: "lunas",
        total,
        kembali: total - diskon,
      });
    }, delayMs);
  });
}

async function jalankanPembayaran() {
  const hasil = await prosesPembayaran(total, 200);

  console.log("Status:", hasil.status);
  console.log("Total awal:", formatRupiah(hasil.total));
  console.log(
    "Total setelah diskon:",
    formatRupiah(hasil.kembali)
  );
}

 // ========================================================
// LATIHAN 5 — Promise.all
// =========================================================
console.log("\n========== LATIHAN 5 ==========");

const tunda = (ms, nilai) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(nilai), ms);
  });

async function laporanCabang() {
  const mulai = Date.now();

  const hasil = await Promise.all([
    tunda(200, 50),
    tunda(300, 80),
    tunda(100, 70),
  ]);

  const totalPenjualan = hasil.reduce(
    (akumulasi, nilai) => akumulasi + nilai,
    0
  );

  const waktuEksekusi = Date.now() - mulai;

  console.log("Penjualan setiap cabang:", hasil);
  console.log("Total penjualan:", totalPenjualan);
  console.log(`Waktu eksekusi: ${waktuEksekusi} ms`);
  console.log(
    "Ketiga laporan berjalan paralel menggunakan Promise.all."
  );
}

// =========================================================
// LATIHAN 6 — BONUS: mini formatter struk
// =========================================================
console.log("\n========== LATIHAN 6 ==========");

function cetakStruk(data) {
  const barisStruk = data.map(
    (item, index) =>
      `${`${index + 1}. ${item.nama}`.padEnd(20)} x${item.jumlah}  ${formatRupiah(item.subtotal)}`
  );

  const isiStruk = barisStruk.join("\n");

  console.log(`
========== E-WARUNG ==========
${isiStruk}
------------------------------
TOTAL: ${formatRupiah(total)}
==============================
`);
}

// Jalankan semua latihan secara berurutan
async function main() {
  cetakStruk(transaksiSubtotal);

  await jalankanPembayaran();
  await laporanCabang();
}

main().catch((error) => {
  console.error("Terjadi kesalahan:", error.message);
});
