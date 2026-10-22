// refactor.js — HASIL REFACTOR

let books = [
    { id: 1, title: "Bumi Manusia", author: "Pramoedya Ananta Toer", year: 1980 },
    { id: 2, title: "Laskar Pelangi", author: "Andrea Hirata", year: 2005 },
    { id: 3, title: "Filosofi Teras", author: "Henry Manampiring", year: 2018 }
];

// [REFACTOR] Arrow function + default value
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

// [REFACTOR] Arrow function + async/await
const findAll = async () => {
    await delay(150);
    return books;
};

// [REFACTOR] Arrow function + array method .find() + nullish coalescing
const findById = async (id = 0) => {
    await delay(100);
    return books.find((b) => b.id === id) ?? null;
};

// [REFACTOR] Destructuring parameter + spread operator + .reduce()
const create = async ({ title, author, year } = {}) => {
    await delay(200);
    const lastId = books.reduce((max, b) => (b.id > max ? b.id : max), 0);
    const newBook = { id: lastId + 1, title, author, year };
    books.push(newBook);
    // [REFACTOR] Template literal
    console.log(`[LOG] Buku baru dibuat: "${title}" dengan ID ${newBook.id}`);
    return newBook;
};

// [REFACTOR] Destructuring + spread operator untuk merge data
const update = async (id, updatedData = {}) => {
    await delay(250);
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return null;
    books[index] = { ...books[index], ...updatedData };
    return books[index];
};

// [REFACTOR] .filter() menggantikan loop + splice
const remove = async (id) => {
    await delay(300);
    const book = books.find((b) => b.id === id);
    if (!book) return null;
    books = books.filter((b) => b.id !== id);
    return book;
};

module.exports = { findAll, findById, create, update, remove };