# Output Pembelajaran – Tugas JWT dan Authorization

## 1. Deskripsi Project

Project ini merupakan pengembangan REST API untuk sistem perpustakaan menggunakan Node.js, Express.js, TypeScript, dan Prisma ORM dengan database SQLite.

Pada project ini ditambahkan fitur **Authentication dan Authorization** menggunakan JSON Web Token (JWT). Fitur tersebut digunakan untuk mengatur proses login pengguna serta membatasi akses endpoint berdasarkan role.

Terdapat dua role yang digunakan, yaitu:
- **pengguna**: dapat melihat data buku dan melakukan peminjaman.
- **staf**: memiliki akses untuk mengelola buku, melihat data pengguna, melihat data peminjaman, dan memproses pengembalian buku.

## 2. Teknologi yang Digunakan

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite
- JSON Web Token (JWT)
- Postman

## 3. Fitur yang Dikembangkan

### A. Authentication

Authentication digunakan untuk memastikan identitas pengguna sebelum mengakses endpoint yang dilindungi.

Fitur yang tersedia:
- Registrasi pengguna.
- Login menggunakan email dan password.
- Password disimpan dalam bentuk hash menggunakan `scrypt`.
- Pembuatan access token menggunakan JWT.
- Validasi token melalui middleware.
- Pemeriksaan masa berlaku token.

### B. Authorization

Authorization digunakan untuk membatasi akses berdasarkan role pengguna.

Pembagian hak akses:

| Fitur | Pengguna | Staf |
|---|---|---|
| Melihat daftar buku | Ya | Ya |
| Melihat detail buku | Ya | Ya |
| Menambahkan buku | Tidak | Ya |
| Mengubah buku | Tidak | Ya |
| Menghapus buku | Tidak | Ya |
| Melihat data pengguna | Tidak | Ya |
| Melihat seluruh peminjaman | Tidak | Ya |
| Membuat peminjaman | Ya | Ya |
| Memproses pengembalian | Tidak | Ya |
| Mengakses endpoint khusus staf | Tidak | Ya |

## 4. Struktur Folder

