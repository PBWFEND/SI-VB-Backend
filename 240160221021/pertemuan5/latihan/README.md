# Latihan Pertemuan 5 - RESTful API Mahasiswa

Nama dan NIM: Lintang Azzahra Govarana (240160221021)

RESTful API Express.js untuk resource mahasiswa, dengan middleware logger, route parameter, filter query, validasi input, dan response JSON yang konsisten.

## Cara menjalankan

```
npm install
node latihan.js
```

Server berjalan di `http://localhost:3007`.

## Daftar endpoint

| Method | Endpoint | Fungsi | Status |
|:--|:--|:--|:--|
| GET | /mahasiswa | Daftar mahasiswa, filter ?prodi= dan ?angkatan= | 200 / 400 |
| GET | /mahasiswa/:nim | Detail satu mahasiswa | 200 / 404 |
| POST | /mahasiswa | Menambah mahasiswa (nim, nama, prodi, angkatan wajib) | 201 / 400 |
| PATCH | /mahasiswa/:nim | Mengubah sebagian data (nama, prodi, angkatan) | 200 / 400 / 404 |
| DELETE | /mahasiswa/:nim | Menghapus mahasiswa | 204 / 404 |

## Hasil pengujian

| No | Request | Status |
|:--|:--|:--|
| 1 | GET /mahasiswa | 200 |
| 2 | GET /mahasiswa?prodi=Sistem%20Informasi | 200 |
| 3 | GET /mahasiswa?angkatan=abc | 400 |
| 4 | GET /mahasiswa/F1D022001 | 200 |
| 5 | GET /mahasiswa/X999 | 404 |
| 6 | POST /mahasiswa dengan data lengkap | 201 |
| 7 | POST /mahasiswa dengan data tidak lengkap | 400 |
| 8 | PATCH /mahasiswa/F1D022001 (ubah nama) | 200 |
| 9 | PATCH /mahasiswa/X999 | 404 |
| 10 | DELETE /mahasiswa/F1D022002 | 204 |
| 11 | GET /mahasiswa/F1D022002 setelah dihapus | 404 |