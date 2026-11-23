# Mini Project UTS — REST API Laboratorium + Auth

Backend REST API dengan pola **route → validator → controller → service → Prisma**.
Domain: **Laboratorium** + **User (Auth)** · Database: **SQLite** · Runtime: **TypeScript/Node.js**.

---

## Prasyarat

| Tool | Versi minimum | Cek |
|------|---------------|-----|
| Node.js | 18 | `node -v` |
| npm | 9 | `npm -v` |
| Git | — | `git --version` |

---

## Cara Menjalankan

```bash
# 1. Install dependency
npm install

# 2. Salin environment
cp .env.example .env
# lalu edit .env dan isi JWT_SECRET (lihat bagian Environment)

# 3. Migrasi database & generate Prisma Client
npx prisma migrate dev --name init
npx prisma generate

# 4. (Opsional) Seed data laboratorium awal
npx prisma db seed

# 5. Jalankan server
npm start
# → API berjalan di http://localhost:3008
```

Mode development (auto-reload saat file berubah):

```bash
npm run dev
```

## Struktur Lapisan

```text
HTTP → Routes → Validators → Controller → Service → Prisma → SQLite
                     │            │            │
                     └─ 400 ◄─────┼── 404 ◄────┘
                                  │
                    ErrorHandler ◄┘
```

| Lapisan | File | Tanggung jawab |
|---------|------|----------------|
| Routes | `src/routes/*.routes.ts` | Definisi endpoint + pasang validator |
| Validators | `src/validators/*.validator.ts` | `typeof` gate + rentang + format + enum |
| Controller | `src/controller/*.controller.ts` | Terjemahkan req/res, kode status |
| Service | `src/service/*.service.ts` | Business logic + Prisma |
| Middleware | `src/middlewares/*` | 404 & error handler di `app.ts` |
| Utils | `src/utils/*` | `ApiError`, envelope `response.ts` |
| Types | `src/types/*` | Type definitions bersama |


## Endpoint

### Auth

| Method | Endpoint | Sukses | Error | Body |
|--------|----------|--------|-------|------|
| POST | `/auth/register` | 201 | 400, 409 | `{ email, password, name? }` |
| POST | `/auth/login` | 200 | 400, 401 | `{ email, password }` |

### Laboratorium

| Method | Endpoint | Sukses | Error |
|--------|----------|--------|-------|
| GET | `/health` | 200 | — |
| GET | `/api/laboratorium` | 200 | 400 |
| GET | `/api/laboratorium/:id` | 200 | 400, 404 |
| POST | `/api/laboratorium` | 201 | 400 |
| PUT | `/api/laboratorium/:id` | 200 | 400, 404 |
| PATCH | `/api/laboratorium/:id` | 200 | 400, 404 |
| DELETE | `/api/laboratorium/:id` | 204 | 400, 404 |

---

## Aturan Validasi Auth

| Field | Aturan |
|-------|--------|
| `email` | wajib string, format email valid, maks. 254 karakter, **unique di database** |
| `password` | wajib string, min. **8**, maks. 100 karakter. Di-hash dengan **bcrypt** (salt rounds 10) sebelum disimpan |
| `name` | opsional, string, maks. 100 karakter |

**Response** register/login **tidak pernah** memuat field `password` — di-mapping eksplisit melalui `toPublicUser()`.

**Anti user enumeration:** login dengan email tidak terdaftar dan password salah sama-sama mengembalikan `401` dengan pesan `"Email atau password salah"`.

---

## Contoh Curl — Auth

### 1. Register → 201

```bash
curl.exe -i -X POST http://localhost:3008/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"cintarahmiai@kampus.ac.id","password":"rahasia123","name":"Cinta"}'
```

Response:

```json
{
    "success":  true,
    "message":  "Registrasi berhasil",
    "data":  {
                 "user":  {
                              "id":  1,
                              "email":  "cintarahmiai@kampus.ac.id",
                              "name":  "Cinta",
                              "createdAt":  "2026-11-20T13:33:53.686Z",
                              "updatedAt":  "2026-11-20T13:33:53.686Z"
                          },
                 "token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJjaW50YXJhaG1pYWlAa2FtcHVzLmFjLmlkIiwiaWF0IjoxNzk1MTgxNjMzLCJleHAiOjE3OTUyNjgwMzN9.gHNaOf_oRulJ4HO9YwzW8BoyWPwHysOE4_28_XX5q7U"
             }
}
```
#perbaikan
```bash
curl.exe -i -X POST http://localhost:3008/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"krating@kampus.ac.id","password":"rahasia321","name":"Krating"}'
```

