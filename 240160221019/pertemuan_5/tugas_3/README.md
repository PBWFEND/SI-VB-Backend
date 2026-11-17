# TUGAS 3 - REST API MAHASISWA

## Identitas

- **Nama:** Kikan Khairani
- **NPM:** 240160221019
- **Kelas:** [Isi Kelas]
- **Mata Kuliah:** Pemrograman Backend

## 1. Deskripsi Proyek

Proyek ini merupakan aplikasi REST API sederhana untuk mengelola data mahasiswa menggunakan Node.js dan Express.js. API menyediakan fitur untuk menampilkan seluruh data mahasiswa, melihat detail mahasiswa berdasarkan NIM, melakukan pencarian berdasarkan program studi dan tahun angkatan, menambahkan data mahasiswa baru, serta memperbarui data mahasiswa secara parsial.

Aplikasi menggunakan format JSON sebagai media pertukaran data antara client dan server. Selain itu, diterapkan middleware logger untuk mencatat setiap request yang masuk, serta validasi data untuk memastikan informasi mahasiswa yang dikirim sesuai dengan ketentuan.

## 2. Teknologi yang Digunakan

- Node.js
- Express.js
- JavaScript
- REST API
- JSON
- PowerShell dan curl.exe untuk pengujian API

## 3. Struktur Folder

```text
tugas_3/
├── node_modules/
├── latihan.js
├── package.json
├── package-lock.json
├── data.json
├── patch.json
├── invalid.json
└── success.json
```

Keterangan:
- `latihan.js` merupakan file utama yang menjalankan server dan menangani endpoint API.
- `package.json` berisi informasi proyek dan dependensi.
- `package-lock.json` menyimpan informasi versi dependensi.
- File JSON lainnya digunakan sebagai data pengujian request.

## 4. Cara Menjalankan Program

Pastikan Node.js sudah terinstal pada komputer.

**Langkah 1.** Masuk ke folder proyek:

```bash
cd 240160221019/pertemuan_5/tugas_3
```

**Langkah 2.** Instal dependensi:

```bash
npm install
```

**Langkah 3.** Jalankan server:

```bash
node latihan.js
```

Jika berhasil, terminal menampilkan:

```text
Latihan REST API berjalan di http://localhost:3007
```

Server berjalan pada port `3007`.

## 5. Daftar Endpoint API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/mahasiswa` | Menampilkan seluruh data mahasiswa |
| GET | `/mahasiswa/:nim` | Menampilkan detail mahasiswa berdasarkan NIM |
| GET | `/mahasiswa?prodi=...` | Memfilter mahasiswa berdasarkan program studi |
| GET | `/mahasiswa?angkatan=...` | Memfilter mahasiswa berdasarkan tahun angkatan |
| POST | `/mahasiswa` | Menambahkan data mahasiswa baru |
| PATCH | `/mahasiswa/:nim` | Memperbarui sebagian data mahasiswa |

## 6. Implementasi dan Pengujian API

Pengujian dilakukan menggunakan `curl.exe` melalui terminal PowerShell.

### A. GET Seluruh Data Mahasiswa

Request:

```bash
curl.exe http://localhost:3007/mahasiswa
```

Response:

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": [
    {
      "nim": "240160221019",
      "nama": "Kikan Khairani",
      "prodi": "Sistem Informasi",
      "angkatan": 2024
    },
    {
      "nim": "230789192007",
      "nama": "William Jakrapatr",
      "prodi": "Sistem Informasi",
      "angkatan": 2023
    },
    {
      "nim": "240160221020",
      "nama": "Kikan Khairani Baru",
      "prodi": "Sistem Informasi",
      "angkatan": 2024
    }
  ]
}
```

Hasil: **200 OK**

### B. GET Detail Mahasiswa Berdasarkan NIM

Request:

```bash
curl.exe http://localhost:3007/mahasiswa/240160221019
```

Response:

```json
{
  "success": true,
  "message": "Detail mahasiswa berhasil diambil",
  "data": {
    "nim": "240160221019",
    "nama": "Kikan Khairani",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }
}
```

Hasil: **200 OK**

### C. GET Filter Berdasarkan Angkatan

Request:

```bash
curl.exe "http://localhost:3007/mahasiswa?angkatan=2024"
```

Response:

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": [
    {
      "nim": "240160221019",
      "nama": "Kikan Khairani",
      "prodi": "Sistem Informasi",
      "angkatan": 2024
    },
    {
      "nim": "240160221020",
      "nama": "Kikan Khairani Baru",
      "prodi": "Sistem Informasi",
      "angkatan": 2024
    }
  ]
}
```

Hasil: **200 OK**

### D. POST Menambahkan Data Mahasiswa

Request:

```bash
curl.exe -i -X POST http://localhost:3007/mahasiswa -H "Content-Type: application/json" --data-binary "@success.json"
```

Data yang dikirim:

```json
{
  "nim": "240160221022",
  "nama": "Siti Aminah",
  "prodi": "Sistem Informasi",
  "angkatan": 2024
}
```

