/**
 * Entry point: buka port untuk Express app.
 * Jalankan: npm start
 */

import app from "./app.js";

const port = Number(process.env.PORT ?? 3004);

app.listen(port, () => {
  console.log(`API Buku berjalan di http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV ?? "development"}`);
});