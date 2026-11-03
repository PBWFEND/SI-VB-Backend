\# Latihan Individu Pertemuan 7



\## Deskripsi

Implementasi REST API pengelolaan data pengguna menggunakan Express.js, Prisma ORM, dan SQLite.



\## Implementasi

1\. Mengambil daftar pengguna dengan filter NIM opsional.

2\. Membuat pengguna dengan validasi NIM, nama, email, dan role.

3\. Menambahkan endpoint POST `/pengguna` dengan status 201.

4\. Menambahkan endpoint DELETE `/pengguna/:nim` dengan status 204 jika berhasil dan 404 jika data tidak ditemukan.



\## Hasil Pengujian

\- GET semua pengguna: 200 OK.

\- POST pengguna: 201 Created.

\- GET berdasarkan NIM: 200 OK.

\- DELETE pengguna: 204 No Content.

\- DELETE data tidak ditemukan: 404 Not Found.

\- POST data tidak valid: 400 Bad Request.



\## Cara Menjalankan

1\. `npm install`

2\. `npx prisma generate`

3\. `npx prisma migrate dev`

4\. `node --experimental-strip-types latihan.ts`



Server berjalan di `http://localhost:3008`.

