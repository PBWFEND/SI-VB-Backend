# Latihan Individu Pertemuan 3

Nama : Athiyya Salsabila Hermawan
npm : 240160221053
Kelas : SI-VB

# Hasil Pengujian
PS D:\240160221053\Pertemuan-3\Latihan> node Latihan.js                           
=== 1. Demo File System ===
Aplikasi: API Pertemuan 3
Environment: development
Port: 3003
Course Code: CPMK115
Endpoint: GET /, GET /health, GET /mahasiswa, GET /students
File hasil latihan dihapus setelah dibaca.

=== 2. Demo bacaJSON ===
Mencoba membaca 'data-mahasiswa.json'...
[ERROR] File "data-mahasiswa.json" tidak ditemukan.

Mencoba membaca 'file-tidak-ada.json'...
[ERROR] File "file-tidak-ada.json" tidak ditemukan.

=== Selesai ===
PS D:\240160221053\Pertemuan-3\Latihan> node Latihan.js
=== 1. Demo File System ===
Aplikasi: API Pertemuan 3
Environment: development
Port: 3003
Course Code: CPMK115
Endpoint: GET /, GET /health, GET /mahasiswa, GET /students
File hasil latihan dihapus setelah dibaca.

=== 2. Demo bacaJSON ===
Mencoba membaca 'DataMahasiswa.json'...
Berhasil membaca file:
[
  { id: 1, nama: 'Athiyya Salsabila Hermawan', nim: '240160221053' },
  { id: 2, nama: 'Aurora Safaira', nim: '240160221051' },
  { id: 3, nama: 'Rein Anandhi', nim: '240160221052' }
]

Mencoba membaca 'file-tidak-ada.json'...
[ERROR] File "file-tidak-ada.json" tidak ditemukan.

=== Selesai ===

PS D:\240160221053\Pertemuan-3\Latihan> curl.exe -i http://localhost:3003/
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Fri, 30 Oct 2026 06:25:34 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

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
PS D:\240160221053\Pertemuan-3\Latihan> curl.exe -i http://localhost:3003/student
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Date: Fri, 30 Oct 2026 06:25:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": false,
  "message": "Endpoint GET /student tidak ditemukan"
}
PS D:\240160221053\Pertemuan-3\Latihan> curl.exe -i http://localhost:3003/students
HTTP/1.1 500 Internal Server Error
Content-Type: application/json; charset=utf-8
Date: Fri, 30 Oct 2026 06:26:01 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": false,
  "message": "File data-mahasiswa.json tidak ditemukan."
}
PS D:\240160221053\Pertemuan-3\Latihan> curl.exe -i http://localhost:3003/students
HTTP/1.1 500 Internal Server Error
Content-Type: application/json; charset=utf-8
Date: Fri, 30 Oct 2026 06:27:06 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": false,
  "message": "File data-mahasiswa.json tidak ditemukan."
}
PS D:\240160221053\Pertemuan-3\Latihan> curl.exe -i http://localhost:3003/students
HTTP/1.1 500 Internal Server Error
Content-Type: application/json; charset=utf-8
Date: Fri, 30 Oct 2026 06:27:20 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": false,
  "message": "File data-mahasiswa.json tidak ditemukan."
}
PS D:\240160221053\Pertemuan-3\Latihan> curl.exe -i http://localhost:3003/students
HTTP/1.1 500 Internal Server Error
Content-Type: application/json; charset=utf-8
Date: Fri, 30 Oct 2026 06:28:13 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": false,
  "message": "File data-mahasiswa.json tidak ditemukan."
}
PS D:\240160221053\Pertemuan-3\Latihan> curl.exe -i http://localhost:3003/students
HTTP/1.1 500 Internal Server Error
Content-Type: application/json; charset=utf-8
Date: Fri, 30 Oct 2026 06:29:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": false,
  "message": "File data-mahasiswa.json tidak ditemukan."
}
PS D:\240160221053\Pertemuan-3\Latihan> node latihan.js                           
=== 1. Demo File System ===                                                   
Aplikasi: API Pertemuan 3                                         
Environment: development                                       
Port: 3003
Course Code: CPMK115
Endpoint: GET /, GET /health, GET /mahasiswa, GET /students
File hasil latihan dihapus setelah dibaca.

=== 2. Demo bacaJSON ===
Mencoba membaca 'DataMahasiswa.json'...
Berhasil membaca file:
[
  { id: 1, nama: 'Athiyya Salsabila Hermawan', nim: '240160221053' },
  { id: 2, nama: 'Aurora Safaira', nim: '240160221051' },
  { id: 3, nama: 'Rein Anandhi', nim: '240160221052' }
]

Mencoba membaca 'file-tidak-ada.json'...
[ERROR] File "file-tidak-ada.json" tidak ditemukan.

=== Selesai ===
PS D:\240160221053\Pertemuan-3\Latihan> curl.exe -i http://localhost:3003/students
HTTP/1.1 500 Internal Server Error
Content-Type: application/json; charset=utf-8
Date: Fri, 30 Oct 2026 06:38:29 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": false,
  "message": "File data-mahasiswa.json tidak ditemukan."
}
PS D:\240160221053\Pertemuan-3\Latihan> curl.exe -i http://localhost:3003/tidak-ada
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Date: Fri, 30 Oct 2026 06:40:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": false,
  "message": "Endpoint GET /tidak-ada tidak ditemukan"
}

# Uji 3 Kondisi
Endpoint yang tersedia pada aplikasi ini terdiri atas beberapa method dan path dengan fungsi masing-masing. Endpoint `GET /` berfungsi menampilkan pesan selamat datang, `courseCode`, dan daftar endpoint yang tersedia. Endpoint `GET /health` berfungsi menampilkan status server dengan `status: "up"` beserta versi Node.js yang sedang berjalan. Endpoint `GET /students` berfungsi mengembalikan `courseCode` dan data mahasiswa yang dibaca dari `DataMahasiswa.json`.

Selain endpoint yang tersedia, terdapat pula contoh request untuk menguji penanganan kesalahan. Endpoint `GET /tidak-ada` merupakan contoh request ke endpoint yang tidak tersedia dan digunakan untuk menguji respons `404 Not Found`. Sementara itu, `POST /students` merupakan contoh request dengan method yang tidak didukung dan juga digunakan untuk menguji respons `404`.