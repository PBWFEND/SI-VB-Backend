# Pertemuan 4 — Latihan Routing dan Middleware Express.js

## Tujuan

Menerapkan routing, route parameter, query parameter, middleware logger, validasi input, dan penanganan endpoint yang tidak ditemukan menggunakan Express.js.

## Cara Menjalankan

1. Buka terminal pada folder `Latihan`.
2. Jalankan `npm install` untuk memasang dependensi.
3. Jalankan `node latihan.js`.
4. Server berjalan di `http://localhost:3005`.

## Endpoint API

| Metode                               | Endpoint               | Fungsi                                                  |
| ------------------------------------ | ---------------------- | ------------------------------------------------------- |
| GET                                  | `/buku`                | Menampilkan seluruh buku.                               |
| GET                                  | `/buku?tersedia=true`  | Menampilkan buku yang tersedia.                         |
| GET                                  | `/buku?tersedia=false` | Menampilkan buku yang tidak tersedia.                   |
| GET                                  | `/buku/:id`            | Menampilkan buku berdasarkan ID.                        |
| POST                                 | `/buku`                | Menambahkan buku baru dengan judul dan penulis.         |
| Semua metode tanpa route yang sesuai | Endpoint lain          | Mengembalikan status 404 jika endpoint tidak ditemukan. |

## Middleware Logger

Middleware logger mencatat waktu, metode HTTP, dan URL setiap request yang masuk ke server.

Contoh format log:

```text
[2026-10-13T09:36:58.000Z] GET /buku?tersedia=abc
```

Waktu pada contoh tersebut hanya ilustrasi format log. Waktu aktual mengikuti waktu saat request diterima.

## Hasil Pengujian

Pengujian dilakukan menggunakan `curl.exe` dan PowerShell.

1. `GET /buku` — berhasil menampilkan daftar buku dengan status 200 OK. Setelah dua kali penambahan buku, total data menjadi 4 buku.
2. `GET /buku?tersedia=true` — berhasil menampilkan buku yang tersedia.
3. `GET /buku?tersedia=false` — berhasil menampilkan buku yang tidak tersedia.
4. `GET /buku/1` — berhasil mengembalikan data buku dengan status 200 OK.
5. `GET /buku/99` — mengembalikan status 404 Not Found dengan pesan `Buku tidak ditemukan`.
6. `POST /buku` dengan data lengkap — berhasil menambahkan buku dengan status 201 Created. Pengujian dilakukan dua kali sehingga buku baru memiliki ID 3 dan ID 4.
7. `POST /buku` dengan body `{}` — mengembalikan status 400 Bad Request karena field judul dan penulis wajib diisi.
8. `GET /buku?tersedia=abc` — mengembalikan status 400 Bad Request karena nilai query tidak valid.
9. `GET /halo` — mengembalikan status 404 Not Found karena endpoint tidak ditemukan.

## Kesimpulan

Latihan ini berhasil menerapkan routing Express.js, penggunaan route parameter dan query parameter, middleware logger, penambahan data menggunakan POST, validasi input, serta penanganan endpoint yang tidak ditemukan. Pengujian dilakukan menggunakan `curl.exe` dan PowerShell sesuai hasil yang diperoleh.