// src/server.js
import http from 'node:http';
import fs from 'node:fs/promises'; // Menggunakan promises untuk async/await
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import { sendJsonResponse } from './helper.js';

// Setup path untuk operasi file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'data.txt');

const server = http.createServer(async (req, res) => {
    const url = req.url;
    const method = req.method;

    // Log request masuk
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);

    // Routing hanya untuk method GET
    if (method === 'GET') {
        
        // Endpoint 1: Root (Info Aplikasi)
        if (url === '/') {
            sendJsonResponse(res, 200, {
                message: `Selamat datang di ${config.appName}`,
                environment: config.environment,
                status: "OK"
            });
        }
        
        // Endpoint 2: /about
        else if (url === '/about') {
            sendJsonResponse(res, 200, {
                app: config.appName,
                version: "1.0.0",
                author: "Aprilliana Fratiwi"
            });
        }

        // Endpoint 3: /read-file (Operasi Baca File Asynchronous)
        else if (url === '/read-file') {
            try {
                // Membaca file secara asynchronous
                const data = await fs.readFile(filePath, 'utf-8');
                sendJsonResponse(res, 200, {
                    status: "success",
                    content: data.trim()
                });
            } catch (error) {
                sendJsonResponse(res, 500, {
                    status: "error",
                    message: "Gagal membaca file",
                    error: error.message
                });
            }
        }

        // Endpoint 4: /write-file (Operasi Tulis File Asynchronous)
        else if (url === '/write-file') {
            try {
                const newContent = `File diperbarui pada: ${new Date().toLocaleString()}\n`;
                // Menulis file secara asynchronous
                await fs.writeFile(filePath, newContent);
                sendJsonResponse(res, 200, {
                    status: "success",
                    message: "File berhasil ditulis/diperbarui",
                    data: newContent.trim()
                });
            } catch (error) {
                sendJsonResponse(res, 500, {
                    status: "error",
                    message: "Gagal menulis file",
                    error: error.message
                });
            }
        }

        // Kriteria 4: Response 404 untuk endpoint tidak tersedia
        else {
            sendJsonResponse(res, 404, {
                status: "Not Found",
                message: `Endpoint ${url} tidak ditemukan di server ini.`
            });
        }

    } else {
        // Jika method bukan GET (misal POST/PUT)
        sendJsonResponse(res, 405, {
            status: "Method Not Allowed",
            message: "Server ini hanya menerima method GET."
        });
    }
});

// Menjalankan Server
server.listen(config.port, () => {
    console.log(`${config.appName} berjalan di http://localhost:${config.port}`);
    console.log(`Environment: ${config.environment}`);
});