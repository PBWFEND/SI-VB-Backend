# Tugas 2 — Project Node.js dan HTTP Server Sederhana

Project ini merupakan implementasi HTTP server sederhana menggunakan Node.js tanpa Express.js.

## Teknologi

* Node.js
* Native HTTP Server
* ES Module (ESM)
* File System Asynchronous
* JSON

## Struktur Folder

```text
240160221055/
├── Pertemuan-01/
├── Pertemuan-02/
└── Pertemuan-03/
    ├── Latihan-Individu/
    └── Tugas-2/
        ├── README.md
        ├── package.json
        ├── config.js
        ├── server.js
        ├── refleksi.md
        ├── .gitignore
        ├── bukti-pengujian/
        │   ├── Pengujian endpoint - health.png
        │   ├── Pengujian endpoint - students.png
        │   ├── Pengujian endpoint.png
        │   └── Pengujian endpoint yang tidak tersedia.png
        └── data/
            └── students.json
```

## Konfigurasi

Konfigurasi aplikasi terdapat pada `config.js`, yaitu:

* Nama aplikasi
* Port server
* Environment

Nilai default:

```text
PORT=3003
NODE_ENV=development
```

Environment variable dapat diubah ketika menjalankan server.

Contoh:

```bash
PORT=4000 NODE_ENV=production node server.js
```

## Cara Menjalankan

Pastikan Node.js sudah terpasang.

Jalankan:

```bash
node server.js
```

Jika berhasil, akan muncul:

```text
Simple Student API running at http://localhost:3003
Environment: development
```

## Endpoint

### 1. GET `/`

Menampilkan informasi aplikasi.

```bash
curl -i http://localhost:3003/
```

Contoh response:

```text
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"message":"Welcome to Simple Student API","environment":"development"}
```

### 2. GET `/health`

Digunakan untuk mengecek status server.

```bash
curl -i http://localhost:3003/health
```

Contoh response:

```text
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"status":"ok"}
```

### 3. GET `/students`

Membaca data mahasiswa dari file `data/students.json` secara asynchronous.

```bash
curl -i http://localhost:3003/students
```

Contoh response:

```text
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"data":[{"id":1,"name":"Andi","major":"Sistem Informasi"},{"id":2,"name":"Siti","major":"Informatika"},{"id":3,"name":"Budi","major":"Sistem Informasi"}]}
```

### 4. Endpoint tidak tersedia

```bash
curl -i http://localhost:3003/tidak-ada
```

Contoh response:

```text
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{"error":"Endpoint tidak ditemukan"}
```

## Pengujian

Pengujian dilakukan menggunakan Command Prompt dengan menjalankan beberapa endpoint berikut:

```bash
curl -i http://localhost:3003/
curl -i http://localhost:3003/health
curl -i http://localhost:3003/students
curl -i http://localhost:3003/tidak-ada
```
Hasil yang diharapkan:

| Endpoint     | Method | Status |
| ------------ | ------ | -----: |
| `/`          | GET    |    200 |
| `/health`    | GET    |    200 |
| `/students`  | GET    |    200 |
| `/tidak-ada` | GET    |    404 |

## Catatan

Project ini tidak menggunakan Express.js maupun package eksternal. Data mahasiswa dibaca dari file JSON menggunakan operasi filesystem asynchronous dari Node.js.

Tidak terdapat `node_modules`, token, password, maupun file konfigurasi rahasia di dalam repository.