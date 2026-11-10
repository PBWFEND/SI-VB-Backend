# Mini Project Backend — Perpustakaan (UTS & Authentication)

Nama    : Aprilliana Fratiwi
NPM     : 240160221004
Kelas   : SI -VB

Project ini adalah REST API untuk sistem Perpustakaan yang dibangun menggunakan **Node.js, Express.js, Prisma ORM, dan SQLite**. 
Project ini memenuhi tugas **UTS (Pertemuan 8)** untuk CRUD dan relasi database, serta tugas **Pertemuan 9** untuk fitur Authentication (Register & Login) dengan keamanan password.

## Fitur Utama
1. **Authentication**: Registrasi dan Login menggunakan JWT (JSON Web Token) dan `bcrypt` untuk hashing password.
2. **CRUD Buku**: Tambah, baca, ubah, dan hapus data buku beserta validasi input (tahun, stok).
3. **Transaksi Pinjaman**: Peminjaman dan pengembalian buku dengan pembaruan stok otomatis (menggunakan database transaction).
4. **Pola Berlapis**: Memisahkan logika ke dalam `routes`, `controller`, dan `service`.
5. **Middleware**: 404 handler dan Global Error Handler.

## 🚀 Cara Menjalankan Project

### Prasyarat
Pastikan Anda sudah menginstall:
- Node.js (versi 20 atau lebih baru)
- Git

### Langkah-langkah
Buka terminal/CMD di folder project ini, lalu jalankan perintah berikut secara berurutan:

