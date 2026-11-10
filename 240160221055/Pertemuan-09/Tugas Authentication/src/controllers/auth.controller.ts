
import type { Request, Response, NextFunction } from "express";
import {
  findUserByEmail,
  hashPassword,
  registerUser,
  verifyPassword,
} from "../services/auth.service.js";

const emailValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nama, email, password } = req.body;

    if (
      typeof nama !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      nama.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      res.status(400).json({
        message: "Nama, email, dan password wajib diisi",
      });
      return;
    }

    const namaBersih = nama.trim();
    const emailBersih = email.trim().toLowerCase();

    if (!emailValid(emailBersih)) {
      res.status(400).json({
        message: "Format email tidak valid",
      });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        message: "Password minimal 8 karakter",
      });
      return;
    }

    const penggunaLama = await findUserByEmail(emailBersih);

    if (penggunaLama) {
      res.status(409).json({
        message: "Email sudah terdaftar",
      });
      return;
    }

    const passwordHash = await hashPassword(password);

    const pengguna = await registerUser({
      nama: namaBersih,
      email: emailBersih,
      passwordHash,
    });

    res.status(201).json({
      message: "Registrasi berhasil",
      data: pengguna,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      email.trim() === "" ||
      password === ""
    ) {
      res.status(400).json({
        message: "Email dan password wajib diisi",
      });
      return;
    }

    const emailBersih = email.trim().toLowerCase();
    const pengguna = await findUserByEmail(emailBersih);

    if (
      !pengguna ||
      !pengguna.passwordHash ||
      !(await verifyPassword(password, pengguna.passwordHash))
    ) {
      res.status(401).json({
        message: "Email atau password salah",
      });
      return;
    }

    res.status(200).json({
      message: "Login berhasil",
      data: {
        id: pengguna.id,
        nama: pengguna.nama,
        email: pengguna.email,
      },
    });
  } catch (error) {
    next(error);
  }
};