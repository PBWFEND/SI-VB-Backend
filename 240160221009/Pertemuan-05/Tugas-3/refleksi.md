# Refleksi Pertemuan 5 – Tugas 3

Melalui pengerjaan Tugas 3, saya belajar membuat RESTful API menggunakan Express.js 5 untuk mengelola data absensi perkuliahan mahasiswa. Dalam tugas ini, saya mencoba menerapkan operasi CRUD, mulai dari menampilkan daftar absensi, mencari data berdasarkan ID, menambahkan data baru, memperbarui data menggunakan PUT dan PATCH, hingga menghapus data menggunakan DELETE.

Saya juga memahami penggunaan route parameter dan query parameter untuk mengakses serta memfilter data. Selain itu, saya belajar menerapkan validasi input agar data yang dikirimkan sesuai dengan ketentuan, serta menggunakan HTTP status code seperti 200, 201, 204, 400, dan 404 sebagai respons dari setiap proses API.

Selama pengujian, saya menemukan sedikit kendala ketika menggunakan Invoke-WebRequest di PowerShell untuk menguji DELETE karena muncul peringatan keamanan. Kendala tersebut dapat diatasi dengan menggunakan curl.exe sehingga status 204 No Content dapat terlihat dengan jelas.

Dari pengerjaan ini, saya menjadi lebih memahami bagaimana sebuah API mengelola data melalui metode HTTP dan bagaimana memberikan respons yang sesuai ketika permintaan berhasil maupun ketika terjadi kesalahan. Saya juga menyadari bahwa data pada aplikasi ini masih disimpan sementara dalam array, sehingga belum menggunakan database secara permanen.