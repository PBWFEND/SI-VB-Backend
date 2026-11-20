# UTS Mini Project Backend – Perpustakaan
- Nama : Rendi Fergian Sukmawan
- NPM  : 240160221037
- Kelas: SI-VB
- Mata Kuliah : Pemograman Berbasis BackEnd

## 1. Deskripsi Project

Project ini merupakan Mini Project Backend dengan domain **Perpustakaan**, yang berfungsi untuk mengelola data buku melalui REST API.

Project dibuat menggunakan:
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite

Fitur utama yang tersedia adalah CRUD (Create, Read, Update, Delete) untuk data buku.

## 2. Struktur Folder
4
```text
pertemuan-08-UTS/
├── prisma/
│   ├── migrations/
│   ├── generated/
│   └── schema.prisma
├── src/
│   ├── controller/
│   │   └── buku.controller.ts
│   ├── routes/
│   │   └── buku.routes.ts
│   └── service/
│       └── buku.service.ts
├── .env
├── .env.example
├── .gitignore
├── app.ts
├── client.ts
├── server.ts
├── prisma.config.ts
├── package.json
├── package-lock.json
└── README.md
```

## 3. Arsitektur Program

Project menggunakan pola arsitektur Routes – Controller – Service.

### Routes
Mengatur endpoint API dan menghubungkan request ke controller.

### Controller
Mengelola request dan response, melakukan validasi input, serta menentukan HTTP status code.

### Service
Mengelola proses pengolahan data dan berkomunikasi dengan database menggunakan Prisma ORM.

### Database
Menggunakan SQLite untuk menyimpan data buku secara permanen.

## 4. Struktur Data Buku

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | Integer | ID buku, dibuat otomatis |
| judul | String | Judul buku |
| penulis | String | Nama penulis |
| tahun | Integer | Tahun terbit |
| stok | Integer | Jumlah stok buku |

## 5. Daftar Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/buku` | Mengambil seluruh data buku |
| GET | `/buku/:id` | Mengambil detail buku berdasarkan ID |
| POST | `/buku` | Menambahkan buku baru |
| PATCH | `/buku/:id` | Mengubah data buku |
| DELETE | `/buku/:id` | Menghapus buku |
| GET | `/health` | Memeriksa status API |

## 6. Validasi Data

Validasi diterapkan pada endpoint POST dan PATCH.

Ketentuan validasi:
- `judul` harus berupa string dan tidak boleh kosong.
- `penulis` harus berupa string dan tidak boleh kosong.
- `tahun` harus berupa bilangan bulat positif dan tidak melebihi tahun saat ini.
- `stok` harus berupa bilangan bulat dan tidak boleh negatif.
- ID buku harus berupa bilangan bulat positif.

## 7. HTTP Status Code

| Status Code | Keterangan |
|---|---|
| 200 OK | Request berhasil |
| 201 Created | Data berhasil ditambahkan |
| 204 No Content | Data berhasil dihapus |
| 400 Bad Request | Input atau ID tidak valid |
| 404 Not Found | Data atau endpoint tidak ditemukan |
| 500 Internal Server Error | Terjadi kesalahan pada server |

## 8. Cara Menjalankan Project

### Persyaratan
Pastikan Node.js dan npm sudah terinstal.

### Instalasi Dependency

```bash
npm install
```

### Konfigurasi Environment

Buat file `.env` dengan konfigurasi:

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3008
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Migrasi Database

```bash
npx prisma migrate dev --name init
```

### Menjalankan Server

```bash
npm start
```

Server berjalan pada:

```text
http://localhost:3008
```

## 9. Contoh Pengujian API

### A. GET Semua Buku

```bash
curl http://localhost:3008/buku
```

### B. GET Buku Berdasarkan ID

```bash
curl http://localhost:3008/buku/1
```

### C. POST Menambahkan Buku

```bash
curl -X POST http://localhost:3008/buku \
-H "Content-Type: application/json" \
-d '{"judul":"Belajar Node.js","penulis":"Andi","tahun":2024,"stok":5}'
```

### D. PATCH Mengubah Buku

```bash
curl -X PATCH http://localhost:3008/buku/1 \
-H "Content-Type: application/json" \
-d '{"judul":"Belajar Backend Node.js","stok":10}'
```

### E. DELETE Menghapus Buku

```bash
curl -X DELETE http://localhost:3008/buku/1
```

### F. Pengujian Validasi

Contoh data tidak valid:

```json
{
  "judul": "Buku Pengujian",
  "penulis": "Andi",
  "tahun": 2024,
  "stok": -5
}
```

API akan memberikan respons `400 Bad Request` karena stok tidak boleh negatif.

## 10. Middleware

Project menggunakan middleware untuk:
- Memproses request JSON menggunakan `express.json()`.
- Mencatat aktivitas request ke console.
- Menangani endpoint yang tidak ditemukan menggunakan middleware 404.
- Menangani kesalahan server menggunakan error handler dengan status 500.

## 11. Kesimpulan

REST API Perpustakaan ini dibuat untuk memenuhi tugas Mini Project Backend dengan menerapkan operasi CRUD menggunakan Express.js, TypeScript, Prisma ORM, dan SQLite.

Project menerapkan arsitektur Routes – Controller – Service, validasi input, penggunaan HTTP status code, serta middleware untuk menangani endpoint yang tidak ditemukan dan kesalahan server.