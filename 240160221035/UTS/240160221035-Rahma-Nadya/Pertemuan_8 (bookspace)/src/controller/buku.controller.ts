import { Request, Response } from "express";
import * as bukuService from "../service/buku.service";

export const getAllBuku = async (_req: Request, res: Response) => {
  try {
    res.json(await bukuService.getAllBuku());
  } catch {
    res.status(500).json({ message: "Gagal mengambil data buku" });
  }
};

export const getBukuById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({ message: "ID buku tidak valid" });
      return;
    }

    const buku = await bukuService.getBukuById(id);

    if (!buku) {
      res.status(404).json({ message: "Buku tidak ditemukan" });
      return;
    }

    res.json(buku);
  } catch {
    res.status(500).json({ message: "Gagal mengambil data buku" });
  }
};

export const createBuku = async (req: Request, res: Response) => {
  try {
    const { judul, penulis, penerbit, tahun, stok } = req.body;

    if (
      typeof judul !== "string" ||
      !judul.trim() ||
      typeof penulis !== "string" ||
      !penulis.trim()
    ) {
      res.status(400).json({
        message: "Judul dan penulis wajib diisi",
      });
      return;
    }

    const buku = await bukuService.createBuku({
      judul: judul.trim(),
      penulis: penulis.trim(),
      penerbit,
      tahun,
      stok,
    });

    res.status(201).json(buku);
  } catch {
    res.status(500).json({ message: "Gagal menambahkan buku" });
  }
};

export const updateBuku = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({ message: "ID buku tidak valid" });
      return;
    }

    const { judul, penulis, penerbit, tahun, stok } = req.body;

    const buku = await bukuService.updateBuku(id, {
      ...(judul !== undefined && { judul }),
      ...(penulis !== undefined && { penulis }),
      ...(penerbit !== undefined && { penerbit }),
      ...(tahun !== undefined && { tahun }),
      ...(stok !== undefined && { stok }),
    });

    res.json(buku);
  } catch {
    res.status(404).json({ message: "Buku tidak ditemukan" });
  }
};

export const deleteBuku = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({ message: "ID buku tidak valid" });
      return;
    }

    await bukuService.deleteBuku(id);
    res.json({ message: "Buku berhasil dihapus" });
  } catch {
    res.status(404).json({ message: "Buku tidak ditemukan" });
  }
};