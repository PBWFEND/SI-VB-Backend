# Tugas 2 — REST API Sistem Informasi Perpustakaan

## Deskripsi
REST API sederhana menggunakan Express.js untuk mengelola data buku pada sistem informasi perpustakaan.

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
   npm start
   ```

Server berjalan pada `http://localhost:3004`.

## Daftar Endpoint

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/` | Informasi API |
| GET | `/health` | Memeriksa status server |
| GET | `/buku` | Menampilkan semua buku |
| GET | `/buku/:id` | Menampilkan detail buku |
| POST | `/buku` | Menambahkan buku baru |
| PUT | `/buku/:id` | Memperbarui data buku |

## Pengujian
Pengujian dilakukan menggunakan Thunder Client.

| Pengujian | Hasil yang Diharapkan |
|-----------|-----------------------|
| GET daftar buku | 200 OK |
| GET detail buku | 200 OK |
| GET filter buku | 200 OK |
| POST tambah buku | 201 Created |
| PUT ubah buku | 200 OK |
| GET buku tidak ditemukan | 404 Not Found |
| GET endpoint tidak dikenal | 404 Not Found |

## Contoh Request POST

**URL:** `POST /buku`

**Body JSON:**

```json
{
  "judul": "Belajar Express JS",
  "penulis": "Putri Indra"
}
```

## Bantuan AI
AI digunakan sebagai asisten dalam penyusunan kode dan dokumentasi. Kode diuji menggunakan Thunder Client untuk memahami cara kerja endpoint REST API.