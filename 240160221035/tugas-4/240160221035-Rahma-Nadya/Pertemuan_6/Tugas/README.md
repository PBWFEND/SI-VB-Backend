# API Absensi Organisasi

## Identitas Mahasiswa

- **Nama:** Rahma Nadya
- **NIM:** 240160221035
- **Mata Kuliah:** Praktikum Backend

## Deskripsi

Project ini merupakan API Absensi Organisasi yang dibuat menggunakan Node.js, Express.js, Prisma ORM, SQLite, dan TypeScript.

API ini digunakan untuk mengelola data anggota organisasi dan data absensi. Fitur yang tersedia meliputi operasi CRUD (*Create, Read, Update, Delete*) untuk data anggota dan absensi, serta filter data absensi berdasarkan ID anggota dan status kehadiran.

## Teknologi yang Digunakan

- Node.js
- Express.js
- Prisma ORM
- SQLite
- TypeScript
- Postman untuk pengujian API

## Struktur Proyek

```text
Tugas/
├── server.ts
├── package.json
├── package-lock.json
├── prisma.config.ts
├── .env
├── README.md
├── bukti-testing/
└── prisma/
    ├── schema.prisma
    ├── dev.db
    ├── generated/
    └── migrations/
```

## Cara Menjalankan

1. Pastikan Node.js sudah terinstal.
2. Buka terminal pada folder project.
3. Instal dependensi:

   ```bash
   npm install
   ```

4. Generate Prisma Client:

   ```bash
   npm run prisma:generate
   ```

5. Pastikan konfigurasi database SQLite sudah tersedia pada file `.env`.
6. Jalankan server:

   ```bash
   npm start
   ```

7. Akses API melalui:

   ```text
   http://localhost:3000
   ```

## Fitur API

### 1. Resource Anggota

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/anggota` | Mengambil semua anggota |
| GET | `/anggota/:id` | Mengambil detail anggota berdasarkan ID |
| POST | `/anggota` | Menambahkan anggota baru |
| PATCH | `/anggota/:id` | Memperbarui sebagian data anggota |
| DELETE | `/anggota/:id` | Menghapus anggota |

### 2. Resource Absensi

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/absensi` | Mengambil semua data absensi |
| GET | `/absensi?anggota_id=1` | Filter berdasarkan ID anggota |
| GET | `/absensi?status=Hadir` | Filter berdasarkan status |
| GET | `/absensi?anggota_id=1&status=Hadir` | Filter berdasarkan ID anggota dan status |
| GET | `/absensi/:id` | Mengambil detail absensi |
| POST | `/absensi` | Menambahkan data absensi |
| PUT | `/absensi/:id` | Mengganti seluruh data absensi |
| PATCH | `/absensi/:id` | Memperbarui sebagian data absensi |
| DELETE | `/absensi/:id` | Menghapus data absensi |

## Contoh Request

### Menambahkan Anggota

Endpoint: `POST /anggota`

```json
{
  "nama": "Budi Santoso",
  "nim": "240160221099"
}
```

### Memperbarui Anggota

Endpoint: `PATCH /anggota/:id`

```json
{
  "nama": "Budi Santoso Update"
}
```

### Menambahkan Absensi

Endpoint: `POST /absensi`

```json
{
  "anggota_id": 1,
  "kegiatan_id": 1,
  "status": "Hadir"
}
```

### Memperbarui Seluruh Data Absensi

Endpoint: `PUT /absensi/:id`

```json
{
  "anggota_id": 1,
  "kegiatan_id": 2,
  "status": "Izin"
}
```

### Memperbarui Sebagian Data Absensi

Endpoint: `PATCH /absensi/:id`

```json
{
  "status": "Sakit"
}
```

Status absensi yang diterima adalah:

- Hadir
- Izin
- Sakit
- Alpha

## Validasi dan Penanganan Error

API menyediakan validasi input dan penanganan error dengan status HTTP berikut:

| Status | Keterangan |
|---|---|
| 200 | Request berhasil |
| 201 | Data berhasil ditambahkan |
| 400 | Input tidak valid atau tidak lengkap |
| 404 | Data atau resource tidak ditemukan |
| 409 | NIM sudah terdaftar |
| 500 | Kesalahan internal server |

Validasi dilakukan untuk memastikan data nama, NIM, ID anggota, ID kegiatan, dan status absensi sesuai dengan ketentuan.

NIM anggota harus unik sehingga tidak dapat digunakan oleh lebih dari satu anggota.

## Database dan Relasi

Project menggunakan Prisma ORM dengan database SQLite.

Terdapat dua model utama:

**1. Anggota**

Menyimpan data:
- `id`
- `nama`
- `nim`

NIM memiliki ketentuan unik.

**2. Absensi**

Menyimpan data:
- `id`
- `anggota_id`
- `kegiatan_id`
- `status`

Model Absensi memiliki relasi dengan model Anggota menggunakan `anggota_id`. Apabila anggota dihapus, data absensi yang berelasi juga dihapus melalui aturan `onDelete: Cascade`.

## Hasil Pengujian

Pengujian API dilakukan menggunakan Postman.

Beberapa hasil pengujian yang telah dilakukan:

- GET halaman utama API berhasil.
- GET daftar anggota berhasil.
- GET detail anggota berhasil.
- POST anggota berhasil dengan status 201.
- PATCH anggota berhasil dengan status 200.
- DELETE anggota berhasil.
- Validasi anggota tanpa data lengkap menghasilkan status 400.
- NIM yang sudah terdaftar menghasilkan status 409.
- GET daftar absensi berhasil.
- Filter absensi berdasarkan ID anggota dan status berhasil.
- GET detail absensi berhasil.
- POST absensi berhasil dengan status 201.
- PUT absensi berhasil dengan status 200.
- PATCH absensi berhasil dengan status 200.
- DELETE absensi berhasil.

## Bukti Pengujian

Screenshot hasil pengujian API menggunakan Postman disimpan di dalam folder `bukti-testing/`.

Bukti pengujian digunakan sebagai dokumentasi bahwa endpoint Anggota dan Absensi telah diuji menggunakan Postman.