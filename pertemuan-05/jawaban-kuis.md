1. Apa yang dimaksud dengan resource dalam RESTful API?

Resource adalah objek atau data yang dikelola oleh API, misalnya mahasiswa, buku, atau produk. Contohnya, /mahasiswa digunakan untuk mengakses data mahasiswa.

2. Kapan menggunakan route parameter dan kapan menggunakan query parameter?

Route parameter digunakan untuk menentukan resource tertentu, misalnya /mahasiswa/F1D022001 untuk mencari mahasiswa berdasarkan NIM. Query parameter digunakan untuk memfilter atau mengurutkan data, misalnya /mahasiswa?prodi=Sistem%20Informasi.

3. Apa perbedaan PUT dan PATCH?

PUT digunakan untuk mengganti seluruh data resource, sedangkan PATCH digunakan untuk mengubah sebagian data saja.

4. Status code apa yang digunakan untuk create, input tidak valid, resource tidak ditemukan, dan delete tanpa body?
- 201 Created: data berhasil dibuat.
- 400 Bad Request: input tidak valid.
- 404 Not Found: resource tidak ditemukan.
- 204 No Content: operasi berhasil tanpa mengirimkan response body, misalnya setelah menghapus data.
5. Mengapa response JSON perlu memiliki struktur yang konsisten?

   Agar data mudah dibaca, dipahami, dan diproses oleh frontend atau aplikasi lain. Struktur yang konsisten juga memudahkan penanganan error.

6. Mengapa endpoint sebaiknya menggunakan kata benda, bukan kata kerja?

Karena endpoint RESTful API sebaiknya menggambarkan resource yang diakses, sedangkan HTTP method menunjukkan tindakan yang dilakukan. Contohnya, gunakan GET /mahasiswa untuk mengambil data dan POST /mahasiswa untuk menambahkan data, bukan /ambilMahasiswa atau /tambahMahasiswa.