```text
output pembelajaran/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── buku.controller.ts
│   │   ├── pengguna.controller.ts
│   │   └── pinjaman.controller.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── buku.routes.ts
│   │   ├── pengguna.routes.ts
│   │   ├── pinjaman.routes.ts
│   │   └── staf.routes.ts
│   │
│   └── services/
│       ├── auth.service.ts
│       ├── buku.service.ts
│       ├── pengguna.service.ts
│       └── pinjaman.service.ts
│
├── Output Pembelajaran/
│   └── Bukti-pengujian/
│
├── app.ts
├── server.ts
├── client.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 5. Instalasi dan Menjalankan Project

### A. Persiapan

Pastikan Node.js dan npm sudah terpasang pada komputer.

### B. Instalasi Dependencies

Buka terminal pada folder project, kemudian jalankan:

```bash
npm install
```

### C. Konfigurasi Environment

Buat file `.env` pada folder utama project.

Isi konfigurasi JWT sebagai berikut:

```env
JWT_SECRET=isi_dengan_secret_yang_aman
JWT_EXPIRES_IN=15m
```

Pastikan variabel `DATABASE_URL` yang sudah digunakan pada project sebelumnya tetap dicantumkan sesuai konfigurasi database lokal.

**Catatan:** Jangan membagikan nilai JWT_SECRET dan jangan mengunggah file `.env` ke repository publik.

### D. Generate Prisma Client

Jalankan perintah:

```bash
npx prisma generate
```

### E. Menjalankan Server

Jalankan:

```bash
npm run dev
```

Jika berhasil, terminal akan menampilkan:

```text
Server berjalan di http://localhost:3000
```

Server dapat diakses melalui:

```text
http://localhost:3000
```

## 6. Daftar Endpoint API

Base URL:

```text
http://localhost:3000
```

### A. Authentication

| Method | Endpoint | Keterangan | Akses |
|---|---|---|---|
| POST | `/auth/register` | Registrasi pengguna | Public |
| POST | `/auth/login` | Login pengguna | Public |

### B. Buku

| Method | Endpoint | Keterangan | Akses |
|---|---|---|---|
| GET | `/buku` | Melihat daftar buku | Pengguna, Staf |
| GET | `/buku/:id` | Melihat detail buku | Pengguna, Staf |
| POST | `/buku` | Menambahkan buku | Staf |
| PATCH | `/buku/:id` | Mengubah data buku | Staf |
| DELETE | `/buku/:id` | Menghapus buku | Staf |

### C. Pengguna

| Method | Endpoint | Keterangan | Akses |
|---|---|---|---|
| GET | `/pengguna` | Melihat seluruh data pengguna | Staf |

### D. Peminjaman

| Method | Endpoint | Keterangan | Akses |
|---|---|---|---|
| GET | `/pinjaman` | Melihat seluruh data peminjaman | Staf |
| POST | `/pinjaman` | Membuat peminjaman | Pengguna, Staf |
| PATCH | `/pinjaman/:id/kembali` | Memproses pengembalian buku | Staf |

### E. Endpoint Khusus Staf

| Method | Endpoint | Keterangan | Akses |
|---|---|---|---|
| GET | `/staf/pinjaman` | Melihat data peminjaman melalui endpoint staf | Staf |

## 7. Mekanisme Authentication dan Authorization

### A. Registrasi

Pengguna melakukan registrasi dengan mengirimkan nama, email, dan password.

Sistem melakukan validasi input, memeriksa format email, dan memastikan email belum digunakan.

Password kemudian di-hash menggunakan algoritma `scrypt` sebelum disimpan ke database.

Role pengguna baru secara default adalah `pengguna`.

### B. Login

Pengguna melakukan login menggunakan email dan password.

Jika data login sesuai, sistem akan menghasilkan access token JWT.

Token berisi informasi:
- `sub`: ID pengguna.
- `role`: Role pengguna.
- `iat`: Waktu token diterbitkan.
- `exp`: Waktu token kedaluwarsa.

Masa berlaku token dikonfigurasi melalui environment variable `JWT_EXPIRES_IN`, yaitu 15 menit.

### C. Authentication Middleware

Middleware `authenticateToken` digunakan untuk memeriksa token JWT pada endpoint yang dilindungi.

Middleware akan melakukan pemeriksaan:
- Keberadaan token.
- Format token.
- Validitas signature token.
- Masa berlaku token.
- Informasi identitas dan role pengguna.

Jika token tidak ditemukan, rusak, atau kedaluwarsa, sistem akan memberikan respons `401 Unauthorized`.

### D. Authorization Middleware

Middleware `authorizeRole` digunakan untuk memastikan pengguna memiliki role yang sesuai dengan endpoint yang diakses.

Jika role tidak memiliki izin, sistem akan memberikan respons `403 Forbidden`.

## 8. Pengujian Menggunakan Postman

Pengujian dilakukan menggunakan Postman untuk memastikan fitur Authentication dan Authorization berjalan sesuai dengan kebutuhan. Pengujian dibagi menjadi tiga bagian, yaitu pengujian register, login, dan authentication menggunakan token JWT.

### A. Pengujian Register

Pengujian register dilakukan untuk memastikan proses pendaftaran pengguna berjalan dengan baik serta sistem dapat melakukan validasi terhadap data yang dimasukkan.

| No. | Skenario Pengujian | Hasil |
|---|---|---|
| 1 | Register berhasil | 201 Created |
| 2 | Register dengan email yang sudah digunakan | 409 Conflict |
| 3 | Register dengan format email tidak valid | 400 Bad Request |
| 4 | Register dengan password kurang dari 8 karakter | 400 Bad Request |
| 5 | Register tanpa nama | 400 Bad Request |

### B. Pengujian Login

Pengujian login dilakukan untuk memastikan pengguna dapat masuk menggunakan akun yang sudah terdaftar serta sistem dapat menolak proses login apabila data yang dimasukkan tidak sesuai.

| No. | Skenario Pengujian | Hasil |
|---|---|---|
| 1 | Login sebagai pengguna | 200 OK |
| 2 | Login sebagai staf | 200 OK |
| 3 | Login dengan password salah | 401 Unauthorized |
| 4 | Login dengan email yang tidak terdaftar | 401 Unauthorized |
| 5 | Login tanpa password | 400 Bad Request |

### C. Pengujian Authentication dan Authorization (Token JWT)

Pengujian ini dilakukan untuk memastikan token JWT dapat digunakan sebagai autentikasi serta pembatasan akses berdasarkan role pengguna berjalan sesuai dengan ketentuan.

| No. | Skenario Pengujian | Hasil |
|---|---|---|
| 1 | Mengakses endpoint dengan token pengguna yang valid | 200 OK |
| 2 | Mengakses endpoint dengan token rusak | 401 Unauthorized |
| 3 | Mengakses endpoint dengan token staf yang valid | 200 OK |
| 4 | Mengakses endpoint dengan token kedaluwarsa | 401 Unauthorized |
| 5 | Mengakses endpoint tanpa token | 401 Unauthorized |
| 6 | Pengguna melihat data seluruh pengguna | 403 Forbidden |
| 7 | Pengguna menambahkan buku | 403 Forbidden |
| 8 | Pengguna mengakses endpoint staf | 403 Forbidden |
| 9 | Staf melihat data seluruh pengguna | 200 OK |
| 10 | Staf menambahkan buku | 201 Created |
| 11 | Staf mengakses endpoint staf | 200 OK |

### D. Dokumentasi Hasil Pengujian

Seluruh hasil pengujian didokumentasikan dalam bentuk screenshot dari Postman. Dokumentasi tersebut dikelompokkan berdasarkan jenis pengujian dengan susunan folder sebagai berikut:

```text
Bukti-pengujian/
│
├── Pengujian Register/
│   ├── Register berhasil.png
│   ├── Register dengan email yang sudah digunakan.png
│   ├── Register dengan format email tidak valid.png
│   ├── Register dengan password kurang dari 8 karakter.png
│   └── Register tanpa nama.png
│
├── Pengujian Login/
│   ├── Login sebagai pengguna.png
│   ├── Login sebagai staf.png
│   ├── Login dengan password salah.png
│   ├── Login dengan email yang tidak terdaftar.png
│   └── Login tanpa password.png
│
└── Pengujian Authentication (Token JWT)/
    ├── Mengakses dengan token pengguna yang valid.png
    ├── Mengakses dengan token rusak.png
    ├── Mengakses dengan token staf yang valid.png
    ├── Mengakses endpoint dengan token kedaluwarsa.png
    ├── Mengakses endpoint tanpa token.png
    ├── Pengguna melihat data seluruh pengguna.png
    ├── Pengguna menambahkan buku.png
    ├── Pengguna mengakses endpoint staf.png
    ├── Staf melihat data seluruh pengguna.png
    ├── Staf menambahkan buku.png
    └── Staf mengakses endpoint staf.png
