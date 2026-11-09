# Pertemuan 05 — Latihan Desain RESTful API

Nama    : Fadhlan Mahdan Ghani 
NPM     : 240160221012

Latihan membuat REST API sederhana untuk resource **mahasiswa** menggunakan
Express.js. Data disimpan in-memory (array) agar fokus pada desain endpoint,
status code, dan format response JSON.

## Prasyarat

- Node.js 18+ (mendukung ES Module)
- `package.json` harus memiliki `"type": "module"`

```json
{
  "type": "module",
  "dependencies": {
    "express": "^4.19.2"
  }
}

```

## Cara Menjalankan

1. Install dependency:

```bash
npm install express
```

2. Jalankan server:

```bash
node latihan.js
```

3. Server berjalan di:

```text
Latihan REST API berjalan di http://localhost:3007
```

## Daftar Endpoint
| Method | Endpoint          | Deskripsi                          | Status Code  |
| :----- | :---------------- | :--------------------------------- | :----------- |
| GET    | `/mahasiswa`      | List semua mahasiswa + filter      | 200, 400     |
| GET    | `/mahasiswa/:nim` | Detail mahasiswa berdasarkan NIM   | 200, 404     |
| POST   | `/mahasiswa`      | Tambah mahasiswa baru              | 201, 400     |
| PATCH  | `/mahasiswa/:nim` | Ubah sebagian data mahasiswa       | 200, 400, 404 |
| DELETE | `/mahasiswa/:nim` | Hapus mahasiswa                    | 204, 404     |

## Contoh Pengujian (curl)

# 1) 200 OK — List mahasiswa 
perintah :
curl.exe -i http://localhost:3007/mahasiswa

response: 
HTTP/1.1 200 OK
Content-Type:    application/json; charset=utf-8
Content-Length:  234
ETag:            W/"ea-z4Mqwhfx4x5S22iEm++ikG4qTlc"
Date:            Thu, 05 Nov 2026 08:48:09 GMT
Connection:      keep-alive
Keep-Alive:      timeout=5

{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": [
    {
      "nim": "F1D022001",
      "nama": "Jhon Doe",
      "prodi": "Sistem Informasi",
      "angkatan": 2024
    },
    {
      "nim": "F1D022002",
      "nama": "Ani Lestari",
      "prodi": "Sistem Informasi",
      "angkatan": 2023
    }
  ]
}

# 2) 200 OK — Detail mahasiswa
perintah :
curl.exe -i "http://localhost:3007/mahasiswa/F1D022001"

response: 
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 150
ETag: W/"96-yue3wIOa55z/oYoe70SRNZMBgLc"
Date: Thu, 05 Nov 2026 08:50:20 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "success": true,
  "message": "Detail mahasiswa berhasil diambil",
  "data": {
    "nim": "F1D022001",
    "nama": "Jhon Doe",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }
}
# 3) 201 Created — Tambah mahasiswa
perintah :
curl.exe -i -X POST http://localhost:3007/mahasiswa \
  -H "Content-Type: application/json" \
  -d '{"nim":"240160221012","nama":"Fadhlan Mahdan Ghani","prodi":"Sistem Informasi","angkatan":2024}'

response: 
{
    "success":  true,
    "message":  "Mahasiswa berhasil ditambahkan",
    "data":  {
                 "angkatan":  2024,
                 "prodi":  "Sistem Informasi",
                 "nim":  "240160221012",
                 "nama":  "Fadhlan Mahdan Ghani"
             }
}
# 4) 400 Bad Request — Validasi POST gagal
perintah : 
curl.exe --% -i -X POST http://localhost:3007/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"\",\"nama\":\"\",\"prodi\":\"\",\"angkatan\":\"dua ribu\"}"

response: 
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
Content-Length: 91
ETag: W/"5b-3wiPUjxenB2BouxKL4oAlBEWveg"
Date: Thu, 05 Nov 2026 09:12:45 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Data mahasiswa tidak valid","details":["angkatan tidak valid"]}
# 5) 400 Bad Request — Filter angkatan bukan angka
perintah :
curl.exe -i "http://localhost:3007/mahasiswa?angkatan=abc"
response: 
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
Content-Length: 70
ETag: W/"46-AAOcrQH3sRzPpXDBDM9zeUazXnE"
Date: Thu, 05 Nov 2026 09:18:15 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Parameter query tidak valid","details":["Query angkatan harus bilangan bulat >= 1900"]}

