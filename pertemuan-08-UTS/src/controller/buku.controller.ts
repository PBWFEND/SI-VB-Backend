
import type { Request, Response } from "express";

import {
    ambilDaftarBuku,
    ambilBukuById,
    buatBuku,
    ubahBuku,
    hapusBuku,
} from "../service/buku.service.ts";

// Validasi ID
const validasiId = (id: string) => {
    const angka = Number(id);

    if (!Number.isInteger(angka) || angka <= 0) {
        return null;
    }

    return angka;
};

// GET /buku
export const getSemuaBuku = async (_req: Request, res: Response) => {
    const buku = await ambilDaftarBuku();

    return res.status(200).json({
        success: true,
        total: buku.length,
        data: buku,
    });
};

// GET /buku/:id
export const getBukuById = async (req: Request, res: Response) => {
    const id = validasiId(String(req.params.id));

    if (id === null) {
        return res.status(400).json({
            success: false,
            message: "ID buku harus berupa bilangan bulat positif",
        });
    }

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
};

// POST /buku
export const postBuku = async (req: Request, res: Response) => {
    const { judul, penulis, tahun, stok } = req.body ?? {};

    const tahunSekarang = new Date().getFullYear();

    if (typeof judul !== "string" || judul.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Judul buku wajib diisi",
        });
    }

    if (typeof penulis !== "string" || penulis.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Penulis buku wajib diisi",
        });
    }

    if (
        typeof tahun !== "number" ||
        !Number.isInteger(tahun) ||
        tahun < 1 ||
        tahun > tahunSekarang
    ) {
        return res.status(400).json({
            success: false,
            message: `Tahun harus berupa bilangan bulat antara 1 dan ${tahunSekarang}`,
        });
    }

    const stokBuku = stok === undefined ? 0 : stok;

    if (
        typeof stokBuku !== "number" ||
        !Number.isInteger(stokBuku) ||
        stokBuku < 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Stok harus berupa bilangan bulat minimal 0",
        });
    }

    const buku = await buatBuku({
        judul: judul.trim(),
        penulis: penulis.trim(),
        tahun,
        stok: stokBuku,
    });

    return res.status(201).json({
        success: true,
        message: "Buku berhasil ditambahkan",
        data: buku,
    });
};

// PATCH /buku/:id
export const patchBuku = async (req: Request, res: Response) => {
    const id = validasiId(String(req.params.id));

    if (id === null) {
        return res.status(400).json({
            success: false,
            message: "ID buku harus berupa bilangan bulat positif",
        });
    }

    const bukuLama = await ambilBukuById(id);

    if (!bukuLama) {
        return res.status(404).json({
            success: false,
            message: "Buku tidak ditemukan",
        });
    }

    const { judul, penulis, tahun, stok } = req.body ?? {};
    const data: {
        judul?: string;
        penulis?: string;
        tahun?: number;
        stok?: number;
    } = {};

    if (Object.keys(req.body ?? {}).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Minimal satu data harus diubah",
        });
    }

    if (judul !== undefined) {
        if (typeof judul !== "string" || judul.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Judul buku tidak boleh kosong",
            });
        }
        data.judul = judul.trim();
    }

    if (penulis !== undefined) {
        if (typeof penulis !== "string" || penulis.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Penulis buku tidak boleh kosong",
            });
        }
        data.penulis = penulis.trim();
    }

    if (tahun !== undefined) {
        const tahunSekarang = new Date().getFullYear();

        if (
            typeof tahun !== "number" ||
            !Number.isInteger(tahun) ||
            tahun < 1 ||
            tahun > tahunSekarang
        ) {
            return res.status(400).json({
                success: false,
                message: "Tahun terbit tidak valid",
            });
        }
        data.tahun = tahun;
    }

    if (stok !== undefined) {
        if (
            typeof stok !== "number" ||
            !Number.isInteger(stok) ||
            stok < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Stok harus berupa bilangan bulat minimal 0",
            });
        }
        data.stok = stok;
    }

    const buku = await ubahBuku(id, data);

    return res.status(200).json({
        success: true,
        message: "Buku berhasil diperbarui",
        data: buku,
    });
};

// DELETE /buku/:id
export const deleteBuku = async (req: Request, res: Response) => {
    const id = validasiId(String(req.params.id));

    if (id === null) {
        return res.status(400).json({
            success: false,
            message: "ID buku tidak valid",
        });
    }

    const buku = await ambilBukuById(id);

    if (!buku) {
        return res.status(404).json({
            success: false,
            message: "Buku tidak ditemukan",
        });
    }

    await hapusBuku(id);

    return res.status(204).send();
};
