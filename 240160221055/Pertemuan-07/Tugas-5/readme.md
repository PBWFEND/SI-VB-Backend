# Tugas 5 — CRUD REST API dengan Pola Service/Controller

## Identitas

- **Nama:** Rasya Putri Ramadhani
- **NIM:** 240160221055
- **Kelas:** SI-VB

## Deskripsi Project

Project ini merupakan pengembangan resource **Anggota** dari Tugas 4 menjadi REST API dengan pola berlapis menggunakan **Route, Controller, dan Service**.

Resource utama yang digunakan adalah `anggota` dengan data:

- `id`
- `nama`
- `npm`
- `divisi`

API mendukung operasi CRUD:

- GET
- POST
- PATCH
- DELETE

Project menggunakan:

- Node.js
- Express.js
- Prisma ORM
- SQLite

---

# Struktur Project

```text
Tugas-5/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── routes/
│   │   └── anggota.routes.js
│   │
│   ├── controller/
│   │   └── anggota.controller.js
│   │
│   └── service/
│       └── anggota.service.js
│
├── .env.example
├── .gitignore
├── app.js
├── client.js
├── package.json
├── prisma.config.ts
├── README.md
└── server.js
```

---

# Alur Pola Berlapis

Project menggunakan pola:

```text
Client
   ↓
Routes
   ↓
Controller
   ↓
Service
   ↓
Prisma
   ↓
SQLite Database
```

## 1. Routes

Folder:

```text
src/routes/
```

Routes bertugas menghubungkan HTTP method dan endpoint dengan controller.

Contoh:

```text
GET     /anggota
GET     /anggota/:id
POST    /anggota
PATCH   /anggota/:id
DELETE  /anggota/:id
```

## 2. Controller

Folder:

```text
src/controller/
```

Controller bertugas untuk:

- menerima request;
- melakukan validasi input;
- mengatur status code;
- mengirim response;
- memanggil service.

## 3. Service

Folder:

```text
src/service/
```

Service bertugas menangani proses yang berhubungan dengan database menggunakan Prisma.

Contohnya:

- mengambil semua anggota;
- mengambil anggota berdasarkan ID;
- menambahkan anggota;
- memperbarui anggota;
- menghapus anggota;
- mencari anggota berdasarkan NPM.

## 4. Prisma dan Database

Prisma digunakan sebagai ORM untuk menghubungkan aplikasi dengan database SQLite.

Database digunakan untuk menyimpan data anggota.

---

# Cara Menjalankan Project

## 1. Install dependency

Jalankan:

```bash
npm install
```

## 2. Buat file `.env`

Copy file `.env.example` menjadi `.env`.

Untuk PowerShell:

```powershell
Copy-Item .env.example .env
```

## 3. Jalankan migrasi database

```bash
npx prisma migrate dev
```

## 4. Generate Prisma Client

```bash
npx prisma generate
```

## 5. Jalankan server

```bash
npm start
```

Server akan berjalan di:

```text
http://localhost:3008
```

---

# Endpoint API

## 1. GET Semua Anggota

### Endpoint

```text
GET /anggota
```

### Contoh cURL

```bash
curl http://localhost:3008/anggota
```

### Contoh Response

```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 1,
      "nama": "Rasya Putri Ramadhani",
      "npm": "240160221055",
      "divisi": "Backend"
    }
  ]
}
```

### Status Code

```text
200 OK
```

---

## 2. GET Detail Anggota

### Endpoint

```text
GET /anggota/:id
```

### Contoh cURL

```bash
curl http://localhost:3008/anggota/1
```

### Contoh Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Rasya Putri Ramadhani",
    "npm": "240160221055",
    "divisi": "Backend"
  }
}
```

### Status Code

```text
200 OK
```

Jika ID tidak ditemukan:

```text
404 Not Found
```

---

## 3. POST Tambah Anggota

### Endpoint

```text
POST /anggota
```

### Contoh cURL

```bash
curl -X POST http://localhost:3008/anggota ^
  -H "Content-Type: application/json" ^
  -d "{\"nama\":\"Rasya Putri Ramadhani\",\"npm\":\"240160221055\",\"divisi\":\"Backend\"}"
