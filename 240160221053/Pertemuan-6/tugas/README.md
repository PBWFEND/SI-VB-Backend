# Tugas 4 — Integrasi Database dan ORM untuk REST API

Project REST API untuk resource Buku menggunakan Express + Prisma + SQLite.

Nama    : Athiyya Salsabila Hermawan
NPM     : 240160221053
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

### HASIL PENGUJIAN
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_06\Tugas-4>node --experimental-strip-types src/server.ts
Server Tugas 4 berjalan di http://localhost:3008
PS D:\240160221053\Pertemuan-6\tugas> npm start

> tugas-4-prisma@1.0.0 start
> node --experimental-strip-types src/server.ts

Server Tugas 4 berjalan di http://localhost:3008
[2026-11-02T07:20:26.567Z] GET /buku
[2026-11-02T07:20:45.094Z] GET /buku/1
[2026-11-02T07:21:56.661Z] PATCH /buku/1
[2026-11-02T07:22:34.194Z] DELETE /buku/1

PS D:\240160221053> cd Pertemuan-6/tugas                      
PS D:\240160221053\Pertemuan-6\tugas> curl.exe http://localhost:3008/buku
{"success":true,"message":"Daftar buku berhasil diambil","data":{"total":0,"data":[]}}
PS D:\240160221053\Pertemuan-6\tugas> curl.exe http://localhost:3008/buku/1
{"success":false,"message":"Buku tidak ditemukan"}
PS D:\240160221053\Pertemuan-6\tugas> curl.exe -X PATCH http://localhost:3008/buku/1  
{"success":false,"message":"Buku tidak ditemukan"}
PS D:\240160221053\Pertemuan-6\tugas> curl.exe -X DELETE http://localhost:3008/buku/1 
{"success":false,"message":"Buku tidak ditemukan"}
PS D:\240160221053\Pertemuan-6\tugas> curl.exe http://localhost:3008/                
{"success":true,"message":"API Buku Tugas 4","data":{"endpoints":["GET /buku","GET /buku/:id","POST /buku","PATCH /buku/:id","DELETE /buku/:id"]}}
PS D:\240160221053\Pertemuan-6\tugas> curl.exe http://localhost:3008/buku
{"success":true,"message":"Daftar buku berhasil diambil","data":{"total":0,"data":[]}}