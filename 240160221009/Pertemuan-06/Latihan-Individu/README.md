# Latihan Individu – Pertemuan 06
## Database dan ORM untuk Aplikasi Node.js

### 1. Deskripsi

Latihan ini merupakan implementasi REST API untuk mengelola data pengguna menggunakan Express.js 5, Prisma ORM 7, dan database SQLite.

Berbeda dengan pertemuan sebelumnya, data pengguna pada latihan ini disimpan secara permanen di database sehingga tidak hilang ketika server dihentikan atau dijalankan kembali.

### 2. Teknologi yang Digunakan

- Node.js 24.15.0
- Express.js 5.3.0
- Prisma ORM 7.10.1
- Prisma Client 7.10.1
- SQLite
- better-sqlite3 Driver Adapter
- dotenv
- JavaScript dan TypeScript

### 3. Struktur Folder

```text
Latihan-Individu/
├── prisma/
│   ├── generated/
│   ├── migrations/
│   │   └── 20261102022108_init/
│   │       └── migration.sql
│   ├── dev.db
│   └── schema.prisma
├── .env
├── .env.example
├── client.ts
├── latihan.ts
├── prisma.config.ts
├── package.json
├── package-lock.json
├── README.md
└── bukti-testing/
```

Keterangan:
- `schema.prisma` digunakan untuk mendefinisikan model database.
- `migrations/` menyimpan riwayat perubahan struktur database.
- `generated/` berisi Prisma Client yang dihasilkan dari schema.
- `dev.db` merupakan file database SQLite.
- `client.ts` berisi konfigurasi koneksi Prisma Client.
- `latihan.ts` berisi implementasi REST API Pengguna.
- `.env` menyimpan konfigurasi lokal aplikasi.
- `.env.example` merupakan template konfigurasi environment.

File `.env` dan database `.db` disimpan secara lokal dan tidak disertakan dalam pengumpulan GitHub.

### 4. Model Database

Model yang digunakan adalah `Pengguna`, dengan struktur sebagai berikut:

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | Int | Primary key dan dibuat otomatis |
| nim | String | NIM pengguna dan harus unik |
| nama | String | Nama pengguna |
| email | String | Email pengguna dan harus unik |
| role | String | Peran pengguna |

Primary key digunakan untuk mengidentifikasi setiap data pengguna. Field NIM dan email menggunakan atribut `@unique` agar tidak terdapat data dengan nilai yang sama.

### 5. Konfigurasi Database

Database yang digunakan adalah SQLite dengan lokasi file:

```text
prisma/dev.db
```

Konfigurasi environment pada file `.env`:

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3008
```

File `.env.example` digunakan sebagai template konfigurasi:

```env
DATABASE_URL=""
PORT=3008
```

Pada `prisma.config.ts`, URL database dibaca melalui environment variable dengan nilai cadangan `file:./prisma/dev.db`.

File `.env` tidak diunggah ke GitHub karena merupakan konfigurasi lokal aplikasi.

### 6. Cara Menjalankan Project

**1. Instalasi dependency**

Jalankan perintah:

```bash
npm install
```

**2. Konfigurasi environment**

Buat file `.env` berdasarkan `.env.example`, kemudian isi `DATABASE_URL` dengan lokasi database SQLite:

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3008
```

**3. Menjalankan migration**

```bash
npx prisma@7 migrate dev
```

**4. Generate Prisma Client**

```bash
npx prisma@7 generate
```

**5. Menjalankan server**

```bash
node --experimental-strip-types latihan.ts
```

Apabila berhasil, server akan berjalan pada alamat:

```text
http://localhost:3008
```

### 7. Daftar Endpoint API

| No. | Method | Endpoint | Fungsi |
|---|---|---|---|
| 1 | GET | `/` | Menampilkan informasi API |
| 2 | GET | `/pengguna/:nim` | Mengambil detail pengguna berdasarkan NIM |
| 3 | POST | `/pengguna` | Menambahkan pengguna baru |
| 4 | PATCH | `/pengguna/:nim` | Memperbarui sebagian data pengguna |
| 5 | DELETE | `/pengguna/:nim` | Menghapus pengguna berdasarkan NIM |

### 8. Validasi Input

Validasi dilakukan sebelum data diproses dan disimpan ke database.

Ketentuan validasi yang diterapkan:

