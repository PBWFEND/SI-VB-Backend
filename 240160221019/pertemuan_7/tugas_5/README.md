# TUGAS 5
# CRUD REST API DENGAN POLA SERVICE/CONTROLLER

Implementasi CRUD REST API menggunakan Express, TypeScript, dan Prisma ORM dengan database SQLite serta menerapkan pola arsitektur berlapis (*Layered Architecture*).

**Nama:** Kikan Khairani  
**NPM:** 240160221019  
**Kelas:** SI 2B  
**Mata Kuliah:** Pemrograman Backend

---

## ✨ Fitur Utama

- **Layered Architecture** — Route → Controller → Service → Prisma.
- **Validasi Input** — Memeriksa tipe data, format, dan field wajib.
- **Status Code** — Menggunakan status code HTTP yang sesuai, yaitu 200, 201, 204, 400, 404, dan 500.
- **Response Seragam** — Menggunakan format `{ success, message, data? }`.
- **Middleware 404** — Menangani endpoint yang tidak ditemukan.
- **Error Handler Global** — Menangani kesalahan pada server.
- **CRUD Lengkap** — Mendukung GET, POST, PATCH, dan DELETE.
- **Filter Pengguna** — Mendukung pencarian berdasarkan NIM menggunakan query parameter.

## 🏗 Struktur Lapisan

```text
tugas_5/
│
├── app.ts
├── server.ts
├── client.ts
├── prisma.config.ts
├── .env
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   ├── dev.db
│   └── generated/
│
└── src/
    ├── routes/
    │   └── pengguna.routes.ts
    │
    ├── controller/
    │   └── pengguna.controller.ts
    │
    └── service/
        └── pengguna.service.ts
```

| Lapisan | File | Tanggung Jawab |
|---|---|---|
| Route | `pengguna.routes.ts` | Memetakan URL ke controller |
| Controller | `pengguna.controller.ts` | Validasi input dan mengatur response |
| Service | `pengguna.service.ts` | Menjalankan proses CRUD |
| Prisma | `client.ts` | Menghubungkan aplikasi dengan database |

## 🔄 Alur Lapisan

1. **Client** mengirimkan HTTP request ke server.
2. **Route** menerima request dan meneruskannya ke controller.
3. **Controller** melakukan validasi terhadap data yang dikirimkan.
4. Jika data valid, controller memanggil service.
5. **Service** menjalankan operasi database menggunakan Prisma ORM.
6. **Prisma** berkomunikasi dengan database SQLite.
7. Hasil proses dikembalikan ke controller.
8. **Controller** mengirimkan HTTP response kepada client.

## 📦 Persyaratan

- Node.js versi 20.19+ / 22.12+ / 24+
- npm
- Express
- TypeScript
- Prisma ORM
- SQLite

Periksa versi Node.js dan npm menggunakan perintah:

```bash
node -v
npm -v
```

## ⚙️ Instalasi

### 1. Install Dependencies

Jalankan perintah berikut pada terminal di dalam folder proyek:

```bash
npm install
```

### 2. Konfigurasi Environment

Buat atau sesuaikan file `.env`:

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3008
```

### 3. Migrasi Database

Jalankan perintah untuk membuat database dan tabel:

```bash
npx prisma migrate dev --name pengguna
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

## 🚀 Cara Menjalankan

Jalankan server menggunakan perintah:

```bash
node --experimental-strip-types server.ts
```

Jika server berhasil dijalankan, terminal akan menampilkan:

```text
CRUD REST API berjalan di http://localhost:3008
```

