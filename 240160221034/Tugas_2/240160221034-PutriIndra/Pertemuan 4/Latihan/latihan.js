/**

* Pertemuan 4 — Latihan routing dan middleware Express.js
  */

import express from "express";

const app = express();
app.disable("x-powered-by");
const port = 3005;

const buku = [
{ id: 1, judul: "Belajar Node.js", tersedia: true },
{ id: 2, judul: "Dasar Express.js", tersedia: false },
];

app.use(express.json());

// Middleware logger
app.use((request, response, next) => {
console.log(
`${new Date().toLocaleString()} | ${request.method} ${request.originalUrl}`
);
next();
});

// GET semua buku dan filter ketersediaan
app.get("/buku", (request, response) => {
const { tersedia } = request.query;

if (tersedia !== undefined && !["true", "false"].includes(tersedia)) {
return response.status(400).json({
success: false,
message: "Query tersedia harus true atau false",
});
}

const data =
tersedia === undefined
? buku
: buku.filter((item) => String(item.tersedia) === tersedia);

return response.json({ success: true, total: data.length, data });
});

// GET detail buku
app.get("/buku/:id", (request, response) => {
const item = buku.find(
({ id }) => id === Number(request.params.id)
);

if (!item) {
return response.status(404).json({
success: false,
message: "Buku tidak ditemukan",
});
}

return response.json({ success: true, data: item });
});

// POST tambah buku
app.post("/buku", (request, response) => {
const { judul, penulis } = request.body;

if (
typeof judul !== "string" ||
!judul.trim() ||
typeof penulis !== "string" ||
!penulis.trim()
) {
return response.status(400).json({
success: false,
message: "Judul dan penulis wajib diisi",
});
}

const bukuBaru = {
id: buku.length
? Math.max(...buku.map((item) => item.id)) + 1
: 1,
judul: judul.trim(),
penulis: penulis.trim(),
tersedia: true,
};

buku.push(bukuBaru);

return response.status(201).json({
success: true,
message: "Buku berhasil ditambahkan",
data: bukuBaru,
});
});

// Handler 404
app.use((request, response) => {
return response.status(404).json({
success: false,
message: "Endpoint tidak ditemukan",
});
});

app.listen(port, () => {
console.log(`Latihan berjalan di http://localhost:${port}`);
});
