# Tugas 3 — Perancangan dan Implementasi RESTful API

**Mata Kuliah:** Backend Development (CPMK117)  
**Nama:** [Zhilan Maulana]  
**NIM:** [240160221049]  
**Kelas:** [SI-VB]

RESTful API untuk resource **buku perpustakaan** menggunakan Express.js 5,
dengan desain resource-based, CRUD lengkap (GET/POST/PUT/PATCH/DELETE),
validasi input, status code konsisten, serta handler 404/error.

---

## Struktur Project

```text
tugas-3/<nim>-<nama>/pertemuan-05/
├── package.json
├── .gitignore
├── app.js                    # Express app
├── server.js                 # Entry point (listen)
├── routes/
│   └── buku.routes.js        # Router /buku (semua endpoint)
├── middleware/
│   ├── logger.js             # Logger request
│   └── errorHandler.js       # 404 + error middleware
├── utils/
│   ├── response.js           # sendSuccess/sendError
│   └── validate.js           # validasi payload buku
├── data/
│   └── buku.js               # Database in-memory
└── README.md
```

---

## Cara Menjalankan

```bash
npm install
npm start
# atau: npm run dev  (auto-restart)
```

Server berjalan di `http://localhost:3006`.

Environment variable:

```bash
PORT=4050 npm start
```

---

## Tabel Kontrak Endpoint

| No. | Kebutuhan | Method | Endpoint | Body | Status Sukses |
|:---:|:----------|:-------|:---------|:-----|:-------------:|
| 1 | Info API | GET | `/` | — | 200 |
| 2 | Health check | GET | `/health` | — | 200 |
| 3 | Daftar semua buku | GET | `/buku` | — | 200 |
| 4 | Filter daftar | GET | `/buku?penulis=&kategori=&minStok=&tersedia=` | — | 200 |
| 5 | Detail buku | GET | `/buku/:id` | — | 200 |
| 6 | Create buku | POST | `/buku` | `{judul, penulis, tahun, stok, kategori?}` | 201 |
| 7 | Replace buku | PUT | `/buku/:id` | `{judul, penulis, tahun, stok, kategori?}` (lengkap) | 200 |
| 8 | Partial update | PATCH | `/buku/:id` | field apa saja yang ingin diubah | 200 |
| 9 | Delete buku | DELETE | `/buku/:id` | — | 204 |

**Error yang mungkin:**

| Situasi | Status |
|:--------|:------:|
| Body/param/query tidak valid | 400 |
| Buku tidak ditemukan | 404 |
| Endpoint tidak ada | 404 |
| Error tak terduga | 500 |

---

## Field Resource `buku`

| Field | Tipe | Wajib | Aturan |
|:------|:-----|:-----:|:-------|
| `id` | integer | (server) | auto-increment, read-only |
| `judul` | string | ✅ | non-kosong |
| `penulis` | string | ✅ | non-kosong |
| `tahun` | integer | ✅ | 1900–2100 |
| `stok` | integer | ✅ | ≥ 0 |
| `kategori` | string | ❌ | opsional |

**Catatan:** `tersedia` bukan field — diturunkan dari `stok > 0` (filter `?tersedia=true`).

---

## Contoh Request & Response

### 1. Daftar buku

```bash
curl -i http://localhost:3006/buku
```

```http
HTTP/1.1 200 OK

{
  "success": true,
  "message": "Daftar buku berhasil diambil",
  "data": {
    "total": 3,
    "filter": {},
    "data": [
      { "id": 1, "judul": "Belajar Node.js", "penulis": "Andi", "tahun": 2024, "stok": 3, "kategori": "Pemrograman" },
      { "id": 2, "judul": "Dasar Express.js", "penulis": "Budi", "tahun": 2025, "stok": 0, "kategori": "Pemrograman" },
      { "id": 3, "judul": "REST API untuk Pemula", "penulis": "Citra", "tahun": 2025, "stok": 5, "kategori": "Web" }
    ]
  }
}
```

### 2. Filter penulis + minStok

