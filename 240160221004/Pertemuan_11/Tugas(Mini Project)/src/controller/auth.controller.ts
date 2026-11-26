import type { Request, Response, NextFunction } from "express";
import * as authService from "../service/auth.service";
import { AppError } from "../errors/AppError";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const v = authService.validateRegister(req.body);
    if (!v.ok) throw new AppError("Validasi gagal", 400);

    const result = await authService.registerUser(v.data!.nama, v.data!.email, v.data!.password);
    if (!result.ok) throw new AppError(result.message!, result.code!);

    res.status(201).json({ message: "Registrasi berhasil", data: result.data });
  } catch (err) { next(err); }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (typeof email !== "string" || typeof password !== "string") {
      throw new AppError("Email dan password wajib diisi", 400);
    }

    const result = await authService.loginUser(email, password);
    if (!result.ok) throw new AppError(result.message!, result.code!);

    res.status(200).json({ message: "Login berhasil", data: result.data });
  } catch (err) { next(err); }
}