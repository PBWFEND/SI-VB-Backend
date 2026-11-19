# Mini Project Backend UTS - Sistem Perpustakaan

**Nama:** Putri Indra  
**NIM:** 240160221034  
**Mata Kuliah:** Praktikum Backend

## Deskripsi

Proyek ini merupakan REST API sederhana untuk mengelola data buku pada sistem perpustakaan. API dibuat menggunakan Node.js, Express.js, Prisma ORM, TypeScript, dan database SQLite.

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
├── .env
├── .env.example
├── .gitignore
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
| GET | `/` | Menampilkan informasi API dan daftar endpoint |
| GET | `/health` | Memeriksa status API |
| GET | `/buku` | Menampilkan semua buku |
| GET | `/buku/:id` | Menampilkan detail buku |
| POST | `/buku` | Menambahkan buku |
| PATCH | `/buku/:id` | Mengubah data buku |
| DELETE | `/buku/:id` | Menghapus buku |

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

## Contoh Request Menggunakan cURL

Pastikan server sudah berjalan di `http://localhost:3008`.

Perintah berikut dapat dijalankan melalui PowerShell menggunakan `curl.exe`.

### 1. Informasi API

```powershell
curl.exe http://localhost:3008/
```

### 2. Health Check

```powershell
curl.exe http://localhost:3008/health
```

### 3. Menampilkan Semua Buku

```powershell
curl.exe http://localhost:3008/buku
```

### 4. Menampilkan Buku Berdasarkan Penulis

```powershell
curl.exe "http://localhost:3008/buku?penulis=Andrea%20Hirata"
```

### 5. Menampilkan Buku Berdasarkan Minimum Stok

```powershell
curl.exe "http://localhost:3008/buku?minStok=5"
```

### 6. Menampilkan Detail Buku

```powershell
curl.exe http://localhost:3008/buku/1
```

### 7. Menambahkan Buku

```powershell
curl.exe -X POST http://localhost:3008/buku -H "Content-Type: application/json" -d '{"judul":"Laskar Pelangi","penulis":"Andrea Hirata","tahun":2005,"stok":10}'
```

### 8. Mengubah Data Buku

```powershell
curl.exe -X PATCH http://localhost:3008/buku/1 -H "Content-Type: application/json" -d '{"stok":15}'
```

### 9. Menghapus Buku

```powershell
curl.exe -X DELETE http://localhost:3008/buku/1
```

**Catatan:** Angka `1` pada endpoint detail, perubahan, dan penghapusan merupakan contoh ID buku. Sesuaikan dengan ID data yang tersedia di database.