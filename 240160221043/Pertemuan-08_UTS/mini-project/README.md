# WarungKu API

REST API sederhana untuk mengelola data menu pada aplikasi E-Warung. Proyek ini dibuat untuk memenuhi tugas UTS mata kuliah Backend Development (CPMK117), Program Studi Sistem Informasi.

## Identitas

- **Nama:** Salwa Ananda Rachmat
- **NIM:** 240160221043
- **Kelas:** SI-VB
- **Proyek:** WarungKu API

## Deskripsi Proyek

WarungKu merupakan REST API sederhana yang digunakan untuk mengelola daftar menu makanan dan minuman. API ini menyediakan fitur CRUD (Create, Read, Update, Delete) agar data menu dapat ditambahkan, ditampilkan, diperbarui, dan dihapus.

## Teknologi yang Digunakan

- Node.js
- Express.js 5
- TypeScript
- Prisma ORM 7
- SQLite

## Fitur

- Menampilkan seluruh menu.
- Menampilkan detail menu berdasarkan ID.
- Menambahkan menu baru.
- Memperbarui data menu.
- Menghapus menu.
- Validasi data pada proses penambahan dan perubahan.
- Penanganan error dan endpoint yang tidak ditemukan.
- Penyimpanan data menggunakan SQLite.

## Struktur Folder

```text
mini-project/
├── app.ts
├── server.ts
├── client.ts
├── prisma.config.ts
├── package.json
├── tsconfig.json
├── .env
├── .env.example
├── README.md
├── prisma/
│   ├── migrations/
│   ├── generated/
│   └── schema.prisma
└── src/
    ├── routes/
    │   └── menu.routes.ts
    ├── controller/
    │   └── menu.controller.ts
    └── service/
        └── menu.service.ts
```

## Struktur Layer

Proyek ini menggunakan layered architecture yang terdiri dari tiga bagian:

1. **Routes:** Mengatur endpoint API dan menghubungkannya dengan controller.
2. **Controller:** Mengatur request dan response, melakukan validasi input, serta menangani status HTTP.
3. **Service:** Mengelola proses bisnis dan berkomunikasi dengan database menggunakan Prisma ORM.

Alur proses:

`Client → Routes → Controller → Service → Prisma ORM → SQLite`

## Model Data Menu

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | Int | Primary key, otomatis |
| nama | String | Nama menu |
| harga | Int | Harga menu |
| kategori | String | Kategori makanan/minuman |
| tersedia | Boolean | Status ketersediaan, default true |

## Cara Menjalankan Proyek

### 1. Clone atau buka folder proyek

Pastikan terminal berada di dalam folder `mini-project`.

### 2. Install dependencies

```bash
npm install
```

### 3. Atur environment

Buat file `.env` dengan konfigurasi:

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3012
```

### 4. Jalankan migrasi database

```bash
npx prisma migrate dev --name init
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Jalankan server

```bash
npm run dev
```

Server berjalan pada:

`http://localhost:3012`

## Daftar Endpoint API

Base URL: `http://localhost:3012`

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/menu` | Menampilkan semua menu |
| GET | `/menu/:id` | Menampilkan detail menu |
| POST | `/menu` | Menambahkan menu |
| PATCH | `/menu/:id` | Memperbarui menu |
| DELETE | `/menu/:id` | Menghapus menu |

## Contoh Pengujian API

### 1. GET Semua Menu

```bash
curl http://localhost:3012/menu
```

Menampilkan seluruh data menu yang tersimpan.

### 2. GET Detail Menu

```bash
curl http://localhost:3012/menu/1
```

Menampilkan detail menu berdasarkan ID.

### 3. POST Tambah Menu

```bash
curl -X POST http://localhost:3012/menu \
-H "Content-Type: application/json" \
-d "{\"nama\":\"Seblak Original\",\"harga\":12000,\"kategori\":\"Makanan\",\"tersedia\":true}"
```

Menambahkan data menu baru.

### 4. PATCH Perbarui Menu

```bash
curl -X PATCH http://localhost:3012/menu/1 \
-H "Content-Type: application/json" \
-d "{\"harga\":14000}"
```

Memperbarui harga menu berdasarkan ID.

### 5. DELETE Hapus Menu

```bash
curl -X DELETE http://localhost:3012/menu/1
```

Menghapus menu berdasarkan ID.

## Validasi dan Status HTTP

API menggunakan beberapa status HTTP berikut:

| Status | Keterangan |
|---|---|
| 200 | Request berhasil |
| 201 | Data berhasil dibuat |
| 204 | Data berhasil dihapus |
| 400 | Data atau ID tidak valid |
| 404 | Data atau endpoint tidak ditemukan |
| 500 | Terjadi kesalahan pada server |

Validasi input diterapkan pada endpoint POST dan PATCH, meliputi:
- Nama harus berupa string dan tidak boleh kosong.
- Harga harus berupa angka bulat lebih dari 0.
- Kategori harus berupa string dan tidak boleh kosong.
- Tersedia harus berupa boolean.

## Database

Proyek ini menggunakan SQLite sebagai database dan Prisma ORM sebagai penghubung antara aplikasi dengan database.

Data disimpan secara permanen sehingga tidak hilang ketika server dihentikan atau dijalankan kembali.

---

**WarungKu API — UTS Backend Development**  
Universitas Sebelas April