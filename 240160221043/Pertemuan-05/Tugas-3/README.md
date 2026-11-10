# Tugas 3 — RESTful API Mahasiswa
## Pemrograman Backend Web

### 1. Deskripsi
Tugas ini merupakan implementasi RESTful API menggunakan Node.js dan Express.js dengan resource mahasiswa. API menyediakan fitur untuk menampilkan, mencari, menambahkan, memperbarui, dan menghapus data mahasiswa.

### 2. Teknologi
- Node.js
- Express.js
- JavaScript
- PowerShell untuk pengujian API

### 3. Cara Menjalankan Program

1. Buka terminal pada folder `Tugas-3`.
2. Install dependency:

   ```bash
   npm install
   ```

3. Jalankan server:

   ```bash
   node tugas.js
   ```

4. Server berjalan pada:

   `http://localhost:3008`

### 4. Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/mahasiswa` | Menampilkan seluruh data mahasiswa |
| GET | `/mahasiswa/:nim` | Menampilkan detail mahasiswa |
| POST | `/mahasiswa` | Menambahkan mahasiswa baru |
| PUT | `/mahasiswa/:nim` | Memperbarui seluruh data mahasiswa |
| PATCH | `/mahasiswa/:nim` | Memperbarui sebagian data mahasiswa |
| DELETE | `/mahasiswa/:nim` | Menghapus data mahasiswa |

### 5. Filter Query

API menyediakan dua filter:

- `prodi`: memfilter mahasiswa berdasarkan program studi.
- `angkatan`: memfilter mahasiswa berdasarkan tahun angkatan.

Contoh penggunaan:

```text
GET /mahasiswa?prodi=Sistem%20Informasi
GET /mahasiswa?angkatan=2024
GET /mahasiswa?prodi=Sistem%20Informasi&angkatan=2024
```

### 6. Hasil Pengujian

| No. | Method | URL | Status | Keterangan |
|---|---|---|---|---|
| 1 | GET | `/mahasiswa` | 200 | Menampilkan seluruh mahasiswa |
| 2 | GET | `/mahasiswa?prodi=Sistem%20Informasi` | 200 | Filter berdasarkan prodi |
| 3 | GET | `/mahasiswa?angkatan=2024` | 200 | Filter berdasarkan angkatan |
| 4 | GET | `/mahasiswa?prodi=Sistem%20Informasi&angkatan=2024` | 200 | Menggunakan dua filter sekaligus |
| 5 | GET | `/mahasiswa/240160221043` | 200 | Menampilkan detail mahasiswa |
| 6 | GET | `/mahasiswa/999999999999` | 404 | Mahasiswa tidak ditemukan |
| 7 | POST | `/mahasiswa` | 201 | Berhasil menambahkan mahasiswa |
| 8 | POST | `/mahasiswa` (tanpa nama) | 400 | Validasi data gagal |
| 9 | PUT | `/mahasiswa/240160221045` | 200 | Berhasil memperbarui seluruh data |
| 10 | PUT | `/mahasiswa/240160221045` (tanpa angkatan) | 400 | Validasi data gagal |
| 11 | PATCH | `/mahasiswa/240160221045` | 200 | Berhasil memperbarui sebagian data |
| 12 | PATCH | `/mahasiswa/999999999999` | 404 | Mahasiswa tidak ditemukan |
| 13 | DELETE | `/mahasiswa/240160221045` | 204 | Berhasil menghapus mahasiswa |

### 7. Kesimpulan

RESTful API Mahasiswa berhasil dibuat menggunakan Express.js. API telah memiliki enam endpoint utama, dua filter query, validasi data, penanganan data yang tidak ditemukan, serta penghapusan data dengan respons HTTP 204 No Content.