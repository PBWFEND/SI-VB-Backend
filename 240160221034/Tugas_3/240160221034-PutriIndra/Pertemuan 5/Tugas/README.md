# Tugas 3 — REST API Sistem Informasi Perpustakaan

## Deskripsi

REST API sederhana menggunakan Express.js untuk mengelola data buku pada Sistem Informasi Perpustakaan. API ini menyediakan fitur untuk melihat daftar buku, melihat detail buku, menambahkan buku, mengubah data buku, dan menghapus buku. Data disimpan sementara di dalam memori tanpa menggunakan database.

## Teknologi

- Node.js
- Express.js
- JavaScript ES Modules

## Cara Menjalankan

1. Pastikan Node.js sudah terpasang.
2. Buka terminal pada folder proyek.
3. Jalankan perintah berikut:

   ```bash
   npm install
   node server.js
   ```

Server berjalan pada `http://localhost:3006`.

## Daftar Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/` | Menampilkan informasi API |
| GET | `/health` | Memeriksa status server |
| GET | `/buku` | Menampilkan daftar buku |
| GET | `/buku/:id` | Menampilkan detail buku berdasarkan ID |
| POST | `/buku` | Menambahkan buku baru |
| PUT | `/buku/:id` | Mengganti seluruh data buku |
| PATCH | `/buku/:id` | Memperbarui sebagian data buku |
| DELETE | `/buku/:id` | Menghapus buku berdasarkan ID |

Endpoint `GET /buku` juga mendukung filter berdasarkan penulis, tahun terbit, dan stok minimum.

## Pengujian

Pengujian dilakukan menggunakan browser dan PowerShell untuk memastikan setiap endpoint berjalan sesuai fungsinya.

| Pengujian | Hasil |
|---|---|
| GET daftar buku | 200 OK |
| GET detail buku | 200 OK |
| GET filter buku | 200 OK |
| POST tambah buku | 201 Created |
| PUT ubah buku | 200 OK |
| PATCH perbarui buku | 200 OK |
| DELETE hapus buku | 204 No Content |
| GET buku tidak ditemukan | 404 Not Found |

Bukti pengujian disimpan pada folder `bukti-testing`.

## Contoh Request POST

**URL:** `POST /buku`

**Body JSON:**

```json
{
  "judul": "Laskar Pelangi",
  "penulis": "Andrea Hirata",
  "tahun": 2005,
  "stok": 5
}
```

## Bantuan AI

AI digunakan sebagai asisten dalam memahami kode, membantu proses pengujian, dan menyusun dokumentasi. Pengujian dilakukan untuk memastikan endpoint REST API berjalan sesuai dengan fungsinya.