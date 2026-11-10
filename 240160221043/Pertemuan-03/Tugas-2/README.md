# Tugas 2 — Node.js Fundamentals

## Deskripsi Proyek

Proyek ini dibuat untuk memenuhi Tugas 2 mata kuliah Node.js Fundamentals. Aplikasi merupakan server HTTP sederhana yang dibuat menggunakan modul bawaan Node.js tanpa Express.

Aplikasi menyediakan endpoint untuk menampilkan informasi aplikasi, memeriksa status server, dan menampilkan data mahasiswa dari file JSON.

## Teknologi yang Digunakan

- Node.js
- JavaScript ES Modules
- Modul `node:http`
- Modul `node:fs/promises`
- Format data JSON

## Struktur Folder

```text
Tugas-2/
├── data/
│   └── students.json
├── config.js
├── package.json
├── README.md
├── refleksi.md
└── server.js
```

## Cara Menjalankan Aplikasi

1. Pastikan Node.js sudah terpasang.
2. Buka terminal pada folder proyek.
3. Jalankan perintah berikut:

```bash
npm start
```

4. Server berjalan pada alamat `http://localhost:3003`.

## Konfigurasi Aplikasi

Konfigurasi aplikasi disimpan dalam file `config.js`.

| Variabel | Nilai Default | Keterangan |
|---|---|---|
| `PORT` | `3003` | Port server |
| `NODE_ENV` | `development` | Lingkungan aplikasi |
| `COURSE_CODE` | `CPMK115` | Kode mata kuliah |

Nilai konfigurasi dapat diubah menggunakan environment variable.

## Daftar Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/` | Menampilkan informasi aplikasi dan kode mata kuliah |
| GET | `/health` | Memeriksa status server |
| GET | `/students` | Menampilkan data mahasiswa dari file JSON |
| GET | Endpoint lain | Mengembalikan respons 404 |

## Pengujian Endpoint

Pengujian dilakukan menggunakan `curl.exe` melalui terminal PowerShell.

### 1. Endpoint utama

```powershell
curl.exe -i http://localhost:3003/
```

Hasil aktual: `200 OK`, informasi aplikasi ditampilkan dalam format JSON.

### 2. Health check

```powershell
curl.exe -i http://localhost:3003/health
```

Hasil aktual: `200 OK`, status server menunjukkan `OK`.

### 3. Data mahasiswa

```powershell
curl.exe -i http://localhost:3003/students
```

Hasil aktual: `200 OK`, tiga data mahasiswa berhasil ditampilkan dari file JSON.

### 4. Endpoint tidak ditemukan

```powershell
curl.exe -i http://localhost:3003/tidak-ada
```

Hasil aktual: `404 Not Found`, dengan pesan `Endpoint tidak ditemukan`.

### 5. Pengujian Environment Variable

Hentikan server terlebih dahulu dengan `Ctrl + C`, kemudian jalankan:

```powershell
$env:COURSE_CODE="SI-VB"
npm start
```

Buka terminal baru dan jalankan:

```powershell
curl.exe -i http://localhost:3003/
```

Hasil yang diharapkan: nilai `courseCode` berubah menjadi `SI-VB`.

Setelah pengujian selesai, server dapat dihentikan menggunakan `Ctrl + C`.

## Penanganan Error

- Status `404` digunakan ketika endpoint tidak ditemukan.
- Status `405` digunakan ketika method HTTP selain GET digunakan.
- Status `500` digunakan ketika terjadi kesalahan pada server, termasuk kesalahan saat membaca atau memproses file JSON.

Penanganan error dilakukan menggunakan `try/catch`.

## Kesimpulan

Melalui proyek ini, saya mempelajari dasar pembuatan server HTTP menggunakan Node.js, pengaturan routing, penggunaan environment variable, pembacaan file JSON secara asynchronous, dan penanganan error berdasarkan status HTTP.
