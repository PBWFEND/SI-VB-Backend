# Tugas 2 - Node.js Fundamentals

## Deskripsi

Tugas ini merupakan implementasi Node.js tanpa menggunakan Express.js. Aplikasi dibuat menggunakan modul `node:http` dan menggunakan ES Module (ESM).

Aplikasi menyediakan beberapa endpoint GET, response dalam format JSON, serta membaca data dari file JSON secara asynchronous.

## Fitur

- Konfigurasi aplikasi menggunakan ES Module.
- HTTP server menggunakan `node:http`.
- Response dalam format JSON.
- Endpoint `GET /`
- Endpoint `GET /health`
- Endpoint `GET /info`
- Endpoint `GET /data`
- Response `404 Not Found` untuk endpoint yang tidak tersedia.
- Membaca file `data.json` menggunakan asynchronous file system.

## Struktur Folder

```text
Tugas/
├── README.md
├── config.js
├── server.js
├── refleksi.md
└── data/
    └── data.json