# Tugas Authentication

## Sistem Informasi Perpustakaan

**Nama:** Rasya Putri Ramadhani  
**NIM:** 240160221055  
**Mata Kuliah:** Praktikum Backend  

## 1. Deskripsi Proyek

Proyek ini merupakan pengembangan sistem informasi perpustakaan berbasis REST API menggunakan Node.js, Express, TypeScript, dan Prisma ORM dengan database SQLite.

Sistem ini menyediakan pengelolaan data buku, pengguna, dan peminjaman. Pada tugas Authentication, sistem dikembangkan dengan menambahkan fitur registrasi dan login agar pengguna dapat melakukan autentikasi menggunakan email dan password.

Password pengguna tidak disimpan dalam bentuk teks biasa, melainkan diproses menggunakan algoritma hashing dengan salt sebelum disimpan ke database.

## 2. Teknologi yang Digunakan

- **Node.js** – Runtime JavaScript.
- **Express.js** – Framework untuk membangun REST API.
- **TypeScript** – Bahasa pemrograman dengan dukungan tipe data.
- **Prisma ORM** – Pengelolaan database.
- **SQLite** – Database penyimpanan data.
- **Postman** – Pengujian endpoint API.
- **SQLite Viewer** – Pemeriksaan isi database.

## 3. Fitur Aplikasi

### Pengelolaan Data
- Melihat data buku.
- Mengelola data pengguna.
- Mengelola data peminjaman.

### Authentication
- Registrasi pengguna melalui endpoint `POST /auth/register`.
- Login pengguna melalui endpoint `POST /auth/login`.
- Validasi nama, email, dan password.
- Validasi format email.
- Pencegahan penggunaan email yang sudah terdaftar.
- Password hashing menggunakan salt.
- Verifikasi password saat login.
- Response authentication tidak menampilkan password maupun passwordHash.

## 4. Struktur Folder

```text
Tugas Authentication/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── dev.db
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── buku.controller.ts
│   │   ├── pengguna.controller.ts
│   │   └── pinjaman.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── buku.service.ts
│   │   ├── pengguna.service.ts
│   │   └── pinjaman.service.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── buku.routes.ts
│   │   ├── pengguna.routes.ts
│   │   └── pinjaman.routes.ts
│   └── middleware/
├── app.ts
├── server.ts
├── client.ts
├── prisma7.config.ts
├── package.json
├── .env
└── README.md
```

## 5. Instalasi dan Menjalankan Aplikasi

### A. Clone Repository

```bash
git clone <URL-REPOSITORY>
```

Masuk ke folder proyek:

```bash
cd Tugas-Authentication
```

### B. Install Dependencies

```bash
npm install
```

### C. Konfigurasi Environment

Buat file `.env` pada direktori utama proyek dan sesuaikan konfigurasi database:

```env
DATABASE_URL="file:./dev.db"
```

### D. Menyiapkan Database

Jalankan perintah berikut:

```bash
npx prisma generate
```

Kemudian jalankan migrasi database:

```bash
npx prisma migrate dev
```

### E. Menjalankan Server

```bash
npm run dev
```

Jika berhasil, terminal akan menampilkan:

```text
Server berjalan di http://localhost:3000
```

## 6. Endpoint API

Base URL:

```text
http://localhost:3000
```

### Authentication

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/auth/register` | Registrasi pengguna |
| POST | `/auth/login` | Login pengguna |

### Resource

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/buku` | Melihat data buku |
| GET | `/pengguna` | Melihat data pengguna |
| GET | `/pinjaman` | Melihat data peminjaman |

## 7. Contoh Penggunaan Authentication

### A. Register

**Request:**

```http
POST /auth/register
```

Body JSON:

```json
{
  "nama": "Rasya",
  "email": "rasya@gmail.com",
  "password": "password123"
}
```

**Response berhasil (201 Created):**

```json
{
  "message": "Registrasi berhasil",
  "data": {
    "id": 1,
    "nama": "Rasya",
    "email": "rasya@gmail.com",
    "createdAt": "2026-11-10T..."
  }
}
```

### B. Login

**Request:**

```http
POST /auth/login
```

Body JSON:

```json
{
  "email": "rasya@gmail.com",
  "password": "password123"
}
```

**Response berhasil (200 OK):**

```json
{
  "message": "Login berhasil",
  "data": {
    "id": 1,
    "nama": "Rasya",
    "email": "rasya@gmail.com"
  }
}
```

## 8. Implementasi Password Hashing

Password pengguna diproses menggunakan fungsi `scrypt` dari modul `node:crypto`.

Proses hashing dilakukan dengan tahapan:

1. Sistem membuat salt secara acak menggunakan `randomBytes`.
2. Password dan salt diproses menggunakan algoritma `scrypt`.
3. Hasil hashing disimpan ke kolom `passwordHash` pada database.
4. Saat login, password yang dimasukkan diproses kembali menggunakan salt yang tersimpan.
5. Hasilnya dibandingkan menggunakan `timingSafeEqual` untuk memverifikasi kecocokan password.

Dengan proses tersebut, password asli tidak disimpan langsung ke database.

## 9. Hasil Pengujian

Pengujian dilakukan menggunakan Postman dan SQLite Viewer.

| No. | Pengujian | Hasil yang Diharapkan |
|---|---|---|
| 1 | Register berhasil | 201 Created |
| 2 | Email duplikat | 409 Conflict |
| 3 | Input register tidak valid | 400 Bad Request |
| 4 | Password kurang dari 8 karakter | 400 Bad Request |
| 5 | Email huruf kapital | 201 Created |
| 6 | Login berhasil | 200 OK |
| 7 | Password salah | 401 Unauthorized |
| 8 | Email tidak terdaftar | 401 Unauthorized |
| 9 | Input login tidak lengkap | 400 Bad Request |
| 10 | Password tersimpan dalam bentuk hash | Berhasil |
| 11 | Salt berbeda untuk password yang sama | Berhasil |
| 12 | Password dan hash tidak muncul dalam response authentication | Berhasil |
| 13 | GET `/pengguna` tidak menampilkan passwordHash | Berhasil |
| 14 | Integrasi database | Berhasil |

Selain pengujian di atas, dilakukan juga pengujian validasi input seperti nama berupa angka, email berupa angka, nama kosong, serta password yang tidak diisi.

## 10. Kesimpulan

Melalui pengembangan tugas ini, fitur authentication berhasil ditambahkan pada sistem informasi perpustakaan. Fitur registrasi dan login dilengkapi dengan validasi input, pemeriksaan email, serta proses password hashing menggunakan salt.

Pengujian dilakukan menggunakan Postman untuk memastikan endpoint berjalan sesuai fungsinya dan SQLite Viewer untuk memeriksa penyimpanan data pada database.