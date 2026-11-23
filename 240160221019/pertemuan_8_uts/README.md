# SI-VB-Backend
2026-2027 Gasal

# 📚 UTS Mini Project Backend — Sistem Informasi Perpustakaan

Backend REST API untuk manajemen perpustakaan digital yang dibangun menggunakan arsitektur berlapis (*layered architecture*). Project ini dikembangkan untuk memenuhi Ujian Tengah Semester (UTS) Backend Development.

## 👤 Identitas Pengguna
* **Nama:** Kikan Khairani  
* **NPM:** 240160221019  
* **Kelas:** Sistem Informasi  

---

## 🛠️ Stack & Prasarana
* **Runtime:** Node.js (v20+)
* **Framework:** Express.js v5
* **Database & ORM:** SQLite & Prisma ORM
* **Language:** TypeScript / TSX

---

## 📂 Struktur Lapisan Project (Layered Architecture)
Project ini menerapkan pemisahan tanggung jawab yang jelas untuk menjaga modularitas dan keterbacaan kode:

```text
pertemuan_8_uts/
├── app.ts                  # Konfigurasi middleware Express, 404 handler, dan Global Error Handler
├── server.ts               # Inisialisasi server HTTP & graceful shutdown
├── client.ts               # Singleton instance untuk Prisma Client
├── prisma/
│   ├── schema.prisma       # Skema database (Model Buku, Pengguna, Pinjaman)
│   └── migrations/         # Riwayat migrasi database SQLite
├── src/
│   ├── routes/             # Pendefinisian endpoint / jalur routing API
│   ├── controller/         # Logika request/response, kode status HTTP, & validasi input
│   └── service/            # Logika bisnis & interaksi database via Prisma ORM
├── .env                    # Konfigurasi Environment (PORT, DATABASE_URL)
└── README.md               # Dokumentasi dan panduan pengujian project

⚙️ Cara Menjalankan Project
Install dependencies:

Bash
npm install
Konfigurasi Environment (.env):

Cuplikan kode
PORT=3008
DATABASE_URL="file:./dev.db"
Migrasi Database & Generate Prisma Client:

Bash
npx prisma migrate dev --name init
npx prisma generate
Menjalankan Server:

Bash
npm start
Server aktif di: http://localhost:3008

🚀 Dokumentasi Endpoint & Pengujian (cURL)
Berikut adalah daftar endpoint REST API beserta contoh pengujian menggunakan curl.exe:

1. Health Check
GET /health — Memeriksa status kesehatan server (200 OK).

Bash
curl -i http://localhost:3008/health
2. Manajemen Buku (/buku)
GET /buku — Menampilkan daftar seluruh buku.

Bash
curl -i http://localhost:3008/buku
GET /buku/:id — Menampilkan detail buku berdasarkan ID (200 OK / 404 Not Found).

Bash
curl -i http://localhost:3008/buku/1
curl -i http://localhost:3008/buku/999999
POST /buku — Membuat data buku baru (201 Created).

Bash
'{"judul":"Bumi","penulis":"Tere Liye","tahun":2014,"stok":5}' | Set-Content -Path body.json -Encoding utf8
curl -i -X POST http://localhost:3008/buku -H "Content-Type: application/json" --data-binary "@body.json"
PATCH /buku/:id — Memperbarui data atau stok buku (200 OK).

Bash
'{"stok":10}' | Set-Content -Path patch.json -Encoding utf8
curl -i -X PATCH http://localhost:3008/buku/3 -H "Content-Type: application/json" --data-binary "@patch.json"
DELETE /buku/:id — Menghapus data buku (204 No Content).

Bash
curl -i -X DELETE http://localhost:3008/buku/3
3. Validasi Input Gagal (400 Bad Request)
POST /buku (Data Tidak Valid) — Menolak data yang tidak sesuai tipe/rentang.

Bash
'{"judul":"","tahun":3000,"stok":-1}' | Set-Content -Path invalid.json -Encoding utf8
curl -i -X POST http://localhost:3008/buku -H "Content-Type: application/json" --data-binary "@invalid.json"
4. Modul Relasi Peminjaman (/pinjaman)
POST /pinjaman — Mengajukan peminjaman buku.

Bash
'{"bukuId":2,"penggunaId":1}' | Set-Content -Path pinjaman.json -Encoding utf8
curl -i -X POST http://localhost:3008/pinjaman -H "Content-Type: application/json" --data-binary "@pinjaman.json"

🖥️ Bukti Pengujian Terminal (PowerShell)

PowerShell
PS C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_8_uts> npm start

> uts-backend-perpustakaan@1.0.0 start
> tsx server.ts

🚀 API berjalan di http://localhost:3008
1. Health Check
PowerShell
PS C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_8_uts> curl.exe -i http://localhost:3008/health
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 54
ETag: W/"36-V5Yg1TmTN+L5QIrA+ekp/fmB1Zk"
Date: Tue, 17 Nov 2026 12:45:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"status":"ok","timestamp":"2026-11-17T12:45:10.037Z"}
2. Detail Buku & Uji 404 Not Found
PowerShell
PS C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_8_uts> curl.exe -i http://localhost:3008/buku/1
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 154
ETag: W/"9a-F3GgRTRZiDF+hi81HFij3MASUJg"
Date: Tue, 17 Nov 2026 12:45:58 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"data":{"id":1,"judul":"Bumi","penulis":"Tere Liye","tahun":2014,"stok":5,"createdAt":"2026-11-17T05:27:34.612Z","updatedAt":"2026-11-17T05:45:45.462Z"}}

PS C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_8_uts> curl.exe -i http://localhost:3008/buku/999999
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 44
ETag: W/"2c-XyHwvoMl3IzLO9QaPy8oPaFwT1U"
Date: Tue, 17 Nov 2026 12:47:00 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Buku id 999999 tidak ditemukan"}
3. Pembuatan Buku Baru (201 Created)
PowerShell
PS C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_8_uts> curl.exe -i -X POST http://localhost:3008/buku -H "Content-Type: application/json" --data-binary "@body.json"
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 187
ETag: W/"bb-sBuBVAq+pWIU6MgVjMgctIFLMhk"
Date: Tue, 17 Nov 2026 13:00:12 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Buku berhasil dibuat","data":{"id":3,"judul":"Bumi","penulis":"Tere Liye","tahun":2014,"stok":5,"createdAt":"2026-11-17T13:00:12.798Z","updatedAt":"2026-11-17T13:00:12.798Z"}}
4. Update Sebagian Data Buku (200 OK)
PowerShell
PS C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_8_uts> curl.exe -i -X PATCH http://localhost:3008/buku/3 -H "Content-Type: application/json" --data-binary "@patch.json"
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 190
ETag: W/"be-ioiZe4XXmXE7eSb4GN78P3G2hsw"
Date: Tue, 17 Nov 2026 13:05:48 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Buku berhasil diupdate","data":{"id":3,"judul":"Bumi","penulis":"Tere Liye","tahun":2014,"stok":10,"createdAt":"2026-11-17T13:00:12.798Z","updatedAt":"2026-11-17T13:05:47.855Z"}}
5. Validasi Gagal (400 Bad Request)
PowerShell
PS C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_8_uts> curl.exe -i -X POST http://localhost:3008/buku -H "Content-Type: application/json" --data-binary "@invalid.json"
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 178
ETag: W/"b2-vSK28P34gL2z8YwwQyAnLk65XK0"
Date: Tue, 17 Nov 2026 13:06:15 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Validasi gagal","errors":["judul wajib string tidak kosong","penulis wajib string tidak kosong","tahun harus di antara 1000 dan 2100","stok harus integer minimal 0"]}
6. Penghapusan Buku (204 No Content)
PowerShell
PS C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_8_uts> curl.exe -i -X DELETE http://localhost:3008/buku/3
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Tue, 17 Nov 2026 13:07:20 GMT
Connection: keep-alive
Keep-Alive: timeout=5
7. Pengujian Modul Pinjaman
PowerShell
PS C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_8_uts> curl.exe -i -X POST http://localhost:3008/pinjaman -H "Content-Type: application/json" --data-binary "@pinjaman.json"
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 39
ETag: W/"27-/EsQE0u0uG6s/csow1Y+CsSLtbI"
Date: Tue, 17 Nov 2026 13:06:37 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Buku id 2 tidak ditemukan"}


