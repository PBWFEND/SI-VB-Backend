# Kuis Formatif Pertemuan 4 — Express.js

## 1. Apa perbedaan Node.js dan Express.js?

Node.js digunakan untuk menjalankan JavaScript di luar browser, sedangkan Express.js digunakan untuk mempermudah pembuatan server dan pengaturan route pada aplikasi web menggunakan Node.js.

## 2. Apa fungsi `app.use(express.json())`?

Kode ini digunakan agar aplikasi bisa membaca data yang dikirim dalam format JSON. Data tersebut kemudian bisa diakses melalui `request.body`.

## 3. Apa perbedaan route parameter dan query parameter?

Route parameter adalah data yang diambil dari bagian alamat URL, contohnya `/buku/1` untuk mengambil buku dengan ID 1.

Query parameter adalah data tambahan setelah tanda tanya (`?`) pada URL, contohnya `/buku?tersedia=true` untuk menampilkan buku yang tersedia.

## 4. Mengapa middleware perlu memanggil `next()`?

`next()` digunakan untuk melanjutkan proses ke middleware atau bagian kode berikutnya. Kalau tidak memanggil `next()` dan tidak mengirim response, permintaan bisa berhenti dan pengguna tidak menerima jawaban dari server.

## 5. Di bagian mana handler 404 dan error middleware diletakkan?

Handler 404 diletakkan setelah semua route untuk menangani alamat yang tidak ditemukan. Error middleware diletakkan di bagian akhir aplikasi untuk menangani kesalahan yang terjadi saat aplikasi berjalan.

## 6. Status code apa yang digunakan ketika resource berhasil dibuat?

Status code yang digunakan adalah `201 Created`. Contohnya, ketika pengguna berhasil menambahkan buku baru melalui endpoint `POST /buku`, server akan mengirim status tersebut.