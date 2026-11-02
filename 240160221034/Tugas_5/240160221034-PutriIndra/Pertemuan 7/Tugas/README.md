# Tugas 5 — CRUD REST API dengan Pola Service/Controller

**Nama:** Putri Indra  
**NIM:** 240160221034  
**Mata Kuliah:** Praktikum Backend  
**Pertemuan:** 7

## Deskripsi

Aplikasi ini merupakan REST API untuk mengelola data buku menggunakan Node.js, Express 5, Prisma ORM, dan SQLite.

API menerapkan pola arsitektur berlapis (Service/Controller) agar kode lebih terstruktur dan mudah dikelola.

## Struktur Lapisan

```text
Tugas/
├── src/
│   ├── routes/
│   │   └── buku.routes.ts
│   ├── controller/
│   │   └── buku.controller.ts
│   └── service/
│       └── buku.service.ts
├── app.ts
├── server.ts
├── client.ts
├── prisma/
├── prisma.config.ts
└── README.md
```

### Alur Aplikasi

1. Routes menerima request berdasarkan endpoint.
2. Controller melakukan validasi input dan mengatur response HTTP.
3. Service menjalankan operasi database.
4. Prisma menghubungkan aplikasi dengan database SQLite.

## Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/buku` | Mengambil semua buku |
| GET | `/buku/:id` | Mengambil detail buku |
| POST | `/buku` | Menambahkan buku |
| PATCH | `/buku/:id` | Memperbarui buku |
| DELETE | `/buku/:id` | Menghapus buku |

## Menjalankan Aplikasi

Instal dependensi:

```bash
npm install
```

Jalankan migrasi database:

```bash
npx prisma migrate dev --name init
```

Generate Prisma Client:

```bash
npx prisma generate
```

Jalankan server:

```bash
npm run start
```

Server berjalan pada:

```text
http://localhost:3008
```

## Pengujian API dengan cURL

### 1. GET — Semua Buku

```bash
curl http://localhost:3008/buku
```

### 2. GET — Detail Buku

```bash
curl http://localhost:3008/buku/1
```

### 3. POST — Tambah Buku

```bash
curl -X POST http://localhost:3008/buku -H "Content-Type: application/json" -d "{\"judul\":\"Belajar Node.js\",\"penulis\":\"Andi\",\"tahun\":2024,\"stok\":3}"
```

### 4. PATCH — Perbarui Buku

```bash
curl -X PATCH http://localhost:3008/buku/1 -H "Content-Type: application/json" -d "{\"stok\":10}"
```

### 5. DELETE — Hapus Buku

```bash
curl -X DELETE http://localhost:3008/buku/1
```

## Validasi dan Status Code

- `200 OK`: Request berhasil.
- `201 Created`: Data buku berhasil ditambahkan.
- `204 No Content`: Data buku berhasil dihapus.
- `400 Bad Request`: Input tidak valid.
- `404 Not Found`: Buku atau endpoint tidak ditemukan.
- `500 Internal Server Error`: Terjadi kesalahan server.

Validasi input dilakukan pada controller dengan pemeriksaan tipe data menggunakan `typeof`, pemeriksaan bilangan bulat, dan batas nilai yang sesuai.

## Middleware

- `express.json()` untuk membaca request body JSON.
- Middleware logger untuk mencatat request.
- Middleware 404 untuk endpoint yang tidak ditemukan.
- Error handler untuk menangani kesalahan aplikasi.

## Hasil Pengujian

Pengujian dilakukan menggunakan Postman. Bukti screenshot disimpan di folder `bukti-testing/`.

Daftar bukti pengujian:

1. `01-get-home.png` — GET `/`
2. `02-get-semua-buku.png` — GET `/buku`
3. `03-post-tambah-buku.png` — POST `/buku`
4. `04-get-detail-buku.png` — GET `/buku/1`
5. `05-patch-update-buku.png` — PATCH `/buku/1`
6. `06-delete-buku.png` — DELETE `/buku/1`
7. `07-get-buku-tidak-ditemukan.png` — GET buku yang tidak ditemukan
8. `08-post-validasi-gagal.png` — POST dengan input tidak valid
9. `09-get-endpoint-tidak-ada.png` — GET endpoint yang tidak tersedia

## Keamanan Repository

File dan folder berikut tidak disertakan dalam commit:

- `node_modules/`
- `.env`
- File database SQLite (`*.db`)
