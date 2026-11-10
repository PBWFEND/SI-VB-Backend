// Menggunakan arrow function, template literal, destructuring, array method (filter & map), dan default value
const getBookSummary = (books = []) => {
  return books
    .filter(({ stock }) => stock > 0)
    .map(({ title, author, stock }) => `Buku ${title} karya ${author} tersedia sebanyak ${stock} eksemplar.`);
};