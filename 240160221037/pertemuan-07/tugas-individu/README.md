# Tugas Individu Pertemuan 07
## REST API Buku dengan Arsitektur Service–Controller–Routes

### 1. Deskripsi
Project ini merupakan REST API untuk mengelola data buku menggunakan Node.js, Express.js, TypeScript, dan Prisma dengan database SQLite.

API menyediakan fitur CRUD (Create, Read, Update, Delete).

### 2. Struktur Folder

```text
tugas-individu/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controller/
│   │   └── buku.controller.ts
│   ├── routes/
│   │   └── buku.routes.ts
│   └── service/
│       └── buku.service.ts
├── app.ts
├── client.ts
├── server.ts
├── package.json
└── README.md
```

### 3. Arsitektur Program

**Routes**
Mengatur alamat endpoint dan menghubungkan request ke controller.

**Controller**
Mengelola request dan response, melakukan validasi input, serta menentukan status HTTP.

**Service**
Mengelola proses pengolahan data dan berkomunikasi dengan database menggunakan Prisma.

**Database**
Menggunakan SQLite untuk menyimpan data buku.

### 4. Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/buku` | Mengambil semua buku |
| GET | `/buku/:id` | Mengambil buku berdasarkan ID |
| POST | `/buku` | Menambahkan buku |
| PATCH | `/buku/:id` | Mengubah data buku |
| DELETE | `/buku/:id` | Menghapus buku |

### 5. Contoh Pengujian

**GET semua buku**
```bash
curl http://localhost:3008/buku
```

**POST tambah buku**
```bash
curl -X POST http://localhost:3008/buku -H "Content-Type: application/json" -d "{\"judul\":\"Belajar Node.js\",\"penulis\":\"Andi\",\"tahun\":2024,\"stok\":5}"
```

**GET buku berdasarkan ID**
```bash
curl http://localhost:3008/buku/1
```

**PATCH ubah buku**
```bash
curl -X PATCH http://localhost:3008/buku/1 -H "Content-Type: application/json" -d "{\"judul\":\"Belajar Backend Node.js\",\"stok\":10}"
```

**DELETE hapus buku**
```bash
curl -X DELETE http://localhost:3008/buku/1
```

### 6. Validasi dan HTTP Status

- `200 OK`: Request berhasil.
- `201 Created`: Data buku berhasil ditambahkan.
- `204 No Content`: Data buku berhasil dihapus.
- `400 Bad Request`: Input tidak valid.
- `404 Not Found`: Data atau endpoint tidak ditemukan.
- `500 Internal Server Error`: Terjadi kesalahan pada server.

### 7. Cara Menjalankan Project

1. Instal dependency menggunakan `npm install`.
2. Pastikan konfigurasi database pada file `.env` sudah tersedia.
3. Jalankan Prisma generate dan migrasi jika diperlukan.
