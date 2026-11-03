import type { Request, Response, NextFunction } from "express";
import prisma from "../../client.js";
import {
  getAllPinjaman,
  getPinjamanById,
  createPinjaman,
  returnPinjaman,
} from "../services/pinjaman.service.js";

export const getPinjamanController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = req.query.status;

    if (
      status !== undefined &&
      (typeof status !== "string" ||
        !["aktif", "selesai"].includes(status))
    ) {
      res.status(400).json({
        message: "Status harus berupa aktif atau selesai",
      });
      return;
    }

    const pinjaman = await getAllPinjaman(
      typeof status === "string" ? status : undefined
    );

    res.status(200).json({
      message: "Data pinjaman berhasil diambil",
      data: pinjaman,
    });
  } catch (error) {
    next(error);
  }
};

export const createPinjamanController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bukuId, penggunaId } = req.body;

    if (
      typeof bukuId !== "number" ||
      !Number.isInteger(bukuId) ||
      bukuId <= 0 ||
      typeof penggunaId !== "number" ||
      !Number.isInteger(penggunaId) ||
      penggunaId <= 0
    ) {
      res.status(400).json({
        message: "bukuId dan penggunaId harus berupa angka positif",
      });
      return;
    }

    const buku = await prisma.buku.findUnique({
      where: { id: bukuId },
    });

    if (!buku) {
      res.status(404).json({
        message: "Buku tidak ditemukan",
      });
      return;
    }

    const pengguna = await prisma.pengguna.findUnique({
      where: { id: penggunaId },
    });

    if (!pengguna) {
      res.status(404).json({
        message: "Pengguna tidak ditemukan",
      });
      return;
    }

    if (buku.stok <= 0) {
      res.status(400).json({
        message: "Stok buku tidak tersedia",
      });
      return;
    }

    const pinjaman = await createPinjaman(bukuId, penggunaId);

    res.status(201).json({
      message: "Peminjaman berhasil dibuat",
      data: pinjaman,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "STOK_BUKU_TIDAK_TERSEDIA"
    ) {
      res.status(400).json({
        message: "Stok buku tidak tersedia",
      });
      return;
    }

    next(error);
  }
};

export const returnPinjamanController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "ID harus berupa angka positif",
      });
      return;
    }

    const pinjaman = await getPinjamanById(id);

    if (!pinjaman) {
      res.status(404).json({
        message: "Pinjaman tidak ditemukan",
      });
      return;
    }

    if (pinjaman.tanggalKembali !== null) {
      res.status(400).json({
        message: "Buku sudah dikembalikan",
      });
      return;
    }

    const hasil = await returnPinjaman(id);

    res.status(200).json({
      message: "Buku berhasil dikembalikan",
      data: hasil,
    });
  } catch (error) {
    next(error);
  }
};
