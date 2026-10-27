# Tugas 2 — RESTful API Express.js: Resource Laboratorium

Nama    : Cinta Rahmia Yulianti
NPM     : 240160221005
Kelas   : SI-VB

Pengembangan resource Laboratorium dari `Service.js` (Tugas 2) menjadi
RESTful API menggunakan Express.js.

## Cara Menjalankan

```bash
# 1. Masuk ke folder project
cd tugas

# 2. Install dependency
npm install

# 3. Jalankan server
npm start

# atau, mode auto-reload
npm run dev

# 4. Server berjalan di
  http://localhost:3000

```

#  DAFTAR ENDPOINT
--dibantu merapihkannya oleh deepseek--
| No | Method | Endpoint                | Kategori       | Deskripsi                                  |
|:--:|:-------|:------------------------|:---------------|:-------------------------------------------|
| 1  | GET    | `/`                     | Root           | Info API + daftar endpoint                 |
| 2  | GET    | `/api/laboratorium`     | Collection     | Ambil semua laboratorium (+ filter & sort) |
| 3  | GET    | `/api/laboratorium/:id` | Detail         | Ambil satu laboratorium berdasarkan id     |
| 4  | POST   | `/api/laboratorium`     | Create         | Tambah laboratorium baru                   |
| 5  | PUT    | `/api/laboratorium/:id` | Update (full)  | Ganti seluruh data laboratorium            |
| 6  | PATCH  | `/api/laboratorium/:id` | Partial Update | Ubah sebagian field laboratorium           |
| 7  | DELETE | `/api/laboratorium/:id` | Delete         | Hapus laboratorium (204, tanpa body)       |


# HASIL PENGUJIAN

# 1) GET semua 

perintah :
curl.exe -s http://localhost:3000/api/laboratorium

hasil :
{
  "success": true,
  "message": "Daftar laboratorium berhasil diambil",
  "data": [
    {
      "id": 1,
      "nama": "Lab Rekayasa Perangkat Lunak",
      "kapasitas": 40,
      "lokasi": "Gedung A Lantai 2",
      "status": "tersedia"
    },
    {
      "id": 2,
      "nama": "Lab Jaringan Komputer",
      "kapasitas": 30,
      "lokasi": "Gedung B Lantai 1",
      "status": "tersedia"
    },
    {
      "id": 3,
      "nama": "Lab Multimedia",
      "kapasitas": 25,
      "lokasi": "Gedung C Lantai 3",
      "status": "perbaikan"
    }
  ],
  "meta": {
    "total": 3,
    "filter": {
      "status": null,
      "minKapasitas": null,
      "search": null
    },
    "sort": {
      "sortBy": "id",
      "order": "asc"
    }
  }
}

response :200 OK

# 2) GET dengan filter (query param)
perintah :
curl.exe -s "http://localhost:3000/api/laboratorium?status=tersedia&minKapasitas=30&sortBy=kapasitas&order=desc"

hasil :
{
  "success": true,
  "message": "Daftar laboratorium berhasil diambil",
  "data": [
    {
      "id": 1,
      "nama": "Lab Rekayasa Perangkat Lunak",
      "kapasitas": 40,
      "lokasi": "Gedung A Lantai 2",
      "status": "tersedia"
    },
    {
      "id": 2,
      "nama": "Lab Jaringan Komputer",
      "kapasitas": 30,
      "lokasi": "Gedung B Lantai 1",
      "status": "tersedia"
    }
  ],
  "meta": {
    "total": 2,
    "filter": {
      "status": "tersedia",
      "minKapasitas": 30,
      "search": null
    },
    "sort": {
      "sortBy": "kapasitas",
      "order": "desc"
    }
  }
}

response : 200 OK


# 3) GET search
perintah :
curl.exe -s "http://localhost:3000/api/laboratorium?search=multimedia"