## 🔌 Endpoint API

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/` | Menampilkan informasi API |
| GET | `/health` | Memeriksa status server |
| GET | `/pengguna` | Mengambil seluruh data pengguna |
| GET | `/pengguna?nim=xxx` | Mengambil data berdasarkan NIM |
| GET | `/pengguna/:nim` | Mengambil detail pengguna |
| POST | `/pengguna` | Menambahkan pengguna baru |
| PATCH | `/pengguna/:nim` | Memperbarui data pengguna |
| DELETE | `/pengguna/:nim` | Menghapus data pengguna |

## 🧪 Contoh cURL Tiap Endpoint

### 1. GET Informasi API

```bash
curl http://localhost:3008/
```

### 2. GET Semua Pengguna

```bash
curl http://localhost:3008/pengguna
```

### 3. GET Filter Berdasarkan NIM

```bash
curl "http://localhost:3008/pengguna?nim=240160221019"
```

### 4. POST Menambahkan Pengguna

```bash
curl -X POST http://localhost:3008/pengguna -H "Content-Type: application/json" -d "{\"nim\":\"240160221019\",\"nama\":\"Kikan Khairani\",\"email\":\"kikan@test.com\",\"role\":\"mahasiswa\"}"
```

### 5. GET Detail Pengguna

```bash
curl http://localhost:3008/pengguna/240160221019
```

### 6. PATCH Memperbarui Pengguna

```bash
curl -X PATCH http://localhost:3008/pengguna/240160221019 -H "Content-Type: application/json" -d "{\"nama\":\"Kikan Khairani\",\"role\":\"asisten\"}"
```

### 7. DELETE Menghapus Pengguna

```bash
curl -X DELETE http://localhost:3008/pengguna/240160221019
```

### 8. Tes Validasi Gagal

```bash
curl -X POST http://localhost:3008/pengguna -H "Content-Type: application/json" -d "{\"nim\":\"\",\"nama\":\"\",\"email\":\"bukan-email\"}"
```

### 9. Tes Pengguna Tidak Ditemukan

```bash
curl http://localhost:3008/pengguna/99999
```

### 10. Tes Endpoint Tidak Ditemukan

```bash
curl http://localhost:3008/endpoint-ngawur
```

## 📊 Status Code

| Status Code | Keterangan |
|---|---|
| 200 | Request berhasil diproses |
| 201 | Data pengguna berhasil dibuat |
| 204 | Data pengguna berhasil dihapus |
| 400 | Data yang dikirim tidak valid |
| 404 | Data atau endpoint tidak ditemukan |
| 500 | Terjadi kesalahan pada server |

## ✅ Aturan Validasi

### POST `/pengguna`

| Field | Tipe Data | Aturan |
|---|---|---|
| nim | String | Wajib diisi dan harus unik |
| nama | String | Wajib diisi dan tidak boleh kosong |
| email | String | Wajib diisi, format harus valid, dan unik |
| role | String | Opsional, default `mahasiswa` |

### PATCH `/pengguna/:nim`

| Field | Aturan |
|---|---|
| nama | Jika dikirim, harus berupa string dan tidak kosong |
| email | Jika dikirim, harus memiliki format email valid |
| role | Jika dikirim, harus berupa string |

## 📋 Hasil Pengujian

Pengujian dilakukan menggunakan Node.js dan cURL melalui terminal PowerShell. Server dijalankan menggunakan perintah `node --experimental-strip-types server.ts`.

```text
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_7\tugas_5>node --experimental-strip-types server.ts

CRUD REST API berjalan di http://localhost:3008

[2026-11-02T09:44:31.420Z] GET /
[2026-11-02T09:45:20.105Z] GET /pengguna
[2026-11-02T09:46:25.173Z] POST /pengguna
[2026-11-02T09:46:44.017Z] GET /pengguna
```

### 1. GET Informasi API

```text
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_7\tugas_5>curl http://localhost:3008/

{"success":true,"message":"CRUD REST API — Tugas 5","data":{"resources":["pengguna"],"endpoints":["GET /pengguna","GET /pengguna/:nim","POST /pengguna","PATCH /pengguna/:nim","DELETE /pengguna/:nim"]}}
```

### 2. GET Daftar Pengguna

```text
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_7\tugas_5>curl http://localhost:3008/pengguna

