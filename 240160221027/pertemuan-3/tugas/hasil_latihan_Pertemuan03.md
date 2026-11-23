
# Hasil Latihan Pertemuan 03

## 1. Tujuan
Memahami konfigurasi aplikasi Node.js, membaca data JSON,
dan membuat HTTP server tanpa menggunakan Express.js.

## 2. File yang dibuat
- config.js: menyimpan konfigurasi aplikasi.
- data-mahasiswa.json: menyimpan data mahasiswa.
- latihan.js: mencoba membaca konfigurasi dan data mahasiswa.
- server.js: membuat HTTP server dan menangani request.
- hasil_latihan_Pertemuan03.md: dokumentasi hasil latihan.

## 3. Endpoint API

| Method | Endpoint | Fungsi | Status |
|---|---|---|---|
| GET | / | Informasi aplikasi | 200 |
| GET | /health | Memeriksa status server | 200 |
| GET | /mahasiswa | Menampilkan data mahasiswa | 200 |
| GET | /tidak-ada | Endpoint tidak dikenal | 404 |

## 4. Hasil pengujian
Isi bagian ini setelah menjalankan program dan mencoba semua endpoint.

## 5. Kesimpulan
Latihan ini membantu saya memahami konfigurasi menggunakan
environment variable, membaca file JSON secara asynchronous,
membuat HTTP server, serta mengirim response dalam format JSON.
