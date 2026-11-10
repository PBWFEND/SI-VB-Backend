// Mengambil fungsi dari modul-02.js
const { formatRupiah, hitungDiskon } = require("./modul-02");

// Data transaksi
const transaksi = [
  { id: 1, nama: "Kopi Hitam", harga: 15000, jumlah: 2 },
  { id: 2, nama: "Roti Bakar", harga: 12000, jumlah: 3 },
  { id: 3, nama: "Air Mineral", harga: 5000, jumlah: 10 },
];


// =========================================================
// LATIHAN 1 — Destructuring + template literal
const { nama, harga } = transaksi[0];

console.log(`Item pertama: ${nama} (${formatRupiah(harga)})`);

// Ambil nama dan harga item PERTAMA tanpa transaksi[0].nama
// Cetak: "Item pertama: Kopi Hitam (Rp15.000)"
// =========================================================

// =========================================================
// LATIHAN 2 — map + reduce
const subtotal = transaksi.map((item) => {
  return item.harga * item.jumlah;
});

const total = subtotal.reduce((jumlah, nilai) => {
  return jumlah + nilai;
}, 0);

console.log("Subtotal setiap item:", subtotal);
console.log("Total struk:", formatRupiah(total));

// Hitung subtotal tiap item (harga x jumlah) lalu TOTAL struk
// Gunakan map → subtotal, reduce → total. Cetak keduanya.
// =========================================================

// =========================================================
// LATIHAN 3 — filter + spread
const itemTermahal = transaksi.filter((item) => item.harga > 10000);

const namaItemTermahal = [...itemTermahal].map((item) => item.nama);

console.log("Nama item termahal:", namaItemTermahal);

// Ambil item dengan harga > 10000.
// Buat array baru berisi NAMA semua item termahal
// menggunakan spread pada array hasil filter.
// =========================================================

// =========================================================
// LATIHAN 4 — Promise + async/await
function prosesPembayaran(total, delayMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalBayar =
        total > 100000 ? hitungDiskon(total, 10) : total;

      resolve({
        status: "lunas",
        total: totalBayar,
        kembali: 0,
      });
    }, delayMs);
  });
}

async function jalankanPembayaran() {
  const hasil = await prosesPembayaran(116000, 1000);
  console.log("Hasil pembayaran:", hasil);
}

jalankanPembayaran();

// Buat fungsi prosesPembayaran(total, delayMs) yang mengembalikan
// Promise: setelah delayMs → resolve { status: "lunas", total, kembali: total - diskon }
// Diskon 10% jika total > 100000 (pakai hitungDiskon dari modul-02).
// Panggil dengan await, cetak hasilnya.
// =========================================================

// =========================================================
// Fungsi tunda harus dibuat terlebih dahulu
const tunda = (ms, nilai) =>
  new Promise((resolve) => setTimeout(() => resolve(nilai), ms));
// LATIHAN 5 — Promise.all
async function laporanCabang() {
  const mulai = Date.now();

  const hasil = await Promise.all([
    tunda(200, 50),
    tunda(300, 80),
    tunda(100, 70),
  ]);

  const totalPenjualan = hasil.reduce((total, nilai) => {
    return total + nilai;
  }, 0);

  const waktu = Date.now() - mulai;

  console.log("Hasil penjualan tiap cabang:", hasil);
  console.log("Total penjualan:", totalPenjualan);
  console.log("Waktu eksekusi:", waktu, "ms");
}

laporanCabang();

// Tiga "cabang" mengirim laporan penjualan serentak:
//   tunda(200, 50), tunda(300, 80), tunda(100, 70)
// (angka kedua = penjualan). Gunakan Promise.all, jumlahkan hasilnya.
// Cetak total waktu eksekusi dengan Date.now() — buktikan paralel.
// =========================================================

// =========================================================
// LATIHAN 6 — BONUS: mini formatter struk
const daftarStruk = transaksi.map((item, index) => {
  const subtotal = item.harga * item.jumlah;

  return `${index + 1}. ${item.nama.padEnd(20)} x${item.jumlah} ${formatRupiah(subtotal)}`;
});

console.log("\n========== STRUK BELANJA ==========");
daftarStruk.forEach((baris) => console.log(baris));
console.log("===================================");
console.log(`Total: ${formatRupiah(total)}`);

// Cetak struk rapi memakai map + template literal multi-baris:
//   1. Kopi Hitam       x2  Rp30.000
//   2. Roti Bakar       x3  Rp36.000
//   ...
// Gunakan formatRupiah dari modul-02 dan .padEnd(20).
// =========================================================