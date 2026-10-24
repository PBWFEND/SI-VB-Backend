# Tugas 1 — Analisis & Desain API

**Nama:** Putri Indra Lestari Aryanto  
**NIM:** 240160221034

## 1. Deskripsi Sistem

Sistem Informasi Perpustakaan merupakan sistem yang digunakan untuk membantu pengelolaan data perpustakaan. Penggunanya meliputi petugas perpustakaan dan anggota perpustakaan. Sistem ini memiliki fitur untuk mengelola data buku dan anggota, melihat daftar buku dan anggota, serta mengelola proses peminjaman dan pengembalian buku.

## 2. Resource & Endpoint

| No | Resource | Operasi | Method | Endpoint | Request Body | Response Body | Status Code |
|---|---|---|---|---|---|---|---|
| 1 | Buku | Melihat semua buku | GET | `/buku` | — | `{ "success": true, "data": [...] }` | 200 / 500 |
| 2 | Buku | Melihat detail buku | GET | `/buku/:id` | — | `{ "success": true, "data": {...} }` | 200 / 404 |
| 3 | Buku | Menambah buku | POST | `/buku` | `{ "judul": "...", "penulis": "..." }` | `{ "success": true, "data": {...} }` | 201 / 400 |
| 4 | Buku | Mengubah data buku | PUT | `/buku/:id` | `{ "judul": "...", "penulis": "..." }` | `{ "success": true, "data": {...} }` | 200 / 404 |
| 5 | Anggota | Melihat semua anggota | GET | `/anggota` | — | `{ "success": true, "data": [...] }` | 200 / 500 |
| 6 | Anggota | Menambah anggota | POST | `/anggota` | `{ "nama": "...", "nim": "..." }` | `{ "success": true, "data": {...} }` | 201 / 400 |
| 7 | Peminjaman | Melihat semua peminjaman | GET | `/peminjaman` | — | `{ "success": true, "data": [...] }` | 200 / 500 |
| 8 | Peminjaman | Membuat peminjaman | POST | `/peminjaman` | `{ "anggotaId": 1, "bukuId": 1 }` | `{ "success": true, "data": {...} }` | 201 / 400 |

## 3. Contoh JSON

### Resource Buku

**Request Body**
```json
{
  "judul": "Laskar Pelangi",
  "penulis": "Andrea Hirata"
}
```

**Response Body**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "judul": "Laskar Pelangi",
    "penulis": "Andrea Hirata"
  }
}
```

### Resource Anggota

**Request Body**
```json
{
  "nama": "Putri Indra",
  "nim": "240160221034"
}
```

**Response Body**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Putri Indra",
    "nim": "240160221034"
  }
}
```

### Resource Peminjaman

**Request Body**
```json
{
  "anggotaId": 1,
  "bukuId": 1
}
```

**Response Body**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "anggotaId": 1,
    "bukuId": 1,
    "status": "dipinjam"
  }
}
```
## 4. Skenario Uji

### Skenario 1 — Melihat Daftar Buku

**Request**
```http
GET /buku
```

**Response**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "judul": "Laskar Pelangi",
      "penulis": "Andrea Hirata"
    }
  ]
}
```

**Status Code:** 200 OK

### Skenario 2 — Menambah Anggota

**Request**
```http
POST /anggota
Content-Type: application/json
```

**Request Body**
```json
{
  "nama": "Putri Indra",
  "nim": "240160221034"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Putri Indra",
    "nim": "240160221034"
  }
}
```

**Status Code:** 201 Created

### Skenario 3 — Data Buku Tidak Ditemukan

**Request**
```http
GET /buku/99
```

**Response**
```json
{
  "success": false,
  "message": "Data buku tidak ditemukan"
}
```

**Status Code:** 404 Not Found

## 5. Refleksi

Request adalah permintaan yang dikirim client ke server untuk meminta atau mengirim data. Response adalah balasan dari server setelah memproses request tersebut. Status code penting karena menunjukkan apakah request berhasil, gagal, atau terjadi masalah pada endpoint.