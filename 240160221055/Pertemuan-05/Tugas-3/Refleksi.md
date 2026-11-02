# Refleksi Tugas 3 — Perancangan dan Implementasi RESTful API Express.js

## 1. Hal yang Dipelajari

Dari pengerjaan tugas ini, saya belajar cara membuat RESTful API menggunakan Express.js, mulai dari menyusun file project sampai membuat endpoint untuk mengelola data anggota. Saya juga jadi lebih paham perbedaan fungsi GET, POST, PUT, PATCH, dan DELETE, serta cara menggunakan parameter ID dan filter berdasarkan nama atau divisi.

Selain itu, saya belajar bahwa setiap request perlu memiliki respons yang sesuai, baik ketika berhasil maupun ketika terjadi kesalahan.

## 2. Kendala yang Dihadapi

Selama mengerjakan tugas ini, saya perlu memastikan struktur folder dan file yang dibuat sudah benar. Saya mengerjakan project secara bertahap, mulai dari membuat `package.json`, menginstal Express.js, membuat `service.js` dan `app.js`, sampai menambahkan `server.js` untuk menjalankan API.

Saya juga perlu memastikan project dijalankan dari folder yang benar dan menggunakan port yang sesuai agar tidak mengganggu project sebelumnya. Setelah server berhasil berjalan, saya masih harus menguji setiap endpoint untuk memastikan fitur yang dibuat sudah berfungsi sesuai kebutuhan.

## 3. Cara Mengatasi Kendala

Untuk mengatasi kendala tersebut, saya mengerjakan project langkah demi langkah dan memeriksa kembali file yang sudah dibuat. Saya juga memastikan server berjalan pada port 3007, kemudian menggunakan Postman untuk menguji setiap endpoint.

Pengujian dilakukan mulai dari menampilkan data, mencari anggota berdasarkan nama dan divisi, menambahkan data, memperbarui data, sampai menghapus data. Saya juga mencoba beberapa kondisi yang tidak valid, seperti ID yang tidak ditemukan, NPM yang salah, data duplikat, dan field yang tidak boleh digunakan.

Dengan cara tersebut, saya bisa memeriksa apakah API memberikan respons dan status code yang sesuai dengan masing-masing kondisi.

## 4. Hal yang Saya Pahami dari Pengujian

Setelah mencoba seluruh endpoint menggunakan Postman, saya semakin memahami bahwa membuat API bukan hanya tentang menulis kode agar bisa dijalankan. Setiap fitur juga perlu diuji supaya bisa diketahui apakah hasilnya sudah sesuai dengan yang diharapkan.

Saya juga belajar bahwa penggunaan status code itu penting. Misalnya, `200 OK` untuk request yang berhasil, `201 Created` untuk penambahan data, `400 Bad Request` untuk input yang tidak valid, dan `404 Not Found` ketika data atau endpoint tidak ditemukan. Untuk penghapusan yang berhasil, API menggunakan `204 No Content` tanpa response body.

## 5. Kesimpulan

Secara keseluruhan, tugas ini membantu saya memahami proses pembuatan RESTful API secara bertahap. Saya belajar menyusun struktur project, membuat endpoint CRUD, menambahkan validasi, dan menguji hasilnya menggunakan Postman.

Dari tugas ini, saya juga menyadari pentingnya memeriksa kembali kode dan hasil pengujian agar API tidak hanya bisa dijalankan, tetapi juga memberikan respons yang sesuai dengan kebutuhan.