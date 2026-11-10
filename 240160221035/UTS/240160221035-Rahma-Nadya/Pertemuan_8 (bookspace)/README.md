# BookSpace – API Manajemen Buku

## Deskripsi Project
BookSpace adalah aplikasi backend berbasis REST API untuk mengelola data buku. Project ini dibuat sebagai Mini Project UTS mata kuliah Praktikum Backend.

Aplikasi ini menyediakan fitur CRUD (Create, Read, Update, Delete) untuk menambahkan, melihat, memperbarui, dan menghapus data buku.

## Teknologi yang Digunakan
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite

## Struktur Project
```text
Pertemuan_8 (bookspace)/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── controller/
│   │   └── buku.controller.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── routes/
│   │   └── buku.routes.ts
│   ├── service/
│   │   └── buku.service.ts
│   └── index.ts
├── prisma.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Cara Menjalankan Project

1. Clone repository atau buka folder project.
2. Install dependencies:

```bash
npm install
```

3. Siapkan file `.env` dengan konfigurasi database sesuai project:

```env
DATABASE_URL="file:./dev.db"
```

4. Jalankan migrasi database:

```bash
npx prisma migrate dev --name init
```

5. Generate Prisma Client:

```bash
npx prisma generate
```

6. Jalankan server:

```bash
npx tsx src/index.ts
```

Server berjalan di:

`http://localhost:3000`

## Daftar Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/buku` | Menampilkan semua buku |
| GET | `/api/buku/:id` | Menampilkan buku berdasarkan ID |
| POST | `/api/buku` | Menambahkan buku |
| PUT | `/api/buku/:id` | Memperbarui data buku |
| DELETE | `/api/buku/:id` | Menghapus buku |

## Contoh Request POST

Endpoint:

`POST http://localhost:3000/api/buku`

Request Body:

```json
{
  "judul": "Laskar Pelangi",
  "penulis": "Andrea Hirata",
  "penerbit": "Bentang Pustaka",
  "tahun": 2005,
  "stok": 10
}
```

## Hasil Pengujian API

Pengujian dilakukan menggunakan `curl.exe` melalui terminal PowerShell.

| No. | Pengujian | Status Code | Hasil |
|---|---|---|---|
| 1 | GET semua buku | 200 OK | Berhasil |
| 2 | POST tambah buku | 201 Created | Berhasil |
| 3 | GET buku berdasarkan ID | 200 OK | Berhasil |
| 4 | PUT update buku | 200 OK | Berhasil |
| 5 | DELETE buku | 200 OK | Berhasil |
| 6 | POST data kosong | 400 Bad Request | Berhasil ditolak |
| 7 | Persistensi setelah restart | 200 OK | Data tetap tersimpan |

## Pengujian Persistensi
Pengujian dilakukan dengan menambahkan data buku ke database, mematikan server, kemudian menjalankan server kembali. Setelah server aktif, data buku diperiksa menggunakan endpoint GET berdasarkan ID.

Hasil pengujian menunjukkan bahwa data tetap tersimpan setelah server di-restart.

## Validasi Input
API melakukan validasi pada field `judul` dan `penulis`. Jika kedua field tersebut kosong, API mengembalikan status `400 Bad Request` dengan pesan:

```json
{
  "message": "Judul dan penulis wajib diisi"
}
```

## Bukti Pengujian
Screenshot hasil pengujian disimpan dalam folder `bukti-testing/`.

## Penutup
BookSpace telah menyediakan fitur CRUD untuk pengelolaan data buku menggunakan Express, TypeScript, Prisma ORM, dan SQLite. Pengujian dilakukan untuk memastikan endpoint berjalan dengan baik, validasi input berfungsi, dan data tetap tersimpan setelah server di-restart.