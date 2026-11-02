# Tugas 4 – Integrasi Database dan ORM untuk REST API

## 1. Deskripsi

Tugas ini merupakan implementasi REST API untuk mengelola data pengguna menggunakan Express.js, Prisma ORM, dan database SQLite.

Aplikasi menggunakan Prisma Client untuk menjalankan operasi CRUD (Create, Read, Update, Delete). Data disimpan secara permanen di database sehingga tetap tersedia meskipun server dihentikan atau dijalankan kembali.

## 2. Teknologi yang Digunakan

- Node.js 24.15.0
- Express.js 5.3.0
- Prisma ORM 7.10.1
- Prisma Client 7.10.1
- SQLite
- better-sqlite3 Driver Adapter
- dotenv
- TypeScript

## 3. Struktur Folder

```text
Tugas-4/
├── prisma/
│   ├── generated/
│   ├── migrations/
│   │   └── 20261102022108_init/
│   │       └── migration.sql
│   └── schema.prisma
├── bukti-testing/
├── .env.example
├── client.ts
├── latihan.ts
├── prisma.config.ts
├── package.json
├── package-lock.json
└── README.md
```

Keterangan:
- `schema.prisma` digunakan untuk mendefinisikan model database.
- `migrations/` menyimpan riwayat perubahan struktur database.
- `generated/` berisi Prisma Client yang dihasilkan dari schema.
- `client.ts` berisi konfigurasi koneksi Prisma Client.
- `latihan.ts` berisi implementasi REST API Pengguna.
- `.env.example` merupakan template konfigurasi environment.
- `bukti-testing/` digunakan untuk menyimpan dokumentasi hasil pengujian.

File `.env`, database SQLite (`.db`), dan `node_modules/` disimpan secara lokal dan tidak disertakan dalam pengumpulan GitHub.

## 4. Model Database

Model yang digunakan adalah `Pengguna`, dengan struktur sebagai berikut:

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | Int | Primary key dan dibuat otomatis |
| nim | String | NIM pengguna dan harus unik |
| nama | String | Nama pengguna |
| email | String | Email pengguna dan harus unik |
| role | String | Peran pengguna |

Field NIM dan email menggunakan atribut `@unique` agar tidak terdapat data dengan nilai yang sama.

## 5. Konfigurasi Database

Database yang digunakan adalah SQLite dengan lokasi file:

```text
prisma/dev.db
```

Konfigurasi environment pada file `.env`:

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3008
```

File `.env.example` digunakan sebagai template konfigurasi. URL database dibaca melalui environment variable pada `prisma.config.ts`.

File `.env` tidak diunggah ke GitHub karena merupakan konfigurasi lokal aplikasi.

## 6. Cara Menjalankan Project

**1. Instalasi dependency**

```bash
npm install
```

**2. Konfigurasi environment**

Buat file `.env` berdasarkan `.env.example`, kemudian isi konfigurasi database:

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3008
```

**3. Menjalankan migration**

```bash
npx prisma migrate dev --name init
```

**4. Generate Prisma Client**

```bash
npx prisma generate
```

**5. Menjalankan server**

```bash
node --experimental-strip-types latihan.ts
```

Apabila berhasil, server akan berjalan pada:

```text
http://localhost:3008
```

## 7. Daftar Endpoint API

| No. | Method | Endpoint | Fungsi |
|---|---|---|---|
| 1 | GET | `/` | Menampilkan informasi API |
| 2 | GET | `/pengguna` | Mengambil seluruh data pengguna |
| 3 | GET | `/pengguna/:nim` | Mengambil detail pengguna berdasarkan NIM |
| 4 | POST | `/pengguna` | Menambahkan pengguna baru |
| 5 | PATCH | `/pengguna/:nim` | Memperbarui sebagian data pengguna |
| 6 | DELETE | `/pengguna/:nim` | Menghapus pengguna berdasarkan NIM |

## 8. Validasi Input

Validasi dilakukan sebelum data diproses dan disimpan ke database.

Ketentuan validasi yang diterapkan:

