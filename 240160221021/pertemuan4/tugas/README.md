# Tugas 2 - REST Endpoint dengan Express.js

Nama dan NIM: Lintang Azzahra Govarana (240160221021)

Aplikasi Express.js untuk resource buku perpustakaan (lanjutan dari Tugas 1), dengan routing, middleware JSON dan logger, route parameter, query parameter, validasi input, serta penanganan 404 dan error.

## Struktur project

```
tugas/
├── package.json
├── package-lock.json
├── app.js
├── server.js
└── README.md
```

- `app.js`: membuat aplikasi Express, mendaftarkan middleware, route, handler 404, dan error middleware.
- `server.js`: membuka port dan menjalankan aplikasi dari `app.js`.
- `package.json`: dependency (Express) dan script npm.

## Cara menjalankan

Syarat: Node.js versi 20 atau lebih baru.

```
npm install
npm start
```

Server berjalan di `http://localhost:3004`. Port dapat diubah lewat environment variable `PORT`. Contoh di PowerShell:

```
$env:PORT="3050"; npm start
```

## Daftar endpoint

| Method | Endpoint | Fungsi | Status |
|:--|:--|:--|:--|
| GET | / | Informasi API dan daftar endpoint | 200 |
| GET | /buku | Daftar buku, filter ?tersedia=true atau ?tersedia=false (berdasarkan stok) | 200 |
| GET | /buku/:id | Detail satu buku | 200 / 404 |
| POST | /buku | Menambah buku (judul dan penulis wajib) | 201 / 400 |
| GET | /uji-error | Memicu error untuk menguji error middleware | 500 |
| GET | endpoint lain | Endpoint tidak ditemukan | 404 |

## Contoh request

```
curl.exe -i http://localhost:3004/buku
curl.exe -i "http://localhost:3004/buku?tersedia=true"
curl.exe -i http://localhost:3004/buku/1
curl.exe -i http://localhost:3004/buku/999
curl.exe -i http://localhost:3004/tidak-ada
curl.exe -i http://localhost:3004/uji-error
```

Contoh request POST di PowerShell:

```
Invoke-WebRequest -Method Post -Uri http://localhost:3004/buku -ContentType "application/json" -Body '{"judul":"Belajar Express","penulis":"Dewi","tahun":2026,"stok":4}' -UseBasicParsing
```

## Hasil pengujian

| No | Request | Status | Hasil |
|:--|:--|:--|:--|
| 1 | GET /buku | 200 | Tiga buku tampil |
| 2 | GET /buku?tersedia=true | 200 | Dua buku tampil, buku dengan stok 0 tersaring |
| 3 | GET /buku/1 | 200 | Satu buku (Belajar Node.js) tampil |
| 4 | GET /buku/999 | 404 | Pesan: Buku dengan id 999 tidak ditemukan |
| 5 | POST /buku dengan data lengkap | 201 | Buku baru tersimpan dengan id 4 |
| 6 | POST /buku tanpa penulis | 400 | Pesan: Field judul dan penulis wajib diisi |
| 7 | GET /tidak-ada | 404 | Pesan: Endpoint GET /tidak-ada tidak ditemukan |
| 8 | GET /uji-error | 500 | Pesan umum: Terjadi kesalahan pada server |

## Catatan

- Data disimpan di memori, sehingga kembali ke data awal saat server dihentikan.
- Folder `node_modules` tidak disertakan dalam pengumpulan; jalankan `npm install` untuk memasangnya.