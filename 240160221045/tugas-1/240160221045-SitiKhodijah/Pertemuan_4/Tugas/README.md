# TUGAS 2 - REST ENDPOINT DENGAN EXPRESS.JS

**Nama:** Siti Khodijah
**NIM:** 240160221045
**Mata Kuliah:** Praktikum Backend Web Framework

## 1. Deskripsi Sistem

Sistem Informasi Perpustakaan merupakan aplikasi backend yang digunakan untuk mengelola data buku dan anggota perpustakaan. Aplikasi ini dibangun menggunakan Node.js dan Express.js dengan arsitektur REST API.

Fitur aplikasi meliputi melihat daftar buku, melihat detail buku, menambahkan buku, mengubah data buku, melihat daftar anggota, melihat detail anggota, menambahkan anggota, dan mengubah data anggota.

Data aplikasi masih disimpan sementara dalam array JavaScript dan belum menggunakan database.

## 2. Struktur Project

```text
Tugas/
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── node_modules/
└── README.md
```

## 3. Teknologi yang Digunakan

* Node.js
* Express.js
* JavaScript ES Modules
* JSON
* PowerShell dan curl untuk pengujian API

## 4. Instalasi dan Cara Menjalankan Aplikasi

Buka terminal pada folder `Tugas`.

Instal dependency:

```bash
npm install
```

Jalankan server:

```bash
npm start
```

Server berjalan pada alamat:

```text
http://localhost:3004
```

Untuk menghentikan server, tekan `Ctrl + C` pada terminal tempat server berjalan.

## 5. Daftar Endpoint

| No. | Method | Endpoint       | Fungsi                     | Status HTTP     |
| --- | ------ | -------------- | -------------------------- | --------------- |
| 1   | GET    | `/`            | Menampilkan informasi API  | 200             |
| 2   | GET    | `/health`      | Memeriksa status server    | 200             |
| 3   | GET    | `/buku`        | Menampilkan daftar buku    | 200             |
| 4   | GET    | `/buku/:id`    | Menampilkan detail buku    | 200 / 404       |
| 5   | POST   | `/buku`        | Menambahkan buku           | 201 / 400       |
| 6   | PUT    | `/buku/:id`    | Mengubah data buku         | 200 / 400 / 404 |
| 7   | GET    | `/anggota`     | Menampilkan daftar anggota | 200             |
| 8   | GET    | `/anggota/:id` | Menampilkan detail anggota | 200 / 404       |
| 9   | POST   | `/anggota`     | Menambahkan anggota        | 201 / 400       |
| 10  | PUT    | `/anggota/:id` | Mengubah data anggota      | 200 / 400 / 404 |

## 6. Middleware

Aplikasi menggunakan middleware berikut:

1. `express.json()` untuk membaca request body dalam format JSON.
2. Middleware logger untuk mencatat waktu, HTTP method, dan URL setiap request.
3. Handler 404 untuk menangani endpoint yang tidak tersedia.
4. Error middleware untuk menangani kesalahan aplikasi.

## 7. Query Parameter

Endpoint `GET /buku` mendukung pencarian dan filter buku.

| Request              | Fungsi                                              |
| -------------------- | --------------------------------------------------- |
| `/buku?penulis=Andi` | Memfilter buku berdasarkan penulis Andi             |
| `/buku?cari=Java`    | Mencari buku dengan judul yang mengandung kata Java |

## 8. Hasil Pengujian API

Pengujian dilakukan menggunakan PowerShell dan `curl.exe` pada alamat `http://localhost:3004`.

### A. GET `/`

**Request:**

```powershell
curl.exe http://localhost:3004/
```

**Hasil:** Berhasil menampilkan informasi API dan daftar endpoint.

### B. GET `/buku`

**Request:**

```powershell
curl.exe http://localhost:3004/buku
```

**Hasil:** Berhasil menampilkan daftar buku. Setelah penambahan buku, API menampilkan tiga data buku.

### C. GET `/buku/1`

**Request:**

```powershell
curl.exe http://localhost:3004/buku/1
```

**Hasil:** Berhasil menampilkan detail buku dengan ID 1.

### D. GET `/buku/99`

**Request:**

```powershell
curl.exe -i http://localhost:3004/buku/99
```

