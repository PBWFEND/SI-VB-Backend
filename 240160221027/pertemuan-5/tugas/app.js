const express = require("express");
const app = express();

app.use(express.json());

let buku = [
    { id: 1, judul: "Belajar Node.js", penulis: "Andi", tahun: 2024, stok: 5 },
    { id: 2, judul: "JavaScript Dasar", penulis: "Budi", tahun: 2023, stok: 3 },
    { id: 3, judul: "RESTful API", penulis: "Andi", tahun: 2026, stok: 2 }
];

let nextId = 4;

const errorResponse = (res, status, message, details = []) => {
    return res.status(status).json({
        success: false,
        message,
        details
    });
};

const validateBook = (data, partial = false) => {
    const errors = [];
    const allowed = ["judul", "penulis", "tahun", "stok"];

    Object.keys(data).forEach(field => {
        if (!allowed.includes(field)) {
            errors.push(`Field ${field} tidak diizinkan`);
        }
    });

    if (!partial) {
        allowed.forEach(field => {
            if (data[field] === undefined) {
                errors.push(`${field} wajib diisi`);
            }
        });
    }

    if (data.judul !== undefined &&
        (typeof data.judul !== "string" || !data.judul.trim())) {
        errors.push("Judul tidak boleh kosong");
    }

    if (data.penulis !== undefined &&
        (typeof data.penulis !== "string" || !data.penulis.trim())) {
        errors.push("Penulis tidak boleh kosong");
    }

    if (data.tahun !== undefined &&
        (!Number.isInteger(data.tahun) || data.tahun < 1)) {
        errors.push("Tahun harus berupa angka positif");
    }

    if (data.stok !== undefined &&
        (!Number.isInteger(data.stok) || data.stok < 0)) {
        errors.push("Stok minimal 0");
    }

    if (partial && Object.keys(data).length === 0) {
        errors.push("Minimal satu data harus diubah");
    }

    return errors;
};

// GET semua buku dan filter
app.get("/buku", (req, res) => {
    const { penulis, tahun, minStok } = req.query;

    if (tahun !== undefined &&
        (!Number.isInteger(Number(tahun)) || Number(tahun) < 1)) {
        return errorResponse(res, 400, "Tahun tidak valid");
    }

    if (minStok !== undefined &&
        (!Number.isInteger(Number(minStok)) || Number(minStok) < 0)) {
        return errorResponse(res, 400, "Stok tidak valid");
    }

    const data = buku.filter(item => {
        const cocokPenulis = !penulis ||
            item.penulis.toLowerCase() === String(penulis).toLowerCase();

        const cocokTahun = tahun === undefined ||
            item.tahun === Number(tahun);

        const cocokStok = minStok === undefined ||
            item.stok >= Number(minStok);

        return cocokPenulis && cocokTahun && cocokStok;
    });

    res.status(200).json({
        success: true,
        message: "Daftar buku berhasil diambil",
        data: {
            total: data.length,
            data
        }
    });
});

// GET detail buku
app.get("/buku/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return errorResponse(res, 400, "ID tidak valid");
    }

    const item = buku.find(item => item.id === id);

    if (!item) {
        return errorResponse(res, 404, "Buku tidak ditemukan");
    }

    res.status(200).json({
        success: true,
        message: "Buku ditemukan",
        data: item
    });
});

// POST tambah buku
app.post("/buku", (req, res) => {
    const errors = validateBook(req.body);

    if (errors.length > 0) {
        return errorResponse(res, 400, "Data tidak valid", errors);
    }

    const bukuBaru = {
        id: nextId++,
        judul: req.body.judul.trim(),
        penulis: req.body.penulis.trim(),
        tahun: req.body.tahun,
        stok: req.body.stok
    };

    buku.push(bukuBaru);

    res.status(201).json({
        success: true,
        message: "Buku berhasil ditambahkan",
        data: bukuBaru
    });
});

// PUT ubah seluruh buku
app.put("/buku/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = buku.findIndex(item => item.id === id);

    if (!Number.isInteger(id) || id < 1) {
        return errorResponse(res, 400, "ID tidak valid");
    }

    if (index === -1) {
        return errorResponse(res, 404, "Buku tidak ditemukan");
    }

    const errors = validateBook(req.body);

    if (errors.length > 0) {
        return errorResponse(res, 400, "Data tidak valid", errors);
    }

    buku[index] = {
        id,
        judul: req.body.judul.trim(),
        penulis: req.body.penulis.trim(),
        tahun: req.body.tahun,
        stok: req.body.stok
    };

    res.status(200).json({
        success: true,
        message: "Buku berhasil diperbarui",
        data: buku[index]
    });
});

// PATCH ubah sebagian buku
app.patch("/buku/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = buku.findIndex(item => item.id === id);

    if (!Number.isInteger(id) || id < 1) {
        return errorResponse(res, 400, "ID tidak valid");
    }

    if (index === -1) {
        return errorResponse(res, 404, "Buku tidak ditemukan");
    }

    const errors = validateBook(req.body, true);

    if (errors.length > 0) {
        return errorResponse(res, 400, "Data tidak valid", errors);
    }

    const perubahan = { ...req.body };

    if (perubahan.judul !== undefined) perubahan.judul = perubahan.judul.trim();
    if (perubahan.penulis !== undefined) perubahan.penulis = perubahan.penulis.trim();

    buku[index] = { ...buku[index], ...perubahan };

    res.status(200).json({
        success: true,
        message: "Buku berhasil diubah",
        data: buku[index]
    });
});

// DELETE buku
app.delete("/buku/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = buku.findIndex(item => item.id === id);

    if (!Number.isInteger(id) || id < 1) {
        return errorResponse(res, 400, "ID tidak valid");
    }

    if (index === -1) {
        return errorResponse(res, 404, "Buku tidak ditemukan");
    }

    buku.splice(index, 1);

    res.status(204).send();
});

// Endpoint tidak ditemukan
app.use((req, res) => {
    errorResponse(res, 404, "Endpoint tidak ditemukan");
});

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400) {
        return errorResponse(res, 400, "Format JSON tidak valid");
    }

    errorResponse(res, 500, "Kesalahan server");
});

module.exports = app;