- NIM wajib diisi dan harus berupa teks.
- Nama wajib diisi dan harus berupa teks.
- Email wajib diisi dan harus menggunakan format email yang valid.
- Role wajib diisi dan harus berupa teks.
- NIM dan email tidak boleh memiliki nilai yang sama dengan pengguna lain.
- PATCH hanya menerima field `nama`, `email`, dan `role`.
- PATCH harus memiliki minimal satu field yang dikirim.
- Field yang tidak diizinkan untuk diperbarui akan ditolak.

Apabila data tidak sesuai ketentuan, API memberikan respons `400 Bad Request`. Duplikasi NIM atau email ditangani dengan respons `409 Conflict`.

## 9. HTTP Status Code

| Status Code | Keterangan |
|---|---|
| 200 OK | Permintaan berhasil |
| 201 Created | Data pengguna berhasil dibuat |
| 204 No Content | Data berhasil dihapus tanpa response body |
| 400 Bad Request | Data yang dikirim tidak valid |
| 404 Not Found | Pengguna atau endpoint tidak ditemukan |
| 409 Conflict | NIM atau email sudah digunakan |
| 500 Internal Server Error | Terjadi kesalahan pada server |

## 10. Contoh Request

**A. POST `/pengguna`**

Digunakan untuk menambahkan pengguna baru.

```json
{
  "nim": "240160221009",
  "nama": "Disti Setiawati",
  "email": "disti.tugas4@example.com",
  "role": "mahasiswa"
}
```

**B. GET `/pengguna`**

Digunakan untuk mengambil seluruh data pengguna.

**C. GET `/pengguna/240160221009`**

Digunakan untuk mengambil detail pengguna berdasarkan NIM.

**D. PATCH `/pengguna/240160221009`**

Digunakan untuk memperbarui sebagian data pengguna.

Contoh perubahan email:

```json
{
  "email": "disti.revisi@example.com"
}
```

**E. DELETE `/pengguna/240160221009`**

Digunakan untuk menghapus pengguna berdasarkan NIM. Apabila berhasil, API memberikan status `204 No Content` tanpa response body.

## 11. Hasil Pengujian

Pengujian dilakukan menggunakan PowerShell untuk memastikan endpoint berjalan sesuai fungsi dan memberikan respons yang tepat.

| No. | Pengujian | Hasil |
|---|---|---|
| 1 | GET informasi API | Berhasil |
| 2 | GET seluruh pengguna | Berhasil |
| 3 | GET detail pengguna berdasarkan NIM | Berhasil |
| 4 | POST pengguna dengan data valid | Berhasil (201) |
| 5 | POST dengan format email tidak valid | Berhasil diuji (400) |
| 6 | PATCH data pengguna | Berhasil (200) |
| 7 | PATCH dengan format email tidak valid | Berhasil diuji (400) |
| 8 | DELETE pengguna uji | Berhasil (204) |
| 9 | GET pengguna setelah DELETE | Berhasil diuji (404) |
| 10 | Pengujian setelah server dijalankan ulang | Data tetap tersimpan |

Hasil pengujian menunjukkan bahwa data pengguna tetap tersedia setelah server dihentikan dan dijalankan kembali. Hal tersebut membuktikan bahwa aplikasi telah menggunakan penyimpanan database SQLite secara permanen.

## 12. Kesimpulan

Melalui tugas ini, saya belajar mengintegrasikan Express.js dengan Prisma ORM dan database SQLite untuk membangun REST API dengan penyimpanan data permanen.

Saya memahami cara membuat model database, mengatur konfigurasi environment, menjalankan migration, menghubungkan Prisma Client dengan database, serta menerapkan operasi CRUD pada resource Pengguna.

Selain itu, saya juga menerapkan validasi input dan HTTP status code agar API dapat memberikan respons yang sesuai ketika permintaan berhasil maupun ketika terjadi kesalahan.

Pengujian membuktikan bahwa endpoint API dapat berjalan sesuai fungsinya dan data tetap tersimpan meskipun server dihentikan dan dijalankan kembali.

Dalam proses pengerjaan, saya menggunakan AI sebagai coding assistant untuk membantu memahami konfigurasi Prisma, menyusun kode, dan menelusuri kendala selama implementasi. Seluruh kode tetap dijalankan dan diuji kembali secara mandiri.