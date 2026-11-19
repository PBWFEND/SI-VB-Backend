/**
 * ============================================================
 * Tugas 2 — Menjalankan Express Server
 * ============================================================
 * Dipisahkan dari app.js agar app dapat diuji tanpa membuka port.
 */

import app from "./app.js";

const port = Number(process.env.PORT ?? 3004);

app.listen(port, () => {
  console.log(`Express API E-Warung berjalan di http://localhost:${port}`);
});