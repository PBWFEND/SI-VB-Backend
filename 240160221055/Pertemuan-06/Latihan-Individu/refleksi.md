# Refleksi Latihan Individu Pertemuan 06

Pada latihan individu Pertemuan 06, saya mempelajari penggunaan Prisma untuk melakukan operasi database pada resource pengguna. Saya mengimplementasikan endpoint untuk mengambil data pengguna, mencari pengguna berdasarkan NIM, menambahkan pengguna baru, memperbarui data pengguna, dan menghapus pengguna.

Dalam proses pengerjaan, saya juga melakukan validasi terhadap data yang dikirim agar input yang digunakan sesuai dengan kebutuhan. Selain itu, saya mempelajari penggunaan beberapa status HTTP, seperti `200 OK` untuk proses yang berhasil, `201 Created` saat data berhasil ditambahkan, `204 No Content` saat data berhasil dihapus, dan `404 Not Found` ketika pengguna tidak ditemukan.

Berdasarkan hasil pengujian menggunakan `curl`, seluruh fitur yang dibuat dapat berjalan dengan baik. Data pengguna berhasil ditambahkan, ditampilkan, diperbarui, dan dihapus dari database. Setelah data dihapus, API juga berhasil memberikan response `404 Not Found` ketika data tersebut dicari kembali.

Melalui latihan ini, saya menjadi lebih memahami penerapan operasi CRUD menggunakan Express.js, TypeScript, Prisma, dan SQLite serta bagaimana menghubungkan API dengan database.