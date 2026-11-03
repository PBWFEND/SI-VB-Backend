# Refleksi Tugas 2 - Node.js Fundamentals

Nama dan NIM: Lintang Azzahra Govarana (240160221021)

## Penggunaan AI

Saya memakai AI (Claude) untuk memandu langkah demi langkah, menyusun kode config.js, server.js, kelas.json, dan README.md, serta membantu mencari penyebab error. Pertanyaan yang saya ajukan antara lain cara menjalankan server di PowerShell, cara memperbaiki error EADDRINUSE, dan cara mengubah environment variable di Windows.

Bagian yang saya verifikasi sendiri: saya menjalankan server dengan node server.js, membuka lima alamat (/, /health, /kelas, /waktu, dan /tidak-ada) di browser, lalu memeriksa status code 200 dan 404 lewat curl.exe -i.

## Hasil pengujian

- GET / , /health, /kelas, dan /waktu mengembalikan success: true dengan status 200.
- GET /tidak-ada mengembalikan status 404 dengan pesan Endpoint GET /tidak-ada tidak ditemukan.
- Endpoint /kelas berhasil membaca data/kelas.json secara asynchronous.
- Pada latihan, nilai COURSE_CODE berubah dari CPMK115 menjadi CPMK116 tanpa mengedit kode.

## Hal yang masih perlu saya pahami

Saya masih perlu memahami lebih dalam mengapa server lama bisa tetap berjalan setelah terminalnya ditutup, sehingga muncul error EADDRINUSE saat server dijalankan lagi, dan bagaimana cara menghentikannya dengan benar.