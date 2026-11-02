import express, { Request, Response, NextFunction } from 'express';
import ApiError from './utils/ApiError';
import { error } from './utils/response';
import laboratoriumRouter from './routes/laboratorium'; // <-- Import router

const app = express();

// 1. Middleware untuk membaca JSON body
app.use(express.json());

// 2. Daftarkan Routes
app.use('/api/laboratorium', laboratoriumRouter);

// ==========================================
// 3. ERROR HANDLER
// ==========================================
export const notFound = (req: Request, res: Response) => {
  return error(res, {
    statusCode: 404,
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
};

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

  const anyErr = err as { code?: string; message?: string };

  if (anyErr?.code === 'P2025') {
    return error(res, { statusCode: 404, message: 'Resource tidak ditemukan' });
  }
  if (anyErr?.code === 'P2002') {
    return error(res, { statusCode: 409, message: 'Data unik sudah ada' });
  }

  console.error('[UNHANDLED ERROR]', err);
  return error(res, { statusCode: 500, message: 'Internal Server Error' });
};

// Daftarkan error handler (HARUS di paling bawah)
app.use(notFound);
app.use(errorHandler);

// ==========================================
// 4. NYALAKAN SERVER
// ==========================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});