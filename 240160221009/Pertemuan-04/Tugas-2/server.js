
import app from "./app.js";

const PORT = Number(process.env.PORT ?? 3004);

// Menjalankan Express server
app.listen(PORT, (error) => {
  if (error) {
    console.error("Gagal menjalankan server:", error.message);
    process.exit(1);
  }

  console.log(`API Absensi Perkuliahan berjalan di http://localhost:${PORT}`);
});
