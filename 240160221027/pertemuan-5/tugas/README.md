# Tugas Pertemuan 5
## RESTful API dengan Express.js

### Deskripsi
Membuat RESTful API menggunakan Node.js dan Express.js
dengan resource buku dan mahasiswa.

Data disimpan sementara menggunakan array (in-memory).

### Cara Menjalankan

Install dependency:

npm install

Menjalankan API Buku:

npm start

Menjalankan API Mahasiswa:

npm run latihan

### Endpoint Buku

| Method | Endpoint | Fungsi |
| GET | /buku | Semua buku |
| GET | /buku/:id | Detail buku |
| POST | /buku | Tambah buku |
| PUT | /buku/:id | Ubah seluruh data |
| PATCH | /buku/:id | Ubah sebagian data |
| DELETE | /buku/:id | Hapus buku |

### Filter Buku

GET /buku?penulis=Andi

GET /buku?tahun=2026

GET /buku?minStok=1

### Endpoint Mahasiswa

| Method | Endpoint | Fungsi |
| GET | /mahasiswa | Semua mahasiswa |
| GET | /mahasiswa/:nim | Detail mahasiswa |
| POST | /mahasiswa | Tambah mahasiswa |
| PATCH | /mahasiswa/:nim | Ubah mahasiswa |

### Status Code

200 = Berhasil
201 = Data berhasil dibuat
204 = Berhasil dihapus
400 = Input tidak valid
404 = Data tidak ditemukan
500 = Kesalahan server

### Catatan
Project menggunakan Express.js dan database in-memory.
anjayyyy