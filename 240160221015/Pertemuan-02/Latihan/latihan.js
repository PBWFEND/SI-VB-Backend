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

// Destructuring array: ambil elemen pertama langsung, tanpa indeks manual
const [itemPertama] = transaksi;

// Destructuring object: ambil field nama & harga dari itemPertama
const { nama: namaPertama, harga: hargaPertama } = itemPertama;

// Template literal + formatRupiah dari modul-02
console.log(`Item pertama: ${namaPertama} (${formatRupiah(hargaPertama)})`);

// =========================================================
// LATIHAN 2 — map + reduce
// Hitung subtotal tiap item (harga x jumlah) lalu TOTAL struk
// Gunakan map → subtotal, reduce → total. Cetak keduanya.
// =========================================================
console.log("\n=== LATIHAN 2 — map + reduce ===");

// map: transformasi tiap item menjadi object berisi subtotal
const denganSubtotal = transaksi.map((item) => ({
  ...item,                                  // spread: salin field asli
  subtotal: item.harga * item.jumlah,       // tambahkan field baru
}));

// reduce: lipat array menjadi satu angka total
const totalBelanja = denganSubtotal.reduce(
  (acc, item) => acc + item.subtotal,
  0
);

// Cetak subtotal tiap item
denganSubtotal.forEach((item) => {
  console.log(`  ${item.nama} x${item.jumlah} → ${formatRupiah(item.subtotal)}`);
});

console.log(`TOTAL struk: ${formatRupiah(totalBelanja)}`);

// =========================================================
// LATIHAN 3 — filter + spread
// Ambil item dengan harga > 10000.
// Buat array baru berisi NAMA semua item termahal
// menggunakan spread pada array hasil filter.
// =========================================================
console.log("\n=== LATIHAN 3 — filter + spread ===");

// filter: saring item dengan harga di atas 10.000
const itemMahal = transaksi.filter((item) => item.harga > 10000);

// map: ambil nama saja
const namaItemMahal = itemMahal.map((item) => item.nama);

// spread: buat array baru dari hasil filter (contoh penerapan spread pada array)
const namaItemMahalSpread = [...namaItemMahal];

console.log("Item dengan harga > Rp10.000:");
namaItemMahalSpread.forEach((nama, i) => {
  console.log(`  ${i + 1}. ${nama}`);
});

// =========================================================
// LATIHAN 4 — Promise + async/await
// Buat fungsi prosesPembayaran(total, delayMs) yang mengembalikan
// Promise: setelah delayMs → resolve { status: "lunas", total, kembali: total - diskon }
// Diskon 10% jika total > 100000 (pakai hitungDiskon dari modul-02).
// Panggil dengan await, cetak hasilnya.
// =========================================================
console.log("\n=== LATIHAN 4 — Promise + async/await ===");

function prosesPembayaran(total, delayMs = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Destructuring + default: jika total <= 100000, diskon = 0
      const diskon = total > 100000 ? hitungDiskon(total, 10) : total;
      const kembali = total - diskon;

      resolve({
        status: "lunas",
        total,
        diskon: total - diskon,
        kembali,
      });
    }, delayMs);
  });
}

// async IIFE (Immediately Invoked Function Expression)
// Karena await hanya boleh di dalam fungsi async, kita bungkus dalam IIFE.
(async () => {
  const hasilBayar = await prosesPembayaran(totalBelanja, 200);
  console.log("Hasil pembayaran:", hasilBayar);

  // =========================================================
  // LATIHAN 5 — Promise.all
  // Tiga "cabang" mengirim laporan penjualan serentak:
  //   tunda(200, 50), tunda(300, 80), tunda(100, 70)
  // Gunakan Promise.all, jumlahkan hasilnya.
  // Cetak total waktu eksekusi dengan Date.now() — buktikan paralel.
  // =========================================================
  console.log("\n=== LATIHAN 5 — Promise.all (paralel) ===");

  const tunda = (ms, nilai) =>
    new Promise((resolve) => setTimeout(() => resolve(nilai), ms));

  const mulai = Date.now();

  // Ketiga laporan "berjalan bersamaan" — total waktu = yang terlama (300ms)
  const [cabang1, cabang2, cabang3] = await Promise.all([
    tunda(200, 50),
    tunda(300, 80),
    tunda(100, 70),
  ]);

  const totalCabang = cabang1 + cabang2 + cabang3;
  const durasi = Date.now() - mulai;

  console.log(`  Cabang 1: ${cabang1}`);
  console.log(`  Cabang 2: ${cabang2}`);
  console.log(`  Cabang 3: ${cabang3}`);
  console.log(`  Total penjualan: ${totalCabang}`);
  console.log(`  Waktu eksekusi: ±${durasi}ms (bukan 200+300+100=600ms)`);

  // =========================================================
  // LATIHAN 6 — BONUS: mini formatter struk
  // Cetak struk rapi memakai map + template literal multi-baris:
  //   1. Kopi Hitam       x2  Rp30.000
  //   2. Roti Bakar       x3  Rp36.000
  //   ...
  // Gunakan formatRupiah dari modul-02 dan .padEnd(20).
  // =========================================================
  console.log("\n=== LATIHAN 6 — Mini Formatter Struk ===");

  // map: ubah tiap item menjadi satu baris teks struk
  const barisStruk = denganSubtotal.map(
    (item, i) =>
      `${String(i + 1).padStart(2)}. ${item.nama.padEnd(20)}` +
      `x${item.jumlah}  ${formatRupiah(item.subtotal)}`
  );

  // join("\n") agar tiap baris jadi baris baru
  console.log(barisStruk.join("\n"));
  console.log("-".repeat(40));
  console.log(`TOTAL: ${formatRupiah(totalBelanja)}`.padEnd(40));
  console.log(`STATUS: ${hasilBayar.status.toUpperCase()}`);
})();