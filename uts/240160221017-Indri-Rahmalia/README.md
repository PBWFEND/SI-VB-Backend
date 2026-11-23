# Mini Project UTS — REST API Perpustakaan

Backend REST API untuk resource **buku** menggunakan Express, TypeScript, Prisma ORM, dan SQLite.

- Nama: `<isi nama>`
- NIM: `<isi NIM>`
- Kelas: `<SI-VA / SI-VB>`

## Cara Menjalankan

```bash
cd mini-project
npm install
cp .env.example .env
npx prisma migrate dev --name init
npx prisma generate
npm start
```

Server berjalan di `http://localhost:3008`.
(Opsional) isi data awal: `npx prisma db seed` atau `npm run seed`.

## Struktur Lapisan

```
app.ts / server.ts / client.ts   # app + middleware, bootstrap, Prisma singleton
prisma/schema.prisma             # model Buku
src/routes/buku.routes.ts        # definisi endpoint -> controller
src/controller/buku.controller.ts# parsing request, validasi (typeof + rentang), status code
src/service/buku.service.ts      # akses database via Prisma
```

Alur: **routes → controller → service → Prisma → SQLite**.

## Model Buku

| Field   | Tipe   | Wajib | Aturan                    |
|---------|--------|-------|---------------------------|
| id      | Int    | —     | autoincrement             |
| judul   | String | Ya    | tidak kosong              |
| penulis | String | Ya    | tidak kosong              |
| tahun   | Int    | Ya    | bilangan bulat 1000–2100  |
| stok    | Int    | Tidak | default 0, minimal 0      |

## Endpoint

| Method | Path          | Keterangan                                  | Sukses |
|--------|---------------|---------------------------------------------|--------|
| GET    | /health       | health check                                | 200    |
| GET    | /buku         | daftar buku (filter: `?judul=&penulis=&tahun=`) | 200 |
| GET    | /buku/:id     | detail buku                                 | 200    |
| POST   | /buku         | tambah buku                                 | 201    |
| PATCH  | /buku/:id     | ubah sebagian                               | 200    |
| DELETE | /buku/:id     | hapus buku                                  | 204    |

Error: `400` validasi gagal / id tidak valid / JSON rusak, `404` data atau route tidak ditemukan, `500` error server.

## Contoh curl dan Hasil Pengujian

```bash
# 1. Health check
curl -i http://localhost:3008/health

# 2. Daftar buku
curl -i http://localhost:3008/buku
curl -i "http://localhost:3008/buku?penulis=Andrea"

# 3. Buat data baru -> 201
curl -i -X POST http://localhost:3008/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"Laskar Pelangi","penulis":"Andrea Hirata","tahun":2005,"stok":5}'

# 4. Detail -> 200; id tidak ada -> 404
curl -i http://localhost:3008/buku/1
curl -i http://localhost:3008/buku/999999

# 5. Update sebagian -> 200
curl -i -X PATCH http://localhost:3008/buku/1 \
  -H "Content-Type: application/json" \
  -d '{"stok":10}'

# 6. Hapus -> 204
curl -i -X DELETE http://localhost:3008/buku/1

# 7. Validasi gagal -> 400
curl -i -X POST http://localhost:3008/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"","penulis":"X","tahun":5}'
```

### Hasil (isi setelah Anda menjalankan sendiri)

| No | Perintah | Status diharapkan | Status hasil |
|----|----------|-------------------|--------------|
| 1 | GET /health | 200 | |
| 2 | GET /buku | 200 | |
| 3 | POST /buku | 201 | |
| 4a | GET /buku/1 | 200 | |
| 4b | GET /buku/999999 | 404 | |
| 5 | PATCH /buku/1 | 200 | |
| 6 | DELETE /buku/1 | 204 | |
| 7 | POST /buku (data tidak valid) | 400 | |
