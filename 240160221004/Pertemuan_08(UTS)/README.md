# UTS Mini Project Backend — Perpustakaan

Backend REST API domain **Perpustakaan** dengan resource utama **Buku** dan relasi **Pinjaman**.
Dibangun dengan **Node.js 20+, Express.js 5, Prisma ORM, SQLite**.

## Identitas
- Nama: Aprilliana Fratiwi
- NPM: 240160221004

## Prasyarat
- Node.js 20+ (`node -v`)
- npm 10+ (`npm -v`)
- Git (`git --version`)

## Cara Menjalankan

```bash
npm install
cp .env.example .env         
npx prisma migrate dev --name init
npx prisma generate
npm run seed                  
npm start
```

Server: `http://localhost:3008`

## Struktur Lapisan

```
app.ts                     # middleware, route, 404, error handler
server.ts                  # menjalankan app + shutdown bersih
client.ts                  # Prisma Client singleton
prisma/schema.prisma       # skema Buku, Pengguna, Pinjaman
prisma/seed.ts             # data awal
src/routes/                # endpoint
src/controller/            # request/response + validasi
src/service/               # logika bisnis + akses Prisma
```

## Skema

**Buku**: `id, judul, penulis, tahun (1000–2100), stok (≥0)`
**Pengguna**: `id, nama, email (unik)`
**Pinjaman**: `id, bukuId, penggunaId, tanggalPinjam, tanggalKembali, status`

## Endpoint

| Method | Path | Sukses | Keterangan |
|--------|------|--------|------------|
| GET | /health | 200 | Health check |
| GET | /buku | 200 | Daftar buku (filter `?status=tersedia\|habis`) |
| GET | /buku/:id | 200 / 404 | Detail buku |
| POST | /buku | 201 / 400 | Buat buku |
| PATCH | /buku/:id | 200 / 400 / 404 | Update buku |
| DELETE | /buku/:id | 204 / 404 | Hapus buku |
| GET | /pinjaman | 200 | Daftar pinjaman (filter `?status=aktif\|selesai`) |
| GET | /pinjaman/:id | 200 / 404 | Detail pinjaman |
| POST | /pinjaman | 201 / 400 / 404 | Buat pinjaman (kurangi stok) |
| PATCH | /pinjaman/:id/kembalikan | 200 / 400 / 404 | Kembalikan buku (tambah stok) |
| DELETE | /pinjaman/:id | 204 / 404 | Hapus pinjaman |

## Contoh Pengujian `curl`

### 1. Health check
```bash
curl -i http://localhost:3008/health
```

### 2. Daftar buku
```bash
curl -i http://localhost:3008/buku
curl -i "http://localhost:3008/buku?status=tersedia"
```

### 3. Detail buku
```bash
curl -i http://localhost:3008/buku/1
curl -i http://localhost:3008/buku/999999      # → 404
```

### 4. Buat buku (→ 201)
```bash
curl -i -X POST http://localhost:3008/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"Bumi","penulis":"Tere Liye","tahun":2014,"stok":3}'
```

### 5. Update buku (→ 200)
```bash
curl -i -X PATCH http://localhost:3008/buku/1 \
  -H "Content-Type: application/json" \
  -d '{"stok":10}'
```

### 6. Validasi gagal (→ 400)
```bash
curl -i -X POST http://localhost:3008/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"","tahun":3000,"stok":-1}'
```

### 7. Hapus buku (→ 204)
```bash
curl -i -X DELETE http://localhost:3008/buku/1
```

### 8. Buat pinjaman (→ 201, stok berkurang)
```bash
curl -i -X POST http://localhost:3008/pinjaman \
  -H "Content-Type: application/json" \
  -d '{"bukuId":2,"penggunaId":1}'
```

### 9. Kembalikan pinjaman (→ 200, stok bertambah)
```bash
curl -i -X PATCH http://localhost:3008/pinjaman/1/kembalikan
```

## Bukti Pengujian
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_08(UTS)>npm start

> uts-backend-perpustakaan@1.0.0 start
> tsx server.ts

