# Tugas 4 — Integrasi Database dan ORM untuk REST API

## Deskripsi
Proyek ini mengembangkan resource `anggota` dari Tugas 3. Data yang sebelumnya disimpan di array JavaScript sekarang disimpan secara permanen pada database SQLite melalui Prisma ORM.

## Teknologi
- Node.js
- Express.js 5
- Prisma ORM 7
- SQLite dan `better-sqlite3`
- Postman untuk pengujian endpoint

## Struktur proyek
```text
pertemuan-06/
├── prisma/
│   └── schema.prisma
├── .env.example
├── .gitignore
├── app.js
├── client.js
├── package.json
├── prisma.config.ts
├── README.md
└── server.js
```

## Cara menjalankan
Pastikan Node.js versi 20 atau lebih baru sudah tersedia.

1. Buka terminal pada folder proyek.
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Salin `.env.example` menjadi `.env`. Pada PowerShell Windows:
   ```powershell
   Copy-Item .env.example .env
   ```
   Jika `.env` sudah ada, tidak perlu menyalinnya lagi.
4. Buat tabel database melalui migration:
   ```bash
   npx prisma@7 migrate dev --name init
   ```
5. Jalankan server:
   ```bash
   npm start
   ```
   Server berjalan pada `http://localhost:3008`.

## Model data
Model `Anggota` memiliki:
- `id`: integer primary key otomatis.
- `nama`: nama anggota.
- `npm`: NPM 12 digit dan harus unik.
- `divisi`: nama divisi.

Database memakai SQLite dan URL koneksinya diatur melalui `DATABASE_URL` pada file `.env`. Jangan commit file `.env`; commit `.env.example` saja.

## Endpoint
Base URL: `http://localhost:3008`

| Method | Endpoint | Fungsi | Sukses |
|---|---|---|---|
| GET | `/anggota` | Mengambil semua anggota; mendukung filter `nama` dan `divisi` | 200 |
| GET | `/anggota/:id` | Mengambil detail anggota | 200 |
| POST | `/anggota` | Menambahkan anggota baru | 201 |
| PATCH | `/anggota/:id` | Memperbarui sebagian data | 200 |
| DELETE | `/anggota/:id` | Menghapus anggota | 204 |

## Contoh request

### Mengambil semua anggota
```http
GET http://localhost:3008/anggota
```

### Filter anggota
```http
GET http://localhost:3008/anggota?divisi=Backend
GET http://localhost:3008/anggota?nama=Rasya
```

### Menambah anggota
`POST http://localhost:3008/anggota`, pilih Body → raw → JSON:
```json
{
  "nama": "Dina Putri",
  "npm": "240160221057",
  "divisi": "UI/UX"
}
```

### Melihat detail
```http
GET http://localhost:3008/anggota/1
```

### Mengubah sebagian data
`PATCH http://localhost:3008/anggota/1`, Body → raw → JSON:
```json
{
  "divisi": "Backend"
}
```

### Menghapus data
```http
DELETE http://localhost:3008/anggota/1
```
Jika berhasil, response adalah `204 No Content`.

## Validasi
- `nama`, `npm`, dan `divisi` wajib diisi saat POST.
- Nama minimal dua karakter.
- NPM harus tepat 12 digit.
- NPM harus unik.
- PATCH menerima satu atau lebih field yang diizinkan.
- ID harus berupa bilangan bulat positif.
- ID tidak ditemukan menghasilkan `404`.
- Input tidak valid menghasilkan `400`.

## Catatan pengujian
Setelah migration berhasil dan server aktif, uji setiap endpoint menggunakan Postman. Data tidak otomatis terisi pada database baru; tambahkan data melalui POST sebelum menguji detail, PATCH, atau DELETE. Setelah restart server, data yang tersimpan di SQLite tetap tersedia.

## Bantuan AI
AI digunakan sebagai pendamping untuk memahami integrasi Prisma, menyusun validasi, dan membuat dokumentasi. Seluruh endpoint tetap perlu dijalankan dan diuji kembali secara mandiri.
