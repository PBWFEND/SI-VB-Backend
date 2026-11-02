LATIHAN INDIVIDU PERTEMUAN 4

Nama: Resty Dewina Fitri
NPM: 240160221039
Kelas: SI-VB

Struktur Folder
240160221039_Pertemuan_04/ ├── latihan.js ├── package.json ├── package-lock.json ├── README.md └── node_modules/

Cara Menjalankan Buka CMD di folder proyek, lalu jalankan: npm install node latihan.js

Hasil pengujian curl

1. GET /buku Perintah: curl http://localhost:3005/buku Hasil:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-04\Latihan Individu
# curl http://localhost:3005/buku
{"success":true,"total":2,"data":[{"id":1,"judul":"Belajar Node.js","penulis":"Andi","tersedia":true},{"id":2,"judul":"Dasar Express.js","penulis":"Budi","tersedia":false}]}

2. GET /buku?tersedia=true Perintah: curl "http://localhost:3005/buku?tersedia=true" Hasil:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-04\Latihan Individu
# curl "http://localhost:3005/buku?tersedia=true"
{"success":true,"total":1,"data":[{"id":1,"judul":"Belajar Node.js","penulis":"Andi","tersedia":true}]}

3. GET /buku/1 (ditemukan) Perintah: curl http://localhost:3005/buku/1 Hasil:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-04\Latihan Individu
# curl http://localhost:3005/buku/1
{"success":true,"data":{"id":1,"judul":"Belajar Node.js","penulis":"Andi","tersedia":true}}

4. GET /buku/99 (tidak ditemukan) Perintah: curl -i http://localhost:3005/buku/99 Hasil:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-04\Latihan Individu
# curl -i http://localhost:3005/buku/99
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Content-Length: 50
ETag: W/"32-2kLOF8Jziq6AV3cHCrWWwt8Je2c"
Date: Fri, 30 Oct 2026 04:31:42 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Buku tidak ditemukan"}

5. POST /buku (berhasil) Perintah: curl -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "{"judul":"Belajar React","penulis":"Cici"}" Hasil:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-04\Latihan Individu
# curl -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "{\"judul\":\"Belajar React\",\"penulis\":\"Cici\"}"
{"success":true,"message":"Buku berhasil ditambahkan","data":{"id":3,"judul":"Belajar React","penulis":"Cici","tersedia":true}}

6. POST /buku (validasi gagal) Perintah: curl -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "{"judul":"Hanya Judul"}" Hasil:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-04\Latihan Individu
# curl -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "{\"judul\":\"Hanya Judul\"}"
{"success":false,"message":"Field 'judul' dan 'penulis' wajib diisi"}

7. GET /siswa (endpoint tidak ada) Perintah: curl -i http://localhost:3005/siswa Hasil:
# curl -i http://localhost:3005/siswa
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Content-Length: 65
ETag: W/"41-UARRMdM7rboOynMSPhVF3dGwBzc"
Date: Fri, 30 Oct 2026 04:47:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Endpoint GET /siswa tidak ditemukan"}