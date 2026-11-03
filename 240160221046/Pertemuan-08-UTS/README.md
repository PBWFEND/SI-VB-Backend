# Pertemuan 8 — UTS: Mini Project REST API (Domain E-Warung)

Proyek Ujian Tengah Semester (UTS) mata kuliah **Praktikum Pemrograman Backend** berupa implementasi REST API yang utuh, persisten ke database SQLite melalui Prisma ORM, menerapkan arsitektur berlapis (*layered architecture*), dan memvalidasi seluruh input secara ketat.

- **Nama**: Sutiawan
- **NIM**: 240160221046
- **Kelas**: SI-VB
- **Mata Kuliah**: Praktikum Pemrograman Backend
- **Dosen Pengampu**: Yana Yuli Sofiyan, M.Kom.
- **Domain Pilihan**: **E-Warung**
- **Resource Utama**: `menu` (Model Prisma: `Menu`)

---

## 1. Arsitektur Berlapis (*Layered Architecture*)

Aplikasi memisahkan tanggung jawab kode ke dalam tiga lapisan utama (*Separation of Concerns*):

```text
HTTP Request (Client / curl)
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ 1. Route Layer (src/routes/menu.routes.ts)             │
│    - Menangani routing URL & HTTP methods              │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────┐
│ 2. Controller Layer (src/controller/menu.controller.ts)│
│    - Validasi gerbang typeof & batas rentang input     │
│    - Menentukan status code HTTP (200, 201, 204, 400)  │
│    - Menyeragamkan format response JSON                │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────┐
│ 3. Service Layer (src/service/menu.service.ts)         │
│    - Operasi query database murni (Prisma Client)      │
│    - Bebas dari ketergantungan objek req/res Express   │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────┐
│ 4. Database Layer (SQLite via client.ts & dev.db)      │
│    - Persistensi data secara permanen                  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Struktur Direktori Proyek

```text
240160221046/Pertemuan-08-UTS/
├── .env.example              # Template environment variable
├── .gitignore               # Mencegah node_modules, .env, *.db ter-commit
├── package.json              # Definisi dependensi & skrip eksekusi
├── tsconfig.json             # Konfigurasi compiler TypeScript
├── prisma.config.ts          # Konfigurasi Prisma ORM
├── client.ts                 # Singleton PrismaClient dengan driver better-sqlite3
├── app.ts                   # Express app, middleware json, logger, routes, 404 & error handler
├── server.ts                # Server entry point & graceful shutdown
├── README.md                # Dokumentasi & panduan pengujian ini
├── prisma/
│   ├── schema.prisma        # Definisi skema model Menu
│   ├── seed.ts              # Skrip data awal (seed)
│   └── migrations/          # Riwayat migrasi database SQLite
└── src/
    ├── routes/
    │   └── menu.routes.ts   # Peta endpoint URL ke controller
    ├── controller/
    │   └── menu.controller.ts # Validasi input & response HTTP
    └── service/
        └── menu.service.ts  # Logika interaksi database
```

---

## 3. Skema Database (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "sqlite"
}

generator client {
  provider = "prisma-client"
  output   = "./generated"
}

model Menu {
  id        Int      @id @default(autoincrement())
  nama      String
  harga     Int
  kategori  String
  tersedia  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 4. Cara Menyiapkan dan Menjalankan

### 1. Instalasi Dependensi
```powershell
npm install
```

### 2. Konfigurasi Environment
Salin file `.env.example` menjadi `.env`:
```powershell
cp .env.example .env
```

### 3. Migrasi Database & Generate Client
```powershell
npx prisma migrate dev --name init_menu
npx prisma generate
```

### 4. Mengisi Data Awal (Opsional / Seeding)
```powershell
npm run seed
```

### 5. Menjalankan Server
```powershell
npm start
```
*Server akan aktif pada `http://localhost:3008`.*

---

## 5. Ringkasan Endpoint API