{"success":true,"message":"Daftar pengguna berhasil diambil","data":{"total":0,"data":[]}}
```

### 3. POST Menambahkan Pengguna

```text
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_7\tugas_5>curl -X POST http://localhost:3008/pengguna -H "Content-Type: application/json" -d "{\"nim\":\"240160221019\",\"nama\":\"Kikan Khairani\",\"email\":\"kikan@test.com\",\"role\":\"mahasiswa\"}"

{"success":false,"message":"Terjadi kesalahan pada server"}
```

Pada pengujian ini, proses POST masih menghasilkan error 500 sehingga data pengguna belum berhasil tersimpan ke database.

### 4. GET Daftar Pengguna Setelah POST

```text
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_7\tugas_5>curl http://localhost:3008/pengguna

{"success":true,"message":"Daftar pengguna berhasil diambil","data":{"total":0,"data":[]}}
```

### 5. GET Filter Berdasarkan NIM

```text
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_7\tugas_5>curl "http://localhost:3008/pengguna?nim=240160221019"

{"success":true,"message":"Daftar pengguna berhasil diambil","data":{"total":0,"data":[]}}
```

### 6. GET Detail Pengguna

```text
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_7\tugas_5>curl http://localhost:3008/pengguna/240160221019

{"success":false,"message":"Pengguna tidak ditemukan"}
```

### 7. PATCH Pengguna yang Tidak Ditemukan

```text
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_7\tugas_5>curl -X PATCH http://localhost:3008/pengguna/12345 -H "Content-Type: application/json" -d "{\"nama\":\"Kikan Khairani\",\"role\":\"asisten\"}"

{"success":false,"message":"Pengguna tidak ditemukan"}
```

### 8. DELETE Pengguna yang Tidak Ditemukan

```text
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_7\tugas_5>curl -X DELETE http://localhost:3008/pengguna/12345

{"success":false,"message":"Pengguna tidak ditemukan"}
```

### 9. PATCH Pengguna

Pengujian ini perlu dilakukan setelah data pengguna berhasil ditambahkan ke database.

```text
curl -X PATCH http://localhost:3008/pengguna/240160221019 -H "Content-Type: application/json" -d "{\"nama\":\"Kikan Khairani\",\"role\":\"asisten\"}"
```

### 10. DELETE Pengguna

Pengujian ini perlu dilakukan setelah data pengguna tersedia di database.

```text
curl -X DELETE http://localhost:3008/pengguna/240160221019
```

### 11. GET Pengguna yang Tidak Ditemukan

```text
curl http://localhost:3008/pengguna/99999

{"success":false,"message":"Pengguna tidak ditemukan"}
```

### 12. POST dengan Data Tidak Valid

```text
curl -X POST http://localhost:3008/pengguna -H "Content-Type: application/json" -d "{\"nim\":\"\",\"nama\":\"\",\"email\":\"bukan-email\"}"

{"success":false,"message":"Data pengguna tidak valid","details":["Field nim wajib diisi","Field nama wajib diisi","Field email harus berformat email valid"]}
```

### 13. GET Endpoint Tidak Ditemukan

```text
curl http://localhost:3008/endpoint-ngawur

{"success":false,"message":"Endpoint tidak ditemukan"}
```

---

**Kesimpulan**

Berdasarkan pengujian, server CRUD REST API berhasil dijalankan pada port 3008. Endpoint GET daftar pengguna dapat mengakses database SQLite, sedangkan pengujian validasi dan penanganan data yang tidak ditemukan menunjukkan response yang sesuai. Namun, proses POST masih mengalami error 500 sehingga proses penyimpanan data belum berhasil. Oleh karena itu, pengujian PATCH dan DELETE dengan data pengguna yang tersedia perlu dilanjutkan setelah masalah POST diperbaiki.