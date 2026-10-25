
import app from "./app.js";

const port = Number(process.env.PORT) || 3004;

app.listen(port, () => {
  console.log(
    `API Sistem Informasi Perpustakaan berjalan di http://localhost:${port}`
  );
});