```bash
curl -i "http://localhost:3006/buku?penulis=andi&minStok=1"
```

```http
HTTP/1.1 200 OK

{
  "success": true,
  "message": "Daftar buku berhasil diambil",
  "data": {
    "total": 1,
    "filter": { "penulis": "andi", "minStok": "1" },
    "data": [
      { "id": 1, "judul": "Belajar Node.js", "penulis": "Andi", "tahun": 2024, "stok": 3, "kategori": "Pemrograman" }
    ]
  }
}
```

### 3. Filter tersedia

```bash
curl -i "http://localhost:3006/buku?tersedia=false"
```

```http
HTTP/1.1 200 OK

{
  "success": true,
  "data": {
    "total": 1,
    "filter": { "tersedia": "false" },
    "data": [ { "id": 2, "judul": "Dasar Express.js", ..., "stok": 0 } ]
  }
}
```

### 4. Detail buku

```bash
curl -i http://localhost:3006/buku/1
```

```http
HTTP/1.1 200 OK

{
  "success": true,
  "message": "Detail buku berhasil diambil",
  "data": { "id": 1, "judul": "Belajar Node.js", "penulis": "Andi", "tahun": 2024, "stok": 3, "kategori": "Pemrograman" }
}
```

### 5. Detail tidak ditemukan

```bash
curl -i http://localhost:3006/buku/99
```

```http
HTTP/1.1 404 Not Found

{
  "success": false,
  "message": "Buku dengan id 99 tidak ditemukan"
}
```

### 6. POST valid

```bash
curl -i -X POST http://localhost:3006/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"Clean Code","penulis":"Robert C. Martin","tahun":2008,"stok":2,"kategori":"Pemrograman"}'
```

```http
HTTP/1.1 201 Created

{
  "success": true,
  "message": "Buku berhasil dibuat",
  "data": {
    "id": 4,
    "judul": "Clean Code",
    "penulis": "Robert C. Martin",
    "tahun": 2008,
    "stok": 2,
    "kategori": "Pemrograman"
  }
}
```

### 7. POST tidak valid

```bash
curl -i -X POST http://localhost:3006/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"Tanpa Penulis","tahun":2020}'
```

```http
HTTP/1.1 400 Bad Request

{
  "success": false,
  "message": "Data buku tidak valid",
  "details": [
    "Field penulis wajib diisi",
    "Field stok wajib diisi"
  ]
}
```

### 8. PUT — replace

```bash
curl -i -X PUT http://localhost:3006/buku/1 \
  -H "Content-Type: application/json" \
  -d '{"judul":"Belajar Node.js Lanjutan","penulis":"Andi","tahun":2026,"stok":4}'
```

```http
HTTP/1.1 200 OK

{
  "success": true,
  "message": "Buku berhasil diganti",
  "data": { "id": 1, "judul": "Belajar Node.js Lanjutan", "penulis": "Andi", "tahun": 2026, "stok": 4 }
}
```

### 9. PATCH — partial

```bash
curl -i -X PATCH http://localhost:3006/buku/2 \
  -H "Content-Type: application/json" \
  -d '{"stok":4}'
```

```http
HTTP/1.1 200 OK

{
  "success": true,
  "message": "Buku berhasil diperbarui",
  "data": { "id": 2, "judul": "Dasar Express.js", "penulis": "Budi", "tahun": 2025, "stok": 4, "kategori": "Pemrograman" }
}
```

### 10. DELETE — 204 tanpa body

```bash
curl -i -X DELETE http://localhost:3006/buku/3
```

```http
HTTP/1.1 204 No Content
```

### 11. Endpoint tidak ada

```bash
curl -i http://localhost:3006/tidak-ada
```

```http
HTTP/1.1 404 Not Found

{
  "success": false,
  "message": "Endpoint GET /tidak-ada tidak ditemukan"
}
```

---

## Bukti Pengujian

