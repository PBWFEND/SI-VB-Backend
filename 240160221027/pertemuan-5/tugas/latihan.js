const express = require("express");
const app = express();

const PORT = 3007;

app.use(express.json());

// Middleware logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Data mahasiswa
let mahasiswa = [
    {
        nim: "240160221046",
        nama: "Rifqie",
        prodi: "Sistem Informasi",
        angkatan: 2024
    },
    {
        nim: "240160221027",
        nama: "Sutiawan",
        prodi: "Sistem Informasi",
        angkatan: 2024
    },
    {
        nim: "230160221010",
        nama: "Andi",
        prodi: "Informatika",
        angkatan: 2023
    }
];

const errorResponse = (res, status, message, details = []) => {
    return res.status(status).json({
        success: false,
        message,
        details
    });
};

// GET semua mahasiswa dan filter prodi
app.get("/mahasiswa", (req, res) => {
    const { prodi } = req.query;

    const data = prodi
        ? mahasiswa.filter(item =>
            item.prodi.toLowerCase() === String(prodi).toLowerCase())
        : mahasiswa;

    res.status(200).json({
        success: true,
        message: "Data mahasiswa berhasil diambil",
        data: {
            total: data.length,
            data
        }
    });
});

// GET mahasiswa berdasarkan NIM
app.get("/mahasiswa/:nim", (req, res) => {
    const item = mahasiswa.find(
        data => data.nim === req.params.nim
    );

    if (!item) {
        return errorResponse(res, 404, "Mahasiswa tidak ditemukan");
    }

    res.status(200).json({
        success: true,
        message: "Mahasiswa ditemukan",
        data: item
    });
});

// POST tambah mahasiswa
app.post("/mahasiswa", (req, res) => {
    const { nim, nama, prodi, angkatan } = req.body;
    const errors = [];

    if (typeof nim !== "string" || !nim.trim())
        errors.push("NIM wajib diisi");

    if (typeof nama !== "string" || !nama.trim())
        errors.push("Nama wajib diisi");

    if (typeof prodi !== "string" || !prodi.trim())
        errors.push("Prodi wajib diisi");

    if (!Number.isInteger(angkatan) || angkatan < 2000)
        errors.push("Angkatan tidak valid");

    if (errors.length > 0) {
        return errorResponse(res, 400, "Data tidak valid", errors);
    }

    if (mahasiswa.some(item => item.nim === nim.trim())) {
        return errorResponse(res, 400, "NIM sudah terdaftar");
    }

    const dataBaru = {
        nim: nim.trim(),
        nama: nama.trim(),
        prodi: prodi.trim(),
        angkatan
    };

    mahasiswa.push(dataBaru);

    res.status(201).json({
        success: true,
        message: "Mahasiswa berhasil ditambahkan",
        data: dataBaru
    });
});

// PATCH ubah sebagian mahasiswa
app.patch("/mahasiswa/:nim", (req, res) => {
    const index = mahasiswa.findIndex(
        item => item.nim === req.params.nim
    );

    if (index === -1) {
        return errorResponse(res, 404, "Mahasiswa tidak ditemukan");
    }

    const allowed = ["nama", "prodi", "angkatan"];
    const fields = Object.keys(req.body);
    const errors = [];

    if (fields.length === 0) {
        errors.push("Masukkan data yang ingin diubah");
    }

    fields.forEach(field => {
        if (!allowed.includes(field)) {
            errors.push(`Field ${field} tidak diizinkan`);
        }
    });

    if (req.body.nama !== undefined &&
        (typeof req.body.nama !== "string" || !req.body.nama.trim())) {
        errors.push("Nama tidak boleh kosong");
    }

    if (req.body.prodi !== undefined &&
        (typeof req.body.prodi !== "string" || !req.body.prodi.trim())) {
        errors.push("Prodi tidak boleh kosong");
    }

    if (req.body.angkatan !== undefined &&
        (!Number.isInteger(req.body.angkatan) || req.body.angkatan < 2000)) {
        errors.push("Angkatan tidak valid");
    }

    if (errors.length > 0) {
        return errorResponse(res, 400, "Data tidak valid", errors);
    }

    mahasiswa[index] = {
        ...mahasiswa[index],
        ...req.body
    };

    res.status(200).json({
        success: true,
        message: "Data mahasiswa berhasil diperbarui",
        data: mahasiswa[index]
    });
});

// Endpoint tidak ditemukan
app.use((req, res) => {
    errorResponse(res, 404, "Endpoint tidak ditemukan");
});

// Error JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400) {
        return errorResponse(res, 400, "Format JSON tidak valid");
    }

    errorResponse(res, 500, "Kesalahan server");
});

app.listen(PORT, () => {
    console.log(`API Mahasiswa berjalan di http://localhost:${PORT}`);
});