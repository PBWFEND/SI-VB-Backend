# Latihan Individu Pertemuan 06

## Deskripsi

Latihan ini merupakan implementasi API untuk resource **Pengguna** menggunakan **Express.js**, **TypeScript**, **Prisma**, dan database **SQLite**.

API ini mendukung operasi CRUD (Create, Read, Update, Delete) pada data pengguna.

## Teknologi yang Digunakan

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite

## Struktur Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/pengguna` | Mengambil seluruh data pengguna |
| GET | `/pengguna/:nim` | Mengambil data pengguna berdasarkan NIM |
| POST | `/pengguna` | Menambahkan pengguna baru |
| PATCH | `/pengguna/:nim` | Mengubah data pengguna |
| DELETE | `/pengguna/:nim` | Menghapus pengguna |

## Cara Menjalankan Project

Masuk ke folder project:

```bash
cd latihan-individu
```

Install dependency:

```bash
npm install
```

Jalankan migrasi database:

```bash
npx prisma migrate dev --name pengguna
```

Jalankan aplikasi:

```bash
node --experimental-strip-types latihan.ts
```

Server akan berjalan pada:

```text
http://localhost:3009
```

## Hasil Pengujian

### 1. GET /pengguna

Endpoint berhasil mengambil daftar pengguna.

**Status:** `200 OK`

Pada pengujian awal, database belum memiliki data sehingga menghasilkan:

```json
{
  "success": true,
  "message": "Data pengguna berhasil diambil",
  "data": {
    "total": 0,
    "data": []
  }
}
```

### 2. POST /pengguna

Endpoint berhasil menambahkan pengguna baru.

**Status:** `201 Created`

Data yang ditambahkan:

```json
{
  "nim": "240160221055",
  "nama": "Rasya Putri Ramadhani",
  "email": "rasya@example.com",
  "role": "USER"
}
```

### 3. GET /pengguna/:nim

Endpoint berhasil mengambil data pengguna berdasarkan NIM.

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Data pengguna berhasil diambil"
}
```

### 4. PATCH /pengguna/:nim

Endpoint berhasil memperbarui nama dan role pengguna.

**Status:** `200 OK`

Data berhasil diperbarui menjadi:

- Nama: Rasya Putri Ramadhani Update
- Role: ADMIN

### 5. DELETE /pengguna/:nim

Endpoint berhasil menghapus data pengguna.

**Status:** `204 No Content`

### 6. Pengujian Setelah Data Dihapus

Setelah pengguna dihapus, dilakukan pengujian kembali menggunakan NIM yang sama.

**Status:** `404 Not Found`

```json
{
  "success": false,
  "message": "Pengguna tidak ditemukan"
}
```

## Kesimpulan

Seluruh endpoint yang dibuat berhasil diuji, mulai dari mengambil data, menambahkan data, mencari pengguna berdasarkan NIM, memperbarui data, hingga menghapus data. API juga dapat memberikan response `404 Not Found` ketika data pengguna sudah tidak tersedia.