```

Berdasarkan pengujian tersebut, sistem telah diuji untuk proses registrasi, login, validasi token JWT, serta pembatasan akses berdasarkan role pengguna dan staf.
## 9. Pengamanan Data

Beberapa langkah pengamanan yang diterapkan pada project ini:

1. Password tidak disimpan dalam bentuk teks biasa, tetapi menggunakan hashing `scrypt`.
2. JWT_SECRET disimpan dalam environment variable.
3. Access token memiliki batas waktu penggunaan.
4. Endpoint tertentu dilindungi menggunakan middleware authentication.
5. Akses endpoint dibatasi berdasarkan role pengguna.
6. Informasi password hash tidak disertakan dalam respons API yang ditujukan kepada pengguna.
7. File `.env` dan database lokal dimasukkan ke dalam `.gitignore`.

## 10. Pemeriksaan Project

Pemeriksaan TypeScript dilakukan menggunakan perintah:

```bash
npx tsc --noEmit
```

Perintah tersebut digunakan untuk memeriksa kesalahan tipe pada kode TypeScript tanpa menghasilkan file JavaScript.

## 11. Kesimpulan

Melalui pengembangan project ini, fitur Authentication dan Authorization berhasil ditambahkan pada REST API sistem perpustakaan.

Pengguna dapat melakukan registrasi dan login untuk mendapatkan access token JWT. Token tersebut digunakan untuk mengakses endpoint yang dilindungi. Selain itu, pembatasan akses berdasarkan role diterapkan agar setiap pengguna hanya dapat menggunakan fitur sesuai dengan hak aksesnya.

Pengujian menggunakan Postman dilakukan untuk memeriksa proses registrasi, login, validasi token, token kedaluwarsa, serta pembatasan akses berdasarkan role. Dengan demikian, project ini menerapkan mekanisme autentikasi dan otorisasi untuk meningkatkan keamanan akses pada REST API.