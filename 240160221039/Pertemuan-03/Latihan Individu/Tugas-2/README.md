Tugas 2: Node.js HTTP Server Sederhana
Nama : Resty Dewina Fitri
NPM : 240160221039
Kelas : SI-VB

Project ini dibuat tanpa menggunakan framework Express.js, murni menggunakan module http bawaan Node.js.

Struktur File
Tugas-2/ ├── src/ │ ├── config.js │ ├── helper.js │ ├── server.js │ └── data.txt
├── package.json └── README.md

src/config.js: Konfigurasi aplikasi (nama, port, env).
src/helper.js: Fungsi bantuan untuk response JSON.
src/server.js: Logika utama server dan routing.
src/data.txt: File untuk operasi baca/tulis.

CARA MENJALANKAN
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-03\Latihan Individu\Tugas-2
# npm start

> tugas-nodejs-http@1.0.0 start
> node src/server.js

Server Sederhana Tugas 2 berjalan di http://localhost:3000
Environment: development
[2026-10-29T07:07:22.166Z] GET /
[2026-10-29T07:07:38.594Z] GET /about
[2026-10-29T07:07:51.473Z] GET /read-file
[2026-10-29T07:08:04.473Z] GET /write-file
[2026-10-29T07:08:22.705Z] GET /halaman-hilang

HASIL PENGUJIAN 
RESTY@DESKTOP-2MUUTN0 c:\xampp
# cd /d D:\240160221039\pertemuan-03\Latihan Individu

RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-03\Latihan Individu
# cd Tugas-2

RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-03\Latihan Individu\Tugas-2
# curl http://localhost:3000/
{"message":"Selamat datang di Server Sederhana Tugas 2","environment":"development","status":"OK"}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-03\Latihan Individu\Tugas-2
# curl http://localhost:3000/about
{"app":"Server Sederhana Tugas 2","version":"1.0.0","author":"Aprilliana Fratiwi"}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-03\Latihan Individu\Tugas-2
# curl http://localhost:3000/read-file
{"status":"success","content":""}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-03\Latihan Individu\Tugas-2
# curl http://localhost:3000/write-file
{"status":"success","message":"File berhasil ditulis/diperbarui","data":"File diperbarui pada: 29/10/2026, 14.08.04"}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-03\Latihan Individu\Tugas-2
# curl http://localhost:3000/halaman-hilang
{"status":"Not Found","message":"Endpoint /halaman-hilang tidak ditemukan di server ini."}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-03\Latihan Individu\Tugas-2