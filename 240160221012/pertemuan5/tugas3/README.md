# Tugas 3 — RESTful API Express.js: Resource Buku

Nama    : Fadhlan Mahdan Ghani
NPM     : 240160221012

RESTful API untuk resource Buku pada Sistem Informasi Perpustakaan. Data disimpan di memori (array), sehingga data kembali ke kondisi awal saat server di-restart.


## Cara Menjalankan

1. Install dependency:

```bash
npm install
```

2. Jalankan server:

```bash
npm start
```
atau

Mode development (nodemon):

```bash
npm run dev
```


3. Server berjalan di `http://localhost:3000`.

---

## Tabel Kontrak Endpoint

|   No | Operasi        | Method   | Endpoint    | Request Body   | Query                   | Sukses |    Gagal |
| ---: | :------------- | :------- | :---------- | :------------- | :---------------------- | -----: | -------: |
|    1 | Collection     | `GET`    | `/buku`     | -              | `q`, `penulis`, `tahun` |    200 |      400 |
|    2 | Detail         | `GET`    | `/buku/:id` | -              | -                       |    200 |  400, 404 |
|    3 | Create         | `POST`   | `/buku`     | lengkap        | -                       |    201 |      400 |
|    4 | Update (full)  | `PUT`    | `/buku/:id` | lengkap        | -                       |    200 |  400, 404 |
|    5 | Partial update | `PATCH`  | `/buku/:id` | sebagian field | -                       |    200 |  400, 404 |
|    6 | Delete         | `DELETE` | `/buku/:id` | -              | -                       |    204 |  400, 404 |

# Query parameter
Query parameter `GET /buku`:

- `?q=<keyword>` — cari di `judul` dan `penulis`
- `?penulis=<nama>` — filter berdasarkan penulis
- `?tahun=<angka>` — filter berdasarkan tahun terbit

Field resource Buku:`id`, `judul`, `penulis`, `tahun`, `stok`.

---


## Contoh Request

### 1. `GET /buku` — collection - 200 OK

```bash
curl.exe http://localhost:3000/buku
```
response :
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

### 2. `GET /buku?penulis=Andi&tahun=2024` dua query parameter - 200 OK

```bash
curl.exe "http://localhost:3000/buku?penulis=Andi&tahun=2024"
```
response :
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

### 3. `GET /buku/:id` detail - 200 OK

```bash
curl.exe http://localhost:3000/buku/1
```
response :
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

### 4. `POST /buku`- 201 create

```bash
curl -X POST http://localhost:3000/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"Belajar Express","penulis":"Citra","tahun":2025,"stok":4}'
```
response :
{
    "success":  true,
    "message":  "Buku berhasil ditambahkan",
    "data":  {
                 "id":  3,
                 "judul":  "Belajar Express",
                 "penulis":  "Citra",
                 "tahun":  2025,
                 "stok":  4
             }
}

### 5. `PUT /buku/:id` update penuh - 200 OK

```bash
curl -X PUT http://localhost:3000/buku/1 \
  -H "Content-Type: application/json" \
  -d '{"judul":"Belajar Node.js","penulis":"Andi","tahun":2024,"stok":10}'
```
response :
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
### 6. `PATCH /buku/:id` partial update - 200 OK

```bash
curl -X PATCH http://localhost:3000/buku/1 \
  -H "Content-Type: application/json" \
  -d '{"stok":20}'
```
response :
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

### 7. `DELETE /buku/:id` - 204 No Content

```bash
curl -i -X DELETE http://localhost:3000/buku/1
```
response :
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Thu, 05 Nov 2026 10:12:01 GMT
Connection: keep-alive
Keep-Alive: timeout=5

### 8. Contoh 400 — validasi POST (400 Bad Request)

```bash
curl.exe -X POST http://localhost:3000/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"","penulis":"Andi","tahun":2024,"stok":-1}'
```
response :
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 99
ETag: W/"63-XXu4e8UIeui8nDonB11c5DYz4bc"
Date: Thu, 05 Nov 2026 10:13:16 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Data buku tidak valid","errors":["judul wajib diisi dan berupa string","stok wajib berupa bilangan bulat >= 0"]}


### 9. Contoh 400 — PATCH tanpa field (400 Bad Request)

```bash
curl -X PATCH http://localhost:3000/buku/1 \
  -H "Content-Type: application/json" \
  -d '{}'
```
response :
{"success":false,"message":"Data perubahan tidak valid","errors":["Body tidak boleh kosong, sertakan minimal satu field"]}

### 10. Contoh 404 — detail tidak ditemukan (404 Not Found)

```bash
curl -i http://localhost:3000/buku/999
```
response :
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 50
ETag: W/"32-2kLOF8Jziq6AV3cHCrWWwt8Je2c"
Date: Thu, 05 Nov 2026 10:19:31 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Buku tidak ditemukan"}


## Daftar HTTP Status Code

| Status                    | Keterangan                        | Digunakan pada                                   |
| :------------------------ | :-------------------------------- | :----------------------------------------------- |
| 200 OK                    | Request berhasil                  | GET collection, GET detail, PUT, PATCH           |
| 201 Created               | Resource baru dibuat              | POST                                             |
| 204 No Content            | Berhasil tanpa body               | DELETE                                           |
| 400 Bad Request           | Input tidak valid (body/ID/query) | POST, PUT, PATCH, GET `:id`, GET `?tahun=`       |
| 404 Not Found             | Resource/endpoint tidak ditemukan | GET/PUT/PATCH/DELETE `:id`, endpoint tak dikenal |

---

## Hasil Pengujian

Pengujian menggunakan `curl` (kompatibel dengan Postman).

[2026-11-05T09:54:15.683Z] GET /buku 200 - 15ms
[2026-11-05T10:04:53.005Z] GET /buku?penulis=Andi&tahun=2024 200 - 41ms
[2026-11-05T10:06:00.832Z] GET /buku/1 200 - 12ms
[2026-11-05T10:09:37.813Z] POST /buku 201 - 2ms
[2026-11-05T10:10:37.832Z] PUT /buku/1 200 - 2ms
[2026-11-05T10:11:31.641Z] PATCH /buku/1 200 - 2ms
[2026-11-05T10:12:01.373Z] DELETE /buku/1 204 - 2ms
[2026-11-05T10:12:29.406Z] POST /buku 400 - 0ms
[2026-11-05T10:14:47.225Z] PATCH /buku/1 404 - 0ms
[2026-11-05T10:15:17.029Z] PATCH /buku/1 404 - 2ms
[2026-11-05T10:16:21.692Z] PATCH /buku/1 404 - 0ms
[2026-11-05T10:18:39.249Z] PATCH /buku/1 400 - 1ms
[2026-11-05T10:18:54.528Z] PATCH /buku/1 400 - 0ms
[2026-11-05T10:19:31.618Z] GET /buku/999 404 - 1ms