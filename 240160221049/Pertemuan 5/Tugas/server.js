/**
 * Entry point: buka port untuk Express app.
 * Jalankan: npm start
 */

import app from "./app.js";

const port = Number(process.env.PORT ?? 3006);

app.listen(port, () => {
  console.log(`REST API Buku berjalan di http://localhost:${port}`);
});