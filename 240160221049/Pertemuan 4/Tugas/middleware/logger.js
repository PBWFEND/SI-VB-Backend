/**
 * Middleware logger: mencatat waktu, method, dan URL setiap request.
 * Dipasang global sebelum route (lihat app.js).
 */
export const logger = (request, response, next) => {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${request.method} ${request.originalUrl}`);
  next();
};