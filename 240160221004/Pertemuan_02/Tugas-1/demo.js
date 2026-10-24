// demo.js

const bookService = require('./service.refactor'); 
const runDemo = async () => {
    console.log("=== START DEMO PERPUSTAKAAN ===\n");

    try {
        // 1. Create
        const newBook = await bookService.create({
            title: "Clean Code",
            author: "Robert C. Martin",
            year: 2008
        });
        console.log(`1. Buku ditambahkan: ${newBook.title} (ID: ${newBook.id})\n`);

        // 2. FindById + Destructuring
        const found = await bookService.findById(2);
        if (found) {
            const { title, author } = found;
            console.log(`2. Ditemukan: ${title} oleh ${author}\n`);
        }

        // 3. Update
        const updated = await bookService.update(1, { year: 1981 });
        console.log(`3. Update berhasil: ${updated.title} -> ${updated.year}\n`);

        // 4. Delete
        await bookService.remove(3);
        console.log("4. Buku ID 3 dihapus.\n");

        // 5. Promise.all (dua query paralel)
        const [allBooks, specificBook] = await Promise.all([
            bookService.findAll(),
            bookService.findById(1)
        ]);
        console.log(`5. Promise.all -> Total: ${allBooks.length} buku, Spesifik: ${specificBook.title}\n`);

        // 6. Try/Catch untuk kasus tidak ditemukan
        const notFound = await bookService.findById(99);
        if (!notFound) throw new Error("Buku dengan ID 99 tidak ditemukan!");

    } catch (error) {
        console.error(`[ERROR]: ${error.message}`);
    } finally {
        console.log("\n=== DEMO SELESAI ===");
    }
};

runDemo();