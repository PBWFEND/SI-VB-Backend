# Latihan Individu Pertemuan 05
## Pengembangan REST API Mahasiswa

### 1. Deskripsi
Latihan ini bertujuan untuk mengembangkan REST API mahasiswa menggunakan Node.js dan Express.js. Fitur yang dibuat meliputi middleware logger, pencarian berdasarkan NIM, filter program studi, penambahan data, pembaruan sebagian data, dan penanganan error.

### 2. Teknologi
- Node.js
- Express.js
- JSON
- PowerShell dan curl.exe

### 3. Cara Menjalankan
1. Buka terminal pada folder `latihan`.
2. Instal dependensi menggunakan `npm.cmd install express`.
3. Jalankan server dengan `node latihan.js`.
4. API dapat diakses melalui `http://localhost:3007`.

### 4. Daftar Endpoint

| Method | Endpoint | Status | Keterangan |
|---|---|---:|---|
| GET | `/mahasiswa` | 200 | Menampilkan data mahasiswa |
| GET | `/mahasiswa/:nim` | 200 | Mencari mahasiswa berdasarkan NIM |
| GET | `/mahasiswa/:nim` | 404 | NIM tidak ditemukan |
| GET | `/mahasiswa?prodi=Sistem%20Informasi` | 200 | Filter berdasarkan program studi |
| POST | `/mahasiswa` | 201 | Menambahkan mahasiswa |
| POST | `/mahasiswa` | 400 | Validasi data gagal atau NIM duplikat |
| PATCH | `/mahasiswa/:nim` | 204 | Memperbarui sebagian data |
| PATCH | `/mahasiswa/:nim` | 400 | Data pembaruan tidak valid |
| PATCH | `/mahasiswa/:nim` | 404 | NIM tidak ditemukan |
| GET | `/halaman-salah` | 404 | Endpoint tidak ditemukan |

### 5. Middleware Logger
Middleware logger mencatat HTTP method dan URL setiap request yang masuk ke server. Contohnya, `GET /mahasiswa` akan dicatat pada terminal.

### 6. Validasi Data
Endpoint POST memerlukan NIM, nama, program studi, dan angkatan. Data yang tidak valid akan menghasilkan status 400. NIM yang sudah terdaftar juga ditolak.

Endpoint PATCH hanya mengubah field yang dikirim, yaitu nama, prodi, atau angkatan. Jika pembaruan berhasil, server mengembalikan status 204 tanpa response body.

### 7. Hasil Pengujian
Isi bagian ini berdasarkan hasil pengujian aktual menggunakan `curl.exe`. Catat method, URL, status HTTP, dan ringkasan response JSON untuk setiap skenario.

### 8. Kesimpulan
Melalui latihan ini, saya mempelajari penggunaan middleware, route parameter, query parameter, validasi request body, pembaruan sebagian data, serta pemilihan status HTTP yang sesuai dalam pengembangan REST API menggunakan Express.js.