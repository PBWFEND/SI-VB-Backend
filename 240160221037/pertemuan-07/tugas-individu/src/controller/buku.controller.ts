
import type { Request, Response } from "express";

import {
    ambilDaftarBuku,
    ambilBukuById,
    buatBuku,
    ubahBuku,
    hapusBuku,
} from "../service/buku.service.ts";

// ==========================================
// Validasi ID
// ==========================================

const validasiId = (id: unknown): number | null => {
    if (typeof id !== "string" || !/^\d+$/.test(id)) {
        return null;
    }

    const angka = Number(id);

    if (!Number.isSafeInteger(angka) || angka <= 0) {
        return null;
    }

    return angka;
};

// ==========================================
// GET /buku
// Mengambil semua data buku
// ==========================================

export const getBuku = async (_req: Request, res: Response) => {
    try {
        const buku = await ambilDaftarBuku();

        return res.status(200).json({
            success: true,
            total: buku.length,
            data: buku,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Gagal mengambil daftar buku",
        });
    }
};

// ==========================================
// GET /buku/:id
// Mengambil buku berdasarkan ID
// ==========================================

export const getBukuById = async (req: Request, res: Response) => {
    const id = validasiId(req.params.id);

    if (id === null) {
        return res.status(400).json({
            success: false,
            message: "ID harus berupa angka positif",
        });
    }

    try {
        const buku = await ambilBukuById(id);

        if (!buku) {
            return res.status(404).json({
                success: false,
                message: "Buku tidak ditemukan",
            });
        }

        return res.status(200).json({
            success: true,
            data: buku,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Gagal mengambil data buku",
        });
    }
};

// ==========================================
// POST /buku
// Menambahkan buku baru
// ==========================================

export const postBuku = async (req: Request, res: Response) => {
    const body = req.body ?? {};
    const { judul, penulis, tahun, stok } = body;

    if (
        typeof judul !== "string" ||
        judul.trim() === "" ||
        typeof penulis !== "string" ||
        penulis.trim() === "" ||
        !Number.isInteger(tahun) ||
        tahun < 1000 ||
        tahun > 9999 ||
        (
            stok !== undefined &&
            (!Number.isInteger(stok) || stok < 0)
        )
    ) {
        return res.status(400).json({
            success: false,
            message: "Data buku tidak valid",
        });
    }

    try {
        const buku = await buatBuku({
            judul: judul.trim(),
            penulis: penulis.trim(),
            tahun,
            stok,
        });

        return res.status(201).json({
            success: true,
            message: "Buku berhasil ditambahkan",
            data: buku,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Gagal menambahkan buku",
        });
    }
};

// ==========================================
// PATCH /buku/:id
// Memperbarui data buku
// ==========================================

export const patchBuku = async (req: Request, res: Response) => {
    const id = validasiId(req.params.id);

    if (id === null) {
        return res.status(400).json({
            success: false,
            message: "ID harus berupa angka positif",
        });
    }

    const body = req.body ?? {};
    const keys = Object.keys(body);

    const kolomDiizinkan = [
        "judul",
        "penulis",
        "tahun",
        "stok",
    ];

    if (
        keys.length === 0 ||
        keys.some((key) => !kolomDiizinkan.includes(key))
    ) {
        return res.status(400).json({
            success: false,
            message: "Data perubahan tidak valid atau kosong",
        });
    }

    if (
        ("judul" in body &&
            (
                typeof body.judul !== "string" ||
                body.judul.trim() === ""
            )) ||

        ("penulis" in body &&
            (
                typeof body.penulis !== "string" ||
                body.penulis.trim() === ""
            )) ||

        ("tahun" in body &&
            (
                !Number.isInteger(body.tahun) ||
                body.tahun < 1000 ||
                body.tahun > 9999
            )) ||

        ("stok" in body &&
            (
                !Number.isInteger(body.stok) ||
                body.stok < 0
            ))
    ) {
        return res.status(400).json({
            success: false,
            message: "Data perubahan buku tidak valid",
        });
    }

    try {
        const data: {
            judul?: string;
            penulis?: string;
            tahun?: number;
            stok?: number;
        } = {};

        if (body.judul !== undefined) {
            data.judul = body.judul.trim();
        }

        if (body.penulis !== undefined) {
            data.penulis = body.penulis.trim();
        }

        if (body.tahun !== undefined) {
            data.tahun = body.tahun;
        }

        if (body.stok !== undefined) {
            data.stok = body.stok;
        }

        const buku = await ubahBuku(id, data);

        if (!buku) {
            return res.status(404).json({
                success: false,
                message: "Buku tidak ditemukan",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Buku berhasil diperbarui",
            data: buku,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Gagal memperbarui buku",
        });
    }
};

// ==========================================
// DELETE /buku/:id
// Menghapus buku berdasarkan ID
// ==========================================

export const deleteBuku = async (req: Request, res: Response) => {
    const id = validasiId(req.params.id);

    if (id === null) {
        return res.status(400).json({
            success: false,
            message: "ID harus berupa angka positif",
        });
    }

    try {
        const berhasil = await hapusBuku(id);

        if (!berhasil) {
            return res.status(404).json({
                success: false,
                message: "Buku tidak ditemukan",
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Gagal menghapus buku",
        });
    }
};
