import express, { Request, Response, NextFunction } from 'express';
import bukuRouter from './routes/buku.route';
import { loggerMiddleware } from './middleware/logger';

const app = express();

// --- Middleware global ---
app.use(express.json());
app.use(loggerMiddleware);

// --- Routes ---
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'API Perpustakaan - Resource Buku',
    endpoints: [
      'GET /buku',
      'GET /buku/:id',
      'POST /buku',
      'PUT /buku/:id',
      'PATCH /buku/:id',
      'DELETE /buku/:id'
    ]
  });
});

app.use('/buku', bukuRouter);

// ============================================================
// MIDDLEWARE 404 — hanya dipanggil bila tidak ada route cocok
// ============================================================
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Endpoint tidak ditemukan: ${req.method} ${req.originalUrl}`
  });
});

// ============================================================
// ERROR HANDLER — harus 4 argumen, diletakkan paling akhir
// ============================================================
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  // Fallback untuk Prisma P2025 (record not found) jika lolos dari service
  if (err.code === 'P2025') {
    return res
      .status(404)
      .json({ success: false, message: 'Data tidak ditemukan' });
  }

  const status: number = err.status ?? err.statusCode ?? 500;
  const isServer = status >= 500;

  if (isServer) console.error(err);

  const body: any = {
    success: false,
    message: isServer ? 'Internal Server Error' : err.message
  };
  if (err.errors) body.errors = err.errors;

  res.status(status).json(body);
});

export default app;