```

### Contoh Response

```json
{
  "success": true,
  "message": "Anggota berhasil ditambahkan",
  "data": {
    "id": 1,
    "nama": "Rasya Putri Ramadhani",
    "npm": "240160221055",
    "divisi": "Backend"
  }
}
```

### Status Code

```text
201 Created
```

---

## 4. PATCH Ubah Data Anggota

### Endpoint

```text
PATCH /anggota/:id
```

### Contoh cURL

```bash
curl -X PATCH http://localhost:3008/anggota/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"divisi\":\"Frontend\"}"
```

### Contoh Response

```json
{
  "success": true,
  "message": "Data anggota berhasil diperbarui",
  "data": {
    "id": 1,
    "nama": "Rasya Putri Ramadhani",
    "npm": "240160221055",
    "divisi": "Frontend"
  }
}
```

### Status Code

```text
200 OK
```

Jika ID tidak ditemukan:

```text
404 Not Found
```

---

## 5. DELETE Anggota

### Endpoint

```text
DELETE /anggota/:id
```

### Contoh cURL

```bash
curl -X DELETE http://localhost:3008/anggota/1
```

### Status Code

```text
204 No Content
```

Response akan kosong karena status `204 No Content`.

Jika ID tidak ditemukan:

```text
404 Not Found
```

---

# Validasi Input

API melakukan validasi pada endpoint write, yaitu:

- `POST /anggota`
- `PATCH /anggota/:id`

Validasi yang dilakukan meliputi:

1. Body request harus berupa object JSON.
2. Field yang diizinkan hanya:
   - `nama`
   - `npm`
   - `divisi`
3. `nama` harus berupa teks dan minimal 2 karakter.
4. `npm` harus berupa teks yang terdiri dari tepat 12 digit angka.
5. `divisi` harus berupa teks dan minimal 2 karakter.
6. Pada POST, semua field wajib diisi.
7. Pada PATCH, minimal satu field harus dikirim.
8. NPM tidak boleh digunakan oleh anggota lain.

---

# Status Code yang Digunakan

| Status Code | Keterangan |
|---|---|
| `200 OK` | Request berhasil |
| `201 Created` | Data anggota berhasil dibuat |
| `204 No Content` | Data anggota berhasil dihapus |
| `400 Bad Request` | Input atau request tidak valid |
| `404 Not Found` | Endpoint atau data tidak ditemukan |
| `500 Internal Server Error` | Terjadi kesalahan pada server |

---

# Middleware

Project menggunakan beberapa middleware:

## Logger

Mencatat method dan URL request yang masuk.

## Middleware 404

Digunakan ketika endpoint yang diakses tidak ditemukan.

Contoh response:

```json
{
  "success": false,
  "message": "Endpoint tidak ditemukan"
}
```

## Error Handler

Digunakan untuk menangani error yang terjadi pada aplikasi, termasuk error dari Prisma.

---

# Pengujian

Endpoint telah diuji menggunakan REST client/Postman dengan operasi:

1. GET semua anggota;
2. POST menambahkan anggota;
3. GET detail anggota berdasarkan ID;
4. PATCH memperbarui data anggota;
5. DELETE menghapus anggota.

Hasil pengujian menunjukkan endpoint CRUD berjalan sesuai dengan status code yang ditentukan.

---

# Kesimpulan

Project Tugas 5 mengembangkan resource `anggota` dari Tugas 4 menggunakan pola berlapis Route, Controller, dan Service. Pemisahan tersebut membuat kode lebih terstruktur karena setiap bagian memiliki tanggung jawab masing-masing. API mendukung operasi CRUD lengkap, validasi input, middleware 404, error handler, serta integrasi database menggunakan Prisma dan SQLite.