
# Latihan Individu Pertemuan 04
## API Manajemen Buku

### Cara Menjalankan
1. Jalankan `npm install`.
2. Jalankan `node app.js`.
3. Server berjalan pada port 3000.

### Daftar Endpoint

| Method | URL | Status | Keterangan |
|---|---|---|---|
| GET | /buku | 200 | Menampilkan semua buku |
| GET | /buku/1 | 200 | Buku ditemukan |
| GET | /buku/99 | 404 | Buku tidak ditemukan |
| GET | /buku?tersedia=true | 200 | Filter buku tersedia |
| GET | /buku?tersedia=false | 200 | Filter buku tidak tersedia |
| POST | /buku | 201 | Berhasil menambah buku |
| POST | /buku | 400 | Field wajib tidak lengkap |
| GET | /halaman-salah | 404 | Endpoint tidak ditemukan |

### Middleware Logger
Mencatat waktu request, method, dan URL.

### Response JSON
Seluruh endpoint mengembalikan response dalam format JSON.

### 1. Deskripsi
Latihan ini bertujuan untuk memahami penggunaan Express.js dalam membangun REST API sederhana, meliputi middleware, routing, query parameter, request body, dan penanganan error.

### 2. Teknologi yang Digunakan
- Node.js
- Express.js
- JSON
- PowerShell dan curl untuk pengujian API

### 3. Cara Menjalankan Aplikasi
1. Buka terminal pada folder `latihan`.
2. Instal dependensi dengan perintah:

   ```bash
   npm install express
   ```

3. Jalankan aplikasi:

   ```bash
   node app.js
   ```

4. Server berjalan di `http://localhost:3000`.

### 4. Daftar Endpoint

| Method | Endpoint | Status | Keterangan |
|---|---|---|---|
| GET | `/buku` | 200 | Menampilkan semua buku |
| GET | `/buku/1` | 200 | Menampilkan buku berdasarkan ID |
| GET | `/buku/99` | 404 | Buku tidak ditemukan |
| GET | `/buku?tersedia=true` | 200 | Menampilkan buku yang tersedia |
| GET | `/buku?tersedia=false` | 200 | Menampilkan buku yang tidak tersedia |
| POST | `/buku` | 201 | Menambahkan buku baru |
| POST | `/buku` | 400 | Validasi jika field wajib tidak lengkap |
| GET | `/halaman-salah` | 404 | Endpoint tidak ditemukan |

### 5. Middleware Logger
Middleware logger digunakan untuk mencatat waktu request, HTTP method, dan URL yang diakses. Middleware memanggil `next()` agar request dapat diteruskan ke handler berikutnya.

Contoh log:

```text
[25/10/2026, 23.00.00] GET /buku
```

### 6. Validasi Request
Endpoint `POST /buku` membutuhkan dua field:
- `judul`
- `penulis`

Jika salah satu field kosong atau tidak dikirim, API mengembalikan status `400 Bad Request`. Jika berhasil, API mengembalikan status `201 Created`.

### 7. Penanganan Error
- `400 Bad Request`: data request tidak memenuhi validasi.
- `404 Not Found`: buku atau endpoint tidak ditemukan.
- `200 OK`: request berhasil.
- `201 Created`: data buku baru berhasil dibuat.

Semua response dikembalikan dalam format JSON.

### 8. Kesimpulan
Melalui latihan ini, saya mempelajari cara membangun REST API menggunakan Express.js, membuat middleware logger, menggunakan route parameter dan query parameter, memproses request body, serta menangani error menggunakan HTTP status code yang sesuai.

