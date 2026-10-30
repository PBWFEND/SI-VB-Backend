
const books = [
  {
    id: 1,
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    year: 1980,
  },
  {
    id: 2,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    year: 2005,
  },
  {
    id: 3,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    year: 2018,
  },
];

let nextId = 4;

// Simulasi waktu tunggu seperti proses database
const delay = (ms = 150) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// 1. Mengambil semua buku
const findAll = async () => {
  await delay(150);
  return books;
};

// 2. Mencari buku berdasarkan ID
const findById = async (id) => {
  await delay(100);
  return books.find((book) => book.id === Number(id)) ?? null;
};

// 3. Menambahkan buku baru
const create = async ({
  title = "Tanpa Judul",
  author = "Anonim",
  year = new Date().getFullYear(),
} = {}) => {
  await delay(200);

  const newBook = {
    id: nextId++,
    title,
    author,
    year,
  };

  books.push(newBook);
  return newBook;
};

// 4. Mengubah sebagian data buku
const update = async (id, updatedData = {}) => {
  await delay(250);

  const index = books.findIndex(
    (book) => book.id === Number(id)
  );

  if (index === -1) return null;

  books[index] = { ...books[index], ...updatedData };
  return books[index];
};

// 5. Menghapus buku berdasarkan ID
const deleteBook = async (id) => {
  await delay(300);

  const index = books.findIndex(
    (book) => book.id === Number(id)
  );

  if (index === -1) return null;

  const [deletedBook] = books.splice(index, 1);
  return deletedBook;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteBook,
};