#hasil perbaikan:
```json
HTTP/1.1 201 Created
X-Powered-By: Express
Location: /auth/users/3
Content-Type: application/json; charset=utf-8
Content-Length: 393
ETag: W/"189-aa+4EbTQ/qEtcEOiz1HqcRK8n1Y"
Date: Mon, 23 Nov 2026 10:10:57 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":true,"message":"Registrasi berhasil","data":{"user":{"id":3,"email":"krating@kampus.ac.id","name":"Krating","createdAt":"2026-11-23T10:10:57.496Z","updatedAt":"2026-11-23T10:10:57.496Z"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwiZW1haWwiOiJrcmF0aW5nQGthbXB1cy5hYy5pZCIsImlhdCI6MTc5NTQyODY1NywiZXhwIjoxNzk1NTE1MDU3fQ.s3sUr8y1-xgt-PYw8HCQC0WIpLC81uXmpDmxYBG_g4c"}}
```
### 2. Register email duplikat → 409

```bash
curl.exe -i -X POST http://localhost:3008/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"cintarahmia@kampus.ac.id","password":"rahasia123"}'
```

Response:

```json
{"success":false,"message":"Email sudah terdaftar","errors":[{"field":"email","message":"email sudah digunakan"}]}
```

### 3. Register tidak valid → 400

```bash
curl.exe -i -X POST http://localhost:3008/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"bukan-email","password":"123"}'
```

Response:

```json
{"success":false,"message":"Validasi input gagal","errors":[{"field":"email","message":"format email tidak valid"},{"field":"password","message":"password minimal 8 karakter"}]}
```

### 4. Login benar → 200

```bash
curl.exe -i -X POST http://localhost:3008/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"cintarahmiai@kampus.ac.id","password":"rahasia123"}'
```

Response:

```json
{
    "success":  true,
    "message":  "Login berhasil",
    "data":  {
                 "user":  {
                              "id":  1,
                              "email":  "cintarahmiai@kampus.ac.id",
                              "name":  "Cinta",
                              "createdAt":  "2026-11-20T13:33:53.686Z",
                              "updatedAt":  "2026-11-20T13:33:53.686Z"
                          },
                 "token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJjaW50YXJhaG1pYWlAa2FtcHVzLmFjLmlkIiwiaWF0IjoxNzk1MTgyMjg0LCJleHAiOjE3OTUyNjg2ODR9.fXz8pwOccZSxBEEW_wouQIcatuhSVJivUNjL0j84LH4"
             }
}
```

### 5. Login salah (email atau password) → 401

```bash
curl -i -X POST http://localhost:3008/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"cintarahmiai@kampus.ac.id","password":"salah"}'
```

Response:

```json
{"success":false,"message":"Email atau password salah"}
```

### 6. Body bukan objek JSON → 400

```bash
curl -i -X POST http://localhost:3008/auth/register \
  -H "Content-Type: application/json" \
  -d '["admin@kampus.ac.id","rahasia123"]'
```

Response:

```json
{"success":false,"message":"Validasi input gagal","errors":[{"field":"body","message":"body wajib berupa objek JSON"}]}
```

---

## Contoh Curl — Laboratorium

### 1. Health check → 200

