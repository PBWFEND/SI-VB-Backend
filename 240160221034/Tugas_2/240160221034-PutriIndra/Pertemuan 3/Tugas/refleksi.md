# Refleksi Tugas 2 — Node.js Fundamentals

## 1. Hal yang Dipelajari

Pada tugas ini saya mempelajari dasar Node.js dengan membuat HTTP server tanpa menggunakan Express.js. Saya belajar menggunakan modul bawaan Node.js seperti `node:http` untuk membuat server dan `node:fs/promises` untuk membaca data dari file JSON secara asynchronous.

Saya juga memahami cara membuat routing sederhana berdasarkan method dan URL, membuat response dalam format JSON, serta memberikan response `404 Not Found` ketika endpoint yang diminta tidak tersedia.

Selain itu, saya mempelajari penggunaan environment variable untuk konfigurasi aplikasi seperti nama aplikasi, port, dan environment.

## 2. Kendala yang Ditemui

Kendala yang saya temui adalah memahami struktur folder tugas dan memastikan file berada pada lokasi yang sesuai. Saya juga sempat menjalankan perintah Node.js dari folder yang salah sehingga file `server.js` tidak ditemukan.

Setelah mengetahui bahwa terminal harus berada pada folder yang berisi `server.js`, server dapat dijalankan dengan baik.

## 3. Pengujian

Saya melakukan pengujian terhadap endpoint yang tersedia, yaitu:

* `GET /`
* `GET /health`
* `GET /students`

Saya juga menguji endpoint yang tidak tersedia menggunakan `/tidak-ada` dan mendapatkan status `404 Not Found`.

## 4. Penggunaan Bantuan AI

Dalam pengerjaan tugas ini saya menggunakan bantuan AI sebagai pendamping untuk memahami langkah pengerjaan, struktur kode, dan membantu menemukan kesalahan ketika melakukan pengujian.

Saya tetap mengikuti materi dari dosen, mengetik dan menjalankan kode pada komputer saya sendiri, serta melakukan pengujian terhadap setiap endpoint untuk memastikan program berjalan sesuai kebutuhan tugas.
