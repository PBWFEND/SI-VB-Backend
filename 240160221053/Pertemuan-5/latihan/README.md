# Latihan Individu — Pertemuan 4

Nama    : Athiyya Salsabila Hermawan
NPM     : 240160221053
Kelas   : SI-VB

## 📖 Deskripsi

Latihan ini mengimplementasikan:

1. Middleware logger yang mencatat **method** dan **URL**
2. Endpoint `GET /mahasiswa/:nim` dengan status **404** jika NIM tidak ditemukan
3. Filter `GET /mahasiswa?prodi=Sistem%20Informasi`
4. Endpoint `POST /mahasiswa` dengan validasi `nim`, `nama`, `prodi`, dan `angkatan`
5. Endpoint `PATCH /mahasiswa/:nim` untuk mengubah sebagian data
6. Pengujian response **200, 201, 400, dan 404**

| No | Method | Endpoint | Query Params | Body (JSON) | Status Sukses | Status Error |
|:--:|:------:|:---------|:-------------|:------------|:-------------:|:------------:|
| 1 | **GET** | `/mahasiswa` | `?prodi=`, `?angkatan=` | — | `200 OK` | — |
| 2 | **GET** | `/mahasiswa/:nim` | — | — | `200 OK` | `404 Not Found` |
| 3 | **POST** | `/mahasiswa` | — | `{ nim, nama, prodi, angkatan }` | `201 Created` | `400 Bad Request` |
| 4 | **PATCH** | `/mahasiswa/:nim` | — | `{ nama?, prodi?, angkatan? }` | `200 OK` | `404 Not Found` |

| Status | Keterangan | Digunakan Pada |
|:------:|:-----------|:---------------|
| `200 OK` | Request berhasil | GET, PATCH |
| `201 Created` | Resource berhasil dibuat | POST |
| `400 Bad Request` | Validasi gagal / NIM duplikat | POST |
| `404 Not Found` | Resource tidak ditemukan | GET detail, PATCH |
| `500 Internal Server Error` | Kesalahan server | Fallback |

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js versi 18 atau lebih baru

### Langkah-langkah

`CMD
cd code/pertemuan-05/latihan-individu

# 2. Install dependencies
npm install

# 3. Jalankan server
node latihan.js

### BUKTI PENGERJAAN

PS D:\240160221053\Pertemuan-5\latihan> node latihan.js
Latihan REST API berjalan di http://localhost:3007
[2026-10-30T10:05:36.263Z] GET /mahasiswa
[2026-10-30T10:06:24.880Z] GET /mahasiswa?prodi=Sistem%20Informasi
[2026-10-30T10:07:32.208Z] GET /mahasiswa?angkatan=2024
[2026-10-30T10:08:25.493Z] GET /mahasiswa/240160221053
[2026-10-30T10:09:19.418Z] GET /mahasiswa/F1D022000
[2026-10-30T10:16:36.704Z] POST /mahasiswa

### CMD TERMINAL BARU

PS D:\240160221053> cd Pertemuan-5/latihan
PS D:\240160221053\Pertemuan-5\latihan> curl.exe http://localhost:3007/mahasiswa
{"success":true,"message":"Data mahasiswa berhasil diambil","data":[{"nim":"240160221053","nama":"Athiyya Salsabila Hermawan","prodi":"Sistem Informasi","angkatan":2024},{"nim":"230789192054","nama":"Iqbal Ramadhan","prodi":"Sistem Informasi","angkatan":2023}]}
PS D:\240160221053\Pertemuan-5\latihan> curl.exe "http://localhost:3007/mahasiswa?prodi=Sistem%20Informasi"
{"success":true,"message":"Data mahasiswa berhasil diambil","data":[{"nim":"240160221053","nama":"Athiyya Salsabila Hermawan","prodi":"Sistem Informasi","angkatan":2024},{"nim":"230789192054","nama":"Iqbal Ramadhan","prodi":"Sistem Informasi","angkatan":2023}]}
PS D:\240160221053\Pertemuan-5\latihan> curl.exe "http://localhost:3007/mahasiswa?angkatan=2024"
{"success":true,"message":"Data mahasiswa berhasil diambil","data":[{"nim":"240160221053","nama":"Athiyya Salsabila Hermawan","prodi":"Sistem Informasi","angkatan":2024}]}
PS D:\240160221053\Pertemuan-5\latihan> curl.exe http://localhost:3007/mahasiswa/240160221053
{"success":true,"message":"Detail mahasiswa berhasil diambil","data":{"nim":"240160221053","nama":"Athiyya Salsabila Hermawan","prodi":"Sistem Informasi","angkatan":2024}}
PS D:\240160221053\Pertemuan-5\latihan> curl.exe http://localhost:3007/mahasiswa/F1D022000
{"success":false,"message":"Mahasiswa tidak ditemukan"}
PS D:\240160221053\Pertemuan-5\latihan> curl.exe -X POST http://localhost:3007/mahasiswa -H "Content-Type: application/json" --data-binary "@body.json"
{"success":true,"message":"Mahasiswa berhasil ditambahkan","data":{"nim":"F1C192004","nama":"Rakhael Aryada","prodi":"Teknik Informatika","angkatan":2024}}