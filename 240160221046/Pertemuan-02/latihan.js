/**
 * ============================================================
 * Latihan Individu Pertemuan 2 — ES6+ & Async
 * ============================================================
 * Lengkapi setiap bagian latihan di file ini. Jalankan:
 *   node latihan.js
 *
 * Semua latihan meniru kode backend nyata. Setelah selesai,
 * wajib bisa menjelaskan tiap baris (kontrak AI Pertemuan 1).
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
// Ambil nama dan harga item PERTAMA tanpa transaksi[0].nama
// Cetak: "Item pertama: Kopi Hitam (Rp15.000)"
// =========================================================
console.log("=== LATIHAN 1 — Destructuring + Template Literal ===");
const [{ nama: namaPertama, harga: hargaPertama }] = transaksi;
console.log(`Item pertama: ${namaPertama} (${formatRupiah(hargaPertama)})`);

// =========================================================
// LATIHAN 2 — map + reduce
// Hitung subtotal tiap item (harga x jumlah) lalu TOTAL struk
// Gunakan map → subtotal, reduce → total. Cetak keduanya.
// =========================================================
console.log("\n=== LATIHAN 2 — map + reduce ===");
const subtotal = transaksi.map((item) => item.harga * item.jumlah);
const totalStruk = subtotal.reduce((acc, curr) => acc + curr, 0);

console.log("Subtotal tiap item:", subtotal);
console.log("Total struk:", formatRupiah(totalStruk));

// =========================================================
// LATIHAN 3 — filter + spread
// Ambil item dengan harga > 10000.
// Buat array baru berisi NAMA semua item termahal
// menggunakan spread pada array hasil filter.
// =========================================================
console.log("\n=== LATIHAN 3 — filter + spread ===");
const itemMahal = transaksi.filter((item) => item.harga > 10000);
const namaItemTermahal = [...itemMahal.map((item) => item.nama)];

console.log("Array nama item dengan harga > 10000:", namaItemTermahal);

// =========================================================
// LATIHAN 4 — Promise + async/await
// Buat fungsi prosesPembayaran(total, delayMs) yang mengembalikan
// Promise: setelah delayMs → resolve { status: "lunas", total, kembali: total - diskon }
// Diskon 10% jika total > 100000 (pakai hitungDiskon dari modul-02).
// Panggil dengan await, cetak hasilnya.
// =========================================================
function prosesPembayaran(total, delayMs = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const diskon = total > 100000 ? hitungDiskon(total, 10) : 0;
      const kembali = total - diskon;
      resolve({ status: "lunas", total, kembali });
    }, delayMs);
  });
}

// =========================================================
// LATIHAN 5 — Promise.all
// Tiga "cabang" mengirim laporan penjualan serentak:
//   tunda(200, 50), tunda(300, 80), tunda(100, 70)
// (angka kedua = penjualan). Gunakan Promise.all, jumlahkan hasilnya.
// Cetak total waktu eksekusi dengan Date.now() — buktikan paralel.
// =========================================================
const tunda = (ms, nilai) => new Promise((resolve) => setTimeout(() => resolve(nilai), ms));

// =========================================================
// LATIHAN 6 — BONUS: mini formatter struk
// Cetak struk rapi memakai map + template literal multi-baris:
//   1. Kopi Hitam       x2  Rp30.000
//   2. Roti Bakar       x3  Rp36.000
//   ...
// Gunakan formatRupiah dari modul-02 dan .padEnd(20).
// =========================================================
function formatStruk() {
  const baris = transaksi
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.nama.padEnd(20)} x${item.jumlah}  ${formatRupiah(item.harga * item.jumlah)}`
    )
    .join("\n");

  return `========================================
           STRUK E-WARUNG KAMPUS        
========================================
${baris}
----------------------------------------
Total:                ${formatRupiah(totalStruk)}
========================================`;
}

// ---------- Eksekusi Async (Latihan 4, 5, dan 6) ----------
async function main() {
  // Latihan 4
  console.log("\n=== LATIHAN 4 — Promise + async/await ===");
  const hasilPembayaran = await prosesPembayaran(totalStruk, 500);
  console.log("Hasil pembayaran:", hasilPembayaran);

  // Latihan 5
  console.log("\n=== LATIHAN 5 — Promise.all ===");
  const mulai = Date.now();
  const laporanCabang = await Promise.all([
    tunda(200, 50),
    tunda(300, 80),
    tunda(100, 70),
  ]);
  const totalPenjualan = laporanCabang.reduce((acc, curr) => acc + curr, 0);
  const waktuEksekusi = Date.now() - mulai;

  console.log("Laporan 3 cabang:", laporanCabang);
  console.log("Total penjualan cabang:", totalPenjualan);
  console.log(`Total waktu eksekusi: ±${waktuEksekusi}ms (terbukti paralel karena mendekati ~300ms, bukan 600ms)`);

  // Latihan 6
  console.log("\n=== LATIHAN 6 (BONUS) — Mini Formatter Struk ===");
  console.log(formatStruk());
}

main();

function formatStruk() {
  const baris = transaksi
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.nama.padEnd(20)} x${item.jumlah}  ${formatRupiah(item.harga * item.jumlah)}`
    )
    .join("\n");

  return `========================================
           STRUK E-WARUNG KAMPUS        
========================================
${baris}
----------------------------------------
Total:                ${formatRupiah(totalStruk)}
========================================`;
}

// ---------- Eksekusi Async (Latihan 4, 5, dan 6) ----------
async function main() {
  // Latihan 4
  console.log("\n=== LATIHAN 4 — Promise + async/await ===");
  const hasilPembayaran = await prosesPembayaran(totalStruk, 500);
  console.log("Hasil pembayaran:", hasilPembayaran);

  // Latihan 5
  console.log("\n=== LATIHAN 5 — Promise.all ===");
  const mulai = Date.now();
  const laporanCabang = await Promise.all([
    tunda(200, 50),
    tunda(300, 80),
    tunda(100, 70),
  ]);
  const totalPenjualan = laporanCabang.reduce((acc, curr) => acc + curr, 0);
  const waktuEksekusi = Date.now() - mulai;

  console.log("Laporan 3 cabang:", laporanCabang);
  console.log("Total penjualan cabang:", totalPenjualan);
  console.log(`Total waktu eksekusi: ±${waktuEksekusi}ms (terbukti paralel karena mendekati ~300ms, bukan 600ms)`);

  // Latihan 6
  console.log("\n=== LATIHAN 6 (BONUS) — Mini Formatter Struk ===");
  console.log(formatStruk());
}

main();