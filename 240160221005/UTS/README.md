# Mini Project UTS — REST API Laboratorium

Nama    : Cinta Rahmia Yulianti
NPM     : 240160221005
Kelas   : SI-VB

Backend REST API dengan pola route → controller → service → Prisma.
Domain: Laboratorium · Database: SQLite · Runtime: TypeScript/Node.js.

## PRASYARAT
| Tool    | Versi minimum | Cek             |
| :------ | :------------ | :-------------- |
| Node.js | 18            | `node -v`       |
| npm     | 9             | `npm -v`        |
| Git     | —             | `git --version` |

## CARA MENJALANKAN DAN LANGKAH INSTALANSINYA

```bash
# 1. Inisialisasi package.json
npm init -y

# 2. Install dependency runtime
npm install express @prisma/client dotenv

# 3. Install dependency development
npm install --save-dev prisma typescript tsx @types/node @types/express

# 4. Inisialisasi Prisma
npx prisma init --datasource-provider sqlite

# 5. Buat file .env & .env.example
cp .env.example .env

# 6. Jalankan migration & generate
npx prisma migrate dev --name init
npx prisma generate

# 7. Jalankan seed
npx prisma db seed

# 8. Jalankan server
npm run dev atau npm start

# hasilnya 
 API berjalan di http://localhost:3008
```

## STRUKTUR LAPISAN 
HTTP → Routes → Validators → Controller → Service → Prisma → SQLite
                     │            │            │
                     └─ 400 ◄─────┼── 404 ◄────┘
                                  │
                    ErrorHandler ◄┘

| Layer          | File                                      | Tanggung Jawab                              |
| :------------- | :---------------------------------------- | :------------------------------------------ |
| **Routes**     | `src/routes/laboratorium.routes.ts`       | Definisi endpoint + pasang validator        |
| **Validators** | `src/validators/laboratorium.validator.ts`| `typeof` gate + rentang + enum              |
| **Controller** | `src/controller/laboratorium.controller.ts`| Terjemahkan `req`/`res`, kode status        |
| **Service**    | `src/service/laboratorium.service.ts`     | Business logic + Prisma                     |
| **Middleware** | `src/middlewares/*`                       | 404 & error handler di `app.ts`             |


## ENDPOINT 
| Method | Endpoint                | Sukses | Error     |
| :----- | :---------------------- | :----- | :-------- |
| GET    | `/health`               | 200    | —         |
| GET    | `/api/laboratorium`     | 200    | 400       |
| GET    | `/api/laboratorium/:id` | 200    | 400, 404  |
| POST   | `/api/laboratorium`     | 201    | 400       |
| PUT    | `/api/laboratorium/:id` | 200    | 400, 404  |
| PATCH  | `/api/laboratorium/:id` | 200    | 400, 404  |
| DELETE | `/api/laboratorium/:id` | 204    | 400, 404  |

## STATUS CODE
| Status | Kapan                            |
| :----- | :------------------------------- |
| 200    | GET / PUT / PATCH sukses         |
| 201    | POST create sukses               |
| 204    | DELETE sukses (tanpa body)       |
| 400    | Validasi gagal                   |
| 404    | Resource / route tidak ditemukan |
| 500    | Error server                     |

## CONTOH CURL TIAP ENDPOINT 
# 1. Health check → 200
curl.exe -i http://localhost:3008/health

# 2. Daftar semua → 200
curl.exe -i http://localhost:3008/api/laboratorium

# 3. Daftar dengan filter → 200
curl.exe -i "http://localhost:3008/api/laboratorium?status=tersedia&minKapasitas=30"

# 4. Detail → 200
curl.exe -i http://localhost:3008/api/laboratorium/1

# 5. Detail tidak ada → 404 Not Found
curl.exe -i http://localhost:3008/api/laboratorium/999999

# 6. Create → 201
curl.exe -i -X POST http://localhost:3008/api/laboratorium \
  -H "Content-Type: application/json" \
  -d '{"nama":"Lab AI","kapasitas":35,"lokasi":"Gedung D Lantai 4"}'

