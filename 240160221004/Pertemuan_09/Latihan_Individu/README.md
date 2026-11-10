# Prak Backend Pertemuan 09 — Authentication + NIM

Nama    : Aprilliana Fratiwi
NPM     : 240160221004
Kelas   : SI - VB

Project ini mengimplementasikan sistem autentikasi (Register & Login) menggunakan Express.js, Prisma, dan SQLite. Fitur mencakup validasi input (termasuk NIM), hashing password dengan `scrypt`, dan penanganan error yang aman.

## Prasyarat
- Node.js v22.12.0 atau lebih baru
- NPM

## Cara Menjalankan

### 1. Install Dependencies
```cmd
npm install

2. Konfigurasi Environment
env
DATABASE_URL="file:./prisma/dev.db"
PORT=3009

3. Migrasi Database & Generate Prisma Client
cmd
npx prisma migrate dev --name add_nim
npx prisma generate

4. Jalankan Server
cmd
npm run dev
Server berjalan di http://localhost:3009.

## Hasil Pengujian
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Latihan_Individu>node --experimental-strip-types server.ts
Authentication API berjalan di http://localhost:3009

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Latihan_Individu>curl -X POST http://localhost:3009/auth/register -H "Content-Type: application/json" -d "{\"nim\":\"240160221004\",\"nama\":\"Aprilliana Fratiwi\",\"email\":\"aprilliana@example.com\",\"password\":\"password123\"}"
{"success":true,"message":"Akun berhasil dibuat","data":{"id":1,"nim":"240160221004","nama":"Aprilliana Fratiwi","email":"aprilliana@example.com","createdAt":"2026-11-02T16:42:47.901Z"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Latihan_Individu>curl -X POST http://localhost:3009/auth/register -H "Content-Type: application/json" -d "{\"nim\":\"ABC123\",\"nama\":\"William\",\"email\":\"william@example.com\",\"password\":\"password123\"}"
{"success":false,"message":"Validasi gagal","errors":["nim wajib diisi dan berupa angka"]}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Latihan_Individu>curl -X POST http://localhost:3009/auth/register -H "Content-Type: application/json" -d "{\"nim\":\"12345678\",\"nama\":\"Aprilliana2\",\"email\":\"aprilliana2@example.com\",\"password\":\"password123\"}"
{"success":true,"message":"Akun berhasil dibuat","data":{"id":2,"nim":"12345678","nama":"Aprilliana2","email":"aprilliana2@example.com","createdAt":"2026-11-02T16:44:47.384Z"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Latihan_Individu>curl -X POST http://localhost:3009/auth/register -H "Content-Type: application/json" -d "{\"nim\":\"240160221004\",\"nama\":\"Aprilliana2\",\"email\":\"aprilliana2@example.com\",\"password\":\"password123\"}"
{"success":false,"message":"NIM atau Email sudah terdaftar"}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Latihan_Individu>curl -X POST http://localhost:3009/auth/login -H "Content-Type: application/json" -d "{\"email\":\"aprilliana@example.com\",\"password\":\"password123\"}"
{"success":true,"message":"Login berhasil","data":{"id":1,"nim":"240160221004","nama":"Aprilliana Fratiwi","email":"aprilliana@example.com","createdAt":"2026-11-02T16:42:47.901Z"}}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Latihan_Individu>curl -X POST http://localhost:3009/auth/login -H "Content-Type: application/json" -d "{\"email\":\"aprilliana@example.com\",\"password\":\"salahbanget\"}"
{"success":false,"message":"Email atau password tidak sesuai"}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Latihan_Individu>curl -X POST http://localhost:3009/auth/login -H "Content-Type: application/json" -d "{\"email\":\"tidakada@example.com\",\"password\":\"password123\"}"
{"success":false,"message":"Email atau password tidak sesuai"}

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Latihan_Individu>curl -X POST http://localhost:3009/auth/login -H "Content-Type: application/json" -d "{\"email\":12345,\"password\":240160221004}"

{"success":false,"message":"Validasi gagal","errors":["email harus memiliki format yang valid","password wajib berupa string minimal 8 karakter"]}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_09\Latihan_Individu>

## Mengapa Hash Tidak Boleh Menjadi Pengganti Password pada Response?
Jawaban :
1. Risiko Offline Brute-Force
Jika hash bocor (misal lewat log server atau XSS), penyerang bisa melakukan brute-force secara offline tanpa batasan dari server. Mereka dapat menebak password asli hingga hash-nya cocok.

2. Sifat Hash Satu Arah
Hash tidak bisa di-decrypt. Client tidak membutuhkan hash untuk apa pun; client hanya butuh identitas (NIM, Nama, Email) atau token sesi (JWT).

3. Pelanggaran Least Privilege
Client tidak membutuhkan hash untuk autentikasi selanjutnya. Hash hanya relevan di sisi server (database) untuk verifikasi login.

4. Membocorkan Salt
Format hash scrypt$salt$key mengandung salt. Mengirimkannya memberi petunjuk bagi penyerang untuk membuat rainbow table spesifik.