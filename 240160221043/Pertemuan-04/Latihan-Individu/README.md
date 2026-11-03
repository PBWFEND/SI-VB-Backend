# Praktikum Pertemuan 4 — Express.js Dasar

*Nama:* Salwa Ananda Rachmat  
*NIM:* 240160221043  
*Mata Kuliah:* Pemrograman Web Framework  
*Materi:* Express.js Dasar (CPMK117)

## 1. Deskripsi

Project ini merupakan praktikum dasar Express.js menggunakan Node.js. Praktikum ini bertujuan untuk memahami pembuatan server menggunakan Express, penggunaan routing, middleware, parameter URL, query parameter, serta pengolahan request dan response dalam format JSON.

Project ini terdiri dari latihan dasar Express.js dan API perpustakaan sederhana.

## 2. Teknologi yang Digunakan

- Node.js
- Express.js
- JavaScript ES Modules
- JSON

## 3. Struktur Folder

```text
Latihan-Individu/
├── app.js
├── server.js
├── latihan.js
├── package.json
├── package-lock.json
└── README.md
```

Folder `node_modules` juga akan terbentuk otomatis setelah Express.js diinstal.

## 4. Cara Menjalankan Project

### Instalasi

Buka terminal pada folder project, kemudian jalankan:

```bash
npm install
```

### Menjalankan API Perpustakaan

```bash
npm start
```

Server berjalan pada:

`http://localhost:3004`

### Menjalankan Latihan Express.js

Buka terminal baru, lalu jalankan:

```bash
node latihan.js
```

Server latihan berjalan pada:

`http://localhost:3005`

Kedua server menggunakan port berbeda agar dapat dijalankan secara bersamaan.

## 5. Endpoint API Perpustakaan

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Menampilkan pesan API aktif |
| GET | `/buku` | Menampilkan semua buku |
| GET | `/buku?tersedia=true` | Menampilkan buku yang tersedia |
| GET | `/buku?tersedia=false` | Menampilkan buku yang tidak tersedia |
| GET | `/buku/:id` | Menampilkan detail buku berdasarkan ID |
| POST | `/buku` | Menambahkan buku baru |

## 6. Endpoint Latihan Express.js

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Menampilkan pesan server latihan |
| GET | `/health` | Memeriksa status server |
| GET | `/halo/:nama` | Menampilkan sapaan berdasarkan parameter nama |
| GET | `/cari?q=express` | Membaca query parameter pencarian |

## 7. Contoh Request POST

Endpoint: `POST /buku`

Content-Type: `application/json`

Contoh request body:

```json
{
  "judul": "Belajar Node.js",
  "penulis": "Salwa"
}
```

Jika berhasil, server mengembalikan status HTTP `201 Created`.

Jika judul atau penulis tidak diisi, server mengembalikan status HTTP `400 Bad Request`.

## 8. Middleware

Middleware yang digunakan dalam API perpustakaan meliputi:

- `express.json()` untuk membaca request body dalam format JSON.
- Logger untuk mencatat method dan URL request.
- Middleware 404 untuk menangani endpoint yang tidak ditemukan.
- Error handler untuk menangani kesalahan server.

## 9. Hasil Pengujian

Pengujian dilakukan menggunakan terminal PowerShell dengan `curl.exe` dan `Invoke-RestMethod`.

| Pengujian | Hasil |
|---|---|
| GET `/buku` | Berhasil menampilkan daftar buku |
| GET `/buku?tersedia=true` | Berhasil menampilkan buku yang tersedia |
| GET `/buku/1` | Berhasil menampilkan detail buku |
| GET `/buku/99` | Berhasil menampilkan pesan buku tidak ditemukan |
| POST `/buku` | Berhasil menambahkan buku baru |

## 10. Kesimpulan

Melalui praktikum ini, saya mempelajari penggunaan Express.js untuk membangun server dan REST API sederhana. Saya juga memahami routing, middleware, route parameter, query parameter, request body JSON, serta penggunaan status HTTP dalam memberikan response kepada client.

**Catatan:** Data buku masih disimpan sementara dalam array JavaScript sehingga data tambahan akan hilang ketika server dijalankan ulang.
