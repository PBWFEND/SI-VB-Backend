# Latihan Individu — Pertemuan 3
## Modul, File, Environment, HTTP Server

Nama    : Aprilliana Fratiwi
NPM     : 240160221004
Kelas   : SI -VB

Latihan individu ini merupakan pengembangan dari kerangka `code/pertemuan-03/latihan.js` dengan menambahkan beberapa fitur: endpoint `/students`, environment variable `COURSE_CODE`, dan fungsi `bacaJSON`.

### Cara Menjalankan
Jalankan Server dengan Environment Variable
node server.js
Server akan berjalan di http://localhost:3003.

Perintah Pengujian
# 1. Endpoint root (tersedia)
curl -i http://localhost:3003/

# 2. Endpoint students (tersedia + baca JSON)
curl -i http://localhost:3003/students

# 3. Endpoint tidak tersedia (404)
curl -i http://localhost:3003/tidak-ada

# BUKTI PENGERJAAN

# Kondisi 1 — Endpoint Tersedia (GET /)
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>node server.js
API Pertemuan 3 berjalan di http://localhost:3003
Course Code: CPMK115

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>curl -i http://localhost:3003/
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Sun, 04 Oct 2026 16:03:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": true,
  "message": "Selamat datang di API Pertemuan 3",
  "courseCode": "CPMK115",
  "endpoints": [
    "GET /",
    "GET /students"
  ]
}

# Kondisi 2 — Endpoint Tersedia + Baca File (GET /students)
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>curl -i http://localhost:3003/students
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Sun, 04 Oct 2026 16:03:33 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": true,
  "courseCode": "CPMK115",
  "total": 3,
  "data": [
    {
      "id": 1,
      "nama": "Aprilliana Fratiwi",
      "nim": "241060221004"
    },
    {
      "id": 2,
      "nama": "Cinta Rahmia Yuliyanti",
      "nim": "240160221005"
    },
    {
      "id": 3,
      "nama": "Kikan Khairani",
      "nim": "240160221019"
    }
  ]
}

# Kondisi 3 — Endpoint Tidak Tersedia (404)
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>curl -i http://localhost:3003/tidak-ada
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Date: Sun, 04 Oct 2026 16:04:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
  "success": false,
  "message": "Endpoint GET /tidak-ada tidak ditemukan"
}

# Kondisi 4 — Environment Variable Diubah
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>curl -i http://localhost:3003/
HTTP/1.1 200 OK
{
  "success": true,
  "message": "Selamat datang di API Pertemuan 3",
  "courseCode": "CPMK999",
  "endpoints": ["GET /", "GET /students"]
}

# HASIL SERVER
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Latihan_Individu>node server.js
API Pertemuan 3 berjalan di http://localhost:3003
Course Code: CPMK115
[2026-10-04T16:03:14.160Z] GET /
[2026-10-04T16:03:33.067Z] GET /students
[2026-10-04T16:04:09.842Z] GET /tidak-ada