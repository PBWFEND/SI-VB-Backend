import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { error } from '../utils/response';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return error(res, {
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  }

  const anyErr = err as { code?: string };

  if (anyErr?.code === 'P2025') {
    return error(res, { statusCode: 404, message: 'Resource tidak ditemukan' });
  }
  if (anyErr?.code === 'P2002') {
    return error(res, { statusCode: 409, message: 'Data unik sudah ada' });
  }
  if (anyErr?.code === 'P2003') {
    return error(res, { statusCode: 400, message: 'Foreign key tidak valid' });
  }

  console.error('[UNHANDLED ERROR]', err);
  return error(res, { statusCode: 500, message: 'Internal Server Error' });
};