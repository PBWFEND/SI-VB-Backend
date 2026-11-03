# UTS Mini Project Backend — Perpustakaan

| | |
|:--|:--|
| Nama | Resty Dewina Fitri |
| NIM | 240160221039 |
| Kelas | SI - VB |
| Domain | Perpustakaan (resource `buku`) |
| Stack | Node.js 20+, Express.js 5, Prisma ORM 7, SQLite |

REST API untuk resource **buku** dengan operasi CRUD lengkap, terintegrasi database SQLite melalui Prisma ORM, dan disusun dengan pola berlapis (route, controller, service).

## Struktur Project

```text
240160221039/UTS/
├── app.ts                          # middleware, route, 404, error handler
├── server.ts                       # menjalankan app + graceful shutdown
├── client.ts                       # singleton Prisma Client
├── prisma.config.ts
├── prisma/
│   ├── schema.prisma               # model Buku
│   └── migrations/                 # hasil prisma migrate
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── routes/buku.routes.ts
    ├── controller/buku.controller.ts
    └── service/buku.service.ts
```

## Cara Menjalankan

```bash
npm install
cp .env.example .env
npx prisma migrate dev --name init
npx prisma generate
npm start
```

Server berjalan di `http://localhost:3008`.

> Catatan Windows: `better-sqlite3` dipatok di `^12.11.1` agar tidak memicu `node-gyp` (v13 memerlukan Visual Studio C++ Build Tools). Jika npm 12 memblokir script instalasi, jalankan:
> ```bash
> npm install-scripts approve better-sqlite3 prisma @prisma/engines
> npm rebuild better-sqlite3
> npm rebuild prisma
> npm rebuild @prisma/engines
> ```

## Skema Model

| Field | Tipe | Wajib | Catatan |
|:--|:--|:--:|:--|
| `id` | Int | — | autoincrement |
| `judul` | String | Ya | bukan kosong |
| `penulis` | String | Ya | bukan kosong |
| `tahun` | Int | Ya | 1000–2100 |
| `stok` | Int | Tidak | default 0, minimal 0 |

## Endpoint

| Method | Path | Sukses | Error |
|:--|:--|:--|:--|
| GET | `/health` | 200 | — |
| GET | `/` | 200 | — |
| GET | `/buku` | 200 | 500 |
| GET | `/buku/:id` | 200 | 400 (id tidak valid), 404, 500 |
| POST | `/buku` | 201 | 400 (validasi), 500 |
| PATCH | `/buku/:id` | 200 | 400, 404, 500 |
| DELETE | `/buku/:id` | 204 | 400, 404, 500 |

## Pola Berlapis

- **Route** (`src/routes/buku.routes.ts`) — memetakan method + path ke controller.
- **Controller** (`src/controller/buku.controller.ts`) — validasi input (`typeof` + rentang), memilih status code, membentuk respons JSON.
- **Service** (`src/service/buku.service.ts`) — semua operasi Prisma Client (`findMany`, `findUnique`, `create`, `update`, `delete`).

Request mengalir: `app.ts` → `buku.routes.ts` → `buku.controller.ts` → `buku.service.ts` → Prisma → SQLite.

## Contoh `curl`

### Health check

```bash
curl -i http://localhost:3008/health
```

### Daftar buku

```bash
curl -i http://localhost:3008/buku
```

### Buat buku — 201

```bash
curl -i -X POST http://localhost:3008/buku \
  -H "Content-Type: application/json" \
  -d "{\"judul\":\"Pemrograman Node.js\",\"penulis\":\"Resty Dewina Fitri\",\"tahun\":2026,\"stok\":5}"
```

### Detail buku — 200; id tidak ada — 404

```bash
curl -i http://localhost:3008/buku/1
curl -i http://localhost:3008/buku/999999
```

### ID tidak valid — 400

```bash
curl -i http://localhost:3008/buku/abc
```

### Update sebagian — 200

```bash
curl -i -X PATCH http://localhost:3008/buku/1 \
  -H "Content-Type: application/json" \
  -d "{\"stok\":10}"
```

### Validasi gagal — 400

```bash
curl -i -X POST http://localhost:3008/buku \
  -H "Content-Type: application/json" \
  -d "{\"judul\":\"\",\"penulis\":\"\",\"tahun\":1800,\"stok\":-1}"
```

### Hapus — 204

```bash
curl -i -X DELETE http://localhost:3008/buku/1
```

### Endpoint tidak ada — 404 middleware

```bash
curl -i http://localhost:3008/tidak-ada
```

## Bukti Pengujian

Diuji pada **Senin, 2 November 2026**, server berjalan di `http://localhost:3008`.

