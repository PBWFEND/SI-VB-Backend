# Prak Backend Pertemuan 12 — Express + Error Handling Terpusat

Proyek ini mendemonstrasikan aplikasi Express dengan error handling terpusat,
middleware keamanan (helmet + CORS), logging terstruktur, validasi environment,
serta integrasi Prisma + SQLite. Disertai penyelesaian Latihan Individu 17.

Nama    : Aprilliana Fratiwi
NPM     : 240160221004
Kelas   : SI -VB

## Prasyarat

- Node.js >= 22.12.0
- npm
- Terminal (CMD / PowerShell / bash)

## Cara Menjalankan
### Install dependency
    npm install

### Siapkan file .env
Isi `.env` di root proyek:

    NODE_ENV=development
    PORT=3012
    DATABASE_URL="file:./prisma/dev.db"
    LOG_LEVEL=info
    CORS_ORIGIN="http://localhost:5173,http://localhost:3000"

### Jalankan server
    npm start

Server berjalan di http://localhost:3012

## Environment (.env)

| Variabel      | Contoh Nilai                                    | Keterangan                          |
|---------------|--------------------------------------------------|-------------------------------------|
| NODE_ENV      | development                                      | development/test/production         |
| PORT          | 3012                                             | Angka valid; jika salah proses stop |
| DATABASE_URL  | file:./prisma/dev.db                             | Lokasi SQLite                       |
| LOG_LEVEL     | info                                             | debug/info/warn/error               |
| CORS_ORIGIN   | http://localhost:5173,http://localhost:3000      | Origin dipisah koma                 |

## Endpoint

| Method | Path                 | Keterangan                              |
|--------|----------------------|-----------------------------------------|
| GET    | /health              | Cek status server                       |
| GET    | /api/buku            | Daftar buku (filter judul, minStok)     |
| GET    | /api/buku/:id        | Detail buku; 404 NOT_FOUND jika tak ada |
| POST   | /api/buku            | Buat buku baru (201)                    |
| GET    | /contoh/forbidden    | Uji AppError FORBIDDEN (403)            |
| POST   | /contoh/login        | Uji redaksi password di log             |

## Latihan Individu 17 — Jawaban Ringkas

1. Endpoint GET /api/buku/:id memakai AppError NOT_FOUND lewat ambilBuku()
   di service. Uji GET /api/buku/999 -> HTTP 404 dengan body:
   { "success": false, "error": { "code": "NOT_FOUND", ... } }

2. Kode error baru FORBIDDEN ditambahkan di app-error.ts melalui
   forbiddenError(), dan dipetakan pada error-handler.ts (HTTP 403).

3. Dengan LOG_LEVEL=warn, log level info dan debug hilang. Secara spesifik
   log akses "request selesai" (logger.info) tidak muncul. Dengan
   LOG_LEVEL=debug, seluruh log muncul kembali.

4. Field password disensor menjadi "[REDACTED]" melalui redactSensitiveData()
   di logger. Uji dengan POST /contoh/login yang membawa password.

5. uncaughtException sebaiknya menghentikan proses karena state aplikasi
   tidak bisa dijamin aman; proses manager (PM2/Docker) akan me-restart
   bersih. unhandledRejection tidak selalu fatal, cukup dicatat lalu lanjut.

6. Contoh env salah: PORT=abc. Saat proses dimulai, muncul pesan:
   "PORT harus berupa angka yang valid. Proses dihentikan."

## Cara Menguji di CMD

### Uji No.1 — NOT_FOUND
    curl -i http://localhost:3012/api/buku/999

### Uji No.2 — FORBIDDEN
    curl -i http://localhost:3012/contoh/forbidden

### Uji No.3 — LOG_LEVEL
    curl http://localhost:3012/health

### Uji No.4 — Redaksi password
    curl -i -X POST http://localhost:3012/contoh/login -H "Content-Type: application/json" -d "{\"username\":\"budi\",\"password\":\"rahasia123\"}"

### Uji No.5 — uncaughtException vs unhandledRejection
Sudah diterapkan di server.ts:
- uncaughtException -> logger.error + process.exit(1)
- unhandledRejection -> logger.warn, proses lanjut

### Uji No.6 — Env salah
Ubah .env menjadi PORT=abc, lalu:
    npm run dev
