# Refleksi Tugas 4

Pada Tugas 4, resource anggota dari Tugas 3 dikembangkan agar menggunakan database SQLite melalui Prisma ORM. Sebelumnya data hanya disimpan dalam array sehingga kembali ke data awal ketika server dijalankan ulang. Setelah menggunakan database, data anggota dapat tersimpan secara permanen.

Saya mempelajari cara mendefinisikan model pada `schema.prisma`, mengatur koneksi melalui environment variable, menjalankan migration, dan menggunakan Prisma Client pada endpoint GET, POST, PATCH, serta DELETE. Validasi input juga tetap digunakan agar data yang masuk sesuai dengan ketentuan.

Bagian yang perlu diperhatikan adalah konfigurasi Prisma dan adapter database, karena keduanya harus sesuai dengan versi Prisma yang digunakan. Selanjutnya saya perlu menguji endpoint melalui Postman dan memastikan data tetap ada setelah server direstart.