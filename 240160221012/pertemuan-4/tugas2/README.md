# Tugas Express.js — Resource Buku

Nama    : Fadhlan Mahdan Ghani 
NPM     : 240160221012

Aplikasi Express.js sederhana untuk mengelola resource Buku pada Sistem Informasi Perpustakaan. Data disimpan di memori, sehingga data akan kembali ke data awal ketika server dijalankan ulang.

## Struktur Project
```text
tugas-express-buku/
├── app.js
├── server.js
├── package.json
└── README.md
```

## Cara Menjalankan

1. Install dependency:

```bash
npm install
```

2. Jalankan server:

```bash
npm start
```
atau jalankan dengan perintah :

```bash
npm run dev
```


3. Server berjalan di:

```text
npm notice run tugas-express-buku@1.0.0 start
npm notice run node server.js
Server berjalan di http://localhost:3000
```


## Daftar Endpoint

|  No | Method | Endpoint  | Keterangan                                                           | Sukses |     Gagal |
|---:|--------|-----------|----------------------------------------------------------------------|-------:|----------:|
|  1 | GET    | /buku     | Mengambil daftar buku. Mendukung query `?q=`, `?penulis=`, `?tahun=` |    200 | 400 / 500 |
|  2 | GET    | /buku/:id | Mengambil detail buku berdasarkan ID                                 |    200 | 400 / 404 |
|  3 | POST   | /buku     | Menambahkan buku baru                                                |    201 |       400 |
|  4 | PUT    | /buku/:id | Mengubah data buku berdasarkan ID                                    |    200 | 400 / 404 |
|  5 | DELETE | /buku/:id | Menghapus buku berdasarkan ID                                        |    204 | 400 / 404 |

## Contoh Request

### 1. GET `/buku`

```bash
curl http://localhost:3000/buku
```

response:
{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "penulis": "Andi",
      "tahun": 2024,
      "stok": 5
    },
    {
      "id": 2,
      "judul": "Pemrograman Web",
      "penulis": "Budi",
      "tahun": 2023,
      "stok": 3
    }
  ]
}


### 2. GET `/buku?penulis=Andi`

```bash
curl "http://localhost:3000/buku?penulis=Andi"
```

response:
{
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "penulis": "Andi",
      "tahun": 2024,
      "stok": 5
    }
  ]
}

### 3. GET `/buku/:id`

```bash
curl http://localhost:3000/buku/1
```

response:
{
  "success": true,
  "data": {
    "id": 1,
    "judul": "Belajar Node.js",
    "penulis": "Andi",
    "tahun": 2024,
    "stok": 5
  }
}

### 4. POST `/buku`

```bash
curl -X POST http://localhost:3000/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"Belajar Express","penulis":"Fadhlan","tahun":2025,"stok":4}'
```

response:
id judul           penulis tahun stok
-- -----           ------- ----- ----
 4 Belajar Express Fadhlan  2025    4


### 5. PUT `/buku/:id`

```bash
curl -X PUT http://localhost:3000/buku/1 \
  -H "Content-Type: application/json" \
  -d '{"judul":"Belajar Node.js","penulis":"Andi","tahun":2024,"stok":10}'
```

response:
{
    "success":  true,
    "message":  "Buku berhasil diperbarui",
    "data":  {
                 "id":  1,
                 "judul":  "Belajar Node.js",
                 "penulis":  "Andi",
                 "tahun":  2024,
                 "stok":  10
             }
}

### 6. DELETE `/buku/:id`

```bash
curl.exe -i -X DELETE http://localhost:3000/buku/1
```

response:
HTTP/1.1 204 No Content


### 7. GET buku yang tidak ditemukan

```bash
curl -i http://localhost:3000/buku/999
```

response:
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 50
ETag: W/"32-2kLOF8Jziq6AV3cHCrWWwt8Je2c"
Date: Wed, 04 Nov 2026 13:36:28 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Buku tidak ditemukan"}

### 8. POST dengan data tidak valid

```bash
curl.exe -i -X POST http://localhost:3000/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"","penulis":"Andi","tahun":2024,"stok":5}'
```

response:
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 221
ETag: W/"dd-Z3s28BcIU88MiqwZFRBeZd9u7N0"
Date: Thu, 05 Nov 2026 10:21:45 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Data buku tidak valid","errors":["judul wajib diisi dan berupa string","penulis wajib diisi dan berupa string","tahun wajib berupa bilangan bulat >= 0","stok wajib berupa bilangan bulat >= 0"]}

## Hasil Pengujian

Pengujian dapat dilakukan menggunakan Postman atau `curl`.

[2026-11-04T13:26:12.997Z] GET /buku 200 - 152ms
[2026-11-04T13:27:05.866Z] GET /buku?penulis=Andi 200 - 3ms
[2026-11-04T13:27:51.692Z] GET /buku/1 200 - 5ms
[2026-11-04T13:30:39.164Z] POST /buku 201 - 1ms
[2026-11-04T13:31:45.742Z] GET /buku 200 - 1ms
[2026-11-04T13:32:35.350Z] POST /buku 201 - 3ms
[2026-11-04T13:34:39.392Z] PUT /buku/1 200 - 4ms
[2026-11-04T13:35:37.507Z] DELETE /buku/1 204 - 5ms
[2026-11-04T13:36:28.399Z] GET /buku/999 404 - 0ms
[2026-11-05T10:21:45.108Z] POST /buku 400 - 1ms (POST dengan data tidak valid)