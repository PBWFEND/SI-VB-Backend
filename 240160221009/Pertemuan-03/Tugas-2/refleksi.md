
# Refleksi Tugas 2 — Node.js Fundamentals

Dalam pengerjaan tugas ini, saya membuat API sederhana untuk Sistem Informasi Absensi Perkuliahan Mahasiswa menggunakan Node.js tanpa Express.js. Saya belajar membagi program ke beberapa file, yaitu config.js untuk konfigurasi aplikasi, helper.js untuk mengirim response JSON, dan server.js untuk mengatur HTTP server serta routing.

Saya menggunakan ChatGPT sebagai alat bantu untuk memahami fungsi module bawaan Node.js, penggunaan environment variable, cara membaca file JSON secara asynchronous, serta proses pembuatan endpoint. Saya juga meminta bantuan untuk memeriksa kesalahan pada kode dan memahami cara kerja request dan response. Setelah mendapatkan arahan, saya tetap memasukkan kode ke dalam project, menjalankannya melalui terminal, dan memeriksa hasil pengujiannya sendiri.

Pengujian dilakukan menggunakan curl.exe melalui PowerShell. Beberapa endpoint yang berhasil diuji yaitu GET /, GET /health, GET /mahasiswa, GET /mahasiswa/1, GET /absensi, dan GET /absensi/1 dengan response 200 OK. Saya juga menguji endpoint yang tidak tersedia melalui GET /tidak-ada dan mendapatkan response 404 Not Found. Hasil pengujian utama telah disimpan dalam folder bukti-testing.

Dari pengerjaan ini, saya mulai memahami bagaimana Node.js menjalankan JavaScript di luar browser, bagaimana server menerima request dan mengirim response JSON, serta bagaimana data mahasiswa dan absensi dibaca dari file JSON. Saya juga masih perlu memperdalam pemahaman mengenai proses kerja http.createServer, penggunaan async/await, penanganan error dengan try/catch, dan pengaturan environment variable agar lebih terbiasa membangun backend secara mandiri.
