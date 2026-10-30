
import app from "./app.js";

const PORT = Number(process.env.PORT ?? 3004);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
