# Tugas 2: Node.js HTTP Server Sederhana
Nama : Kikan Khairani
NPM : 240160221019
Kelas : SI-VB

Tugas ini membuat HTTP server sederhana menggunakan Node.js tanpa framework, hanya memakai module http bawaan.

# Struktur File
Tugas-2/ ├── src/ │ ├── config.js │ ├── helper.js │ ├── server.js │ └── data.txt
├── package.json └── README.md

   src/config.js: Konfigurasi aplikasi (nama, port, env).
   src/helper.js: Fungsi bantuan untuk response JSON.
   src/server.js: Logika utama server dan routing.
   src/data.txt: File untuk operasi baca/tulis.

# Cara Menjalankan
Pastikan Node.js sudah terinstall.
Buka terminal di folder project.
Jalankan perintah:
npm start
Server akan berjalan di http://localhost:3000.

# Bukti Pengujian Endpoint Berhasil dan Endpoint Tidak Berhasil
Skenario 1: Mengakses Endpoint yang Berhasil (/) erintah:* curl.exe http://localhost:3000/ Output:

{"message":"Selamat datang di Server Sederhana Tugas 2","environment":"development","status":"OK"}

Test Endpoint /about
curl.exe http://localhost:3000/about
Output:
{"app":"Server Sederhana Tugas 2","version":"1.0.0","author":"Siswa Coding"}

Skenario 2: Mengakses Endpoint Baca File (/read-file)
Perintah: curl.exe http://localhost:3000/read-file
Output:
{"status":"success","content":"Ini adalah data awal."}

Skenario 3: Mengakses Endpoint Tulis File (/write-file)
Perintah: curl.exe http://localhost:3000/write-file
Output:
{"status":"success","message":"File berhasil ditulis/diperbarui","data":"File diperbarui pada: 09/10/2026, 15.23.09"}

Skenario 4: Mengakses Endpoint Tidak Tersedia (404)
Perintah: curl.exe http://localhost:3000/halaman-hilang
Output:
{"status":"Not Found","message":"Endpoint /halaman-hilang tidak ditemukan di server ini."}

Cara Menjalankan
Simpan semua file di atas sesuai struktur folder.
Buka terminal di folder Tugas-2.
Ketik npm start.
Buka terminal baru (tab baru) untuk menjalankan perintah curl di atas untuk membuktikan program berjalan.
code menjalankannya : node src/server.js
hasil outputnya :Server Sederhana Tugas 2 berjalan di http://localhost:3000
Environment: development

Bukti Asli Pengerjaan :
Terminal cmd 1
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_3\src> npm start

tugas-nodejs-http@1.0.0 start
node server.js

Server Sederhana Tugas 2 berjalan di http://localhost:3000
Environment: development
[2026-10-09T08:21:41.404Z] GET /
[2026-10-09T08:22:44.802Z] GET /about
[2026-10-09T08:22:56.706Z] GET /read-file
[2026-10-09T08:23:09.856Z] GET /write-file
[2026-10-09T08:23:19.660Z] GET /halaman-hilang

Terminal cmd 2
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani> curl.exe http://localhost:3000/
{"message":"Selamat datang di Server Sederhana Tugas 2","environment":"development","status":"OK"}
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani> curl.exe http://localhost:3000/about
{"app":"Server Sederhana Tugas 2","version":"1.0.0","author":"Siswa Coding"}
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani> curl.exe http://localhost:3000/read-file
{"status":"success","content":"Ini adalah data awal."}
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani> curl.exe http://localhost:3000/write-file
{"status":"success","message":"File berhasil ditulis/diperbarui","data":"File diperbarui pada: 09/10/2026, 15.23.09"}
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani> curl.exe http://localhost:3000/halaman-hilang
{"status":"Not Found","message":"Endpoint /halaman-hilang tidak ditemukan di server ini."}
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani>