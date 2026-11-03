# SISTEM INFORMASI PERPUSTAKAAN

**UTS: MINI PROJECT BACKEND**

### Identitas Mahasiswa

| Keterangan | Data |
|---|---|
| Nama | Rasya Putri Ramadhani |
| NPM | 240160221055 |
| Kelas | SI-5B |

---

REST API Sistem Informasi Perpustakaan merupakan aplikasi backend yang dikembangkan untuk mengelola data buku, pengguna, dan transaksi peminjaman buku. Aplikasi ini dibuat menggunakan Node.js, Express.js, Prisma ORM, dan database SQLite.

## 1. Fitur Aplikasi

Aplikasi ini memiliki beberapa fitur utama:

### Manajemen Buku
- Menampilkan seluruh data buku.
- Menampilkan detail buku berdasarkan ID.
- Menambahkan data buku.
- Mengubah data buku.
- Menghapus data buku.
- Memfilter buku berdasarkan nama penulis.
- Memfilter buku berdasarkan ketersediaan stok.

### Manajemen Pengguna
- Menampilkan seluruh data pengguna.
- Menambahkan pengguna baru.
- Melakukan validasi nama dan email.
- Mencegah penggunaan email yang sama.

### Manajemen Peminjaman
- Menampilkan seluruh data peminjaman.
- Menampilkan peminjaman berdasarkan status aktif atau selesai.
- Membuat transaksi peminjaman buku.
- Memeriksa ketersediaan stok buku.
- Mengurangi stok ketika buku dipinjam.
- Mengembalikan buku dan menambah stok secara otomatis.
- Menampilkan informasi buku dan pengguna dalam transaksi peminjaman.

### Fitur Tambahan
- Endpoint health check.
- Middleware 404 dan error handler.
- Seed data awal.
- Relasi antara tabel Buku, Pengguna, dan Pinjaman.

## 2. Teknologi yang Digunakan

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- SQLite
- Postman

## 3. Struktur Folder

```text
240160221055-rasya-putri-ramadhani/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── controllers/
│   │   ├── buku.controller.ts
│   │   ├── pengguna.controller.ts
│   │   └── pinjaman.controller.ts
│   │
│   ├── middleware/
│   │   └── error.middleware.ts
│   │
│   ├── routes/
│   │   ├── buku.routes.ts
│   │   ├── pengguna.routes.ts
│   │   └── pinjaman.routes.ts
│   │
│   └── services/
│       ├── buku.service.ts
│       ├── pengguna.service.ts
│       └── pinjaman.service.ts
│
├── .env
├── .gitignore
├── app.ts
├── client.ts
├── server.ts
├── package.json
├── package-lock.json
└── prisma7.config.ts
```

## 4. Instalasi dan Menjalankan Aplikasi

### Prasyarat
- Node.js
- npm
- Git

### Langkah 1. Clone Repository

```bash
git clone URL_REPOSITORY
```

Masuk ke direktori proyek:

```bash
cd 240160221055-rasya-putri-ramadhani
```

### Langkah 2. Install Dependencies

```bash
npm install
```

### Langkah 3. Konfigurasi Environment

Buat file `.env` pada direktori utama proyek:

```env
DATABASE_URL="file:./dev.db"
```

### Langkah 4. Migrasi Database

```bash
npx prisma migrate dev
```

### Langkah 5. Mengisi Data Awal

```bash
npx prisma db seed
```

Data awal yang dimasukkan:
- 3 data buku.
- 3 data pengguna.
- 2 data peminjaman aktif.
- 1 data peminjaman selesai.

### Langkah 6. Menjalankan Server

```bash
npm run dev
```

Server berjalan pada:

```text
http://localhost:3000
```

## 5. Daftar Endpoint API

Base URL:

```text
http://localhost:3000
```

