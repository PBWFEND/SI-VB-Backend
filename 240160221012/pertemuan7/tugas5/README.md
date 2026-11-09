# Tugas 5 — CRUD REST API dengan Pola Service/Controller

Nama    : Fadhlan Mahdan Ghani
NPM     : 240160221012

REST API resource Buku memakai Express + Prisma + TypeScript, dipecah menjadi lapisan `routes → controller → service → Prisma`.

## Alur Lapisan

```text
Client (curl/Postman)
        │ HTTP Request
        ▼
src/app.ts
  ├─ express.json()      parse body
  ├─ loggerMiddleware    log request
  └─ app.use('/buku', bukuRouter)
        │
        ▼
src/routes/buku.route.ts
  GET    /buku           → controller.list
  GET    /buku/:id       → controller.detail
  POST   /buku           → controller.create
  PUT    /buku/:id       → controller.update
  PATCH  /buku/:id       → controller.patch
  DELETE /buku/:id       → controller.remove
        │
        ▼
src/controller/buku.controller.ts
  1. ambil req.params / req.query / req.body
  2. panggil validator (validateId / validateCreate / validatePatch)
     └─ gagal → throw BadRequestError (400)
  3. panggil bukuService.<method>
  4. kirim res.status(...).json(...)
        │
        ▼
src/service/buku.service.ts
  business logic + Prisma Client
  ├─ findById: jika tidak ada → throw NotFoundError (404)
  └─ return data ke controller
        │
        ▼
src/config/prisma.ts → SQLite (prisma/dev.db)
```

**Middleware akhir (di `src/app.ts`)**

- **404 handler** → request yang tidak cocok route apa pun.
- **Error handler** → menangkap `BadRequestError` (400), `NotFoundError` (404), fallback 500.

## Cara Menjalankan

npm install express @prisma/client dotenv
npm install -D typescript tsx prisma @types/express @types/node
npx prisma init --datasource-provider sqlite
npx prisma migrate dev --name init
npx prisma generate    
cp .env.example .env
node prisma/seed.js

npm run dev             

Server: `http://localhost:3000`.

## Tabel Kontrak Endpoint

| No | Operasi        | Method   | Endpoint    | Body     | Sukses |    Gagal |
|---:|:---------------|:---------|:------------|:---------|-------:|---------:|
|  1 | Collection     | `GET`    | `/buku`     | -        |    200 |      400 |
|  2 | Detail         | `GET`    | `/buku/:id` | -        |    200 |  400, 404 |
|  3 | Create         | `POST`   | `/buku`     | lengkap  |    201 |      400 |
|  4 | Update         | `PUT`    | `/buku/:id` | lengkap  |    200 |  400, 404 |
|  5 | Partial update | `PATCH`  | `/buku/:id` | sebagian |    200 |  400, 404 |
|  6 | Delete         | `DELETE` | `/buku/:id` | -        |    204 |  400, 404 |


## Contoh `curl` Tiap Endpoint

### 1. GET `/buku` — collection

```bash
curl http://localhost:3000/buku
```
response:
```json
StatusCode        : 200
StatusDescription : OK
Content           : {"success":true,"total":2,"data":[{"id":3,"judul":"Belajar Node.js",
                    "penulis":"Andi","tahun":2024,"stok":5},{"id":4,"judul":"Pemrograman
                     Web","penulis":"Budi","tahun":2023,"stok":3}]}
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Content-Length: 183
                    Content-Type: application/json; charset=utf-8
                    Date: Fri, 06 Nov 2026 12:23:43 GMT
                    ETag: W/"b7-OZJTDsyrWA8Jyyzx5in...
Forms             : {}
Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5], 
                    [Content-Length, 183], [Content-Type, application/json; 
                    charset=utf-8]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 183
```

### 2. GET dengan filter (dua query parameter)

```bash
curl "http://localhost:3000/buku?penulis=Andi&tahun=2024"
```

```json
StatusCode        : 200
StatusDescription : OK
Content           : {"success":true,"total":1,"data":[{"id":3,"judul":"Belajar 
                    Node.js","penulis":"Andi","tahun":2024,"stok":5}]}
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Content-Length: 109
                    Content-Type: application/json; charset=utf-8
                    Date: Fri, 06 Nov 2026 12:25:03 GMT
                    ETag: W/"6d-aFoQZhWRGQFOkiYMPPv...
Forms             : {}
Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5], 
                    [Content-Length, 109], [Content-Type, application/json; 
                    charset=utf-8]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 109
```

### 3. GET `/buku/:id` — detail

```bash
curl http://localhost:3000/buku/4
```

