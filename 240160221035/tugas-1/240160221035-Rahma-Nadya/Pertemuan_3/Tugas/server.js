import http from "node:http";
import { readFile } from "node:fs/promises";
import { getConfig } from "./config.js";

const { appName, port, environment } = getConfig();

const sendJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(data));
};

const readData = async () => {
  const file = await readFile("./data/data.json", "utf8");
  return JSON.parse(file);
};

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/") {
    return sendJSON(res, 200, {
      success: true,
      message: appName,
      environment,
    });
  }

  if (method === "GET" && url === "/health") {
    return sendJSON(res, 200, {
      success: true,
      message: "Server berjalan dengan baik",
    });
  }

  if (method === "GET" && url === "/info") {
    return sendJSON(res, 200, {
      success: true,
      appName,
      environment,
      port,
    });
  }

  if (method === "GET" && url === "/data") {
    const data = await readData();

    return sendJSON(res, 200, {
      success: true,
      data,
    });
  }

  return sendJSON(res, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

server.listen(port, () => {
  console.log(`${appName} berjalan di http://localhost:${port}`);
});
