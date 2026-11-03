# Pertemuan 4 - Latihan Express.js

Aplikasi Express.js sederhana untuk latihan **routing**, **middleware**, **route parameter**, **query parameter**, dan **POST endpoint**.

## Cara Menjalankan

```bash
# Instal dependensi (sekali saja)
npm install

# Jalankan server latihan (port 3005)
node latihan.js

# Atau jalankan server demo utama (port 3004)
node server.js
```

---

## Endpoint Tersedia

| Method | URL | Deskripsi |
|--------|-----|-----------|
| `GET` | `/buku` | Semua buku |
| `GET` | `/buku?tersedia=true` | Filter buku yang tersedia |
| `GET` | `/buku?tersedia=false` | Filter buku yang tidak tersedia |
| `GET` | `/buku/:id` | Detail buku berdasarkan id |
| `POST` | `/buku` | Tambah buku baru |

---

## Hasil Pengujian dengan curl / PowerShell

### 1. `GET /buku` — Semua buku

```powershell
curl -i http://localhost:3005/buku
```

**Response `200 OK`:**
```json
{
  "success": true,
  "total": 3,
  "data": [
    { "id": 1, "judul": "Belajar Node.js", "penulis": "Andi", "tersedia": true },
    { "id": 2, "judul": "Dasar Express.js", "penulis": "Budi", "tersedia": false },
    { "id": 3, "judul": "REST API untuk Pemula", "penulis": "Citra", "tersedia": true }
  ]
}
```

---

### 2. `GET /buku?tersedia=true` — Filter buku tersedia

```powershell
curl -i "http://localhost:3005/buku?tersedia=true"
```

**Response `200 OK`:**
```json
{
  "success": true,
  "total": 2,
  "data": [
    { "id": 1, "judul": "Belajar Node.js", "penulis": "Andi", "tersedia": true },
    { "id": 3, "judul": "REST API untuk Pemula", "penulis": "Citra", "tersedia": true }
  ]
}
```

### `GET /buku?tersedia=false` — Filter buku tidak tersedia

```powershell
curl -i "http://localhost:3005/buku?tersedia=false"
```

**Response `200 OK`:**
```json
{
  "success": true,
  "total": 1,
  "data": [
    { "id": 2, "judul": "Dasar Express.js", "penulis": "Budi", "tersedia": false }
  ]
}
```

---

### 3. `GET /buku/:id` — Detail buku (ditemukan)

```powershell
curl -i http://localhost:3005/buku/1
```

**Response `200 OK`:**
```json
{
  "success": true,
  "data": { "id": 1, "judul": "Belajar Node.js", "penulis": "Andi", "tersedia": true }
}
```

### `GET /buku/:id` — id tidak ditemukan

```powershell
curl -i http://localhost:3005/buku/99
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Buku tidak ditemukan"
}
```

---

### 4. `POST /buku` — Tambah buku baru (berhasil)

```powershell
Invoke-RestMethod -Method POST -Uri "http://localhost:3005/buku" `
  -ContentType "application/json" `
  -Body '{"judul":"Clean Code","penulis":"Robert Martin","tersedia":true}'
```

**Response `201 Created`:**
```json
{
  "success": true,
  "data": { "id": 4, "judul": "Clean Code", "penulis": "Robert Martin", "tersedia": true }
}
```

### `POST /buku` — Validasi field wajib (gagal)

```powershell
Invoke-RestMethod -Method POST -Uri "http://localhost:3005/buku" `
  -ContentType "application/json" `
  -Body '{"judul":"Tanpa Penulis"}'
```

**Response `400 Bad Request`:**
```json
{
  "success": false,
  "message": "Field judul dan penulis wajib diisi"
}
```

---

### 5. Endpoint tidak tersedia — Handler 404

```powershell
curl -i http://localhost:3005/tidak-ada
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

Setiap request dicatat otomatis di terminal dengan format:

```
[2026-11-02T23:42:29.430Z] GET /buku
[2026-11-02T23:42:33.168Z] GET /buku?tersedia=true
[2026-11-02T23:42:37.596Z] GET /buku/1
[2026-11-02T23:42:37.686Z] GET /buku/99
[2026-11-02T23:42:54.010Z] POST /buku
```