Ekspektasi proses berhenti dengan pesan:
"PORT harus berupa angka yang valid. Proses dihentikan."
Kembalikan ke PORT=3012 setelah uji.

## BUKTI PENGUJIAN
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_12\Latihan>npm run dev

> prak-backend-pertemuan-12@1.0.0 dev
> node --watch --experimental-strip-types server.ts

{"waktu":"2026-11-26T16:28:44.593Z","level":"info","pesan":"server berjalan","konteks":{"port":3012,"env":"development","logLevel":"info"}}
{"waktu":"2026-11-26T16:30:50.407Z","level":"warn","pesan":"app error","konteks":{"requestId":"241f7473-60d0-4bdd-94d8-b1027a00b4f2","kode":"NOT_FOUND","status":404,"pesan":"Buku dengan id 999 tidak ditemukan"}}
{"waktu":"2026-11-26T16:30:50.459Z","level":"info","pesan":"request selesai","konteks":{"requestId":"241f7473-60d0-4bdd-94d8-b1027a00b4f2","method":"GET","path":"/api/buku/999","status":404,"durasiMs":1269.22}}
{"waktu":"2026-11-26T16:31:13.532Z","level":"warn","pesan":"app error","konteks":{"requestId":"60c8ff77-2099-4c09-832b-057527c28d4d","kode":"FORBIDDEN","status":403,"pesan":"Anda tidak memiliki akses ke resource ini."}}
{"waktu":"2026-11-26T16:31:13.535Z","level":"info","pesan":"request selesai","konteks":{"requestId":"60c8ff77-2099-4c09-832b-057527c28d4d","method":"GET","path":"/contoh/forbidden","status":403,"durasiMs":3.66}}
{"waktu":"2026-11-26T16:31:49.343Z","level":"info","pesan":"request selesai","konteks":{"requestId":"cf1ccaf5-075e-4d08-b1a6-1e08cfcb43e9","method":"GET","path":"/health","status":200,"durasiMs":1.54}}
{"waktu":"2026-11-26T16:32:08.025Z","level":"info","pesan":"payload login diterima","konteks":{"body":{"username":"budi","password":"[REDACTED]"}}}
{"waktu":"2026-11-26T16:32:08.028Z","level":"info","pesan":"request selesai","konteks":{"requestId":"d5b61f31-2be8-4ea2-9f31-84707f6605ff","method":"POST","path":"/contoh/login","status":200,"durasiMs":556.6}}
    curl -i http://localhost:3012/health
    curl -i http://localhost:3012/api/buku
    curl -i http://localhost:3012/api/buku/999
    curl -i http://localhost:3012/contoh/forbidden

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_12\Latihan>curl -i http://localhost:3012/api/buku/999
HTTP/1.1 404 Not Found
X-Request-Id: 241f7473-60d0-4bdd-94d8-b1027a00b4f2
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 144
ETag: W/"90-SzfsqKcoAl7jJ5IgY1h2efc2KDc"
Date: Thu, 26 Nov 2026 16:30:50 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"success":false,"error":{"code":"NOT_FOUND","message":"Buku dengan id 999 tidak ditemukan","requestId":"241f7473-60d0-4bdd-94d8-b1027a00b4f2"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_12\Latihan>curl -i http://localhost:3012/contoh/forbidden
HTTP/1.1 403 Forbidden
X-Request-Id: 60c8ff77-2099-4c09-832b-057527c28d4d
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 152
ETag: W/"98-GNLtRznn50Ghi23eKG2uVk3to1Y"
Date: Thu, 26 Nov 2026 16:31:13 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"success":false,"error":{"code":"FORBIDDEN","message":"Anda tidak memiliki akses ke resource ini.","requestId":"60c8ff77-2099-4c09-832b-057527c28d4d"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_12\Latihan>curl http://localhost:3012/health
{"success":true,"data":{"status":"up"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_12\Latihan>curl -i -X POST http://localhost:3012/contoh/login -H "Content-Type: application/json" -d "{\"username\":\"budi\",\"password\":\"rahasia123\"}"
HTTP/1.1 200 OK
X-Request-Id: d5b61f31-2be8-4ea2-9f31-84707f6605ff
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 50
ETag: W/"32-sChxx7cwVT9rsiw34A0R0uZi6Lk"
Date: Thu, 26 Nov 2026 16:32:08 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"success":true,"data":{"pesan":"login diterima"}}