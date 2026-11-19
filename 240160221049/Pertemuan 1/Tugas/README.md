# TUGAS 1 — ANALISIS & DESAIN API

## SISTEM INFORMASI PERPUSTAKAAN

**Mata Kuliah:** Pemrograman Berbasis Web Back End  
**Pertemuan:** 1 — Orientasi Backend Web, Client–Server, HTTP, REST & JSON

**Identitas Mahasiswa**

- Nama: [Zhilan Maulana]
- NIM: [240160221049]
- Kelas: [SI-VB]

---

# 1. Deskripsi Sistem

Sistem Informasi Perpustakaan merupakan aplikasi berbasis web yang digunakan untuk membantu pengelolaan data perpustakaan secara digital. Sistem ini memiliki tiga jenis pengguna, yaitu admin atau petugas perpustakaan, anggota perpustakaan, dan mahasiswa. Admin bertugas mengelola data buku serta data anggota, sedangkan anggota dapat melihat daftar buku dan melakukan peminjaman maupun pengembalian buku. Sistem memiliki fitur utama berupa pengelolaan data buku, pengelolaan anggota, pencatatan peminjaman, dan pengembalian buku. Setiap komunikasi antara client dan server menggunakan HTTP dengan format pertukaran data JSON. Sistem juga memiliki validasi stok buku agar buku yang stoknya habis tidak dapat dipinjam.

# 2. Diagram Arsitektur Sistem

Arsitektur Sistem Informasi Perpustakaan menggunakan model Client–Server. Pengguna mengirimkan HTTP Request melalui browser atau aplikasi, kemudian backend Node.js memproses permintaan tersebut. Backend melakukan validasi dan berkomunikasi dengan database untuk mengambil, menambahkan, mengubah, atau menghapus data. Setelah proses selesai, server mengirimkan HTTP Response dalam format JSON kepada client.

Komponen sistem:

1. Client: Browser atau aplikasi yang digunakan admin dan anggota.
2. HTTP Request: Permintaan yang dikirim client kepada server.
3. Backend: Memproses request menggunakan Node.js.
4. Business Logic: Memvalidasi data buku, anggota, stok, dan peminjaman.
5. Database: Menyimpan data buku, anggota, dan peminjaman.
6. HTTP Response: Mengirimkan hasil proses kepada client dalam format JSON.

File diagram arsitektur terdapat pada `diagram.mmd`.

# 3. Tabel Resource dan Endpoint

Sistem Informasi Perpustakaan menggunakan tiga resource utama, yaitu buku, anggota, dan peminjaman.

## A. Resource Buku

| No. | Operasi | Method | Endpoint | Request Body | Response Body | Status |
|---|---|---|---|---|---|---|
| 1 | Menampilkan semua buku | GET | `/buku` | - | Daftar data buku | 200 |
| 2 | Menampilkan detail buku | GET | `/buku/:id` | - | Detail buku | 200 / 404 |
| 3 | Menambahkan buku | POST | `/buku` | judul, penulis, tahun, stok | Data buku baru | 201 / 400 |
| 4 | Memperbarui buku | PUT | `/buku/:id` | Semua field buku | Data buku terbaru | 200 / 404 |
| 5 | Menghapus buku | DELETE | `/buku/:id` | - | Pesan berhasil dihapus | 204 / 404 |

## B. Resource Anggota

| No. | Operasi | Method | Endpoint | Request Body | Response Body | Status |
|---|---|---|---|---|---|---|
| 6 | Menampilkan semua anggota | GET | `/anggota` | - | Daftar anggota | 200 |
| 7 | Menambahkan anggota | POST | `/anggota` | nama, email, nim | Data anggota baru | 201 / 400 |

## C. Resource Peminjaman

| No. | Operasi | Method | Endpoint | Request Body | Response Body | Status |
|---|---|---|---|---|---|---|
| 8 | Melakukan peminjaman buku | POST | `/peminjaman` | bukuId, anggotaId | Data peminjaman | 201 / 400 / 404 |
| 9 | Mengembalikan buku | PATCH | `/peminjaman/:id/pengembalian` | tanggalKembali | Data pengembalian | 200 / 404 |

**Total endpoint: 9 endpoint.**

### Penjelasan HTTP Method

- GET digunakan untuk mengambil atau membaca data.
- POST digunakan untuk membuat data baru.
- PUT digunakan untuk mengganti seluruh data resource.
- PATCH digunakan untuk mengubah sebagian data resource.
- DELETE digunakan untuk menghapus data.

### Ketentuan Sistem

1. Buku harus memiliki ID, judul, penulis, tahun, dan stok.
2. Anggota harus memiliki ID, nama, email, dan NIM.
3. Peminjaman harus memiliki ID, bukuId, anggotaId, tanggalPinjam, tanggalKembali, dan status.
4. Buku yang stoknya 0 tidak boleh dipinjam.
5. Ketika peminjaman berhasil, stok buku berkurang satu.
6. Ketika buku dikembalikan, stok buku bertambah satu.
7. Setiap peminjaman harus memiliki anggota dan buku yang terdaftar.
8. Buku yang sedang dipinjam tidak boleh dihapus.

# 4. Contoh JSON Request dan Response

## A. Resource Buku

### 1. Request Body — Menambahkan Buku

