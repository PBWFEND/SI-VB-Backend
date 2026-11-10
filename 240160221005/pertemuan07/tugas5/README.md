# Tugas 5 — CRUD REST API Laboratorium (Pola Service/Controller)

Nama    : Cinta Rahmia Yulianti
NPM     : 240160221005
Kelas   : SI-VB

Pengembangan dari Tugas 4 (Prisma + Express) menjadi arsitektur berlapis
route → controller → service → prisma dengan validasi input diperketat.

## Instalasi & Menjalankan

```bash
# 1. Init project
npm init -y

# 2. Dependency runtime
npm install express @prisma/client dotenv

# 3. Dependency development (TypeScript + Prisma CLI + tooling)
npm install -D typescript tsx @types/node @types/express prisma

# 4. Init Prisma (jika folder prisma/ belum ada)
npx prisma init --datasource-provider sqlite

# 5. Generate Prisma Client
npx prisma generate

# 6. cetakan konfigurasi
cp .env.example .env

# 7. menjalankannya
npm run dev

```

## ALUR LAPISAN 
HTTP → Routes → Validators → Controllers → Services → Prisma → DB
                     │            │             │
                     └─ 400 ◄─────┼── 404 ◄─────┘ (record null)
                                  │
                    ErrorHandler ◄┘

Penjelasan :
1) Routes — definisi endpoint + pasang validator per-route.
2) Validators — gerbang typeof, rentang, enum; gagal → ApiError(400).
3) Controllers — konversi req/res, tentukan status code (200/201/204), bungkus envelope JSON.
4) Services — akses Prisma, kembalikan null jika tidak ditemukan.
5) ErrorHandler — menangkap semua ApiError + error Prisma.

## ENDPOINT 
| Method   | Endpoint                | Keterangan                 | Sukses | Error         |
| :------- | :---------------------- | :------------------------- | :----: | :-----------: |
| `GET`    | `/api/laboratorium`     | Collection + filter + sort | `200`  | `500`         |
| `GET`    | `/api/laboratorium/:id` | Detail satu data           | `200`  | `404`         |
| `POST`   | `/api/laboratorium`     | Create + validasi          | `201`  | `400`         |
| `PUT`    | `/api/laboratorium/:id` | Update penuh               | `200`  | `400` / `404` |
| `PATCH`  | `/api/laboratorium/:id` | Update sebagian            | `200`  | `400` / `404` |
| `DELETE` | `/api/laboratorium/:id` | Hapus data                 | `204`  | `404`         |

## CONTOH CURL TIAP ENDPOINT
# 1) GET collection
curl.exe -i http://localhost:3000/api/laboratorium

# 2) GET collection dengan filter + sort
curl.exe -s "http://localhost:3000/api/laboratorium?status=tersedia&minKapasitas=30&sortBy=kapasitas&order=desc"

# 3) GET detail
curl.exe -s http://localhost:3000/api/laboratorium/1

# 4) POST create
curl.exe -s -X POST http://localhost:3000/api/laboratorium \
  -H "Content-Type: application/json" \
  -d '{"nama":"Lab Kecerdasan Buatan","kapasitas":35,"lokasi":"Gedung D Lantai 4"}'

# 5) PATCH partial update
curl.exe -s -X PATCH http://localhost:3000/api/laboratorium/6 \
  -H "Content-Type: application/json" \
  -d '{"status":"perbaikan"}'

# 6) DELETE
curl.exe -s -i -X DELETE http://localhost:3000/api/laboratorium/4

# 7) 404 detail tidak ada
curl.exe -s -i http://localhost:3000/api/laboratorium/999

# 8) 400 validasi typeof
curl.exe -s -X POST http://localhost:3000/api/laboratorium -H "Content-Type: application/json" -d '{"nama":"ab","kapasitas":"35","lokasi":""}'

