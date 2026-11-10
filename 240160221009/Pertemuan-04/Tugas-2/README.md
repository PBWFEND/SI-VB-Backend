
# Tugas 2 Pertemuan 4 — Express.js Dasar

**Nama:** Disti Setiawati  
**NIM:** 240160221009  
**Kelas:** SI-VB

## 1. Deskripsi

Project ini merupakan pengembangan Sistem Informasi Absensi Perkuliahan Mahasiswa menggunakan Node.js dan Express.js 5.

Pada tugas ini, server Node.js murni dari Pertemuan 3 dikembangkan menjadi aplikasi Express.js dengan pemisahan app.js dan server.js, routing, middleware, request dan response JSON, serta penanganan error.

Data mahasiswa masih disimpan sementara di dalam memory dan belum menggunakan database.

## 2. Teknologi

- Node.js v24.15.0
- Express.js 5.3.0
- JavaScript ES Module
- npm
- PowerShell untuk pengujian API

## 3. Struktur Project

```text
Tugas-2/
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── README.md
├── refleksi.md
└── bukti-testing/
```

Folder node_modules tidak disertakan dalam Git.

## 4. Cara Menjalankan

Instal dependency:

```bash
npm install
```

Jalankan server:

```bash
npm start
```

Server berjalan pada:

http://localhost:3004

## 5. Pembagian File

| File | Fungsi |
|---|---|
| app.js | Mengatur Express application, data mahasiswa, middleware, routing, dan error handler |
| server.js | Menjalankan server pada port 3004 |
| package.json | Konfigurasi project dan dependency |
| package-lock.json | Mengunci versi dependency |
| README.md | Dokumentasi project |
| refleksi.md | Refleksi pengerjaan |

## 6. Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Menampilkan informasi API |
| GET | `/health` | Memeriksa kondisi server |
| GET | `/mahasiswa` | Menampilkan seluruh mahasiswa |
| GET | `/mahasiswa/:nim` | Menampilkan detail mahasiswa berdasarkan NIM |
| POST | `/mahasiswa` | Menambahkan mahasiswa baru |
| PATCH | `/mahasiswa/:nim` | Memperbarui sebagian data mahasiswa |

### Query Parameter

Endpoint daftar mahasiswa mendukung filter:

- `?prodi=Sistem%20Informasi`
- `?semester=5`

## 7. Middleware

1. Logger untuk mencatat waktu, method, dan URL request.
2. `express.json()` untuk membaca request body JSON.
3. Handler 404 untuk menangani endpoint yang tidak tersedia.
4. Error handler untuk menangani kesalahan request dan aplikasi.

## 8. Contoh Request POST

```json
{
  "nim": "240160221099",
  "nama": "Rina Aprilia",
  "prodi": "Sistem Informasi",
  "semester": 5
}
```

Response yang diperoleh: `201 Created`.

## 9. Contoh Request PATCH

```json
{
  "semester": 6
}
```

Endpoint: `PATCH /mahasiswa/240160221099`.

Response yang diperoleh: `200 OK`.

## 10. Hasil Pengujian

Pengujian dilakukan menggunakan curl.exe dan Invoke-RestMethod melalui PowerShell.

| No. | Pengujian | Status | Hasil |
|---|---|---|---|
| 1 | GET `/` | 200 | Informasi API tampil |
| 2 | GET `/health` | 200 | Server berjalan |
| 3 | GET `/mahasiswa` | 200 | Menampilkan 3 mahasiswa |
| 4 | GET detail mahasiswa | 200 | Data ditemukan |
| 5 | GET NIM tidak ditemukan | 404 | Mahasiswa tidak ditemukan |
| 6 | Filter berdasarkan prodi | 200 | Data sesuai filter |
| 7 | Filter berdasarkan semester | 200 | Data sesuai filter |
| 8 | Filter semester tidak valid | 400 | Input ditolak |
| 9 | POST mahasiswa valid | 201 | Mahasiswa berhasil ditambahkan |
| 10 | POST data tidak lengkap | 400 | Validasi menolak data |
| 11 | PATCH mahasiswa | 200 | Data berhasil diperbarui |
| 12 | PATCH NIM tidak ditemukan | 404 | Mahasiswa tidak ditemukan |
| 13 | GET endpoint tidak tersedia | 404 | Endpoint tidak ditemukan |
| 14 | POST dengan JSON rusak | 400 | Request tidak dapat diproses |

## 11. Hasil Perubahan Data

Data awal terdiri dari tiga mahasiswa, yaitu Disti Setiawati, Andi Saputra, dan Sinta Maharani.

Pengujian POST berhasil menambahkan mahasiswa baru bernama Rina Aprilia dengan ID 4 dan NIM 240160221099.

Selanjutnya dilakukan PATCH untuk mengubah semester Rina dari 5 menjadi 6. Perubahan berhasil diperiksa kembali melalui endpoint GET detail mahasiswa.

## 12. Kesimpulan

Melalui tugas ini, saya mempelajari penggunaan Express.js untuk membangun server backend yang lebih terstruktur. Saya juga memahami routing berdasarkan HTTP method, route parameter, query parameter, middleware logger, parser JSON, validasi input, serta penanganan error.

Pengujian dilakukan pada endpoint yang berhasil maupun request yang tidak valid. Hasil pengujian memberikan status code sesuai dengan kondisi request.

Data masih disimpan sementara di memory sehingga akan kembali ke kondisi awal ketika server dijalankan ulang.
