1. Apa yang dimaksud dengan resource dalam RESTful API?

Resource adalah objek atau data yang dikelola oleh API, seperti anggota, mahasiswa, kegiatan, dan absensi. Setiap resource dapat diakses melalui URL atau endpoint tertentu.

2. Kapan menggunakan route parameter dan kapan menggunakan query parameter?

Route parameter digunakan untuk menentukan resource tertentu berdasarkan identitasnya, misalnya /anggota/1 untuk mengambil anggota dengan ID 1.

Query parameter digunakan untuk menyaring, mencari, atau mengatur data yang ditampilkan, misalnya /anggota?nama=Rahma untuk mencari anggota berdasarkan nama.

3. Apa perbedaan PUT dan PATCH?

PUT digunakan untuk mengganti atau memperbarui keseluruhan data resource, sedangkan PATCH digunakan untuk memperbarui sebagian data resource saja.

4. Status code apa yang digunakan untuk create, input tidak valid, resource tidak ditemukan, dan delete tanpa body?

201 Created: data berhasil dibuat.

400 Bad Request: input tidak valid atau permintaan tidak memenuhi ketentuan.

404 Not Found: resource yang dicari tidak ditemukan.

204 No Content: penghapusan berhasil tanpa mengirimkan body respons.

5. Mengapa response JSON perlu memiliki struktur yang konsisten?

Agar client lebih mudah membaca, mengolah, dan menampilkan data dari API. Struktur yang konsisten juga memudahkan penanganan error serta pemeliharaan aplikasi.

6. Mengapa endpoint sebaiknya menggunakan kata benda, bukan kata kerja?

Karena RESTful API berorientasi pada resource atau objek yang dikelola, sedangkan tindakan ditentukan oleh HTTP method. Contohnya, gunakan GET /anggota untuk mengambil data dan POST /anggota untuk menambahkan data, bukan /ambilAnggota atau /tambahAnggota.