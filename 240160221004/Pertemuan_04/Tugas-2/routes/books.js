const express = require('express');
const router = express.Router();

// Data dummy (simulasi database)
let books = [
    { id: 1, title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer' },
    { id: 2, title: 'Laskar Pelangi', author: 'Andrea Hirata' },
    { id: 3, title: 'Filosofi Teras', author: 'Henry Manampiring' }
];

// 3. GET Daftar (dengan Query Parameter)
// Contoh: /books?author=Andrea
router.get('/', (req, res) => {
    const { author } = req.query;
    let result = books;

    // 5. Query Parameter: Filter berdasarkan author
    if (author) {
        result = books.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
    }

    // 6. Response JSON dengan status code 200
    res.status(200).json({
        status: 'success',
        data: result
    });
});

// 3. GET Detail (dengan Route Parameter)
// Contoh: /books/1
router.get('/:id', (req, res) => {
    // 5. Route Parameter: Ambil ID dari URL
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        // 6. Status code 404 jika data tidak ada
        return res.status(404).json({
            status: 'error',
            message: 'Buku tidak ditemukan'
        });
    }

    // 6. Response JSON dengan status code 200
    res.status(200).json({
        status: 'success',
        data: book
    });
});

// 3. POST (Tambah data baru)
router.post('/', (req, res) => {
    const { title, author } = req.body;

    // Validasi input sederhana
    if (!title || !author) {
        return res.status(400).json({
            status: 'error',
            message: 'Title dan Author wajib diisi'
        });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author
    };

    books.push(newBook);

    // 6. Status code 201 (Created)
    res.status(201).json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: newBook
    });
});

module.exports = router;