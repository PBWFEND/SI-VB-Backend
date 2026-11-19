 # Prak Backend Pertemuan 10 — JWT & Authorization

Proyek ini mendemonstrasikan implementasi autentikasi JWT dan otorisasi berbasis role menggunakan Express.js, Prisma, dan SQLite. Merupakan bagian dari latihan individu Pertemuan 10 dengan penambahan role ketiga (`staf`) dan endpoint khusus.

Nama    : Aprilliana Fratiwi
NPM     : 2401602211004
Kelas   : SI -VB

## Daftar Isi
1. [Fitur](#fitur)
2. [Prasyarat](#prasyarat)
3. [Struktur Proyek](#struktur-proyek)
4. [Instalasi & Menjalankan](#instalasi--menjalankan)
5. [Cara Pengujian di CMD](#cara-pengujian-di-cmd)
6. [Ringkasan Skenario Pengujian](#ringkasan-skenario-pengujian)
7. [Jawaban Teori](#jawaban-teori)

---

## Fitur
- Registrasi & Login dengan hashing password (`scrypt`).
- Middleware Autentikasi (verifikasi Bearer Token).
- Middleware Otorisasi (pemeriksaan role).
- Endpoint terlindungi:
  - `GET /protected/me` — Semua user terautentikasi.
  - `GET /protected/pengguna` — Hanya role `dosen`.
  - `GET /protected/staf` — Hanya role `staf` **(Latihan Individu)**.
- Validasi input & error handler terpusat.

## Prasyarat
- Node.js `>= 22.12.0`
- npm
- curl (bawaan Windows 10 1803+ / 11)
- CMD / Terminal

## Struktur Proyek
```
prak-backend-pertemuan-10/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── controller/
│   │   ├── auth.controller.ts
│   │   └── protected.controller.ts
│   ├── middleware/
│   │   └── auth.middleware.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── protected.routes.ts
│   └── service/
│       ├── auth.service.ts
│       └── token.service.ts
├── .env
├── .gitignore
├── app.ts
├── client.ts
├── server.ts
├── prisma.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Instalasi & Menjalankan

### 1. Install dependencies
```cmd
npm install
```

### 2. Buat file `.env`
Lihat bagian [Konfigurasi Environment](#konfigurasi-environment).

### 3. Migrasi database
```cmd
npm run prisma:migrate
```

### 4. Generate Prisma Client
```cmd
npm run prisma:generate
```

### 5. Jalankan server
```cmd
npm run dev
```
berhasil: `JWT & Authorization API berjalan di http://localhost:3010`

## Cara Pengujian di CMD

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>npm run dev

> prak-backend-pertemuan-10@1.0.0 dev
> node --watch --experimental-strip-types server.ts

JWT & Authorization API berjalan di http://localhost:3010

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl http://localhost:3010/health
{"success":true,"data":{"status":"up"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl -X POST http://localhost:3010/auth/register -H "Content-Type: application/json" -d "{\"nama\":\"Aprilliana Fratiwi\",\"email\":\"april@example.com\",\"password\":\"password123\"}"
{"success":true,"message":"Akun berhasil dibuat","data":{"id":1,"nama":"Aprilliana Fratiwi","email":"april@example.com","role":"mahasiswa","createdAt":"2026-11-10T05:02:20.559Z"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl -X POST http://localhost:3010/auth/login -H "Content-Type: application/json" -d "{\"email\":\"april@example.com\",\"password\":\"password123\"}"
{"success":true,"message":"Login berhasil","data":{"id":1,"nama":"Aprilliana Fratiwi","email":"april@example.com","role":"mahasiswa","createdAt":"2026-11-10T05:02:20.559Z","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJtYWhhc2lzd2EiLCJpYXQiOjE3OTQyODY5ODAsImV4cCI6MTc5NDI4Nzg4MH0.aiVPnmH7epNT0yx77w90cz0jUPZotMOrjFtSwUBpa5o"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl -X POST http://localhost:3010/auth/register -H "Content-Type: application/json" -d "{\"nama\":\"Staf Satu\",\"email\":\"staf@example.com\",\"password\":\"password123\"}"
{"success":true,"message":"Akun berhasil dibuat","data":{"id":2,"nama":"Staf Satu","email":"staf@example.com","role":"mahasiswa","createdAt":"2026-11-10T05:03:24.877Z"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl -X POST http://localhost:3010/auth/login -H "Content-Type: application/json" -d "{\"email\":\"staf@example.com\",\"password\":\"password123\"}"
{"success":true,"message":"Login berhasil","data":{"id":2,"nama":"Staf Satu","email":"staf@example.com","role":"mahasiswa","createdAt":"2026-11-10T05:03:24.877Z","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInJvbGUiOiJtYWhhc2lzd2EiLCJpYXQiOjE3OTQyODcxOTYsImV4cCI6MTc5NDI4ODA5Nn0.Bf_nJUJpcJawjfJMnwg_KQh9sBvSw8Zh-0bcQazzPsw"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl -X GET http://localhost:3010/protected/me -H "Authorization: Bearer TOKEN_MAHASISWA_DISINI"
{"success":false,"message":"Token tidak valid atau kedaluwarsa"}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl -X GET http://localhost:3010/protected/staf -H "Authorization: Bearer TOKEN_STAF_DISINI"
{"success":false,"message":"Token tidak valid atau kedaluwarsa"}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl -X GET http://localhost:3010/protected/staf -H "Authorization: Bearer TOKEN_MAHASISWA_DISINI"
{"success":false,"message":"Token tidak valid atau kedaluwarsa"}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl -i -X GET http://localhost:3010/protected/me
HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8
Content-Length: 51
ETag: W/"33-vMzLrvxcR4QGRd6FEP6KpvR2LpI"
Date: Tue, 10 Nov 2026 05:08:43 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"success":false,"message":"Token tidak ditemukan"}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl -i -X GET http://localhost:3010/protected/me -H "Authorization: Bearer ini.token.palsu.banget"
HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8
Content-Length: 64
ETag: W/"40-NPICGC92i/XMhxdFJ06hvtweeqI"
Date: Tue, 10 Nov 2026 05:08:57 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"success":false,"message":"Token tidak valid atau kedaluwarsa"}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl -i -X POST http://localhost:3010/auth/login -H "Content-Type: application/json" -d "{\"email\":\"budi@example.com\",\"password\":\"salah\"}"
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
Content-Length: 105
ETag: W/"69-+uG7p0ePZnsW+97EWKCmOr8mxFU"
Date: Tue, 10 Nov 2026 05:09:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"success":false,"message":"Validasi gagal","errors":["password wajib berupa string minimal 8 karakter"]}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl -i -X POST http://localhost:3010/auth/register -H "Content-Type: application/json" -d "{\"nama\":\"Aprilliana Lagi\",\"email\":\"april@example.com\",\"password\":\"password123\"}"
HTTP/1.1 409 Conflict
Content-Type: application/json; charset=utf-8
Content-Length: 51
ETag: W/"33-HDcJazkzDiK/IFh2HYoCfAlc6Z0"
Date: Tue, 10 Nov 2026 05:10:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"success":false,"message":"Email sudah terdaftar"}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl -i -X POST http://localhost:3010/auth/register -H "Content-Type: application/json" -d "{\"nama\":\"Test\",\"email\":\"test@example.com\",\"password\":\"123\"}"
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
Content-Length: 105
ETag: W/"69-+uG7p0ePZnsW+97EWKCmOr8mxFU"
Date: Tue, 10 Nov 2026 05:11:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"success":false,"message":"Validasi gagal","errors":["password wajib berupa string minimal 8 karakter"]}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_10\Latihan_Individu>curl -i -X POST http://localhost:3010/auth/register -H "Content-Type: application/json" -d "{\"nama\":\"Hacker\",\"email\":\"hacker@example.com\",\"password\":\"password123\",\"role\":\"dosen\"}"
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
Content-Length: 111
ETag: W/"6f-PsjgvLz9JvwL+X/5EkCs9UVDhz4"
Date: Tue, 10 Nov 2026 05:11:24 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"success":false,"message":"Validasi gagal","errors":["role tidak dapat ditentukan melalui registrasi publik"]}

## Ringkasan Skenario Pengujian

| No | Skenario | Endpoint | Header | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Health check | `GET /health` | — | 200 |
| 2 | Register mahasiswa | `POST /auth/register` | — | 201 |
| 3 | Login mahasiswa | `POST /auth/login` | — | 200 |
| 4 | `/me` sebagai mahasiswa | `GET /protected/me` | Bearer mahasiswa | 200 |
| 5 | `/staf` sebagai staf | `GET /protected/staf` | Bearer staf | 200 |
| 6 | `/staf` sebagai mahasiswa | `GET /protected/staf` | Bearer mahasiswa | **403** |
| 7 | Tanpa token | `GET /protected/me` | — | **401** |
| 8 | Token rusak | `GET /protected/me` | Bearer rusak | **401** |
| 9 | Password salah | `POST /auth/login` | — | **401** |
| 10 | Email duplikat | `POST /auth/register` | — | **409** |
| 11 | Password < 8 karakter | `POST /auth/register` | — | **400** |
| 12 | Set role saat register | `POST /auth/register` | — | **400** |
| 13 | Token kedaluwarsa | `GET /protected/me` | Bearer expired | **401** |

## Jawaban Teori

### 3. Mengapa klaim `exp` harus diverifikasi pada setiap request?

Klaim `exp` wajib diverifikasi karena JWT bersifat **stateless** — server tidak menyimpan session di memori/database. Jika tidak diverifikasi:

1. **Token berlaku selamanya** — Token yang bocor dapat digunakan penyerang tanpa batas waktu.
2. **Tidak ada kontrol sesi** — Pengguna yang logout/ganti password tetap bisa akses API dengan token lama.
3. **Tidak ada rotasi alami** — Client tidak pernah dipaksa memperbarui token.

Library `jsonwebtoken` otomatis memeriksa `exp` di `jwt.verify()`. Jika kedaluwarsa, verifikasi gagal dan middleware mengembalikan `401`.

### 4. Bandingkan dampak token 15 menit vs 24 jam saat bocor.

| Aspek | Token 15 Menit | Token 24 Jam |
| :--- | :--- | :--- |
| **Jendela Eksploitasi** | Sangat kecil (15 menit). | Sangat besar (1 hari penuh). |
| **Dampak Kerusakan** | Terbatas. Token mati sendiri. | Fatal. Penyerang leluasa beraksi lama. |
| **Kemudahan Mitigasi** | Tidak perlu revocation manual. | Butuh blacklist token (hilangkan stateless). |
| **Beban Server** | Lebih tinggi (sering refresh). | Lebih rendah (jarang login). |
| **Praktik Terbaik** | Sebagai **Access Token**. | Sebagai **Refresh Token** (bisa dicabut). |

**Kesimpulan:** Token 15 menit jauh lebih aman karena membatasi jendela serangan jika bocor.