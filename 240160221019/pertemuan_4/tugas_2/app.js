const express = require('express');
const app = express();

// 4. Middleware JSON dan Logger
app.use(express.json());

// Middleware Logger Sederhana
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Import Routes
const bookRoutes = require('./routes/books');

// Gunakan Routes
app.use('/books', bookRoutes);

// 7. Handler 404 (Route tidak ditemukan)
app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'Resource tidak ditemukan'
    });
});

// 7. Error Middleware (Global Error Handler)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
        error: err.message
    });
});

module.exports = app;