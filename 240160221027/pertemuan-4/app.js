import express from "express";

const app = express();
app.disable("x-powered-by");

let mahasiswa = [
    { nim: "F1D022001", nama: "Jhon Doe" },
    { nim: "F1D022002", nama: "Ani Lestari" },
];

app.use(express.json());

app.use((request, response, next) => {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
    next();
});

app.get("/", (request, response) => {
    return response.status(200).json({
        success: true,
        message: "Server Express.js Berjalan Normal",
    });
});

app.get("/mahasiswa", (request, response) => {
    const { nama } = request.query;
    let hasil = mahasiswa;

    if (nama) {
        hasil = mahasiswa.filter((m) => m.nama.toLowerCase().includes(nama.toLowerCase()));
    }

    return response.status(200).json({
        success: true,
        total: hasil.length,
        data: hasil,
    });
});

app.get("/mahasiswa/:nim", (request, response) => {
    const { nim } = request.params;
    const mhs = mahasiswa.find((m) => m.nim === nim);

    if (!mhs) {
        return response.status(404).json({
            success: false,
            message: `Mahasiswa dengan NIM ${nim} tidak ditemukan`,
        });
    }

    return response.status(200).json({
        success: true,
        data: mhs,
    });
});

app.post("/mahasiswa", (request, response) => {
    try {
        const { nim, nama } = request.body;

        if (!nim || !nama) {
            return response.status(400).json({
                success: false,
                message: "Field nim dan nama wajib diisi",
            });
        }

        const cekDuplikat = mahasiswa.find((m) => m.nim === nim);
        if (cekDuplikat) {
            return response.status(400).json({
                success: false,
                message: `Mahasiswa dengan NIM ${nim} sudah terdaftar`,
            });
        }

        const baru = { nim, nama };
        mahasiswa.push(baru);
        return response.status(201).json({ success: true, data: baru });
    } catch (error) {
        console.error("Kesalahan aplikasi:", error.message);
        return response.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
    }
});

app.use((request, response, next) => {
    return response.status(404).json({
        success: false,
        message: "Endpoint tidak ditemukan",
    });
});

app.use((error, request, response, next) => {
    console.error("Server Error:", error.message);
    return response.status(500).json({
        success: false,
        message: "Terjadi kesalahan internal pada server",
    });
});

export default app;