hasil :
{
  "success": true,
  "message": "Daftar laboratorium berhasil diambil",
  "data": [
    {
      "id": 3,
      "nama": "Lab Multimedia",
      "kapasitas": 25,
      "lokasi": "Gedung C Lantai 3",
      "status": "perbaikan"
    }
  ],
  "meta": {
    "total": 1,
    "filter": {
      "status": null,
      "minKapasitas": null,
      "search": "multimedia"
    },
    "sort": {
      "sortBy": "id",
      "order": "asc"
    }
  }
}

response : 200 OK


# 4) GET detail
perintah : 
curl.exe -s http://localhost:3000/api/laboratorium/1

hasil :
{
  "success": true,
  "message": "Detail laboratorium",
  "data": {
    "id": 1,
    "nama": "Lab Rekayasa Perangkat Lunak",
    "kapasitas": 40,
    "lokasi": "Gedung A Lantai 2",
    "status": "tersedia"
  }
}

response : 200 OK


# 5) GET 404 (id tidak ada)
perintah :
curl.exe -s http://localhost:3000/api/laboratorium/999

hasil :
{"success":false,"message":"Laboratorium dengan id 999 tidak ditemukan","errors":null}

response : 400 Bad Request


# 6) GET 400 (id bukan angka)
perintah :
curl -s http://localhost:3000/api/laboratorium/abc

hasil :
{
  "success": false,
  "message": "Parameter id tidak valid",
  "errors": [
    {
      "field": "id",
      "message": "id harus bilangan bulat positif"
    }
  ]
}

response : 400 Bad Request


# 7) POST create (valid)
perintah :
curl.exe -s -X POST http://localhost:3000/api/laboratorium --% -H "Content-Type: application/json" -d "{\"nama\":\"Lab Kecerdasan Buatan\",\"kapasitas\":35,\"lokasi\":\"Gedung D Lantai 4\"}"

hasil :
{
  "success": true,
  "message": "Laboratorium berhasil dibuat",
  "data": {
    "id": 4,
    "nama": "Lab Kecerdasan Buatan",
    "kapasitas": 35,
    "lokasi": "Gedung D Lantai 4",
    "status": "tersedia"
  }
}

response : 201 Created


# 8) POST create (invalid - 400)
perintah :
curl -s -X POST http://localhost:3000/api/laboratorium \
  -H "Content-Type: application/json" \
  -d '{"nama":"ab","kapasitas":-5,"lokasi":""}'

hasil : Validasi input gagal


response : 400 Bad Request


# 9) PUT update (full replace)
perintah :
Set-Content -Path body.json -Value '{"nama":"Lab Rekayasa Perangkat Lunak","kapasitas":40,"lokasi":"Gedung A Lantai 2","status":"digunakan"}' -Encoding utf8

dan cek menggunakan perintah:
curl.exe -s -X PUT http://localhost:3000/api/laboratorium/1 -H "Content-Type: application/json" -d "@body.json"

hasil :
{
  "success": true,
  "message": "Laboratorium berhasil diperbarui",
  "data": {
    "id": 1,
    "nama": "Lab Rekayasa Perangkat Lunak",
    "kapasitas": 40,
    "lokasi": "Gedung A Lantai 2",
    "status": "digunakan"
  }
}

response : 200 OK


# 10) PATCH partial update
perintah :
Set-Content -Path body.json -Value '{"status":"perbaikan"}' -Encoding utf8
>> curl.exe -s -X PATCH http://localhost:3000/api/laboratorium/1 -H "Content-Type: application/json" -d "@body.json"

hasil :
{
  "success": true,
  "message": "Laboratorium berhasil diperbarui sebagian",
  "data": {
    "id": 1,
    "nama": "Lab Rekayasa Perangkat Lunak",
    "kapasitas": 40,
    "lokasi": "Gedung A Lantai 2",
    "status": "perbaikan"
  }
}

response : 200 OK


# 11) DELETE (204 tanpa body)
perintah :
curl.exe -s -i -X DELETE http://localhost:3000/api/laboratorium/2

hasil : data terhapus

response : HTTP/1.1 204 No Content

