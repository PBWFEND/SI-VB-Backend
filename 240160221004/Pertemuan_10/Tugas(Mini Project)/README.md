# Mini Project Backend — Perpustakaan (UTS, Auth, & RBAC)

## Identitas Mahasiswa
- **Nama:** Aprilliana
- **NIM:** 240160221004
- **Kelas:** SI-VA / SI-VB 

## Fitur Utama
1. **Authentication (Pertemuan 9)**: Registrasi dan Login menggunakan JWT.
2. **Keamanan Password**: Menggunakan `bcryptjs` untuk hashing password.
3. **Otorisasi / RBAC (Pertemuan 10)**: Role `admin` (bisa CRUD) dan `user` (hanya baca & pinjam).
4. **Middleware**: Proteksi endpoint menggunakan Bearer Token, 404 handler, dan Global Error.
5. **CRUD Buku & Pinjaman (UTS)**: Transaksi database relasional (stok otomatis berkurang/bertambah).
6. **Pola Berlapis**: Memisahkan logika ke `routes`, `controller`, `service`, dan `middleware`.

## 🚀 Cara Menjalankan Project

Buka terminal/CMD di folder project ini, lalu jalankan:

```bash
# 1. Install dependency
npm install

# 2. Copy environment
# Windows: copy .env.example .env
# Mac/Linux: cp .env.example .env

# 3. Migrasi database
npx prisma migrate dev --name init

# 4. Generate Prisma Client
npx prisma generate

# 5. Isi data awal (Buku & User)
npm run seed

# 6. Jalankan server
npm start

## Cara Menjalankan dan Pengujian
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Tugas(Mini Project)>npm start

> uts-backend-perpustakaan@1.0.0 start
> tsx server.ts

🚀 API berjalan di http://localhost:3008

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Tugas(Mini Project)>curl.exe -i -X POST http://localhost:3008/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\",\"password\":\"rahasia123\"}"
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 324
ETag: W/"144-JZbi9TCv1CPLWwnFkfXi7nvZwpM"
Date: Tue, 10 Nov 2026 06:07:34 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Login berhasil","data":{"user":{"id":1,"nama":"Admin Perpus","email":"admin@example.com","role":"admin"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc5NDI5MDg1NCwiZXhwIjoxNzk0MjkxNzU0fQ.Yd8HjV4e54JnRgNeDJkB6F2ZZuzf-I43jOWcuSXcpJQ"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Tugas(Mini Project)>curl.exe -i http://localhost:3008/buku
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 51
ETag: W/"33-A9fbUyoJeZCBvSbpYWzXd1AEURI"
Date: Tue, 10 Nov 2026 06:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Akses ditolak. Token tidak ditemukan."}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Tugas(Mini Project)>curl.exe -i -H "Authorization: Bearer <TOKEN_ADMIN>" http://localhost:3008/buku
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 55
ETag: W/"37-KoTpN2w+YcbpZHOoARvv6SBlc+Q"
Date: Tue, 10 Nov 2026 06:08:19 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Token tidak valid atau sudah kedaluwarsa."}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Tugas(Mini Project)>curl.exe -i -X POST -H "Authorization: Bearer <TOKEN_ADMIN>" -H "Content-Type: application/json" -d "{\"judul\":\"Buku Rahasia\",\"penulis\":\"Admin\",\"tahun\":2024,\"stok\":1}" http://localhost:3008/buku
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 55
ETag: W/"37-KoTpN2w+YcbpZHOoARvv6SBlc+Q"
Date: Tue, 10 Nov 2026 06:08:41 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Token tidak valid atau sudah kedaluwarsa."}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Tugas(Mini Project)>curl.exe -i -X POST http://localhost:3008/auth/login -H "Content-Type: application/json" -d "{\"email\":\"budi@example.com\",\"password\":\"rahasia123\"}"
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 319
ETag: W/"13f-vydu7EZ3yEXG+xU+WtJB1CoPLQA"
Date: Tue, 10 Nov 2026 06:09:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Login berhasil","data":{"user":{"id":2,"nama":"Budi Santoso","email":"budi@example.com","role":"user"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJidWRpQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3OTQyOTA5NTQsImV4cCI6MTc5NDI5MTg1NH0.Wclpu8vd3Ox8Sr46JsG2BVzTvzlsTo3TArlQMJYqJ2w"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Tugas(Mini Project)>curl.exe -i -X POST -H "Authorization: Bearer <TOKEN_USER>" -H "Content-Type: application/json" -d "{\"judul\":\"Buku User\",\"penulis\":\"Budi\",\"tahun\":2024,\"stok\":1}" http://localhost:3008/buku
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 55
ETag: W/"37-KoTpN2w+YcbpZHOoARvv6SBlc+Q"
Date: Tue, 10 Nov 2026 06:09:40 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Token tidak valid atau sudah kedaluwarsa."}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Tugas(Mini Project)>curl.exe -i -X POST -H "Authorization: Bearer <TOKEN_USER>" -H "Content-Type: application/json" -d "{\"bukuId\":2,\"penggunaId\":2}" http://localhost:3008/pinjaman
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 55
ETag: W/"37-KoTpN2w+YcbpZHOoARvv6SBlc+Q"
Date: Tue, 10 Nov 2026 06:09:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"message":"Token tidak valid atau sudah kedaluwarsa."}