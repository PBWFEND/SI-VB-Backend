# Pertemuan 7 - CRUD REST API dengan Pola Service dan Controller

Nama dan NIM: Lintang Azzahra Govarana (240160221021)

Tugas 5: REST API Express.js untuk resource buku dengan database SQLite melalui Prisma ORM, dipisah menjadi lapisan route, controller, dan service. Latihan (`latihan.ts`) menerapkan pola yang sama pada resource pengguna.

## Alur lapisan

```
Request -> app.ts (middleware) -> routes -> controller -> service -> Prisma -> database
```

| Lapisan | File | Tugas | Tidak boleh |
|:--|:--|:--|:--|
| App | app.ts | Menyusun middleware, router, handler 404, error handler | Menulis validasi atau query |
| Route | src/routes/buku.routes.ts | Mengelompokkan endpoint | Memvalidasi atau menyentuh Prisma |
| Controller | src/controller/buku.controller.ts | Validasi input, kode status, bentuk response | Menulis query database |
| Service | src/service/buku.service.ts | Operasi Prisma Client | Mengetahui kode status HTTP |

Validasi ada di controller (bukan service) supaya kesalahan input bisa dijawab 400, berbeda dari kesalahan server yang 500.

## Cara menjalankan

Syarat: Node.js versi 22 atau lebih baru.

```
npm install
copy .env.example .env
npx prisma@7 migrate dev --name init
npx prisma@7 generate
npm start
```

Server berjalan di `http://localhost:3008`. Latihan pengguna: `npm run latihan` (port 3009).

## Endpoint buku

| Method | Endpoint | Fungsi | Status |
|:--|:--|:--|:--|
| GET | /buku | Daftar buku, filter ?penulis= dan ?minStok= | 200 / 400 |
| GET | /buku/:id | Detail satu buku | 200 / 400 / 404 |
| POST | /buku | Menambah buku (judul, penulis, tahun wajib; stok opsional) | 201 / 400 |
| PATCH | /buku/:id | Mengubah sebagian data buku | 200 / 400 / 404 |
| DELETE | /buku/:id | Menghapus buku | 204 / 404 |

Format response: sukses `{ success: true, message, data }`, error `{ success: false, message, details? }`.

## Penguatan validasi

- Parameter id dibaca lewat gerbang `typeof`, lalu dicek bilangan bulat positif.
- Semua pesan error dikumpulkan dan dikirim sekaligus dengan status 400.
- tahun dibatasi 1000 sampai 2100 pada POST dan PATCH.
- Query minStok yang bukan angka ditolak dengan 400.
- PATCH tanpa field yang valid ditolak dengan 400.
- Body JSON yang rusak dijawab 400 (bukan 500).

## Hasil pengujian buku

| No | Request | Status |
|:--|:--|:--|
| 1 | GET /buku (database kosong) | 200 |
| 2 | POST /buku data lengkap | 201 |
| 3 | POST /buku tanpa stok (default 0) | 201 |
| 4 | POST /buku data tidak valid | 400 |
| 5 | GET /buku | 200 |
| 6 | GET /buku?penulis=Andi | 200 |
| 7 | GET /buku?minStok=1 | 200 |
| 8 | GET /buku?minStok=abc | 400 |
| 9 | GET /buku/1 | 200 |
| 10 | GET /buku/99 | 404 |
| 11 | GET /buku/abc | 400 |
| 12 | PATCH /buku/1 (stok 8) | 200 |
| 13 | PATCH /buku/1 (stok -5) | 400 |
| 14 | PATCH /buku/1 (tahun 3000) | 400 |
| 15 | PATCH /buku/1 (body kosong) | 400 |
| 16 | PATCH /buku/99 | 404 |
| 17 | DELETE /buku/2 | 204 |
| 18 | GET /buku/2 setelah dihapus | 404 |
| 19 | GET /tidak-ada | 404 |
| 20 | POST /buku dengan JSON rusak | 400 |

Setelah server dihentikan dan dijalankan ulang, data buku masih ada (tersimpan permanen di database).

## Hasil pengujian latihan pengguna

| No | Request | Status |
|:--|:--|:--|
| 1 | GET /pengguna | 200 |
| 2 | POST /pengguna data lengkap | 201 |
| 3 | POST /pengguna dengan nim yang sama | 409 |
| 4 | POST /pengguna data tidak valid | 400 |
| 5 | GET /pengguna?nim=240160221021 | 200 |
| 6 | DELETE /pengguna/240160221021 | 204 |
| 7 | DELETE /pengguna/240160221021 lagi | 404 |
| 8 | GET /pengguna setelah dihapus | 200 |

## Catatan

- File `.env`, `node_modules`, dan file `.db` tidak disertakan dalam pengumpulan.
- Migration tersimpan di `prisma/migrations`.