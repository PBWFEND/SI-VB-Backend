# Latihan Individu — Pertemuan 4

Nama    : Aprilliana Fratiwi
NPM     : 240160221004
Kelas   : SI -VB

### Deskripsi Singkat
Latihan individu Pertemuan 4 ini merupakan praktikum pembuatan REST API sederhana menggunakan Express.js yang berfokus pada penerapan routing, middleware, route parameter, query parameter, dan penanganan error. Aplikasi ini memiliki satu resource utama yaitu buku dengan data yang disimpan dalam array (in-memory), serta dilengkapi fitur filter, validasi input, dan handler 404. Tujuan latihan ini adalah agar mahasiswa mampu memahami alur request-response, penggunaan middleware, serta pengujian endpoint API menggunakan curl.

## Struktur Folder
240160221004_Aprilliana-240160221004-pertemuan_04/
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
curl http://localhost:3005/buku
Hasil:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>curl http://localhost:3005/buku
{"success":true,"total":2,"data":[{"id":1,"judul":"Belajar Node.js","penulis":"Andi","tersedia":true},{"id":2,"judul":"Dasar Express.js","penulis":"Budi","tersedia":false}]}

2. GET /buku?tersedia=true
Perintah:
curl "http://localhost:3005/buku?tersedia=true"
Hasil:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>curl "http://localhost:3005/buku?tersedia=true"
{"success":true,"total":1,"data":[{"id":1,"judul":"Belajar Node.js","penulis":"Andi","tersedia":true}]}

3. GET /buku/1 (ditemukan)
Perintah:
curl http://localhost:3005/buku/1
Hasil:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>curl http://localhost:3005/buku/1
{"success":true,"data":{"id":1,"judul":"Belajar Node.js","penulis":"Andi","tersedia":true}}

4. GET /buku/99 (tidak ditemukan)
Perintah:
curl -i http://localhost:3005/buku/99
Hasil:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>curl -i http://localhost:3005/buku/99
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Content-Length: 50
ETag: W/"32-2kLOF8Jziq6AV3cHCrWWwt8Je2c"
Date: Fri, 09 Oct 2026 10:01:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Buku tidak ditemukan"}

5. POST /buku (berhasil)
Perintah:
curl -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "{\"judul\":\"Belajar React\",\"penulis\":\"Cici\"}"
Hasil:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>curl -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "{\"judul\":\"Belajar React\",\"penulis\":\"Cici\"}"
{"success":true,"message":"Buku berhasil ditambahkan","data":{"id":3,"judul":"Belajar React","penulis":"Cici","tersedia":true}}

6. POST /buku (validasi gagal)
Perintah:
curl -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "{\"judul\":\"Hanya Judul\"}"
Hasil:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>curl -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "{\"judul\":\"Hanya Judul\"}"
{"success":false,"message":"Field 'judul' dan 'penulis' wajib diisi"}

7. GET /siswa (endpoint tidak ada)
Perintah:
curl -i http://localhost:3005/siswa
Hasil:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>curl -i http://localhost:3005/siswa
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Content-Length: 65
ETag: W/"41-UARRMdM7rboOynMSPhVF3dGwBzc"
Date: Fri, 09 Oct 2026 10:02:15 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Endpoint GET /siswa tidak ditemukan"}

### Log Console Server
Saat seluruh endpoint diuji, console server menampilkan log berikut:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>node latihan.js
Latihan berjalan di http://localhost:3005
Uji: curl http://localhost:3005/buku?tersedia=true
[2026-10-09T10:00:12.367Z] GET /buku
[2026-10-09T10:00:29.654Z] GET /buku?tersedia=true
[2026-10-09T10:00:44.842Z] GET /buku/1
[2026-10-09T10:01:09.397Z] GET /buku/99
[2026-10-09T10:01:37.426Z] POST /buku
[2026-10-09T10:01:52.205Z] POST /buku
[2026-10-09T10:02:15.394Z] GET /siswa