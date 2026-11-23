
import express from "express";
import bukuRoutes from "./routes/buku.routes";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "API BookSpace berjalan!" });
});

app.use("/api/buku", bukuRoutes);

// Handler 404 untuk endpoint yang tidak ditemukan
app.use((_req, res) => {
  res.status(404).json({
    message: "Endpoint tidak ditemukan",
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});