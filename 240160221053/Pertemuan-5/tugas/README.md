# RESTful API - Sistem Informasi Perpustakaan

Nama    : Athiyya Salsabila Hermawan
NPM     : 240160221053
Kelas   : SI-VB

Project ini adalah implementasi RESTful API menggunakan Express.js untuk resource Buku.

## Cara Menjalankan
1. Buka terminal di folder project.
2. Jalankan `npm install` (jika belum).
3. Jalankan `node server.js` atau `npm start`.
4. Server berjalan di `http://localhost:3000`.

## BUKTI PENGERJAAN
PS D:\240160221053\Pertemuan-5\tugas> npm start

> perpustakaan-restful-api@1.0.0 start
> node server.js

Server berjalan di http://localhost:3001
[2026-10-30T10:39:23.740Z] GET /api/books
[2026-10-30T10:39:49.901Z] GET /api/books?author=Andrea
[2026-10-30T10:40:08.691Z] GET /api/books?minStock=4
[2026-10-30T10:40:41.614Z] GET /api/books?author=Andrea&minStock=2
[2026-10-30T10:41:11.192Z] GET /api/books/1
[2026-10-30T10:41:32.814Z] GET /api/books/999

PS D:\240160221053> cd Pertemuan-5/tugas
PS D:\240160221053\Pertemuan-5\tugas> curl.exe http://localhost:3001/api/books
{"status":"success","message":"Daftar buku berhasil diambil","data":[{"id":1,"title":"Bumi Manusia","author":"Pramoedya Ananta Toer","stock":5},{"id":2,"title":"Laskar Pelangi","author":"Andrea Hirata","stock":3}]}
PS D:\240160221053\Pertemuan-5\tugas> curl.exe "http://localhost:3001/api/books?author=Andrea"
{"status":"success","message":"Daftar buku berhasil diambil","data":[{"id":2,"title":"Laskar Pelangi","author":"Andrea Hirata","stock":3}]}
PS D:\240160221053\Pertemuan-5\tugas> curl.exe "http://localhost:3001/api/books?minStock=4"
{"status":"success","message":"Daftar buku berhasil diambil","data":[{"id":1,"title":"Bumi Manusia","author":"Pramoedya Ananta Toer","stock":5}]}
PS D:\240160221053\Pertemuan-5\tugas> curl.exe "http://localhost:3001/api/books?author=Andrea&minStock=2"
{"status":"success","message":"Daftar buku berhasil diambil","data":[{"id":2,"title":"Laskar Pelangi","author":"Andrea Hirata","stock":3}]}
PS D:\240160221053\Pertemuan-5\tugas> curl.exe http://localhost:3001/api/books/1
{"status":"success","message":"Detail buku berhasil diambil","data":{"id":1,"title":"Bumi Manusia","author":"Pramoedya Ananta Toer","stock":5}}
PS D:\240160221053\Pertemuan-5\tugas> curl.exe http://localhost:3001/api/books/999
{"status":"error","message":"Buku tidak ditemukan","data":null}