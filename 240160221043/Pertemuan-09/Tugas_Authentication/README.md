# e-Warungku – Authentication

## Identitas

- **Nama:** Salwa Ananda Rachmat
- **NIM:** 240160221043
- **Kelas:** SI-VB
- **Proyek:** WarungKu API

## 1. Deskripsi Proyek

**e-Warungku** merupakan aplikasi berbasis REST API yang dikembangkan menggunakan Node.js, Express.js, TypeScript, Prisma ORM, dan database SQLite.

Pada Pertemuan 9, proyek ini dikembangkan dengan menambahkan fitur Authentication berupa Register dan Login untuk mengelola proses pendaftaran serta autentikasi pengguna.

Pengembangan dilakukan dengan tetap mempertahankan fitur CRUD Menu yang telah dibuat pada mini project UTS.

## 2. Teknologi yang Digunakan

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite
- Node.js Crypto (`scrypt` dan `timingSafeEqual`)

## 3. Fitur Aplikasi

### A. CRUD Menu

Fitur pengelolaan data menu yang meliputi:
- Menampilkan seluruh menu.
- Menampilkan menu berdasarkan ID.
- Menambahkan menu.
- Mengubah data menu.
- Menghapus menu.

### B. Authentication

Fitur autentikasi pengguna meliputi:

**1. Register**

Endpoint: `POST /auth/register`

Digunakan untuk mendaftarkan pengguna baru dengan data:
- Nama
- Email
- Password

Email harus unik dan password minimal 8 karakter. Password diproses menggunakan algoritma `scrypt` sebelum disimpan ke database.

**2. Login**

Endpoint: `POST /auth/login`

Digunakan untuk melakukan autentikasi menggunakan email dan password yang telah didaftarkan.

Sistem akan memverifikasi password menggunakan `scrypt` dan `timingSafeEqual`. Jika berhasil, sistem mengembalikan informasi profil pengguna tanpa menampilkan password maupun password hash.

## 4. Implementasi Password Hashing

Pada fitur Authentication, password tidak disimpan dalam bentuk teks biasa (*plaintext*).

Proses hashing menggunakan fungsi `scrypt` dari modul `node:crypto`.

Tahapan proses hashing:
1. Sistem membuat salt secara acak menggunakan `randomBytes`.
2. Password dan salt diproses menggunakan algoritma `scrypt`.
3. Hasil proses hashing disimpan ke database dengan format:

   `scrypt$salt$derivedKey`

4. Saat login, sistem memproses kembali password menggunakan salt yang tersimpan.
5. Hasilnya dibandingkan menggunakan `timingSafeEqual` untuk memverifikasi kecocokan password.

Dengan demikian, password asli tidak disimpan secara langsung di database.

## 5. Perbandingan Session dan Token

| Aspek | Session | Token |
|---|---|---|
| Penyimpanan | Data session disimpan di server | Token disimpan oleh client |
| Identifikasi | Menggunakan session ID | Menggunakan token |
| Validasi | Server memeriksa data session | Server memverifikasi token |
| Pengelolaan | Membutuhkan pengelolaan session di server | Tidak harus menyimpan session untuk setiap pengguna |
| Contoh | Session-based authentication | JWT (JSON Web Token) |

**Kesimpulan:**

Session dan token merupakan dua pendekatan yang dapat digunakan dalam proses autentikasi pengguna. Session menyimpan informasi autentikasi di sisi server, sedangkan token membawa informasi atau klaim yang dapat diverifikasi oleh server.

Pada pengembangan ini, fokus implementasi adalah proses Register, Login, dan Password Hashing. JWT akan dipelajari pada pertemuan berikutnya.

## 6. Dokumentasi Endpoint Authentication

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/auth/register` | Mendaftarkan pengguna |
| POST | `/auth/login` | Melakukan login pengguna |

### Format Request Register

```json
{
  "nama": "Salwa",
  "email": "salwa@example.com",
  "password": "salwa12345"
}
```

### Format Request Login

```json
{
  "email": "salwa@example.com",
  "password": "salwa12345"
}
```

## 7. Hasil Pengujian

Pengujian dilakukan menggunakan PowerShell melalui terminal VS Code dengan mengirimkan request HTTP ke server lokal.

| No. | Skenario Pengujian | Status HTTP | Hasil |
|---|---|---:|---|
| 1 | Register dengan data valid | 201 Created | Berhasil |
| 2 | Login dengan email dan password benar | 200 OK | Berhasil |
| 3 | Login dengan password salah | 401 Unauthorized | Berhasil ditolak |
| 4 | Register menggunakan email yang sudah terdaftar | 409 Conflict | Berhasil ditolak |
| 5 | Register dengan email tidak valid dan password kurang dari 8 karakter | 400 Bad Request | Berhasil ditolak |

### Contoh Hasil Pengujian Register

```json
{
  "message": "Registrasi berhasil",
  "data": {
    "id": 1,
    "nama": "Salwa",
    "email": "salwa@example.com"
  }
}
```

### Contoh Hasil Pengujian Login

```json
{
  "message": "Login berhasil",
  "data": {
    "id": 1,
    "nama": "Salwa",
    "email": "salwa@example.com"
  }
}
```

### Contoh Hasil Pengujian Password Salah

```json
{
  "message": "Email atau password salah"
}
```

### Contoh Hasil Pengujian Email Duplikat

```json
{
  "message": "Email sudah terdaftar"
}
```

### Contoh Hasil Pengujian Input Tidak Valid

```json
{
  "message": "Input tidak valid. Nama wajib diisi, email harus valid, dan password minimal 8 karakter."
}
```

**Kesimpulan Pengujian:**

Berdasarkan lima skenario pengujian yang telah dilakukan, seluruh fitur Authentication berjalan sesuai dengan respons yang diharapkan. Sistem berhasil menerima data registrasi yang valid, melakukan autentikasi pengguna, serta menolak input yang tidak valid dan email yang telah terdaftar.

Selain itu, endpoint GET Menu juga berhasil diuji dan tetap dapat menampilkan data menu setelah penambahan fitur Authentication.

## 8. Cara Menjalankan Project

1. Clone atau buka repository project.
2. Install dependency:

   ```bash
   npm install
   ```

3. Pastikan file `.env` telah memiliki konfigurasi `DATABASE_URL` sesuai pengaturan SQLite pada project.

4. Jalankan migrasi database:

   ```bash
   npx prisma migrate dev
   ```

5. Generate Prisma Client:

   ```bash
   npx prisma generate
   ```

6. Jalankan server:

   ```bash
   npm run dev
   ```

7. Akses aplikasi melalui:

   `http://localhost:3012`

## 9. Struktur Project

```text
Tugas_Authentication/
├── prisma/
│   ├── generated/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── controller/
│   │   ├── auth.controller.ts
│   │   └── menu.controller.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── menu.routes.ts
│   └── service/
│       ├── auth.service.ts
│       └── menu.service.ts
├── app.ts
├── client.ts
├── server.ts
├── prisma.config.ts
├── package.json
└── README.md
```

## 10. Kesimpulan

Pada Pertemuan 9, pengembangan e-Warungku telah berhasil menambahkan fitur Authentication yang terdiri dari Register dan Login.

Implementasi password hashing menggunakan `scrypt` dan verifikasi menggunakan `timingSafeEqual` dilakukan untuk meningkatkan keamanan penyimpanan password pengguna.

Seluruh lima skenario pengujian Authentication berhasil dilakukan. Fitur CRUD Menu dari mini project UTS juga tetap dapat berjalan setelah pengembangan dilakukan.