# 6) 200 OK — PATCH sebagian data
perintah :
curl.exe -i -X PATCH http://localhost:3007/mahasiswa/F1D022002 \
  -H "Content-Type: application/json" \
  -d '{"prodi":"Sistem Informasi","angkatan":2022}'

response: 
{
    "success":  true,
    "message":  "Mahasiswa berhasil diperbarui",
    "data":  {
                 "nim":  "F1D022002",
                 "nama":  "Ani Lestari",
                 "prodi":  "Sistem Informasi",
                 "angkatan":  2022
             }
}
# 7) 400 Bad Request — PATCH tanpa body
perintah :
curl.exe --% -i -X PATCH http://localhost:3007/mahasiswa/F1D022002 -H "Content-Type: application/json" -d "{\"angkatan\":\"dua ribu\"}"

response: 
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
Content-Length: 91
ETag: W/"5b-v7JDKlnnZ7CkGc6PaetdiZckAPs"
Date: Thu, 05 Nov 2026 09:26:30 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Data perubahan tidak valid","details":["angkatan tidak valid"]}
# 8) 404 Not Found — NIM tidak ada
perintah :
curl -i "http://localhost:3007/mahasiswa/F1D022999"

response: 
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Content-Length: 55
ETag: W/"37-hh1nByxSF+Si9hn2Iqhiywxemwg"
Date: Thu, 05 Nov 2026 09:27:24 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Mahasiswa tidak ditemukan"}

# 9) 204 No Content — Hapus mahasiswa
perintah :
curl.exe -i -X DELETE http://localhost:3007/mahasiswa/F1D022002

response: 
HTTP/1.1 204 No Content
Date: Thu, 05 Nov 2026 09:28:34 GMT
Connection: keep-alive
Keep-Alive: timeout=5

# 10) 404 Not Found — Endpoint tidak dikenal
perintah :
curl.exe -i "http://localhost:3007/dosen"

response: 
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Content-Length: 54
ETag: W/"36-ymy1jdwwQ6L4F9uLdbLAmFQ0VHA"
Date: Thu, 05 Nov 2026 09:29:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Endpoint tidak ditemukan"}

## Hasil Pengujian

Pengujian dapat dilakukan menggunakan Postman atau `curl`.

[2026-11-05T09:14:17.599Z] GET /mahasiswa
[2026-11-05T09:14:33.427Z] GET /mahasiswa/F1D022001
[2026-11-05T09:15:53.076Z] POST /mahasiswa
[2026-11-05T09:16:43.965Z] POST /mahasiswa
[2026-11-05T09:17:21.643Z] GET /mahasiswa?angkatan=abc
[2026-11-05T09:18:15.494Z] GET /mahasiswa?angkatan=abc
[2026-11-05T09:19:29.094Z] PATCH /mahasiswa/F1D022002
Kesalahan aplikasi: Cannot read properties of undefined (reading 'nim')
[2026-11-05T09:20:33.453Z] PATCH /mahasiswa/F1D022002
[2026-11-05T09:21:13.929Z] PATCH /mahasiswa/F1D022002
Kesalahan aplikasi: Cannot read properties of undefined (reading 'nim')
[2026-11-05T09:24:05.802Z] PATCH /mahasiswa/F1D022002
Kesalahan aplikasi: Cannot read properties of undefined (reading 'nim')
[2026-11-05T09:25:03.122Z] PATCH /mahasiswa/F1D022002
[2026-11-05T09:25:24.700Z] PATCH /mahasiswa/F1D022002
[2026-11-05T09:26:12.633Z] PATCH /mahasiswa/F1D022002
[2026-11-05T09:26:30.422Z] PATCH /mahasiswa/F1D022002
[2026-11-05T09:27:24.960Z] GET /mahasiswa/F1D022999
[2026-11-05T09:28:34.681Z] DELETE /mahasiswa/F1D022002
[2026-11-05T09:29:06.998Z] GET /dosen
