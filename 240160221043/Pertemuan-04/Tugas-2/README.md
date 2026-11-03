
# Tugas 2 — REST Endpoint dengan Express.js

**Nama:** Salwa Ananda Rachmat  
**NIM:** 240160221043  
**Program Studi:** Sistem Informasi

## Deskripsi

Project ini merupakan implementasi REST API untuk mengelola data mahasiswa menggunakan Express.js. API menyediakan fitur melihat daftar mahasiswa, melihat detail mahasiswa, mencari mahasiswa berdasarkan nama, menambahkan data, mengubah data, dan menghapus data mahasiswa.

## Teknologi yang Digunakan

- Node.js
- Express.js
- JavaScript
- JSON

## Struktur Project

```text
Tugas-2/
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Cara Menjalankan Project

1. Buka terminal pada folder project.
2. Install dependency:

   ```bash
   npm install
   ```

3. Jalankan server:

   ```bash
   npm start
   ```

4. Server berjalan di:

   `http://localhost:3004`

## Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/mahasiswa` | Menampilkan semua mahasiswa |
| GET | `/mahasiswa?nama=Andi` | Mencari mahasiswa berdasarkan nama |
| GET | `/mahasiswa/:id` | Menampilkan detail mahasiswa |
| POST | `/mahasiswa` | Menambahkan mahasiswa |
| PUT | `/mahasiswa/:id` | Mengubah data mahasiswa |
| DELETE | `/mahasiswa/:id` | Menghapus mahasiswa |

## Contoh Request

### 1. GET Daftar Mahasiswa

```http
GET http://localhost:3004/mahasiswa
```

### 2. GET Detail Mahasiswa

```http
GET http://localhost:3004/mahasiswa/1
```

### 3. GET Pencarian Mahasiswa

```http
GET http://localhost:3004/mahasiswa?nama=Andi
```

### 4. POST Tambah Mahasiswa

```http
POST http://localhost:3004/mahasiswa
Content-Type: application/json
```

Body JSON:

```json
{
  "nim": "240160221043",
  "nama": "Salwa Ananda Rachmat",
  "prodi": "Sistem Informasi",
  "semester": 5
}
```

## Middleware

- `express.json()` digunakan untuk membaca request body dalam format JSON.
- Middleware logger mencatat method dan URL setiap request.
- Handler 404 mengembalikan pesan ketika endpoint atau data yang diminta tidak ditemukan.
- Error middleware menangani kesalahan pada server.

## Hasil Pengujian

| Pengujian | Hasil |
|---|---|
| GET daftar mahasiswa | Berhasil, status 200 |
| GET detail mahasiswa | Berhasil, status 200 |
| GET pencarian nama | Berhasil, status 200 |
| GET mahasiswa tidak ditemukan | Pesan mahasiswa tidak ditemukan |
| POST tambah mahasiswa | Berhasil, status 201 |
| POST dengan nama kosong | Ditolak dengan status 400 |
| Endpoint tidak ditemukan | Status 404 |

## Catatan

Data mahasiswa disimpan sementara dalam variabel di memori aplikasi. Data akan kembali ke kondisi awal ketika server dijalankan ulang.