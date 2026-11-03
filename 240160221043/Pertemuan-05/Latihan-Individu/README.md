# Pertemuan 5 — Latihan Individu
## RESTful API Express.js

### 1. Deskripsi
Latihan ini bertujuan untuk membuat RESTful API menggunakan Express.js dengan resource mahasiswa. API menyediakan fitur menampilkan data, mencari berdasarkan NIM, filter berdasarkan prodi, menambahkan data, memperbarui data, dan menghapus data.

### 2. Teknologi
- Node.js
- Express.js
- JavaScript
- PowerShell untuk pengujian API

### 3. Cara Menjalankan Program

1. Buka terminal pada folder `Latihan-Individu`.
2. Install dependency:

   ```bash
   npm install
   ```

3. Jalankan server:

   ```bash
   node latihan.js
   ```

4. Server berjalan pada:

   `http://localhost:3007`

### 4. Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/mahasiswa` | Menampilkan seluruh mahasiswa |
| GET | `/mahasiswa?prodi=Sistem%20Informasi` | Filter mahasiswa berdasarkan prodi |
| GET | `/mahasiswa/:nim` | Menampilkan detail mahasiswa |
| POST | `/mahasiswa` | Menambahkan mahasiswa |
| PATCH | `/mahasiswa/:nim` | Memperbarui sebagian data mahasiswa |
| DELETE | `/mahasiswa/:nim` | Menghapus mahasiswa |

### 5. Hasil Penguj