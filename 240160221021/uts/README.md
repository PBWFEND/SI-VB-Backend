# UTS Mini Project - REST API Peralatan Laboratorium

Nama dan NIM: Lintang Azzahra Govarana (240160221021)

REST API Express.js untuk mengelola peralatan laboratorium, terintegrasi dengan SQLite melalui Prisma ORM. Kode dipisah menjadi lapisan route, controller, dan service.

## Prasyarat

- Node.js versi 22 atau lebih baru
- npm

## Menyiapkan dan menjalankan

```
npm install
copy .env.example .env
npx prisma migrate dev --name init
npx prisma generate
npm start
```

Di macOS atau Linux, ganti `copy` dengan `cp`. Server berjalan di `http://localhost:3008`.

## Struktur dan alur lapisan

```
Request -> app.ts (middleware) -> routes -> controller -> service -> Prisma -> SQLite
```

| Lapisan | File | Tugas | Tidak boleh |
|:--|:--|:--|:--|
| App | app.ts | Middleware JSON dan logger, router, handler 404, error handler | Menulis validasi atau query |
| Route | src/routes/peralatan.routes.ts | Mengelompokkan endpoint | Memvalidasi atau menyentuh Prisma |
| Controller | src/controller/peralatan.controller.ts | Validasi input, kode status, bentuk response | Menulis query database |
| Service | src/service/peralatan.service.ts | Operasi Prisma Client | Mengetahui kode status HTTP |

Validasi ada di controller (bukan service) supaya kesalahan input dijawab 400, berbeda dari kesalahan server yang 500.

## Skema database

| Field | Tipe | Wajib | Aturan |
|:--|:--|:--|:--|
| id | Int | otomatis | primary key, autoincrement |
| nama | String | ya | tidak kosong, maksimal 100 karakter |
| kode | String | ya | unik, 3 sampai 20 karakter (huruf, angka, tanda hubung), disimpan huruf besar |
| kondisi | String | ya | salah satu dari: baik, rusak, perbaikan |
| jumlah | Int | tidak | default 1, bilangan bulat 1 sampai 10000 |

## Endpoint

Format response: sukses `{ success, message, data }`, error `{ success: false, message, details? }`.

| Method | Endpoint | Fungsi | Status |
|:--|:--|:--|:--|
| GET | /health | Pemeriksaan server | 200 |
| GET | /peralatan | Daftar peralatan, filter ?kondisi= | 200 / 400 |
| GET | /peralatan/:id | Detail satu peralatan | 200 / 400 / 404 |
| POST | /peralatan | Menambah peralatan | 201 / 400 / 409 |
| PATCH | /peralatan/:id | Mengubah sebagian data | 200 / 400 / 404 / 409 |
| DELETE | /peralatan/:id | Menghapus peralatan | 204 / 400 / 404 |

Arti status: 201 untuk resource baru, 204 untuk berhasil tanpa body, 400 untuk input tidak valid, 404 untuk id tidak ada, 409 untuk kode yang sudah dipakai, 500 untuk kesalahan server.

## Contoh request (curl)

macOS, Linux, atau Git Bash:

```
curl -i http://localhost:3008/health
curl -i http://localhost:3008/peralatan
curl -i "http://localhost:3008/peralatan?kondisi=baik"
curl -i http://localhost:3008/peralatan/1
curl -i http://localhost:3008/peralatan/999999

curl -i -X POST http://localhost:3008/peralatan \
  -H "Content-Type: application/json" \
  -d '{"nama":"Mikroskop Binokuler","kode":"LAB-001","kondisi":"baik","jumlah":5}'

curl -i -X PATCH http://localhost:3008/peralatan/1 \
  -H "Content-Type: application/json" \
  -d '{"kondisi":"perbaikan"}'

curl -i -X POST http://localhost:3008/peralatan \
  -H "Content-Type: application/json" \
  -d '{"nama":"","kode":"x","kondisi":"hilang","jumlah":0}'

curl -i -X DELETE http://localhost:3008/peralatan/1
```

Windows PowerShell (pakai `curl.exe`, bukan `curl`). JSON dikirim lewat pipe supaya spasi dan tanda kutip di dalamnya aman:

```
curl.exe -i http://localhost:3008/health
curl.exe -i http://localhost:3008/peralatan
curl.exe -i "http://localhost:3008/peralatan?kondisi=baik"
curl.exe -i http://localhost:3008/peralatan/1
curl.exe -i http://localhost:3008/peralatan/999999
'{"nama":"Mikroskop Binokuler","kode":"LAB-001","kondisi":"baik","jumlah":5}' | curl.exe -i -X POST http://localhost:3008/peralatan -H "Content-Type: application/json" -d "@-"
'{"kondisi":"perbaikan"}' | curl.exe -i -X PATCH http://localhost:3008/peralatan/1 -H "Content-Type: application/json" -d "@-"
'{"nama":"","kode":"x","kondisi":"hilang","jumlah":0}' | curl.exe -i -X POST http://localhost:3008/peralatan -H "Content-Type: application/json" -d "@-"
curl.exe -i -X DELETE http://localhost:3008/peralatan/1
```

## Hasil pengujian

Pengujian dilakukan dengan skrip PowerShell (Invoke-WebRequest) yang mengirim request-request berikut ke server yang sedang berjalan.

| No | Request | Status |
|:--|:--|:--|
| 1 | GET /health | 200 |
| 2 | GET /peralatan (database kosong) | 200 |
| 3 | POST /peralatan data lengkap | 201 |
| 4 | POST /peralatan tanpa jumlah (default 1) | 201 |
| 5 | POST /peralatan data tidak valid | 400 |
| 6 | POST /peralatan dengan kode yang sudah ada | 409 |
| 7 | GET /peralatan | 200 |
| 8 | GET /peralatan?kondisi=baik | 200 |
| 9 | GET /peralatan?kondisi=hilang | 400 |
| 10 | GET /peralatan/1 | 200 |
| 11 | GET /peralatan/99 | 404 |
| 12 | GET /peralatan/abc | 400 |
| 13 | PATCH /peralatan/2 (kondisi dan jumlah) | 200 |
| 14 | PATCH /peralatan/2 (kondisi tidak valid) | 400 |
| 15 | PATCH /peralatan/2 (body kosong) | 400 |
| 16 | PATCH /peralatan/2 (kode milik peralatan lain) | 409 |
| 17 | PATCH /peralatan/99 | 404 |
| 18 | DELETE /peralatan/1 | 204 |
| 19 | GET /peralatan/1 setelah dihapus | 404 |
| 20 | GET /tidak-ada | 404 |
| 21 | POST /peralatan dengan JSON rusak | 400 |

Bukti data permanen: setelah server dimatikan dan dijalankan ulang, GET /peralatan masih menampilkan data yang dibuat sebelumnya.

## Catatan Git

File `.env`, `node_modules`, file `.db`, dan folder `prisma/generated` tidak ikut di-commit. Migration di `prisma/migrations` ikut di-commit supaya database bisa dibuat ulang di komputer lain.