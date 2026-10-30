# Hasil Latihan Pertemuan 3
## Modul, File, Environment, dan HTTP

### 1. Tujuan Latihan

Latihan ini bertujuan untuk memahami penggunaan module ESM, environment variable, filesystem, serta pembuatan HTTP server menggunakan Node.js tanpa Express.

### 2. File yang Digunakan

| Nama File | Fungsi |
|---|---|
| `config.js` | Mengatur konfigurasi aplikasi, port, dan environment. |
| `demo-node.js` | Mempelajari runtime Node.js, konfigurasi, dan operasi filesystem. |
| `latihan.js` | Membuat, membaca, dan menghapus file yang berisi ringkasan konfigurasi aplikasi. |
| `server.js` | Membuat HTTP server dan menangani request menggunakan routing sederhana. |

### 3. Hasil Latihan `demo-node.js`

Program digunakan untuk menampilkan informasi runtime Node.js, konfigurasi aplikasi, dan lokasi direktori module. Program juga berhasil melakukan proses penulisan, pembacaan, serta penghapusan file sementara.

### 4. Hasil Latihan `latihan.js`

Program mengambil konfigurasi dari `config.js`, menyusun ringkasan aplikasi, menuliskannya ke file `hasil-latihan.txt`, membaca kembali isi file, lalu menghapus file tersebut setelah selesai dibaca.

Informasi yang ditampilkan meliputi:
- Nama aplikasi.
- Environment aplikasi.
- Port aplikasi.
- Daftar endpoint.

### 5. Hasil Latihan `server.js`

Program membuat HTTP server menggunakan module bawaan `node:http`.

Endpoint yang tersedia:

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Menampilkan pesan selamat datang dan daftar endpoint. |
| GET | `/health` | Menampilkan status server dan versi Node.js. |
| GET | `/tidak-ada` | Contoh request ke endpoint yang tidak tersedia untuk menguji respons 404. |

Server dijalankan menggunakan perintah `node server.js` dan dapat diuji melalui browser atau terminal menggunakan `curl.exe`.

### 6. Konfigurasi Aplikasi

File `config.js` menyimpan konfigurasi aplikasi dengan memanfaatkan environment variable, yaitu:
- `APP_NAME` untuk nama aplikasi.
- `PORT` untuk port server.
- `NODE_ENV` untuk environment aplikasi.
- `getConfig()` untuk mengembalikan konfigurasi dalam bentuk objek.

### 7. Kesimpulan

Melalui latihan Pertemuan 3, saya mempelajari penggunaan module ESM, environment variable, filesystem, dan HTTP server pada Node.js. Saya juga memahami cara membaca konfigurasi, mengelola file, membuat routing sederhana, serta menangani request yang tidak memiliki endpoint sesuai.

