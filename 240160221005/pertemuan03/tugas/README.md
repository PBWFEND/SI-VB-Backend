# Tugas 2: Node.js HTTP Server Sederhana

Nama    : Cinta Rahmia Yulianti
NPM     : 240160221005
Kelas   : SI-VB

# Simple HTTP Server (Tanpa Express.js)

Project Node.js murni menggunakan modul `node:http` untuk membuat HTTP server sederhana.

## Struktur File

simple-http-server/
├── src/
│   ├── config.mjs
│   ├── helpers.mjs
│   ├── data-store.mjs
│   └── server.mjs
├── data/
│   └── students.json
├── README.md
└── package.json


## Cara Menjalankan

default: 
npm start


## Contoh Pengujian dengan curl

# 1) Endpoint tersedia — 200 OK
curl.exe -i http://localhost:3003/
perintah:
--dibantu deepseek karena tidak bisa berjalan--
$env:COURSE_CODE="IF6701"; $env:PORT="3003"; npm start

perintah dijalankannya : curl.exe -i http://localhost:3003/

hasil :
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 137
X-Powered-By: Node.js-Native
Date: Fri, 09 Oct 2026 05:06:54 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "success": true,
  "message": "Selamat datang di Simple HTTP Server",
  "environment": "development",
  "courseCode": "DEFAULT-000"
}

curl.exe -i http://localhost:3003/students
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 245
X-Powered-By: Node.js-Native
Date: Fri, 09 Oct 2026 05:13:04 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": 1,
      "name": "Krating Khunnarong",
      "major": "Informatika"
    },
    {
      "id": 2,
      "name": "Cinta Rahmia Yulianti",
      "major": "Sistem Informasi"
    }
  ]
}

# 2) Endpoint tidak tersedia — 404 Not Found
curl.exe -i http://localhost:3003/tidak-ada
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Content-Length: 112
X-Powered-By: Node.js-Native
Date: Fri, 09 Oct 2026 05:14:01 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "success": false,
  "error": {
    "code": 404,
    "message": "Endpoint '/tidak-ada' tidak ditemukan"
  }
}


# 3) Bukti Pengujian
menjalankan server:
PS C:\Users\USER\Desktop\240160221005_Cinta\240160221005\pertemuan03\tugas> npm run start
Debugger attached.

Pengujian endpoint GET/
PS C:\Users\USER\Desktop\240160221005_Cinta\240160221005\pertemuan03\tugas> curl.exe -i http://localhost:3003/


Pengujian endpoint GET /students
PS C:\Users\USER\Desktop\240160221005_Cinta\240160221005\pertemuan03\tugas> curl.exe -i http://localhost:3003/students

pengujian endpoint GET /tidak-ada
PS C:\Users\USER\Desktop\240160221005_Cinta\240160221005\pertemuan03\tugas> curl.exe -i http://localhost:3003/tidak-ada

Pengujian Perubahan COURSE_CODE (IF6702)
PS C:\Users\USER\Desktop\240160221005_Cinta\240160221005\pertemuan03\tugas>  $env:COURSE_CODE="IF6702"; $env:PORT="3003"; npm start


| No | Skenario                          | Endpoint         | Status Diharapkan | Status Aktual   | Hasil    |
|:--:|-----------------------------------|------------------|:-----------------:|:---------------:|:--------:|
| 1  | Akses endpoint tersedia           | `GET /`          | 200 OK            | 200 OK          | ✅ Lolos |
| 2  | Akses endpoint tersedia           | `GET /students`  | 200 OK            | 200 OK          | ✅ Lolos |
| 3  | Akses endpoint tersedia (bonus)   | `GET /config`    | 200 OK            | 200 OK          | ✅ Lolos |
| 4  | Akses endpoint tidak tersedia     | `GET /tidak-ada` | 404 Not Found     | 404 Not Found   | ✅ Lolos |
| 5  | Ubah `COURSE_CODE` → respons ubah | `GET /`          | courseCode baru   | `IF6702`        | ✅ Lolos |

**Kesimpulan:** Seluruh 5 skenario pengujian berhasil. Aplikasi dinyatakan **LOLOS** latihan.