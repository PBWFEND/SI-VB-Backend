# Latihan Individu — Pertemuan 4

Nama    : Athiyya Salsabila Hermawan
NPM     : 240160221053
Kelas   : SI-VB

### Deskripsi Singkat
Latihan individu Pertemuan 4 ini merupakan praktikum pembuatan REST API sederhana menggunakan Express.js yang berfokus pada penerapan routing, middleware, route parameter, query parameter, dan penanganan error. Aplikasi ini memiliki satu resource utama yaitu buku dengan data yang disimpan dalam array (in-memory), serta dilengkapi fitur filter, validasi input, dan handler 404. Tujuan latihan ini adalah agar mahasiswa mampu memahami alur request-response, penggunaan middleware, serta pengujian endpoint API menggunakan curl.

## Struktur Folder
240160221053-Pertemuan-4/
├── latihan.js
├── package.json
├── package-lock.json
├── README.md
└── node_modules/

3. Cara Menjalankan
Buka CMD di folder proyek, lalu jalankan:
npm install
node latihan.js

### Hasil Pengujian curl
1. GET /buku
Perintah:
curl.exe http://localhost:3005/buku
Hasil:
PS D:\240160221053\Pertemuan-4\Latihan> curl.exe http://localhost:3005/buku     
{"success":true,"total":2,"data":[{"id":1,"judul":"Belajar Node.js","penulis":"Andi","tersedia":true},{"id":2,"judul":"Dasar Express.js","penulis":"Budi","tersedia":false}]}

2. GET /buku?tersedia=true
Perintah:
curl.exe "http://localhost:3005/buku?tersedia=true"
Hasil:
PS D:\240160221053\Pertemuan-4\Latihan> curl.exe "http://localhost:3005/buku?tersedia=true"
{"success":true,"total":1,"data":[{"id":1,"judul":"Belajar Node.js","penulis":"Andi","tersedia":true}]}

3. GET /buku/1 (ditemukan)
Perintah:
curl.exe http://localhost:3005/buku/1
Hasil:
PS D:\240160221053\Pertemuan-4\Latihan> curl.exe http://localhost:3005/buku/1
{"success":true,"data":{"id":1,"judul":"Belajar Node.js","penulis":"Andi","tersedia":true}}

4. GET /buku/99 (tidak ditemukan)
Perintah:
curl.exe -i http://localhost:3005/buku/99
Hasil:
PS D:\240160221053\Pertemuan-4\Latihan> curl.exe http://localhost:3005/buku/99
{"success":false,"message":"Buku tidak ditemukan"}

5. POST /buku (berhasil)
Perintah:
curl.exe -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "@body.json"
Hasil:
PS D:\240160221053\Pertemuan-4\Latihan> curl.exe -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "@body.json"{"success":true,"message":"Buku berhasil ditambahkan","data":{"id":3,"judul":"Belajar React","penulis":"Cici","tersedia":true}}

6. POST /buku (validasi gagal)
Perintah:
curl.exe -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "@body-tanpa-penulis.json"
Hasil:
PS D:\240160221053\Pertemuan-4\Latihan> curl.exe -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "@body-tanpa-penulis.json" {"success":false,"message":"Field 'judul' dan 'penulis' wajib diisi"}

7. GET /siswa (endpoint tidak ada)
Perintah:
curl.exe -i http://localhost:3005/siswa
Hasil:
PS D:\240160221053\Pertemuan-4\Latihan> curl.exe -i http://localhost:3005/siswa
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Content-Length: 65
ETag: W/"41-UARRMdM7rboOynMSPhVF3dGwBzc"
Date: Fri, 30 Oct 2026 09:08:00 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Endpoint GET /siswa tidak ditemukan"}

### Log Console Server
Saat seluruh endpoint diuji, console server menampilkan log berikut:
PS D:\240160221053\Pertemuan-4\Latihan> node latihan.js
Latihan berjalan di http://localhost:3005
Uji: curl http://localhost:3005/buku?tersedia=true
[2026-10-30T08:24:10.108Z] GET /buku
[2026-10-30T08:24:22.206Z] GET /buku?
[2026-10-30T08:25:14.963Z] GET /buku?tersedia=true
[2026-10-30T08:25:53.536Z] GET /buku/1
[2026-10-30T08:26:08.609Z] GET /buku/99
[2026-10-30T09:06:00.828Z] POST /buku
[2026-10-30T09:08:00.272Z] GET /siswa