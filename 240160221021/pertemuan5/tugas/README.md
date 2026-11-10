# Tugas 3 - Perancangan dan Implementasi RESTful API

Nama dan NIM: Lintang Azzahra Govarana (240160221021)

RESTful API Express.js untuk resource buku perpustakaan (lanjutan Tugas 1 dan 2), dengan route parameter, query parameter, validasi input, serta response JSON dan status code yang konsisten.

## Struktur project

```
tugas/
├── package.json
├── package-lock.json
├── app.js
├── server.js
└── README.md
```

- `app.js`: aplikasi Express (middleware, route, validasi, 404, error middleware).
- `server.js`: membuka port dan menjalankan aplikasi.

## Cara menjalankan

Syarat: Node.js versi 20 atau lebih baru.

```
npm install
npm start
```

Server berjalan di `http://localhost:3006`. Port dapat diubah lewat environment variable `PORT`.

## Kontrak endpoint

| Operasi | Method | Endpoint | Request body | Status sukses | Status gagal |
|:--|:--|:--|:--|:--|:--|
| Informasi API | GET | / | tidak ada | 200 | - |
| Cek status | GET | /health | tidak ada | 200 | - |
| Daftar buku | GET | /buku | tidak ada | 200 | 400 |
| Detail buku | GET | /buku/:id | tidak ada | 200 | 400, 404 |
| Tambah buku | POST | /buku | judul, penulis, tahun, stok | 201 | 400 |
| Ganti seluruh buku | PUT | /buku/:id | judul, penulis, tahun, stok | 200 | 400, 404 |
| Ubah sebagian buku | PATCH | /buku/:id | salah satu field | 200 | 400, 404 |
| Hapus buku | DELETE | /buku/:id | tidak ada | 204 | 400, 404 |

Query parameter pada `GET /buku`: `penulis` (nama penulis), `tahun` (bilangan bulat), dan `minStok` (bilangan bulat minimal 0). Ketiganya dapat digabung.

## Format response

Sukses:

```
{ "success": true, "message": "Detail buku berhasil diambil", "data": { "id": 1, "judul": "Belajar Node.js", "penulis": "Andi", "tahun": 2024, "stok": 3 } }
```

Error:

```
{ "success": false, "message": "Data buku tidak valid", "details": ["Field penulis wajib diisi"] }
```

Response DELETE yang berhasil memakai status 204 tanpa body.

## Hasil pengujian

| No | Request | Status | Hasil |
|:--|:--|:--|:--|
| 1 | GET / | 200 | Informasi API dan daftar endpoint |
| 2 | GET /buku | 200 | Tiga buku tampil |
| 3 | GET /buku?penulis=Andi&minStok=1 | 200 | Satu buku (Belajar Node.js) |
| 4 | GET /buku?tahun=2025 | 200 | Satu buku (REST API untuk Pemula) |
| 5 | GET /buku?tahun=abc | 400 | Query tidak valid |
| 6 | GET /buku/1 | 200 | Detail buku tampil |
| 7 | GET /buku/99 | 404 | Buku tidak ditemukan |
| 8 | GET /buku/abc | 400 | id harus bilangan bulat positif |
| 9 | POST /buku dengan data lengkap | 201 | Buku baru dengan id 4 |
| 10 | POST /buku tanpa penulis dan stok -1 | 400 | Daftar error validasi tampil |
| 11 | PUT /buku/1 dengan data lengkap | 200 | Buku diganti |
| 12 | PUT /buku/1 dengan data tidak lengkap | 400 | Field wajib belum lengkap |
| 13 | PATCH /buku/1 (stok 5) | 200 | Stok berubah |
| 14 | PATCH /buku/99 | 404 | Buku tidak ditemukan |
| 15 | DELETE /buku/2 | 204 | Berhasil tanpa body |
| 16 | GET /buku/2 setelah dihapus | 404 | Buku sudah tidak ada |
| 17 | GET /tidak-ada | 404 | Endpoint tidak ditemukan |

## Catatan

- Data disimpan di memori, sehingga kembali ke data awal saat server dihentikan.
- Folder `node_modules` tidak disertakan dalam pengumpulan; jalankan `npm install` untuk memasangnya.