| Method | Endpoint | Fungsi | Status Code Sukses | Status Code Gagal |
|:---|:---|:---|:---:|:---:|
| `GET` | `/` | Informasi root & daftar endpoint | `200 OK` | — |
| `GET` | `/health` | Health check & uptime server *(fitur opsional)* | `200 OK` | — |
| `GET` | `/menu` | Menampilkan seluruh menu | `200 OK` | `500` |
| `GET` | `/menu?kategori=Makanan` | Filter menu berdasarkan kategori *(fitur opsional)* | `200 OK` | `500` |
| `GET` | `/menu?tersedia=false` | Filter menu berdasarkan ketersediaan *(fitur opsional)* | `200 OK` | `500` |
| `GET` | `/menu/:id` | Detail menu berdasarkan ID | `200 OK` | `400` / `404` |
| `POST` | `/menu` | Menambah menu baru (validasi ketat) | `201 Created` | `400` |
| `PATCH` | `/menu/:id` | Memperbarui sebagian data menu | `200 OK` | `400` / `404` |
| `DELETE` | `/menu/:id` | Menghapus menu | `204 No Content` | `400` / `404` |

---

## 6. Hasil Bukti Pengujian (*Testing Evidence*)

Pengujian dilakukan menggunakan `curl.exe` pada terminal:

### A. Endpoint Informasi & Health Check
#### 1. `GET /` — Informasi Aplikasi
- **Request**:
  ```powershell
  curl.exe -i http://localhost:3008/
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "REST API E-Warung — Pertemuan 8 (UTS)",
    "author": {
      "nama": "Sutiawan",
      "nim": "240160221046",
      "mataKuliah": "Praktikum Pemrograman Backend"
    },
    "domain": "E-Warung",
    "resource": "menu",
    "endpoints": [
      "GET /health",
      "GET /menu",
      "GET /menu?kategori=...&tersedia=...",
      "GET /menu/:id",
      "POST /menu",
      "PATCH /menu/:id",
      "DELETE /menu/:id"
    ]
  }
  ```

#### 2. `GET /health` — Health Check Server
- **Request**:
  ```powershell
  curl.exe -i http://localhost:3008/health
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Server API E-Warung berjalan dengan baik",
    "data": {
      "status": "healthy",
      "timestamp": "2026-11-03T04:54:56.295Z",
      "uptime": 14.13
    }
  }
  ```

---

### B. Operasi Read & Query Filter
#### 3. `GET /menu` — Mengambil Semua Menu
- **Request**:
  ```powershell
  curl.exe -i http://localhost:3008/menu
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Daftar menu berhasil diambil",
    "total": 6,
    "data": [
      { "id": 1, "nama": "Nasi Goreng Spesial", "harga": 18000, "kategori": "Makanan", "tersedia": true },
      { "id": 2, "nama": "Ayam Geprek Sambal Bawang", "harga": 15000, "kategori": "Makanan", "tersedia": true },
      { "id": 3, "nama": "Mie Goreng Telur", "harga": 12000, "kategori": "Makanan", "tersedia": true },
      { "id": 4, "nama": "Es Teh Manis", "harga": 5000, "kategori": "Minuman", "tersedia": true },
      { "id": 5, "nama": "Kopi Susu Gula Aren", "harga": 12000, "kategori": "Minuman", "tersedia": true },
      { "id": 6, "nama": "Pisang Goreng Keju", "harga": 10000, "kategori": "Camilan", "tersedia": false }
    ]
  }
  ```

#### 4. `GET /menu?kategori=Makanan` — Filter Kategori
- **Request**:
  ```powershell
  curl.exe -i "http://localhost:3008/menu?kategori=Makanan"
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Daftar menu berhasil diambil",
    "total": 3,
    "data": [
      { "id": 1, "nama": "Nasi Goreng Spesial", "harga": 18000, "kategori": "Makanan", "tersedia": true },
      { "id": 2, "nama": "Ayam Geprek Sambal Bawang", "harga": 15000, "kategori": "Makanan", "tersedia": true },
      { "id": 3, "nama": "Mie Goreng Telur", "harga": 12000, "kategori": "Makanan", "tersedia": true }
    ]
  }
  ```

#### 5. `GET /menu?tersedia=false` — Filter Ketersediaan
- **Request**:
  ```powershell
  curl.exe -i "http://localhost:3008/menu?tersedia=false"
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Daftar menu berhasil diambil",
    "total": 1,
    "data": [
      { "id": 6, "nama": "Pisang Goreng Keju", "harga": 10000, "kategori": "Camilan", "tersedia": false }
    ]
  }
  ```

