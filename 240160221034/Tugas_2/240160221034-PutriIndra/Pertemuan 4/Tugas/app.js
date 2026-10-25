/**
 * Tugas 2 — REST Endpoint dengan Express.js
 * Resource: Buku
 * Tujuan: Membuat REST API untuk Sistem Informasi Perpustakaan.
 */

import express from "express";

const app = express();

app.disable("x-powered-by");

// Data sementara buku
const buku = [
    {
        id: 1,
        judul: "Laskar Pelangi",
        penulis: "Andrea Hirata",
        tersedia: true
    },
    {
        id: 2,
        judul: "Bumi",
        penulis: "Tere Liye",
        tersedia: false
    },
    {
        id: 3,
        judul: "Negeri 5 Menara",
        penulis: "Ahmad Fuadi",
        tersedia: true
    }
];

let nextId = 4;

// Middleware untuk membaca JSON
app.use(express.json());

// Logger untuk mencatat setiap request
app.use((request, response, next) => {
    console.log(
        `[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`
    );
    next();
});

// GET: informasi API
app.get("/", (request, response) => {
    response.status(200).json({
        success: true,
        message: "REST API Sistem Informasi Perpustakaan",
        endpoints: [
            "GET /",
            "GET /health",
            "GET /buku",
            "GET /buku/:id",
            "POST /buku",
            "PUT /buku/:id"
        ]
    });
});

// GET: memeriksa status API
app.get("/health", (request, response) => {
    response.status(200).json({
        success: true,
        status: "up"
    });
});

// GET: menampilkan semua buku
// Contoh filter: /buku?tersedia=true
app.get("/buku", (request, response) => {
    let hasil = buku;

    if (request.query.tersedia !== undefined) {
        if (!["true", "false"].includes(request.query.tersedia)) {
            return response.status(400).json({
                success: false,
                message: "Query tersedia harus bernilai true atau false"
            });
        }

        const status = request.query.tersedia === "true";

        hasil = buku.filter(item => item.tersedia === status);
    }

    return response.status(200).json({
        success: true,
        total: hasil.length,
        data: hasil
    });
});

// GET: menampilkan detail buku berdasarkan ID
app.get("/buku/:id", (request, response) => {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return response.status(400).json({
            success: false,
            message: "ID buku harus berupa bilangan bulat positif"
        });
    }

    const data = buku.find(item => item.id === id);

    if (!data) {
        return response.status(404).json({
            success: false,
            message: "Data buku tidak ditemukan"
        });
    }

    return response.status(200).json({
        success: true,
        data
    });
});

// POST: menambahkan buku baru
app.post("/buku", (request, response) => {
    const { judul, penulis } = request.body;

    if (
        typeof judul !== "string" ||
        !judul.trim() ||
        typeof penulis !== "string" ||
        !penulis.trim()
    ) {
        return response.status(400).json({
            success: false,
            message: "Field judul dan penulis wajib diisi"
        });
    }

    const dataBaru = {
        id: nextId++,
        judul: judul.trim(),
        penulis: penulis.trim(),
        tersedia: true
    };

    buku.push(dataBaru);

    return response.status(201).json({
        success: true,
        message: "Buku berhasil ditambahkan",
        data: dataBaru
    });
});

// PUT: memperbarui data buku berdasarkan ID
app.put("/buku/:id", (request, response) => {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return response.status(400).json({
            success: false,
            message: "ID buku harus berupa bilangan bulat positif"
        });
    }

    const data = buku.find(item => item.id === id);

    if (!data) {
        return response.status(404).json({
            success: false,
            message: "Data buku tidak ditemukan"
        });
    }

    const { judul, penulis, tersedia } = request.body;

    if (
        (judul !== undefined &&
            (typeof judul !== "string" || !judul.trim())) ||
        (penulis !== undefined &&
            (typeof penulis !== "string" || !penulis.trim())) ||
        (tersedia !== undefined && typeof tersedia !== "boolean")
    ) {
        return response.status(400).json({
            success: false,
            message: "Data yang dikirim memiliki format tidak valid"
        });
    }

    if (judul !== undefined) {
        data.judul = judul.trim();
    }

    if (penulis !== undefined) {
        data.penulis = penulis.trim();
    }

    if (tersedia !== undefined) {
        data.tersedia = tersedia;
    }

    return response.status(200).json({
        success: true,
        message: "Data buku berhasil diperbarui",
        data
    });
});

// Handler untuk endpoint yang tidak ditemukan
app.use((request, response) => {
    response.status(404).json({
        success: false,
        message: `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`
    });
});

// Error-handling middleware
app.use((error, request, response, next) => {
    console.error("Kesalahan aplikasi:", error.message);

    if (response.headersSent) {
        return next(error);
    }

    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return response.status(400).json({
            success: false,
            message: "Format JSON tidak valid"
        });
    }

    return response.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada server"
    });
});

export default app;