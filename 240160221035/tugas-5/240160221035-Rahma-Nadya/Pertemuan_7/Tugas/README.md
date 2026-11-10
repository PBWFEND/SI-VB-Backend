# Tugas 5 — CRUD REST API dengan Pola Service/Controller

## Identitas Mahasiswa

- **Nama:** Rahma Nadya
- **NIM:** 240160221035
- **Mata Kuliah:** Praktikum Backend

## Deskripsi

Project ini merupakan pengembangan API Absensi Organisasi dari Tugas 4 menggunakan Express.js, Prisma ORM, SQLite, dan TypeScript.

Pada Tugas 5, struktur kode dikembangkan menggunakan pola Service/Controller agar pengelolaan request, proses bisnis, dan akses database terpisah dengan lebih teratur.

API menyediakan operasi CRUD untuk dua resource, yaitu Anggota dan Absensi.

## Teknologi

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite
- Postman

## Struktur Proyek

```text
Tugas/
├── src/
│   ├── routes/
│   │   ├── anggota.routes.ts
│   │   └── absensi.routes.ts
│   ├── controller/
│   │   ├── anggota.controller.ts
│   │   └── absensi.controller.ts
│   ├── service/
│   │   ├── anggota.service.ts
│   │   └── absensi.service.ts
│   └── prisma.ts
├── prisma/
│   ├── generated/
│   ├── migrations/
│   ├── dev.db
│   └── schema.prisma
├── app.ts
├── server.ts
├── package.json
├── prisma.config.ts
├── .env
└── README.md
```

## Arsitektur Service/Controller

Alur request API:

1. **Routes:** menerima dan mengarahkan request berdasarkan endpoint.
2. **Controller:** memvalidasi input, memanggil Service, dan mengirim response.
3. **Service:** menjalankan operasi database menggunakan Prisma ORM.
4. **Prisma:** menghubungkan aplikasi dengan database SQLite.

File `app.ts` digunakan untuk menggabungkan routes, middleware 404, dan error handler. File `server.ts` digunakan untuk menjalankan server.

## Cara Menjalankan

Pastikan Node.js sudah terinstal.

Instal dependensi:

```bash
npm install
```

Generate Prisma Client:

```bash
npm run prisma:generate
```

Jalankan server:

```bash
npm start
```

API berjalan pada:

```text
http://localhost:3000
```

## Daftar Endpoint

### Resource Anggota

| Method | Endpoint | Fungsi | Status |
|---|---|---|---|
| GET | `/anggota` | Mengambil semua anggota | 200 |
| GET | `/anggota/:id` | Mengambil detail anggota | 200 |
| POST | `/anggota` | Menambahkan anggota | 201 |
| PATCH | `/anggota/:id` | Mengubah sebagian data anggota | 200 |
| DELETE | `/anggota/:id` | Menghapus anggota | 204 |

### Resource Absensi

| Method | Endpoint | Fungsi | Status |
|---|---|---|---|
| GET | `/absensi` | Mengambil semua absensi | 200 |
| GET | `/absensi?anggota_id=1&status=Hadir` | Filter absensi | 200 |
| GET | `/absensi/:id` | Mengambil detail absensi | 200 |
| POST | `/absensi` | Menambahkan absensi | 201 |
| PUT | `/absensi/:id` | Mengganti seluruh data absensi | 200 |
| PATCH | `/absensi/:id` | Mengubah sebagian data absensi | 200 |
| DELETE | `/absensi/:id` | Menghapus absensi | 204 |

## Contoh Pengujian dengan cURL

Gunakan `curl.exe` pada Windows PowerShell.

### 1. GET halaman utama

```bash
curl.exe http://localhost:3000/
```

### 2. GET semua anggota

```bash
curl.exe http://localhost:3000/anggota
```

### 3. GET detail anggota

```bash
curl.exe http://localhost:3000/anggota/1
```

### 4. POST anggota

```bash
curl.exe -X POST http://localhost:3000/anggota -H "Content-Type: application/json" -d "{\"nama\":\"Budi Santoso\",\"nim\":\"240160221099\"}"
```

### 5. PATCH anggota

```bash
curl.exe -X PATCH http://localhost:3000/anggota/1 -H "Content-Type: application/json" -d "{\"nama\":\"Budi Santoso Update\"}"
```

### 6. DELETE anggota

```bash
curl.exe -X DELETE http://localhost:3000/anggota/1
```

### 7. GET semua absensi

```bash
curl.exe http://localhost:3000/absensi
```

### 8. GET filter absensi

```bash
curl.exe "http://localhost:3000/absensi?anggota_id=1&status=Hadir"
```

### 9. GET detail absensi

```bash
curl.exe http://localhost:3000/absensi/1
```

### 10. POST absensi

```bash
curl.exe -X POST http://localhost:3000/absensi -H "Content-Type: application/json" -d "{\"anggota_id\":1,\"kegiatan_id\":1,\"status\":\"Hadir\"}"
```

### 11. PUT absensi

```bash
curl.exe -X PUT http://localhost:3000/absensi/1 -H "Content-Type: application/json" -d "{\"anggota_id\":1,\"kegiatan_id\":2,\"status\":\"Izin\"}"
```

### 12. PATCH absensi

```bash
curl.exe -X PATCH http://localhost:3000/absensi/1 -H "Content-Type: application/json" -d "{\"status\":\"Sakit\"}"
```

### 13. DELETE absensi

```bash
curl.exe -X DELETE http://localhost:3000/absensi/1
```

## Validasi dan Penanganan Error

| Status HTTP | Keterangan |
|---|---|
| 200 | Request berhasil |
| 201 | Data berhasil dibuat |
| 204 | Data berhasil dihapus tanpa response body |
| 400 | Input tidak valid |
| 404 | Data atau endpoint tidak ditemukan |
| 409 | NIM sudah digunakan |
| 500 | Kesalahan internal server |

API menggunakan validasi input pada endpoint yang mengubah data. Middleware 404 menangani endpoint yang tidak tersedia, sedangkan error handler menangani kesalahan internal.

## Hasil Pengujian

Pengujian dilakukan menggunakan Postman.

Hasil pengujian yang telah dilakukan:

- GET halaman utama berhasil dengan status 200.
- GET daftar anggota berhasil dengan status 200.
- GET detail anggota berhasil dengan status 200.
- POST anggota berhasil dengan status 201.
- PATCH anggota berhasil dengan status 200.
- DELETE anggota berhasil dengan status 204.
- GET daftar dan filter absensi berhasil dengan status 200.
- GET detail absensi berhasil dengan status 200.
- POST absensi berhasil dengan status 201.
- PUT absensi berhasil dengan status 200.
- PATCH absensi berhasil dengan status 200.
- DELETE absensi berhasil dengan status 204.
- Validasi anggota tanpa NIM menghasilkan status 400.
- NIM duplikat menghasilkan status 409.
- Anggota yang tidak ditemukan menghasilkan status 404.
- Endpoint yang tidak tersedia menghasilkan status 404.

## Bukti Pengujian

Screenshot hasil pengujian Postman disimpan dalam folder `bukti-testing/`.

Bukti pengujian digunakan untuk menunjukkan bahwa endpoint, validasi, dan penanganan error telah dijalankan sesuai ketentuan tugas.
