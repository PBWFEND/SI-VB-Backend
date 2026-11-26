# Tugas Authentication – Latihan Individu Pertemuan 9

## 1. Deskripsi Project

Project ini merupakan latihan pembuatan REST API Authentication menggunakan Node.js, Express.js, TypeScript, Prisma ORM, dan SQLite.

Aplikasi ini memiliki fitur register dan login untuk pengguna. Pada latihan ini, NIM ditambahkan sebagai identitas unik kedua selain email. Selain itu, password pengguna juga diamankan menggunakan algoritma hashing `scrypt` dengan salt acak.

## 2. Teknologi yang Digunakan

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* SQLite
* Crypto (scrypt)
* curl.exe

## 3. Struktur Project

```text
Latihan Individu/
├── prisma/
│   ├── generated/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── controller/
│   │   └── auth.controller.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   └── service/
│       └── auth.service.ts
├── bukti-testing/
├── app.ts
├── server.ts
├── client.ts
├── prisma.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env
└── README.md
```

## 4. Konfigurasi Database

Database yang digunakan adalah SQLite dengan konfigurasi pada file `.env`.

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

Model User pada Prisma:

```prisma
model User {
  id           Int      @id @default(autoincrement())
  nim          String   @unique
  nama         String
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}
```

Pada model tersebut, NIM dan email menggunakan `@unique` agar setiap pengguna memiliki identitas yang berbeda.

## 5. Cara Menjalankan Project

**1. Install dependencies**

```bash
npm install
```

**2. Generate Prisma Client**

```bash
npx prisma generate
```

**3. Jalankan migrasi database**

```bash
npx prisma migrate dev
```

**4. Periksa TypeScript**

```bash
npx tsc --noEmit
```

**5. Jalankan server**

```bash
npm start
```

Server berjalan pada alamat:

```text
http://localhost:3000
```

## 6. Daftar Endpoint API

| Method | Endpoint         | Fungsi                     |
| ------ | ---------------- | -------------------------- |
| GET    | `/health`        | Memeriksa status server    |
| POST   | `/auth/register` | Mendaftarkan pengguna baru |
| POST   | `/auth/login`    | Login pengguna             |

## 7. Pengujian API Authentication

Pengujian dilakukan menggunakan `curl.exe` melalui terminal PowerShell.

### 7.1 Pengujian Health Check

**Perintah:**

```powershell
curl.exe -i http://localhost:3000/health
```

**Hasil:**

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

```json
{
  "success": true,
  "data": {
    "status": "up"
  }
}
```

**Keterangan:**

Server berhasil dijalankan dan memberikan respons `200 OK`.

### 7.2 Pengujian Register Berhasil

**Perintah:**

```powershell
curl.exe -i -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" --data-binary "@register.json"
```

**Isi register.json:**

```json
{
  "nim": "240160221035",
  "nama": "Rahma Nadya",
  "email": "rahma.test@example.com",
  "password": "Rahma12345"
}
```

**Hasil:**

```http
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
```

```json
{
  "success": true,
  "message": "Akun berhasil dibuat",
  "data": {
    "id": 1,
    "nim": "240160221035",
    "nama": "Rahma Nadya",
    "email": "rahma.test@example.com",
    "createdAt": "2026-11-26T05:44:04.661Z"
  }
}
```

**Keterangan:**

Registrasi berhasil dan data pengguna berhasil disimpan ke database.

### 7.3 Pengujian Login Berhasil

**Perintah:**

```powershell
curl.exe -i -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" --data-binary "@login.json"
```

**Hasil:**

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "id": 1,
    "nim": "240160221035",
    "nama": "Rahma Nadya",
    "email": "rahma.test@example.com",
    "createdAt": "2026-11-26T05:44:04.661Z"
  }
}
```

**Keterangan:**

Login berhasil karena email dan password yang dimasukkan sesuai dengan data pengguna yang tersimpan.

### 7.4 Pengujian Login dengan Password Salah

**Perintah:**

```powershell
curl.exe -i -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" --data-binary "@login-salah.json"
```

**Hasil:**

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8
```

```json
{
  "success": false,
  "message": "NIM atau password tidak sesuai"
}
```

**Keterangan:**

Login ditolak karena password yang dimasukkan tidak sesuai dengan password pengguna yang tersimpan di database.

## 8. Validasi Input

Pada proses register dan login terdapat beberapa validasi untuk memastikan data yang dimasukkan sesuai dengan ketentuan.

Validasi yang diterapkan:

