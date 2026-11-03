import 'dotenv/config';
import express from 'express';
import laboratoriumRoutes from './src/routes/laboratorium.routes';
import { notFound } from './src/middlewares/notFound';
import { errorHandler } from './src/middlewares/errorHandler';

const app = express();

// Body parser
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Root info
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Mini Project UTS — REST API Laboratorium',
    data: {
      endpoints: [
        'GET    /health',
        'GET    /api/laboratorium',
        'GET    /api/laboratorium/:id',
        'POST   /api/laboratorium',
        'PUT    /api/laboratorium/:id',
        'PATCH  /api/laboratorium/:id',
        'DELETE /api/laboratorium/:id',
      ],
    },
  });
});

// Resource routes
app.use('/api/laboratorium', laboratoriumRoutes);

// ⭐ Middleware 404 + error handler (wajib di app.ts per §4.1)
app.use(notFound);
app.use(errorHandler);

export default app;