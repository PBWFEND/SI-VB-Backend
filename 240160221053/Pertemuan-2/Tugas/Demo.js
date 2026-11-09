// demo.js
const bookService = require('./bookService');

const runDemo = async () => {
  console.log("=== MULAI DEMO SERVICE PERPUSTAKAAN ===\n");

  try {
    // Operasi 1: findAll
    console.log("1. Mengambil semua buku...");
    const allBooks = await bookService.findAll();
    console.log(`Total buku: ${allBooks.length}\n`);

    // Operasi 2: create
    console.log("2. Menambahkan buku baru...");
    const newBook = await bookService.create({ title: "Filosofi Teras", author: "Henry Manampiring", stock: 2 });
    console.log(`Buku ditambahkan: ID ${newBook.id} - ${newBook.title}\n`);

    // Operasi 3: update
    console.log("3. Memperbarui stok buku...");
    const updatedBook = await bookService.update(1, { stock: 10 });
    console.log(`Stok ${updatedBook.title} diubah menjadi: ${updatedBook.stock}\n`);

    // Operasi 4: findById (Simulasi Gagal / Data Tidak Ditemukan)
    console.log("4. Mencari buku dengan ID 99 (Simulasi Gagal)...");
    const notFoundBook = await bookService.findById(99);
    if (notFoundBook === null) {
      throw new Error("Buku dengan ID 99 tidak ditemukan di database!");
    }
    console.log(notFoundBook);

  } catch (error) {
    console.error(`[ERROR TERTANGKAP]: ${error.message}\n`);
  }

  // Operasi 5: Promise.all (Dua kueri paralel)
  console.log("5. Menjalankan dua kueri paralel (Promise.all)...");
  try {
    const [book1, book2] = await Promise.all([
      bookService.findById(1),
      bookService.findById(2)
    ]);
    console.log(`Hasil Paralel 1: ${book1.title}`);
    console.log(`Hasil Paralel 2: ${book2.title}`);
  } catch (err) {
    console.error(`Error pada Promise.all: ${err.message}`);
  }

  console.log("\n=== DEMO SELESAI ===");
};

runDemo();