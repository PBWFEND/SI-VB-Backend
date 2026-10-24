# Pertemuan 4 — Latihan Routing dan Middleware Express.js

## Tujuan

Menerapkan routing, route parameter, query parameter, middleware, dan penanganan error menggunakan Express.js.

## Endpoint API

| Metode                                 | Endpoint               | Fungsi                                                  |
| -------------------------------------- | ---------------------- | ------------------------------------------------------- |
| GET                                    | `/buku`                | Menampilkan seluruh buku.                               |
| GET                                    | `/buku?tersedia=true`  | Menampilkan buku yang tersedia.                         |
| GET                                    | `/buku?tersedia=false` | Menampilkan buku yang tidak tersedia.                   |
| GET                                    | `/buku/:id`            | Menampilkan buku berdasarkan ID.                        |
| POST                                   | `/buku`                | Menambahkan buku baru dengan judul dan penulis.         |
| Semua metode yang tidak memiliki route | Endpoint lain          | Mengembalikan status 404 jika endpoint tidak ditemukan. |

## Middleware Logger

Middleware logger mencatat waktu, metode HTTP, dan URL setiap request yang masuk ke server.

Contoh log:
`[9/10/2026, 19.37.08] GET /anggota`

## Hasil Pengujian

1. `GET /buku/1` — berhasil mengembalikan data buku dengan status 200 OK.
2. `GET /buku/99` — mengembalikan status 404 dengan pesan "Buku tidak ditemukan".
3. `GET /buku?tersedia=true` — berhasil menampilkan buku yang tersedia.
4. `GET /buku?tersedia=false` — berhasil menampilkan buku yang tidak tersedia.
5. `POST /buku` dengan data lengkap — berhasil menambahkan buku dengan status 201 Created.
6. `POST /buku` tanpa penulis — mengembalikan pesan bahwa judul dan penulis wajib diisi.
7. `GET /anggota` — mengembalikan status 404 dengan pesan "Endpoint tidak ditemukan".

## Kesimpulan

Latihan ini menerapkan routing Express.js, penggunaan parameter dan query, middleware logger, penambahan data menggunakan POST, validasi input, serta penanganan endpoint yang tidak ditemukan.