`200 OK`:

```json
{"success":true,"data":{"id":4,"judul":"Pemrograman Web","penulis":"Budi","tahun":2023,"stok":3}}
```

### 4. POST `/buku` — create

```bash
curl -X POST http://localhost:3000/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"Belajar Prisma","penulis":"Fadhlan Mahdan Ghani","tahun":2025,"stok":2}'
```

`201 Created`:

```json
{
    "success":  true,
    "message":  "Buku berhasil ditambahkan",
    "data":  {
                 "id":  5,
                 "judul":  "Belajar Prisma",
                 "penulis":  "Fadhlan Mahdan Ghani",
                 "tahun":  2025,
                 "stok":  2
             }
}
```

### 5. PUT `/buku/:id` — update penuh

```bash
curl -X PUT http://localhost:3000/buku/3 \
  -H "Content-Type: application/json" \
  -d '{"judul":"Belajar Node.js","penulis":"Andi","tahun":2024,"stok":10}'
```
```json
{
    "success":  true,
    "message":  "Buku berhasil diperbarui",
    "data":  {
                 "id":  3,
                 "judul":  "Belajar Node.js",
                 "penulis":  "Andi",
                 "tahun":  2024,
                 "stok":  10
             }
}
```


### 6. PATCH `/buku/:id` — partial update

```bash
curl -X PATCH http://localhost:3000/buku/3 \
  -H "Content-Type: application/json" \
  -d '{"stok":20}'
```

```json
{
    "success":  true,
    "message":  "Buku berhasil diperbarui sebagian",
    "data":  {
                 "id":  3,
                 "judul":  "Belajar Node.js",
                 "penulis":  "Andi",
                 "tahun":  2024,
                 "stok":  20
             }
}
```



### 7. DELETE `/buku/:id`

```bash
curl -i -X DELETE http://localhost:3000/buku/3
```

`204 No Content` 

```bash
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Fri, 06 Nov 2026 12:31:36 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### 8. Error 400 — validasi create

```bash
curl.exe -i -X POST http://localhost:3000/buku -H "Content-Type: application/json" --data-raw '{"judul":"","penulis":"Andi","tahun":-1,"stok":"lima"}'
```

```json
HTTP/1.1 400 Bad Request

```

### 9. Error 400 — field di luar whitelist

```bash
curl.exe -i -X POST http://localhost:3000/buku -H "Content-Type: application/json" --data-raw '{"judul":"X","penulis":"Y","tahun":2024,"stok":1,"isbn":"123"}'
```

```json
HTTP/1.1 400 Bad Request

```

### 10. Error 400 — ID tidak valid

```bash
curl -i http://localhost:3000/buku/abc
```

```json
HTTP/1.1 400 Bad Request
```

### 11. Error 404 — resource tidak ditemukan

```bash
curl -i http://localhost:3000/buku/999
```

```json
HTTP/1.1 404 Not Found
```

### 12. Error 404 — endpoint tidak dikenal (middleware 404)

```bash
curl -i http://localhost:3000/tidak-ada
```

```json
HTTP/1.1 404 Not Found
```

## Status Code

| Status | Penggunaan                              |
| -----: | :-------------------------------------- |
|    200 | GET collection, GET detail, PUT, PATCH  |
|    201 | POST create                             |
|    204 | DELETE                                  |
|    400 | Validasi input / ID / query tidak valid |
|    404 | Resource / endpoint tidak ditemukan     |
|    500 | Kesalahan internal                      |

## Hasil Pengujian

[2026-11-06T12:23:43.598Z] GET /buku 200 - 252ms
[2026-11-06T12:25:03.381Z] GET /buku?penulis=Andi&tahun=2024 200 - 17ms
[2026-11-06T12:25:38.479Z] GET /buku/1 404 - 23ms
[2026-11-06T12:25:46.430Z] GET /buku/1 404 - 3ms
[2026-11-06T12:26:30.067Z] GET /buku/4 200 - 3ms
[2026-11-06T12:27:44.000Z] POST /buku 201 - 339ms
[2026-11-06T12:28:33.994Z] PUT /buku/3 200 - 24ms
[2026-11-06T12:29:43.499Z] PATCH /buku/3 200 - 77ms
[2026-11-06T12:31:36.415Z] DELETE /buku/3 204 - 18ms
[2026-11-06T12:40:32.186Z] GET /buku/abc 400 - 26ms
[2026-11-06T12:41:57.417Z] GET /buku/999 404 - 92ms
[2026-11-06T12:42:27.050Z] GET /tidak-ada 404 - 6ms
