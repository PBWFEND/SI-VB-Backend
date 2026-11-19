/**
 * Middleware logger: catat waktu, method, dan URL setiap request.
 */
export const logger = (request, response, next) => {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${request.method} ${request.originalUrl}`);
  next();
};