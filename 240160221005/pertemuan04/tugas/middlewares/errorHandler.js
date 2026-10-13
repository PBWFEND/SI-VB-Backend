// ================= 404 NOT FOUND =================
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`
  });
};

// ================= ERROR HANDLER =================
// Harus 4 parameter (err, req, res, next) agar Express mengenali sebagai error middleware
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Terjadi kesalahan pada server"
  });
};

module.exports = { notFound, errorHandler };