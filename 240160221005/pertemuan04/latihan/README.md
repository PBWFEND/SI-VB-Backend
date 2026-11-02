# LATIHAN INDIVIDU PERTEMUAN 4

Nama    : Cinta Rahmia Yulianti
NPM     : 240160221005
Kelas   : SI-VB

Latihan penerapan routing, query parameter, route parameter, middleware, validasi body, dan handler 404 menggunakan Express.js.

# Struktur Folder
pertemuan04/
└── latihan/
├── latihan.js
├── package.json
├── package-lock.json
├── node_modules/
└── README.md


# Cara Menjalankannya 
perintah: 
node latihan.js

sevelum menjalankan perintah di atas  Inisialisasi project & install dependency menggunakan perintah :
npm init -y
npm install express

hasil: 
Latihan berjalan di http://localhost:3005
Uji: curl http://localhost:3005/buku?tersedia=true

## Daftar Endpoint

| No. | Method | Endpoint | Keterangan | Status Sukses |
|:---:|:---:|---|---|:---:|
| 1 | GET | `/buku` | Mengambil semua data buku | `200 OK` |
| 2 | GET | `/buku?tersedia=true` | Menampilkan buku yang tersedia | `200 OK` |
| 3 | GET | `/buku?tersedia=false` | Menampilkan buku yang tidak tersedia | `200 OK` |
| 4 | GET | `/buku/:id` | Mengambil detail buku berdasarkan ID | `200 OK` |
| 5 | POST | `/buku` | Menambahkan data buku baru | `201 Created` |
| 6 | Semua method (`*`) | Endpoint lainnya | Menangani permintaan ke endpoint yang tidak ditemukan | `404 Not Found` |

## Hasil Pengujian

# 1) GET Semua Buku
Perintah:
curl.exe http://localhost:3005/buku atau curl.exe -s http://localhost:3005/buku | ConvertFrom-Json | ConvertTo-Json -Depth 10 --agar lebih rapih hasilnya--

Hasil:
{
    "success":  true,
    "total":  3,
    "data":  [
                 {
                     "id":  1,
                     "judul":  "Belajar Node.js",
                     "penulis":  "Andi",
                     "tersedia":  true
                 },
                 {
                     "id":  2,
                     "judul":  "Dasar Express.js",
                     "penulis":  "Budi",
                     "tersedia":  false
                 },
                 {
                     "id":  3,
                     "judul":  "REST API Modern",
                     "penulis":  "Citra",
                     "tersedia":  true
                 }
             ]
}

# 2) GET filter ?tersedia=true
perintah : 
curl.exe -s "http://localhost:3005/buku?tersedia=true" 

hasil:
{
    "success":  true,
    "total":  2,
    "data":  [
                 {
                     "id":  1,
                     "judul":  "Belajar Node.js",
                     "penulis":  "Andi",
                     "tersedia":  true
                 },
                 {
                     "id":  3,
                     "judul":  "REST API Modern",
                     "penulis":  "Citra",
                     "tersedia":  true
                 }
             ]
}

# 3) GET filter ?tersedia=false
perintah : curl.exe "http://localhost:3005/buku?tersedia=false"

hasilnya: {
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 2,
      "judul": "Dasar Express.js",
      "penulis": "Budi",
      "tersedia": false
    }
  ]
}

# 4) GET /buku/:id  — data ditemukan
perintah :
curl http://localhost:3005/buku/1

hasil: 
StatusCode        : 200
StatusDescription : OK
Content           : {
                    "success": true,
                    "data": {
                        "id": 1,
                        "judul": "Belajar Node.js",
                        "penulis": "Andi",
                        "tersedia": true
                    }
                }

# 5) GET /buku/:id  — data tidak ditemukan
perintah :
curl -i http://localhost:3005/buku/99

hasil: 
data tidak di temukan

# 6) POST /buku — tambah buku (sukses)
perintah:$body = @{
    judul    = "Clean Code"
    penulis  = "Cinta Rahmia Yulianti"
    tersedia = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3005/buku" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body

hasil:
True Buku berhasil ditambahkan

Cek apakah data sudah di tambah 
Perintah :
(Invoke-RestMethod "http://localhost:3005/buku?tersedia=true").data |
    Format-Table -AutoSize -Wrap

Hasil :

id judul           penulis               tersedia
-- -----           -------               --------
 1 Belajar Node.js Andi                      True
 3 REST API Modern Citra                     True
 4 Clean Code      Cinta Rahmia Yulianti     True


# 7) POST /buku — field wajib kosong
--perintah di bantu oleh deepseek karena error--
perintah :
url.exe -i -X POST http://localhost:3005/buku `
>>   -H "Content-Type: application/json" `
>>   -d '{"judul":"Buku Tanpa Penulis"}'

hasil :
HTTP/1.1 400 Bad Request

# 8) Endpoint tidak dikenal — handler 404
perintah : 
curl.exe -i http://localhost:3005/endpoint-ngawur

hasil :
HTTP/1.1 404 Not Found

## 🪵 Middleware Logger
--beberapa ada yang dihapus karena error--
[2026-10-09T07:34:05.761Z] GET /buku
[2026-10-09T07:34:08.114Z] GET /buku
[2026-10-09T07:41:20.366Z] GET /buku
[2026-10-09T07:43:44.827Z] GET /buku
[2026-10-09T07:44:33.072Z] GET /buku
[2026-10-09T07:51:30.668Z] GET /buku?tersedia=true
[2026-10-09T07:54:53.968Z] GET /buku?tersedia=true
[2026-10-09T07:56:31.915Z] GET /buku?tersedia=true
[2026-10-09T07:57:34.793Z] GET /buku?tersedia=false
[2026-10-09T08:02:05.440Z] GET /buku/1
[2026-10-09T08:08:08.871Z] POST /buku
[2026-10-09T08:09:31.092Z] GET /buku?tersedia=true
[2026-10-09T08:11:38.468Z] GET /buku?tersedia=true
[2026-10-09T08:12:51.137Z] GET /buku?tersedia=true
[2026-10-09T08:13:43.687Z] POST /buku
[2026-10-09T08:16:51.112Z] POST /buku
[2026-10-09T08:20:17.235Z] GET /endpoint-ngawur
