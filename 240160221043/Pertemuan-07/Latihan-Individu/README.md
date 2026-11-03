# Latihan Individu Pertemuan 7
## REST API Pengelolaan Pengguna

### Identitas
- Nama: Salwa Ananda Rachmat
- NIM: 240160221043
- Kelas: SI-VB
- Mata Kuliah: Pemrograman Backend

### Deskripsi
Project ini merupakan REST API untuk mengelola data pengguna menggunakan Node.js, Express.js, Prisma ORM, SQLite, dan TypeScript.

### Teknologi
- Node.js
- Express.js
- TypeScript
- Prisma ORM 7
- SQLite

### Fitur API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/pengguna` | Mengambil semua pengguna |
| GET | `/pengguna?nim=...` | Mencari pengguna berdasarkan NIM |
| POST | `/pengguna` | Menambahkan pengguna |
| DELETE | `/pengguna/:nim` | Menghapus pengguna |

### Validasi
- NIM wajib diisi.
- Nama wajib diisi.
- Email wajib valid.
- Role harus berupa teks jika diberikan.
- Data yang tidak sesuai akan mendapatkan respons 400.

### Status HTTP
- 200: Berhasil mengambil data.
- 201: Berhasil menambahkan data.
- 400: Validasi gagal.
- 404: Pengguna tidak ditemukan.
- 500: Kesalahan server.

### Cara Menjalankan

1. Install dependencies:
   `npm install`

2. Jalankan server:
   `node --experimental-strip-types latihan.ts`

3. Server berjalan di:
   `http://localhost:3009`

### Database
Database menggunakan SQLite dengan Prisma ORM. Model yang digunakan adalah `Pengguna`, dengan atribut NIM, nama, email, dan role.