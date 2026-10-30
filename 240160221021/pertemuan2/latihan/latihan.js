/**
 * Latihan Individu Pertemuan 2 - ES6+ & Async
 * Jalankan: node latihan.js
 */

const { formatRupiah, hitungDiskon } = require("./modul-02");

// ---------- Data ----------
const transaksi = [
  { id: 1, nama: "Kopi Hitam", harga: 15000, jumlah: 2 },
  { id: 2, nama: "Roti Bakar", harga: 12000, jumlah: 3 },
  { id: 3, nama: "Air Mineral", harga: 5000, jumlah: 10 },
];

// LATIHAN 1 - Destructuring + template literal
// Ambil nama dan harga item PERTAMA tanpa transaksi[0].nama
// Cetak: "Item pertama: Kopi Hitam (Rp15.000)"
const [{ nama, harga }] = transaksi;
console.log(`Item pertama: ${nama} (${formatRupiah(harga)})`);

// LATIHAN 2 - map + reduce
// Hitung subtotal tiap item (harga x jumlah) lalu TOTAL struk
const subtotal = transaksi.map((item) => item.harga * item.jumlah);
console.log("Subtotal:", subtotal);
const total = subtotal.reduce((acc, nilai) => acc + nilai, 0);
console.log(`Total struk: ${formatRupiah(total)}`);

// LATIHAN 3 - filter + spread
// Ambil item dengan harga > 10000, lalu buat array berisi NAMA-nya
const itemMahal = transaksi.filter((item) => item.harga > 10000);
const namaMahal = [...itemMahal.map((item) => item.nama)];
console.log("Item harga > 10000:", namaMahal);

// LATIHAN 4 - Promise + async/await
// Buat fungsi prosesPembayaran(total, delayMs)
const prosesPembayaran = (totalBayar, delayMs) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const setelahDiskon = totalBayar > 100000 ? hitungDiskon(totalBayar, 10) : totalBayar;
      resolve({ status: "lunas", total: totalBayar, kembali: setelahDiskon });
    }, delayMs);
  });

async function jalankanPembayaran() {
  const hasil = await prosesPembayaran(total, 500);
  console.log("Hasil pembayaran:", hasil);
}
jalankanPembayaran();

// LATIHAN 5 - Promise.all
const tunda = (ms, nilai) => new Promise((resolve) => setTimeout(() => resolve(nilai), ms));

async function jalankanLaporan() {
  const mulai = Date.now();
  const laporan = await Promise.all([tunda(200, 50), tunda(300, 80), tunda(100, 70)]);
  const totalPenjualan = laporan.reduce((acc, nilai) => acc + nilai, 0);
  console.log("Laporan cabang:", laporan, "Total penjualan:", totalPenjualan);
  console.log(`Waktu eksekusi: ${Date.now() - mulai}ms (paralel, bukan 600ms)`);
}
jalankanLaporan();

// LATIHAN 6 - BONUS: mini formatter struk
const baris = (item, i) =>
  `${i + 1}. ${item.nama}`.padEnd(20) + `x${item.jumlah}  ${formatRupiah(item.harga * item.jumlah)}`;
const struk = transaksi.map(baris).join("\n");
console.log(`
===== STRUK =====
${struk}
-----------------
Total: ${formatRupiah(total)}
`);