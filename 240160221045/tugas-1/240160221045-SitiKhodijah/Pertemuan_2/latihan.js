const { formatRupiah, hitungDiskon } = require("./modul-02");

const transaksi = [
  { id: 1, nama: "Kopi Hitam", harga: 15000, jumlah: 2 },
  { id: 2, nama: "Roti Bakar", harga: 12000, jumlah: 3 },
  { id: 3, nama: "Air Mineral", harga: 5000, jumlah: 10 },
];
const { nama, harga } = transaksi[0];

console.log(`Item pertama: ${nama} (${formatRupiah(harga)})`);

const subtotal = transaksi.map((item) => item.harga * item.jumlah);

console.log("Subtotal tiap item:", subtotal);

const total = subtotal.reduce((a, b) => a + b, 0);

console.log("Total struk:", formatRupiah(total));

const itemTermahal = transaksi.filter((item) => item.harga > 10000);

console.log(itemTermahal);

const namaItemTermahal = [...itemTermahal].map((item) => item.nama);

console.log("Nama item termahal:", namaItemTermahal);

function prosesPembayaran(total, delayMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalSetelahDiskon =
        total > 100000 ? hitungDiskon(total, 10) : total;

      resolve({
  status: "lunas",
  total,
  kembali: total - totalSetelahDiskon,
});
    }, delayMs);
  });
}

async function jalankanPembayaran() {
  const hasil = await prosesPembayaran(total, 500);

  console.log("Hasil pembayaran:", hasil);
}

jalankanPembayaran();

const tunda = (ms, nilai) =>
  new Promise((resolve) => setTimeout(() => resolve(nilai), ms));

async function laporanCabang() {
  const mulai = Date.now();

  const laporan = await Promise.all([
    tunda(200, 50),
    tunda(300, 80),
    tunda(100, 70),
  ]);

  console.log("Laporan cabang:", laporan);

  const totalLaporan = laporan.reduce((a, b) => a + b, 0);

  const selesai = Date.now();

  console.log("Total penjualan:", totalLaporan);
  console.log("Waktu eksekusi:", selesai - mulai, "ms");
}

laporanCabang();

const struk = transaksi.map((item, index) => {
  const subtotal = item.harga * item.jumlah;

  return `${index + 1}. ${item.nama.padEnd(20)} x${item.jumlah} ${formatRupiah(subtotal)}`;
});

console.log(struk.join("\n"));