atau (karena code yang di atas sudah di coba dan error jadi menggunakan solusi atau perintah di bawah)

$body = @{ nama="Lab AI"; kapasitas=35; lokasi="Gedung D Lantai 4" } | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3008/api/laboratorium" -Method Post -Body $body -ContentType "application/json" | ConvertTo-Json -Depth 5

# 7. Create tidak valid → 400
curl.exe -i -X POST http://localhost:3008/api/laboratorium \
  -H "Content-Type: application/json" \
  -d '{"nama":"ab","kapasitas":"35","lokasi":""}'

# 8. Update sebagian → 200
curl.exe -i -X PATCH http://localhost:3008/api/laboratorium/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"perbaikan"}'


atau (karena code yang di atas sudah di coba dan error jadi menggunakan solusi atau perintah di bawah)

$body = @{ status="perbaikan" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3008/api/laboratorium/1" -Method Patch -Body $body -ContentType "application/json" | ConvertTo-Json -Depth 5

# 9. Delete → 204
curl.exe -i -X DELETE http://localhost:3008/api/laboratorium/1

# 10. Internal Server Error → 500
 curl.exe -i -X POST http://localhost:3008/api/laboratorium -H "Content-Type: application/json" -d '{"nama":"Lab AI","kapasitas":35,"lokasi":"Gedung D Lantai 4"}'


## UJI PERSISTENSI
# Buat data
curl.exe -X POST http://localhost:3008/api/laboratorium \
  -H "Content-Type: application/json" \
  -d '{"nama":"Lab Uji","kapasitas":10,"lokasi":"Gedung Uji"}'

# Matikan server (Ctrl+C), jalankan ulang
npm start

# Data masih ada → bukti persistensi SQLite
curl.exe http://localhost:3008/api/laboratorium

# Hasil Uji Persistensi
1) saat buat data
{
    "success":  true,
    "message":  "Laboratorium berhasil dibuat",
    "data":  {
                 "id":  5,
                 "nama":  "Lab Uji",
                 "kapasitas":  10,
                 "lokasi":  "Gedung Uji",
                 "status":  "tersedia",
                 "createdAt":  "2026-11-03T02:55:12.056Z",
                 "updatedAt":  "2026-11-03T02:55:12.056Z"
             }
}

2) setelah mematikan server dan kemudian server di jalankan 
{
  "success": true,
  "message": "Daftar laboratorium berhasil diambil",
  "data": [
    {
      "id": 1,
      "nama": "Lab Rekayasa Perangkat Lunak",
      "kapasitas": 40,
      "lokasi": "Gedung A Lantai 2",
      "status": "perbaikan",
      "createdAt": "2026-11-03T02:37:53.404Z",
      "updatedAt": "2026-11-03T02:51:39.655Z"
    },
    {
      "id": 2,
      "nama": "Lab Jaringan Komputer",
      "kapasitas": 30,
      "lokasi": "Gedung B Lantai 1",
      "status": "tersedia",
      "createdAt": "2026-11-03T02:37:53.404Z",
      "updatedAt": "2026-11-03T02:37:53.404Z"
    },
    {
      "id": 4,
      "nama": "Lab AI",
      "kapasitas": 35,
      "lokasi": "Gedung D Lantai 4",
      "status": "tersedia",
      "createdAt": "2026-11-03T02:47:24.273Z",
      "updatedAt": "2026-11-03T02:47:24.273Z"
    },
    {
      "id": 5,
      "nama": "Lab Uji",
      "kapasitas": 10,
      "lokasi": "Gedung Uji",
      "status": "tersedia",
      "createdAt": "2026-11-03T02:55:12.056Z",
      "updatedAt": "2026-11-03T02:55:12.056Z"
    }
  ],
  "meta": {
    "total": 4,
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

## HASIL PENGUJIAN 
```
KETERANGAN: Hasil pengujian ini sudah di rapihkan oleh deepseek agar terlihat rapih
```

# 1. Health check 
{
  "success": true,
  "status": "ok",
  "uptime": 1566.2557108,
  "timestamp": "2026-11-03T02:28:24.655Z"
}

# 2. Daftar semua 
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
      "createdAt": "2026-11-03T02:37:53.404Z",
      "updatedAt": "2026-11-03T02:37:53.404Z"
    },
    {
      "id": 2,
      "nama": "Lab Jaringan Komputer",
      "kapasitas": 30,
      "lokasi": "Gedung B Lantai 1",
      "status": "tersedia",
      "createdAt": "2026-11-03T02:37:53.404Z",
      "updatedAt": "2026-11-03T02:37:53.404Z"
    },
    {
      "id": 3,
      "nama": "Lab Multimedia",
      "kapasitas": 25,
      "lokasi": "Gedung C Lantai 3",
      "status": "perbaikan",
      "createdAt": "2026-11-03T02:37:53.404Z",
      "updatedAt": "2026-11-03T02:37:53.404Z"
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

# 3. Daftar dengan filter 
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
      "createdAt": "2026-11-03T02:37:53.404Z",
      "updatedAt": "2026-11-03T02:37:53.404Z"
    },
    {
      "id": 2,
      "nama": "Lab Jaringan Komputer",
      "kapasitas": 30,
      "lokasi": "Gedung B Lantai 1",
      "status": "tersedia",
      "createdAt": "2026-11-03T02:37:53.404Z",
      "updatedAt": "2026-11-03T02:37:53.404Z"
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
      "sortBy": "id",
      "order": "asc"
    }
  }
}