Endpoint: `POST /buku`

```json
{
  "judul": "Belajar Pemrograman Web",
  "penulis": "Andi Setiawan",
  "tahun": 2024,
  "stok": 10
}
```

### 2. Response Body — Data Buku Berhasil Ditambahkan

Status: `201 Created`

```json
{
  "success": true,
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": 1,
    "judul": "Belajar Pemrograman Web",
    "penulis": "Andi Setiawan",
    "tahun": 2024,
    "stok": 10
  }
}
```

## B. Resource Anggota

### 1. Request Body — Menambahkan Anggota

Endpoint: `POST /anggota`

```json
{
  "nama": "Zhilan Maulana",
  "email": "zhilanmaulana@gmail.com",
  "nim": "240160221049"
}
```

### 2. Response Body — Anggota Berhasil Ditambahkan

Status: `201 Created`

```json
{
  "success": true,
  "message": "Anggota berhasil ditambahkan",
  "data": {
    "id": 1,
    "nama": "Zhilan Maulana",
    "email": "zhilanmaulana@gmail.com",
    "nim": "240160221049"
  }
}
```

## C. Resource Peminjaman

### 1. Request Body — Melakukan Peminjaman

Endpoint: `POST /peminjaman`

```json
{
  "bukuId": 1,
  "anggotaId": 1
}
```

### 2. Response Body — Peminjaman Berhasil

Status: `201 Created`

```json
{
  "success": true,
  "message": "Peminjaman buku berhasil",
  "data": {
    "id": 1,
    "bukuId": 1,
    "anggotaId": 1,
    "tanggalPinjam": "2026-11-02",
    "tanggalKembali": null,
    "status": "Dipinjam"
  }
}
```

# 5. Skenario Pengujian (Request–Response)

Pengujian dilakukan untuk memastikan setiap endpoint dapat bekerja sesuai dengan fungsi dan ketentuan sistem.

## Skenario 1 — Berhasil Menampilkan Daftar Buku

**Tujuan:** Memastikan sistem dapat menampilkan seluruh data buku yang tersedia.

Request:

```http
GET /buku
```

Response Status:

`200 OK`

Response Body:

```json
{
  "success": true,
  "message": "Data buku berhasil diambil",
  "data": [
    {
      "id": 1,
      "judul": "Belajar Pemrograman Web",
      "penulis": "Andi Setiawan",
      "tahun": 2024,
      "stok": 10
    },
    {
      "id": 2,
      "judul": "Dasar-Dasar JavaScript",
      "penulis": "Rina Putri",
      "tahun": 2025,
      "stok": 5
    }
  ]
}
```

**Hasil yang diharapkan:** Server berhasil mengirimkan seluruh data buku dalam format JSON dengan status 200 OK.

## Skenario 2 — Berhasil Melakukan Peminjaman Buku

**Tujuan:** Memastikan anggota dapat meminjam buku apabila stok masih tersedia.

Request:

```http
POST /peminjaman
Content-Type: application/json
```

Request Body:

```json
{
  "bukuId": 1,
  "anggotaId": 1
}
```

Response Status:

`201 Created`

Response Body:

```json
{
  "success": true,
  "message": "Peminjaman buku berhasil",
  "data": {
    "id": 1,
    "bukuId": 1,
    "anggotaId": 1,
    "tanggalPinjam": "2026-11-02",
    "tanggalKembali": null,
    "status": "Dipinjam"
  }
}
```

**Hasil yang diharapkan:** Sistem berhasil mencatat transaksi peminjaman dan mengurangi stok buku sebanyak satu. Jika stok awal 10, stok menjadi 9.

## Skenario 3 — Gagal Menampilkan Detail Buku

**Tujuan:** Memastikan sistem dapat menangani permintaan ketika buku tidak ditemukan.

Request:

```http
GET /buku/999
```

Response Status:

`404 Not Found`

Response Body:

```json
{
  "success": false,
  "message": "Buku tidak ditemukan"
}
```

**Hasil yang diharapkan:** Server tidak menemukan buku dengan ID 999 dan mengembalikan status 404 Not Found.

# 6. Kesimpulan

Berdasarkan hasil analisis dan desain API Sistem Informasi Perpustakaan, dapat disimpulkan bahwa arsitektur client–server memungkinkan pengguna berkomunikasi dengan server melalui HTTP Request dan HTTP Response. REST API digunakan untuk mengelola resource buku, anggota, dan peminjaman dengan menggunakan HTTP Method yang sesuai.

Format JSON digunakan sebagai media pertukaran data antara client dan backend. Penggunaan status code seperti 200, 201, 400, dan 404 membantu client mengetahui hasil dari setiap permintaan yang dilakukan.

Dengan rancangan ini, Sistem Informasi Perpustakaan diharapkan dapat membantu proses pengelolaan buku, anggota, peminjaman, dan pengembalian buku secara lebih terstruktur.

---

# 7. Keterangan Penggunaan AI

Penyusunan tugas ini dibantu oleh ChatGPT sebagai coding assistant untuk membantu memahami konsep REST API, menyusun struktur JSON, dan memeriksa konsistensi HTTP Method serta status code. Seluruh rancangan akan dipelajari dan disesuaikan kembali oleh mahasiswa agar dapat dijelaskan secara mandiri.

