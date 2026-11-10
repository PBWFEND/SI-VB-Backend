import type { Request, Response, NextFunction } from "express";
import {
  getAllPengguna,
  getPenggunaByEmail,
  createPengguna,
} from "../services/pengguna.service.js";

export const getPengguna = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pengguna = await getAllPengguna();

    res.status(200).json({
      message: "Data pengguna berhasil diambil",
      data: pengguna,
    });
  } catch (error) {
    next(error);
  }
};

export const createPenggunaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nama, email } = req.body;

    if (
      typeof nama !== "string" ||
      typeof email !== "string" ||
      nama.trim() === "" ||
      email.trim() === ""
    ) {
      res.status(400).json({
        message: "Nama dan email wajib diisi dengan format teks",
      });
      return;
    }

    const emailBersih = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailBersih)) {
      res.status(400).json({
        message: "Format email tidak valid",
      });
      return;
    }

    const penggunaLama = await getPenggunaByEmail(emailBersih);

    if (penggunaLama) {
      res.status(409).json({
        message: "Email sudah terdaftar",
      });
      return;
    }

    const pengguna = await createPengguna({
      nama: nama.trim(),
      email: emailBersih,
    });

    res.status(201).json({
      message: "Pengguna berhasil ditambahkan",
      data: pengguna,
    });
  } catch (error) {
    next(error);
  }
};