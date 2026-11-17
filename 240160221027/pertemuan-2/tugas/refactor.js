
console.log("=== SEBELUM REFACTOR ===");

// Function biasa
function sapa(nama) {
  return "Halo, " + nama;
}

const hargaBukuLama = [15000, 25000, 10000];

const totalLama = hargaBukuLama.reduce(function (total, harga) {
  return total + harga;
}, 0);

console.log(sapa("Rifqie"));
console.log("Total harga:", totalLama);

console.log("\n=== SESUDAH REFACTOR ===");

// Arrow function + template literal
const sapaModern = (nama = "Pembaca") => `Halo, ${nama}`;

const buku = [
  { judul: "Laskar Pelangi", harga: 15000 },
  { judul: "Bumi", harga: 25000 },
  { judul: "Negeri 5 Menara", harga: 10000 },
];

// Destructuring
const { judul, harga } = buku[0];
console.log(`Buku pertama: ${judul}, harga Rp${harga}`);

// Map
const hargaBuku = buku.map(({ harga }) => harga);
console.log("Daftar harga:", hargaBuku);

// Filter
const bukuMahal = buku.filter(({ harga }) => harga > 10000);
console.log("Buku di atas Rp10.000:", bukuMahal);

// Reduce
const total = hargaBuku.reduce((jumlah, harga) => jumlah + harga, 0);
console.log(`Total harga: Rp${total}`);

// Default value
console.log(sapaModern("Rifqie"));
console.log(sapaModern());
