import { Response } from 'express';

interface SuccessOptions<T> {
  statusCode?: number;
  message?: string;
  data?: T | null;
  meta?: Record<string, unknown>;
}

interface ErrorOptions {
  statusCode?: number;
  message?: string;
  errors?: unknown;
}

export const success = <T>(res: Response, opts: SuccessOptions<T> = {}) => {
  const { statusCode = 200, message = 'OK', data = null, meta } = opts;
  const body: Record<string, unknown> = { success: true, message, data };
  if (meta !== undefined) body.meta = meta;
  return res.status(statusCode).json(body);
};

export const error = (res: Response, opts: ErrorOptions = {}) => {
  const { statusCode = 500, message = 'Internal Server Error', errors } = opts;
  const body: Record<string, unknown> = { success: false, message };
  if (errors !== undefined) body.errors = errors;
  return res.status(statusCode).json(body);
};