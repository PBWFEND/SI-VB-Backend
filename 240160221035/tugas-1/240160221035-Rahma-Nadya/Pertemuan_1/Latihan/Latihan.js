const http = require("node:http");

const PORT = 3001;

const mahasiswa = [
  { nim: "F1D022001", nama: "Jhon Doe" },
  { nim: "F1D022002", nama: "Ani Lestari" },
];

function sendJSON(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload, null, 2));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve(null);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  console.log(`${method} ${url}`);

  if (method === "GET" && url === "/about") {
    return sendJSON(res, 200, {
      success: true,
      message: "API Pertemuan 1",
      author: "Rahma Nadya",
    });
  }

  if (method === "POST" && url === "/mahasiswa") {
    const body = await readBody(req);
    const { nim, nama } = body || {};

    if (!nim || !nama) {
      return sendJSON(res, 400, {
        success: false,
        message: "Field 'nim' dan 'nama' wajib diisi",
      });
    }

    const baru = { nim, nama };

    mahasiswa.push(baru);

    return sendJSON(res, 201, {
      success: true,
      message: "Mahasiswa berhasil ditambahkan",
      data: baru,
    });
  }

  if (method === "GET" && url === "/mahasiswa") {
    return sendJSON(res, 200, {
      success: true,
      total: mahasiswa.length,
      data: mahasiswa,
    });
  }

  return sendJSON(res, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

server.listen(PORT, () => {
  console.log(`Latihan berjalan di http://localhost:${PORT}`);
  console.log("Kerjakan semua TODO 1-4, lalu uji setiap endpoint.");
});