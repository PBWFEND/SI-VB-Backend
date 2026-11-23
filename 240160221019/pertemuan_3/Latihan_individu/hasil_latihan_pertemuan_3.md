# LATIHAN INDIVIDU PERTEMUAN 3
Nama    : Kikan Khairani
NPM     : 240160221019
Kelas   : SI-5B

# MENJALANKAN LATIHAN.JS (POINT 3)

PS C:\Users\Hp\Documents\prak-backend\pertemuan_3\Latihan_individu> $env:COURSE_CODE="CPMK115"; node latihan.js
=== 1. Demo File System ===
Aplikasi: API Pertemuan 3
Environment: development
Port: 3003
Course Code: CPMK115
Endpoint: GET /, GET /health, GET /mahasiswa, GET /students
File hasil latihan dihapus setelah dibaca.

=== 2. Demo bacaJSON ===
Mencoba membaca 'data_mahasiswa.json'...
Berhasil membaca file:
[
  { id: 1, nama: 'Budi Santoso', nim: '12345678' },
  { id: 2, nama: 'Siti Aminah', nim: '87654321' },
  { id: 3, nama: 'Andi Wijaya', nim: '11223344' }
]


# MENJALANKAN LATIHAN.JS (POINT 4)

Mencoba membaca 'file-tidak-ada.json'...
[ERROR] File "file-tidak-ada.json" tidak ditemukan.

=== Selesai ===


# MENJALANKAN SERVER.JS (POINT 1)

PS C:\Users\Hp\Documents\prak-backend\pertemuan_3\Latihan_individu> $env:COURSE_CODE="CPMK115"; node server.js
API Pertemuan 3 berjalan di http://localhost:3003
Course Code: CPMK115
[2026-10-09T06:02:25.818Z] GET /
[2026-10-09T06:02:49.899Z] GET /students
[2026-10-09T06:03:21.042Z] GET /tidak-ada

(Buka terminal baru, jalankan perintah uji)
PS C:\Users\Hp\Documents\prak-backend\Pertemuan_3\Latihan_Individu> curl.exe -i http://localhost:3003/students
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Fri, 09 Oct 2026 06:02:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": true,
  "courseCode": "CPMK115",
  "data": [
    { "id": 1, "nama": "Budi Santoso", "nim": "12345678" },
    { "id": 2, "nama": "Siti Aminah", "nim": "87654321" },
    { "id": 3, "nama": "Andi Wijaya", "nim": "11223344" }
  ]
}


# UJI ENVIRONMENT VARIABLE BERUBAH (POINT 2)

(Matikan server dengan Ctrl+C, lalu jalankan ulang dengan nilai berbeda)
PS C:\Users\Hp\Documents\prak-backend\pertemuan_3\Latihan_individu> $env:COURSE_CODE="ABC999"; node server.js
API Pertemuan 3 berjalan di http://localhost:3003
Course Code: ABC999
[2026-10-09T06:07:08.347Z] GET /

(Buka terminal baru, uji endpoint root)
PS C:\Users\Hp\Documents\prak-backend\Pertemuan_3\Latihan_Individu> curl.exe -i http://localhost:3003/
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Fri, 09 Oct 2026 06:07:08 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": true,
  "message": "Selamat datang di API Pertemuan 3",
  "courseCode": "ABC999",
  "endpoints": [
    "GET /",
    "GET /health",
    "GET /students"
  ]
}


# UJI 3 KONDISI (POINT 5)

Pengujian dilakukan pada tiga kondisi: (1) mengakses endpoint yang tersedia (`GET /` dan `GET /students`) yang harus mengembalikan status `200 OK` beserta data JSON, (2) mengakses endpoint yang tidak tersedia (`GET /tidak-ada`) yang harus mengembalikan status `404 Not Found`, dan (3) mengubah environment variable `COURSE_CODE` saat menjalankan server untuk memastikan nilainya ikut berubah pada respons. Jika ketiga pengujian berhasil, aplikasi dinyatakan lolos latihan.

# 1. Endpoint Tersedia (GET /)
PS C:\Users\Hp\Documents\prak-backend\Pertemuan_3\Latihan_Individu> curl.exe -i http://localhost:3003/
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "success": true,
  "message": "Selamat datang di API Pertemuan 3",
  "courseCode": "CPMK115",
  "endpoints": [
    "GET /",
    "GET /health",
    "GET /students"
  ]
}

# 2. Endpoint Tersedia (GET /students)
PS C:\Users\Hp\Documents\prak-backend\Pertemuan_3\Latihan_Individu> curl.exe -i http://localhost:3003/students
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "success": true,
  "courseCode": "CPMK115",
  "data": [
    { "id": 1, "nama": "Budi Santoso", "nim": "12345678" },
    { "id": 2, "nama": "Siti Aminah", "nim": "87654321" },
    { "id": 3, "nama": "Andi Wijaya", "nim": "11223344" }
  ]
}

# 3. Endpoint Tidak Tersedia (GET /tidak-ada)
PS C:\Users\Hp\Documents\prak-backend\Pertemuan_3\Latihan_Individu> curl.exe -i http://localhost:3003/tidak-ada
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{
  "success": false,
  "message": "Endpoint GET /tidak-ada tidak ditemukan"
}