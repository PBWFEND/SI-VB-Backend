# Tugas 4 — Integrasi Database dan ORM untuk REST API

## Identitas
- **Nama:** Putri Indra
- **NIM:** 240160221034
- **Kelas:** SI-VB
- **Mata Kuliah:** Praktikum Backend

## Deskripsi
Proyek ini merupakan pengembangan REST API dari Tugas 3 dengan mengintegrasikan database SQLite menggunakan Prisma ORM.

API ini mengelola data buku dengan operasi CRUD (Create, Read, Update, Delete).

## Teknologi
- Node.js
- Express.js
- Prisma ORM
- SQLite
- Postman untuk pengujian API

## Struktur Proyek

```text
Tugas/
├── bukti-testing/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── .env.example
├── .gitignore
├── app.js
├── client.js
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Instalasi

1. Clone atau download repository.
2. Masuk ke folder proyek.
3. Install dependency:

```bash
npm install
```

4. Salin `.env.example` menjadi `.env`.

Pada Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

5. Jalankan migrasi database:

```bash
npx prisma migrate dev --name init
```

6. Jalankan server:

```bash
node server.js
```

Server berjalan pada:

```text
http://localhost:3006
```

## Konfigurasi Environment

Buat file `.env` berdasarkan `.env.example`:

```env
DATABASE_URL="file:./dev.db"
PORT=3006
```

File `.env` tidak disertakan dalam repository karena berisi konfigurasi lokal.

## Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Informasi API |
| GET | `/health` | Memeriksa status API |
| GET | `/buku` | Mengambil semua buku |
| GET | `/buku/:id` | Mengambil detail buku |
| POST | `/buku` | Menambahkan buku |
| PUT | `/buku/:id` | Mengubah seluruh data buku |
| PATCH | `/buku/:id` | Mengubah sebagian data buku |
| DELETE | `/buku/:id` | Menghapus buku |

### Contoh Request

**1. Menambahkan buku**

Method: `POST`

URL: `http://localhost:3006/buku`

Body JSON:

```json
{
  "judul": "Belajar Node.js",
  "penulis": "Andi",
  "tahun": 2024,
  "stok": 3
}
```

**2. Mengambil semua buku**

Method: `GET`

URL: `http://localhost:3006/buku`

**3. Mengambil detail buku**

Method: `GET`

URL: `http://localhost:3006/buku/1`

**4. Mengubah sebagian data buku**

Method: `PATCH`

URL: `http://localhost:3006/buku/1`

Body JSON:

```json
{
  "stok": 10
}
```

**5. Menghapus buku**

Method: `DELETE`

URL: `http://localhost:3006/buku/1`

## Validasi dan Status HTTP

API menerapkan validasi input, antara lain:
- Judul dan penulis wajib berupa teks dan tidak boleh kosong.
- Tahun harus berupa bilangan bulat dengan nilai minimal 1900.
- Stok harus berupa bilangan bulat dan tidak boleh negatif.
- ID buku harus valid.

Status HTTP yang digunakan:
- `200 OK` — Permintaan berhasil.
- `201 Created` — Data berhasil ditambahkan.
- `204 No Content` — Data berhasil dihapus.
- `400 Bad Request` — Input tidak valid.
- `404 Not Found` — Data tidak ditemukan.
- `500 Internal Server Error` — Terjadi kesalahan pada server.

## Bukti Pengujian

Bukti pengujian API menggunakan Postman disimpan di folder `bukti-testing/`, meliputi:
1. GET semua buku.
2. POST tambah buku.
3. GET detail buku.
4. GET buku tidak ditemukan.
5. POST data tidak valid.
6. PUT ubah seluruh data buku.
7. PATCH ubah sebagian data buku.
8. DELETE hapus buku.
9. GET setelah DELETE.

## Database

Database menggunakan SQLite dengan Prisma ORM.

Schema database berada di:

```text
prisma/schema.prisma
```

File migrasi database berada di:

```text
prisma/migrations/
```

Untuk menjalankan migrasi pada lingkungan lokal:

```bash
npx prisma migrate dev
```

## Catatan

Folder `node_modules/`, file `.env`, dan database lokal `.db` tidak disertakan dalam repository. Dependency dapat dipasang kembali menggunakan `npm install`, sedangkan database dapat dibuat melalui perintah migrasi Prisma.