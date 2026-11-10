# Refleksi Latihan Individu Pertemuan 7

Pada latihan ini, saya mempelajari penerapan operasi CRUD pada resource pengguna menggunakan Express, Prisma, dan SQLite. Saya juga memahami bagaimana memisahkan proses validasi input dengan operasi database agar kode lebih terstruktur dan setiap bagian memiliki tanggung jawab yang jelas.

Pengujian dilakukan menggunakan `curl` melalui PowerShell. Endpoint `GET /pengguna` berhasil menampilkan daftar pengguna dengan status `200 OK`. Endpoint `POST /pengguna` berhasil menambahkan data pengguna baru dengan status `201 Created`. Filter berdasarkan NIM melalui `GET /pengguna?nim=240160221055` juga berhasil menampilkan data yang sesuai dengan status `200 OK`. Terakhir, endpoint `DELETE /pengguna/240160221055` berhasil menghapus data dengan status `204 No Content`.

Dari latihan ini, saya menjadi lebih memahami penggunaan Prisma untuk melakukan operasi database serta pentingnya penggunaan status code yang sesuai pada REST API. Saya juga belajar bahwa pengujian endpoint menggunakan `curl` dapat membantu memastikan setiap fitur API berjalan sesuai dengan yang diharapkan.