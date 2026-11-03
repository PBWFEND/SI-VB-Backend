// ================= LOGGER MIDDLEWARE =================
// Mencetak method, url, waktu respon, dan status code
const logger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on("finish", () => {
    const durasi = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${method} ${originalUrl} → ${res.statusCode} (${durasi} ms)`);
  });

  next();
};

module.exports = logger;