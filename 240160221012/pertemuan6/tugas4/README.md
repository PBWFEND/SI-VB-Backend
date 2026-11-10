# Tugas 4 — REST API Buku dengan Express.js + Prisma ORM

Nama    : Fadhlan Mahdan Ghani
NPM     : 240160221012

REST API resource Buku menggunakan Express.js dan Prisma ORM dengan database SQLite. Data tersimpan permanen di file `prisma/dev.db`.


## Langkah Instalasi
1. Inisialisasi project Node.js:
```bash
npm init -y
```
2. Install dependency utama:
```bash
npm install express @prisma/client dotenv
```

3. Install Prisma sebagai development dependency:

```bash
npm install prisma --save-dev
```

4. Inisialisasi Prisma dengan database SQLite
```bash
npx prisma init --datasource-provider sqlite
```

5. Jalankan migrasi database:
```bash
npx prisma migrate dev --name init
```

Jika memakai Prisma v7, lanjutkan dengan:

```bash
npx prisma generate
```

6. Jalankan server

```bash
npm start
```

Server berjalan di `http://localhost:3000`.

---

## Daftar Endpoint

| No | Operasi        | Method | Endpoint    | Body     | Sukses |    Gagal |
|---:|:---------------|:-------|:------------|:---------|-------:|---------:|
|  1 | Collection     | GET    | /buku       | -        |    200 |      400 |
|  2 | Detail         | GET    | /buku/:id   | -        |    200 |  400, 404 |
|  3 | Create         | POST   | /buku       | lengkap  |    201 |      400 |
|  4 | Update         | PUT    | /buku/:id   | lengkap  |    200 |  400, 404 |
|  5 | Partial update | PATCH  | /buku/:id   | sebagian |    200 |  400, 404 |
|  6 | Delete         | DELETE | /buku/:id   | -        |    204 |  400, 404 |

---

## Contoh Request

### 1. GET `/buku`- 200 OK

```bash
curl http://localhost:3000/buku
```
response:
StatusCode        : 200
StatusDescription : OK
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

### 2. GET `/buku?penulis=Andi&tahun=2024` - 200 OK

```bash
curl "http://localhost:3000/buku?penulis=Andi&tahun=2024"
```
response :
StatusCode        : 200
StatusDescription : OK
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

### 3. GET `/buku/1` - 200 OK

```bash
curl http://localhost:3000/buku/2
```
response:
StatusCode        : 200
StatusDescription : OK
Content           : {"success":true,"data":{"id":2,"judul":"Pemrograman 
                    Web","penulis":"Budi","tahun":2023,"stok":3}}

### 4. POST `/buku` - 201 Created

```bash
curl -X POST http://localhost:3000/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"Belajar Prisma","penulis":"Fadhlan Mahdan Ghani","tahun":2025,"stok":2}'
```
response:
{
    "success":  true,
    "message":  "Buku berhasil ditambahkan",
    "data":  {
                 "id":  3,
                 "judul":  "Belajar Prisma",
                 "penulis":  "Fadhlan Mahdan Ghani",
                 "tahun":  2025,
                 "stok":  2
             }
}

### 5. PUT `/buku/1` - 200 OK

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

### 6. PATCH `/buku/1` - 200 OK

```bash
curl -X PATCH http://localhost:3000/buku/1 \
  -H "Content-Type: application/json" \
  -d '{"stok":20}'
```
response:
{
    "success":  true,
    "message":  "Buku berhasil diperbarui sebagian",
    "data":  {
                 "id":  1,
                 "judul":  "Belajar Node.js",
                 "penulis":  "Andi",
                 "tahun":  2024,
                 "stok":  20
             }
}

### 7. DELETE `/buku/1` - 204 No Content

```bash
curl.exe -i -X DELETE http://localhost:3000/buku/1
```
response:
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Fri, 06 Nov 2026 10:23:19 GMT
Connection: keep-alive
Keep-Alive: timeout=5

### 8. Contoh 400 — validasi POST - 400 Bad Request

```bash
curl -X POST http://localhost:3000/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"","penulis":"Andi","tahun":2024,"stok":-1}'
```
response:
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 99
ETag: W/"63-XXu4e8UIeui8nDonB11c5DYz4bc"
Date: Fri, 06 Nov 2026 10:25:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Expected property name or '}' in JSON at position 1 (line 1 column 2)"}

### 9. Contoh 404 — buku tidak ada (404 Not Found)

```bash
curl.exe -i http://localhost:3000/buku/999
```
response:
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 50
ETag: W/"32-2kLOF8Jziq6AV3cHCrWWwt8Je2c"
Date: Fri, 06 Nov 2026 10:27:12 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Buku tidak ditemukan"}

---

## Status Code

| Status | Keterangan            | Penggunaan                              |
| -----: | :-------------------- | :-------------------------------------- |
|    200 | OK                    | GET, PUT, PATCH berhasil                |
|    201 | Created               | POST berhasil                           |
|    204 | No Content            | DELETE berhasil                         |
|    400 | Bad Request           | Validasi gagal / ID / query tidak valid |
|    404 | Not Found             | Resource / endpoint tidak ada           |
|    500 | Internal Server Error | Kesalahan server                        |

---


## Hasil Pengujian
[2026-11-06T10:16:15.267Z] GET /buku 200 - 106ms
[2026-11-06T10:17:48.343Z] GET /buku?penulis=Andi&tahun=2024 200 - 14ms
[2026-11-06T10:18:53.997Z] GET /buku/2 200 - 10ms
[2026-11-06T10:20:43.206Z] POST /buku 201 - 57ms
[2026-11-06T10:21:59.595Z] PUT /buku/1 200 - 26ms
[2026-11-06T10:22:46.474Z] PATCH /buku/1 200 - 19ms
[2026-11-06T10:23:19.016Z] DELETE /buku/1 204 - 18ms
[2026-11-06T10:27:12.474Z] GET /buku/999 404 - 15ms
