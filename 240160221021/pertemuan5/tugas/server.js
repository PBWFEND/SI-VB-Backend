/**
 * Tugas 3 - Menjalankan RESTful API
 * Jalankan: npm start
 * Port dapat diubah lewat environment variable PORT (bawaan 3006).
 */

import app from "./app.js";

const port = Number(process.env.PORT ?? 3006);

app.listen(port, () => {
  console.log(`REST API Buku berjalan di http://localhost:${port}`);
});