
// demo.js

const bookService = require("./service");
const { buatPesan } = require("./refactor");

const runDemo = async () => {
  console.log("=== DEMO SERVICE BUKU ===\n");

  try {
    // 1. Menampilkan semua buku
    const books = await bookService.findAll();
    console.log("1. Daftar awal:", books.length, "buku\n");

    // 2. Menambahkan buku
    const newBook = await bookService.create({
      title: "Clean Code",
      author: "Robert C. Martin",
      year: 2008,
    });
    console.log("2. Buku ditambahkan:", newBook, "\n");

    // 3. Mencari buku berdasarkan ID
    const found = await bookService.findById(2);
    if (found) {
      const { title, author } = found;
      console.log(`3. Buku ditemukan: ${title} oleh ${author}\n`);
    }

    // 4. Mengubah data buku
    const updated = await bookService.update(1, {
      year: 1981,
    });

    if (updated) {
      console.log(
        `4. Buku berhasil diupdate: ${updated.title}, tahun ${updated.year}\n`
      );
    }

    // 5. Menghapus buku
    const deleted = await bookService.delete(3);

    if (deleted) {
      console.log(`5. Buku dihapus: ${deleted.title}\n`);
    }

    // 6. Menjalankan dua query secara paralel
    const [allBooks, specificBook] = await Promise.all([
      bookService.findAll(),
      bookService.findById(1),
    ]);

    console.log(
      `6. Promise.all: ${allBooks.length} buku tersisa, buku spesifik: ${specificBook.title}\n`
    );

    // 7. Menguji kasus buku tidak ditemukan
    const notFound = await bookService.findById(99);

    if (!notFound) {
      throw new Error("Buku dengan ID 99 tidak ditemukan!");
    }
  } catch (error) {
    console.error("[ERROR]:", error.message);
  } finally {
    console.log("\n=== DEMO SELESAI ===");
  }

  // 8. Menguji fungsi hasil refactor
  console.log("\n=== DEMO REFACTOR ===");
  console.log(
    buatPesan([
      { nama: "Buku Backend", harga: 50000, jumlah: 2 },
      { nama: "Buku JavaScript", harga: 40000, jumlah: 1 },
    ])
  );
};

runDemo();
