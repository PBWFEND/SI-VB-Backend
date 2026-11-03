# Tugas 5 — CRUD REST API dengan Pola Service/Controller

Implementasi CRUD REST API untuk resource **`pengguna`** menggunakan **Express**, **TypeScript**, dan **Prisma ORM** di atas database **SQLite**, dengan **arsitektur berlapis**.

Nama    : Aprilliana FRatiwi
NPM     : 240160221004
Kelas   : SI - VB

---

## 📚 Daftar Isi
1. [Fitur Utama](#-fitur-utama)
2. [Struktur Lapisan](#-struktur-lapisan)
3. [Alur Lapisan](#-alur-lapisan)
4. [Persyaratan](#-persyaratan)
5. [Instalasi](#-instalasi)
6. [Cara Menjalankan](#-cara-menjalankan)
7. [Endpoint API](#-endpoint-api)
8. [Contoh cURL Tiap Endpoint](#-contoh-curl-tiap-endpoint)
9. [Status Code](#-status-code)

---

## ✨ Fitur Utama

- ✅ **Layered Architecture** — Route → Controller → Service → Prisma
- ✅ **Validasi Input** di controller (tipe, format, field wajib)
- ✅ **Status Code** tepat: 200, 201, 204, 400, 404, 500
- ✅ **Response Seragam**: `{ success, message, data? }`
- ✅ **Middleware 404** dan **Error Handler** global
- ✅ **CRUD Lengkap**: GET, POST, PATCH, DELETE
- ✅ **Filter opsional** `?nim=` untuk endpoint daftar

---

## 🏗 Struktur Lapisan

app.ts
  └── src/routes/pengguna.routes.ts
        └── src/controller/pengguna.controller.ts
              └── src/service/pengguna.service.ts
                    └── client.ts (Prisma)
```

| Lapisan | File | Tanggung Jawab |
|---------|------|----------------|
| Route | `src/routes/pengguna.routes.ts` | Petakan URL → handler |
| Controller | `src/controller/pengguna.controller.ts` | Validasi + status + response |
| Service | `src/service/pengguna.service.ts` | Query Prisma |
| Client | `client.ts` | Singleton Prisma Client |

## 🔄 Alur Lapisan

1. Client kirim HTTP request (mis. `POST /pengguna`).
2. **Route** meneruskan ke **Controller**.
3. **Controller** validasi input:
   - Invalid → `400` dengan detail error.
   - Valid → panggil **Service**.
4. **Service** jalankan query Prisma.
5. **Controller** bentuk response `{ success, message, data }`.
6. Client terima response.

## 📦 Persyaratan

- Node.js 20.19+ / 22.12+ / 24+
- npm
- Windows / macOS / Linux

```bash
node -v
npm -v
```

---

## ⚙️ Instalasi

### 1. Install dependencies
```bash
npm install
```

### 2. Konfigurasi `.env`
```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3008
```

### 3. Migrasi database
```bash
npx prisma migrate dev --name pengguna
```

### 4. Generate Prisma Client
```bash
npx prisma generate
```

---

## 🚀 Cara Menjalankan

```bash
npm run dev
```

Atau:

```bash
node --experimental-strip-types server.ts
```

Jika berhasil:
```
CRUD REST API berjalan di http://localhost:3008
```

---

## 🔌 Endpoint API

| Method | Endpoint | Deskripsi | Sukses |
|--------|----------|-----------|--------|
| GET | `/` | Info API | 200 |
| GET | `/health` | Health check | 200 |
| GET | `/pengguna` | Daftar pengguna | 200 |
| GET | `/pengguna?nim=xxx` | Filter NIM | 200 |
| GET | `/pengguna/:nim` | Detail pengguna | 200 |
| POST | `/pengguna` | Buat pengguna | 201 |
| PATCH | `/pengguna/:nim` | Update sebagian | 200 |
| DELETE | `/pengguna/:nim` | Hapus pengguna | 204 |

---

## 🧪 Contoh cURL Tiap Endpoint

> **Windows CMD**: escape `"` dalam JSON dengan `\"`.

### 1. Info API
```bash
curl http://localhost:3008/
```

### 2. GET semua pengguna
```bash
curl http://localhost:3008/pengguna
```
Response (200):
```json
{ "success": true, "message": "Daftar pengguna berhasil diambil", "data": { "total": 0, "data": [] } }
```

### 3. GET filter NIM
```bash
curl "http://localhost:3008/pengguna?nim=12345"
```

### 4. POST buat pengguna
```bash
curl -X POST http://localhost:3008/pengguna -H "Content-Type: application/json" -d "{\"nim\":\"12345\",\"nama\":\"Budi\",\"email\":\"budi@example.com\",\"role\":\"mahasiswa\"}"
```
Response (201):
```json
{
  "success": true,
  "message": "Pengguna berhasil dibuat",
  "data": { "id": 1, "nim": "12345", "nama": "Budi", "email": "budi@example.com", "role": "mahasiswa" }
}
```

### 5. GET detail pengguna
```bash
curl http://localhost:3008/pengguna/12345
```

### 6. PATCH update nama
```bash
curl -X PATCH http://localhost:3008/pengguna/12345 -H "Content-Type: application/json" -d "{\"nama\":\"Budi Santoso\"}"
```

### 7. DELETE pengguna
```bash
curl -X DELETE http://localhost:3008/pengguna/12345
```
Response: **204 No Content** (body kosong).

### 8. Tes validasi gagal (400)
```bash
curl -X POST http://localhost:3008/pengguna -H "Content-Type: application/json" -d "{\"nim\":\"\",\"nama\":\"\",\"email\":\"bukan-email\"}"
```
Response:
```json
{
  "success": false,
  "message": "Data pengguna tidak valid",
  "details": [
    "Field nim wajib diisi",
    "Field nama wajib diisi",
    "Field email harus berformat email valid"
  ]
}
```

### 9. Tes 404 (NIM tidak ada)
```bash
curl http://localhost:3008/pengguna/99999
```
Response:
```json
{ "success": false, "message": "Pengguna tidak ditemukan" }
```

### 10. Tes 404 (endpoint ngawur)
```bash
curl http://localhost:3008/endpoint-ngawur
```
Response:
```json
{ "success": false, "message": "Endpoint tidak ditemukan" }
```

---

## 📊 Status Code

| Kode | Kapan Dipakai |
|------|---------------|
| **200** | GET, PATCH berhasil |
| **201** | POST berhasil membuat resource |
| **204** | DELETE berhasil (tanpa body) |
| **400** | Validasi gagal / duplikat NIM-email |
| **404** | Resource atau endpoint tidak ada |
| **500** | Error tak terduga |

---

## ✅ Aturan Validasi

### POST `/pengguna` — semua wajib
| Field | Tipe | Aturan |
|-------|------|--------|
| `nim` | string | Wajib, tidak kosong, unik |
| `nama` | string | Wajib, tidak kosong |
| `email` | string | Wajib, harus ada `@`, unik |
| `role` | string | Opsional, default `"mahasiswa"` |

### PATCH `/pengguna/:nim` — semua opsional
| Field | Aturan |
|-------|--------|
| `nama` | Bila dikirim, wajib string tidak kosong |
| `email` | Bila dikirim, wajib ada `@` |
| `role` | Bila dikirim, wajib string |

---

## 🛠 hasil Pengujian
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>node --experimental-strip-types server.ts
CRUD REST API berjalan di http://localhost:3008
[2026-10-16T09:44:31.420Z] GET /
[2026-10-16T09:45:20.105Z] GET /pengguna
[2026-10-16T09:46:25.173Z] POST /pengguna
[2026-10-16T09:46:44.017Z] GET /pengguna
[2026-10-16T09:47:03.374Z] GET /pengguna?nim=12345
[2026-10-16T09:47:39.858Z] GET /pengguna/240160221004
[2026-10-16T09:48:30.055Z] PATCH /pengguna/12345
[2026-10-16T09:49:21.396Z] DELETE /pengguna/12345
[2026-10-16T09:50:58.827Z] PATCH /pengguna/240160221004
[2026-10-16T09:51:20.909Z] DELETE /pengguna/240160221004
[2026-10-16T09:51:50.727Z] GET /pengguna
[2026-10-16T09:52:06.314Z] GET /pengguna/99999
[2026-10-16T09:52:28.791Z] POST /pengguna
[2026-10-16T09:52:46.418Z] GET /endpoint-ngawur

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl http://localhost:3008/
{"success":true,"message":"CRUD REST API ΓÇö Tugas 5","data":{"resources":["pengguna"],"endpoints":["GET    /pengguna","GET    /pengguna/:nim","POST   /pengguna","PATCH  /pengguna/:nim","DELETE /pengguna/:nim"]}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl http://localhost:3008/pengguna
{"success":true,"message":"Daftar pengguna berhasil diambil","data":{"total":0,"data":[]}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl -X POST http://localhost:3008/pengguna -H "Content-Type: application/json" -d "{\"nim\":\"240160221004\",\"nama\":\"Aprilliana Fratiwi\",\"email\":\"aprillianafratiwi22@example.com\",\"role\":\"mahasiswa\"}"
{"success":true,"message":"Pengguna berhasil dibuat","data":{"id":1,"nim":"240160221004","nama":"Aprilliana Fratiwi","email":"aprillianafratiwi22@example.com","role":"mahasiswa"}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl http://localhost:3008/pengguna
{"success":true,"message":"Daftar pengguna berhasil diambil","data":{"total":1,"data":[{"id":1,"nim":"240160221004","nama":"Aprilliana Fratiwi","email":"aprillianafratiwi22@example.com","role":"mahasiswa"}]}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl "http://localhost:3008/pengguna?nim=12345"
{"success":true,"message":"Daftar pengguna berhasil diambil","data":{"total":0,"data":[]}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl http://localhost:3008/pengguna/240160221004
{"success":true,"message":"Detail pengguna berhasil diambil","data":{"id":1,"nim":"240160221004","nama":"Aprilliana Fratiwi","email":"aprillianafratiwi22@example.com","role":"mahasiswa"}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl -X PATCH http://localhost:3008/pengguna/12345 -H "Content-Type: application/json" -d "{\"nama\":\"William Jakrapatr\",\"role\":\"asisten\"}"
{"success":false,"message":"Pengguna tidak ditemukan"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl -X DELETE http://localhost:3008/pengguna/12345
{"success":false,"message":"Pengguna tidak ditemukan"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl -X PATCH http://localhost:3008/pengguna/240160221004 -H "Content-Type: application/json" -d "{\"nama\":\"Aprilliana Fratiwi\",\"role\":\"asisten\"}"
{"success":true,"message":"Pengguna berhasil diperbarui","data":{"id":1,"nim":"240160221004","nama":"Aprilliana Fratiwi","email":"aprillianafratiwi22@example.com","role":"asisten"}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl -X DELETE http://localhost:3008/pengguna/240160221004

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl http://localhost:3008/pengguna
{"success":true,"message":"Daftar pengguna berhasil diambil","data":{"total":0,"data":[]}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl http://localhost:3008/pengguna/99999
{"success":false,"message":"Pengguna tidak ditemukan"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl -X POST http://localhost:3008/pengguna -H "Content-Type: application/json" -d "{\"nim\":\"\",\"nama\":\"\",\"email\":\"bukan-email\"}"
{"success":false,"message":"Data pengguna tidak valid","details":["Field nim wajib diisi","Field nama wajib diisi","Field email harus berformat email valid"]}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_07\Tugas-5>curl http://localhost:3008/endpoint-ngawur
{"success":false,"message":"Endpoint tidak ditemukan"}