- NIM wajib diisi dan harus berupa teks.
- Nama wajib diisi dan harus berupa teks.
- Email wajib diisi dan harus menggunakan format email yang valid.
- Role wajib diisi dan harus berupa teks.
- NIM tidak boleh memiliki nilai yang sama dengan pengguna lain.
- Email tidak boleh digunakan oleh pengguna lain.
- PATCH hanya menerima field `nama`, `email`, dan `role`.
- PATCH harus memiliki minimal satu field yang dikirim.
- Field yang tidak diizinkan untuk diperbarui akan ditolak.

Apabila data tidak sesuai dengan ketentuan, API akan memberikan respons `400 Bad Request`. Duplikasi NIM atau email ditangani dengan respons `409 Conflict`.

### 9. HTTP Status Code

| Status Code | Keterangan |
|---|---|
| 200 OK | Permintaan berhasil |
| 201 Created | Data pengguna berhasil dibuat |
| 204 No Content | Data berhasil dihapus tanpa response body |
| 400 Bad Request | Data yang dikirim tidak valid |
| 404 Not Found | Pengguna atau endpoint tidak ditemukan |
| 409 Conflict | NIM atau email sudah digunakan |
| 500 Internal Server Error | Terjadi kesalahan pada server |

### 10. Contoh Request

**A. POST `/pengguna`**

Digunakan untuk menambahkan pengguna baru.

```json
{
  "nim": "240160221009",
  "nama": "Disti Setiawati",
  "email": "disti.setiawati@example.com",
  "role": "mahasiswa"
}
```

**B. GET `/pengguna/240160221009`**

Digunakan untuk mengambil detail pengguna berdasarkan NIM.

**C. PATCH `/pengguna/240160221009`**

Digunakan untuk memperbarui sebagian data pengguna.

Contoh perubahan role:

```json
{
  "role": "mahasiswa aktif"
}
```

**D. DELETE `/pengguna/240160221009`**

Digunakan untuk menghapus pengguna berdasarkan NIM. Apabila berhasil, API memberikan status `204 No Content` tanpa response body.

### 11. Hasil Pengujian

Pengujian dilakukan menggunakan PowerShell dan `curl.exe` untuk memastikan seluruh endpoint dapat berjalan sesuai fungsi dan memberikan HTTP status code yang tepat.

| No. | Pengujian | Hasil |
|---|---|---|
| 1 | GET informasi API | Berhasil (200) |
| 2 | GET pengguna berdasarkan NIM | Berhasil (200) |
| 3 | GET NIM yang tidak ditemukan | Berhasil diuji (404) |
| 4 | POST pengguna dengan data valid | Berhasil (201) |
| 5 | POST dengan format email tidak valid | Berhasil diuji (400) |
| 6 | PATCH data pengguna | Berhasil (200) |
| 7 | PATCH NIM yang tidak ditemukan | Berhasil diuji (404) |
| 8 | DELETE pengguna uji | Berhasil (204) |
| 9 | GET pengguna setelah DELETE | Berhasil diuji (404) |
| 10 | Pengujian setelah server restart | Data tetap tersimpan |

Hasil pengujian menunjukkan bahwa data pengguna tetap tersedia setelah server dihentikan dan dijalankan kembali. Hal tersebut membuktikan bahwa aplikasi sudah menggunakan penyimpanan database SQLite secara permanen, bukan lagi penyimpanan sementara di memory.

### 12. Kesimpulan

Melalui latihan ini, saya belajar mengintegrasikan Express.js dengan Prisma ORM dan database SQLite untuk membangun REST API yang memiliki penyimpanan data permanen.

Saya memahami cara membuat model database, mengatur konfigurasi environment, menjalankan migration, menghubungkan Prisma Client dengan database, serta menerapkan operasi Create, Read, Update, dan Delete pada resource Pengguna.

Selain itu, saya juga memahami pentingnya validasi input dan penggunaan HTTP status code yang sesuai agar API dapat memberikan respons yang jelas ketika permintaan berhasil maupun ketika terjadi kesalahan.

Pengujian membuktikan bahwa data pengguna dapat disimpan secara permanen dan tetap tersedia meskipun server dihentikan dan dijalankan kembali.

Dalam proses pengerjaan, saya menggunakan AI sebagai coding assistant untuk membantu memahami konfigurasi Prisma, menyusun kode, dan menelusuri kendala selama implementasi. Seluruh kode tetap dijalankan dan diuji kembali secara mandiri.
