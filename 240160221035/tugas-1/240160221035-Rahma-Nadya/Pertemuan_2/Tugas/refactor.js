// Kode sebelum di-refactor

function tampilkanBarang(barang) {
  var hasil = [];

  for (var i = 0; i < barang.length; i++) {
    hasil.push(barang[i].nama);
  }

  return hasil;
}

// Kode setelah di-refactor

const tampilkanBarang = (barang) => {
  return barang.map(({ nama }) => nama);
};

const infoBarang = (nama, harga = 0) => {
  return `${nama} memiliki harga Rp${harga}`;
};
