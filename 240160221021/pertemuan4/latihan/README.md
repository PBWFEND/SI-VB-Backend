# Latihan Pertemuan 4 - Routing dan Middleware Express.js

Nama dan NIM: Lintang Azzahra Govarana (240160221021)

Aplikasi Express.js sederhana untuk data buku, dengan middleware logger, route parameter, query parameter, validasi input, dan penanganan 404.

## Cara menjalankan

Syarat: Node.js versi 20 atau lebih baru.

```
npm install
node latihan.js
```

Server berjalan di `http://localhost:3005`.

## Daftar endpoint

| Method | Endpoint | Fungsi | Status |
|:--|:--|:--|:--|
| GET | /buku | Daftar buku, dapat difilter dengan ?tersedia=true atau ?tersedia=false | 200 |
| GET | /buku/:id | Detail satu buku | 200 / 404 |
| POST | /buku | Menambah buku (field judul dan penulis wajib) | 201 / 400 |
| GET | endpoint lain | Endpoint tidak ditemukan | 404 |

## Hasil pengujian

| No | Request | Status | Hasil |
|:--|:--|:--|:--|
| 1 | GET /buku?tersedia=true | 200 | Hanya buku Belajar Node.js yang tampil |
| 2 | GET /buku/99 | 404 | Pesan: Buku tidak ditemukan |
| 3 | POST /buku dengan judul dan penulis | 201 | Buku baru tersimpan dengan id 3 |
| 4 | POST /buku tanpa penulis | 400 | Data ditolak karena field wajib belum lengkap |
| 5 | GET /tidak-ada | 404 | Pesan: Endpoint GET /tidak-ada tidak ditemukan |

Contoh perintah pengujian di PowerShell:

```
curl.exe -i "http://localhost:3005/buku?tersedia=true"
curl.exe -i http://localhost:3005/buku/99
curl.exe -i http://localhost:3005/tidak-ada
```