import type { Request, Response, NextFunction } from "express";
import * as BukuService from "../service/buku.service.ts";

const isRecordNotFound = (error: unknown): boolean => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2025"
  );
};

// GET /buku
export const getAllBuku = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const buku = await BukuService.getAllBuku();

    res.status(200).json({
      success: true,
      message: "Daftar buku berhasil diambil",
      data: buku,
    });
   } catch (error) {
    if (isRecordNotFound(error)) {
      res.status(404).json({
        success: false,
        message: "Buku tidak ditemukan",
      });
      return;
    }

    next(error);
  }
};

// GET /buku/:id
export const getBukuById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (typeof req.params.id !== "string" || !/^[1-9]\d*$/.test(req.params.id)) {
      res.status(400).json({
        success: false,
        message: "ID buku harus berupa bilangan bulat positif",
      });
      return;
    }

    const id = Number(req.params.id);
    const buku = await BukuService.getBukuById(id);

    if (!buku) {
      res.status(404).json({
        success: false,
        message: "Buku tidak ditemukan",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Detail buku berhasil diambil",
      data: buku,
    });
  } catch (error) {
    if (isRecordNotFound(error)) {
      res.status(404).json({
        success: false,
        message: "Buku tidak ditemukan",
      });
      return;
    }

    next(error);
  }
};

// POST /buku
export const createBuku = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { judul, penulis, tahun, stok } = req.body ?? {};
    const details: string[] = [];

    if (typeof judul !== "string" || judul.trim() === "") {
      details.push("Judul wajib berupa teks dan tidak boleh kosong");
    }

    if (typeof penulis !== "string" || penulis.trim() === "") {
      details.push("Penulis wajib berupa teks dan tidak boleh kosong");
    }

    if (typeof tahun !== "number" || !Number.isInteger(tahun) || tahun < 1 || tahun > new Date().getFullYear()) {
      details.push("Tahun harus berupa bilangan bulat yang valid");
    }

    if (typeof stok !== "number" || !Number.isInteger(stok) || stok < 0) {
      details.push("Stok harus berupa bilangan bulat minimal 0");
    }

    if (details.length > 0) {
      res.status(400).json({
        success: false,
        message: "Validasi gagal",
        details,
      });
      return;
    }

    const buku = await BukuService.createBuku({
      judul: judul.trim(),
      penulis: penulis.trim(),
      tahun,
      stok,
    });

    res.status(201).json({
      success: true,
      message: "Buku berhasil ditambahkan",
      data: buku,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /buku/:id
export const updateBuku = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (typeof req.params.id !== "string" || !/^[1-9]\d*$/.test(req.params.id)) {
      res.status(400).json({
        success: false,
        message: "ID buku harus berupa bilangan bulat positif",
      });
      return;
    }

    const id = Number(req.params.id);
    const { judul, penulis, tahun, stok } = req.body ?? {};
    const details: string[] = [];
    const data: {
      judul?: string;
      penulis?: string;
      tahun?: number;
      stok?: number;
    } = {};

    if (Object.keys(req.body ?? {}).length === 0) {
      details.push("Minimal satu data buku harus diisi");
    }

    if (judul !== undefined) {
      if (typeof judul !== "string" || judul.trim() === "") {
        details.push("Judul harus berupa teks dan tidak boleh kosong");
      } else {
        data.judul = judul.trim();
      }
    }

    if (penulis !== undefined) {
      if (typeof penulis !== "string" || penulis.trim() === "") {
        details.push("Penulis harus berupa teks dan tidak boleh kosong");
      } else {
        data.penulis = penulis.trim();
      }
    }

    if (tahun !== undefined) {
      if (typeof tahun !== "number" || !Number.isInteger(tahun) || tahun < 1 || tahun > new Date().getFullYear()) {
        details.push("Tahun harus berupa bilangan bulat yang valid");
      } else {
        data.tahun = tahun;
      }
    }

    if (stok !== undefined) {
      if (typeof stok !== "number" || !Number.isInteger(stok) || stok < 0) {
        details.push("Stok harus berupa bilangan bulat minimal 0");
      } else {
        data.stok = stok;
      }
    }

    if (details.length > 0) {
      res.status(400).json({
        success: false,
        message: "Validasi gagal",
        details,
      });
      return;
    }

    const buku = await BukuService.updateBuku(id, data);

    res.status(200).json({
      success: true,
      message: "Buku berhasil diperbarui",
      data: buku,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /buku/:id
export const deleteBuku = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (typeof req.params.id !== "string" || !/^[1-9]\d*$/.test(req.params.id)) {
      res.status(400).json({
        success: false,
        message: "ID buku harus berupa bilangan bulat positif",
      });
      return;
    }

    const id = Number(req.params.id);
    await BukuService.deleteBuku(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