| No | Perintah | Status | Hasil |
|:-:|:--|:-:|:--|
| 1 | `GET /health` | 200 | `{"success":true,"message":"OK","data":{"status":"healthy"}}` |
| 2 | `GET /buku` (awal) | 200 | `{"total":0,"data":[]}` |
| 3 | `POST /buku` (valid) | 201 | `id=1`, `judul="Pemrograman Node.js"`, `stok=5` |
| 4 | `GET /buku` (setelah POST) | 200 | `total=1` |
| 5 | `GET /buku/1` | 200 | detail buku id=1 |
| 6 | `GET /buku/999999` | 404 | `Buku tidak ditemukan` |
| 7 | `GET /buku/abc` | 400 | `ID tidak valid` |
| 8 | `PATCH /buku/1` `{"stok":10}` | 200 | `stok=10`, field lain tetap |
| 9 | `PATCH /buku/999999` | 404 | `Buku tidak ditemukan` |
| 10 | `POST /buku` (judul/penulis kosong, tahun 1800, stok -1) | 400 | 3 error validasi |
| 11 | `POST /buku` (tanpa judul) | 400 | `Field judul wajib diisi dan berupa string` |
| 12 | `POST /buku` (`tahun` string) | 400 | `Field tahun wajib berupa bilangan bulat 1000–2100` |
| 13 | `GET /tidak-ada` | 404 | `Endpoint tidak ditemukan` |
| 14 | `DELETE /buku/1` | 204 | tanpa body |
| 15 | `DELETE /buku/999999` | 404 | `Buku tidak ditemukan` |
| 16 | `GET /buku` (setelah delete) | 200 | `total=0` |
| 17 | `POST /buku` (Buku Persistensi) | 201 | `id=2`, `stok=3` |
| 18 | Restart server → `GET /buku` | 200 | data `id=2` masih ada (persisten) |

### Catatan Hasil Validasi

- Pada percobaan `POST /buku` dengan `{"judul":"","penulis":"","tahun":1800,"stok":-1}`, server mengembalikan **3 error**: judul kosong, penulis kosong, stok negatif. Field `tahun` **tidak** masuk daftar error karena `1800` masih dalam rentang `1000–2100`. Ini sesuai aturan validasi.
- Pada percobaan `POST /buku` dengan `tahun` berupa string `"dua ribu"`, server mengembalikan **1 error**: `Field tahun wajib berupa bilangan bulat 1000–2100`. Ini membuktikan pengecekan `typeof` bekerja.

## Log Server (CMD 1)

```
> uts-backend-240160221039@1.0.0 start
> node --experimental-strip-types server.ts

API UTS berjalan di http://localhost:3008
[2026-11-02T14:39:45.453Z] GET /buku
[2026-11-02T14:40:26.052Z] GET /health
[2026-11-02T14:40:36.493Z] GET /buku
[2026-11-02T14:43:03.787Z] POST /buku
[2026-11-02T14:43:41.259Z] GET /buku
[2026-11-02T14:44:12.887Z] GET /buku/1
[2026-11-02T14:44:27.615Z] GET /buku/999999
[2026-11-02T14:44:41.556Z] GET /buku/abc
[2026-11-02T14:44:59.714Z] PATCH /buku/1
[2026-11-02T14:45:37.531Z] PATCH /buku/999999
[2026-11-02T14:45:48.838Z] POST /buku
[2026-11-02T14:46:20.453Z] POST /buku
[2026-11-02T14:46:37.051Z] POST /buku
[2026-11-02T14:46:48.479Z] GET /tidak-ada
[2026-11-02T14:47:01.585Z] DELETE /buku/1
[2026-11-02T14:47:16.992Z] DELETE /buku/999999
[2026-11-02T14:47:27.015Z] GET /buku
[2026-11-02T14:48:34.917Z] POST /buku
```

## Uji Persistensi

1. `POST /buku` dengan `{"judul":"Buku Persistensi","penulis":"Resty","tahun":2026,"stok":3}` → `201`, `id=2`.
2. Hentikan server (`Ctrl+C`), lalu jalankan ulang `npm start`.
3. `GET /buku` → data `id=2` masih ada.

Ini membuktikan data disimpan di SQLite (`prisma/dev.db`), bukan di memori.

## Catatan Teknis

- `better-sqlite3` dipatok di `^12.11.1` agar tidak memicu `node-gyp` (v13 memerlukan Visual Studio C++ Build Tools di Windows).
- Blok `datasource` di `schema.prisma` **tidak** memuat `url`; koneksi diatur di `prisma.config.ts` sesuai Prisma ORM 7.
- `prisma/generated/`, `.env`, dan `prisma/dev.db` tidak di-commit (lihat `.gitignore`).
- `prisma/migrations/` **harus** di-commit agar database dapat di-migrate ulang di komputer lain.

## .gitignore

```gitignore
node_modules/
.env
prisma/dev.db
prisma/dev.db-journal
prisma/generated/
dist/
```