```bash
curl.exe -i http://localhost:3008/health
```
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 90
ETag: W/"5a-2cqf4XBfsVMINt74vdsPGhfroz4"
Date: Fri, 20 Nov 2026 13:46:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":true,"status":"ok","uptime":322.6537772,"timestamp":"2026-11-20T13:46:55.570Z"}
```

### 2. Daftar semua → 200

```bash
curl.exe -i http://localhost:3008/api/laboratorium
```

```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 736
ETag: W/"2e0-+SQo3UXD+iNcQ3/8JyM2XeD3pU4"
Date: Fri, 20 Nov 2026 13:49:51 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "success": true,
  "message": "Daftar laboratorium berhasil diambil",
  "data": [
    {
      "id": 1,
      "nama": "Lab Rekayasa Perangkat Lunak",
      "kapasitas": 40,
      "lokasi": "Gedung A Lantai 2",
      "status": "tersedia",
      "createdAt": "2026-11-20T13:49:41.281Z",
      "updatedAt": "2026-11-20T13:49:41.281Z"
    },
    {
      "id": 2,
      "nama": "Lab Jaringan Komputer",
      "kapasitas": 30,
      "lokasi": "Gedung B Lantai 1",
      "status": "tersedia",
      "createdAt": "2026-11-20T13:49:41.281Z",
      "updatedAt": "2026-11-20T13:49:41.281Z"
    },
    {
      "id": 3,
      "nama": "Lab Multimedia",
      "kapasitas": 25,
      "lokasi": "Gedung C Lantai 3",
      "status": "perbaikan",
      "createdAt": "2026-11-20T13:49:41.281Z",
      "updatedAt": "2026-11-20T13:49:41.281Z"
    }
  ],
  "meta": {
    "total": 3,
    "filter": {
      "status": null,
      "minKapasitas": null,
      "search": null
    },
    "sort": {
      "sortBy": "id",
      "order": "asc"
    }
  }
}
```
### 3. Daftar dengan filter → 200

```bash
curl.exe -i "http://localhost:3008/api/laboratorium?status=tersedia&minKapasitas=30"
```

```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 564
ETag: W/"234-xAuf+kdZvk8kGPP/jtM7hpJqYWI"
Date: Fri, 20 Nov 2026 13:51:02 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "success": true,
  "message": "Daftar laboratorium berhasil diambil",
  "data": [
    {
      "id": 1,
      "nama": "Lab Rekayasa Perangkat Lunak",
      "kapasitas": 40,
      "lokasi": "Gedung A Lantai 2",
      "status": "tersedia",
      "createdAt": "2026-11-20T13:49:41.281Z",
      "updatedAt": "2026-11-20T13:49:41.281Z"
    },
    {
      "id": 2,
      "nama": "Lab Jaringan Komputer",
      "kapasitas": 30,
      "lokasi": "Gedung B Lantai 1",
      "status": "tersedia",
      "createdAt": "2026-11-20T13:49:41.281Z",
      "updatedAt": "2026-11-20T13:49:41.281Z"
    }
  ],
  "meta": {
    "total": 2,
    "filter": {
      "status": "tersedia",
      "minKapasitas": 30,
      "search": null
    },
    "sort": {
      "sortBy": "id",
      "order": "asc"
    }
  }
}
```
### 4. Detail → 200 / tidak ada → 404

```bash
curl.exe -i http://localhost:3008/api/laboratorium/1
curl.exe -i http://localhost:3008/api/laboratorium/999999
```
```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 244
ETag: W/"f4-AoTZYvWqt18NMeAXQMpbSm7kWu4"
Date: Fri, 20 Nov 2026 13:52:04 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":true,"message":"Detail laboratorium","data":{"id":1,"nama":"Lab Rekayasa Perangkat Lunak","kapasitas":40,"lokasi":"Gedung A Lantai 2","status":"tersedia","createdAt":"2026-11-20T13:49:41.281Z","updatedAt":"2026-11-20T13:49:41.281Z"}}
```

```json
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 75
ETag: W/"4b-obQ24rVvEsOt0AlzeRSxUcyeZQA"
Date: Fri, 20 Nov 2026 13:52:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Laboratorium dengan id 999999 tidak ditemukan"}
```
### 5. Create → 201

```bash
curl.exe -i -X POST http://localhost:3008/api/laboratorium \
  -H "Content-Type: application/json" \
  -d '{"nama":"Lab AI","kapasitas":35,"lokasi":"Gedung D Lantai 4"}'
```

```json
{
    "success":  true,
    "message":  "Laboratorium berhasil dibuat",
    "data":  {
                 "id":  4,
                 "nama":  "Lab AI",
                 "kapasitas":  35,
                 "lokasi":  "Gedung D Lantai 4",
                 "status":  "tersedia",
                 "createdAt":  "2026-11-20T13:54:47.734Z",
                 "updatedAt":  "2026-11-20T13:54:47.734Z"
             }
}
```

### 6. Create tidak valid → 400

```bash
curl -i -X POST http://localhost:3008/api/laboratorium \
  -H "Content-Type: application/json" \
  -d '{"nama":"ab","kapasitas":"35","lokasi":""}'
