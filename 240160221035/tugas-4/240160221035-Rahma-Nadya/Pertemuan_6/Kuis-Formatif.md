1. Apa bedanya penyimpanan data di memory dan di database?

Penyimpanan di memory menggunakan RAM untuk menyimpan data sementara selama program berjalan. Jika program dihentikan atau server dimulai ulang, data biasanya akan hilang. Sedangkan database menyimpan data secara permanen sehingga data tetap tersedia meskipun server dimatikan.

2. Mengapa migration diperlukan?

Migration diperlukan untuk mengatur dan mencatat perubahan struktur database, seperti menambah tabel, mengubah kolom, atau membuat relasi. Dengan migration, perubahan database dapat diterapkan secara teratur dan konsisten.

3. Apa fungsi file prisma/schema.prisma?

File schema.prisma berfungsi untuk mendefinisikan struktur database menggunakan Prisma, seperti model, nama tabel, tipe data, relasi antar-model, serta konfigurasi provider database.

4. Bagaimana cara menghubungkan Prisma dengan database PostgreSQL?

Caranya dengan mengatur provider menjadi postgresql, kemudian memasukkan alamat koneksi database ke dalam environment variable DATABASE_URL pada file .env.

Contoh:
datasource db {
  provider = "postgresql"
}


Contoh isi .env:
DATABASE_URL="postgresql://user:password@localhost:5432/nama_database?schema=public"


Setelah itu, konfigurasi koneksi Prisma, generate Prisma Client, dan jalankan migration sesuai versi Prisma yang digunakan.

5. Apa perbedaan findMany dan findFirst?

findMany digunakan untuk mengambil banyak data yang sesuai dengan kondisi pencarian dan menghasilkan array. Sedangkan findFirst digunakan untuk mengambil satu data pertama yang sesuai dengan kondisi pencarian.

6. Mengapa environment variable digunakan untuk DATABASE_URL?

Environment variable digunakan agar alamat koneksi database, termasuk username dan password, tidak ditulis langsung di dalam kode program. Selain itu, konfigurasi database lebih mudah diubah tanpa mengubah kode aplikasi dan informasi sensitif lebih terlindungi.