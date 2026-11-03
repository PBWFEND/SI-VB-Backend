
# Tugas 3 – RESTful API Absensi Perkuliahan

## 1. Deskripsi Proyek

Tugas ini merupakan implementasi RESTful API untuk mengelola data absensi perkuliahan mahasiswa menggunakan Node.js dan Express.js 5.

API ini menyediakan fitur untuk menampilkan, mencari, menambahkan, mengganti, memperbarui sebagian, dan menghapus data absensi mahasiswa.

## 2. Teknologi yang Digunakan

- Node.js
- Express.js 5
- JavaScript (ES Modules)
- PowerShell dan curl.exe untuk pengujian API

## 3. Struktur Folder

```text
Tugas-3/
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── bukti-testing/
```

## 4. Cara Menjalankan Aplikasi

Pastikan Node.js sudah terpasang.

Jalankan perintah berikut pada terminal di folder Tugas-3:

```bash
npm install
npm start
```

Apabila berhasil, server akan berjalan pada alamat:

```text
http://localhost:3007
```

Untuk menjalankan dalam mode pengembangan:

```bash
npm run dev
```

## 5. Daftar Endpoint API

| No. | Method | Endpoint | Fungsi |
|---|---|---|---|
| 1 | GET | / | Menampilkan informasi API |
| 2 | GET | /absensi | Menampilkan seluruh data absensi |
| 3 | GET | /absensi/:id | Menampilkan detail absensi berdasarkan ID |
| 4 | POST | /absensi | Menambahkan data absensi baru |
| 5 | PUT | /absensi/:id | Mengganti seluruh data absensi |
| 6 | PATCH | /absensi/:id | Memperbarui sebagian data absensi |
| 7 | DELETE | /absensi/:id | Menghapus data absensi |

## 6. Fitur Pencarian dan Filter

Endpoint GET /absensi mendukung beberapa query parameter:

| Parameter | Fungsi | Contoh |
|---|---|---|
| nim | Filter berdasarkan NIM mahasiswa | ?nim=240160221009 |
| mataKuliah | Filter berdasarkan mata kuliah | ?mataKuliah=Pemrograman%20Web%20Backend |
| status | Filter berdasarkan status kehadiran | ?status=hadir |
| pertemuan | Filter berdasarkan pertemuan | ?pertemuan=1 |

Contoh penggunaan:

```text
GET /absensi?nim=240160221009
GET /absensi?mataKuliah=Pemrograman%20Web%20Backend
GET /absensi?status=hadir
GET /absensi?pertemuan=1
```

## 7. Validasi Data

Setiap data absensi yang dikirimkan harus memenuhi ketentuan berikut:

- mahasiswaId wajib berupa angka dan harus terdaftar.
- mataKuliah wajib diisi.
- pertemuan wajib berupa bilangan bulat positif.
- tanggal wajib menggunakan format YYYY-MM-DD.
- status wajib diisi dengan salah satu nilai berikut: hadir, izin, sakit, alfa, atau terlambat.

API juga melakukan validasi ketika data diperbarui menggunakan PUT maupun PATCH.

## 8. Contoh Request

### POST /absensi

```json
{
  "mahasiswaId": 1,
  "mataKuliah": "Pemrograman Web Backend",
  "pertemuan": 3,
  "tanggal": "2026-10-31",
  "status": "hadir"
}
```

### PATCH /absensi/2

```json
{
  "status": "sakit"
}
```

### PUT /absensi/1

```json
{
  "mahasiswaId": 1,
  "mataKuliah": "Pemrograman Web Backend",
  "pertemuan": 1,
  "tanggal": "2026-10-31",
  "status": "terlambat"
}
```

## 9. HTTP Status Code

| Status Code | Keterangan |
|---|---|
| 200 OK | Permintaan berhasil |
| 201 Created | Data baru berhasil ditambahkan |
| 204 No Content | Data berhasil dihapus tanpa response body |
| 400 Bad Request | Data yang dikirim tidak valid |
| 404 Not Found | Data atau endpoint tidak ditemukan |
| 500 Internal Server Error | Terjadi kesalahan pada server |

## 10. Hasil Pengujian

Pengujian dilakukan menggunakan PowerShell dan curl.exe.

| No. | Pengujian | Hasil |
|---|---|---|
| 1 | GET informasi API | Berhasil (200) |
| 2 | GET seluruh data absensi | Berhasil (200) |
| 3 | GET filter berdasarkan NIM | Berhasil (2 data) |
| 4 | GET filter berdasarkan mata kuliah | Berhasil (3 data) |
| 5 | GET detail absensi berdasarkan ID | Berhasil (200) |
| 6 | GET ID yang tidak ditemukan | Berhasil diuji (404) |
| 7 | POST data valid | Berhasil (201) |
| 8 | POST data tidak lengkap | Berhasil diuji (400) |
| 9 | PUT data absensi | Berhasil (200) |
| 10 | PATCH sebagian data | Berhasil (200) |
| 11 | DELETE data absensi | Berhasil (204) |
| 12 | GET data setelah dihapus | Berhasil diuji (404) |

## 11. Kesimpulan

Melalui tugas ini, RESTful API Absensi Perkuliahan berhasil dibuat menggunakan Express.js 5. API dapat melakukan operasi CRUD, menyediakan filter berdasarkan beberapa parameter, serta menerapkan validasi input dan penanganan kesalahan. Seluruh endpoint utama telah diuji menggunakan PowerShell dan curl.exe sesuai dengan status respons HTTP yang diharapkan.