```
```json
{"success":false,"message":"Validasi input gagal","errors":[{"field":"nama","message":"nama minimal 3 karakter"},{"field":"kapasitas","message":"kapasitas wajib bertipe number (diterima: string)"},{"field":"lokasi","message":"lokasi wajib berupa string tidak kosong"}]}
```
### 7. Update sebagian → 200

```bash
curl.exe -i -X PATCH http://localhost:3008/api/laboratorium/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"perbaikan"}'
```
```json
{
    "success":  true,
    "message":  "Laboratorium berhasil diperbarui sebagian",
    "data":  {
                 "id":  1,
                 "nama":  "Lab Rekayasa Perangkat Lunak",
                 "kapasitas":  40,
                 "lokasi":  "Gedung A Lantai 2",
                 "status":  "perbaikan",
                 "createdAt":  "2026-11-20T13:49:41.281Z",
                 "updatedAt":  "2026-11-20T13:56:52.726Z"
             }
}
```
### 8. Delete → 204

```bash
curl.exe -i -X DELETE http://localhost:3008/api/laboratorium/3
```
```json
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Fri, 20 Nov 2026 13:57:21 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

#perbaikan:
```bash
curl.exe -i -X DELETE http://localhost:3008/api/laboratorium/1
```

```json
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Mon, 23 Nov 2026 10:13:53 GMT
Connection: keep-alive
Keep-Alive: timeout=5

```
---

## Uji Persistensi