**Hasil:** `404 Not Found`.

Response:

```json
{
  "success": false,
  "message": "Buku dengan id 99 tidak ditemukan"
}
```

**Keterangan:** Buku dengan ID 99 tidak ditemukan sehingga API mengembalikan status 404.

### E. POST `/buku`

**Request:**

```powershell
$body = @{
    judul = "Pemrograman Java"
    penulis = "Siti Khodijah"
} | ConvertTo-Json -Compress

Invoke-RestMethod -Uri "http://localhost:3004/buku" -Method Post -ContentType "application/json" -Body $body
```

**Hasil:** Berhasil menambahkan buku dengan ID 3.

Data buku:

```json
{
  "id": 3,
  "judul": "Pemrograman Java",
  "penulis": "Siti Khodijah"
}
```

Status HTTP: `201 Created`.

### F. Validasi POST `/buku`

**Request:** Mengirim data tanpa field `penulis`.

```powershell
$body = @{
    judul = "Buku Tanpa Penulis"
} | ConvertTo-Json -Compress

try {
    Invoke-RestMethod -Uri "http://localhost:3004/buku" -Method Post -ContentType "application/json" -Body $body
} catch {
    Write-Host "Status HTTP:" ([int]$_.Exception.Response.StatusCode)
    Write-Host $_.ErrorDetails.Message
}
```

**Hasil:** `400 Bad Request`.

Response:

```json
{
  "success": false,
  "message": "Field judul dan penulis wajib diisi"
}
```

**Keterangan:** Request ditolak karena field `judul` dan `penulis` wajib diisi.

### G. PUT `/buku/1`

**Request:**

```powershell
$body = @{
    judul = "Basis Data Lanjutan"
    penulis = "Andi"
} | ConvertTo-Json -Compress

Invoke-RestMethod -Uri "http://localhost:3004/buku/1" -Method Put -ContentType "application/json" -Body $body
```

**Hasil:** Berhasil mengubah judul buku ID 1 menjadi `Basis Data Lanjutan`.

Status HTTP: `200 OK`.

### H. GET `/anggota`

**Request:**

```powershell
curl.exe http://localhost:3004/anggota
```

**Hasil:** Berhasil menampilkan daftar anggota perpustakaan.

### I. GET `/peminjaman`

**Request:**

```powershell
curl.exe -i http://localhost:3004/peminjaman
```

**Hasil:** `404 Not Found`.

Response:

```json
{
  "success": false,
  "message": "Endpoint GET /peminjaman tidak ditemukan"
}
```

**Keterangan:** Endpoint peminjaman belum tersedia pada aplikasi sehingga API mengembalikan status 404.

### J. Filter Buku Berdasarkan Penulis

**Request:**

```powershell
curl.exe "http://localhost:3004/buku?penulis=Andi"
```

**Hasil:**

```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 1,
      "judul": "Basis Data Lanjutan",
      "penulis": "Andi"
    }
  ]
}
```

**Keterangan:** API berhasil menampilkan satu buku yang ditulis oleh Andi.

### K. Pencarian Buku Berdasarkan Judul

**Request:**

```powershell
curl.exe "http://localhost:3004/buku?cari=Java"
```

**Hasil:**

```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 3,
      "judul": "Pemrograman Java",
      "penulis": "Siti Khodijah"
    }
  ]
}
```

**Keterangan:** API berhasil menemukan satu buku dengan judul yang mengandung kata `Java`.

## 9. Kesimpulan

Aplikasi REST API Sistem Informasi Perpustakaan dibangun menggunakan Node.js dan Express.js. Aplikasi menerapkan routing, middleware JSON, middleware logger, route parameter, query parameter, validasi input, response JSON, status HTTP, handler 404, dan error middleware.

Berdasarkan pengujian yang telah dilakukan, endpoint daftar buku, detail buku, penambahan buku, perubahan buku, daftar anggota, filter buku, validasi input, dan handler 404 memberikan hasil sesuai dengan yang diharapkan.

Data aplikasi masih disimpan dalam array JavaScript sehingga belum tersimpan secara permanen. Pengembangan berikutnya dapat dilakukan dengan menghubungkan aplikasi ke database dan menambahkan fitur transaksi peminjaman buku.
