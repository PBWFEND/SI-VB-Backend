// ==========================================
// VERSI SEBELUM (kode warisan)
// ==========================================

var alat = [
  { nama: "Mikroskop", jumlah: 5 },
  { nama: "Multimeter", jumlah: 10 },
  { nama: "Oscilloscope", jumlah: 3 }
];

function tampilkanAlat(data) {
  for (var i = 0; i < data.length; i++) {
    console.log("Alat: " + data[i].nama + ", Jumlah: " + data[i].jumlah);
  }
}

tampilkanAlat(alat);


// ==========================================
// VERSI SESUDAH (hasil refactor ES6+)
// ==========================================

const alatBaru = [
  { nama: "Mikroskop", jumlah: 5 },
  { nama: "Multimeter", jumlah: 10 },
  { nama: "Oscilloscope", jumlah: 3 }
];

// Arrow function + destructuring + default value
const tampilkanAlatBaru = (data = []) => {
  const hasil = data.map(({ nama, jumlah }) =>
    `Alat: ${nama}, Jumlah: ${jumlah}`
  );

  hasil.forEach((item) => console.log(item));
};

tampilkanAlatBaru(alatBaru);