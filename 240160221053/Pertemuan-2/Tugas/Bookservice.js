// bookService.js

// In-memory database
let books = [
  { id: 1, title: "Bumi Manusia", author: "Pramoedya Ananta Toer", stock: 5 },
  { id: 2, title: "Laskar Pelangi", author: "Andrea Hirata", stock: 3 }
];

let nextId = 3;

// Simulasi waktu tunda (100-300 ms)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () => delay(Math.floor(Math.random() * 200) + 100);

// 1. findAll
const findAll = async () => {
  await randomDelay();
  return books;
};

// 2. findById
const findById = async (id) => {
  await randomDelay();
  const book = books.find((b) => b.id === id);
  return book || null;
};

// 3. create
const create = async (data) => {
  await randomDelay();
  const newBook = { id: nextId++, ...data };
  books.push(newBook);
  return newBook;
};

// 4. update
const update = async (id, data) => {
  await randomDelay();
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return null;
  
  books[index] = { ...books[index], ...data };
  return books[index];
};

// 5. delete
const deleteBook = async (id) => {
  await randomDelay();
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return null;
  
  const deletedBook = books[index];
  books = books.filter((b) => b.id !== id);
  return deletedBook;
};

module.exports = { findAll, findById, create, update, delete: deleteBook };