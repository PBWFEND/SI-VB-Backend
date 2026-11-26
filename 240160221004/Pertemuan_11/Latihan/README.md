# Prak Backend Pertemuan 11 - Secure API

Project ini mendemonstrasikan pembuatan REST API menggunakan Express.js, Prisma ORM (SQLite), dan penerapan lapisan keamanan (Helmet, CORS, Rate Limiting, Validasi Input).

Nama    : Aprilliana Fratiwi
NPM     : 240160221004
Kelas   : SI -VB

## Prasyarat
- Node.js >= 22.12.0
- npm

## Instalasi & Menjalankan

1. Clone & Install
   npm install

2. Jalankan Server
   - Development: npm run dev
   - Production: npm start
   Server berjalan di http://localhost:3011.

## Endpoint API

| Method | Endpoint    | Deskripsi                                      |
|--------|-------------|------------------------------------------------|
| GET    | /health     | Cek status server                              |
| GET    | /api/buku   | Daftar buku (bisa filter ?judul= & ?minStok=)  |
| POST   | /api/buku   | Tambah buku baru                               |

### Contoh Request

Tambah Buku (POST /api/buku)
{
  "judul": "Belajar Node.js",
  "penulis": "Budi",
  "stok": 10
}

Daftar Buku dengan Filter (GET /api/buku?minStok=5)
curl http://localhost:3011/api/buku?minStok=5

## BUKTI PENGUJIAN
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_11\Latihan>npm start

> prak-backend-pertemuan-11@1.0.0 start
> node --experimental-strip-types server.ts

Secure API berjalan di http://localhost:3011

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_11\Latihan>curl -i http://localhost:3011/health
HTTP/1.1 200 OK
X-Request-Id: 64cc9d16-85ea-4413-a046-333fcec0c509
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
RateLimit-Policy: 20;w=15
RateLimit: limit=20, remaining=19, reset=15
Content-Type: application/json; charset=utf-8
Content-Length: 39
ETag: W/"27-dE3pEt0jfQVEnGSsNyLOFGVk2rA"
Date: Thu, 26 Nov 2026 17:21:30 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"success":true,"data":{"status":"up"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_11\Latihan>curl -X POST http://localhost:3011/api/buku -H "Content-Type: application/json" -d "{\"judul\":\"Belajar Node.js\",\"penulis\":\"Budi\",\"stok\":5}"
{"success":true,"message":"Buku dibuat","data":{"id":1,"judul":"Belajar Node.js","penulis":"Budi","stok":5,"createdAt":"2026-11-26T17:22:58.414Z"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_11\Latihan>curl -i http://localhost:3011/api/buku
HTTP/1.1 200 OK
X-Request-Id: 30630dc2-d619-4d14-8b00-7762cdb60f6a
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
RateLimit-Policy: 20;w=15
RateLimit: limit=20, remaining=19, reset=15
Content-Type: application/json; charset=utf-8
Content-Length: 149
ETag: W/"95-1GfYUaU0+4WH09rbarN999946xw"
Date: Thu, 26 Nov 2026 17:23:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{"success":true,"message":"Daftar buku","data":[{"id":1,"judul":"Belajar Node.js","penulis":"Budi","stok":5,"createdAt":"2026-11-26T17:22:58.414Z"}]}

## Fitur Keamanan

1. Security Headers (Helmet): Mengatur header HTTP untuk mencegah XSS, Clickjacking, dll.
2. CORS Terbatas: Hanya mengizinkan origin yang terdaftar di .env.
3. Rate Limiting: Membatasi 20 request per 15 detik per IP (bisa dikonfigurasi).
4. Validasi Input Ketat: Memvalidasi tipe data, panjang karakter, dan rentang angka pada Body & Query String.
5. Error Handling Aman: Tidak membocorkan detail internal (stack trace/database) ke client.
6. Request ID: Menambahkan X-Request-Id pada setiap response untuk memudahkan tracing log.
