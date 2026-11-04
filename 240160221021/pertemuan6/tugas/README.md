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

## Format response

Sukses: `{"success":true,"message":"...","data":...}`
Error: `{"success":false,"message":"...","details":[...]}`

## Endpoint

| Method | Path | Keterangan | Status |
|--------|------|-----------|--------|
| GET | /buku | Daftar buku dan total, filter opsional `?stokMin=1` | 200, 400 |
| GET | /buku/:id | Detail satu buku | 200, 400, 404 |
| POST | /buku | Tambah buku (dengan validasi) | 201, 400 |
| PATCH | /buku/:id | Ubah sebagian field | 200, 400, 404 |
| DELETE | /buku/:id | Hapus buku | 204, 400, 404 |

JSON yang rusak dijawab 400, route yang tidak ada dijawab 404, dan error tak terduga dijawab 500 tanpa detail internal.

## Contoh request

```powershell
curl.exe -i http://localhost:3008/buku
curl.exe -i http://localhost:3008/buku/2
curl.exe -i -X POST http://localhost:3008/buku -H "Content-Type: application/json" --data "@body.json"
curl.exe -i -X PATCH http://localhost:3008/buku/2 -H "Content-Type: application/json" -d '{\"stok\":8}'
curl.exe -i -X DELETE http://localhost:3008/buku/2
```

Isi body.json:
{"judul":"Database untuk Pemula","penulis":"Budi","tahun":2025,"stok":10}

Di PowerShell, body JSON yang mengandung spasi dikirim lewat file (`--data "@body.json"`), karena argumen akan terpecah di spasi.

## Hasil pengujian

### GET /buku
Status: 200 OK
Response: {"success":true,"message":"Daftar buku berhasil diambil","data":{"total":1,"data":[{"id":2,"judul":"Database untuk Pemula","penulis":"Budi","tahun":2025,"stok":10}]}}

### GET /buku/2
Status: 200 OK
Response: {"success":true,"message":"Detail buku berhasil diambil","data":{"id":2,"judul":"Database untuk Pemula","penulis":"Budi","tahun":2025,"stok":10}}

### GET /buku/99 (tidak ditemukan)
Status: 404 Not Found
Response: {"success":false,"message":"Buku tidak ditemukan"}

### GET /buku/abc (id tidak valid)
Status: 400 Bad Request
Response: {"success":false,"message":"id tidak valid","details":["id harus bilangan bulat positif"]}

### POST /buku (valid)
Status: 201 Created
Response: {"success":true,"message":"Buku berhasil ditambahkan","data":{"id":3,"judul":"Database untuk Pemula","penulis":"Budi","tahun":2025,"stok":10}}

### POST /buku (tidak valid)
Body: {"judul":""}
Status: 400 Bad Request
Response: {"success":false,"message":"Data buku tidak valid","details":["judul wajib berupa teks","penulis wajib berupa teks","tahun wajib berupa angka bulat"]}

### PATCH /buku/2
Body: {"stok":8}
Status: 200 OK
Response: {"success":true,"message":"Buku berhasil diperbarui","data":{"id":2,"judul":"Database untuk Pemula","penulis":"Budi","tahun":2025,"stok":8}}
Hanya stok yang berubah, field lain tetap.

### POST /buku (JSON rusak)
Body: {"judul":
Status: 400 Bad Request
Response: {"success":false,"message":"JSON tidak valid"}

### DELETE /buku/2
Status: 204 No Content (tanpa body)

### GET /buku/2 setelah dihapus
Status: 404 Not Found
Response: {"success":false,"message":"Buku tidak ditemukan"}

### Data tetap ada setelah server dimatikan dan dinyalakan ulang
Proses server lama dimatikan dengan Stop-Process, lalu server dinyalakan ulang dengan npm start.
GET /buku setelah itu tetap menampilkan buku dengan id 2 yang dibuat sebelum server dimatikan.
Berarti data tersimpan di database SQLite, bukan di memory proses.