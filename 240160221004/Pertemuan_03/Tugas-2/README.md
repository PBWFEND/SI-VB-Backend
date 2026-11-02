# Tugas 2: Node.js HTTP Server Sederhana

Nama    : Aprilliana Fratiwi
NPM     : 240160221004
Kelas   : SI-VB

Project ini dibuat tanpa menggunakan framework Express.js, murni menggunakan module `http` bawaan Node.js.

## Struktur File
Tugas-2/
├── src/
│   ├── config.js
│   ├── helper.js
│   ├── server.js
│   └── data.txt       
├── package.json
└── README.md
- `src/config.js`: Konfigurasi aplikasi (nama, port, env).
- `src/helper.js`: Fungsi bantuan untuk response JSON.
- `src/server.js`: Logika utama server dan routing.
- `src/data.txt`: File untuk operasi baca/tulis.

## Cara Menjalankan
1. Pastikan Node.js sudah terinstall.
2. Buka terminal di folder project.
3. Jalankan perintah:
   ```bash
   npm start
4. Server akan berjalan di http://localhost:3000.

### Bukti Pengujian Endpoint Berhasil dan Endpoint Tidak Berhasil

Skenario 1: Mengakses Endpoint yang Berhasil (`/`)
erintah:* `curl http://localhost:3000/`
Output:
```json
{"message":"Selamat datang di Server Sederhana Tugas 2","environment":"development","status":"OK"}

Test Endpoint /about
curl http://localhost:3000/about
Output:
{"app":"Server Sederhana Tugas 2","version":"1.0.0","author":"Aprilliana Fratiwi"}

Skenario 2: Mengakses Endpoint Baca File (/read-file)
Perintah: curl http://localhost:3000/read-file
Output:
{"status":"success","content":"Ini adalah data awal."}

Skenario 3: Mengakses Endpoint Tulis File (/write-file)
Perintah: curl http://localhost:3000/write-file
Output:
{"status":"success","message":"File berhasil ditulis/diperbarui","data":"File diperbarui pada: 25/10/2023, 10.00.00"}

Skenario 4: Mengakses Endpoint Tidak Tersedia (404)
Perintah: curl http://localhost:3000/halaman-hilang
Output:
{"status":"Not Found","message":"Endpoint /halaman-hilang tidak ditemukan di server ini."}

#### Cara Menjalankan
Simpan semua file di atas sesuai struktur folder.
Buka terminal di folder Tugas-2.
Ketik npm start.
Buka terminal baru (tab baru) untuk menjalankan perintah curl di atas untuk membuktikan program berjalan.
code menjalankannya : node src/server.js
hasil outputnya :Server Sederhana Tugas 2 berjalan di http://localhost:3000
Environment: development

## Bukti Asli Pengerjaan :
Terminal cmd 1
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Tugas-2>node src/server.js
Server Sederhana Tugas 2 berjalan di http://localhost:3000
Environment: development
[2026-09-29T13:44:00.267Z] GET /
[2026-09-29T13:44:36.161Z] GET /about
[2026-09-29T13:45:16.043Z] GET /read-file
[2026-09-29T13:45:39.073Z] GET /write-file
[2026-09-29T13:46:03.043Z] GET /halaman-hilang

Terminal cmd 2
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Tugas-2>curl http://localhost:3000/
{"message":"Selamat datang di Server Sederhana Tugas 2","environment":"development","status":"OK"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Tugas-2>curl http://localhost:3000/about
{"app":"Server Sederhana Tugas 2","version":"1.0.0","author":"Aprilliana Fratiwi"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Tugas-2>curl http://localhost:3000/read-file
{"status":"success","content":"Ini adalah data awal."}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Tugas-2>curl http://localhost:3000/write-file
{"status":"success","message":"File berhasil ditulis/diperbarui","data":"File diperbarui pada: 29/09/2026, 06.45.39"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Tugas-2>curl http://localhost:3000/halaman-hilang
{"status":"Not Found","message":"Endpoint /halaman-hilang tidak ditemukan di server ini."}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_03\Tugas-2>