# 4. Detail
{
  "success": true,
  "message": "Detail laboratorium",
  "data": {
    "id": 1,
    "nama": "Lab Rekayasa Perangkat Lunak",
    "kapasitas": 40,
    "lokasi": "Gedung A Lantai 2",
    "status": "tersedia",
    "createdAt": "2026-11-03T02:37:53.404Z",
    "updatedAt": "2026-11-03T02:37:53.404Z"
  }
}

# 5. Detail tidak ada
{"success":false,"message":"Laboratorium dengan id 999999 tidak ditemukan"}

# 6. Create 
{
    "success":  true,
    "message":  "Laboratorium berhasil dibuat",
    "data":  {
                 "id":  4,
                 "nama":  "Lab AI",
                 "kapasitas":  35,
                 "lokasi":  "Gedung D Lantai 4",
                 "status":  "tersedia",
                 "createdAt":  "2026-11-03T02:47:24.273Z",
                 "updatedAt":  "2026-11-03T02:47:24.273Z"
             }
}

# 7. Create tidak valid 
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 255
ETag: W/"ff-QnpzaorllPmWHPXZf1oFtrOo728"
Date: Tue, 03 Nov 2026 02:48:58 GMT
Connection: keep-alive
Keep-Alive: timeout=5
{
  "success": false,
  "message": "Validasi input gagal",
  "errors": [
    {
      "field": "nama",
      "message": "nama wajib berupa string tidak kosong"
    },
    {
      "field": "kapasitas",
      "message": "kapasitas wajib diisi"
    },
    {
      "field": "lokasi",
      "message": "lokasi wajib berupa string tidak kosong"
    }
  ]
}

# 8. Update sebagian 
{
    "success":  true,
    "message":  "Laboratorium berhasil diperbarui sebagian",
    "data":  {
                 "id":  1,
                 "nama":  "Lab Rekayasa Perangkat Lunak",
                 "kapasitas":  40,
                 "lokasi":  "Gedung A Lantai 2",
                 "status":  "perbaikan",
                 "createdAt":  "2026-11-03T02:37:53.404Z",
                 "updatedAt":  "2026-11-03T02:51:39.655Z"
             }
}

# 9. Delete 
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Tue, 03 Nov 2026 02:53:54 GMT
Connection: keep-alive
Keep-Alive: timeout=5

# 10. Internal Server Error
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 51
ETag: W/"33-7RZd4qXyYXL//QodzjgTnTxO56I"
Date: Tue, 03 Nov 2026 02:44:08 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Internal Server Error"}