## STATUS CODE
| Status Code | Digunakan untuk                          |
| :---------: | :--------------------------------------- |
|    `200`    | GET collection, GET detail, PUT, PATCH   |
|    `201`    | POST create                              |
|    `204`    | DELETE berhasil (tanpa body)             |
|    `400`    | Validasi body/params/query gagal         |
|    `404`    | Resource / route tidak ditemukan         |

## HASIL PENGUJIAN
```
KETERANGAN : hasil ini di rapihkan oleh deepseek karena hasil asli berantakan dan di buat rapih.
```
# 1) GET collection
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
      "createdAt": "2026-11-02T03:40:02.333Z",
      "updatedAt": "2026-11-02T03:40:02.333Z"
    },
    {
      "id": 2,
      "nama": "Lab Jaringan Komputer",
      "kapasitas": 30,
      "lokasi": "Gedung B Lantai 1",
      "status": "tersedia",
      "createdAt": "2026-11-02T03:40:02.333Z",
      "updatedAt": "2026-11-02T03:40:02.333Z"
    },
    {
      "id": 3,
      "nama": "Lab Multimedia",
      "kapasitas": 25,
      "lokasi": "Gedung C Lantai 3",
      "status": "perbaikan",
      "createdAt": "2026-11-02T03:40:02.333Z",
      "updatedAt": "2026-11-02T03:40:02.333Z"
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

# 2) GET collection dengan filter + sort
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
      "createdAt": "2026-11-02T03:40:02.333Z",
      "updatedAt": "2026-11-02T03:40:02.333Z"
    },
    {
      "id": 2,
      "nama": "Lab Jaringan Komputer",
      "kapasitas": 30,
      "lokasi": "Gedung B Lantai 1",
      "status": "tersedia",
      "createdAt": "2026-11-02T03:40:02.333Z",
      "updatedAt": "2026-11-02T03:40:02.333Z"
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

# 3) GET detail
{
  "success": true,
  "message": "Detail laboratorium",
  "data": {
    "id": 1,
    "nama": "Lab Rekayasa Perangkat Lunak",
    "kapasitas": 40,
    "lokasi": "Gedung A Lantai 2",
    "status": "tersedia",
    "createdAt": "2026-11-02T03:40:02.333Z",
    "updatedAt": "2026-11-02T03:40:02.333Z"
  }
}
# 4) POST create
{
  "success": true,
  "message": "Laboratorium berhasil dibuat",
  "data": {
    "id": 6,
    "nama": "Lab Kecerdasan Buatan",
    "kapasitas": 35,
    "lokasi": "Gedung D Lantai 4",
    "status": "tersedia",
    "createdAt": "2026-11-02T05:27:23.961Z",
    "updatedAt": "2026-11-02T05:27:23.961Z"
  }
}
# 5) PATCH partial update
{
    "success":  true,
    "message":  "Laboratorium berhasil diperbarui sebagian",
    "data":  {
                 "id":  6,
                 "nama":  "Lab Kecerdasan Buatan",
                 "kapasitas":  35,
                 "lokasi":  "Gedung D Lantai 4",
                 "status":  "perbaikan",
                 "createdAt":  "2026-11-02T05:27:23.961Z",
                 "updatedAt":  "2026-11-02T05:32:46.006Z"
             }
}
# 6) DELETE
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Mon, 02 Nov 2026 05:33:42 GMT
Connection: keep-alive
Keep-Alive: timeout=5

# 7) 404 detail tidak ada
{"success":false,"message":"Laboratorium dengan id 999 tidak ditemukan"}

# 8) 400 validasi typeof
{
  "success": false,
  "message": "Validasi input gagal",
  "errors": [
    {
      "field": "nama",
      "message": "nama minimal 3 karakter"
    },
    {
      "field": "kapasitas",
      "message": "kapasitas wajib bertipe number"
    },
    {
      "field": "lokasi",
      "message": "lokasi wajib berupa string tidak kosong"
    }
  ]
}