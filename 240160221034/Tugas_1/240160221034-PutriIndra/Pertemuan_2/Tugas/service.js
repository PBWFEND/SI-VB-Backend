const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Database in-memory
let buku = [
  {
    id: 1,
    judul: "Belajar Node.js",
    penulis: "Andi",
    tahun: 2024,
    stok: 3,
  },
  {
    id: 2,
    judul: "Dasar JavaScript",
    penulis: "Budi",
    tahun: 2023,
    stok: 0,
  },
];

let nextId = 3;

// Mengambil semua buku
async function findAll() {
  await delay(150);
  return buku;
}

// Mengambil satu buku berdasarkan id
async function findById(id) {
  await delay(150);
  return buku.find((b) => b.id === Number(id)) ?? null;
}

// Menambahkan buku
async function create({ judul, penulis, tahun, stok = 0 }) {
  await delay(150);

  const baru = {
    id: nextId++,
    judul,
    penulis,
    tahun,
    stok,
  };

  buku.push(baru);
  return baru;
}

// Mengubah data buku
async function update(id, data) {
  await delay(150);

  const found = buku.find((b) => b.id === Number(id));

  if (!found) return null;

  Object.assign(found, data);
  return found;
}

// Menghapus buku
async function remove(id) {
  await delay(150);

  const index = buku.findIndex((b) => b.id === Number(id));

  if (index === -1) return null;

  const [dihapus] = buku.splice(index, 1);
  return dihapus;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: remove,
};