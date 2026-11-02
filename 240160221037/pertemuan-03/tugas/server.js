const http = require("http");
const { COURSE_CODE, bacaJSON } = require("./config");

const PORT = 3003;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // Endpoint utama
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200);
    return res.end(
      JSON.stringify({
        message: "Server berjalan dengan baik",
        courseCode: COURSE_CODE
      })
    );
  }

  // Endpoint mahasiswa
  if (req.method === "GET" && req.url === "/students") {
    const students = bacaJSON("data.json");

    if (students === null) {
      res.writeHead(500);
      return res.end(
        JSON.stringify({
          message: "Gagal membaca data mahasiswa"
        })
      );
    }

    res.writeHead(200);
    return res.end(JSON.stringify(students));
  }

  // Endpoint tidak ditemukan
  res.writeHead(404);
  return res.end(
    JSON.stringify({
      message: "Endpoint tidak ditemukan",
      path: req.url
    })
  );
});

server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`Course Code: ${COURSE_CODE}`);
});