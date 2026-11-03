# Latihan Individu Pertemuan 6
## API Pengguna dengan Node.js dan Prisma

### Deskripsi
Latihan ini merupakan implementasi REST API untuk mengelola data pengguna menggunakan Node.js, Express, dan Prisma.

### Cara Menjalankan
1. Buka terminal pada folder `Latihan`.
2. Jalankan perintah berikut untuk memasang dependency:

   ```bash
   npm install
   ```

3. Jalankan server:

   ```bash
   npm start
   ```

4. Server berjalan pada:

   `http://localhost:3009`

### Daftar Endpoint API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/pengguna` | Mengambil seluruh data pengguna |
| POST | `/pengguna` | Menambahkan data pengguna |
| GET | `/pengguna/:nim` | Mencari pengguna berdasarkan NIM |
| PATCH | `/pengguna/:nim` | Memperbarui data pengguna |
| DELETE | `/pengguna/:nim` | Menghapus data pengguna |

### Pengujian API
Pengujian dilakukan menggunakan Postman. Seluruh endpoint telah berhasil diuji dengan hasil:

- GET seluruh pengguna: `200 OK`
- POST pengguna: `201 Created`
- GET berdasarkan NIM: `200 OK`
- PATCH pengguna: `200 OK`
- DELETE pengguna: `204 No Content`

### Kesimpulan
Seluruh endpoint API Pengguna berhasil dijalankan dan diuji menggunakan Postman.
