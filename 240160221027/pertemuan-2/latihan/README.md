# Tugas 2 - API Perpustakaan

## 1. Deskripsi
Project ini merupakan pembuatan REST API sederhana untuk mengelola data buku perpustakaan menggunakan Node.js dan modul HTTP bawaan tanpa menggunakan framework Express.

## 2. Tujuan
- Memahami cara membuat HTTP Server menggunakan Node.js.
- Memahami penggunaan method HTTP GET dan POST.
- Memahami format data JSON.
- Memahami penggunaan endpoint API.
- Memahami cara membaca dan menyimpan data buku ke file JSON.

## 3. Teknologi yang Digunakan
- Node.js
- HTTP Module
- JavaScript
- JSON

## 4. Struktur Folder
```text
tugas-2/
├── data/
│   └── buku.json
├── config.js
├── response.js
├── server.js
├── package.json
└── README.md
```

## 5. Cara Menjalankan Program
1. Buka folder `tugas-2` menggunakan Visual Studio Code.
2. Buka terminal pada folder tersebut.
3. Jalankan perintah berikut:

   `npm start`

4. Jika server berhasil berjalan, buka browser dan akses:

   `http://localhost:3001`

## 6. Daftar Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Menampilkan informasi API |
| GET | `/perpustakaan` | Menampilkan informasi perpustakaan |
| GET | `/buku` | Menampilkan semua data buku |
| GET | `/buku/:id` | Menampilkan buku berdasarkan ID |
| GET | `/kategori` | Menampilkan daftar kategori buku |
| POST | `/buku` | Menambahkan data buku baru |

## 7. Contoh Pengujian

### Menampilkan semua buku
```bash
curl.exe http://localhost:3001/buku
```

### Menampilkan buku berdasarkan ID
```bash
curl.exe http://localhost:3001/buku/1
```

### Menampilkan kategori buku
```bash
curl.exe http://localhost:3001/kategori
```

### Menambahkan buku baru
```bash
curl.exe -X POST "http://localhost:3001/buku" -H "Content-Type: application/json" -d "{\"judul\":\"Pemrograman Web\",\"penulis\":\"Budi\",\"tahun\":2024,\"kategori\":\"Teknologi\"}"
```

## 8. Status Kode Respons HTTP
- `200 OK`: Permintaan berhasil.
- `201 Created`: Data buku berhasil ditambahkan.
- `400 Bad Request`: Data yang dikirim tidak valid.
- `404 Not Found`: Endpoint atau buku tidak ditemukan.
- `500 Internal Server Error`: Terjadi kesalahan pada server.

## 9. Kesimpulan
Melalui project ini, mahasiswa dapat memahami dasar pembuatan REST API menggunakan Node.js, mulai dari membuat server HTTP, mengelola endpoint, membaca data JSON, hingga menambahkan data buku baru ke dalam file JSON.

Project ini dibuat untuk memenuhi tugas praktikum Backend Development.
