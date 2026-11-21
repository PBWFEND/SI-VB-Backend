import { Request, Response, NextFunction } from 'express';
import * as service from '../service/auth.service';
import { success } from '../utils/response';
import { RegisterInput, LoginInput } from '../types/auth';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.register(req.body as RegisterInput);
    res.setHeader('Location', `/auth/users/${result.user.id}`);
    return success(res, {
      statusCode: 201,
      message: 'Registrasi berhasil',
      data: result, // { user, token } — tanpa password
    });
  } catch (err: any) {
    // PERBAIKAN: Cek apakah error berasal dari Prisma Unique Constraint (P2002)
    if (err?.code === 'P2002') {
      // Cek field apa yang duplikat
      const target = String(err?.meta?.target);
      
      if (target.includes('email')) {
        return res.status(409).json({
          success: false,
          message: "Email sudah terdaftar",
          errors: [{ field: "email", message: "email sudah digunakan" }]
        });
      }
      
      if (target.includes('nim')) {
        return res.status(409).json({
          success: false,
          message: "NIM sudah terdaftar",
          errors: [{ field: "nim", message: "NIM sudah digunakan" }]
        });
      }

      // Fallback jika ada field unik lain
      return res.status(409).json({
        success: false,
        message: "Data sudah terdaftar",
        errors: []
      });
    }

    // Jika error bukan karena duplikat (misal database error), baru lempar ke global error handler
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.login(req.body as LoginInput);
    return success(res, {
      statusCode: 200,
      message: 'Login berhasil',
      data: result,
    });
  } catch (err) { 
    next(err); 
  }
};