1. NIM harus terdiri dari tepat 12 digit angka.
2. Nama tidak boleh kosong.
3. Email harus memiliki format yang valid.
4. Password minimal 8 karakter.
5. NIM tidak boleh sama dengan NIM pengguna lain.
6. Email tidak boleh sama dengan email pengguna lain.
7. Tipe data setiap field harus sesuai.

Jika data yang dimasukkan tidak memenuhi ketentuan, sistem akan memberikan respons `400 Bad Request`.

Jika NIM atau email sudah digunakan, sistem akan memberikan respons `409 Conflict`.

## 9. Keamanan Password

Pada project ini, password tidak disimpan langsung ke database dalam bentuk teks biasa. Saya menggunakan algoritma `scrypt` untuk mengubah password menjadi hash sebelum disimpan.

Saat proses register, sistem membuat salt secara acak menggunakan `randomBytes(16)`. Salt tersebut kemudian digunakan bersama password untuk menghasilkan hash menggunakan `scrypt`.

Ketika pengguna login, sistem mengambil hash yang sudah tersimpan di database, kemudian mencocokkannya dengan password yang dimasukkan. Proses perbandingan menggunakan `timingSafeEqual`.

**Mengapa hash tidak boleh dikirim dalam response?**

Menurut saya, password hash tetap harus dirahasiakan karena termasuk data sensitif. Walaupun sudah berbentuk hash, data tersebut masih bisa dimanfaatkan oleh orang lain untuk mencoba menebak password. Jadi, saat register maupun login, response cukup menampilkan data pengguna seperti NIM, nama, email, dan ID tanpa menyertakan password hash.

## 10. Sequence Pembuatan Salt dan Verifikasi Login

### A. Proses Register

Saat pengguna melakukan register, pengguna mengisi NIM, nama, email, dan password. Setelah itu, sistem memeriksa apakah data yang dimasukkan sudah sesuai.

Jika valid, sistem membuat salt secara acak. Password dan salt kemudian diproses menggunakan `scrypt` sehingga menghasilkan password hash. Hash tersebut disimpan ke database bersama data pengguna lainnya.

```text
Pengguna
   |
   | Mengirim data register
   v
Auth Controller
   |
   | Validasi input
   v
Auth Service
   |
   | Membuat salt acak
   v
randomBytes(16)
   |
   | Password + Salt
   v
scrypt()
   |
   | Menghasilkan password hash
   v
Database
   |
   | Menyimpan data pengguna
   v
Response Register
   |
   | Data pengguna tanpa passwordHash
   v
Selesai
```

### B. Proses Login

Saat login, pengguna memasukkan email dan password. Sistem mencari data pengguna berdasarkan email yang dimasukkan.

Jika email ditemukan, sistem mengambil password hash dari database. Setelah itu, sistem menggunakan salt yang tersimpan untuk memproses kembali password yang dimasukkan.

Hasilnya kemudian dibandingkan dengan hash sebelumnya menggunakan `timingSafeEqual`. Jika cocok, login berhasil. Jika tidak cocok atau email tidak ditemukan, sistem akan menolak login.

```text
Pengguna
   |
   | Mengirim email dan password
   v
Auth Controller
   |
   | Validasi input
   v
Auth Service
   |
   | Mencari pengguna berdasarkan email
   v
Database
   |
   | Mengambil passwordHash
   v
Verifikasi Password
   |
   | Mengambil salt dari hash
   v
scrypt(password, salt, 64)
   |
   | Membandingkan hasil hash
   v
timingSafeEqual()
   |
   v
Password sesuai?
   |              |
  YA             TIDAK
   |              |
   v              v
Login berhasil   Login ditolak
HTTP 200         HTTP 401
```

## 11. Kesimpulan

Dari latihan ini, saya sudah membuat fitur register dan login menggunakan Express, TypeScript, Prisma, dan SQLite. Saya juga menambahkan NIM sebagai identitas unik kedua selain email, serta validasi agar data yang dimasukkan sesuai dengan ketentuan.

Selain itu, saya belajar bagaimana cara mengamankan password menggunakan `scrypt` dan salt agar password tidak disimpan secara langsung di database. Dari pengujian yang sudah dilakukan, register berhasil, login dengan password yang benar berhasil, sedangkan login dengan password yang salah ditolak oleh sistem.

## 12. Bukti Pengujian

Screenshot hasil pengujian disimpan dalam folder `bukti-testing/`.

Nama file screenshot:

1. `01-health-check.png`
2. `02-register-berhasil.png`
3. `03-login-berhasil.png`
4. `04-login-password-salah.png`
5. `05-login-nim-tidak terdaftar.png`
6. `06-Server-running.png`