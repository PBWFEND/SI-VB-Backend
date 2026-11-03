# Tugas 4 Pertemuan 06 – Implementasi Prisma ORM

## Identitas
- **Nama:** Salwa Ananda Rachmat
- **NIM:** 240160221043
- **Program Studi:** Sistem Informasi
- **Kelas:** SI-VB

## Deskripsi
Tugas 4 merupakan pengembangan REST API Mahasiswa menggunakan Node.js, Express.js, Prisma ORM 7, dan database SQLite.

Aplikasi ini digunakan untuk mengelola data mahasiswa dengan operasi CRUD serta fitur filter berdasarkan program studi dan semester.

## Teknologi
- Node.js
- Express.js
- Prisma ORM 7
- SQLite
- TypeScript

## Struktur Folder
```text
Tugas-4/
├── prisma/
│   ├── generated/
│   ├── migrations/
│   └── schema.prisma
├── .env
├── .env.example
├── client.ts
├── tugas.ts
├── package.json
├── package-lock.json
├── prisma.config.ts
└── tsconfig.json
```

## Instalasi

Install dependency:

```bash
npm install
```

Buat file `.env` berdasarkan `.env.example`:

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3010
```

Jalankan migration:

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
http://localhost:3010
```

## Daftar Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/mahasiswa` | Menampilkan seluruh mahasiswa |
| GET | `/mahasiswa/:nim` | Menampilkan mahasiswa berdasarkan NIM |
| POST | `/mahasiswa` | Menambahkan mahasiswa |
| PATCH | `/mahasiswa/:nim` | Memperbarui data mahasiswa |
| DELETE | `/mahasiswa/:nim` | Menghapus mahasiswa |

## Fitur Filter

Filter berdasarkan prodi:

```http
GET /mahasiswa?prodi=Sistem%20Informasi
```

Filter berdasarkan semester:

```http
GET /mahasiswa?semester=5
```

Kombinasi filter:

```http
GET /mahasiswa?prodi=Sistem%20Informasi&semester=5
```

## Contoh Request

### POST Mahasiswa

```json
{
  "nim": "240160221043",
  "nama": "Salwa Ananda Rachmat",
  "prodi": "Sistem Informasi",
  "semester": 5
}
```

### PATCH Mahasiswa

```json
{
  "semester": 6
}
```

## Status Pengujian

Seluruh endpoint telah diuji menggunakan PowerShell dengan hasil:

- GET seluruh mahasiswa: Berhasil.
- GET berdasarkan NIM: Berhasil.
- Filter berdasarkan prodi: Berhasil.
- Filter berdasarkan semester: Berhasil.
- Kombinasi filter: Berhasil.
- POST dengan validasi: Berhasil.
- PATCH mahasiswa: Berhasil.
- DELETE mahasiswa: Berhasil.
- GET setelah DELETE (404): Berhasil.

## Kesimpulan

Tugas 4 berhasil diselesaikan dengan mengimplementasikan REST API Mahasiswa menggunakan Prisma ORM dan database SQLite. Aplikasi telah mendukung operasi CRUD, validasi data, serta filter berdasarkan prodi dan semester.