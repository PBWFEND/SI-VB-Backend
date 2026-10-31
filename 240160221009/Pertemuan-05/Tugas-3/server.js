
import app from "./app.js";

const PORT = Number(process.env.PORT ?? 3007);

const server = app.listen(PORT, () => {
  console.log(
    `API Absensi Perkuliahan berjalan di http://localhost:${PORT}`
  );
});

// Menangani error ketika server gagal membuka port
server.on("error", (error) => {
  console.error("Gagal menjalankan server:", error.message);
});