🚀 API berjalan di http://localhost:3008

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_08(UTS)>curl.exe -i http://localhost:3008/health
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 54
ETag: W/"36-1K7JUiiioYHrKd1NM3MwNAUwU8w"
Date: Wed, 28 Oct 2026 15:11:25 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"status":"ok","timestamp":"2026-10-28T15:11:25.103Z"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_08(UTS)>curl.exe -i http://localhost:3008/buku
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 11
ETag: W/"b-EFAlOux7Kcr/ZEgGkn2r+oFAbu4"
Date: Wed, 28 Oct 2026 15:11:43 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"data":[]}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_08(UTS)>curl.exe -i http://localhost:3008/buku/1
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 39
ETag: W/"27-zzPCIHoW83Iv/P8GJTd0Gj+82C0"
Date: Wed, 28 Oct 2026 15:12:13 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Buku id 1 tidak ditemukan"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_08(UTS)>curl.exe -i http://localhost:3008/buku/999999
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 44
ETag: W/"2c-XyHwvoMl3IzLO9QaPy8oPaFwT1U"
Date: Wed, 28 Oct 2026 15:12:38 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Buku id 999999 tidak ditemukan"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_08(UTS)>curl.exe -i -X POST http://localhost:3008/buku -H "Content-Type: application/json" -d "{\"judul\":\"Bumi\",\"penulis\":\"Tere Liye\",\"tahun\":2014,\"stok\":3}"
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 187
ETag: W/"bb-iGwUr1rBtqoZ8r2xbpK40qO6wdE"
Date: Wed, 28 Oct 2026 15:13:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Buku berhasil dibuat","data":{"id":1,"judul":"Bumi","penulis":"Tere Liye","tahun":2014,"stok":3,"createdAt":"2026-10-28T15:13:31.795Z","updatedAt":"2026-10-28T15:13:31.795Z"}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_08(UTS)>curl.exe -i -X PATCH http://localhost:3008/buku/1 -H "Content-Type: application/json" -d "{\"stok\":10}"
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 190
ETag: W/"be-l++/6DuFE+q8P/kG6QulvpcudHg"
Date: Wed, 28 Oct 2026 15:14:20 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Buku berhasil diupdate","data":{"id":1,"judul":"Bumi","penulis":"Tere Liye","tahun":2014,"stok":10,"createdAt":"2026-10-28T15:13:31.795Z","updatedAt":"2026-10-28T15:14:20.095Z"}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_08(UTS)>

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_08(UTS)>curl.exe -i -X POST http://localhost:3008/buku -H "Content-Type: application/json" -d "{\"judul\":\"\",\"tahun\":3000,\"stok\":-1}"
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 178
ETag: W/"b2-vSK28P34gL2z8YwwQyAnLk65XK0"
Date: Wed, 28 Oct 2026 15:14:45 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Validasi gagal","errors":["judul wajib string tidak kosong","penulis wajib string tidak kosong","tahun harus di antara 1000 dan 2100","stok harus integer minimal 0"]}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_08(UTS)>curl.exe -i -X POST http://localhost:3008/pinjaman -H "Content-Type: application/json" -d "{\"bukuId\":2,\"penggunaId\":1}"
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 39
ETag: W/"27-/EsQE0u0uG6s/csow1Y+CsSLtbI"
Date: Wed, 28 Oct 2026 15:15:06 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Buku id 2 tidak ditemukan"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_08(UTS)>curl.exe -i -X PATCH http://localhost:3008/pinjaman/1/kembalikan
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 43
ETag: W/"2b-MnNWmCNrBT0OgSMdVMZxsX/1kk8"
Date: Wed, 28 Oct 2026 15:15:26 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Pinjaman id 1 tidak ditemukan"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_08(UTS)>curl.exe -i -X DELETE http://localhost:3008/buku/3
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 39
ETag: W/"27-VhalsT3HZHJ1x76BTGVuU/6tgXw"
Date: Wed, 28 Oct 2026 15:15:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Buku id 3 tidak ditemukan"}
