# LATIHAN INDIVIDU PERTEMUAN 3

Nama    : Cinta Rahmia Yulianti
NPM     : 240160221005
Kelas   : SI-VB

# Menjalankan Latihan.JS (Point 3)

PS C:\Users\USER\Desktop\240160221005_Cinta\240160221005\pertemuan03\latihan>  node server.js
API Pertemuan 3 berjalan di http://localhost:3003
Endpoint : GET /, GET /health, GET /mahasiswa, GET /student

1. Demo file
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

2. demo baca JSON
--ditambahkan file data-mahasiswa.json dan perintah menggunakan curl.exe karena tidak muncul dan di bantu deepseek--
perintah : curl.exe -i http://localhost:3003/students

{
  "success": true,
  "courseCode": "CPMK115",
  "data": [
    {
      "id": 1,
      "nama": "Cinta Rahmia Yulianti",
      "nim": "240160221005"
    },
    {
      "id": 2,
      "nama": "Siti Aminah",
      "nim": "87654321"
    },
    {
      "id": 3,
      "nama": "Andi Wijaya",
      "nim": "11223344"
    }
  ]
}


# Menjanlankan Latihan point 4
perintah : curl.exe -i http://localhost:3003/tidak-ada
{
  "success": false,
  "message": "Endpoint GET /tidak-ada tidak ditemukan"
}

# Menjalankan Latihan point 1
 PS C:\Users\USER\Desktop\240160221005_Cinta\240160221005\pertemuan03\latihan>node server.js
API Pertemuan 3 berjalan di http://localhost:3003
Course Code: CPMK115
[2026-10-09T04:11:18.007Z] GET /
[2026-10-09T04:26:08.716Z] GET /
[2026-10-09T04:26:40.882Z] GET /students
[2026-10-09T04:31:53.736Z] GET /tidak-ada


# Uji enviroment variabel berubah
perintah: 
 PS C:\Users\USER\Desktop\240160221005_Cinta\240160221005\pertemuan03\latihan>curl.exe http://localhost:3003/
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

hasilnya : [2026-10-09T04:41:41.350Z] GET /


# Uji 3 Kondisi 
Pengujian dijalankan dalam tiga skenario. Pertama, mengakses endpoint yang tersedia (GET / dan GET /students), yang diharapkan memberikan respons status 200 OK disertai data dalam format JSON. Kedua, mengakses endpoint yang tidak terdaftar (GET /tidak-ada), yang seharusnya menghasilkan status 404 Not Found. Ketiga, mengubah environment variable COURSE_CODE pada saat server dijalankan, guna memverifikasi bahwa nilai tersebut turut berubah di dalam respons. Apabila seluruh skenario pengujian ini berhasil, maka aplikasi dinyatakan lulus latihan.