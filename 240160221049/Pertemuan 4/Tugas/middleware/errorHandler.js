/**
 * Handler 404 & error middleware.
 * - notFound: dipasang SETELAH semua route valid.
 * - errorHandler: 4 parameter, dipasang PALING AKHIR.
 */

export const notFound = (request, response) => {
  response.status(404).json({
    success: false,
    message: `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`,
  });
};

export const errorHandler = (error, request, response, next) => {
  // Log internal, jangan kirim detail ke client
  console.error("[ERROR]", error.message);

  const status = error.status ?? 500;
  response.status(status).json({
    success: false,
    message: status === 500
      ? "Terjadi kesalahan pada server"
      : error.message,
  });
};