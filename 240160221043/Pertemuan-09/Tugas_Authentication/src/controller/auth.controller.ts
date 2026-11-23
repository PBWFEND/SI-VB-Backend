import type { Request, Response } from "express";
import * as authService from "../service/auth.service.ts";

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { nama, email, password } = req.body ?? {};

    if (
      typeof nama !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !nama.trim() ||
      !isValidEmail(email) ||
      password.length < 8
    ) {
      return res.status(400).json({
        message: "Input tidak valid. Nama wajib diisi, email harus valid, dan password minimal 8 karakter.",
      });
    }

    const pengguna = await authService.register(
      nama.trim(),
      email.trim(),
      password,
    );

    return res.status(201).json({
      message: "Registrasi berhasil",
      data: pengguna,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        message: "Email sudah terdaftar",
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body ?? {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !isValidEmail(email) ||
      !password
    ) {
      return res.status(400).json({
        message: "Email atau password tidak valid",
      });
    }

    const pengguna = await authService.login(
      email.trim(),
      password,
    );

    if (!pengguna) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    return res.status(200).json({
      message: "Login berhasil",
      data: pengguna,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
