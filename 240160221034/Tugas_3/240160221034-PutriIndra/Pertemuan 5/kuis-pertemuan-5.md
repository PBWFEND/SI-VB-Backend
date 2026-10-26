# Kuis Formatif Pertemuan 5 — RESTful API

## 1. Apa yang dimaksud dengan resource dalam RESTful API?

Resource adalah objek atau data yang dikelola melalui API. Contohnya pada Sistem Informasi Perpustakaan adalah buku, anggota, dan peminjaman. Setiap resource dapat diakses melalui endpoint tertentu.

## 2. Kapan menggunakan route parameter dan kapan menggunakan query parameter?

Route parameter digunakan untuk menentukan resource tertentu, biasanya berdasarkan ID, contohnya `/buku/1`. Query parameter digunakan untuk menyaring atau mencari data, contohnya `/buku?penulis=Andi`.

## 3. Apa perbedaan PUT dan PATCH?

PUT digunakan untuk mengganti seluruh data resource, sedangkan PATCH digunakan untuk memperbarui sebagian data resource tanpa harus mengirimkan semua atributnya.

## 4. Status code apa yang digunakan untuk create, input tidak valid, resource tidak ditemukan, dan delete tanpa body?

- `201 Created`: data berhasil dibuat.
- `400 Bad Request`: permintaan atau input tidak valid.
- `404 Not Found`: resource tidak ditemukan.
- `204 No Content`: penghapusan berhasil tanpa mengembalikan body respons.

## 5. Mengapa response JSON perlu memiliki struktur yang konsisten?

Struktur JSON yang konsisten memudahkan aplikasi membaca dan mengolah data respons API. Selain itu, struktur yang seragam mempermudah penanganan error dan pemeliharaan aplikasi.

## 6. Mengapa endpoint sebaiknya menggunakan kata benda, bukan kata kerja?

Endpoint menggunakan kata benda karena mewakili resource yang dikelola, sedangkan tindakan ditentukan oleh HTTP method seperti GET, POST, PUT, PATCH, dan DELETE. Contohnya, gunakan `/buku` untuk resource buku.