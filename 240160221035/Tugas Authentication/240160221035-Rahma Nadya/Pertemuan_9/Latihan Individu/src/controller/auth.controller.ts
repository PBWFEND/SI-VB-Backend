
import type { RequestHandler } from "express";

import {
  registerUser,
  loginUser,
} from "../service/auth.service.ts";

const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validNim = /^\d{12}$/;

// REGISTER
export const handlerRegister: RequestHandler = async (req, res) => {
  try {
    const { nim, nama, email, password } = req.body ?? {};

    // Validasi input register
    if (
      typeof nim !== "string" ||
      typeof nama !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !validNim.test(nim.trim()) ||
      !nama.trim() ||
      !validEmail.test(email.trim()) ||
      password.length < 8
    ) {
      res.status(400).json({
        success: false,
        message: "Data register tidak valid",
      });
      return;
    }

    const user = await registerUser({
      nim: nim.trim(),
      nama: nama.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    res.status(201).json({
      success: true,
      message: "Akun berhasil dibuat",
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "INVALID_NIM") {
        res.status(400).json({
          success: false,
          message: "NIM harus terdiri dari 12 digit angka",
        });
        return;
      }

      if (
        error.message === "NIM_EXISTS" ||
        error.message === "EMAIL_EXISTS"
      ) {
        res.status(409).json({
          success: false,
          message: "NIM atau email sudah terdaftar",
        });
        return;
      }
    }

    console.error("ERROR REGISTER:", error);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// LOGIN
export const handlerLogin: RequestHandler = async (req, res) => {
  try {
    const { nim, password } = req.body ?? {};

    // Validasi input login
    if (
      typeof nim !== "string" ||
      typeof password !== "string" ||
      !validNim.test(nim.trim()) ||
      password.length < 8
    ) {
      res.status(400).json({
        success: false,
        message: "Data login tidak valid",
      });
      return;
    }

    const user = await loginUser({
      nim: nim.trim(),
      password,
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "NIM atau password tidak sesuai",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: user,
    });
  } catch (error) {
    console.error("ERROR LOGIN:", error);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};