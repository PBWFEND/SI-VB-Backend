
import type { RequestHandler } from "express";
import { registerUser, loginUser } from "../service/auth.service.ts";

const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const handlerRegister: RequestHandler = async (req, res) => {
  try {
    const { nama, email, password } = req.body ?? {};

    if (
      typeof nama !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
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
    console.error("ERROR REGISTER:", error);

    if (error instanceof Error && error.message === "EMAIL_EXISTS") {
      res.status(409).json({
        success: false,
        message: "Email sudah terdaftar",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const handlerLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !validEmail.test(email.trim()) ||
      password.length < 8
    ) {
      res.status(400).json({
        success: false,
        message: "Data login tidak valid",
      });
      return;
    }

    const user = await loginUser({
      email: email.trim().toLowerCase(),
      password,
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Email atau password tidak sesuai",
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