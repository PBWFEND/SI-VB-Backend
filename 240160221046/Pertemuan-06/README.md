# Pertemuan 6 - Latihan Database & ORM (Prisma + SQLite)

Aplikasi Express.js dan Prisma Client untuk mengelola resource **Pengguna** (`Pengguna`) dengan SQLite.

---

## Struktur Folder & Penjelasan File

- `prisma/schema.prisma`: Skema database berisi model `Buku` dan `Pengguna`.
- `prisma/dev.db`: Database SQLite lokal.
- `prisma/generated/`: Folder client yang dihasilkan otomatis oleh Prisma (`npx prisma generate`).
- `client.ts`: Singleton instance PrismaClient yang menghubungkan driver adapter `better-sqlite3`.
- `latihan.ts`: Server Express untuk latihan endpoint CRUD model `Pengguna`.
- `.env`: Konfigurasi database URL dan port.

---

## Cara Menjalankan

```powershell
cd d:\Backend\240160221046\Pertemuan-06

# 1. Jalankan server latihan (port 3009)
node --experimental-strip-types latihan.ts

# Atau jalankan server utama resource Buku (port 3008)
node --experimental-strip-types server.ts
```

---

## Daftar Endpoint Latihan (`Pengguna`)

| Method | Endpoint | Keterangan | Status Code |
|--------|----------|------------|-------------|
| `GET` | `/pengguna` | Menampilkan seluruh data pengguna | `200` |
| `GET` | `/pengguna/:nim` | Mengambil detail pengguna berdasarkan NIM | `200` / `404` |
| `POST` | `/pengguna` | Menambahkan pengguna baru (validasi: nim, nama, email, role) | `201` / `400` |
| `PATCH` | `/pengguna/:nim` | Memperbarui nama, email, atau role | `200` / `400` / `404` |
| `DELETE` | `/pengguna/:nim` | Menghapus pengguna berdasarkan NIM | `204` / `404` |

---

## Hasil Pengujian Endpoint

### 1. `POST /pengguna` — Validasi Berhasil (`201 Created`)

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

### 2. `POST /pengguna` — Validasi Field Wajib Gagal (`400 Bad Request`)

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
    "Field email wajib diisi",
    "Field role wajib diisi"
  ]
}
```

### 3. `GET /pengguna/:nim` — Ditemukan (`200 OK`)

```powershell
curl.exe -i http://localhost:3009/pengguna/240160221046
```

**Response:**
```json
{
  "success": true,
  "message": "Detail pengguna berhasil diambil",
  "data": {
    "id": 1,
    "nim": "240160221046",
    "nama": "Sutiawan",
    "email": "sutiawan@kampus.ac.id",
    "role": "mahasiswa"
  }
}
```

### 4. `GET /pengguna/:nim` — Tidak Ditemukan (`404 Not Found`)

```powershell
curl.exe -i http://localhost:3009/pengguna/F9999999
```

**Response:**
```json
{
  "success": false,
  "message": "Pengguna tidak ditemukan"
}
```

### 5. `PATCH /pengguna/:nim` — Memperbarui Data (`200 OK`)

```powershell
Invoke-RestMethod -Method PATCH -Uri "http://localhost:3009/pengguna/240160221046" `
  -ContentType "application/json" `
  -Body '{"role":"admin","nama":"Sutiawan M.Kom"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Pengguna berhasil diperbarui",
  "data": {
    "id": 1,
    "nim": "240160221046",
    "nama": "Sutiawan M.Kom",
    "email": "sutiawan@kampus.ac.id",
    "role": "admin"
  }
}
```

### 6. `DELETE /pengguna/:nim` — Berhasil Menghapus (`204 No Content`)

```powershell
curl.exe -i -X DELETE http://localhost:3009/pengguna/240160221046
```

**Response:**
```http
HTTP/1.1 204 No Content
```