#### 6. `GET /menu/:id` — Detail Menu
- **Kasus Sukses (`200 OK`)**:
  ```powershell
  curl.exe -i http://localhost:3008/menu/1
  ```
  ```json
  {
    "success": true,
    "message": "Detail menu berhasil diambil",
    "data": {
      "id": 1,
      "nama": "Nasi Goreng Spesial",
      "harga": 18000,
      "kategori": "Makanan",
      "tersedia": true
    }
  }
  ```
- **Kasus Negatif ID Tidak Ada (`404 Not Found`)**:
  ```powershell
  curl.exe -i http://localhost:3008/menu/999
  ```
  ```json
  {
    "success": false,
    "message": "Menu dengan id 999 tidak ditemukan"
  }
  ```
- **Kasus Negatif ID Bukan Integer (`400 Bad Request`)**:
  ```powershell
  curl.exe -i http://localhost:3008/menu/abc
  ```
  ```json
  {
    "success": false,
    "message": "Parameter id harus berupa bilangan bulat positif"
  }
  ```

---

### C. Operasi Create (POST) & Validasi Ketat
#### 7. `POST /menu` — Tambah Menu Valid
- **Request**:
  ```powershell
  curl.exe -i -X POST http://localhost:3008/menu -H "Content-Type: application/json" --% -d "{\"nama\":\"Kwetiau Goreng\",\"harga\":14000,\"kategori\":\"Makanan\"}"
  ```
- **Response (`201 Created`)**:
  ```json
  {
    "success": true,
    "message": "Menu berhasil ditambahkan",
    "data": {
      "id": 8,
      "nama": "Kwetiau Goreng",
      "harga": 14000,
      "kategori": "Makanan",
      "tersedia": true
    }
  }
  ```

#### 8. `POST /menu` — Kasus Negatif (Validasi Gagal `400 Bad Request`)
- **Nama Kosong**:
  ```powershell
  curl.exe -i -X POST http://localhost:3008/menu -H "Content-Type: application/json" --% -d "{\"nama\":\"\",\"harga\":14000,\"kategori\":\"Makanan\"}"
  ```
  ```json
  {
    "success": false,
    "message": "Validasi gagal: data menu tidak valid",
    "details": ["Field nama wajib diisi dan berupa string non-kosong"]
  }
  ```
- **Harga Negatif ($<0$)**:
  ```powershell
  curl.exe -i -X POST http://localhost:3008/menu -H "Content-Type: application/json" --% -d "{\"nama\":\"Bakso\",\"harga\":-5000,\"kategori\":\"Makanan\"}"
  ```
  ```json
  {
    "success": false,
    "message": "Validasi gagal: data menu tidak valid",
    "details": ["Field harga wajib berupa bilangan bulat positif (>= 0)"]
  }
  ```
- **Tersedia Bukan Boolean**:
  ```powershell
  curl.exe -i -X POST http://localhost:3008/menu -H "Content-Type: application/json" --% -d "{\"nama\":\"Bakso\",\"harga\":15000,\"kategori\":\"Makanan\",\"tersedia\":\"yes\"}"
  ```
  ```json
  {
    "success": false,
    "message": "Validasi gagal: data menu tidak valid",
    "details": ["Field tersedia harus bertipe boolean (true/false)"]
  }
  ```

---

### D. Operasi Update (PATCH)
#### 9. `PATCH /menu/:id` — Update Parsial Valid
- **Request**:
  ```powershell
  curl.exe -i -X PATCH http://localhost:3008/menu/8 -H "Content-Type: application/json" --% -d "{\"harga\":16000,\"tersedia\":false}"
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Menu berhasil diperbarui",
    "data": {
      "id": 8,
      "nama": "Kwetiau Goreng",
      "harga": 16000,
      "kategori": "Makanan",
      "tersedia": false
    }
  }
  ```

