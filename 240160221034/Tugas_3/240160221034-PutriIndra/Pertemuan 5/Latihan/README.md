# Latihan Pertemuan 5 — REST API Mahasiswa

## Deskripsi
Latihan ini merupakan implementasi RESTful API sederhana menggunakan Express.js untuk mengelola data mahasiswa. API menyediakan fitur menampilkan data, mencari mahasiswa berdasarkan NIM, memfilter data, menambahkan data mahasiswa, dan memperbarui data mahasiswa.

## Teknologi
- Node.js
- Express.js
- JavaScript (ES Modules)
- PowerShell untuk pengujian API

## Cara Menjalankan Program
1. Buka folder `Latihan` di terminal VS Code.
2. Install dependency yang dibutuhkan dengan perintah:

   ```bash
   npm install
   ```

3. Jalankan program dengan perintah:

   ```bash
   node latihan.js
   ```

4. API berjalan pada alamat:

   `http://localhost:3007`

## Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/mahasiswa` | Menampilkan seluruh data mahasiswa |
| GET | `/mahasiswa?prodi=Sistem%20Informasi` | Memfilter mahasiswa berdasarkan program studi |
| GET | `/mahasiswa?angkatan=2024` | Memfilter mahasiswa berdasarkan angkatan |
| GET | `/mahasiswa/:nim` | Menampilkan detail mahasiswa berdasarkan NIM |
| POST | `/mahasiswa` | Menambahkan data mahasiswa baru |
| PATCH | `/mahasiswa/:nim` | Memperbarui sebagian data mahasiswa |

## Contoh Pengujian

### 1. GET Seluruh Data Mahasiswa
Request:

`GET http://localhost:3007/mahasiswa`

Status: `200 OK`

Hasil: Menampilkan daftar mahasiswa dalam format JSON.

### 2. GET Detail Mahasiswa
Request:

`GET http://localhost:3007/mahasiswa/240160221034`

Status: `200 OK` jika data ditemukan.

Hasil: Menampilkan detail mahasiswa berdasarkan NIM.

### 3. GET Data Mahasiswa yang Tidak Ditemukan
Request:

`GET http://localhost:3007/mahasiswa/999999999999`

Status: `404 Not Found`

Hasil: Mengembalikan pesan bahwa mahasiswa tidak ditemukan.

### 4. GET Filter Berdasarkan Program Studi
Request:

`GET http://localhost:3007/mahasiswa?prodi=Sistem%20Informasi`

Status: `200 OK`

Hasil: Menampilkan mahasiswa dengan program studi Sistem Informasi.

### 5. POST Menambahkan Mahasiswa
Request:

`POST http://localhost:3007/mahasiswa`

Contoh JSON Body:

```json
{
  "nim": "240160221035",
  "nama": "Mahasiswa Baru",
  "prodi": "Sistem Informasi",
  "angkatan": 2024
}
```

Status: `201 Created` jika data berhasil ditambahkan.

### 6. POST dengan Data Tidak Valid
Request: `POST http://localhost:3007/mahasiswa`

Contoh JSON Body:

```json
{
  "nim": "240160221036",
  "nama": "",
  "prodi": "Sistem Informasi",
  "angkatan": 2024
}
```

Status: `400 Bad Request`

Hasil: Mengembalikan pesan bahwa NIM, nama, prodi, dan angkatan wajib diisi dengan benar.

### 7. PATCH Memperbarui Data Mahasiswa
Request:

`PATCH http://localhost:3007/mahasiswa/240160221034`

Contoh JSON Body:

```json
{
  "nama": "Putri Indra"
}
```

Status: `200 OK` jika data berhasil diperbarui.

### 8. PATCH dengan Data Tidak Valid
Request:

`PATCH http://localhost:3007/mahasiswa/240160221034`

Contoh JSON Body:

```json
{
  "nama": ""
}
```

Status: `400 Bad Request`

Hasil: Mengembalikan pesan bahwa data perubahan tidak valid.

## Middleware
Program menggunakan middleware untuk:
- Membaca request body dalam format JSON.
- Mencatat HTTP method dan URL request ke terminal.

## Catatan Pengujian
Pengujian dilakukan menggunakan PowerShell karena akses Thunder Client memerlukan login dan registrasi email pada lisensi tim.

## Catatan Penyimpanan Data
Data mahasiswa disimpan sementara dalam array di memori. Data yang ditambahkan atau diperbarui akan kembali ke kondisi awal ketika server dihentikan atau dijalankan ulang.

## Kesimpulan
Latihan ini menerapkan konsep dasar RESTful API menggunakan Express.js, termasuk penggunaan HTTP method, route parameters, query parameters, middleware, validasi input, serta status code HTTP sesuai hasil request.