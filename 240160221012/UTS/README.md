# Mini Project UTS — REST API Buku (TypeScript + Prisma + Layered)

Nama    : Fadhlan Mahdan Ghani
NPM     : 240160221012
Kelas   : SI VB

Backend REST API untuk resource Buku (domain Perpustakaan) dibangun dengan Express.js, Prisma ORM, SQLite, dan TypeScript. Mengikuti kriteria Mini Project UTS: CRUD lengkap, pola berlapis, validasi, status code tepat, dan data persisten.


## Struktur Lapisan

```text
mini-project/
├── app.ts                  
├── server.ts               
├── client.ts               
├── prisma.config.ts        
├── prisma/
│   ├── schema.prisma       
│   ├── seed.ts             
│   └── migrations/         
├── src/
│   ├── routes/buku.routes.ts         
│   ├── controller/buku.controller.ts 
│   └── service/buku.service.ts       
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```


## Cara Menjalankan

```bash
npm init -y
npm install express @prisma/client dotenv
npm install -D typescript tsx @types/node @types/express prisma
npx prisma init --datasource-provider sqlite
cp .env.example .env
npx prisma migrate dev --name init
npx prisma generate
npm run seed          
npm start
```

Server: API berjalan di `http://localhost:3008`.


## Daftar Endpoint

| No | Operasi    | Method   | Endpoint    | Body     | Sukses |    Gagal |
|---:|:-----------|:---------|:------------|:---------|-------:|---------:|
|  0 | Health     | `GET`    | `/health`   | -        |    200 |        - |
|  1 | Collection | `GET`    | `/buku`     | -        |    200 |      400 |
|  2 | Detail     | `GET`    | `/buku/:id` | -        |    200 |  400, 404 |
|  3 | Create     | `POST`   | `/buku`     | lengkap  |    201 |      400 |
|  4 | Update     | `PATCH`  | `/buku/:id` | sebagian |    200 |  400, 404 |
|  5 | Delete     | `DELETE` | `/buku/:id` | -        |    204 |  400, 404 |

**Query parameter `GET /buku`:** `?q=`, `?penulis=`, `?tahun=`.

## Contoh Curl 

# 1 Health check
curl.exe -i http://localhost:3008/health

```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 69
ETag: W/"45-mcXExrdXw8ACGP+nn4gdYziEXSQ"
Date: Sat, 07 Nov 2026 14:09:05 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":true,"status":"ok","timestamp":"2026-11-07T14:09:05.371Z"}
```

# 2 List semua buku
curl.exe -i http://localhost:3008/buku

```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 493
ETag: W/"1ed-zUlPizZS08WoG1ZDSr5lTQ+leiw"
Date: Sat, 07 Nov 2026 14:09:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "success": true,
  "total": 3,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "penulis": "Andi",
      "tahun": 2024,
      "stok": 5,
      "createdAt": "2026-11-07T14:06:52.805Z",
      "updatedAt": "2026-11-07T14:06:52.805Z"
    },
    {
      "id": 2,
      "judul": "Pemrograman Web",
      "penulis": "Budi",
      "tahun": 2023,
      "stok": 3,
      "createdAt": "2026-11-07T14:06:52.805Z",
      "updatedAt": "2026-11-07T14:06:52.805Z"
    },
    {
      "id": 3,
      "judul": "Prisma ORM Dasar",
      "penulis": "Citra",
      "tahun": 2025,
      "stok": 4,
      "createdAt": "2026-11-07T14:06:52.805Z",
      "updatedAt": "2026-11-07T14:06:52.805Z"
    }
  ]
}
```

# 3 List dengan filter
curl.exe -i "http://localhost:3008/buku?q=node"

```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 187
ETag: W/"bb-Lpu+7DAKTbGg4jdtBjrbmM/lwU0"
Date: Sat, 07 Nov 2026 14:10:26 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "penulis": "Andi",
      "tahun": 2024,
      "stok": 5,
      "createdAt": "2026-11-07T14:06:52.805Z",
      "updatedAt": "2026-11-07T14:06:52.805Z"
    }
  ]
}
```

# 4 List dengan dua filter sekaligus
curl.exe -i "http://localhost:3008/buku?penulis=Andi&tahun=2024"

```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 187
ETag: W/"bb-Lpu+7DAKTbGg4jdtBjrbmM/lwU0"
Date: Sat, 07 Nov 2026 14:11:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "penulis": "Andi",
      "tahun": 2024,
      "stok": 5,
      "createdAt": "2026-11-07T14:06:52.805Z",
      "updatedAt": "2026-11-07T14:06:52.805Z"
    }
  ]
}
```

# 5 Detail buku ada
curl.exe -i http://localhost:3008/buku/1

```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 175
ETag: W/"af-BBibi5uDTSGrgJtUZqMBoiiZqRo"
Date: Sat, 07 Nov 2026 14:12:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "success": true,
  "data": {
    "id": 1,
    "judul": "Belajar Node.js",
    "penulis": "Andi",
    "tahun": 2024,
    "stok": 5,
    "createdAt": "2026-11-07T14:06:52.805Z",
    "updatedAt": "2026-11-07T14:06:52.805Z"
  }
}
```

