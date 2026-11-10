# API Absensi Organisasi

## 1. Deskripsi Project

API Absensi Organisasi merupakan aplikasi backend sederhana berbasis Express.js yang digunakan untuk mengelola data anggota organisasi dan data absensi kegiatan.

Project ini dibuat untuk memenuhi tugas praktikum REST API menggunakan Express.js.

## 2. Teknologi yang Digunakan

- Node.js
- Express.js
- JavaScript
- JSON

## 3. Struktur Project

```text
Tugas/
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── node_modules/
```

## 4. Cara Menjalankan Project

1. Buka terminal pada folder project.
2. Jalankan perintah `npm install` untuk menginstal dependency.
3. Jalankan server dengan perintah `npm start`.
4. Buka `http://localhost:3006` untuk mengecek API.

## 5. Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Mengecek status API |
| GET | `/anggota` | Menampilkan seluruh anggota |
| GET | `/anggota/:id` | Menampilkan anggota berdasarkan ID |
| POST | `/anggota` | Menambahkan anggota |
| PUT | `/anggota/:id` | Memperbarui data anggota |
| GET | `/absensi` | Menampilkan seluruh data absensi |
| GET | `/absensi/:id` | Menampilkan absensi berdasarkan ID |
| POST | `/absensi` | Menambahkan data absensi |
| DELETE | `/absensi/:id` | Menghapus data absensi |

## 6. Contoh Query Parameter

Pencarian anggota berdasarkan nama dapat dilakukan menggunakan URL:

`http://localhost:3006/anggota?nama=rahma`

API akan menampilkan anggota yang namanya sesuai dengan kata pencarian.

## 7. Middleware

- `express.json()` digunakan untuk membaca request body dalam format JSON.
- Logger digunakan untuk mencatat waktu, metode HTTP, dan URL request pada terminal.
- Handler 404 digunakan untuk menangani endpoint yang tidak ditemukan.
- Error middleware digunakan untuk menangani error server dan mengembalikan respons JSON.

## 8. Hasil Pengujian

Pengujian dilakukan melalui browser dan PowerShell.

| Pengujian | Hasil |
|---|---|
| GET daftar anggota | Berhasil |
| GET anggota berdasarkan ID | Berhasil |
| POST anggota | Berhasil |
| PUT anggota | Berhasil |
| GET daftar absensi | Berhasil |
| GET absensi berdasarkan ID | Berhasil |
| POST absensi | Berhasil |
| DELETE absensi | Berhasil |
| Pencarian anggota dengan query parameter | Berhasil |
| Endpoint tidak ditemukan (404) | Berhasil |
| Error middleware | Berhasil |

## 9. Catatan

Data anggota dan absensi saat ini disimpan dalam array sementara di memori aplikasi. Data yang ditambahkan atau diperbarui akan kembali ke data awal ketika server dimulai ulang karena project ini belum menggunakan database.