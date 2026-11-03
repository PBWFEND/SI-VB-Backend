import type { Request, Response, NextFunction } from "express";

import {
  ambilSemuaAnggota,
  ambilAnggotaById,
  buatAnggota,
  ubahAnggota,
  hapusAnggota,
} from "../service/anggota.service.ts";

// Memeriksa kode error dari Prisma
const kodeErrorPrisma = (error: unknown): string | undefined => {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }

  return undefined;
};

// GET /anggota
export const getSemuaAnggota = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const anggota = await ambilSemuaAnggota();

    return res.status(200).json({
      success: true,
      message: "Data anggota berhasil diambil",
      total: anggota.length,
      data: anggota,
    });
  } catch (error) {
    next(error);
  }
};

// GET /anggota/:id
export const getAnggotaById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "ID anggota tidak valid",
    });
  }

  try {
    const anggota = await ambilAnggotaById(id);

    if (!anggota) {
      return res.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Detail anggota berhasil diambil",
      data: anggota,
    });
  } catch (error) {
    next(error);
  }
};

// POST /anggota
export const postAnggota = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { nama, nim } = req.body ?? {};

  if (
    typeof nama !== "string" ||
    nama.trim() === "" ||
    typeof nim !== "string" ||
    nim.trim() === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Nama dan NIM wajib diisi",
    });
  }

  try {
    const anggota = await buatAnggota({
      nama: nama.trim(),
      nim: nim.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Anggota berhasil ditambahkan",
      data: anggota,
    });
  } catch (error) {
    if (kodeErrorPrisma(error) === "P2002") {
      return res.status(409).json({
        success: false,
        message: "NIM sudah terdaftar",
      });
    }

    next(error);
  }
};

// PATCH /anggota/:id
export const patchAnggota = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);
  const { nama, nim } = req.body ?? {};

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "ID anggota tidak valid",
    });
  }

  const data: { nama?: string; nim?: string } = {};

  if (nama !== undefined) {
    if (typeof nama !== "string" || nama.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Nama tidak boleh kosong",
      });
    }

    data.nama = nama.trim();
  }

  if (nim !== undefined) {
    if (typeof nim !== "string" || nim.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "NIM tidak boleh kosong",
      });
    }

    data.nim = nim.trim();
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Masukkan nama atau NIM yang ingin diubah",
    });
  }

  try {
    const anggota = await ubahAnggota(id, data);

    return res.status(200).json({
      success: true,
      message: "Anggota berhasil diperbarui",
      data: anggota,
    });
  } catch (error) {
    const kode = kodeErrorPrisma(error);

    if (kode === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan",
      });
    }

    if (kode === "P2002") {
      return res.status(409).json({
        success: false,
        message: "NIM sudah terdaftar",
      });
    }

    next(error);
  }
};

// DELETE /anggota/:id
export const deleteAnggota = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "ID anggota tidak valid",
    });
  }

  try {
    await hapusAnggota(id);
    return res.status(204).send();
  } catch (error) {
    if (kodeErrorPrisma(error) === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan",
      });
    }

    next(error);
  }
};