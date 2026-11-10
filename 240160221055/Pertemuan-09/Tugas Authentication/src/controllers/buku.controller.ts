import type { Request, Response, NextFunction } from "express";
import {
  getAllBuku,
  getBukuById,
  createBuku,
  updateBuku,
  deleteBuku,
} from "../services/buku.service.js";

export const getBuku = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query: {
      penulis?: string;
      stok?: string;
    } = {};

    if (typeof req.query.penulis === "string") {
      query.penulis = req.query.penulis;
    }

    if (typeof req.query.stok === "string") {
      query.stok = req.query.stok;
    }

    const buku = await getAllBuku(query);

    res.status(200).json({
      message: "Data buku berhasil diambil",
      data: buku,
    });
  } catch (error) {
    next(error);
  }
};

export const getBukuByIdController = async (
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

    const buku = await getBukuById(id);

    if (!buku) {
      res.status(404).json({
        message: "Buku tidak ditemukan",
      });
      return;
    }

    res.status(200).json({
      message: "Data buku berhasil diambil",
      data: buku,
    });
  } catch (error) {
    next(error);
  }
};

export const createBukuController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { judul, penulis, tahun, stok } = req.body;

    if (
      typeof judul !== "string" ||
      typeof penulis !== "string" ||
      typeof tahun !== "number"
    ) {
      res.status(400).json({
        message: "Format data tidak valid",
      });
      return;
    }

    if (judul.trim() === "" || penulis.trim() === "") {
      res.status(400).json({
        message: "Judul dan penulis tidak boleh kosong",
      });
      return;
    }

    if (!Number.isInteger(tahun) || tahun < 1000 || tahun > 2100) {
      res.status(400).json({
        message: "Tahun harus berupa angka antara 1000 sampai 2100",
      });
      return;
    }

    if (
      stok !== undefined &&
      (typeof stok !== "number" ||
        !Number.isInteger(stok) ||
        stok < 0)
    ) {
      res.status(400).json({
        message: "Stok harus berupa angka bulat minimal 0",
      });
      return;
    }

    const dataBuku: {
      judul: string;
      penulis: string;
      tahun: number;
      stok?: number;
    } = {
      judul: judul.trim(),
      penulis: penulis.trim(),
      tahun,
    };

    if (stok !== undefined) {
      dataBuku.stok = stok;
    }

    const buku = await createBuku(dataBuku);

    res.status(201).json({
      message: "Buku berhasil ditambahkan",
      data: buku,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBukuController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const { judul, penulis, tahun, stok } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "ID harus berupa angka positif",
      });
      return;
    }

    const bukuLama = await getBukuById(id);

    if (!bukuLama) {
      res.status(404).json({
        message: "Buku tidak ditemukan",
      });
      return;
    }

    if (
      judul === undefined &&
      penulis === undefined &&
      tahun === undefined &&
      stok === undefined
    ) {
      res.status(400).json({
        message: "Minimal satu data harus diisi",
      });
      return;
    }

    if (
      judul !== undefined &&
      (typeof judul !== "string" || judul.trim() === "")
    ) {
      res.status(400).json({
        message: "Judul harus berupa teks dan tidak boleh kosong",
      });
      return;
    }

    if (
      penulis !== undefined &&
      (typeof penulis !== "string" || penulis.trim() === "")
    ) {
      res.status(400).json({
        message: "Penulis harus berupa teks dan tidak boleh kosong",
      });
      return;
    }

    if (
      tahun !== undefined &&
      (typeof tahun !== "number" ||
        !Number.isInteger(tahun) ||
        tahun < 1000 ||
        tahun > 2100)
    ) {
      res.status(400).json({
        message: "Tahun harus berupa angka antara 1000 sampai 2100",
      });
      return;
    }

    if (
      stok !== undefined &&
      (typeof stok !== "number" ||
        !Number.isInteger(stok) ||
        stok < 0)
    ) {
      res.status(400).json({
        message: "Stok harus berupa angka bulat minimal 0",
      });
      return;
    }

    const dataUpdate: {
      judul?: string;
      penulis?: string;
      tahun?: number;
      stok?: number;
    } = {};

    if (judul !== undefined) dataUpdate.judul = judul.trim();
    if (penulis !== undefined) dataUpdate.penulis = penulis.trim();
    if (tahun !== undefined) dataUpdate.tahun = tahun;
    if (stok !== undefined) dataUpdate.stok = stok;

    const buku = await updateBuku(id, dataUpdate);

    res.status(200).json({
      message: "Buku berhasil diperbarui",
      data: buku,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBukuController = async (
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

    const buku = await getBukuById(id);

    if (!buku) {
      res.status(404).json({
        message: "Buku tidak ditemukan",
      });
      return;
    }

    await deleteBuku(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};