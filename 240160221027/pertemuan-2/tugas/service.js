
/**
 * service.js
 * Service perpustakaan pribadi
 * Database menggunakan array di memori.
 */

const jeda = (ms = 150) =>
  new Promise((resolve) => setTimeout(resolve, ms));

let daftarBuku = [
  { id: 1, judul: "Laskar Pelangi", penulis: "Andrea Hirata", tahun: 2005 },
  { id: 2, judul: "Bumi", penulis: "Tere Liye", tahun: 2014 },
  { id: 3, judul: "Negeri 5 Menara", penulis: "Ahmad Fuadi", tahun: 2009 },
];

let idBerikutnya = 4;

// Mengambil semua buku
export async function findAll() {
  await jeda(150);
  return [...daftarBuku];
}

// Mengambil satu buku berdasarkan ID
export async function findById(id) {
  await jeda(150);
  return daftarBuku.find((buku) => buku.id === Number(id)) ?? null;
}

// Menambahkan buku baru
export async function create(data) {
  await jeda(150);

  const { judul, penulis, tahun } = data;

  const bukuBaru = {
    id: idBerikutnya++,
    judul,
    penulis,
    tahun: tahun ?? new Date().getFullYear(),
  };

  daftarBuku.push(bukuBaru);
  return bukuBaru;
}

// Mengubah data buku
export async function update(id, data) {
  await jeda(150);

  const index = daftarBuku.findIndex(
    (buku) => buku.id === Number(id)
  );

  if (index === -1) return null;

  daftarBuku[index] = {
    ...daftarBuku[index],
    ...data,
    id: Number(id),
  };

  return daftarBuku[index];
}

// Menghapus buku
export async function deleteBuku(id) {
  await jeda(150);

  const index = daftarBuku.findIndex(
    (buku) => buku.id === Number(id)
  );

  if (index === -1) return null;

  const [bukuDihapus] = daftarBuku.splice(index, 1);
  return bukuDihapus;
}
