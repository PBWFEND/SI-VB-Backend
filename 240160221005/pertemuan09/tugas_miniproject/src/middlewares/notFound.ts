import { Request, Response } from 'express';
import { error } from '../utils/response';

export const notFound = (req: Request, res: Response) => {
  return error(res, {
    statusCode: 404,
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
};