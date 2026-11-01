# Tugas 4 — REST API Laboratorium (Express.js + Prisma ORM)

Nama    : Cinta Rahmia Yulianti
NPM     : 240160221005
Kelas   : SI-VB

Pengembangan resource Laboratorium dari Tugas 3 (Express.js in-memory)
menjadi REST API dengan database SQLite melalui Prisma ORM.


## Cara Install

```bash
# 1. Inisialisasi project Node.js
npm init -y

# 2. Install Express
npm install express

# 3. Install Prisma CLI (dev dependency)
npm install prisma --save-dev

# 4. Install Prisma Client (runtime dependency)
npm install @prisma/client

# 5. Inisialisasi Prisma — membuat folder prisma/ + .env
npx prisma init --datasource-provider sqlite

# 6. Cek versi
npx prisma -v
```

## MIGRATION

# 1) Buat & terapkan migration baru
npx prisma migrate dev --name init

# 2) Generate Prisma Client setelah schema berubah
npx prisma generate

# 3) Jalankan seed data
npx prisma db seed

# 4) Buka database visual
npx prisma studio

## Daftar Endpoint

| Method | Endpoint                  | Keterangan                         | Sukses | Error |
|--------|---------------------------|------------------------------------|--------|-------|
| GET    | `/api/laboratorium`       | Collection + filter + sort         | 200    | 500   |
| GET    | `/api/laboratorium/:id`   | Detail satu data                   | 200    | 404   |
| POST   | `/api/laboratorium`       | Create + validasi                  | 201    | 400   |
| PUT    | `/api/laboratorium/:id`   | Update penuh                       | 200    | 400 / 404 |
| PATCH  | `/api/laboratorium/:id`   | Update sebagian                    | 200    | 400 / 404 |
| DELETE | `/api/laboratorium/:id`   | Hapus data                         | 204    | 404   |

---

## CONTOH REQUEST, STATUS CODE dan HASIL PENGUJIAN
# 1) GET Collection
perintah :
curl.exe -s http://localhost:3000/api/laboratorium

hasil:
{
  "success": true,
  "message": "Daftar laboratorium berhasil diambil",
  "data": [
    {
      "id": 1,
      "nama": "Lab Rekayasa Perangkat Lunak",
      "kapasitas": 40,
      "lokasi": "Gedung A Lantai 2",
      "status": "tersedia",
      "createdAt": "2026-11-01T03:20:58.129Z",
      "updatedAt": "2026-11-01T03:20:58.129Z"
    },
    {
      "id": 2,
      "nama": "Lab Jaringan Komputer",
      "kapasitas": 30,
      "lokasi": "Gedung B Lantai 1",
      "status": "tersedia",
      "createdAt": "2026-11-01T03:20:58.129Z",
      "updatedAt": "2026-11-01T03:20:58.129Z"
    },
    {
      "id": 3,
      "nama": "Lab Multimedia",
      "kapasitas": 25,
      "lokasi": "Gedung C Lantai 3",
      "status": "perbaikan",
      "createdAt": "2026-11-01T03:20:58.129Z",
      "updatedAt": "2026-11-01T03:20:58.129Z"
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

status code: 200 OK

# 2) GET dengan Filter
perintah:
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
      "status": "tersedia",
      "createdAt": "2026-11-01T03:20:58.129Z",
      "updatedAt": "2026-11-01T03:20:58.129Z"
    },
    {
      "id": 2,
      "nama": "Lab Jaringan Komputer",
      "kapasitas": 30,
      "lokasi": "Gedung B Lantai 1",
      "status": "tersedia",
      "createdAt": "2026-11-01T03:20:58.129Z",
      "updatedAt": "2026-11-01T03:20:58.129Z"
    }
  ],
  "meta": {
    "total": 2,
    "filter": {
      "status": "tersedia",
      "minKapasitas": "30",
      "search": null
    },
    "sort": {
      "sortBy": "kapasitas",
      "order": "desc"
    }
  }
}

status code: 200 OK

# 3) GET Detail
perintah:
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
    "status": "tersedia",
    "createdAt": "2026-11-01T03:20:58.129Z",
    "updatedAt": "2026-11-01T03:20:58.129Z"
  }
}
status code: 200 OK

# 4) POST Create
perintah:
Invoke-RestMethod -Uri http://localhost:3000/api/laboratorium `
>>   -Method POST `
>>   -ContentType "application/json" `
>>   -Body '{"nama":"Lab Kecerdasan Buatan","kapasitas":35,"lokasi":"Gedung D Lantai 4"}'

``` Dibantu oleh deepseek karena error terus```

hasil : {
    "success":  true,
    "message":  "Laboratorium berhasil dibuat",
    "data":  {
                 "id":  5,
                 "nama":  "Lab Kecerdasan Buatan",
                 "kapasitas":  35,
                 "lokasi":  "Gedung D Lantai 4",
                 "status":  "tersedia",
                 "createdAt":  "2026-11-01T04:45:45.341Z",
                 "updatedAt":  "2026-11-01T04:45:45.341Z"
             }
}

status code: 201 Created

# 5) PATCH Partial Update
perintah:
$body = '{"status":"perbaikan"}'
Invoke-RestMethod -Uri http://localhost:3000/api/laboratorium/4 `
  -Method PATCH `
  -ContentType "application/json" `
  -Body $body | ConvertTo-Json -Depth 5

``` Dibantu oleh deepseek karena error terus```
hasil :{
    "success":  true,
    "message":  "Laboratorium berhasil diperbarui sebagian",
    "data":  {
                 "id":  4,
                 "nama":  "Lab Kecerdasan Buatan",
                 "kapasitas":  35,
                 "lokasi":  "Gedung D Lantai 4",
                 "status":  "perbaikan",
                 "createdAt":  "2026-11-01T04:45:01.435Z",
                 "updatedAt":  "2026-11-01T04:49:14.601Z"
             }
}

status code: 200 OK

# 6) DELETE
perintah:
curl.exe -s -i -X DELETE http://localhost:3000/api/laboratorium/4

hasil :
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Sun, 01 Nov 2026 04:50:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5

status code: 204 No Content
