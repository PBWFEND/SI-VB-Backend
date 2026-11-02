# Kuis Formatif Pertemuan 6

## 1. Apa bedanya penyimpanan data di memory dan di database?

Penyimpanan di memory menggunakan memori sementara saat aplikasi berjalan. Jika server dihentikan atau di-restart, datanya akan hilang. Sedangkan database menyimpan data secara permanen sehingga data tetap tersedia meskipun server di-restart.

## 2. Mengapa migration diperlukan?

Migration diperlukan untuk membuat dan mengubah struktur tabel database sesuai dengan perubahan pada model Prisma. Dengan migration, perubahan database dapat dikelola dan diterapkan kembali di lingkungan lain.

## 3. Apa fungsi file `prisma/schema.prisma`?

File `prisma/schema.prisma` digunakan untuk mendefinisikan struktur data atau model yang akan disimpan di database, termasuk nama model, field, dan tipe datanya.

## 4. Bagaimana cara menghubungkan Prisma dengan database PostgreSQL?

Prisma dihubungkan dengan PostgreSQL menggunakan konfigurasi datasource dengan provider `postgresql` dan URL database dari environment variable `DATABASE_URL`.

Contoh:

```prisma
datasource db {
  provider = "postgresql"
}
```

Kemudian URL koneksi disimpan di file `.env`.

## 5. Apa perbedaan `findMany` dan `findFirst`?

`findMany` digunakan untuk mengambil banyak data dan hasilnya berupa array. Sedangkan `findFirst` digunakan untuk mengambil satu data pertama yang sesuai dengan kondisi dan hasilnya berupa satu objek atau `null` jika tidak ditemukan.

## 6. Mengapa environment variable digunakan untuk `DATABASE_URL`?

Environment variable digunakan agar alamat koneksi database tidak ditulis langsung di dalam kode. Cara ini membuat konfigurasi lebih aman dan memudahkan pengaturan database untuk lingkungan development maupun produksi.