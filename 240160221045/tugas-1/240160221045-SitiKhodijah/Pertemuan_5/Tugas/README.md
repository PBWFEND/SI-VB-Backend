# Tugas 3 — Perancangan dan Implementasi RESTful API

## Identitas Mahasiswa
- **Nama:** Siti Khodijah
- **NIM:** 240160221045
- **Program Studi:** Sistem Informasi

## Deskripsi
Tugas ini merupakan implementasi RESTful API menggunakan Express.js dengan resource data mahasiswa. API menyediakan fitur untuk melihat, menambahkan, mengubah, dan menghapus data mahasiswa.

## Teknologi
- Node.js
- Express.js
- JavaScript

## Cara Menjalankan Program

1. Buka terminal pada folder `Tugas`.
2. Jalankan perintah untuk menginstal dependency:

   ```bash
   npm install
   ```

3. Jalankan server:

   ```bash
   npm start
   ```

4. API dapat diakses melalui alamat:

   `http://localhost:3008`

## Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/mahasiswa` | Menampilkan semua data mahasiswa |
| GET | `/mahasiswa/:nim` | Menampilkan detail mahasiswa berdasarkan NIM |
| POST | `/mahasiswa` | Menambahkan data mahasiswa |
| PUT | `/mahasiswa/:nim` | Mengganti seluruh data mahasiswa |
| PATCH | `/mahasiswa/:nim` | Mengubah sebagian data mahasiswa |
| DELETE | `/mahasiswa/:nim` | Menghapus data mahasiswa |

## Fitur API

- Menampilkan seluruh data mahasiswa.
- Menampilkan detail mahasiswa berdasarkan NIM.
- Menambahkan data mahasiswa baru.
- Mengubah seluruh data mahasiswa menggunakan PUT.
- Mengubah sebagian data mahasiswa menggunakan PATCH.
- Menghapus data mahasiswa menggunakan DELETE.
- Filter data berdasarkan parameter query `prodi`.
- Filter data berdasarkan parameter query `angkatan`.
- Validasi input untuk mencegah data tidak valid.
- Menggunakan status HTTP sesuai hasil permintaan.

### Contoh Penggunaan Filter

Filter berdasarkan program studi:

`http://localhost:3008/mahasiswa?prodi=Sistem%20Informasi`

Filter berdasarkan angkatan:

`http://localhost:3008/mahasiswa?angkatan=2024`

## Format Response

### Response Berhasil

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": []
}
```

### Response Gagal

```json
{
  "success": false,
  "message": "Mahasiswa tidak ditemukan"
}
```

## Status Kode HTTP

| Status | Keterangan |
|---|---|
| 200 | Permintaan berhasil |
| 201 | Data berhasil dibuat |
| 204 | Data berhasil dihapus tanpa response body |
| 400 | Input tidak valid |
| 404 | Data atau endpoint tidak ditemukan |

## Hasil Pengujian

Pengujian RESTful API dilakukan menggunakan browser dan PowerShell.

Berikut hasil pengujian yang telah dilakukan:

| No. | Pengujian | Method | Status | Hasil |
|---|---|---|---|---|
| 1 | Menampilkan semua mahasiswa | GET | 200 | Berhasil |
| 2 | Filter berdasarkan prodi | GET | 200 | Berhasil |
| 3 | Filter berdasarkan angkatan | GET | 200 | Berhasil |
| 4 | Menampilkan detail mahasiswa | GET | 200 | Berhasil |
| 5 | Menambahkan mahasiswa | POST | 201 | Berhasil |
| 6 | Mengganti seluruh data mahasiswa | PUT | 200 | Berhasil |
| 7 | Mengubah sebagian data mahasiswa | PATCH | 200 | Berhasil |
| 8 | Menghapus mahasiswa | DELETE | 204 | Berhasil |
| 9 | Validasi input tidak lengkap | POST | 400 | Berhasil |
| 10 | Mengakses data yang tidak ditemukan | GET | 404 | Berhasil |

Seluruh pengujian berhasil dilakukan dan memberikan response sesuai dengan ketentuan RESTful API.

## Catatan

Data mahasiswa disimpan sementara menggunakan array di dalam aplikasi (in-memory). Oleh karena itu, data yang ditambahkan atau diubah akan kembali ke data awal ketika server dijalankan ulang.

Bukti hasil pengujian disimpan dalam folder `bukti-testing`.