```bash
# 1. Install semua dependency
npm install

# 2. Salin file environment (jika belum ada)
# Windows CMD: copy .env.example .env
# Mac/Linux: cp .env.example .env

# 3. Jalankan migrasi database (membuat file dev.db)
npx prisma migrate dev --name init

# 4. Generate Prisma Client
npx prisma generate

# 5. Isi data awal (Buku & User bawaan)
npm run seed

# 6. Jalankan server
npm start

## Hasil Pengujian
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Tugas(Mini Project)>npm start

> uts-backend-perpustakaan@1.0.0 start
> tsx server.ts

🚀 API berjalan di http://localhost:3008

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Tugas(Mini Project)>curl.exe -i -X POST http://localhost:3008/auth/register -H "Content-Type: application/json" -d "{\"nama\":\"Aprilliana\",\"email\":\"april@example.com\",\"password\":\"rahasia123\"}"
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 97
ETag: W/"61-WEz6EUAFRbeuPUu1QIWgWkm4T/0"
Date: Mon, 02 Nov 2026 17:46:45 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Registrasi berhasil","data":{"id":3,"nama":"Aprilliana","email":"april@example.com"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Tugas(Mini Project)>curl.exe -i -X POST http://localhost:3008/auth/register -H "Content-Type: application/json" -d "{\"nama\":\"Aprilliana\",\"email\":\"april@example.com\",\"password\":\"rahasia123\"}"
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-ZZ1BeYiExynYyeIRP/8+ZFEAbIE"
Date: Mon, 02 Nov 2026 17:47:12 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Email sudah terdaftar"}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Tugas(Mini Project)>curl.exe -i -X POST http://localhost:3008/auth/register -H "Content-Type: application/json" -d "{\"nama\":\"\",\"email\":\"salah-email\",\"password\":\"123\"}"
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 115
ETag: W/"73-o1+4Uv7tW8nwmCIgzsiveC2gDW8"
Date: Mon, 02 Nov 2026 17:47:26 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Validasi gagal","errors":["Nama wajib diisi","Format email tidak valid","Password minimal 6 karakter"]}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Tugas(Mini Project)>curl.exe -i -X POST http://localhost:3008/auth/login -H "Content-Type: application/json" -d "{\"email\":\"april@example.com\",\"password\":\"rahasia123\"}"
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 287
ETag: W/"11f-rR+OxAreox93/09kguEvMmncZVU"
Date: Mon, 02 Nov 2026 17:47:42 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Login berhasil","data":{"user":{"id":3,"nama":"Aprilliana","email":"april@example.com"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhcHJpbEBleGFtcGxlLmNvbSIsImlhdCI6MTc5MzY0MTY2MiwiZXhwIjoxNzkzNzI4MDYyfQ.io_cCmOfWS5pr5LzakFjdTNLjz-BZ4CWDje9ggETRPU"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Tugas(Mini Project)>curl.exe -i -X POST http://localhost:3008/auth/login -H "Content-Type: application/json" -d "{\"email\":\"april@example.com\",\"password\":\"salah\"}"
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 39
ETag: W/"27-i9a5iGHyogpceucFklkp3/IlM2E"
Date: Mon, 02 Nov 2026 17:47:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Email atau password salah"}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Tugas(Mini Project)>curl.exe -i http://localhost:3008/buku
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 500
ETag: W/"1f4-WDZLGl/+FkuEMBtO/6Cd4xf+qqo"
Date: Mon, 02 Nov 2026 17:48:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"data":[{"id":1,"judul":"Laskar Pelangi","penulis":"Andrea Hirata","tahun":2005,"stok":5,"createdAt":"2026-11-02T17:31:56.249Z","updatedAt":"2026-11-02T17:31:56.249Z"},{"id":2,"judul":"Bumi Manusia","penulis":"Pramoedya Ananta Toer","tahun":1980,"stok":3,"createdAt":"2026-11-02T17:31:56.249Z","updatedAt":"2026-11-02T17:31:56.249Z"},{"id":3,"judul":"Filosofi Teras","penulis":"Henry Manampiring","tahun":2018,"stok":0,"createdAt":"2026-11-02T17:31:56.249Z","updatedAt":"2026-11-02T17:31:56.249Z"}]}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Tugas(Mini Project)>curl.exe -i -X POST http://localhost:3008/buku -H "Content-Type: application/json" -d "{\"judul\":\"Buku Baru\",\"penulis\":\"Penulis Baru\",\"tahun\":2023,\"stok\":2}"
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 186
ETag: W/"ba-/Sj96pxXf7SCPCm00YEWEe3R4c0"
Date: Mon, 02 Nov 2026 17:49:11 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Buku dibuat","data":{"id":4,"judul":"Buku Baru","penulis":"Penulis Baru","tahun":2023,"stok":2,"createdAt":"2026-11-02T17:49:11.254Z","updatedAt":"2026-11-02T17:49:11.254Z"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Tugas(Mini Project)>curl.exe -i -X POST http://localhost:3008/buku -H "Content-Type: application/json" -d "{\"judul\":\"\",\"tahun\":5000,\"stok\":-2}"
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 158
ETag: W/"9e-fc3LigVnhESUz9zT69jWpGCxBl4"
Date: Mon, 02 Nov 2026 17:49:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Validasi gagal","errors":["judul wajib string tidak kosong","penulis wajib string tidak kosong","tahun harus integer 1000-2100","stok minimal 0"]}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Tugas(Mini Project)>curl.exe -i -X POST http://localhost:3008/pinjaman -H "Content-Type: application/json" -d "{\"bukuId\":1,\"penggunaId\":1}"
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 153
ETag: W/"99-miQpS1xR9Hfo0QUXl3sob18FITg"
Date: Mon, 02 Nov 2026 17:49:38 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Pinjaman dibuat","data":{"id":1,"bukuId":1,"penggunaId":1,"tanggalPinjam":"2026-11-02T17:49:37.897Z","tanggalKembali":null,"status":"aktif"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Tugas(Mini Project)>curl.exe -i -X PATCH http://localhost:3008/pinjaman/1/kembalikan
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 174
ETag: W/"ae-P2Faga6DftiBqpQnCGeFfiV+TIE"
Date: Mon, 02 Nov 2026 17:49:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Dikembalikan","data":{"id":1,"bukuId":1,"penggunaId":1,"tanggalPinjam":"2026-11-02T17:49:37.897Z","tanggalKembali":"2026-11-02T17:49:49.844Z","status":"selesai"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Tugas(Mini Project)>curl.exe -i http://localhost:3008/buku
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 654
ETag: W/"28e-8U8XCL9JtiYtpU8uwAuOI1MC+n8"
Date: Mon, 02 Nov 2026 17:50:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"data":[{"id":1,"judul":"Laskar Pelangi","penulis":"Andrea Hirata","tahun":2005,"stok":5,"createdAt":"2026-11-02T17:31:56.249Z","updatedAt":"2026-11-02T17:49:49.853Z"},{"id":2,"judul":"Bumi Manusia","penulis":"Pramoedya Ananta Toer","tahun":1980,"stok":3,"createdAt":"2026-11-02T17:31:56.249Z","updatedAt":"2026-11-02T17:31:56.249Z"},{"id":3,"judul":"Filosofi Teras","penulis":"Henry Manampiring","tahun":2018,"stok":0,"createdAt":"2026-11-02T17:31:56.249Z","updatedAt":"2026-11-02T17:31:56.249Z"},{"id":4,"judul":"Buku Baru","penulis":"Penulis Baru","tahun":2023,"stok":2,"createdAt":"2026-11-02T17:49:11.254Z","updatedAt":"2026-11-02T17:49:11.254Z"}]}