# 6 Create buku valid
curl.exe -i -X POST http://localhost:3008/buku `
  -H "Content-Type: application/json" `
  -d "{\"judul\":\"Belajar Express\",\"penulis\":\"Dewi\",\"tahun\":2025,\"stok\":2}"

```json
{
    "success":  true,
    "message":  "Buku berhasil ditambahkan",
    "data":  {
                 "id":  4,
                 "judul":  "Belajar Express",
                 "penulis":  "Fadhlan Mahdan Ghani",
                 "tahun":  2025,
                 "stok":  2,
                 "createdAt":  "2026-11-07T14:14:08.981Z",
                 "updatedAt":  "2026-11-07T14:14:08.981Z"
             }
}
```

# 7 Create tanpa stok 
curl.exe -i -X POST http://localhost:3008/buku `
  -H "Content-Type: application/json" `
  -d "{\"judul\":\"Buku Tanpa Stok\",\"penulis\":\"Eko\",\"tahun\":2024}"

```json
{
  "success": true,
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": 5,
    "judul": "Buku Tanpa Stok",
    "penulis": "Eko",
    "tahun": 2024,
    "stok": 0,
    "createdAt": "2026-11-07T14:16:17.686Z",
    "updatedAt": "2026-11-07T14:16:17.686Z"
  }
}
```

# 8 Patch stok
curl.exe -i -X PATCH http://localhost:3008/buku/1 `
  -H "Content-Type: application/json" `
  -d "{\"stok\":20}"

```json
{
    "success":  true,
    "message":  "Buku berhasil diperbarui",
    "data":  {
                 "id":  1,
                 "judul":  "Belajar Node.js",
                 "penulis":  "Andi",
                 "tahun":  2024,
                 "stok":  20,
                 "createdAt":  "2026-11-07T14:06:52.805Z",
                 "updatedAt":  "2026-11-07T14:24:24.361Z"
             }
}
```

# 9 Delete buku
curl.exe -i -X DELETE http://localhost:3008/buku/2

```json
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Sat, 07 Nov 2026 14:26:53 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

# 10 Error 404 — resource tidak ditemukan
curl.exe -i http://localhost:3008/buku/999
```json
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 50
ETag: W/"32-2kLOF8Jziq6AV3cHCrWWwt8Je2c"
Date: Sat, 07 Nov 2026 14:27:13 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Buku tidak ditemukan"}
```
## Status Code
| Status | Kapan                               |
| -----: | :---------------------------------- |
|    200 | GET, PATCH berhasil                 |
|    201 | POST berhasil                       |
|    204 | DELETE berhasil (tanpa body)        |
|    400 | Validasi body/ID/query gagal        |
|    404 | Resource / endpoint tidak ditemukan |
|    500 | Error internal                      |

## Uji Persistensi

```bash
# 1. Tambah data
curl -X POST http://localhost:3008/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"Persisten","penulis":"Test","tahun":2025,"stok":1}'

hasil :
```json
{
    "success":  true,
    "message":  "Buku berhasil ditambahkan",
    "data":  {
                 "id":  6,
                 "judul":  "Persisten",
                 "penulis":  "Test",
                 "tahun":  2025,
                 "stok":  1,
                 "createdAt":  "2026-11-07T14:28:32.581Z",
                 "updatedAt":  "2026-11-07T14:28:32.581Z"
             }
}
```

# 2. Hentikan server (Ctrl+C), jalankan lagi:
npm start

# 3. Ambil lagi — data masih ada:
curl http://localhost:3008/buku

```json
{
  "success": true,
  "total": 5,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "penulis": "Andi",
      "tahun": 2024,
      "stok": 20,
      "createdAt": "2026-11-07T14:06:52.805Z",
      "updatedAt": "2026-11-07T14:24:24.361Z"
    },
    {
      "id": 3,
      "judul": "Prisma ORM Dasar",
      "penulis": "Citra",
      "tahun": 2025,
      "stok": 4,
      "createdAt": "2026-11-07T14:06:52.805Z",
      "updatedAt": "2026-11-07T14:06:52.805Z"
    },
    {
      "id": 4,
      "judul": "Belajar Express",
      "penulis": "Fadhlan Mahdan Ghani",
      "tahun": 2025,
      "stok": 2,
      "createdAt": "2026-11-07T14:14:08.981Z",
      "updatedAt": "2026-11-07T14:14:08.981Z"
    },
    {
      "id": 5,
      "judul": "Buku Tanpa Stok",
      "penulis": "Eko",
      "tahun": 2024,
      "stok": 0,
      "createdAt": "2026-11-07T14:16:17.686Z",
      "updatedAt": "2026-11-07T14:16:17.686Z"
    },
    {
      "id": 6,
      "judul": "Persisten",
      "penulis": "Test",
      "tahun": 2025,
      "stok": 1,
      "createdAt": "2026-11-07T14:28:32.581Z",
      "updatedAt": "2026-11-07T14:28:32.581Z"
    }
  ]
}
```
## Hasil Pengujian
[2026-11-07T14:09:05.401Z] GET /health 200 - 31ms
[2026-11-07T14:09:32.217Z] GET /buku 200 - 246ms
[2026-11-07T14:10:26.360Z] GET /buku?q=node 200 - 14ms
[2026-11-07T14:11:23.038Z] GET /buku?penulis=Andi&tahun=2024 200 - 26ms
[2026-11-07T14:12:23.553Z] GET /buku/1 200 - 22ms
[2026-11-07T14:14:09.000Z] POST /buku 201 - 33ms
[2026-11-07T14:16:17.687Z] POST /buku 201 - 16ms
[2026-11-07T14:24:24.687Z] PATCH /buku/1 200 - 601ms
[2026-11-07T14:26:53.933Z] DELETE /buku/2 204 - 873ms
[2026-11-07T14:27:13.676Z] GET /buku/999 404 - 44ms
[2026-11-07T14:28:32.610Z] POST /buku 201 - 35ms

``` Hasil Uji Persistensi ```
API berjalan di http://localhost:3008
[2026-11-07T14:30:51.876Z] GET /buku 200 - 120ms
[2026-11-07T14:31:01.324Z] GET /buku 200 - 9ms