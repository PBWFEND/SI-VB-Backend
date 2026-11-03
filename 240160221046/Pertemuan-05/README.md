# Pertemuan 5 - Latihan RESTful API Mahasiswa

Aplikasi Express.js untuk latihan RESTful API dengan resource **mahasiswa**, meliputi middleware logger, filter query, route parameter, POST dengan validasi, PATCH, dan handler 404.

## Cara Menjalankan

```bash
npm install     # sekali saja
node latihan.js # port 3007

# Atau jalankan server demo (port 3006)
node server.js
```

---

## Endpoint Tersedia

| Method | URL | Deskripsi | Status |
|--------|-----|-----------|--------|
| `GET` | `/mahasiswa` | Semua mahasiswa | `200` |
| `GET` | `/mahasiswa?prodi=...` | Filter berdasarkan prodi | `200` |
| `GET` | `/mahasiswa?angkatan=...` | Filter berdasarkan angkatan | `200` |
| `GET` | `/mahasiswa/:nim` | Detail mahasiswa by NIM | `200` / `404` |
| `POST` | `/mahasiswa` | Tambah mahasiswa baru | `201` / `400` |
| `PATCH` | `/mahasiswa/:nim` | Ubah sebagian data mahasiswa | `200` / `404` |

---

## Hasil Pengujian

### 1. `GET /mahasiswa` — Semua data (`200`)

```powershell
curl.exe -i http://localhost:3007/mahasiswa
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": {
    "total": 3,
    "data": [
      { "nim": "F1D022001", "nama": "Jhon Doe", "prodi": "Sistem Informasi", "angkatan": 2024 },
      { "nim": "F1D022002", "nama": "Ani Lestari", "prodi": "Sistem Informasi", "angkatan": 2023 },
      { "nim": "F1D022003", "nama": "Budi Santoso", "prodi": "Teknik Informatika", "angkatan": 2024 }
    ]
  }
}
```

---

### 2. `GET /mahasiswa?prodi=Sistem%20Informasi` — Filter prodi (`200`)

```powershell
curl.exe -i "http://localhost:3007/mahasiswa?prodi=Sistem%20Informasi"
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": {
    "total": 2,
    "data": [
      { "nim": "F1D022001", "nama": "Jhon Doe", "prodi": "Sistem Informasi", "angkatan": 2024 },
      { "nim": "F1D022002", "nama": "Ani Lestari", "prodi": "Sistem Informasi", "angkatan": 2023 }
    ]
  }
}
```

---

### 3. `GET /mahasiswa/:nim` — Ditemukan (`200`)

```powershell
curl.exe -i http://localhost:3007/mahasiswa/F1D022001
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Detail mahasiswa berhasil diambil",
  "data": { "nim": "F1D022001", "nama": "Jhon Doe", "prodi": "Sistem Informasi", "angkatan": 2024 }
}
```

### `GET /mahasiswa/:nim` — NIM tidak ditemukan (`404`)

```powershell
curl.exe -i http://localhost:3007/mahasiswa/F9999999
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Mahasiswa dengan NIM F9999999 tidak ditemukan"
}
```

---

### 4. `POST /mahasiswa` — Berhasil (`201`)

```powershell
Invoke-RestMethod -Method POST -Uri http://localhost:3007/mahasiswa `
  -ContentType "application/json" `
  -Body '{"nim":"F1D022099","nama":"Dewi Putri","prodi":"Sistem Informasi","angkatan":2025}'
```

**Response `201 Created`:**
```json
{
  "success": true,
  "message": "Mahasiswa berhasil ditambahkan",
  "data": { "nim": "F1D022099", "nama": "Dewi Putri", "prodi": "Sistem Informasi", "angkatan": 2025 }
}
```

### `POST /mahasiswa` — Validasi gagal (`400`)

```powershell
Invoke-RestMethod -Method POST -Uri http://localhost:3007/mahasiswa `
  -ContentType "application/json" `
  -Body '{"nama":"Tanpa NIM"}'
```

**Response `400 Bad Request`:**
```json
{
  "success": false,
  "message": "Data mahasiswa tidak valid",
  "details": [
    "Field nim wajib diisi",
    "Field prodi wajib diisi",
    "Field angkatan wajib diisi"
  ]
}
```

---

### 5. `PATCH /mahasiswa/:nim` — Berhasil (`200`)

```powershell
Invoke-RestMethod -Method PATCH -Uri http://localhost:3007/mahasiswa/F1D022001 `
  -ContentType "application/json" `
  -Body '{"angkatan":2025}'
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diperbarui",
  "data": { "nim": "F1D022001", "nama": "Jhon Doe", "prodi": "Sistem Informasi", "angkatan": 2025 }
}
```

### `PATCH /mahasiswa/:nim` — NIM tidak ditemukan (`404`)

```powershell
Invoke-RestMethod -Method PATCH -Uri http://localhost:3007/mahasiswa/F9999999 `
  -ContentType "application/json" `
  -Body '{"angkatan":2025}'
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Mahasiswa dengan NIM F9999999 tidak ditemukan"
}
```

---

### 6. Endpoint tidak tersedia — Handler 404 (`404`)

```powershell
curl.exe -i http://localhost:3007/tidak-ada
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Endpoint GET /tidak-ada tidak ditemukan"
}
```

---

## Middleware Logger

Setiap request dicatat di terminal:

```
[2026-11-02T23:49:40.073Z] GET /mahasiswa
[2026-11-02T23:49:46.225Z] GET /mahasiswa?prodi=Sistem%20Informasi
[2026-11-02T23:49:52.032Z] GET /mahasiswa/F1D022001
[2026-11-02T23:49:52.118Z] GET /mahasiswa/F9999999
[2026-11-02T23:50:00.312Z] POST /mahasiswa
[2026-11-02T23:50:06.215Z] POST /mahasiswa
[2026-11-02T23:50:12.430Z] PATCH /mahasiswa/F1D022001
[2026-11-02T23:50:18.109Z] PATCH /mahasiswa/F9999999
```

