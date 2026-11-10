
import express from "express";
import { prisma } from "./client.ts";

const app = express();
const PORT = 3009;

app.use(express.json());

// ==========================================
// TODO 1: Mengambil daftar pengguna
// Bisa menampilkan semua pengguna atau filter NIM
// ==========================================

const ambilDaftarPengguna = async (nim?: string) => {
    return await prisma.pengguna.findMany({
        where: nim ? { nim } : {},
    });
};

// ==========================================
// TODO 2: Validasi data dan membuat pengguna
// ==========================================

const buatPengguna = async (data: {
    nim: string;
    nama: string;
    email: string;
    role?: string;
}) => {
    const { nim, nama, email, role } = data;

    if (typeof nim !== "string" || nim.trim() === "") {
        throw new Error("NIM wajib diisi");
    }

    if (typeof nama !== "string" || nama.trim() === "") {
        throw new Error("Nama wajib diisi");
    }

    if (
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        throw new Error("Format email tidak valid");
    }

    if (
        role !== undefined &&
        (typeof role !== "string" || role.trim() === "")
    ) {
        throw new Error("Role tidak valid");
    }

    return await prisma.pengguna.create({
        data: {
            nim: nim.trim(),
            nama: nama.trim(),
            email: email.trim(),
            role: role?.trim() || "mahasiswa",
        },
    });
};

// ==========================================
// GET: Menampilkan daftar pengguna
// ==========================================

app.get("/pengguna", async (req, res) => {
    try {
        const nim =
            typeof req.query.nim === "string"
                ? req.query.nim
                : undefined;

        const pengguna = await ambilDaftarPengguna(nim);

        return res.status(200).json({
            success: true,
            total: pengguna.length,
            data: pengguna,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Gagal mengambil data pengguna",
        });
    }
});

// ==========================================
// TODO 3: POST /pengguna
// Menambahkan pengguna baru
// ==========================================

app.post("/pengguna", async (req, res) => {
    try {
        const pengguna = await buatPengguna(req.body);

        return res.status(201).json({
            success: true,
            message: "Pengguna berhasil ditambahkan",
            data: pengguna,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Gagal menambahkan pengguna",
        });
    }
});

// ==========================================
// TODO 4: DELETE /pengguna/:nim
// Menghapus pengguna berdasarkan NIM
// ==========================================

app.delete("/pengguna/:nim", async (req, res) => {
    try {
        const nim = req.params.nim;

        const pengguna = await prisma.pengguna.findUnique({
            where: { nim },
        });

        if (!pengguna) {
            return res.status(404).json({
                success: false,
                message: "Pengguna tidak ditemukan",
            });
        }

        await prisma.pengguna.delete({
            where: { nim },
        });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Gagal menghapus pengguna",
        });
    }
});

// ==========================================
// Menjalankan server
// ==========================================

app.listen(PORT, () => {
    console.log(
        `Latihan Database API berjalan di http://localhost:${PORT}`
    );
});
