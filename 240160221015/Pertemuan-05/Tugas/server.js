/**
 * ============================================================
 * Tugas 3 — Menjalankan REST API E-Warung
 * ============================================================
 */

import app from "./app.js";

const port = Number(process.env.PORT ?? 3008);

app.listen(port, () => {
  console.log(`REST API E-Warung berjalan di http://localhost:${port}`);
});