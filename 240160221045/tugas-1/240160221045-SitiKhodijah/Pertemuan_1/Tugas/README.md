TUGAS 1 — ANALISIS & DESAIN API

Nama:* Siti Khodijah
*NIM:* 240160221045

Sistem Informasi Perpustakaan
## 1. Deskripsi Sistem

Sistem Informasi Perpustakaan merupakan sistem yang digunakan untuk membantu mahasiswa dan petugas perpustakaan dalam mengelola data buku dan peminjaman buku. Pengguna sistem terdiri dari mahasiswa sebagai anggota perpustakaan dan petugas sebagai pengelola data. Fitur utama sistem meliputi melihat daftar buku, menambahkan data buku, mengubah data buku, menghapus data buku, melihat data peminjaman, menambahkan transaksi peminjaman, mengubah status peminjaman, serta menghapus data peminjaman. Sistem menggunakan API untuk menghubungkan client dengan back end dan database.

## 2. Diagram

Diagram arsitektur Sistem Informasi Perpustakaan:

[Diagram Arsitektur] (Diagram_arsitektur.drawio.png)
## 3. Tabel Resource & Endpoint

| No | Operasi | Method | Endpoint | Request Body | Response Body | Status Code |
|---|---|---|---|---|---|---|
| 1 | Melihat semua buku | GET | `/buku` | - | Data daftar buku | 200 / 500 |
| 2 | Melihat detail buku | GET | `/buku/{id}` | - | Data buku | 200 / 404 |
| 3 | Menambah buku | POST | `/buku` | `{"judul":"Basis Data","penulis":"Andi"}` | Data buku yang dibuat | 201 / 400 |
| 4 | Mengubah buku | PUT | `/buku/{id}` | `{"judul":"Basis Data Lanjutan","penulis":"Andi"}` | Data buku terbaru | 200 / 404 |
| 5 | Melihat semua anggota | GET | `/anggota` | - | Data daftar anggota | 200 / 500 |
| 6 | Melihat detail anggota | GET | `/anggota/{id}` | - | Data anggota | 200 / 404 |
| 7 | Menambah anggota | POST | `/anggota` | `{"nama":"Siti Khodijah","nim":"240160221045"}` | Data anggota yang dibuat | 201 / 400 |
| 8 | Mengubah anggota | PUT | `/anggota/{id}` | `{"nama":"Siti Khodijah"}` | Data anggota terbaru | 200 / 404 |

## 4. Contoh JSON

### Resource Buku

**Request Body:**
```json
{
  "judul": "Basis Data",
  "penulis": "Andi"
}
{
  "success": true,
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": 1,
    "judul": "Basis Data",
    "penulis": "Andi"
  }
}
{
  "nim": "240160221045",
  "nama": "Siti Khodijah"
}
{
  "success": true,
  "message": "Anggota berhasil ditambahkan",
  "data": {
    "id": 1,
    "nim": "240160221045",
    "nama": "Siti Khodijah"
  }
}
## 5. Skenario Uji

### Skenario 1 — Berhasil mendapatkan daftar buku

**Request:**
```http
GET /buku
200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "judul": "Basis Data",
      "penulis": "Andi"
    }
  ]
}
Skenario 2 — Berhasil menambahkan anggota

Request:

POST /anggota
Content-Type: application/json

Request Body:

{
  "nim": "240160221045",
  "nama": "Siti Khodijah"
}

Response:

201 Created
{
  "success": true,
  "message": "Anggota berhasil ditambahkan",
  "data": {
    "id": 1,
    "nim": "240160221045",
    "nama": "Siti Khodijah"
  }
}

Keterangan:
Data anggota berhasil dibuat sehingga server mengembalikan status 201 Created.

Skenario 3 — Gagal karena data buku tidak ditemukan

Request:

GET /buku/99

Response:

404 Not Found
{
  "success": false,
  "message": "Buku dengan id 99 tidak ditemukan"
}
