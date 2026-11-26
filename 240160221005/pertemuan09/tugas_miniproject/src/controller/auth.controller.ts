import { Request, Response, NextFunction } from 'express';
import * as service from '../service/auth.service';
import { success, error } from '../utils/response';
import { RegisterInput, LoginInput } from '../types/auth';
import { FieldError } from '../utils/ApiError';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.register(req.body as RegisterInput);
    
    // Status 201 Created untuk pembuatan resource baru (Register)
    res.setHeader('Location', `/auth/users/${result.user.id}`);
    return success(res, {
      statusCode: 201,
      message: 'Registrasi berhasil',
      data: result, // { user, token } — tanpa password
    });
  } catch (err: any) {
    // Cek jika error adalah Prisma Unique Constraint (P2002)
    if (err?.code === 'P2002') {
      const target = String(err?.meta?.target);
      let message = 'Data sudah terdaftar';
      const fieldErrors: FieldError[] = [];

      if (target.includes('email')) {
        message = 'Email sudah terdaftar';
        fieldErrors.push({ field: 'email', message: 'email sudah digunakan' });
      } else if (target.includes('nim')) {
        message = 'NIM sudah terdaftar';
        fieldErrors.push({ field: 'nim', message: 'NIM sudah digunakan' });
      }

      // Gunakan response envelope standar
      return error(res, {
        statusCode: 409,
        message,
        errors: fieldErrors,
      });
    }

    // Error lain (misal database mati) lempar ke global errorHandler
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.login(req.body as LoginInput);
    
    // Status 200 OK untuk Login (karena tidak membuat resource baru di database)
    return success(res, {
      statusCode: 200,
      message: 'Login berhasil',
      data: result,
    });
  } catch (err) { 
    next(err); 
  }
};