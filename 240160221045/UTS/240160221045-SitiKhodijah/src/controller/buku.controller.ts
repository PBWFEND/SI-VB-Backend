import { Request, Response, NextFunction } from "express";
import * as BukuService from "../service/buku.service.js";

export const getAllBuku = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const buku = await BukuService.getAllBuku();
    res.status(200).json({ success: true, data: buku });
  } catch (error) {
    next(error);
  }
};

export const getBukuById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const buku = await BukuService.getBukuById(id);

    if (!buku) {
      res.status(404).json({ success: false, message: "Buku tidak ditemukan" });
      return;
    }

    res.status(200).json({ success: true, data: buku });
  } catch (error) {
    next(error);
  }
};

export const createBuku = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { judul, penulis, tahun, stok } = req.body;

    if (
      typeof judul !== "string" || !judul.trim() ||
      typeof penulis !== "string" || !penulis.trim() ||
      !Number.isInteger(tahun) || tahun < 1 ||
      !Number.isInteger(stok) || stok < 0
    ) {
      res.status(400).json({
        success: false,
        message: "Data buku tidak valid",
      });
      return;
    }

    const buku = await BukuService.createBuku({
      judul: judul.trim(),
      penulis: penulis.trim(),
      tahun,
      stok,
    });

    res.status(201).json({ success: true, data: buku });
  } catch (error) {
    next(error);
  }
};

export const updateBuku = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const { judul, penulis, tahun, stok } = req.body;

    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({ success: false, message: "ID tidak valid" });
      return;
    }

    const data: {
      judul?: string;
      penulis?: string;
      tahun?: number;
      stok?: number;
    } = {};

    if (judul !== undefined) {
      if (typeof judul !== "string" || !judul.trim()) {
        res.status(400).json({ success: false, message: "Judul tidak valid" });
        return;
      }
      data.judul = judul.trim();
    }

    if (penulis !== undefined) {
      if (typeof penulis !== "string" || !penulis.trim()) {
        res.status(400).json({ success: false, message: "Penulis tidak valid" });
        return;
      }
      data.penulis = penulis.trim();
    }

    if (tahun !== undefined) {
      if (!Number.isInteger(tahun) || tahun < 1) {
        res.status(400).json({ success: false, message: "Tahun tidak valid" });
        return;
      }
      data.tahun = tahun;
    }

    if (stok !== undefined) {
      if (!Number.isInteger(stok) || stok < 0) {
        res.status(400).json({ success: false, message: "Stok tidak valid" });
        return;
      }
      data.stok = stok;
    }

    if (Object.keys(data).length === 0) {
      res.status(400).json({ success: false, message: "Tidak ada data untuk diubah" });
      return;
    }

    const existing = await BukuService.getBukuById(id);

    if (!existing) {
      res.status(404).json({ success: false, message: "Buku tidak ditemukan" });
      return;
    }

    const buku = await BukuService.updateBuku(id, data);
    res.status(200).json({ success: true, data: buku });
  } catch (error) {
    next(error);
  }
};

export const deleteBuku = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({ success: false, message: "ID tidak valid" });
      return;
    }

    const existing = await BukuService.getBukuById(id);

    if (!existing) {
      res.status(404).json({ success: false, message: "Buku tidak ditemukan" });
      return;
    }

    await BukuService.deleteBuku(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};