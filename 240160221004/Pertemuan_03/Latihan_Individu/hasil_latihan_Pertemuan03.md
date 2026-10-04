# LATIHAN INDIVIDU PERTEMUAN 3

Nama    : Aprilliana Fratiwi
NPM     : 240160221004
Kelas   : SI -VB

# MENJALANKAN LATIHAN.JS (POINT 3)

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Latihan_Individu>set COURSE_CODE=CPMK115 && node latihan.js
=== 1. Demo File System ===
Aplikasi: API Pertemuan 3
Environment: development
Port: 3003
Course Code: CPMK115
Endpoint: GET /, GET /health, GET /mahasiswa, GET /students
File hasil latihan dihapus setelah dibaca.

=== 2. Demo bacaJSON ===
Mencoba membaca 'data-mahasiswa.json'...
Berhasil membaca file:
[
  { id: 1, nama: 'Aprilliana Fratiwi', nim: '240160221004' },
  { id: 2, nama: 'Mahendra Putra', nim: '87654321' },
  { id: 3, nama: 'Rayn Wijaya', nim: '11223344' }
]

# MENJALANKAN LATIHAN.JS (POINT 4)

Mencoba membaca 'file-tidak-ada.json'...
[ERROR] File "file-tidak-ada.json" tidak ditemukan.

=== Selesai ===

# MENJALANKAN SERVER.JS (POINT 1)

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Latihan_Individu>set COURSE_CODE=CPMK115 && node server.js
API Pertemuan 3 berjalan di http://localhost:3003
Course Code: CPMK115

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Latihan_Individu>curl -i http://localhost:3003/
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Tue, 29 Sep 2026 10:40:27 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": true,
  "message": "Selamat datang di API Pertemuan 3",
  "courseCode": "CPMK115 ",
  "endpoints": [
    "GET /",
    "GET /health",
    "GET /students"
  ]
}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Latihan_Individu>curl -i http://localhost:3003/students
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Tue, 29 Sep 2026 10:41:13 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": true,
  "courseCode": "CPMK115 ",
  "data": [
    {
      "id": 1,
      "nama": "Aprilliana Fratiwi",
      "nim": "240160221004"
    },
    {
      "id": 2,
      "nama": "Mahendra Putra",
      "nim": "87654321"
    },
    {
      "id": 3,
      "nama": "Rayn Wijaya",
      "nim": "11223344"
    }
  ]
}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Latihan_Individu>curl -i http://localhost:3003/tidak-ada
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Date: Tue, 29 Sep 2026 10:42:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": false,
  "message": "Endpoint GET /tidak-ada tidak ditemukan"

# UJI ENVIRONMENT VARIABLE BERUBAH (POINT 2)

cmd terminal 1:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Latihan_Individu>set COURSE_CODE=ABC999 && node server.js
API Pertemuan 3 berjalan di http://localhost:3003
Course Code: ABC999
[2026-09-29T10:46:24.820Z] GET /

cmd terminal 2:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Latihan_Individu>curl -i http://localhost:3003/
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Tue, 29 Sep 2026 10:46:24 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": true,
  "message": "Selamat datang di API Pertemuan 3",
  "courseCode": "ABC999 ",
  "endpoints": [
    "GET /",
    "GET /health",
    "GET /students"
  ]
}

# UJI 3 KONDISI (POINT 5)

Pengujian dilakukan pada tiga kondisi: (1) mengakses endpoint yang tersedia (GET / dan GET /students) yang harus mengembalikan status 200 OK beserta data JSON, (2) mengakses endpoint yang tidak tersedia (GET /tidak-ada) yang harus mengembalikan status 404 Not Found, dan (3) mengubah environment variable COURSE_CODE saat menjalankan server untuk memastikan nilainya ikut berubah pada respons. Jika ketiga pengujian berhasil, aplikasi dinyatakan lolos latihan.