| No. | Skenario | Method + URL | Status | Hasil |
|:---:|:---------|:-------------|:------:|:------|
| 1 | Info | `GET /` | 200 | Daftar endpoint |
| 2 | Health | `GET /health` | 200 | `status: up` |
| 3 | Daftar | `GET /buku` | 200 | 3 buku |
| 4 | Filter penulis | `GET /buku?penulis=andi` | 200 | 1 buku |
| 5 | Filter minStok | `GET /buku?minStok=3` | 200 | 2 buku (stok 3,5) |
| 6 | Filter tersedia=false | `GET /buku?tersedia=false` | 200 | 1 buku (stok 0) |
| 7 | Filter invalid | `GET /buku?tersedia=yes` | 400 | Query invalid |
| 8 | Detail ada | `GET /buku/1` | 200 | Objek buku |
| 9 | Detail tidak ada | `GET /buku/99` | 404 | Error |
| 10 | Id bukan angka | `GET /buku/abc` | 400 | Error |
| 11 | Create valid | `POST /buku` | 201 | Buku baru (id 4) |
| 12 | Create tanpa penulis | `POST /buku` | 400 | Details array |
| 13 | Create stok negatif | `POST /buku` `{"stok":-1,...}` | 400 | Details array |
| 14 | PUT valid | `PUT /buku/1` | 200 | Buku ter-replace |
| 15 | PUT tidak lengkap | `PUT /buku/1` `{"stok":4}` | 400 | Field wajib hilang |
| 16 | PUT tidak ada | `PUT /buku/99` | 404 | Error |
| 17 | PATCH valid | `PATCH /buku/2` `{"stok":4}` | 200 | Buku ter-update |
| 18 | PATCH tidak ada | `PATCH /buku/99` | 404 | Error |
| 19 | DELETE valid | `DELETE /buku/3` | 204 | Tanpa body |
| 20 | DELETE tidak ada | `DELETE /buku/99` | 404 | Error |
| 21 | Endpoint tidak ada | `GET /tidak-ada` | 404 | Error |

---

## Catatan Teknis

### 1. Desain resource-based
- `/buku` bukan `/ambilBuku`, `/buatBuku`, `/hapusBuku`.
- Operasi dinyatakan oleh **method HTTP**, bukan path.
- `GET /buku/1` (bukan `GET /buku?id=1`) karena `id` adalah identifier resource.

### 2. PUT vs PATCH
| Aspek | PUT | PATCH |
|:------|:----|:------|
| Body | seluruh field wajib | hanya field yang diubah |
| Validasi | `partial=false` | `partial=true` |
| Field hilang | → `400` (wajib) | → diabaikan |
| Idempoten | Ya | Bergantung implementasi |

### 3. Query parameter (minimal 2 — terpenuhi 4)
| Query | Tipe | Contoh |
|:------|:-----|:-------|
| `penulis` | string (partial, case-insensitive) | `?penulis=andi` |
| `kategori` | string (exact, case-insensitive) | `?kategori=web` |
| `minStok` | integer ≥ 0 | `?minStok=3` |
| `tersedia` | `true`/`false` | `?tersedia=true` |

### 4. Status code yang dipakai
| Kode | Kapan |
|:----:|:------|
| `200` | GET/PUT/PATCH berhasil |
| `201` | POST berhasil membuat |
| `204` | DELETE berhasil (tanpa body) |
| `400` | Body/param/query tidak valid |
| `404` | Resource/endpoint tidak ditemukan |
| `500` | Error tak terduga |

### 5. Struktur response konsisten
```json
// sukses
{ "success": true, "message": "...", "data": {...} }

// error
{ "success": false, "message": "...", "details": ["..."] }
```

### 6. Middleware order
```text
express.json()  →  logger  →  routes  →  notFound  →  errorHandler
```

### 7. Etika AI
- AI dipakai untuk: review urutan middleware, contoh `curl`, debugging.
- AI **tidak** dipakai untuk: menghasilkan seluruh file.
- Setiap endpoint diuji manual dengan `curl` sebelum commit.

### 8. Tidak di-commit
- `node_modules/` → `.gitignore`
- `.env` (bila memakai rahasia)
- `package-lock.json` **harus** di-commit

---

## Penghentian Server

Tekan `Ctrl+C`.