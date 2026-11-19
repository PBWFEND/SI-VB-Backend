import type { Request, Response, NextFunction } from "express";
import * as authService from "../service/auth.service";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const v = authService.validateRegister(req.body);
    if (!v.ok) return res.status(400).json({ message: "Validasi gagal", errors: v.errors });

    const result = await authService.registerUser(v.data!.nama, v.data!.email, v.data!.password);
    if (!result.ok) return res.status(result.code!).json({ message: result.message });

    res.status(201).json({ message: "Registrasi berhasil", data: result.data });
  } catch (err) { next(err); }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    const result = await authService.loginUser(email, password);
    if (!result.ok) return res.status(result.code!).json({ message: result.message });

    res.status(200).json({ message: "Login berhasil", data: result.data });
  } catch (err) { next(err); }
}