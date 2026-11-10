# Pertemuan 7 — CRUD REST API: Pola Lapis (Service / Controller / Routes)

Implementasi pola berarsitektur lapis (*layered architecture*) pada resource **Pengguna** (`Pengguna`) menggunakan Express.js, TypeScript, dan Prisma ORM dengan database SQLite.

- **Nama**: Sutiawan
- **NIM**: 240160221046
- **Mata Kuliah**: Praktikum Pemrograman Backend

---

## Pembagian Lapisan (*Separation of Concerns*)

1. **Service Layer** (`ambilDaftarPengguna`, `ambilPengguna`, `buatPengguna`, `hapusPengguna`):
   - Bertanggung jawab murni pada operasi database melalui Prisma Client.
   - Netral terhadap status code HTTP dan format request.
2. **Validator Layer** (`validasiPengguna`):
   - Memeriksa kelengkapan dan format field (`nim`, `nama`, `email`, `role`).
   - Memisahkan tanggung jawab validasi dari logika persistensi data.
3. **Route / Controller Layer** (`penggunaRoutes`):
   - Menangani request/response HTTP, parsing query/body/param, dan status code (`200`, `201`, `204`, `400`, `404`).

---

## Cara Menjalankan

```powershell
cd d:\Backend\240160221046\Pertemuan-07

# 1. Jalankan server latihan (port 3009)
node --experimental-strip-types latihan.ts

# Atau jalankan server utama (resource Buku di port 3008)
node --experimental-strip-types server.ts
```

---

## Endpoint Tersedia & Hasil Pengujian

### 1. `GET /pengguna` — Daftar Pengguna (TODO 1)
Mengambil daftar pengguna dari database dengan filter `?nim=...` opsional.

```powershell
curl.exe -i "http://localhost:3009/pengguna?nim=240160221046"
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Daftar pengguna",
  "data": [
    {
      "id": 1,
      "nim": "240160221046",
      "nama": "Sutiawan",
      "email": "sutiawan@kampus.ac.id",
      "role": "mahasiswa"
    }
  ]
}
```

### 2. `POST /pengguna` — Tambah Pengguna Baru (TODO 2 & TODO 3)

#### Validasi Gagal (`400 Bad Request`):
```powershell
Invoke-RestMethod -Method POST -Uri "http://localhost:3009/pengguna" `
  -ContentType "application/json" `
  -Body '{"nama":"Sutiawan"}'
```

**Response:**
```json
{
  "success": false,
  "message": "Data pengguna tidak valid",
  "details": [
    "Field nim wajib diisi",
    "Field email wajib diisi"
  ]
}
```

#### Berhasil Dibuat (`201 Created`):
```powershell
Invoke-RestMethod -Method POST -Uri "http://localhost:3009/pengguna" `
  -ContentType "application/json" `
  -Body '{"nim":"240160221046","nama":"Sutiawan","email":"sutiawan@kampus.ac.id","role":"mahasiswa"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Pengguna berhasil dibuat",
  "data": {
    "id": 1,
    "nim": "240160221046",
    "nama": "Sutiawan",
    "email": "sutiawan@kampus.ac.id",
    "role": "mahasiswa"
  }
}
```

### 3. `DELETE /pengguna/:nim` — Hapus Pengguna (TODO 4)

#### Berhasil Dihapus (`204 No Content`):
```powershell
curl.exe -i -X DELETE http://localhost:3009/pengguna/240160221046
```

**Response:**
```http
HTTP/1.1 204 No Content
```

#### NIM Tidak Ditemukan (`404 Not Found`):
```powershell
curl.exe -i -X DELETE http://localhost:3009/pengguna/240160221046
```

**Response:**
```json
{
  "success": false,
  "message": "Pengguna tidak ditemukan"
}
```

