
function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function hitungDiskon(total, persen) {
  return total * (persen / 100);
}

module.exports = {
  formatRupiah,
  hitungDiskon,
};