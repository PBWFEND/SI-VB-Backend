/**
 * Modul helper untuk Pertemuan 2
 */

function formatRupiah(angka) {
  return `Rp${Number(angka).toLocaleString("id-ID")}`;
}

function hitungDiskon(total, persen = 10) {
  const p = persen > 1 ? persen / 100 : persen;
  return total * p;
}

module.exports = {
  formatRupiah,
  hitungDiskon,
};

