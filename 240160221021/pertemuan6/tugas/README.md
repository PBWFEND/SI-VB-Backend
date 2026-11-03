# API Perpustakaan dengan Prisma dan SQLite (Pertemuan 6)

REST API Express.js yang menyimpan data buku secara permanen di SQLite melalui Prisma ORM 7.

## Instalasi

```powershell
npm install
copy .env.example .env
npx prisma@7 migrate dev --name init
npx prisma@7 generate
npm start
```

Server berjalan di http://localhost:3008. Folder `prisma/generated` tidak di-commit, jadi `npx prisma@7 generate` wajib dijalankan setelah clone.

## Endpoint

| Method | Path | Keterangan | Status |
|--------|------|-----------|--------|
| GET | /buku | Daftar buku dan total | 200 |
| GET | /buku/:id | Detail satu buku | 200, 404 |
| POST | /buku | Tambah buku (dengan validasi) | 201, 400 |
| PATCH | /buku/:id | Ubah sebagian field | 200 |
| DELETE | /buku/:id | Hapus buku | 204 |

## Hasil pengujian

Di PowerShell, body JSON yang mengandung spasi dikirim lewat file (`--data "@body.json"`), karena argumen akan terpecah di spasi.

### GET /buku
Status: 200 OK
Response: {"total":1,"data":[{"id":1,"judul":"Database untuk Pemula","penulis":"Budi","tahun":2025,"stok":10}]}

### GET /buku/1
Status: 200 OK
Response: {"id":1,"judul":"Database untuk Pemula","penulis":"Budi","tahun":2025,"stok":10}

### GET /buku/99 (tidak ditemukan)
Status: 404 Not Found
Response: {"error":"Buku tidak ditemukan"}

### POST /buku (valid)
Status: 201 Created
Response: {"id":2,"judul":"Database untuk Pemula","penulis":"Budi","tahun":2025,"stok":10}

### POST /buku (tidak valid)
Body: {"judul":""}
Status: 400 Bad Request
Response: {"errors":["judul wajib berupa teks","penulis wajib berupa teks","tahun wajib berupa angka bulat"]}

### PATCH /buku/1
Body: {"stok":8}
Status: 200 OK
Response: {"id":1,"judul":"Database untuk Pemula","penulis":"Budi","tahun":2025,"stok":8}
Hanya stok yang berubah, field lain tetap.

### DELETE /buku/1
Status: 204 No Content (tanpa body)
GET /buku/1 sesudahnya: 404 Not Found

### Data tetap ada setelah server di-restart
Server dimatikan lalu dijalankan ulang dengan npm start. GET /buku/1 setelah itu tetap
menampilkan stok 8. Berarti data tersimpan di database SQLite, bukan di memory.

## Contoh request

```powershell
curl.exe -i http://localhost:3008/buku
curl.exe -i http://localhost:3008/buku/1
curl.exe -i -X POST http://localhost:3008/buku -H "Content-Type: application/json" --data "@body.json"
curl.exe -i -X PATCH http://localhost:3008/buku/1 -H "Content-Type: application/json" -d '{\"stok\":8}'
curl.exe -i -X DELETE http://localhost:3008/buku/1
```

Isi body.json:
{"judul":"Database untuk Pemula","penulis":"Budi","tahun":2025,"stok":10}