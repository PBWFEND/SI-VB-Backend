# Latihan Individu Pertemuan 6 – Prisma ORM

## Identitas
- **Nama:** Salwa Ananda Rachmat
- **NIM:** 240160221043
- **Program Studi:** Sistem Informasi
- **Kelas:** SI-VB

## Deskripsi
Latihan Individu Pertemuan 6 merupakan implementasi REST API menggunakan Node.js, Express.js, Prisma ORM, dan database SQLite.

Aplikasi ini digunakan untuk mengelola data pengguna (Pengguna) melalui empat endpoint utama, yaitu GET, POST, PATCH, dan DELETE.

## Teknologi
- Node.js
- Express.js
- Prisma ORM 7
- SQLite
- TypeScript

## Struktur Folder
```text
Latihan-Individu/
├── prisma/
│   ├── generated/
│   ├── migrations/
│   └── schema.prisma
├── .env
├── .env.example
├── client.ts
├── latihan.ts
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Instalasi

Install seluruh dependency:

```bash
npm install
```

Salin file `.env.example` menjadi `.env`, kemudian sesuaikan konfigurasi database:

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3009
```

Jalankan migration database:

```bash
npx prisma@7 migrate dev --name init
```

Generate Prisma Client:

```bash
npx prisma@7 generate
```

## Menjalankan Aplikasi

```bash
npm start
```

Server berjalan pada:

```text
http://localhost:3009
```

## Daftar Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/pengguna/:nim` | Mengambil data pengguna berdasarkan NIM |
| POST | `/pengguna` | Menambahkan pengguna baru |
| PATCH | `/pengguna/:nim` | Memperbarui data pengguna |
| DELETE | `/pengguna/:nim` | Menghapus data pengguna |

## Contoh Pengujian

### 1. GET Pengguna

```http
GET /pengguna/240160221043
```

Mengambil data pengguna berdasarkan NIM.

### 2. POST Pengguna

```json
{
  "nim": "240160221043",
  "nama": "Salwa Ananda Rachmat",
  "email": "salwa@gmail.com",
  "role": "mahasiswa"
}
```

Menambahkan data pengguna baru.

### 3. PATCH Pengguna

```json
{
  "nama": "Salwa Ananda Rachmat Updated"
}
```

Memperbarui data pengguna berdasarkan NIM.

### 4. DELETE Pengguna

```http
DELETE /pengguna/240160221043
```

Menghapus data pengguna berdasarkan NIM.

## Status Pengujian

Seluruh endpoint telah diuji menggunakan PowerShell dengan hasil:

- GET: Berhasil.
- POST: Berhasil.
- PATCH: Berhasil.
- DELETE: Berhasil.
- Database SQLite dan migration: Berhasil.
- Prisma Client: Berhasil.

## Kesimpulan

Latihan Individu Pertemuan 6 berhasil diselesaikan. Aplikasi REST API telah terhubung dengan database SQLite menggunakan Prisma ORM dan dapat menjalankan operasi CRUD pada data pengguna.