/**
 * Handler 404 & error middleware.
 * notFound      : dipasang SETELAH semua route valid.
 * errorHandler  : 4 parameter, PALING AKHIR.
 */

import { sendError } from "../utils/response.js";

export const notFound = (request, response) => {
  return sendError(
    response,
    404,
    `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`
  );
};

export const errorHandler = (error, request, response, next) => {
  console.error("[ERROR]", error.message);
  const status = error.status ?? 500;
  return sendError(
    response,
    status,
    status === 500 ? "Terjadi kesalahan pada server" : error.message
  );
};