/**
 * ============================================================
 * Latihan Individu Pertemuan 2 — ES6+ & Async
 * ============================================================
 * Lengkapi setiap bagian latihan di file ini. Jalankan:
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
const { nama: namaPertama, harga: hargaPertama } = transaksi[0];
console.log(`Item pertama: ${namaPertama} (${formatRupiah(hargaPertama)})`);
// Output: Item pertama: Kopi Hitam (Rp15.000)

// =========================================================
// LATIHAN 2 — map + reduce
// =========================================================
const subtotal = transaksi.map(({ harga, jumlah }) => harga * jumlah);
const total = subtotal.reduce((acc, s) => acc + s, 0);
console.log("Subtotal tiap item:", subtotal); // [30000, 36000, 50000]
console.log("Total struk:", formatRupiah(total)); // Rp116.000

// =========================================================
// LATIHAN 3 — filter + spread
// =========================================================
const itemMahal = transaksi.filter(({ harga }) => harga > 10000);
const namaItemMahal = [...itemMahal.map(({ nama }) => nama)];
console.log("Item harga > 10000:", namaItemMahal);
// Output: [ 'Kopi Hitam', 'Roti Bakar' ]

// =========================================================
// LATIHAN 4 — Promise + async/await
// =========================================================
function prosesPembayaran(total, delayMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Diskon 10% jika total > 100000
      const totalSetelahDiskon = total > 100000 ? hitungDiskon(total, 10) : total;
      resolve({
        status: "lunas",
        total,
        kembali: total - totalSetelahDiskon,
      });
    }, delayMs);
  });
}

async function jalankanPembayaran() {
  try {
    const hasil = await prosesPembayaran(total, 300);
    console.log("Pembayaran:", hasil);
    // { status: 'lunas', total: 116000, kembali: 11600 }
  } catch (err) {
    console.log("Pembayaran gagal:", err.message);
  }
}

// =========================================================
// LATIHAN 5 — Promise.all
// =========================================================
const tunda = (ms, nilai) => new Promise((resolve) => setTimeout(() => resolve(nilai), ms));

async function laporanCabang() {
  const mulai = Date.now();

  const [cabang1, cabang2, cabang3] = await Promise.all([
    tunda(200, 50),
    tunda(300, 80),
    tunda(100, 70),
  ]);

  const totalPenjualan = [cabang1, cabang2, cabang3].reduce((acc, v) => acc + v, 0);

  console.log("Penjualan cabang:", { cabang1, cabang2, cabang3 });
  console.log("Total penjualan:", totalPenjualan); // 200
  console.log(`Total waktu: ±${Date.now() - mulai}ms (bukan 600ms)`);
}

// =========================================================
// LATIHAN 6 — BONUS: mini formatter struk
// =========================================================
function cetakStruk() {
  const baris = transaksi.map(
    ({ nama, harga, jumlah }, i) =>
      `${i + 1}. ${nama.padEnd(20)} x${jumlah}  ${formatRupiah(harga * jumlah)}`
  );
  console.log("\n=== STRUK E-WARUNG ===");
  console.log(baris.join("\n"));
  console.log(`Total: ${formatRupiah(total)}`);
}

// ---------- Jalankan semua latihan ----------
(async () => {
  await jalankanPembayaran();
  await laporanCabang();
  cetakStruk();
})();