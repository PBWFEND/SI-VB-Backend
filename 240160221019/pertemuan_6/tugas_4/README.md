# Tugas 4 — Integrasi Database dan ORM untuk REST API

Project REST API untuk resource **Buku** menggunakan Express + Prisma + SQLite.

**Nama:** Kikan Khairani  
**NPM:** 240160221019  
**Kelas:** SI  
**Mata Kuliah:** Pemrograman Backend

## Prasyarat

- Node.js v20+
- npm

## Langkah Instalasi

1. Clone atau siapkan repository project.
2. Jalankan perintah `npm install`.
3. Salin file `.env.example` menjadi `.env` jika tersedia.
4. Jalankan migrasi database:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Generate Prisma Client:

   ```bash
   npx prisma generate
   ```

## Cara Menjalankan

Jalankan perintah:

```bash
npm start
```

Server berjalan di:

`http://localhost:3008`

## Contoh Request

### 1. GET Semua Buku

```http
GET http://localhost:3008/buku
```

### 2. GET Detail Buku

```http
GET http://localhost:3008/buku/1
```

### 3. POST Tambah Buku

```json
{
  "judul": "Pemrograman Node.js",
  "penulis": "Kikan Khairani",
  "tahun": 2023,
  "stok": 5
}
```

### 4. PATCH Update Buku

```json
{
  "stok": 10
}
```

### 5. DELETE Buku

```http
DELETE http://localhost:3008/buku/1
```

## Hasil Pengujian

Pengujian dilakukan menggunakan PowerShell dengan server berjalan pada port 3008.

### 1. Menjalankan Server

```powershell
npm start
```

Hasil:

```text
Server Tugas 4 berjalan di http://localhost:3008
```

### 2. POST — Menambahkan Data Buku

Perintah:

```powershell
$body = '{"judul":"Pemrograman Node.js","penulis":"Kikan Khairani","tahun":2023,"stok":5}'

Invoke-RestMethod -Uri "http://localhost:3008/buku" -Method POST -ContentType "application/json" -Body $body
```

Hasil:

```text
success : True
message : Buku berhasil dibuat
data    : @{id=1; judul=Pemrograman Node.js; penulis=Kikan Khairani; tahun=2023; stok=5}
```

### 3. GET — Mengambil Semua Data Buku

Perintah:

```powershell
Invoke-RestMethod -Uri "http://localhost:3008/buku" -Method GET
```

Hasil:

```text
success : True
message : Daftar buku berhasil diambil
data    : @{total=1; data=System.Object[]}
```

### 4. GET — Mengambil Detail Buku

Perintah:

```powershell
Invoke-RestMethod -Uri "http://localhost:3008/buku/1" -Method GET
```

Hasil:

```text
success : True
message : Detail buku berhasil diambil
data    : @{id=1; judul=Pemrograman Node.js; penulis=Kikan Khairani; tahun=2023; stok=5}
```

### 5. PATCH — Memperbarui Data Buku

Perintah:

```powershell
$body = '{"stok":10}'

Invoke-RestMethod -Uri "http://localhost:3008/buku/1" -Method PATCH -ContentType "application/json" -Body $body
```

Hasil:

```text
success : True
message : Buku berhasil diperbarui
data    : @{id=1; judul=Pemrograman Node.js; penulis=Kikan Khairani; tahun=2023; stok=10}
```

### 6. DELETE — Menghapus Data Buku

Perintah:

```powershell
Invoke-RestMethod -Uri "http://localhost:3008/buku/1" -Method DELETE
```

Perintah DELETE telah dijalankan. Terminal PowerShell tidak menampilkan isi respons.

Log server:

```text
[2026-11-02T08:25:10.113Z] POST /buku
[2026-11-02T08:25:52.511Z] GET /buku
[2026-11-02T08:26:14.086Z] GET /buku/1
[2026-11-02T08:26:59.529Z] PATCH /buku/1
[2026-11-02T08:27:21.884Z] DELETE /buku/1
```

## Kesimpulan

Berdasarkan pengujian yang telah dilakukan, REST API resource Buku berhasil dijalankan menggunakan Express, Prisma, dan SQLite. Fitur POST berhasil menambahkan data buku, GET berhasil mengambil daftar dan detail buku, serta PATCH berhasil memperbarui stok buku. Fitur DELETE juga telah dijalankan dan tercatat pada log server.

Dengan demikian, implementasi lima endpoint utama REST API telah dilakukan.