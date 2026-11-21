# Prak Backend Pertemuan 09 — Authentication + NIM

Nama    : Cinta Rahmia Yulianti
NPM     : 240160221005
Kelas   : SI - VB

Project ini mengimplementasikan sistem autentikasi (Register & Login) menggunakan Express.js, Prisma, dan SQLite. Fitur mencakup validasi input (termasuk NIM), hashing password dengan `scrypt`, dan penanganan error yang aman.

## Cara Menjalankan

### 1. Install Dependencies
```cmd
npm install
npm install bcryptjs
npm install -D @types/bcryptjs

2. Konfigurasi Environment
cp .env.example .env 

3. Migrasi Database & Generate Prisma Client
npx prisma migrate dev --name init
npx prisma generate

4. Jalankan Server

npm start
Server berjalan di http://localhost:3009.
```

## Hasil Pengujian
PS C:\Users\USER\Desktop\240160221005_Cinta\240160221005\pertemuan09\latihan> npm start
npm notice run prak-backend-pertemuan-09@1.0.0 start
npm notice run node --experimental-strip-types server.ts
Authentication API berjalan di http://localhost:3009

```json
curl.exe -X POST http://localhost:3009/auth/register -H "Content-Type: application/json" -d "{\"nim\":\"240160221005\",\"nama\":\"Cinta Rahmia Yulianti\",\"email\":\"cintarahmia@example.com\",\"password\":\"password1205\"}"

hasilnya:
{
    "success":  true,
    "message":  "Akun berhasil dibuat",
    "data":  {
                 "id":  1,
                 "nim":  "240160221005",
                 "nama":  "Cinta Rahmia Yulianti",
                 "email":  "cintarahmia@example.com",
                 "createdAt":  "2026-11-18T14:38:42.130Z"
             }
}
```

```json
curl.exe -X POST http://localhost:3009/auth/register -H "Content-Type: application/json" -d "{\"nim\":\"ABC321\",\"nama\":\"Krating\",\"email\":\"krating@example.com\",\"password\":\"password123\"}"

hasilnya:
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
Content-Length: 90
ETag: W/"5a-9LhNbVJXEyG+NdHkTWdy8WHw0k8"
Date: Wed, 18 Nov 2026 14:46:19 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Validasi gagal","errors":["nim wajib diisi dan berupa angka"]}
```
```json
curl.exe -X POST http://localhost:3009/auth/register -H "Content-Type: application/json" -d "{\"nim\":\"12345678\",\"nama\":\"Krating Khunnarong\",\"email\":\"kratingkhunnarong@example.com\",\"password\":\"password123\"}"

hasilnya:
{
    "success":  true,
    "message":  "Akun berhasil dibuat",
    "data":  {
                 "id":  2,
                 "nim":  "12345678",
                 "nama":  "Krating Khunnarong",
                 "email":  "kratingkhunnarong@example.com",
                 "createdAt":  "2026-11-18T14:47:56.928Z"
             }
}
```

```json
curl.exe -X POST http://localhost:3009/auth/register -H "Content-Type: application/json" -d "{\"nim\":\"12345678\",\"nama\":\"KratingKhunnarong\",\"email\":\"kratingkhunnarong@example.com\",\"password\":\"password123\"}"

hasilnya:
{"success":false,"message":"NIM atau Email sudah terdaftar"}
```
```json
curl.exe -X POST http://localhost:3009/auth/login -H "Content-Type: application/json" -d "{\"email\":\"cintarahmia@example.com\",\"password\":\"password1205\"}"

hasilnya:
HTTP/1.1 200 OK
{"success":true,"message":"Login berhasil","data":{"id":1,"nim":"240160221005","nama":"Cinta Rahmia Yulianti","email":"cintarahmia@example.com","createdAt":"2026-11-18T14:38:42.130Z"}}
```
```json
curl.exe -X POST http://localhost:3009/auth/login -H "Content-Type: application/json" -d "{\"email\":\"cintarahmia@example.com\",\"password\":\"keposekali\"}"

hasilnya:
{"success":false,"message":"Email atau password tidak sesuai"}
```

```json
curl.exe -X POST http://localhost:3009/auth/login -H "Content-Type: application/json" -d "{\"email\":\"tidakada@example.com\",\"password\":\"password123\"}"

hasilnya:
{"success":false,"message":"Email atau password tidak sesuai"}
```

```json
curl.exe -X POST http://localhost:3009/auth/login -H "Content-Type: application/json" -d "{\"email\":12345,\"password\":240160221005}"

hasilnya:
{"success":false,"message":"Validasi gagal","errors":["email harus memiliki format yang valid","password wajib berupa string minimal 8 karakter"]}
```

## Mengapa Hash Tidak Boleh Menjadi Pengganti Password pada Response?
Jawaban :
Meskipun hash (seperti hasil dari bcrypt) sudah berbentuk acak dan tidak bisa dibalikkan menjadi teks asli (one-way), hash tidak boleh dikirim ke client dalam bentuk apapun karena:

1. Keretanan Offline Brute-Force: Jika attacker berhasil menyadap response API atau database Anda, mereka mendapatkan hash tersebut. Attacker bisa menjalankan brute-force attack di komputer mereka sendiri tanpa batas (offline) menggunakan dictionary atau rainbow table untuk menebak password aslinya.

2. Risiko Pass-the-Hash: Pada beberapa sistem yang salah konfigurasi, jika attacker memiliki hash, mereka mungkin bisa mengirimkannya langsung ke server untuk mendapatkan akses (menganggap hash sebagai password).

3. Prinsip Least Privilege: Client hanya perlu tahu bahwa login berhasil, dan mereka butuh Token (JWT) untuk mengakses resource selanjutnya. Client sama sekali tidak membutuhkan hash untuk melakukan apa pun.

4. Kebocoran Data: Semakin sering data sensitif (bahkan yang sudah di-hash) dikirim melalui jaringan, semakin besar risiko intersepsi (terutama jika tanpa HTTPS).