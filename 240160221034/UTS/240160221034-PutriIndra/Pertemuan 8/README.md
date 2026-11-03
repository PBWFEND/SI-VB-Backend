# Mini Project Backend UTS - Sistem Perpustakaan

**Nama:** Putri Indra  
**NIM:** 240160221034  
**Mata Kuliah:** Praktikum Backend

## Deskripsi

Proyek ini merupakan REST API sederhana untuk mengelola data buku pada sistem perpustakaan. API dibuat menggunakan Node.js, Express.js, Prisma ORM, dan database SQLite.

## Teknologi

- Node.js
- Express.js 5
- TypeScript
- Prisma ORM 7
- SQLite

## Struktur Folder

```text
Pertemuan 8/
├── prisma/
│   ├── migrations/
│   ├── generated/
│   └── schema.prisma
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
├── prisma.config.ts
├── package.json
└── README.md
```

## Menjalankan Proyek

1. Install dependency:

   ```bash
   npm install
   ```

2. Siapkan file environment `.env` berdasarkan `.env.example`.

3. Generate Prisma Client:

   ```bash
   npx prisma generate
   ```

4. Jalankan migrasi database:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Jalankan server:

   ```bash
   npm start
   ```

Server berjalan pada:

`http://localhost:3008`

## Endpoint API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/buku` | Menampilkan semua buku |
| GET | `/buku/:id` | Menampilkan detail buku |
| POST | `/buku` | Menambahkan buku |
| PATCH | `/buku/:id` | Mengubah data buku |
| DELETE | `/buku/:id` | Menghapus buku |
| GET | `/health` | Memeriksa status API |

## Contoh Request

### Menambahkan Buku

`POST /buku`

```json
{
  "judul": "Laskar Pelangi",
  "penulis": "Andrea Hirata",
  "tahun": 2005,
  "stok": 10
}
```

### Mengubah Stok Buku

`PATCH /buku/1`

```json
{
  "stok": 15
}
```

### Menghapus Buku

`DELETE /buku/1`

## Arsitektur

Proyek menggunakan arsitektur berlapis:

- **Routes:** Mengatur endpoint API.
- **Controller:** Menangani request, validasi, dan response.
- **Service:** Menjalankan proses bisnis dan komunikasi dengan database melalui Prisma.

## Penanganan Error

API menggunakan beberapa HTTP status code:

- `200 OK`: Request berhasil.
- `201 Created`: Data berhasil dibuat.
- `204 No Content`: Data berhasil dihapus.
- `400 Bad Request`: Data yang dikirim tidak valid.
- `404 Not Found`: Data atau endpoint tidak ditemukan.
- `500 Internal Server Error`: Terjadi kesalahan pada server.
