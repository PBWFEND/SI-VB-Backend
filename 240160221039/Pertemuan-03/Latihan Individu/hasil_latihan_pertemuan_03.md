LATIHAN INDIVIDU PERTEMUAN 3
Nama: Resty Dewina Fitri
NPM: 240160221039
Kelas: SI-VB

MENJALANKAN LATIHAN.JS (POINT 3)
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-03\Latihan Individu
# set COURSE_CODE=CPMK115 && node latihan.js
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
  { id: 1, nama: 'Resty Dewina Fitri', nim: '240160221039' },
  { id: 2, nama: 'Iqbal Fadilah', nim: '87654321' },
  { id: 3, nama: 'Rayn Wijaya', nim: '11223344' }
]

MENJALANKAN LATIHAN.JS (POINT 4)
Mencoba membaca 'file-tidak-ada.json'...
[ERROR] File "file-tidak-ada.json" tidak ditemukan.

=== Selesai ===

MENJALANKAN SERVER.JS (POINT 1)
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-03\Latihan Individu
# set COURSE_CODE=CPMK115 && node server.js
API Pertemuan 3 berjalan di http://localhost:3003
Course Code: CPMK115
[2026-10-29T06:32:18.111Z] GET /
[2026-10-29T06:32:49.782Z] GET /students
[2026-10-29T06:33:23.373Z] GET /tidak-

UJI ENVIRONMENT VARIABLE BERUBAH (POINT 2)
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-03\Latihan Individu
# curl -i http://localhost:3003/
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Thu, 29 Oct 2026 06:32:18 GMT
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
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-03\Latihan Individu
# curl -i http://localhost:3003/students
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Thu, 29 Oct 2026 06:32:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": true,
  "courseCode": "CPMK115 ",
  "data": [
    {
      "id": 1,
      "nama": "Resty Dewina Fitri",
      "nim": "240160221039"
    },
    {
      "id": 2,
      "nama": "Iqbal Fadilah",
      "nim": "87654321"
    },
    {
      "id": 3,
      "nama": "Rayn Wijaya",
      "nim": "11223344"
    }
  ]
}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-03\Latihan Individu
# curl -i http://localhost:3003/tidak-ada
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Date: Thu, 29 Oct 2026 06:33:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": false,
  "message": "Endpoint GET /tidak-ada tidak ditemukan"
}

UJI 3 KONDISI (POINT 5)
Pengujian dilakukan pada tiga kondisi: (1) mengakses endpoint yang tersedia (GET / dan GET /students) yang harus mengembalikan status 200 OK beserta data JSON, (2) mengakses endpoint yang tidak tersedia (GET /tidak-ada) yang harus mengembalikan status 404 Not Found, dan (3) mengubah environment variable COURSE_CODE saat menjalankan server untuk memastikan nilainya ikut berubah pada respons. Jika ketiga pengujian berhasil, aplikasi dinyatakan lolos latihan.