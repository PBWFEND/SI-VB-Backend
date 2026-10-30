
/**
 * ============================================================
 * Latihan Individu Pertemuan 2 — ES6+ & Async
 * ============================================================
 */

const { formatRupiah, hitungDiskon } = require("./modul-02");

// ---------- Data ----------
const transaksi = [
  { id: 1, nama: "Kopi Hitam", harga: 15000, jumlah: 2 },
  { id: 2, nama: "Roti Bakar", harga: 12000, jumlah: 3 },
  { id: 3, nama: "Air Mineral", harga: 5000, jumlah: 10 },
];

// ---------- LATIHAN 1 ----------
function latihan1() {
  console.log("\n==================================================");
  console.log("LATIHAN 1 — Destructuring + Template Literal");
  console.log("==================================================");

  const { nama, harga } = transaksi[0];

  console.log(`Item pertama: ${nama} (${formatRupiah(harga)})`);
}

// ---------- LATIHAN 2 ----------
function latihan2() {
  console.log("\n==================================================");
  console.log("LATIHAN 2 — map + reduce");
  console.log("==================================================");

  const subtotal = transaksi.map((item) => ({
    nama: item.nama,
    subtotal: item.harga * item.jumlah,
  }));

  const total = subtotal.reduce(
    (akumulasi, item) => akumulasi + item.subtotal,
    0
  );

  subtotal.forEach((item) => {
    console.log(`${item.nama.padEnd(20)} ${formatRupiah(item.subtotal)}`);
  });

  console.log("--------------------------------------------------");
  console.log(`TOTAL STRUK           ${formatRupiah(total)}`);

  return total;
}

// ---------- LATIHAN 3 ----------
function latihan3() {
  console.log("\n==================================================");
  console.log("LATIHAN 3 — filter + spread");
  console.log("==================================================");

  const itemTermahal = transaksi.filter((item) => item.harga > 10000);
  const namaItemTermahal = [...itemTermahal.map((item) => item.nama)];

  console.log("Item dengan harga di atas Rp10.000:");

  namaItemTermahal.forEach((nama, index) => {
    console.log(`${index + 1}. ${nama}`);
  });
}

// ---------- LATIHAN 4 ----------
function prosesPembayaran(total, delayMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const diskon =
        total > 100000 ? hitungDiskon(total, 10) : 0;

      resolve({
        status: "Lunas",
        totalAwal: total,
        diskon,
        totalBayar: total - diskon,
      });
    }, delayMs);
  });
}

async function latihan4(total) {
  console.log("\n==================================================");
  console.log("LATIHAN 4 — Promise + async/await");
  console.log("==================================================");

  const hasil = await prosesPembayaran(total, 1000);

  console.log(`Status pembayaran : ${hasil.status}`);
  console.log(`Total awal        : ${formatRupiah(hasil.totalAwal)}`);
  console.log(`Diskon 10%        : ${formatRupiah(hasil.diskon)}`);
  console.log(`Total setelah diskon: ${formatRupiah(hasil.totalBayar)}`);
}

// ---------- LATIHAN 5 ----------
const tunda = (ms, nilai) =>
  new Promise((resolve) => setTimeout(() => resolve(nilai), ms));

async function latihan5() {
  console.log("\n==================================================");
  console.log("LATIHAN 5 — Promise.all");
  console.log("==================================================");

  const mulai = Date.now();

  const hasil = await Promise.all([
    tunda(200, 50),
    tunda(300, 80),
    tunda(100, 70),
  ]);

  const waktuEksekusi = Date.now() - mulai;

  const totalPenjualan = hasil.reduce(
    (akumulasi, nilai) => akumulasi + nilai,
    0
  );

  console.log(`Penjualan cabang 1 : ${hasil[0]}`);
  console.log(`Penjualan cabang 2 : ${hasil[1]}`);
  console.log(`Penjualan cabang 3 : ${hasil[2]}`);
  console.log(`Total penjualan    : ${totalPenjualan}`);
  console.log(`Waktu eksekusi     : ${waktuEksekusi} ms`);
}

// ---------- LATIHAN 6 ----------
function latihan6(total) {
  console.log("\n==================================================");
  console.log("LATIHAN 6 — Bonus: Mini Formatter Struk");
  console.log("==================================================");

  console.log("                 STRUK PEMBELIAN");
  console.log("--------------------------------------------------");
  console.log("No. Nama Barang       Qty       Subtotal");
  console.log("--------------------------------------------------");

  const daftarStruk = transaksi.map((item, index) => {
    const jumlahHarga = item.harga * item.jumlah;

    return (
      `${String(index + 1).padEnd(5)}` +
      `${item.nama.padEnd(19)}` +
      `${String(item.jumlah).padEnd(10)}` +
      `${formatRupiah(jumlahHarga)}`
    );
  });

  console.log(daftarStruk.join("\n"));
  console.log("--------------------------------------------------");
  console.log(`TOTAL                                  ${formatRupiah(total)}`);
  console.log("==================================================");
}

// ---------- PROGRAM UTAMA ----------
async function main() {
  console.log("\n          LATIHAN INDIVIDU PERTEMUAN 2");
  console.log("                  ES6+ & ASYNC");

  latihan1();

  const total = latihan2();

  latihan3();

  await latihan4(total);

  await latihan5();

  latihan6(total);

  console.log("\nSemua latihan berhasil dijalankan!");
}

main().catch((error) => {
  console.error("Terjadi kesalahan:", error);
});
