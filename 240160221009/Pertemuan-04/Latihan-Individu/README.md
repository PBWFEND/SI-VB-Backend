
# Latihan Individu Pertemuan 4 — Express.js Dasar

**Nama:** Disti Setiawati  
**NIM:** 240160221009  
**Kelas:** SI-VB

## Deskripsi

Latihan ini membuat API sederhana untuk kasus perpustakaan menggunakan Node.js dan Express.js 5. Data buku disimpan sementara di memory, sehingga data akan kembali ke kondisi awal ketika server dijalankan ulang.

## Teknologi

- Node.js v24.15.0
- Express.js 5.3.0
- JavaScript ES Module
- PowerShell untuk pengujian API

## Struktur Project

```text
Latihan-Individu/
├── .gitignore
├── package.json
├── package-lock.json
├── latihan.js
└── README.md
```

Folder `node_modules` tidak disertakan dalam Git.

## Cara Menjalankan

```powershell
npm install
npm start
```

Server berjalan di `http://localhost:3005`.

## Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | /buku | Menampilkan semua buku |
| GET | /buku?tersedia=true | Filter buku tersedia |
| GET | /buku?tersedia=false | Filter buku tidak tersedia |
| GET | /buku/:id | Menampilkan detail buku |
| POST | /buku | Menambahkan buku baru |

## Middleware

1. Logger untuk mencatat waktu, method, dan URL request.
2. `express.json()` untuk membaca request body JSON.
3. Handler 404 untuk endpoint yang tidak ditemukan.
4. Error middleware untuk menangani kesalahan server.

## Hasil Pengujian

| No. | Pengujian | Status | Hasil |
|---|---|---|---|
| 1 | GET /buku | 200 | Berhasil menampilkan 3 buku |
| 2 | GET /buku?tersedia=true | 200 | Menampilkan 2 buku |
| 3 | GET /buku?tersedia=false | 200 | Menampilkan 1 buku |
| 4 | GET /buku/1 | 200 | Detail buku berhasil ditampilkan |
| 5 | GET /buku/99 | 404 | Buku tidak ditemukan |
| 6 | GET /tidak-ada | 404 | Endpoint tidak ditemukan |
| 7 | POST /buku dengan data valid | 201 | Buku berhasil ditambahkan dengan ID 4 |
| 8 | POST /buku tanpa penulis | 400 | Input ditolak |
| 9 | GET /buku?tersedia=abc | 400 | Query tidak valid |
| 10 | GET /buku setelah POST | 200 | Total buku menjadi 4 |

## Contoh Data POST

```json
{
  "judul": "Pemrograman Backend",
  "penulis": "Disti Setiawati"
}
```

Buku berhasil ditambahkan dengan ID 4.

## Contoh Validasi Input

Jika field penulis tidak diisi, server mengirimkan:

```json
{
  "success": false,
  "message": "Field judul dan penulis wajib diisi"
}
```

Status: `400 Bad Request`.

## Kesimpulan

Melalui latihan ini, saya mempelajari penggunaan Express.js untuk membuat HTTP server, mengatur routing berdasarkan method dan URL, menggunakan route parameter dan query parameter, serta membaca request body JSON. Saya juga mempelajari penggunaan middleware logger, validasi input, dan penanganan endpoint yang tidak ditemukan. Pengujian dilakukan menggunakan PowerShell dan hasilnya sesuai dengan status code yang diharapkan.
