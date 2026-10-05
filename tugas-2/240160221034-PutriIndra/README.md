# Tugas 2 — Node.js Fundamentals

## Identitas

* Nama: Putri Indra Lestari Aryanto
* NIM: 240160221034
* Mata Kuliah: Praktikum Pemrograman Web
* Pertemuan: 3 — Node.js Fundamentals

## Deskripsi

Tugas ini merupakan implementasi dasar Node.js tanpa menggunakan Express.js. Aplikasi menggunakan modul bawaan Node.js untuk membuat HTTP server, konfigurasi aplikasi, routing sederhana, response JSON, dan pembacaan data mahasiswa dari file JSON secara asynchronous.

## Struktur Folder

```text
240160221034-PutriIndra/
├── README.md
├── config.js
├── server.js
├── refleksi.md
└── data/
    └── students.json
```

## Cara Menjalankan

Pastikan terminal berada di folder:

```text
tugas-2/240160221034-PutriIndra
```

Kemudian jalankan server dengan perintah:

```bash
node server.js
```

Server berjalan pada:

```text
http://localhost:3003
```

## Endpoint API

### 1. GET `/`

Menampilkan pesan selamat datang dan daftar endpoint yang tersedia.

```bash
curl.exe http://localhost:3003/
```

Response:

```json
{
  "success": true,
  "message": "Selamat datang di API Pertemuan 3",
  "endpoints": [
    "GET /",
    "GET /health",
    "GET /students"
  ]
}
```

### 2. GET `/health`

Menampilkan status kesehatan server dan versi Node.js.

```bash
curl.exe http://localhost:3003/health
```

### 3. GET `/students`

Menampilkan data mahasiswa dari file `data/students.json`.

```bash
curl.exe http://localhost:3003/students
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "nim": "240160221034",
      "nama": "Putri Indra Lestari Aryanto"
    }
  ]
}
```

### 4. Endpoint tidak tersedia

Endpoint yang tidak tersedia akan menghasilkan status `404 Not Found`.

```bash
curl.exe -i http://localhost:3003/tidak-ada
```

Response:

```json
{
  "success": false,
  "message": "Endpoint GET /tidak-ada tidak ditemukan"
}
```

## Teknologi yang Digunakan

* Node.js 24.18.0
* Modul bawaan `node:http`
* Modul bawaan `node:fs/promises`
* Modul `node:path` jika digunakan pada pengembangan selanjutnya
* HTTP server tanpa Express.js
* Data mahasiswa disimpan dalam file JSON

## Catatan

Aplikasi ini dibuat menggunakan Node.js tanpa menggunakan Express.js. Pembacaan data mahasiswa pada endpoint `/students` dilakukan secara asynchronous menggunakan `readFile` dari `node:fs/promises`.