```bash
# Buat data
curl.exe -X POST http://localhost:3008/api/laboratorium \
  -H "Content-Type: application/json" \
  -d '{"nama":"Lab Uji","kapasitas":10,"lokasi":"Gedung Uji"}'

hasil:
```json
{
    "success":  true,
    "message":  "Laboratorium berhasil dibuat",
    "data":  {
                 "id":  5,
                 "nama":  "Lab Uji",
                 "kapasitas":  10,
                 "lokasi":  "Gedung Uji",
                 "status":  "tersedia",
                 "createdAt":  "2026-11-20T13:57:53.256Z",
                 "updatedAt":  "2026-11-20T13:57:53.256Z"
             }
}
```

# Matikan server (Ctrl+C), jalankan ulang
npm start

# Data masih ada → bukti persistensi SQLite
curl.exe http://localhost:3008/api/laboratorium

```json
{
  "success": true,
  "message": "Daftar laboratorium berhasil diambil",
  "data": [
    {
      "id": 1,
      "nama": "Lab Rekayasa Perangkat Lunak",
      "kapasitas": 40,
      "lokasi": "Gedung A Lantai 2",
      "status": "perbaikan",
      "createdAt": "2026-11-20T13:49:41.281Z",
      "updatedAt": "2026-11-20T13:56:52.726Z"
    },
    {
      "id": 2,
      "nama": "Lab Jaringan Komputer",
      "kapasitas": 30,
      "lokasi": "Gedung B Lantai 1",
      "status": "tersedia",
      "createdAt": "2026-11-20T13:49:41.281Z",
      "updatedAt": "2026-11-20T13:49:41.281Z"
    },
    {
      "id": 4,
      "nama": "Lab AI",
      "kapasitas": 35,
      "lokasi": "Gedung D Lantai 4",
      "status": "tersedia",
      "createdAt": "2026-11-20T13:54:47.734Z",
      "updatedAt": "2026-11-20T13:54:47.734Z"
    },
    {
      "id": 5,
      "nama": "Lab Uji",
      "kapasitas": 10,
      "lokasi": "Gedung Uji",
      "status": "tersedia",
      "createdAt": "2026-11-20T13:57:53.256Z",
      "updatedAt": "2026-11-20T13:57:53.256Z"
    }
  ],
  "meta": {
    "total": 4,
    "filter": {
      "status": null,
      "minKapasitas": null,
      "search": null
    },
    "sort": {
      "sortBy": "id",
      "order": "asc"
    }
  }
}
```


## Uji Hash Password (bukti tidak plaintext)

```bash
npx prisma studio
```

Buka tabel `User` — kolom `password` berisi string bcrypt seperti:

```text
$2a$10$X9h1... (60 karakter)
```

Bukan teks asli password.

---

## Status Code

| Status | Kapan |
|--------|-------|
| 200 | GET / PUT / PATCH / login sukses |
| 201 | POST create (laboratorium/register) sukses |
| 204 | DELETE sukses (tanpa body) |
| 400 | Validasi gagal |
| 401 | Login gagal (email/password salah) |
| 404 | Resource / route tidak ditemukan |
| 409 | Konflik — email sudah terdaftar |
| 500 | Error server |

---

## Skema Database

### `Laboratorium`

| Field | Tipe | Keterangan |
|-------|------|------------|
| `id` | Int | PK, autoincrement |
| `nama` | String | nama laboratorium |
| `kapasitas` | Int | jumlah kursi |
| `lokasi` | String | gedung & lantai |
| `status` | String | default `"tersedia"` — `tersedia` / `digunakan` / `perbaikan` |
| `createdAt` | DateTime | auto |
| `updatedAt` | DateTime | auto |

### `User`

| Field | Tipe | Keterangan |
|-------|------|------------|
| `id` | Int | PK, autoincrement |
| `email` | String | **@unique** — unique constraint level DB |
| `password` | String | bcrypt hash (bukan plaintext) |
| `name` | String? | opsional |
| `createdAt` | DateTime | auto |
| `updatedAt` | DateTime | auto |

---

## Keamanan

| Aspek | Implementasi |
|-------|-------------|
| Hashing password | **bcrypt** (`bcryptjs`), salt rounds 10 |
| Unique email | `@unique` di Prisma + pre-check di service (race-safe) |
| Response tanpa password | `toPublicUser()` mapping eksplisit — field `password` tidak pernah dikirim |
| Anti user enumeration | Login gagal selalu `401 "Email atau password salah"` (tanpa membedakan email tidak ada vs password salah) |
| Validasi tipe | `typeof` gate, tidak ada coercion (`"35"` tidak diterima sebagai number) |
| Validasi format | Regex email + panjang min/max untuk semua field |
| JWT | `HS256`, secret dari `.env`, expiry `1d` (dapat diatur) |
| Secrets | `.env` di `.gitignore`, template di `.env.example` |

---

## Checklist Definition of Done

| # | Kriteria | Cara Verifikasi |
|---|----------|-----------------|
| 1 | Server berjalan tanpa error | `npm start` → `API berjalan di http://localhost:3008` |
| 2 | Database ter-migrate | `npx prisma migrate dev` sukses, `prisma/dev.db` ada |
| 3 | CRUD lengkap | GET list, GET detail, POST (201), PATCH (200), DELETE (204) |
| 4 | Data persisten | Buat → restart → data tetap ada |
| 5 | Validasi berfungsi | `POST {"kapasitas":"35"}` → 400 |
| 6 | Pola berlapis | `src/routes/`, `src/controller/`, `src/service/` terpisah |
| 7 | Auth register & login | `POST /auth/register` → 201, `POST /auth/login` → 200 |
| 8 | Password di-hash | `prisma studio` → kolom password berisi `$2a$10$...` |
| 9 | Email unique | Register email sama dua kali → 409 |
| 10 | Response tanpa password | Response register/login tidak memuat field `password` |
| 11 | README lengkap | Dokumen ini |
| 12 | Git bersih | `node_modules/`, `.env`, `prisma/dev.db` di `.gitignore` |


## Scripts npm

| Script | Fungsi |
|--------|--------|
| `npm run dev` | `tsx watch server.ts` — auto-reload |
| `npm start` | `tsx server.ts` — jalankan server |
| `npm run build` | `tsc` — compile ke `dist/` |
| `npm run prisma:generate` | `prisma generate` |
| `npm run prisma:migrate` | `prisma migrate dev` |
| `npm run prisma:seed` | `prisma db seed` |
| `npm run prisma:studio` | `prisma studio` — GUI database |

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| `JWT_SECRET belum dikonfigurasi` | Isi `JWT_SECRET` di `.env` (min. 32 karakter) |
| `Environment variable not found: DATABASE_URL` | `cp .env.example .env` |
| Port 3008 sudah dipakai | Ganti `PORT` di `.env` atau matikan proses yang memakai port |
| Email tidak unik di DB | Jalankan `npx prisma migrate dev` ulang; pastikan `email String @unique` ada di schema |
| Token expired | Login ulang untuk mendapat token baru, atau perbesar `JWT_EXPIRES_IN` |