Response:

```json
{
  "success": true,
  "message": "Mahasiswa berhasil ditambahkan",
  "data": {
    "nim": "240160221022",
    "nama": "Siti Aminah",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }
}
```

Hasil: **201 Created**

### E. POST Validasi Data Kosong

Pengujian dilakukan dengan mengirimkan NIM kosong.

Request:

```bash
curl.exe -i -X POST http://localhost:3007/mahasiswa -H "Content-Type: application/json" --data-binary "@invalid.json"
```

Response:

```json
{
  "success": false,
  "message": "Validasi gagal",
  "details": [
    "NIM wajib diisi"
  ]
}
```

Hasil: **400 Bad Request**

### F. POST NIM Duplikat

Pengujian dilakukan dengan mengirimkan NIM yang sudah terdaftar.

Request:

```bash
curl.exe -i -X POST http://localhost:3007/mahasiswa -H "Content-Type: application/json" --data-binary "@data.json"
```

Response:

```json
{
  "success": false,
  "message": "NIM sudah terdaftar"
}
```

Hasil: **400 Bad Request**

### G. PATCH Memperbarui Data Mahasiswa

Request:

```bash
curl.exe -i -X PATCH http://localhost:3007/mahasiswa/240160221021 -H "Content-Type: application/json" --data-binary "@patch.json"
```

Data yang dikirim:

```json
{
  "nama": "Budi Santoso Updated"
}
```

Response:

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diperbarui",
  "data": {
    "nim": "240160221021",
    "nama": "Budi Santoso Updated",
    "prodi": "Teknik Informatika",
    "angkatan": 2024
  }
}
```

Hasil: **200 OK**

### H. GET Data Mahasiswa Tidak Ditemukan

Request:

```bash
curl.exe -i http://localhost:3007/mahasiswa/999999999999
```

Response:

```json
{
  "success": false,
  "message": "Mahasiswa tidak ditemukan"
}
```

Hasil: **404 Not Found**

### I. PATCH Data Mahasiswa Tidak Ditemukan

Request:

```bash
curl.exe -i -X PATCH http://localhost:3007/mahasiswa/999999999999 -H "Content-Type: application/json" --data-binary "@patch.json"
```

Response:

```json
{
  "success": false,
  "message": "Mahasiswa tidak ditemukan"
}
```

Hasil: **404 Not Found**

## 7. Middleware Logger

Aplikasi menggunakan middleware logger untuk mencatat setiap request yang diterima server. Informasi yang dicatat meliputi waktu request, HTTP method, dan URL yang diakses.

Contoh hasil pencatatan pada terminal:

```text
[2026-11-02T03:33:13.742Z] GET /mahasiswa
[2026-11-02T03:34:24.894Z] GET /mahasiswa?prodi=Sistem%20Informasi
[2026-11-02T03:34:56.987Z] GET /mahasiswa?angkatan=2024
[2026-11-02T03:35:40.151Z] GET /mahasiswa/240160221019
[2026-11-02T03:36:30.376Z] POST /mahasiswa
[2026-11-02T03:42:04.321Z] PATCH /mahasiswa/240160221020
```

Middleware ini membantu memantau aktivitas request yang masuk ke aplikasi.

## 8. Rekapitulasi Pengujian

| No. | Pengujian | HTTP Status | Keterangan |
|---|---|---|---|
| 1 | GET seluruh mahasiswa | 200 OK | Berhasil |
| 2 | GET detail mahasiswa | 200 OK | Berhasil |
| 3 | GET filter angkatan | 200 OK | Berhasil |
| 4 | POST tambah mahasiswa | 201 Created | Berhasil |
| 5 | POST NIM duplikat | 400 Bad Request | Berhasil |
| 6 | POST NIM kosong | 400 Bad Request | Berhasil |
| 7 | PATCH ubah data | 200 OK | Berhasil |
| 8 | GET NIM tidak ditemukan | 404 Not Found | Berhasil |
| 9 | PATCH NIM tidak ditemukan | 404 Not Found | Berhasil |

Berdasarkan pengujian tersebut, seluruh skenario yang dicantumkan berhasil memberikan respons sesuai dengan hasil yang diharapkan.

## 9. Kesimpulan

Berdasarkan hasil implementasi dan pengujian, REST API pengelolaan data mahasiswa berhasil dibuat menggunakan Node.js dan Express.js. API dapat menjalankan operasi GET untuk mengambil data, POST untuk menambahkan data baru, serta PATCH untuk memperbarui sebagian data mahasiswa.

Selain itu, aplikasi telah menerapkan middleware logger, validasi input, pengecekan NIM duplikat, dan penanganan data yang tidak ditemukan. Pengujian menggunakan curl.exe menunjukkan bahwa endpoint memberikan respons HTTP 200, 201, 400, dan 404 sesuai dengan kondisi request.

Dengan demikian, proyek ini telah memenuhi fungsi utama pengelolaan data mahasiswa melalui REST API.