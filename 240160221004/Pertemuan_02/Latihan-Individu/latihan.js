/**
 * ============================================================
 * Latihan Individu Pertemuan 2 — ES6+ & Async
 * ============================================================
 * Lengkapi setiap bagian latihan di file ini. Jalankan:
 *   node latihan.js
 */

// ---------- Fungsi ----------
function formatRupiah(angka) {
  return "Rp" + new Intl.NumberFormat("id-ID").format(angka);
}

function hitungDiskon(harga, persen) {
  return harga - (harga * persen) / 100;
}

// ---------- Data ----------
const transaksi = [
  { id: 1, nama: "Kopi Hitam", harga: 15000, jumlah: 2 },
  { id: 2, nama: "Roti Bakar", harga: 12000, jumlah: 3 },
  { id: 3, nama: "Air Mineral", harga: 5000, jumlah: 10 },
];

// =========================================================
// LATIHAN 1 — Destructuring + template literal
// =========================================================

const [{ nama, harga }] = transaksi;

console.log(`Item pertama: ${nama} (${formatRupiah(harga)})`);

// =========================================================
// LATIHAN 2 — map + reduce
// =========================================================

const subtotal = transaksi.map((item) => item.harga * item.jumlah);

const total = subtotal.reduce((acc, nilai) => acc + nilai, 0);

console.log("Subtotal tiap item:", subtotal);
console.log("Total struk:", formatRupiah(total));

// =========================================================
// LATIHAN 3 — filter + spread
// =========================================================

const itemTermahal = transaksi.filter((item) => item.harga > 10000);

const namaItemTermahal = [...itemTermahal.map((item) => item.nama)];

console.log("Item dengan harga > 10000:", namaItemTermahal);

// =========================================================
// LATIHAN 4 — Promise + async/await
// =========================================================

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

async function proses() {
  const hasilPembayaran = await prosesPembayaran(total, 500);

  console.log("Hasil pembayaran:", hasilPembayaran);

  // =========================================================
  // LATIHAN 5 — Promise.all
  // =========================================================

  const tunda = (ms, nilai) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(nilai), ms);
    });

  const mulai = Date.now();

  const hasilCabang = await Promise.all([
    tunda(200, 50),
    tunda(300, 80),
    tunda(100, 70),
  ]);

  const totalPenjualan = hasilCabang.reduce(
    (acc, nilai) => acc + nilai,
    0
  );

  const waktu = Date.now() - mulai;

  console.log("Hasil laporan cabang:", hasilCabang);
  console.log("Total penjualan:", totalPenjualan);
  console.log(`Waktu eksekusi: ±${waktu}ms`);

  // =========================================================
  // LATIHAN 6 — BONUS: mini formatter struk
  // =========================================================

  const detailStruk = transaksi
    .map(
      (item, index) =>
        `${index + 1}. ${item.nama.padEnd(20)} x${item.jumlah}  ${formatRupiah(
          item.harga * item.jumlah
        )}`
    )
    .join("\n");

  console.log("\n=== STRUK E-WARUNG KAMPUS ===");
  console.log(detailStruk);
  console.log(`Total: ${formatRupiah(total)}`);
}

proses();