### A. Endpoint Buku

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/buku` | Menampilkan semua buku |
| GET | `/buku/:id` | Menampilkan detail buku |
| POST | `/buku` | Menambahkan buku |
| PATCH | `/buku/:id` | Mengubah data buku |
| DELETE | `/buku/:id` | Menghapus buku |

Contoh POST `/buku`:

```json
{
  "judul": "Pemrograman Web",
  "penulis": "Rasya Putri",
  "tahun": 2026,
  "stok": 10
}
```

Contoh PATCH `/buku/1`:

```json
{
  "judul": "Pemrograman Web Lanjutan",
  "stok": 15
}
```

Filter buku:

```text
GET /buku?penulis=Andrea
GET /buku?stok=tersedia
GET /buku?stok=habis
```

### B. Endpoint Pengguna

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/pengguna` | Menampilkan semua pengguna |
| POST | `/pengguna` | Menambahkan pengguna |

Contoh POST `/pengguna`:

```json
{
  "nama": "Rasya Putri",
  "email": "rasya@example.com"
}
```

### C. Endpoint Pinjaman

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/pinjaman` | Menampilkan semua peminjaman |
| GET | `/pinjaman?status=aktif` | Menampilkan peminjaman aktif |
| GET | `/pinjaman?status=selesai` | Menampilkan peminjaman selesai |
| POST | `/pinjaman` | Membuat peminjaman |
| PATCH | `/pinjaman/:id/kembali` | Mengembalikan buku |

Contoh POST `/pinjaman`:

```json
{
  "bukuId": 1,
  "penggunaId": 1
}
```

Contoh PATCH `/pinjaman/1/kembali` digunakan untuk mengembalikan buku berdasarkan ID peminjaman.

### D. Endpoint Health Check

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/health` | Memeriksa kondisi server |

Contoh respons:

```json
{
  "status": "OK",
  "message": "Server berjalan dengan baik"
}
```

## 6. Validasi dan HTTP Status Code

| Status Code | Keterangan |
|---|---|
| 200 | Request berhasil |
| 201 | Data berhasil dibuat |
| 204 | Data berhasil dihapus |
| 400 | Input tidak valid atau stok tidak tersedia |
| 404 | Data atau endpoint tidak ditemukan |
| 409 | Email sudah digunakan |
| 500 | Terjadi kesalahan pada server |

Validasi yang diterapkan:
- Judul dan penulis buku tidak boleh kosong.
- Tahun buku harus berupa angka dalam rentang yang ditentukan.
- Stok buku harus berupa angka dan tidak boleh negatif.
- Nama pengguna tidak boleh kosong.
- Email harus memiliki format valid dan tidak boleh duplikat.
- ID buku dan pengguna pada peminjaman harus berupa angka positif.
- Peminjaman hanya dapat dilakukan jika stok tersedia.
- Buku yang memiliki riwayat peminjaman tidak dapat dihapus karena memiliki relasi dengan tabel Pinjaman.

## 7. Relasi Database

Aplikasi memiliki tiga model utama:

1. **Buku:** menyimpan judul, penulis, tahun, dan stok buku.
2. **Pengguna:** menyimpan nama dan email pengguna.
3. **Pinjaman:** menyimpan transaksi peminjaman dan pengembalian buku.

Relasi database:
- Satu buku dapat memiliki banyak data peminjaman.
- Satu pengguna dapat memiliki banyak data peminjaman.
- Setiap peminjaman terhubung dengan satu buku dan satu pengguna.

## 8. Pengujian API

Pengujian dilakukan menggunakan Postman, meliputi:
- Pengujian seluruh endpoint CRUD buku.
- Pengujian penambahan dan validasi pengguna.
- Pengujian transaksi peminjaman dan pengembalian.
- Pengujian filter data.
- Pengujian validasi input tidak valid.
- Pengujian stok buku habis.
- Pengujian route yang tidak ditemukan.
- Pengujian relasi antar tabel.
- Pengujian persistence database setelah server direstart.

Seluruh pengujian endpoint yang telah dilakukan berhasil sesuai dengan status respons yang diharapkan.

## 9. Penutup

Proyek UTS Mini Project Backend Sistem Informasi Perpustakaan ini dibuat sebagai penerapan pengembangan REST API menggunakan Express.js, TypeScript, Prisma ORM, dan SQLite. Dengan pemisahan layer routes, controllers, dan services, pengelolaan kode menjadi lebih terstruktur. Sistem ini mendukung pengelolaan buku, pengguna, serta transaksi peminjaman dan pengembalian dengan validasi data dan relasi database.