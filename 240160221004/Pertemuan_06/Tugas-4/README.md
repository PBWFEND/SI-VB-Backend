# Tugas 4 — Integrasi Database dan ORM untuk REST API

Project REST API untuk resource Buku menggunakan Express + Prisma + SQLite.

Nama    : Aprilliana Fratiwi
NPM     : 240160221004
Kelas   : SI - VB

## Prasyarat
- Node.js v20+
- npm

## Langkah Instalasi
1. Clone repository ini.
2. Jalankan `npm install`.
3. Salin `.env.example` menjadi `.env`.
4. Jalankan migrasi: `npx prisma migrate dev --name init`.
5. Generate client: `npx prisma generate`.

## Cara Menjalankan
npm start
Server berjalan di `http://localhost:3008`.

## Contoh Request

### GET semua buku
curl http://localhost:3008/buku

### GET detail buku
curl http://localhost:3008/buku/1

### POST tambah buku
curl -X POST http://localhost:3008/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"Pemrograman Node.js","penulis":"Aprilliana Fratiwi","tahun":2023,"stok":5}'

### PATCH update buku
curl -X PATCH http://localhost:3008/buku/1 \
  -H "Content-Type: application/json" \
  -d '{"stok":10}'

### DELETE buku
curl -X DELETE http://localhost:3008/buku/1

### HASIL PENGUJIAN
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_06\Tugas-4>node --experimental-strip-types src/server.ts
Server Tugas 4 berjalan di http://localhost:3008
[2026-10-16T08:12:45.381Z] GET /
[2026-10-16T08:13:04.075Z] GET /buku
[2026-10-16T08:13:49.000Z] POST /buku
[2026-10-16T08:14:08.133Z] GET /buku
[2026-10-16T08:14:23.191Z] GET /buku/1
[2026-10-16T08:14:37.375Z] PATCH /buku/1
[2026-10-16T08:15:23.938Z] GET /buku?minStok=3
[2026-10-16T08:15:37.607Z] DELETE /buku/1

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_06\Tugas-4>curl http://localhost:3008/
{"success":true,"message":"API Buku Tugas 4","data":{"endpoints":["GET /buku","GET /buku/:id","POST /buku","PATCH /buku/:id","DELETE /buku/:id"]}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_06\Tugas-4>curl http://localhost:3008/buku
{"success":true,"message":"Daftar buku berhasil diambil","data":{"total":0,"data":[]}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_06\Tugas-4>curl -X POST http://localhost:3008/buku -H "Content-Type: application/json" -d "{\"judul\":\"Pemrograman Node.js\",\"penulis\":\"Aprilliana Fratiwi\",\"tahun\":2023,\"stok\":5}"
{"success":true,"message":"Buku berhasil dibuat","data":{"id":1,"judul":"Pemrograman Node.js","penulis":"Aprilliana Fratiwi","tahun":2023,"stok":5}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_06\Tugas-4>curl http://localhost:3008/buku
{"success":true,"message":"Daftar buku berhasil diambil","data":{"total":1,"data":[{"id":1,"judul":"Pemrograman Node.js","penulis":"Aprilliana Fratiwi","tahun":2023,"stok":5}]}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_06\Tugas-4>curl http://localhost:3008/buku/1
{"success":true,"message":"Detail buku berhasil diambil","data":{"id":1,"judul":"Pemrograman Node.js","penulis":"Aprilliana Fratiwi","tahun":2023,"stok":5}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_06\Tugas-4>curl -X PATCH http://localhost:3008/buku/1 -H "Content-Type: application/json" -d "{\"stok\":10}"
{"success":true,"message":"Buku berhasil diperbarui","data":{"id":1,"judul":"Pemrograman Node.js","penulis":"Aprilliana Fratiwi","tahun":2023,"stok":10}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_06\Tugas-4>curl "http://localhost:3008/buku?penulis=Apriliana Fratiwi"

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_06\Tugas-4>curl "http://localhost:3008/buku?minStok=3"
{"success":true,"message":"Daftar buku berhasil diambil","data":{"total":1,"data":[{"id":1,"judul":"Pemrograman Node.js","penulis":"Aprilliana Fratiwi","tahun":2023,"stok":10}]}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_06\Tugas-4>curl -X DELETE http://localhost:3008/buku/1
