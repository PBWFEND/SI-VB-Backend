
# Tugas 2 — Node.js Fundamentals

## Sistem Informasi Absensi Perkuliahan Mahasiswa

**Nama:** Disti Setiawati  
**NIM:** 240160221009  
**Kelas:** SI-VB

## 1. Deskripsi

Project ini merupakan API sederhana untuk Sistem Informasi Absensi Perkuliahan Mahasiswa. API digunakan untuk menampilkan informasi aplikasi, memeriksa status server, melihat data mahasiswa, dan melihat catatan absensi perkuliahan.

Project dibuat menggunakan Node.js tanpa Express.js. Server menggunakan module bawaan Node.js, yaitu `node:http`, sedangkan pembacaan data menggunakan `node:fs/promises`. Data mahasiswa dan absensi disimpan dalam file JSON.

## 2. Struktur Folder

```text
Tugas-2/
├── data/
│   ├── absensi.json
│   └── mahasiswa.json
├── bukti-testing/
│   ├── 01-get-root.png
│   ├── 02-get-health.png
│   ├── 03-get-mahasiswa.png
│   ├── 04-get-absensi.png
│   └── 05-get-404.png
├── config.js
├── helper.js
├── package.json
├── README.md
├── refleksi.md
└── server.js
```

## 3. Teknologi yang Digunakan

- Node.js
- JavaScript dengan sistem module ESM
- `node:http` untuk membuat HTTP server
- `node:fs/promises` untuk membaca file JSON secara asynchronous
- `node:path` untuk menentukan lokasi file
- PowerShell dan curl.exe untuk pengujian API

Project ini tidak menggunakan Express.js maupun dependency eksternal.

## 4. Cara Menjalankan Project

Pastikan Node.js sudah terpasang.

Buka terminal pada folder `Tugas-2`, kemudian jalankan:

```powershell
npm start
```

Secara default, server berjalan pada:

```text
http://localhost:3003
```

Untuk menghentikan server, tekan `Ctrl + C`.

### Konfigurasi Environment Variable

Konfigurasi aplikasi dapat diubah melalui environment variable.

Contoh pada PowerShell:

```powershell
$env:APP_NAME = "API Absensi Perkuliahan"
$env:PORT = "3004"
$env:NODE_ENV = "development"

npm start
```

Apabila environment variable tidak diatur, aplikasi menggunakan nilai default:
- APP_NAME: API Absensi Perkuliahan Mahasiswa
- PORT: 3003
- NODE_ENV: development

## 5. Daftar Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/` | Menampilkan informasi aplikasi dan daftar endpoint |
| GET | `/health` | Memeriksa status server |
| GET | `/mahasiswa` | Menampilkan seluruh data mahasiswa |
| GET | `/mahasiswa/1` | Menampilkan detail mahasiswa berdasarkan ID |
| GET | `/absensi` | Menampilkan seluruh data absensi |
| GET | `/absensi/1` | Menampilkan detail absensi berdasarkan ID |

Endpoint dengan ID dapat menggunakan ID lain sesuai data yang tersedia.

Apabila endpoint tidak ditemukan atau ID tidak tersedia, server akan mengirimkan response dengan status `404 Not Found`.

## 6. Pengujian Endpoint

Jalankan server terlebih dahulu, kemudian buka terminal kedua untuk melakukan pengujian.

### a. Pengujian halaman utama

```powershell
curl.exe -i http://localhost:3003/
```

Hasil yang diharapkan: `200 OK`.

### b. Pengujian status server

```powershell
curl.exe -i http://localhost:3003/health
```

Hasil yang diharapkan: `200 OK`.

### c. Pengujian data mahasiswa

```powershell
curl.exe -i http://localhost:3003/mahasiswa
```

Hasil yang diharapkan: `200 OK` dan daftar mahasiswa ditampilkan.

### d. Pengujian detail mahasiswa

```powershell
curl.exe -i http://localhost:3003/mahasiswa/1
```

Hasil yang diharapkan: `200 OK` dan detail mahasiswa ditampilkan.

### e. Pengujian data absensi

```powershell
curl.exe -i http://localhost:3003/absensi
```

Hasil yang diharapkan: `200 OK` dan daftar absensi ditampilkan.

### f. Pengujian detail absensi

```powershell
curl.exe -i http://localhost:3003/absensi/1
```

Hasil yang diharapkan: `200 OK` dan detail absensi ditampilkan.

### g. Pengujian endpoint tidak tersedia

```powershell
curl.exe -i http://localhost:3003/tidak-ada
```

Hasil yang diharapkan: `404 Not Found`.

## 7. Bukti Pengujian

Bukti pengujian berupa screenshot hasil menjalankan endpoint disimpan pada folder `bukti-testing/`.

Bukti tersebut meliputi:
1. Pengujian GET `/`.
2. Pengujian GET `/health`.
3. Pengujian GET `/mahasiswa`.
4. Pengujian GET `/absensi`.
5. Pengujian endpoint tidak tersedia dengan status 404.

## 8. Kesimpulan

Melalui project ini, saya mempelajari cara membuat HTTP server sederhana menggunakan Node.js tanpa Express.js. Saya juga memahami penggunaan module ESM, environment variable, pembacaan file JSON secara asynchronous, routing berdasarkan method dan URL, serta pengiriman response JSON dengan status code yang sesuai.
