# Tugas Authentication — Pertemuan 9

**Nama:** Rahma Nadya
**NIM:** 240160221035
**Mata Kuliah:** Praktikum Backend
**Materi:** Authentication, Register, Login, dan Password Hashing

## 1. Deskripsi Project

Project ini merupakan implementasi authentication menggunakan Node.js, Express.js, TypeScript, Prisma ORM, dan SQLite.

Fitur yang tersedia:

* Register akun pengguna.
* Login menggunakan email dan password.
* Validasi input.
* Password hashing menggunakan algoritma scrypt.
* Pengecekan email agar tidak terdaftar dua kali.
* Response API tanpa mengirim password maupun password hash.

## 2. Teknologi yang Digunakan

* Node.js
* Express.js 5
* TypeScript
* Prisma ORM 7
* SQLite
* Node.js Crypto (`scrypt`)

## 3. Instalasi dan Menjalankan Project

Pastikan Node.js sudah terinstal.

Buka terminal pada folder project, kemudian jalankan:

```bash
npm install
```

Salin konfigurasi environment dari `.env.example` apabila tersedia:

```bash
cp .env.example .env
```

Sesuaikan konfigurasi database dengan file `.env` dan konfigurasi Prisma project.

Jalankan migrasi database:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

Jalankan server:

```bash
npm run dev
```

Pastikan server berjalan pada:

`http://localhost:3000`

## 4. Endpoint API

### A. Register

* Method: POST
* URL: `http://localhost:3000/auth/register`
* Content-Type: `application/json`

Request Body:

```json
{
  "nama": "Rahma Nadya",
  "email": "rahma@gmail.com",
  "password": "rahasia123"
}
```

Response berhasil:

* Status: `201 Created`
* Pesan: Akun berhasil dibuat.

### B. Login

* Method: POST
* URL: `http://localhost:3000/auth/login`
* Content-Type: `application/json`

Request Body:

```json
{
  "email": "rahma@gmail.com",
  "password": "rahasia123"
}
```

Response berhasil:

* Status: `200 OK`
* Pesan: Login berhasil.

## 5. Password Hashing

Project menggunakan algoritma `scrypt` dari modul `node:crypto`.

Proses yang dilakukan:

1. Membuat salt acak menggunakan `randomBytes(16)`.
2. Menghasilkan derived key menggunakan scrypt.
3. Menyimpan hasil hash ke database.
4. Menggunakan salt yang tersimpan untuk memverifikasi password ketika login.
5. Membandingkan hasil menggunakan `timingSafeEqual`.

Password asli tidak disimpan ke database dan password hash tidak dikirim ke response API.

Format penyimpanan:

`scrypt$<salt-hex>$<derived-key-hex>`

## 6. Hasil Pengujian API

Pengujian dilakukan menggunakan Thunder Client.

| No. | Skenario Pengujian              | Request                                 | Status yang Diharapkan |
| --- | ------------------------------- | --------------------------------------- | ---------------------- |
| 1   | Register berhasil               | Data register valid dan email baru      | 201 Created            |
| 2   | Email tidak valid               | Email dengan format salah               | 400 Bad Request        |
| 3   | Password kurang dari 8 karakter | Password kurang dari 8 karakter         | 400 Bad Request        |
| 4   | Email sudah terdaftar           | Register menggunakan email yang sama    | 409 Conflict           |
| 5   | Login berhasil                  | Email dan password benar                | 200 OK                 |
| 6   | Login gagal                     | Password salah                          | 401 Unauthorized       |
| 7   | Email tidak ditemukan           | Login dengan email yang belum terdaftar | 401 Unauthorized       |

## 7. Bukti Screenshot Pengujian

Screenshot hasil pengujian disimpan dalam folder dokumentasi.

Daftar bukti:

1. Server berhasil dijalankan.
2. Register berhasil.
3. Validasi email tidak valid.
4. Validasi password kurang dari 8 karakter.
5. Login berhasil.
6. Login dengan password salah.
7. Register dengan email duplikat.

## 8. Keamanan dan Validasi

Implementasi ini menerapkan:

* Validasi tipe data request.
* Validasi nama dan email.
* Validasi minimum panjang password 8 karakter.
* Normalisasi email menjadi huruf kecil.
* Pengecekan email duplikat.
* Password hashing menggunakan scrypt.
* Response login gagal menggunakan pesan umum.
* Tidak mengirim password atau hash ke client.

## 9. Catatan

Project ini dibuat untuk memenuhi tugas praktikum Backend Pertemuan 9 mengenai Authentication.

Implementasi ini merupakan praktikum pembelajaran dan belum mencakup JWT, middleware authorization, rate limiting, MFA, maupun pemulihan password.
