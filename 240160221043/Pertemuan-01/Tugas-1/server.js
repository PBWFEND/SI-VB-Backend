
const http = require("http");

let mahasiswa = [];
let absensi = [];

let idMahasiswa = 1;
let idAbsensi = 1;

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json"
  });
  res.end(JSON.stringify(data, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      if (!body) return resolve({});

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Format JSON tidak valid"));
      }
    });

    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const method = req.method;
  const path = url.pathname;
  const parts = path.split("/").filter(Boolean);

  try {
    // RESOURCE MAHASISWA
    if (parts[0] === "mahasiswa") {
      const id = Number(parts[1]);
      const index = mahasiswa.findIndex(m => m.id === id);

      if (method === "GET" && parts.length === 1) {
        return sendJSON(res, 200, { data: mahasiswa });
      }

      if (method === "GET" && parts.length === 2) {
        if (index === -1) {
          return sendJSON(res, 404, {
            message: "Mahasiswa tidak ditemukan"
          });
        }

        return sendJSON(res, 200, {
          message: "Data mahasiswa ditemukan",
          data: mahasiswa[index]
        });
      }

      if (method === "POST" && parts.length === 1) {
        const body = await readBody(req);
        const { nama, npm, kelas } = body;

        if (!nama || !npm || !kelas) {
          return sendJSON(res, 400, {
            message: "Nama, NPM, dan kelas wajib diisi"
          });
        }

        const dataBaru = {
          id: idMahasiswa++,
          nama,
          npm,
          kelas
        };

        mahasiswa.push(dataBaru);

        return sendJSON(res, 201, {
          message: "Mahasiswa berhasil ditambahkan",
          data: dataBaru
        });
      }

      if (method === "PUT" && parts.length === 2) {
        if (index === -1) {
          return sendJSON(res, 404, {
            message: "Mahasiswa tidak ditemukan"
          });
        }

        const body = await readBody(req);
        const { nama, npm, kelas } = body;

        if (!nama || !npm || !kelas) {
          return sendJSON(res, 400, {
            message: "Nama, NPM, dan kelas wajib diisi"
          });
        }

        mahasiswa[index] = {
          id,
          nama,
          npm,
          kelas
        };

        return sendJSON(res, 200, {
          message: "Data mahasiswa berhasil diperbarui",
          data: mahasiswa[index]
        });
      }

      if (method === "DELETE" && parts.length === 2) {
        if (index === -1) {
          return sendJSON(res, 404, {
            message: "Mahasiswa tidak ditemukan"
          });
        }

        mahasiswa.splice(index, 1);

        return sendJSON(res, 200, {
          message: "Mahasiswa berhasil dihapus"
        });
      }
    }

    // RESOURCE ABSENSI
    if (parts[0] === "absensi") {
      const id = Number(parts[1]);
      const index = absensi.findIndex(a => a.id === id);

      if (method === "GET" && parts.length === 1) {
        return sendJSON(res, 200, { data: absensi });
      }

      if (method === "GET" && parts.length === 2) {
        if (index === -1) {
          return sendJSON(res, 404, {
            message: "Data absensi tidak ditemukan"
          });
        }

        return sendJSON(res, 200, {
          message: "Data absensi ditemukan",
          data: absensi[index]
        });
      }

      if (method === "POST" && parts.length === 1) {
        const body = await readBody(req);
        const {
          id_mahasiswa,
          tanggal,
          mata_kuliah,
          status
        } = body;

        const statusValid = [
          "Hadir", "Izin", "Sakit", "Alpa"
        ];

        if (
          !id_mahasiswa ||
          !tanggal ||
          !mata_kuliah ||
          !status
        ) {
          return sendJSON(res, 400, {
            message: "Semua field absensi wajib diisi"
          });
        }

        if (!statusValid.includes(status)) {
          return sendJSON(res, 400, {
            message: "Status harus Hadir, Izin, Sakit, atau Alpa"
          });
        }

        const ditemukan = mahasiswa.some(
          m => m.id === Number(id_mahasiswa)
        );

        if (!ditemukan) {
          return sendJSON(res, 404, {
            message: "Mahasiswa tidak ditemukan"
          });
        }

        const dataBaru = {
          id: idAbsensi++,
          id_mahasiswa: Number(id_mahasiswa),
          tanggal,
          mata_kuliah,
          status
        };

        absensi.push(dataBaru);

        return sendJSON(res, 201, {
          message: "Absensi berhasil dicatat",
          data: dataBaru
        });
      }

      if (method === "PUT" && parts.length === 2) {
        if (index === -1) {
          return sendJSON(res, 404, {
            message: "Data absensi tidak ditemukan"
          });
        }

        const body = await readBody(req);
        const {
          id_mahasiswa,
          tanggal,
          mata_kuliah,
          status
        } = body;

        const statusValid = [
          "Hadir", "Izin", "Sakit", "Alpa"
        ];

        if (
          !id_mahasiswa ||
          !tanggal ||
          !mata_kuliah ||
          !status
        ) {
          return sendJSON(res, 400, {
            message: "Semua field absensi wajib diisi"
          });
        }

        if (!statusValid.includes(status)) {
          return sendJSON(res, 400, {
            message: "Status absensi tidak valid"
          });
        }

        const ditemukan = mahasiswa.some(
          m => m.id === Number(id_mahasiswa)
        );

        if (!ditemukan) {
          return sendJSON(res, 404, {
            message: "Mahasiswa tidak ditemukan"
          });
        }

        absensi[index] = {
          id,
          id_mahasiswa: Number(id_mahasiswa),
          tanggal,
          mata_kuliah,
          status
        };

        return sendJSON(res, 200, {
          message: "Data absensi berhasil diperbarui",
          data: absensi[index]
        });
      }

      if (method === "DELETE" && parts.length === 2) {
        if (index === -1) {
          return sendJSON(res, 404, {
            message: "Data absensi tidak ditemukan"
          });
        }

        absensi.splice(index, 1);

        return sendJSON(res, 200, {
          message: "Data absensi berhasil dihapus"
        });
      }
    }

    return sendJSON(res, 404, {
      message: "Endpoint tidak ditemukan"
    });
  } catch (error) {
    const status = error.message === "Format JSON tidak valid"
      ? 400
      : 500;

    return sendJSON(res, status, {
      message: error.message === "Format JSON tidak valid"
        ? error.message
        : "Terjadi kesalahan pada server"
    });
  }
});

server.listen(3001, () => {
  console.log("Server berjalan di http://localhost:3001");
});