#### 10. `PATCH /menu/:id` — Kasus Negatif
- **ID Tidak Ditemukan (`404 Not Found`)**:
  ```powershell
  curl.exe -i -X PATCH http://localhost:3008/menu/999 -H "Content-Type: application/json" --% -d "{\"harga\":16000}"
  ```
  ```json
  {
    "success": false,
    "message": "Menu dengan id 999 tidak ditemukan"
  }
  ```
- **Body Kosong (`400 Bad Request`)**:
  ```powershell
  curl.exe -i -X PATCH http://localhost:3008/menu/8 -H "Content-Type: application/json" --% -d "{}"
  ```
  ```json
  {
    "success": false,
    "message": "Request body tidak boleh kosong untuk pembaruan data"
  }
  ```

---

### E. Operasi Delete & Middleware 404
#### 11. `DELETE /menu/:id` — Hapus Menu
- **Kasus Sukses (`204 No Content`)**:
  ```powershell
  curl.exe -i -X DELETE http://localhost:3008/menu/8
  ```
  ```text
  HTTP/1.1 204 No Content
  ```
- **Kasus Gagal ID Tidak Ada (`404 Not Found`)**:
  ```powershell
  curl.exe -i -X DELETE http://localhost:3008/menu/999
  ```
  ```json
  {
    "success": false,
    "message": "Menu dengan id 999 tidak ditemukan"
  }
  ```

#### 12. Middleware 404 (Route Tak Dikenal)
- **Request**:
  ```powershell
  curl.exe -i http://localhost:3008/tidak-ada-rute
  ```
- **Response (`404 Not Found`)**:
  ```json
  {
    "success": false,
    "message": "Endpoint tidak ditemukan. Periksa kembali URL dan method HTTP Anda."
  }
  ```

---

### F. Bukti Persistensi Data (Uji Restart Server)
1. Menambahkan menu baru: `Soto Ayam Lamongan` (ID: 9).
2. Mematikan proses server Node.js (`SIGINT`).
3. Menyalakan kembali server: `npm start`.
4. Mengakses detail `GET /menu/9`:
   ```powershell
   curl.exe -i http://localhost:3008/menu/9
   ```
   **Hasil**: Data `Soto Ayam Lamongan` (ID: 9) tetap utuh dan terbaca langsung dari file database SQLite `prisma/dev.db`.

---

## 7. Refleksi & Jawaban Kuis Formatif (§12 PRD)

1. **Perbedaan data di memori vs database:**
   Data di memori (seperti variabel array JavaScript) bersifat volatil, artinya data akan hilang total saat server dimatikan, crash, atau di-restart. Database seperti SQLite menyimpan data secara persisten ke dalam media penyimpanan fisik (disk), sehingga data tetap utuh dan dapat digunakan dalam jangka panjang.
2. **Empat operasi CRUD dan method HTTP:**
   - **Create**: `POST`
   - **Read**: `GET`
   - **Update**: `PATCH` atau `PUT`
   - **Delete**: `DELETE`
3. **Mengapa status create harus `201 Created` bukan `200 OK`:**
   Kode `201 Created` secara spesifik menginformasikan kepada client bahwa request telah berhasil dan menghasilkan pembuatan (*creation*) sebuah resource baru di server.
4. **Akibat jika `express.json()` didaftarkan setelah route yang membaca `request.body`:**
   Middleware di Express berjalan secara sekuensial. Jika `express.json()` didaftarkan setelah route, maka route tersebut akan dieksekusi sebelum body stream di-parsing, sehingga `request.body` bernilai `undefined` dan validasi akan selalu gagal.
5. **Cara memastikan data persisten setelah restart:**
   Memverifikasi bahwa seluruh operasi data memanggil Prisma Client (`prisma.menu.create`, `prisma.menu.findMany`, dst.) yang menulis ke database SQLite, bukan memanipulasi variabel array lokal.
6. **Alasan validasi input dilakukan di Controller, bukan di Service:**
   Sesuai prinsip *Separation of Concerns* (pemisahan tanggung jawab). Controller bertanggung jawab atas protokol HTTP (memeriksa format request, headers, dan mengembalikan status code `400 Bad Request`), sedangkan Service murni bertanggung jawab atas logika data dan query database tanpa keterikatan pada request/response Express.

