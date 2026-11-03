/**
 * Tugas 2 - Menjalankan HTTP server Express.js
 * Jalankan: npm start
 * Port dapat diubah lewat environment variable PORT (bawaan 3004).
 */

import app from "./app.js";

const port = Number(process.env.PORT ?? 3004);

app.listen(port, () => {
  console.log(`API Buku berjalan di http://localhost:${port}`);
});