# KUIS FORMATIF PERTEMUAN 6

**Nama:** Siti Khodijah  
**NIM:** 240160221045  
**Program Studi:** Sistem Informasi

### 1. Apa bedanya penyimpanan data di memory dan di database?

Penyimpanan data di memory bersifat sementara dan akan hilang ketika aplikasi dihentikan atau dijalankan ulang. Sedangkan penyimpanan di database bersifat permanen sehingga data tetap tersimpan meskipun aplikasi dimatikan.

### 2. Mengapa migration diperlukan?

Migration diperlukan untuk mengelola perubahan struktur database, seperti membuat tabel, menambahkan kolom, atau mengubah struktur tabel. Dengan migration, perubahan database dapat dilakukan secara teratur dan konsisten sesuai dengan schema aplikasi.

### 3. Apa fungsi file prisma/schema.prisma?

File prisma/schema.prisma berfungsi sebagai tempat untuk mendefinisikan model data, field, tipe data, dan hubungan antartabel. File ini juga digunakan Prisma sebagai acuan dalam mengelola struktur database dan menghasilkan Prisma Client.

### 4. Bagaimana cara menghubungkan Prisma dengan database PostgreSQL?

Caranya adalah dengan mengatur provider database menjadi postgresql di konfigurasi Prisma, kemudian mengatur DATABASE_URL pada file environment agar mengarah ke database PostgreSQL. Setelah itu, jalankan migration dan generate Prisma Client.

### 5. Apa perbedaan findMany dan findFirst?

- findMany digunakan untuk mengambil banyak data yang sesuai dengan kondisi pencarian dan menghasilkan array.
- findFirst digunakan untuk mengambil satu data pertama yang sesuai dengan kondisi pencarian.

### 6. Mengapa environment variable digunakan untuk DATABASE_URL?

Environment variable digunakan agar informasi koneksi database tidak ditulis langsung di dalam kode program. Cara ini membantu menjaga keamanan informasi database, memudahkan pengaturan konfigurasi, dan memungkinkan aplikasi menggunakan database yang berbeda pada lingkungan pengembangan maupun produksi.