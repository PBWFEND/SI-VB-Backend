# TUGAS 4 - REST API MAHASISWA DENGAN PRISMA

## Identitas
- Nama: Siti Khodijah
- NIM: 240160221045
- Program Studi: Sistem Informasi

## Deskripsi
Tugas ini merupakan pengembangan REST API Mahasiswa dari Tugas 3 dengan menggunakan Prisma ORM dan database SQLite.

API menyediakan fitur CRUD (Create, Read, Update, Delete) untuk mengelola data mahasiswa.

## Teknologi
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite

## Struktur Proyek

```text
Tugas/
|
|-- prisma/
|   |-- migrations/
|   |   |-- 20261102110125_init/
|   |   |   |-- migration.sql
|   |   |-- migration_lock.toml
|   |-- schema.prisma
|
|-- bukti-testing/
|
|-- .env.example
|-- .gitignore
|-- db.ts
|-- server.ts
|-- prisma.config.ts
|-- package.json
|-- package-lock.json
|-- README.md
```

## Instalasi

1. Buka terminal pada folder Tugas.

2. Install seluruh dependency:

```bash
npm install
```

3. Buat file `.env` berdasarkan `.env.example` dengan isi:

```env
DATABASE_URL="file:./dev.db"
```

4. Jalankan migrasi database:

```bash
npx prisma migrate dev
```

5. Generate Prisma Client:

```bash
npx prisma generate
```

## Menjalankan Server

Jalankan perintah:

```bash
npm run dev
```

Server berjalan pada alamat:

```text
http://localhost:3010
```

## Daftar Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | /mahasiswa | Menampilkan semua data mahasiswa |
| GET | /mahasiswa/:nim | Menampilkan detail mahasiswa berdasarkan NIM |
| POST | /mahasiswa | Menambahkan data mahasiswa |
| PATCH | /mahasiswa/:nim | Memperbarui data mahasiswa |
| DELETE | /mahasiswa/:nim | Menghapus data mahasiswa |

## Contoh Data POST

```json
{
  "nim": "240160221045",
  "nama": "Siti Khodijah",
  "prodi": "Sistem Informasi",
  "angkatan": 2024
}
```

## Validasi Data

Validasi yang diterapkan pada API:
- NIM wajib diisi dan harus berupa string.
- Nama wajib diisi dan harus berupa string.
- Program studi wajib diisi dan harus berupa string.
- Angkatan harus berupa bilangan bulat positif.
- NIM tidak boleh digunakan oleh mahasiswa lain.
- Data perubahan pada PATCH harus valid.

## Database

Database menggunakan SQLite dengan Prisma ORM.

Model Mahasiswa memiliki atribut:
- `nim`: String (Primary Key)
- `nama`: String
- `prodi`: String
- `angkatan`: Int

Konfigurasi database terdapat pada file `prisma/schema.prisma`, sedangkan riwayat migrasi tersimpan di folder `prisma/migrations/`.

## Bukti Pengujian

Screenshot hasil pengujian API tersedia di folder `bukti-testing`.

Pengujian meliputi:
- GET semua data mahasiswa.
- GET detail mahasiswa berdasarkan NIM.
- POST tambah data mahasiswa.
- PATCH ubah data mahasiswa.
- DELETE hapus data mahasiswa.

## Kesimpulan

REST API Mahasiswa berhasil dikembangkan sebagai pengembangan dari Tugas 3 dengan menggunakan Prisma ORM dan database SQLite.

API telah menyediakan operasi CRUD serta validasi data. Pengujian endpoint dilakukan menggunakan PowerShell untuk memastikan fungsi API berjalan dengan baik.