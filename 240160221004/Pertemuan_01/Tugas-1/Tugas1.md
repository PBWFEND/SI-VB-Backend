# Tugas 1 — Analisis & Desain API
## SISTEM INFORMASI PERPUSTAKAAN

Nama: Aprilliana Fratiwi
NPM : 240160221004
Kelas: 5B

## 1. Deskripsi Sistem

Sistem Informasi Perpustakaan merupakan sistem yang digunakan untuk mengelola data buku dan anggota perpustakaan. Sistem ini memiliki tiga jenis pengguna, yaitu Admin, Petugas, dan Anggota. Admin bertugas mengelola seluruh data dalam sistem, termasuk data buku dan anggota. Petugas bertugas mengelola data buku, sedangkan Anggota dapat melihat informasi buku yang tersedia. Sistem menggunakan REST API sebagai penghubung antara client, back end, dan database. Client mengirimkan HTTP Request kepada back end, kemudian back end melakukan pengecekan hak akses, memproses permintaan, mengakses database, dan mengirimkan HTTP Response dalam format JSON kepada client.

## Pengguna dan Hak Akses
Admin

Admin merupakan pengguna yang memiliki hak akses paling luas. Admin dapat melihat, menambahkan, mengubah, dan menghapus data buku. Selain itu, Admin juga dapat melihat data anggota, melihat detail anggota, serta menambahkan anggota baru.

Petugas

Petugas bertugas membantu pengelolaan perpustakaan, khususnya data buku. Petugas dapat melihat daftar dan detail buku, menambahkan buku baru, mengubah data buku, serta menghapus data buku.

Anggota

Anggota merupakan pengguna yang menggunakan sistem untuk mendapatkan informasi mengenai buku. Anggota hanya dapat melihat daftar buku dan melihat detail buku. Anggota tidak memiliki izin untuk menambahkan, mengubah, maupun menghapus data buku atau anggota.

## Resource Sistem

Sistem memiliki dua resource utama, yaitu Books dan Members.

3.1 Books

Resource Books digunakan untuk menyimpan data buku yang terdapat di perpustakaan. Data yang disimpan meliputi ID buku, judul, penulis, tahun terbit, dan jumlah stok buku.

Contoh:

Books
├── id
├── judul
├── penulis
├── tahun
└── stok
3.2 Members

Resource Members digunakan untuk menyimpan data anggota perpustakaan. Data yang disimpan meliputi ID anggota, nama, email, dan nomor telepon.

Contoh:

Members
├── id
├── nama
├── email
└── no_hp

## Resource dan Endpoint
Resource Books

1. Melihat semua buku

GET /api/books

Digunakan oleh Admin, Petugas, dan Anggota untuk melihat daftar buku.

2. Melihat detail buku

GET /api/books/:id

Digunakan untuk melihat informasi satu buku berdasarkan ID.

3. Menambahkan buku

POST /api/books

Digunakan oleh Admin dan Petugas untuk menambahkan buku baru.

4. Mengubah data buku

PUT /api/books/:id

Digunakan oleh Admin dan Petugas untuk mengubah informasi buku.

5. Menghapus buku

DELETE /api/books/:id

Digunakan oleh Admin dan Petugas untuk menghapus data buku.

Resource Members

6. Melihat semua anggota

GET /api/members

Digunakan oleh Admin untuk melihat seluruh data anggota.

7. Melihat detail anggota

GET /api/members/:id

Digunakan oleh Admin untuk melihat informasi anggota berdasarkan ID.

8. Menambahkan anggota

POST /api/members

Digunakan oleh Admin untuk menambahkan anggota baru.

## Contoh JSON
Request Body — Menambahkan Buku
{
  "judul": "Pemrograman Web",
  "penulis": "Budi Santoso",
  "tahun": 2025,
  "stok": 5
}
Response Body
{
  "success": true,
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": 3,
    "judul": "Pemrograman Web",
    "penulis": "Budi Santoso",
    "tahun": 2025,
    "stok": 5
  }
}
Request Body — Menambahkan Anggota
{
  "nama": "Aprilliana Fratiwi",
  "email": "240160221004@student.unsap.ac.id",
  "no_hp": "085793502900"
}
Response Body
{
  "success": true,
  "message": "Anggota berhasil ditambahkan",
  "data": {
    "id": 1,
    "nama": "Aprilliana Fratiwi",
    "email": "240160221004@student.unsap.ac.id",
    "no_hp": "085793502900"
  }
}

## Skenario Uji
Skenario 1 — Anggota Melihat Daftar Buku

Role: Anggota

Request:

GET /api/books

Response:

{
  "success": true,
  "message": "Data buku berhasil diambil",
  "data": [
    {
      "id": 1,
      "judul": "Pemrograman Web",
      "penulis": "Budi Santoso",
      "tahun": 2024,
      "stok": 5
    }
  ]
}

Status: 200 OK

Request berhasil karena Anggota memiliki hak untuk melihat data buku.

Skenario 2 — Petugas Menambahkan Buku

Role: Petugas

Request:

POST /api/books

Request Body:

{
  "judul": "Sistem Informasi",
  "penulis": "Dewi Lestari",
  "tahun": 2025,
  "stok": 4
}

Response:

{
  "success": true,
  "message": "Buku berhasil ditambahkan"
}

Status: 201 Created

Request berhasil karena Petugas memiliki hak untuk menambahkan data buku.

Skenario 3 — Anggota Mencoba Menambahkan Buku

Role: Anggota

Request:

POST /api/books

Response:

{
  "success": false,
  "message": "Akses ditolak. Anda tidak memiliki izin."
}

Status: 403 Forbidden

Request ditolak karena Anggota tidak memiliki hak untuk menambahkan data buku.

diagram di simpan dalam file diagram.png dan code diagram dan flowchart di simpan di file diagram.mmd & flowchart TD.mmd
