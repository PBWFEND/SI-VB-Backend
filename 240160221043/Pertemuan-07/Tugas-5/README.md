# Tugas 5 – Pertemuan 07
## Refactoring REST API Mahasiswa

### Identitas
- **Nama:** Salwa Ananda Rachmat
- **NIM:** 240160221043
- **Kelas:** SI-VB
- **Mata Kuliah:** Pemrograman Backend

### Deskripsi
Tugas ini merupakan pengembangan REST API Mahasiswa dengan menerapkan pemisahan kode menggunakan konsep Routes, Controller, dan Service agar kode lebih terstruktur dan mudah dikelola.

### Teknologi
- Node.js
- Express.js 5
- Prisma ORM 7
- SQLite
- TypeScript

### Struktur Folder
```text
Tugas-5/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── generated/
├── src/
│   ├── routes/
│   │   └── mahasiswa.routes.ts
│   ├── controller/
│   │   └── mahasiswa.controller.ts
│   ├── service/
│   │   └── mahasiswa.service.ts
│   └── app.ts
├── client.ts
├── prisma.config.ts
├── package.json
├── package-lock.json
└── README.md
```

### Pembagian Tugas Setiap Layer
1. **Routes:** Mengatur endpoint API dan menghubungkannya dengan controller.
2. **Controller:** Mengelola request, validasi input, dan response API.
3. **Service:** Mengelola operasi database menggunakan Prisma.
4. **App:** Mengatur middleware, routes, server, dan error handler.

### Daftar Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/mahasiswa` | Mengambil semua data mahasiswa |
| GET | `/mahasiswa/:nim` | Mengambil detail mahasiswa |
| POST | `/mahasiswa` | Menambahkan mahasiswa |
| PATCH | `/mahasiswa/:nim` | Mengubah data mahasiswa |
| DELETE | `/mahasiswa/:nim` | Menghapus mahasiswa |

### Validasi
- NIM wajib diisi.
- Nama wajib diisi.
- Program studi wajib diisi.
- Semester harus berupa bilangan bulat minimal 1.
- Data yang tidak ditemukan menghasilkan status 404.
- Kesalahan server ditangani melalui error handler.

### Cara Menjalankan Project

1. Install dependencies:
   ```bash
   npm install
   ```

2. Jalankan migrasi database:
   ```bash
   npx prisma@7 migrate dev
   ```

3. Generate Prisma Client:
   ```bash
   npx prisma@7 generate
   ```

4. Jalankan server:
   ```bash
   npm start
   ```

5. Buka API melalui:
   ```text
   http://localhost:3011
   ```

### Contoh Pengujian API

**GET semua mahasiswa**
```http
GET http://localhost:3011/mahasiswa
```

**POST mahasiswa**
```json
{
  "nim": "240160221043",
  "nama": "Salwa Ananda Rachmat",
  "prodi": "Sistem Informasi",
  "semester": 5
}
```

**PATCH mahasiswa**
```json
{
  "semester": 6
}
```

**DELETE mahasiswa**
```http
DELETE http://localhost:3011/mahasiswa/240160221043
```
