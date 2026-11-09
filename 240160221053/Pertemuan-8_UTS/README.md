# UTS Mini Project Backend — Sistem Informasi Perpustakaan

REST API untuk mengelola data **buku** perpustakaan menggunakan **Express.js**, **TypeScript**, **Prisma ORM**, dan **SQLite**, dengan arsitektur berlapis (Route → Controller → Service → Prisma).

| | |
|:--|:--|
| **Nama** | Athiyya Salsabila Hermawan |
| **NPM** | 240160221053 |
| **Kelas** | SI - VB |
| **Mata Kuliah** | Pemrograman Berbasis Web Backend |
| **Pertemuan** | 8 — UTS Mini Project |

---

## 📚 Daftar Isi

1. [Deskripsi Project](#-deskripsi-project)
2. [Fitur Utama](#-fitur-utama)
3. [Struktur Project](#-struktur-project)
4. [Skema Database](#-skema-database)
5. [Persyaratan](#-persyaratan)
6. [Instalasi](#-instalasi)
7. [Cara Menjalankan](#-cara-menjalankan)
8. [Pengujian]
9. 

---

## 📖 Deskripsi Project

Mini project ini merupakan **Ujian Tengah Semester (UTS)** mata kuliah Pemrograman Backend. Project membangun sebuah **REST API** untuk resource utama **`buku`** pada domain **Sistem Informasi Perpustakaan**.

Aplikasi memungkinkan pengguna untuk:
- Melihat daftar seluruh buku.
- Mencari buku berdasarkan penulis.
- Melihat detail satu buku.
- Menambahkan buku baru.
- Memperbarui data buku (sebagian).
- Menghapus buku.

Seluruh data disimpan secara **persisten** di database SQLite melalui Prisma ORM, sehingga tetap ada meskipun server di-restart.

---

## ✨ Fitur Utama

- ✅ **Arsitektur berlapis** — Route → Controller → Service → Prisma
- ✅ **CRUD lengkap** — GET daftar, GET detail, POST, PATCH, DELETE
- ✅ **Integrasi database** — Prisma ORM + SQLite, data persisten
- ✅ **Validasi input** pada semua endpoint write (POST & PATCH)
- ✅ **Status code tepat** — 200, 201, 204, 400, 404, 500
- ✅ **Response seragam** — `{ success, message, data? }`
- ✅ **Middleware 404** dan **error handler** global
- ✅ **Filter query** — `?penulis=xxx` pada endpoint daftar
- ✅ **Health check** — `GET /health`

---

## 🏗 Struktur Project
Pertemuan-8_UTS/
├── app.ts
├── server.ts
├── client.ts
├── prisma.config.ts
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
├── prisma/
│ ├── schema.prisma
│ └── migrations/
└── src/
├── routes/
│ └── buku.routes.ts
├── controller/
│ └── buku.controller.ts
└── service/
└── buku.service.ts


---

## 🗄 Skema Database

Model **Buku** (`prisma/schema.prisma`):

```prisma
model Buku {
  id      Int    @id @default(autoincrement())
  judul   String
  penulis String
  tahun   Int
  stok    Int    @default(0)
}

## Persyaratan
Node.js 20+ / 22+ / 24+
npm 9+
Windows / macOS / Linux

## Cek versi:
bash
node -v
npm -v
## Instalasi
 1. Install dependency
npm install
 2. Salin .env.example menjadi .env
cp .env.example .env
Atau buat manual file .env:
DATABASE_URL="file:./prisma/dev.db"
PORT=3008
 3. Migrasi database
npx prisma migrate dev --name init
 4. Generate Prisma Client
npx prisma generate

## Cara Menjalankan
1. npm start
2. Info API : curl http://localhost:3008/
3. Health Check : curl http://localhost:3008/health
4. GET Daftar Buku : curl http://localhost:3008/buku
5. GET Filter Buku (Query Parameter) : curl "http://localhost:3008/buku?penulis=Pramoedya"
6. POST Tambah Buku : curl -X POST http://     localhost:3008/buku \
  -H "Content-Type: application/json" \
  -d "{\"judul\":\"Bumi Manusia\",\"penulis\":\"Pramoedya Ananta Toer\",\"tahun\":1980,\"stok\":5}"
7. GET Detail Buku : curl http://localhost:3008/buku/1
8. PATCH Update Sebagian : curl -X PATCH http://localhost:3008/buku/1 \
  -H "Content-Type: application/json" \
  -d "{\"stok\":10}"
9. DELETE Hapus Buku : curl -X DELETE http://localhost:3008/buku/1
10. Validasi Gagal (400) : curl -X POST http://localhost:3008/buku \
  -H "Content-Type: application/json" \
  -d "{\"judul\":\"\",\"penulis\":\"\",\"tahun\":\"abc\"}"
11. Tidak Ditemukan (404) : curl http://localhost:3008/buku/99999
12. Endpoint Ngaco (404) : curl http://localhost:3008/endpoint-ngaco

##  Hasil Pengujian ##
PS D:\240160221053> cd Pertemuan-8_UTS
PS D:\240160221053\Pertemuan-8_UTS> node --experimental-strip-types server.ts
CRUD REST API berjalan di http://localhost:3008
[2026-11-02T11:01:29.685Z] GET /health
[2026-11-02T11:01:46.097Z] GET /buku
[2026-11-02T11:02:16.161Z] POST /buku
[2026-11-02T11:03:11.657Z] GET /buku/1
[2026-11-02T11:03:53.536Z] PATCH /buku/1
[2026-11-02T11:04:14.688Z] DELETE /buku/1
[2026-11-02T11:04:36.130Z] POST /buku
[2026-11-02T11:05:00.828Z] GET /buku/99999
[2026-11-02T11:06:41.119Z] GET /endpoint-ngaco

PS D:\240160221053> cd Pertemuan-8_UTS                       
PS D:\240160221053\Pertemuan-8_UTS> curl.exe http://localhost:3008/health
{"success":true,"message":"API berjalan","data":{"status":"up"}}
PS D:\240160221053\Pertemuan-8_UTS> curl.exe http://localhost:3008/buku
{"success":true,"message":"Daftar buku berhasil diambil","data":{"total":0,"data":[]}}
PS D:\240160221053\Pertemuan-8_UTS> $body = @{
>>   judul   = "Bumi Manusia"
>>   penulis = "Pramoedya Ananta Toer"
>>   tahun   = 1980
>>   stok    = 5
>> } | ConvertTo-Json
>> 
>> Invoke-RestMethod -Uri "http://localhost:3008/buku" -Method POST -ContentType "application/json" -Body $body

success message              data                                                                          
------- -------              ----                                                                          
   True Buku berhasil dibuat @{id=1; judul=Bumi Manusia; penulis=Pramoedya Ananta Toer; tahun=1980; stok=5}
PS D:\240160221053\Pertemuan-8_UTS> curl.exe http://localhost:3008/buku/1
{"success":true,"message":"Detail buku berhasil diambil","data":{"id":1,"judul":"Bumi Manusia","penulis":"Pramoedya Ananta Toer","tahun":1980,"stok":5}}
PS D:\240160221053\Pertemuan-8_UTS> $body = @{ stok = 10 } | ConvertTo-Json
>> Invoke-RestMethod -Uri "http://localhost:3008/buku/1" -Method PATCH -ContentType "application/json" -Body $body

success message                  data                                                                           
------- -------                  ----                                                                           
   True Buku berhasil diperbarui @{id=1; judul=Bumi Manusia; penulis=Pramoedya Ananta Toer; tahun=1980; stok=10}
PS D:\240160221053\Pertemuan-8_UTS> curl.exe -X DELETE http://localhost:3008/buku/1 -i
HTTP/1.1 204 No Content
Date: Mon, 02 Nov 2026 11:04:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5
PS D:\240160221053\Pertemuan-8_UTS> $body = @{ judul = ""; penulis = ""; tahun = "abc" } | ConvertTo-Json
>> Invoke-RestMethod -Uri "http://localhost:3008/buku" -Method POST -ContentType "application/json" -Body $body
Invoke-RestMethod : {"success":false,"message":"Data buku tidak valid","details":["Field judul wajib diisi","Field 
penulis wajib diisi","Field tahun wajib angka 1000–2100"]}
At line:2 char:1
+ Invoke-RestMethod -Uri "http://localhost:3008/buku" -Method POST -Con ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-RestMethod], We 
   bException
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeRestMethodCommand
PS D:\240160221053\Pertemuan-8_UTS> curl.exe http://localhost:3008/buku/99999
{"success":false,"message":"Buku tidak ditemukan"}
PS D:\240160221053\Pertemuan-8_UTS> curl.exe http://localhost:3008/endpoint-ngaco 
{"success":false,"message":"Endpoint tidak ditemukan"}
PS D:\240160221053\Pertemuan-8_UTS> curl.exe http://localhost:3008/buku
{"success":true,"message":"Daftar buku berhasil diambil","data":{"total":0,"data":[]}}
PS D:\240160221053\Pertemuan-8_UTS> 
