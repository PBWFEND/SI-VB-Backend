
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET belum dikonfigurasi");
}

if (!process.env.JWT_EXPIRES_IN) {
  throw new Error("JWT_EXPIRES_IN belum dikonfigurasi");
}

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});